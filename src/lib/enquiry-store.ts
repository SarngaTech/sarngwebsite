import "server-only";
import { createHash } from "node:crypto";
import type { EmailKind, EmailStatus, Enquiry, EnquiryStatus, EnquiryType } from "@prisma/client";
import { db } from "./db";
import type { LeadPayload, LeadType } from "./leads";
import type { EmailResult, ResumeMeta } from "./lead-handlers";

/** Persistence layer for enquiries, email results, notes and audit events. */

export const TYPE_TO_DB: Record<LeadType, EnquiryType> = {
  enquiry: "ENQUIRY",
  contact: "CONTACT",
  internship: "INTERNSHIP",
  project: "PROJECT",
};
export const DB_TO_TYPE: Record<EnquiryType, LeadType> = {
  ENQUIRY: "enquiry",
  CONTACT: "contact",
  INTERNSHIP: "internship",
  PROJECT: "project",
};

export const TYPE_LABEL: Record<EnquiryType, string> = {
  ENQUIRY: "Enquiry",
  CONTACT: "Contact form",
  INTERNSHIP: "Internship",
  PROJECT: "Project",
};

export const STATUS_FLOW: EnquiryStatus[] = ["NEW", "CONTACTED", "FOLLOW_UP", "ENROLLED", "CLOSED"];
export const STATUS_LABEL: Record<EnquiryStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  FOLLOW_UP: "Follow-up",
  ENROLLED: "Enrolled",
  CLOSED: "Closed",
};

export const EMAIL_STATUS_LABEL: Record<EmailStatus, string> = {
  PENDING: "Pending",
  SENT: "Sent",
  FAILED: "Failed",
  SKIPPED: "Not configured",
};

/** One-way hash so raw IP addresses are never stored. */
export function hashIp(ip: string) {
  const salt = process.env.ADMIN_SESSION_SECRET || "sarng-infotech";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Number of enquiries from the same (hashed) IP in the last `minutes` minutes — shared across serverless instances. */
export async function recentSubmissionCount(ipHash: string, minutes: number) {
  return db().enquiry.count({ where: { ipHash, createdAt: { gte: new Date(Date.now() - minutes * 60_000) } } });
}

export async function createEnquiry(lead: LeadPayload, ctx: { ipHash?: string; userAgent?: string; resume?: ResumeMeta }) {
  const r = ctx.resume;
  return db().enquiry.create({
    data: {
      type: TYPE_TO_DB[lead.type],
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      persona: lead.persona || null,
      interest: lead.interest || null,
      batch: lead.batch || null,
      message: lead.message || null,
      college: lead.college || null,
      degree: lead.degree || null,
      year: lead.year || null,
      technology: lead.technology || null,
      skillLevel: lead.skillLevel || null,
      projectType: lead.projectType || null,
      source: lead.source || null,
      ipHash: ctx.ipHash || null,
      userAgent: ctx.userAgent?.slice(0, 300) || null,
      events: { create: { action: "created", detail: `Submitted via ${lead.source || "website"}` } },
      ...(r
        ? {
            resume: {
              create: {
                fileName: r.name.slice(0, 200),
                mimeType: r.type,
                size: r.size,
                data: new Uint8Array(r.data instanceof Uint8Array ? r.data : new Uint8Array(r.data)) as Uint8Array<ArrayBuffer>,
              },
            },
          }
        : {}),
    },
  });
}

/** Store an email attempt and update the enquiry's latest status for that email. */
export async function recordEmail(enquiryId: string, kind: EmailKind, result: EmailResult, trigger: "submission" | "resend") {
  const field = kind === "NOTIFICATION" ? "notificationStatus" : "autoReplyStatus";
  await db().$transaction([
    db().emailLog.create({
      data: {
        enquiryId,
        kind,
        status: result.status,
        recipient: result.recipient,
        subject: result.subject.slice(0, 300),
        messageId: result.messageId?.slice(0, 300) || null,
        error: result.error || null,
        trigger,
      },
    }),
    db().enquiry.update({ where: { id: enquiryId }, data: { [field]: result.status } }),
  ]);
}

export async function addEvent(enquiryId: string, action: string, detail?: string) {
  await db().enquiryEvent.create({ data: { enquiryId, action, detail: detail || null } });
}

/** Rebuild the original form payload from a saved enquiry (used for resends). */
export function leadFromEnquiry(e: Enquiry): LeadPayload & { receivedAt: string } {
  return {
    type: DB_TO_TYPE[e.type],
    name: e.name,
    email: e.email,
    phone: e.phone,
    persona: e.persona || undefined,
    interest: e.interest || undefined,
    batch: e.batch || undefined,
    message: e.message || undefined,
    college: e.college || undefined,
    degree: e.degree || undefined,
    year: e.year || undefined,
    technology: e.technology || undefined,
    skillLevel: e.skillLevel || undefined,
    projectType: e.projectType || undefined,
    source: e.source || undefined,
    receivedAt: e.createdAt.toISOString(),
  };
}

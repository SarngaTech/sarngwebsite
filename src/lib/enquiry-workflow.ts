import "server-only";
import type { EmailKind } from "@prisma/client";
import { site } from "@/data/site";
import { db, dbConfigured } from "./db";
import type { LeadPayload } from "./leads";
import { createEnquiry, recordEmail, addEvent, leadFromEnquiry } from "./enquiry-store";
import { runAdapters, sendAutoReply, sendNotification, type EmailResult, type ResumeMeta } from "./lead-handlers";

/**
 * Enquiry workflow:
 *   validated lead → save to PostgreSQL (unique reference) → team notification → webhook → auto-reply
 *   → each email result recorded → reference returned to the visitor.
 * Email failures never lose an enquiry: it is saved first and emails can be resent from /admin.
 */

export const adminUrlFor = (id: string) => `${site.url}/admin/enquiries/${id}`;

export interface ProcessResult {
  ok: boolean;
  reference?: string;
  saved: boolean;
  /** Short reason for a failure — returned to the browser only in development, to make local debugging possible. */
  error?: string;
  /**
   * Email + webhook delivery for a saved enquiry. The API route runs this after the response is sent
   * (Next.js `after()`), so a slow or unreachable mail server never delays the visitor's confirmation.
   */
  deliver?: () => Promise<void>;
}

const describe = (err: unknown) => {
  const e = err as { code?: string; message?: string };
  const msg = (e?.message || String(err)).replace(/\s+/g, " ").trim();
  return `${e?.code ? `${e.code}: ` : ""}${msg}`.slice(0, 400);
};

export async function processEnquiry(lead: LeadPayload, ctx: { ipHash?: string; userAgent?: string; resume?: ResumeMeta }): Promise<ProcessResult> {
  const stamped = { ...lead, receivedAt: new Date().toISOString() };

  // 1. Save permanently.
  let enquiry: Awaited<ReturnType<typeof createEnquiry>> | null = null;
  let dbError = "";
  if (dbConfigured()) {
    try {
      enquiry = await createEnquiry(lead, ctx);
    } catch (err) {
      dbError = describe(err);
      if ((err as { code?: string })?.code === "P2021") {
        console.error("[lead] The enquiry tables do not exist in this database yet. Run `npm run db:migrate` (needs DATABASE_URL_UNPOOLED).");
      }
      console.error("[lead] could not save enquiry to the database:", dbError);
    }
  } else {
    dbError = "DATABASE_URL is not set";
    console.error("[lead] DATABASE_URL is not set — enquiry cannot be saved");
  }

  // Database unavailable: the team email becomes the only record. Succeed only if it is delivered.
  if (!enquiry) {
    const backup = await sendNotification(stamped, ctx.resume, { saved: false });
    await runAdapters(stamped, ctx.resume);
    if (backup.status !== "SENT") {
      return { ok: false, saved: false, error: `Database: ${dbError}. Backup email: ${backup.status}${backup.error ? ` (${backup.error})` : ""}` };
    }
    await sendAutoReply(lead);
    return { ok: true, saved: false };
  }

  const saved = enquiry;
  const meta = { reference: saved.reference, adminUrl: adminUrlFor(saved.id) };

  // 2–4. Team notification, auto-reply (in parallel) and optional webhook — each result recorded.
  const deliver = async () => {
    await Promise.all([
      sendNotification(stamped, ctx.resume, meta).then((r) => safeRecord(saved.id, "NOTIFICATION", r, "submission")),
      sendAutoReply(lead, { reference: saved.reference }).then((r) => safeRecord(saved.id, "AUTO_REPLY", r, "submission")),
      runAdapters({ ...stamped, reference: saved.reference }, ctx.resume),
    ]);
  };

  return { ok: true, reference: saved.reference, saved: true, deliver };
}

async function safeRecord(enquiryId: string, kind: EmailKind, result: EmailResult, trigger: "submission" | "resend") {
  try {
    await recordEmail(enquiryId, kind, result, trigger);
  } catch (err) {
    console.error("[lead] could not record email result", err);
  }
}

/** Resend the team notification or the visitor auto-reply for a saved enquiry (admin action). */
export async function resendEmail(enquiryId: string, kind: EmailKind): Promise<EmailResult> {
  const enquiry = await db().enquiry.findUnique({ where: { id: enquiryId }, include: { resume: true } });
  if (!enquiry) throw new Error("Enquiry not found");
  const lead = leadFromEnquiry(enquiry);
  const result =
    kind === "NOTIFICATION"
      ? await sendNotification(
          lead,
          enquiry.resume
            ? { name: enquiry.resume.fileName, size: enquiry.resume.size, type: enquiry.resume.mimeType, data: enquiry.resume.data }
            : undefined,
          { reference: enquiry.reference, adminUrl: adminUrlFor(enquiry.id) },
        )
      : await sendAutoReply(lead, { reference: enquiry.reference });
  await recordEmail(enquiry.id, kind, result, "resend");
  await addEvent(
    enquiry.id,
    "email_resent",
    `${kind === "NOTIFICATION" ? "Team notification" : "Auto-reply"} resent: ${result.status}${result.error ? ` (${result.error})` : ""}`,
  );
  return result;
}

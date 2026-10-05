import "server-only";
import nodemailer from "nodemailer";
import type { LeadPayload } from "./leads";
import { site } from "@/data/site";
import { autoReplyEmail, notificationEmail, type EmailMeta } from "./email-templates";

/**
 * Server-side lead delivery: email (GoDaddy SMTP via Nodemailer) and optional webhook.
 * Every send returns a result instead of throwing, so the caller can record it against the saved enquiry.
 * Secrets are read from server-only environment variables and never reach the browser.
 */
export interface ResumeMeta {
  name: string;
  size: number;
  type: string;
  /** Raw bytes of the uploaded file */
  data: ArrayBuffer | Uint8Array;
}

export type EmailOutcome = "SENT" | "FAILED" | "SKIPPED";

export interface EmailResult {
  status: EmailOutcome;
  recipient: string;
  subject: string;
  messageId?: string;
  error?: string;
}

export type StampedLead = LeadPayload & { receivedAt: string };

/* ---------------------------------------------------------------------------
 * SMTP transport
 * ------------------------------------------------------------------------- */
let transporter: nodemailer.Transporter | null = null;
function getTransport(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (process.env.MAIL_TRANSPORT === "json") {
    transporter = nodemailer.createTransport({ jsonTransport: true }); // test mode: no real email sent
    return transporter;
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // Keep serverless functions responsive if the mail server is slow or unreachable.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    dnsTimeout: 10_000,
  });
  return transporter;
}

export const emailConfigured = () => getTransport() !== null;

/** Connects and logs in to the mail server without sending anything (used by the admin Setup check). */
export async function verifyEmail(): Promise<{ status: "OK" | "FAILED" | "SKIPPED"; detail: string }> {
  const t = getTransport();
  if (!t) return { status: "SKIPPED", detail: "SMTP_HOST, SMTP_USER or SMTP_PASS is not set." };
  if (process.env.MAIL_TRANSPORT === "json") return { status: "OK", detail: "Test mode (MAIL_TRANSPORT=json): emails are written to the server log." };
  try {
    await t.verify();
    return { status: "OK", detail: `Logged in to ${process.env.SMTP_HOST}:${process.env.SMTP_PORT || 465} as ${process.env.SMTP_USER}.` };
  } catch (err) {
    return { status: "FAILED", detail: errorText(err) };
  }
}

/** Sender must be the authenticated GoDaddy mailbox (SMTP_USER), e.g. director@sarnginfotech.com. */
const mailFrom = () => process.env.MAIL_FROM || `${site.name} <${process.env.SMTP_USER || site.contact.email}>`;
/** Team inbox that receives every enquiry (comma-separate several). */
export const notifyTo = () => process.env.LEAD_NOTIFY_TO || site.contact.email;

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err)).slice(0, 500);

function toBuffer(data: ArrayBuffer | Uint8Array) {
  return data instanceof Uint8Array ? Buffer.from(data.buffer, data.byteOffset, data.byteLength) : Buffer.from(data);
}

/** Team notification to LEAD_NOTIFY_TO, Reply-To set to the visitor. Never throws. */
export async function sendNotification(lead: StampedLead, resume?: ResumeMeta, meta: EmailMeta = {}): Promise<EmailResult> {
  const mail = notificationEmail(lead, resume?.name, meta);
  const recipient = notifyTo();
  const t = getTransport();
  if (!t) return { status: "SKIPPED", recipient, subject: mail.subject, error: "Email is not configured (SMTP settings missing)." };
  try {
    const info = await t.sendMail({
      from: mailFrom(),
      to: recipient,
      replyTo: `${lead.name} <${lead.email}>`,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      attachments: resume ? [{ filename: resume.name, content: toBuffer(resume.data), contentType: resume.type }] : undefined,
    });
    if (process.env.MAIL_TRANSPORT === "json") console.info("[mail:notification]", info.message);
    return { status: "SENT", recipient, subject: mail.subject, messageId: info.messageId };
  } catch (err) {
    console.error("[lead] notification email failed", err);
    return { status: "FAILED", recipient, subject: mail.subject, error: errorText(err) };
  }
}

/** Personalised auto-reply to the visitor, Reply-To set to the team inbox. Never throws. */
export async function sendAutoReply(lead: LeadPayload, meta: EmailMeta = {}): Promise<EmailResult> {
  const mail = autoReplyEmail(lead, meta);
  const recipient = lead.email;
  const t = getTransport();
  if (!t) return { status: "SKIPPED", recipient, subject: mail.subject, error: "Email is not configured (SMTP settings missing)." };
  try {
    const info = await t.sendMail({
      from: mailFrom(),
      to: `${lead.name} <${lead.email}>`,
      replyTo: notifyTo(),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    if (process.env.MAIL_TRANSPORT === "json") console.info("[mail:auto-reply]", info.message);
    return { status: "SENT", recipient, subject: mail.subject, messageId: info.messageId };
  } catch (err) {
    console.error("[lead] auto-reply failed", err);
    return { status: "FAILED", recipient, subject: mail.subject, error: errorText(err) };
  }
}

/* ---------------------------------------------------------------------------
 * Optional extra destinations (CRM, Zapier, Make, n8n…)
 * ------------------------------------------------------------------------- */
type Adapter = (lead: StampedLead & { reference?: string }, resume?: ResumeMeta) => Promise<void>;

/** Generic webhook — receives every enquiry as JSON when LEAD_WEBHOOK_URL is set. */
const webhookAdapter: Adapter = async (lead, resume) => {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...lead, resume: resume ? { name: resume.name, size: resume.size, type: resume.type } : undefined }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
};

/** Development fallback so submissions are visible in the server log. */
const logAdapter: Adapter = async (lead, resume) => {
  if (process.env.NODE_ENV !== "production") {
    console.info("[lead]", JSON.stringify({ ...lead, resume: resume?.name }, null, 2));
  }
};

const adapters: Adapter[] = [webhookAdapter, logAdapter];

export async function runAdapters(lead: StampedLead & { reference?: string }, resume?: ResumeMeta) {
  const results = await Promise.allSettled(adapters.map((a) => a(lead, resume)));
  results.forEach((r) => r.status === "rejected" && console.error("[lead] adapter failure", r.reason));
}

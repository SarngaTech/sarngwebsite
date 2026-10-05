import { NextResponse, after } from "next/server";
import { validateLead, batchRelevant, RESUME_MAX_BYTES, RESUME_TYPES, type LeadPayload, type LeadType, HONEYPOT_FIELD } from "@/lib/leads";
import type { ResumeMeta } from "@/lib/lead-handlers";
import { processEnquiry } from "@/lib/enquiry-workflow";
import { dbConfigured } from "@/lib/db";
import { hashIp, recentSubmissionCount } from "@/lib/enquiry-store";

export const runtime = "nodejs";
// Allow time for the database write plus two SMTP sends.
export const maxDuration = 30;

/** Shared (database-backed) limit: works across Vercel's serverless instances. */
const DB_LIMIT = { max: 8, minutes: 10 };

const FIELDS: (keyof LeadPayload)[] = [
  "type", "name", "email", "phone", "message", "interest", "persona",
  "college", "degree", "year", "technology", "skillLevel", "projectType", "batch", "source",
];

// Basic in-memory rate limit (per server instance). Replace with a shared store in multi-instance deployments.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields
  if (form.get(HONEYPOT_FIELD)) return NextResponse.json({ ok: true });

  const lead: Partial<LeadPayload> = {};
  for (const f of FIELDS) {
    const v = form.get(f);
    if (typeof v === "string" && v.trim()) (lead as Record<string, string>)[f] = v.trim().slice(0, 2000);
  }
  const allowed: LeadType[] = ["enquiry", "contact", "internship", "project"];
  if (!lead.type || !allowed.includes(lead.type)) lead.type = "enquiry";
  // Batch preference only applies to course / bootcamp enquiries.
  if (lead.type === "internship" || lead.type === "project" || !batchRelevant(lead.interest, lead.persona)) delete lead.batch;

  const errors = validateLead(lead);

  let resume: ResumeMeta | undefined;
  const file = form.get("resume");
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > RESUME_MAX_BYTES) errors.resume = "Resume must be 4 MB or smaller.";
    else if (!RESUME_TYPES.includes(file.type)) errors.resume = "Please upload a PDF or Word document.";
    else resume = { name: file.name, size: file.size, type: file.type, data: await file.arrayBuffer() };
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const ipHash = ip !== "unknown" ? hashIp(ip) : undefined;
  if (ipHash && dbConfigured()) {
    try {
      if ((await recentSubmissionCount(ipHash, DB_LIMIT.minutes)) >= DB_LIMIT.max) {
        return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
      }
    } catch (err) {
      console.error("[lead] rate-limit check failed", err); // never block a genuine enquiry because of this check
    }
  }

  try {
    const result = await processEnquiry(lead as LeadPayload, {
      ipHash,
      userAgent: req.headers.get("user-agent") || undefined,
      resume,
    });
    if (!result.ok) {
      return NextResponse.json({ message: failMessage(result.error) }, { status: 502 });
    }
    // Emails run after the response is sent, so the visitor gets their reference immediately.
    if (result.deliver) after(result.deliver);
    return NextResponse.json({ ok: true, reference: result.reference ?? null });
  } catch (err) {
    console.error("[lead] unexpected error", err);
    return NextResponse.json({ message: failMessage(err instanceof Error ? err.message : String(err)) }, { status: 502 });
  }
}

/** Generic message for visitors; in local development the real reason is appended so problems are visible. */
function failMessage(detail?: string) {
  const base = "We couldn't submit your request right now. Please call or email us.";
  return process.env.NODE_ENV === "development" && detail ? `${base} [dev: ${detail}]` : base;
}

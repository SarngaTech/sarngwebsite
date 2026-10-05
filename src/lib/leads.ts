/**
 * Lead model shared by the client forms and the /api/enquiry route.
 * Keep this file free of secrets — it is imported by client components.
 */
export type LeadType = "enquiry" | "contact" | "internship" | "project";

export interface LeadPayload {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  /** Course / service the person is interested in */
  interest?: string;
  /** Student / Professional / College / Business */
  persona?: string;
  college?: string;
  degree?: string;
  year?: string;
  technology?: string;
  skillLevel?: string;
  /** Preferred batch: weekday / weekend */
  batch?: string;
  /** Mini / Final-year / Portfolio project */
  projectType?: string;
  /** Page the form was submitted from */
  source?: string;
  /** "yes" when the person ticked the privacy-notice checkbox (required on every form) */
  privacyConsent?: string;
}

/* ---------------------------------------------------------------------------
 * Privacy notice / consent (Digital Personal Data Protection Act, 2023)
 * ------------------------------------------------------------------------- */
export const PRIVACY_POLICY_PATH = "/privacy-policy";
/** Effective date of the privacy policy; recorded with each consent so it is clear which notice was accepted. */
export const PRIVACY_NOTICE_VERSION = "2026-10-05";
export const PRIVACY_CONSENT_ERROR = "Please review and accept the privacy notice before submitting.";

/**
 * Hidden anti-spam (honeypot) field. Deliberately given a neutral name and label and made read-only so browser
 * autofill and password managers never fill it — only bots that blindly fill every input do.
 */
export const HONEYPOT_FIELD = "hp_check_field";

export const personas = ["Student", "Professional", "College", "Business"] as const;

/* ---------------------------------------------------------------------------
 * Context-aware enquiry questions — shared by the forms (what to show) and the API (what to keep).
 * ------------------------------------------------------------------------- */
export const isBusinessInterest = (interest?: string) => (interest || "").startsWith("Business:");

/** Batch preference only applies to someone joining a course or bootcamp — not businesses, colleges, internships or projects. */
export function batchRelevant(interest?: string, persona?: string) {
  const i = (interest || "").trim();
  if (persona === "Business" || persona === "College") return false;
  if (isBusinessInterest(i) || i === "College Training Programme" || i === "Internship" || i === "Student Project") return false;
  return true;
}

/** The "I am a" answer implied by an interest (used to pre-select it). */
export function personaForInterest(interest?: string): string | undefined {
  const i = (interest || "").trim();
  if (isBusinessInterest(i)) return "Business";
  if (i === "College Training Programme") return "College";
  if (i === "Internship" || i === "Student Project") return "Student";
  return undefined;
}

/** Interest options that make sense for the chosen "I am a" answer. */
export function interestsForPersona(all: readonly string[], persona?: string) {
  if (persona === "Business") return all.filter((o) => isBusinessInterest(o) || o === "Other");
  if (persona === "College") return all.filter((o) => !isBusinessInterest(o) && o !== "Student Project");
  if (persona === "Student" || persona === "Professional") return all.filter((o) => !isBusinessInterest(o) && o !== "College Training Programme");
  return all;
}

/** Message hint that matches the enquiry. */
export function messageHint(interest?: string, persona?: string) {
  const i = (interest || "").trim();
  if (persona === "Business" || isBusinessInterest(i)) return "Briefly describe your requirement — what you need, any existing website or system, and your timeline (optional)";
  if (persona === "College" || i === "College Training Programme") return "College name, department, number of students and technologies of interest (optional)";
  if (i === "Student Project") return "Your project idea, college guidelines and submission date (optional)";
  if (i === "Internship") return "Your college, degree and the technology you are interested in (optional)";
  return "Anything you'd like us to know (optional)";
}
export const contactPersonas = ["Student", "College", "Business"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

export type FieldErrors = Partial<Record<keyof LeadPayload | "resume", string>>;

export function validateLead(p: Partial<LeadPayload>): FieldErrors {
  const e: FieldErrors = {};
  if (!p.name || p.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!p.email || !EMAIL_RE.test(p.email.trim())) e.email = "Please enter a valid email address.";
  if (!p.phone || !PHONE_RE.test(p.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (p.message && p.message.length > 2000) e.message = "Message is too long (max 2000 characters).";
  if (p.type === "internship") {
    if (!p.college?.trim()) e.college = "Please enter your college.";
    if (!p.degree?.trim()) e.degree = "Please enter your degree.";
    if (!p.year) e.year = "Please select your year of study.";
    if (!p.technology) e.technology = "Please select a technology.";
    if (!p.skillLevel) e.skillLevel = "Please select your skill level.";
  }
  if (p.type === "project") {
    if (!p.college?.trim()) e.college = "Please enter your college.";
    if (!p.projectType) e.projectType = "Please select a project type.";
    if (!p.technology) e.technology = "Please select a technology.";
  }
  // Last, so the first highlighted field stays in form order. Checked in the browser and again on the
  // server (the API route runs this same function), so it cannot be bypassed by skipping the form.
  if (p.privacyConsent !== "yes") e.privacyConsent = PRIVACY_CONSENT_ERROR;
  return e;
}

/** 4 MB — Vercel rejects request bodies over 4.5 MB. */
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Submit a lead from the browser. Uses multipart so the internship form can include a resume. */
export async function submitLead(
  payload: LeadPayload,
  resume?: File | null,
): Promise<{ ok: boolean; reference?: string; errors?: FieldErrors; message?: string }> {
  // Static preview builds have no server: simulate a successful submission.
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === "1") {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }
  // Static preview builds have no server: simulate a successful submission.
  if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1") {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }
  const fd = new FormData();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(k, String(v));
  });
  if (resume) fd.append("resume", resume);
  try {
    const res = await fetch("/api/enquiry", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, errors: data.errors, message: data.message || "Something went wrong. Please try again." };
    if (typeof data.warning === "string") console.warn(`[enquiry] ${data.warning}`);
    return { ok: true, reference: typeof data.reference === "string" ? data.reference : undefined };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

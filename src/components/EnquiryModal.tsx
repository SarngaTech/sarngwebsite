"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { courses } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { services } from "@/data/services";
import { site } from "@/data/site";
import {
  personas,
  submitLead,
  validateLead,
  batchRelevant,
  interestsForPersona,
  messageHint,
  personaForInterest,
  type FieldErrors,
  type LeadPayload,
  HONEYPOT_FIELD,
} from "@/lib/leads";
import { Honeypot, PrivacyConsent, SelectField, SuccessMessage, TextAreaField, TextField } from "./ui/FormFields";

export const interestOptions = [
  ...courses.map((c) => c.title),
  ...bootcamps.map((b) => `${b.title} (Online Bootcamp)`),
  "Internship",
  "Student Project",
  ...services.map((s) => `Business: ${s.title}`),
  "College Training Programme",
  "Other",
];

interface EnquiryCtx {
  open: (opts?: { interest?: string; persona?: string }) => void;
}
const Ctx = createContext<EnquiryCtx>({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [defaults, setDefaults] = useState<{ interest?: string; persona?: string }>({});
  const open = useCallback((opts?: { interest?: string; persona?: string }) => {
    setDefaults(opts || {});
    setOpen(true);
  }, []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && <EnquiryModal defaults={defaults} onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}

function EnquiryModal({ defaults, onClose }: { defaults: { interest?: string; persona?: string }; onClose: () => void }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState<string>();
  const [interest, setInterest] = useState(defaults.interest || "");
  const [persona, setPersona] = useState(defaults.persona || personaForInterest(defaults.interest) || "");
  const showBatch = batchRelevant(interest, persona);
  const interestChoices = interestsForPersona(interestOptions, persona);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const first = dialogRef.current?.querySelector<HTMLElement>("input, select, textarea, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input:not([tabindex="-1"]), select, textarea');
        const list = Array.from(f).filter((el) => !el.hasAttribute("disabled"));
        if (!list.length) return;
        const firstEl = list[0], lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get(HONEYPOT_FIELD)) return;
    const payload: LeadPayload = {
      type: "enquiry",
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      interest: String(fd.get("interest") || ""),
      persona: String(fd.get("persona") || ""),
      batch: showBatch ? String(fd.get("batch") || "") : "",
      message: String(fd.get("message") || ""),
      source: typeof window !== "undefined" ? window.location.pathname : undefined,
      privacyConsent: fd.get("privacyConsent") === "yes" ? "yes" : "",
    };
    const v = validateLead(payload);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus("sending");
    setFormError("");
    const res = await submitLead(payload);
    if (res.ok) {
      setReference(res.reference);
      setStatus("done");
    }
    else {
      setStatus("idle");
      setErrors(res.errors || {});
      setFormError(res.message || "");
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm animate-[fade-up_.2s_ease-out]" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-xl sm:rounded-3xl animate-fade-up"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-surface-line bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <h2 id="enquiry-title" className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
              Enquire Now
            </h2>
            <p className="mt-1 text-sm text-ink-soft">Tell us what you&apos;re looking for — our team will get in touch.</p>
          </div>
          <button type="button" onClick={onClose} className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface" aria-label="Close enquiry form">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pb-8 pt-6 sm:px-8">
          {status === "done" ? (
            <SuccessMessage title="Thank you! Our team will contact you shortly." reference={reference} onReset={onClose} resetLabel="Close" />
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-2">
              <Honeypot />
              <TextField label="Name" name="name" autoComplete="name" required error={errors.name} className="sm:col-span-2" />
              <TextField label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required error={errors.phone} />
              <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
              <SelectField
                label="I am a"
                name="persona"
                options={personas}
                value={persona}
                onChange={(e) => {
                  const next = e.target.value;
                  setPersona(next);
                  if (interest && !interestsForPersona(interestOptions, next).includes(interest)) setInterest("");
                }}
                placeholder="Student / Professional / College / Business"
                className={showBatch ? undefined : "sm:col-span-2"}
              />
              {showBatch && <SelectField label="Preferred Batch" name="batch" options={site.batches.options} placeholder="Select a batch" />}
              <SelectField
                label={persona === "Business" ? "Service Required" : "Interested Course / Service"}
                name="interest"
                options={interestChoices}
                value={interest}
                onChange={(e) => {
                  const next = e.target.value;
                  setInterest(next);
                  const implied = personaForInterest(next);
                  if (implied && !(implied === "Student" && persona === "Professional")) setPersona(implied);
                }}
                className="sm:col-span-2"
              />
              <TextAreaField label={persona === "Business" ? "Requirement" : "Message"} name="message" placeholder={messageHint(interest, persona)} error={errors.message} className="sm:col-span-2" />
              <PrivacyConsent error={errors.privacyConsent} className="sm:col-span-2" />
              {formError && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{formError}</p>}
              <button type="submit" disabled={status === "sending"} className="btn-primary mt-1 w-full sm:col-span-2">
                {status === "sending" ? "Submitting…" : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/** Button that opens the enquiry modal — usable from server components. */
export function EnquireButton({
  children = "Enquire Now",
  interest,
  persona,
  className = "btn-primary",
}: {
  children?: React.ReactNode;
  interest?: string;
  persona?: string;
  className?: string;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} data-enquire="" data-interest={interest} data-persona={persona} onClick={() => open({ interest, persona })}>
      {children}
    </button>
  );
}

"use client";
import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { internship } from "@/data/internships";
import { RESUME_MAX_BYTES, RESUME_TYPES, submitLead, validateLead, type FieldErrors, type LeadPayload, HONEYPOT_FIELD } from "@/lib/leads";
import { Honeypot, PrivacyConsent, SelectField, SuccessMessage, TextAreaField, TextField } from "./ui/FormFields";

export default function InternshipForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState<string>();
  const [fileName, setFileName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get(HONEYPOT_FIELD)) return;
    const g = (k: string) => String(fd.get(k) || "");
    const payload: LeadPayload = {
      type: "internship",
      name: g("name"), email: g("email"), phone: g("phone"),
      college: g("college"), degree: g("degree"), year: g("year"),
      technology: g("technology"), skillLevel: g("skillLevel"), message: g("message"),
      source: "/internships",
      privacyConsent: g("privacyConsent") === "yes" ? "yes" : "",
    };
    const v = validateLead(payload);
    const file = fd.get("resume") as File | null;
    const resume = file && file.size > 0 ? file : null;
    if (resume) {
      if (resume.size > RESUME_MAX_BYTES) v.resume = "Resume must be 4 MB or smaller.";
      else if (!RESUME_TYPES.includes(resume.type)) v.resume = "Please upload a PDF or Word document.";
    }
    setErrors(v);
    if (Object.keys(v).length) {
      const first = formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(v)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    setFormError("");
    const res = await submitLead(payload, resume);
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

  if (status === "done") {
    return (
      <SuccessMessage
        title="Application received!"
        text="Thank you for applying. Our team will review your application and contact you with the next steps of the selection process."
        reference={reference}
        onReset={() => { setStatus("idle"); setFileName(""); }}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Internship application">
      <Honeypot />
      <TextField label="Full Name" name="name" autoComplete="name" required error={errors.name} className="sm:col-span-2" />
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      <TextField label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required error={errors.phone} />
      <TextField label="College" name="college" required error={errors.college} className="sm:col-span-2" />
      <TextField label="Degree" name="degree" placeholder="e.g. B.E. Computer Science" required error={errors.degree} />
      <SelectField label="Year of Study" name="year" options={internship.years} required error={errors.year} />
      <SelectField label="Interested Technology" name="technology" options={internship.technologies} required error={errors.technology} />
      <SelectField label="Current Skill Level" name="skillLevel" options={internship.skillLevels} required error={errors.skillLevel} />

      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold text-navy-900">Resume Upload</span>
        <label
          htmlFor="resume"
          className="flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-surface-line bg-surface px-4 py-5 text-center transition hover:border-brand-royal focus-within:border-brand-royal focus-within:ring-4 focus-within:ring-blue-100"
        >
          <FileUp className="h-6 w-6 text-brand-royal" aria-hidden />
          <span className="text-sm font-semibold text-navy-900">{fileName || "Choose a file or drag it here"}</span>
          <span className="text-xs text-ink-mute">PDF or Word, up to 4 MB</span>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-describedby={errors.resume ? "resume-error" : undefined}
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
        </label>
        {errors.resume && <p id="resume-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.resume}</p>}
      </div>

      <TextAreaField label="Message" name="message" placeholder="Tell us about your interests, projects or goals (optional)" error={errors.message} className="sm:col-span-2" />

      <PrivacyConsent error={errors.privacyConsent} purpose="process my internship application (including any resume I upload)" className="sm:col-span-2" />
      {formError && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{formError}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-accent w-full sm:col-span-2">
        {status === "sending" ? "Submitting…" : "Apply Now"}
      </button>
      <p className="text-center text-xs text-ink-mute sm:col-span-2">{internship.disclaimer}</p>
    </form>
  );
}

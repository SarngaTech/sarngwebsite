"use client";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { internship } from "@/data/internships";
import { submitLead, validateLead, type FieldErrors, type LeadPayload, HONEYPOT_FIELD } from "@/lib/leads";
import { Honeypot, SelectField, SuccessMessage, TextAreaField, TextField } from "./ui/FormFields";

export default function ProjectForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get(HONEYPOT_FIELD)) return;
    const g = (k: string) => String(fd.get(k) || "");
    const payload: LeadPayload = {
      type: "project",
      name: g("name"), email: g("email"), phone: g("phone"),
      college: g("college"), degree: g("degree"), year: g("year"),
      projectType: g("projectType"), technology: g("technology"), message: g("message"),
      interest: "Student Project",
      persona: "Student",
      source: "/projects",
    };
    const v = validateLead(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(v)[0]}"]`)?.focus();
      return;
    }
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

  if (status === "done") {
    return (
      <SuccessMessage
        title="Project enquiry received!"
        text="Thank you. Our team will contact you to discuss your project."
        reference={reference}
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Project enquiry">
      <Honeypot />
      <TextField label="Full Name" name="name" autoComplete="name" required error={errors.name} className="sm:col-span-2" />
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      <TextField label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required error={errors.phone} />
      <TextField label="College" name="college" required error={errors.college} className="sm:col-span-2" />
      <TextField label="Degree / Department" name="degree" placeholder="e.g. B.E. Computer Science" error={errors.degree} />
      <SelectField label="Year of Study" name="year" options={internship.years} error={errors.year} />
      <SelectField label="Project Type" name="projectType" options={projects.projectTypes} required error={errors.projectType} />
      <SelectField label="Preferred Technology" name="technology" options={[...projects.domains, "Not sure yet"]} required error={errors.technology} />
      <TextAreaField
        label="Project idea / requirement"
        name="message"
        placeholder="Your topic or idea, college guidelines and submission date (optional)"
        error={errors.message}
        className="sm:col-span-2"
      />
      {formError && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{formError}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:col-span-2">
        {status === "sending" ? "Submitting…" : "Enquire About a Project"}
      </button>
      <p className="text-center text-xs text-ink-mute sm:col-span-2">{projects.note}</p>
    </form>
  );
}

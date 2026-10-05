"use client";
import { useState } from "react";
import {
  contactPersonas,
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
import { interestOptions } from "./EnquiryModal";
import { site } from "@/data/site";

export default function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState<string>();
  const [persona, setPersona] = useState<string>(contactPersonas[0]);
  const [interest, setInterest] = useState("");
  const showBatch = batchRelevant(interest, persona);
  const interestChoices = interestsForPersona(interestOptions, persona);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get(HONEYPOT_FIELD)) return;
    const g = (k: string) => String(fd.get(k) || "");
    const payload: LeadPayload = {
      type: "contact",
      name: g("name"), email: g("email"), phone: g("phone"),
      persona: g("persona"), interest: g("interest"), batch: showBatch ? g("batch") : "", message: g("message"),
      source: "/contact",
      privacyConsent: g("privacyConsent") === "yes" ? "yes" : "",
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

  if (status === "done") return <SuccessMessage title="Thank you! Our team will contact you shortly." reference={reference} onReset={() => setStatus("idle")} />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Contact form">
      <Honeypot />
      <TextField label="Name" name="name" autoComplete="name" required error={errors.name} className="sm:col-span-2" />
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      <TextField label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required error={errors.phone} />
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-navy-900">I am a</legend>
        <div className="grid grid-cols-3 gap-2">
          {contactPersonas.map((p) => (
            <label key={p} className="relative">
              <input
                type="radio"
                name="persona"
                value={p}
                checked={persona === p}
                onChange={() => {
                  setPersona(p);
                  if (interest && !interestsForPersona(interestOptions, p).includes(interest)) setInterest("");
                }}
                className="peer sr-only"
              />
              <span className="flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border border-surface-line bg-white text-sm font-semibold text-ink-soft transition peer-checked:border-brand-royal peer-checked:bg-blue-50 peer-checked:text-brand-royal peer-focus-visible:ring-4 peer-focus-visible:ring-blue-100">
                {p}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <SelectField
        label={persona === "Business" ? "Service Required" : "Interested In"}
        name="interest"
        options={interestChoices}
        value={interest}
        onChange={(e) => {
          const next = e.target.value;
          setInterest(next);
          const implied = personaForInterest(next);
          if (implied && (contactPersonas as readonly string[]).includes(implied)) setPersona(implied);
        }}
        className={showBatch ? undefined : "sm:col-span-2"}
      />
      {showBatch && <SelectField label="Preferred Batch" name="batch" options={site.batches.options} placeholder="Select a batch" />}
      <TextAreaField label={persona === "Business" ? "Requirement" : "Message"} name="message" placeholder={messageHint(interest, persona)} error={errors.message} className="sm:col-span-2" />
      <PrivacyConsent error={errors.privacyConsent} className="sm:col-span-2" />
      {formError && <p className="text-sm text-red-600 sm:col-span-2" role="alert">{formError}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:col-span-2">
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

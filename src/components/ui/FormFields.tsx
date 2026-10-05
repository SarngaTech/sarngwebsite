import Link from "next/link";
import { useId, useState } from "react";
import { HONEYPOT_FIELD, PRIVACY_POLICY_PATH } from "@/lib/leads";
import { cn } from "@/lib/cn";

const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition focus:border-brand-royal focus:outline-none focus:ring-4 focus:ring-blue-100";

interface Common {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
}

function Wrap({ label, name, error, required, className, children }: Common & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {required && <span className="text-brand-royal" aria-hidden> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, name, error, required, className, ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap label={label} name={name} error={error} required={required} className={className}>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(base, error ? "border-red-400" : "border-surface-line")}
        {...rest}
      />
    </Wrap>
  );
}

export function SelectField({
  label, name, error, required, className, options, placeholder = "Select an option", ...rest
}: Common & React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
  return (
    <Wrap label={label} name={name} error={error} required={required} className={className}>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(base, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748B%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10", error ? "border-red-400" : "border-surface-line")}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextAreaField({ label, name, error, required, className, ...rest }: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap label={label} name={name} error={error} required={required} className={className}>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(base, "resize-y", error ? "border-red-400" : "border-surface-line")}
        {...rest}
      />
    </Wrap>
  );
}

/**
 * Privacy notice + consent checkbox shown above the submit button on every enquiry form.
 * Unchecked by default; the form (and the API) refuse the submission until it is ticked.
 * The Privacy Policy link opens in a new tab so a half-filled form is never lost.
 */
export function PrivacyConsent({
  error,
  purpose = "respond to my enquiry",
  className,
}: {
  error?: string;
  /** What the details will be used for, e.g. "process my internship application" */
  purpose?: string;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const [checked, setChecked] = useState(false);
  const showError = error && !checked;
  const policyLink = (
    <Link href={PRIVACY_POLICY_PATH} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-royal underline underline-offset-2 hover:text-navy-900">
      Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
  return (
    <div className={cn("rounded-xl border bg-surface px-4 py-3", showError ? "border-red-400" : "border-surface-line", className)}>
      <p className="text-xs leading-relaxed text-ink-soft">
        Your information will be used to {purpose.replace(/\bmy\b/g, "your").replace(/\bI\b/g, "you")} and handled as described in our {policyLink}.
      </p>
      <label className="mt-2.5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy-900">
        <input
          type="checkbox"
          name="privacyConsent"
          value="yes"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          required
          aria-invalid={!!showError}
          aria-describedby={showError ? errorId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-400 accent-brand-royal focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        />
        <span>
          I agree that Sarng Infotech may collect and use the information I provide to {purpose}, as described in the {policyLink}.
          <span className="text-brand-royal" aria-hidden> *</span>
        </span>
      </label>
      {showError && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot field to deter bots */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          readOnly
          data-lpignore="true"
          data-1p-ignore=""
          data-form-type="other"
          defaultValue=""
        />
      </label>
    </div>
  );
}

export function SuccessMessage({
  title,
  text,
  reference,
  onReset,
  resetLabel = "Submit another response",
}: {
  title: string;
  text?: string;
  /** Enquiry reference number returned by the server */
  reference?: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center py-10 text-center">
      <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal to-brand-green text-white shadow-glow">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="font-display text-2xl font-bold text-navy-900">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-ink-soft">{text}</p>}
      {reference && (
        <p className="mt-5 rounded-2xl border border-surface-line bg-surface px-5 py-3 text-sm text-ink-soft">
          Your reference number
          <strong className="mt-0.5 block font-display text-xl tracking-wide text-brand-royal" data-reference>{reference}</strong>
          <span className="mt-0.5 block text-xs text-ink-mute">We have also emailed you a confirmation.</span>
        </p>
      )}
      {onReset && (
        <button type="button" onClick={onReset} className="btn-ghost mt-6">
          {resetLabel}
        </button>
      )}
    </div>
  );
}

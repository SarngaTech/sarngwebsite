import Link from "next/link";
import type { EmailStatus, EnquiryStatus, EnquiryType } from "@prisma/client";
import { EMAIL_STATUS_LABEL, STATUS_LABEL, TYPE_LABEL } from "@/lib/enquiry-store";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

export const fmtDate = (d: Date) =>
  d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const STATUS_STYLE: Record<EnquiryStatus, string> = {
  NEW: "bg-blue-50 text-brand-royal ring-blue-200",
  CONTACTED: "bg-sky-50 text-sky-700 ring-sky-200",
  FOLLOW_UP: "bg-amber-50 text-amber-800 ring-amber-200",
  ENROLLED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CLOSED: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return <span className={cn("inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", STATUS_STYLE[status])}>{STATUS_LABEL[status]}</span>;
}

const EMAIL_STYLE: Record<EmailStatus, string> = {
  SENT: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  FAILED: "bg-red-50 text-red-700 ring-red-200",
  SKIPPED: "bg-amber-50 text-amber-800 ring-amber-200",
  PENDING: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function EmailBadge({ status, label }: { status: EmailStatus; label?: string }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1", EMAIL_STYLE[status])}>
      {label ? `${label}: ` : ""}
      {EMAIL_STATUS_LABEL[status]}
    </span>
  );
}

export function TypeBadge({ type }: { type: EnquiryType }) {
  return <span className="inline-flex whitespace-nowrap rounded-md bg-navy-900/5 px-2 py-0.5 text-xs font-semibold text-navy-800">{TYPE_LABEL[type]}</span>;
}

export function AdminHeader() {
  return (
    <header className="border-b border-surface-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/admin" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/sarng-symbol.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-bold text-navy-900">Enquiry Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/admin/health" className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:text-navy-900">
            Setup check
          </Link>
          <Link href="/" className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:text-navy-900 sm:inline-flex">
            View website
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="rounded-full border border-surface-line px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-surface">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export function DbError({ error }: { error: unknown }) {
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
      <p className="font-display text-base font-bold">The enquiry database could not be reached.</p>
      <p className="mt-2">Check that DATABASE_URL is set in Vercel and that migrations have run.</p>
      <p className="mt-2 font-mono text-xs opacity-80">{error instanceof Error ? error.message.slice(0, 300) : String(error).slice(0, 300)}</p>
    </div>
  );
}

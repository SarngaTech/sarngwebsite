import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Eye, FileText, Mail, Phone, RefreshCw } from "lucide-react";
import type { EmailKind, EmailStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { EMAIL_STATUS_LABEL, STATUS_FLOW, STATUS_LABEL, TYPE_LABEL } from "@/lib/enquiry-store";
import { addNoteAction, resendEmailAction, updateStatusAction } from "../../actions";
import { AdminHeader, DbError, EmailBadge, StatusBadge, TypeBadge, fmtDate } from "@/components/admin/AdminUI";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const KIND_LABEL: Record<EmailKind, string> = { NOTIFICATION: "Team notification", AUTO_REPLY: "Auto-reply to visitor" };

export default async function EnquiryDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;

  let e;
  try {
    e = await db().enquiry.findUnique({
      where: { id },
      include: {
        resume: { select: { fileName: true, mimeType: true, size: true } },
        notes: { orderBy: { createdAt: "desc" } },
        emails: { orderBy: { createdAt: "desc" } },
        events: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch (err) {
    return (
      <>
        <AdminHeader />
        <DbError error={err} />
      </>
    );
  }
  if (!e) notFound();

  const fields: [string, string | null][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone],
    ["I am a", e.persona],
    ["Interested in", e.interest],
    ["Preferred batch", e.batch],
    ["College", e.college],
    ["Degree / department", e.degree],
    ["Year of study", e.year],
    ["Project type", e.projectType],
    ["Technology", e.technology],
    ["Skill level", e.skillLevel],
    ["Submitted from", e.source],
    ["Received", fmtDate(e.createdAt)],
  ];
  const lastUpdate = e.updatedAt.getTime() - e.createdAt.getTime() > 2000 ? fmtDate(e.updatedAt) : null;
  const resent = sp.resent === "NOTIFICATION" || sp.resent === "AUTO_REPLY" ? (sp.resent as EmailKind) : null;
  const resentStatus = (["SENT", "FAILED", "SKIPPED"] as EmailStatus[]).find((s) => s === sp.result);
  const card = "rounded-2xl border border-surface-line bg-white p-5 shadow-soft sm:p-6";
  const field =
    "w-full rounded-xl border border-surface-line bg-white px-3 py-2.5 text-sm text-navy-900 focus:border-brand-royal focus:outline-none focus:ring-4 focus:ring-blue-100";

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-navy-900">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All enquiries
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-semibold text-brand-royal">{e.reference}</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{e.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <TypeBadge type={e.type} />
              <StatusBadge status={e.status} />
              <span className="text-sm text-ink-mute">
                Received {fmtDate(e.createdAt)}
                {lastUpdate ? ` · updated ${lastUpdate}` : ""}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="btn-ghost !min-h-[42px] !px-4 !py-2 text-sm">
              <Phone className="h-4 w-4" aria-hidden /> Call
            </a>
            <a href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: your enquiry ${e.reference}`)}`} className="btn-primary !min-h-[42px] !px-4 !py-2 text-sm">
              <Mail className="h-4 w-4" aria-hidden /> Email
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            <section className={card} aria-labelledby="details-title">
              <h2 id="details-title" className="font-display text-lg font-bold text-navy-900">
                Enquiry details
              </h2>
              <dl className="mt-4 divide-y divide-surface-line text-sm">
                {fields
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[150px_1fr] gap-3 py-2.5">
                      <dt className="text-ink-mute">{k}</dt>
                      <dd className="break-words font-medium text-navy-900">{v}</dd>
                    </div>
                  ))}
              </dl>
              {e.message && (
                <div className="mt-4">
                  <p className="text-sm text-ink-mute">Message</p>
                  <p className="mt-1 whitespace-pre-wrap rounded-xl bg-surface p-4 text-[15px] leading-relaxed text-navy-900">{e.message}</p>
                </div>
              )}
            </section>

            {e.resume && (
              <section className={card} aria-labelledby="resume-title">
                <h2 id="resume-title" className="font-display text-lg font-bold text-navy-900">
                  Resume
                </h2>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="h-6 w-6 shrink-0 text-brand-royal" aria-hidden />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-navy-900">{e.resume.fileName}</p>
                      <p className="text-xs text-ink-mute">{(e.resume.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {e.resume.mimeType === "application/pdf" && (
                      <a href={`/api/admin/enquiries/${e.id}/resume`} target="_blank" rel="noopener" className="btn-ghost !min-h-[38px] !px-3 !py-1.5 text-sm">
                        <Eye className="h-4 w-4" aria-hidden /> View
                      </a>
                    )}
                    <a href={`/api/admin/enquiries/${e.id}/resume?download=1`} className="btn-primary !min-h-[38px] !px-3 !py-1.5 text-sm">
                      <Download className="h-4 w-4" aria-hidden /> Download
                    </a>
                  </div>
                </div>
              </section>
            )}

            <section id="emails" className={card} aria-labelledby="emails-title">
              <h2 id="emails-title" className="font-display text-lg font-bold text-navy-900">
                Emails
              </h2>
              {resent && resentStatus && (
                <p
                  role="status"
                  className={cn(
                    "mt-3 rounded-xl px-4 py-3 text-sm",
                    resentStatus === "SENT" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700",
                  )}
                >
                  {KIND_LABEL[resent]} resend: {EMAIL_STATUS_LABEL[resentStatus]}.
                </p>
              )}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(["NOTIFICATION", "AUTO_REPLY"] as EmailKind[]).map((kind) => {
                  const status = kind === "NOTIFICATION" ? e.notificationStatus : e.autoReplyStatus;
                  const last = e.emails.find((m) => m.kind === kind);
                  return (
                    <div key={kind} className="rounded-xl border border-surface-line p-4">
                      <p className="text-sm font-semibold text-navy-900">{KIND_LABEL[kind]}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-mute">To: {last?.recipient || (kind === "AUTO_REPLY" ? e.email : "team inbox")}</p>
                      <div className="mt-2">
                        <EmailBadge status={status} />
                      </div>
                      {last?.error && status !== "SENT" && <p className="mt-2 break-words text-xs text-red-700">{last.error}</p>}
                      <form action={resendEmailAction} className="mt-3">
                        <input type="hidden" name="id" value={e.id} />
                        <input type="hidden" name="kind" value={kind} />
                        <button type="submit" className="inline-flex items-center gap-1.5 rounded-full border border-surface-line px-3 py-1.5 text-xs font-semibold text-navy-900 hover:border-brand-royal/40 hover:bg-surface">
                          <RefreshCw className="h-3.5 w-3.5" aria-hidden /> {status === "SENT" ? "Send again" : "Resend"}
                        </button>
                      </form>
                    </div>
                  );
                })}
              </div>
              {e.emails.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-brand-royal">Delivery log ({e.emails.length})</summary>
                  <ul className="mt-3 divide-y divide-surface-line text-xs">
                    {e.emails.map((m) => (
                      <li key={m.id} className="flex flex-wrap items-start justify-between gap-2 py-2">
                        <span className="min-w-0">
                          <span className="font-semibold text-navy-900">{KIND_LABEL[m.kind]}</span>
                          <span className="text-ink-mute"> · {m.trigger === "resend" ? "resend" : "on submission"} · {fmtDate(m.createdAt)}</span>
                          <span className="block truncate text-ink-mute">{m.subject}</span>
                          {m.error && <span className="block break-words text-red-700">{m.error}</span>}
                        </span>
                        <EmailBadge status={m.status} />
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <section className={card} aria-labelledby="status-title">
              <h2 id="status-title" className="font-display text-lg font-bold text-navy-900">
                Status
              </h2>
              <ol className="mt-4 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                {STATUS_FLOW.map((s, i) => (
                  <li key={s} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-ink-mute">{i === 4 ? "/" : "→"}</span>}
                    <span className={cn("rounded-full px-2.5 py-1", s === e.status ? "bg-navy-900 text-white" : "bg-surface text-ink-soft")}>{STATUS_LABEL[s]}</span>
                  </li>
                ))}
              </ol>
              <form action={updateStatusAction} className="mt-4 flex gap-2">
                <input type="hidden" name="id" value={e.id} />
                <label htmlFor="status" className="sr-only">
                  Change status
                </label>
                <select id="status" name="status" defaultValue={e.status} className={field}>
                  {STATUS_FLOW.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn-primary !min-h-[42px] shrink-0 !px-4 !py-2 text-sm">
                  Update
                </button>
              </form>
            </section>

            <section className={card} aria-labelledby="notes-title">
              <h2 id="notes-title" className="font-display text-lg font-bold text-navy-900">
                Internal notes
              </h2>
              <p className="mt-1 text-xs text-ink-mute">Visible to the team only — never sent to the visitor.</p>
              <form action={addNoteAction} className="mt-4 space-y-2">
                <input type="hidden" name="id" value={e.id} />
                <label htmlFor="note-body" className="sr-only">
                  Note
                </label>
                <textarea id="note-body" name="body" required rows={3} maxLength={4000} placeholder="e.g. Called, interested in the weekend batch" className={cn(field, "resize-y")} />
                <div className="flex gap-2">
                  <label htmlFor="note-author" className="sr-only">
                    Your name
                  </label>
                  <input id="note-author" name="author" maxLength={80} placeholder="Your name (optional)" className={field} />
                  <button type="submit" className="btn-primary !min-h-[42px] shrink-0 !px-4 !py-2 text-sm">
                    Add note
                  </button>
                </div>
              </form>
              <ul className="mt-4 space-y-3">
                {e.notes.length === 0 && <li className="text-sm text-ink-mute">No notes yet.</li>}
                {e.notes.map((n) => (
                  <li key={n.id} className="rounded-xl bg-surface p-3">
                    <p className="whitespace-pre-wrap text-sm text-navy-900">{n.body}</p>
                    <p className="mt-1 text-xs text-ink-mute">
                      {n.author ? `${n.author} · ` : ""}
                      {fmtDate(n.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className={card} aria-labelledby="activity-title">
              <h2 id="activity-title" className="font-display text-lg font-bold text-navy-900">
                Activity
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {e.events.map((ev) => (
                  <li key={ev.id} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                    <span>
                      <span className="text-navy-900">{ev.detail || ev.action}</span>
                      <span className="block text-xs text-ink-mute">{fmtDate(ev.createdAt)}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-mute">Type: {TYPE_LABEL[e.type]}</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

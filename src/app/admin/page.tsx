import Link from "next/link";
import { Download, Search } from "lucide-react";
import type { EnquiryStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { buildWhere, filterQuery, parseFilters } from "@/lib/admin-queries";
import { STATUS_FLOW, STATUS_LABEL, TYPE_LABEL } from "@/lib/enquiry-store";
import { AdminHeader, DbError, EmailBadge, StatusBadge, TypeBadge, fmtDate } from "@/components/admin/AdminUI";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminHome({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const f = parseFilters(await searchParams);
  const where = buildWhere(f);

  let data;
  try {
    const [rows, total, byStatus, emailIssues] = await Promise.all([
      db().enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (f.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true, reference: true, type: true, status: true, name: true, email: true, phone: true,
          interest: true, technology: true, projectType: true, createdAt: true,
          notificationStatus: true, autoReplyStatus: true,
        },
      }),
      db().enquiry.count({ where }),
      db().enquiry.groupBy({ by: ["status"], _count: { _all: true } }),
      db().enquiry.count({ where: buildWhere({ page: 1, email: "issues" }) }),
    ]);
    data = { rows, total, byStatus, emailIssues };
  } catch (err) {
    return (
      <>
        <AdminHeader />
        <DbError error={err} />
      </>
    );
  }

  const counts = Object.fromEntries(data.byStatus.map((s) => [s.status, s._count._all])) as Partial<Record<EnquiryStatus, number>>;
  const all = Object.values(counts).reduce((a, b) => a + (b || 0), 0);
  const pages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const field =
    "rounded-xl border border-surface-line bg-white px-3 py-2.5 text-sm text-navy-900 focus:border-brand-royal focus:outline-none focus:ring-4 focus:ring-blue-100";

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">Enquiries</h1>
            <p className="mt-1 text-sm text-ink-soft">{all} total · newest first</p>
          </div>
          <a href={`/api/admin/export${filterQuery(f, { page: undefined })}`} className="btn-ghost !min-h-[42px] !px-4 !py-2 text-sm">
            <Download className="h-4 w-4" aria-hidden /> Export CSV
          </a>
        </div>

        {/* Status tabs */}
        <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
          <StatusTab href={`/admin${filterQuery(f, { status: undefined, page: undefined })}`} active={!f.status} label="All" count={all} />
          {STATUS_FLOW.map((s) => (
            <StatusTab key={s} href={`/admin${filterQuery(f, { status: s, page: undefined })}`} active={f.status === s} label={STATUS_LABEL[s]} count={counts[s] || 0} />
          ))}
          {data.emailIssues > 0 && (
            <StatusTab
              href={`/admin${filterQuery(f, { email: f.email ? undefined : "issues", page: undefined })}`}
              active={f.email === "issues"}
              label="Email issues"
              count={data.emailIssues}
              warn
            />
          )}
        </nav>

        {/* Search + type filter */}
        <form method="get" className="mt-4 flex flex-col gap-2 sm:flex-row">
          {f.status && <input type="hidden" name="status" value={f.status} />}
          {f.email && <input type="hidden" name="email" value={f.email} />}
          <label className="relative flex-1">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" aria-hidden />
            <input name="q" defaultValue={f.q} placeholder="Search name, email, phone, reference, course, college or message" className={cn(field, "w-full pl-9")} />
          </label>
          <select name="type" defaultValue={f.type || ""} className={field} aria-label="Enquiry type">
            <option value="">All types</option>
            {(Object.keys(TYPE_LABEL) as (keyof typeof TYPE_LABEL)[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary !min-h-[42px] !px-5 !py-2 text-sm">
            Apply
          </button>
          {(f.q || f.type || f.status || f.email) && (
            <Link href="/admin" className="btn-ghost !min-h-[42px] !px-4 !py-2 text-sm">
              Clear
            </Link>
          )}
        </form>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-soft">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-surface-line bg-surface/60 text-xs uppercase tracking-wider text-ink-mute">
              <tr>
                <th className="px-4 py-3 font-semibold">Reference</th>
                <th className="px-4 py-3 font-semibold">Received</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Type / interest</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Emails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-line">
              {data.rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-ink-soft">
                    No enquiries match these filters.
                  </td>
                </tr>
              )}
              {data.rows.map((e) => (
                <tr key={e.id} className="align-top hover:bg-surface/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries/${e.id}`} className="font-mono text-[13px] font-semibold text-brand-royal hover:underline">
                      {e.reference}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{fmtDate(e.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries/${e.id}`} className="font-semibold text-navy-900 hover:text-brand-royal">
                      {e.name}
                    </Link>
                    <div className="text-xs text-ink-mute">{e.email}</div>
                    <div className="text-xs text-ink-mute">{e.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <TypeBadge type={e.type} />
                    <div className="mt-1 max-w-[240px] truncate text-xs text-ink-soft">
                      {[e.interest, e.projectType, e.technology].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="space-y-1 px-4 py-3">
                    <div>
                      <EmailBadge status={e.notificationStatus} label="Team" />
                    </div>
                    <div>
                      <EmailBadge status={e.autoReplyStatus} label="Reply" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm text-ink-soft">
            <span>
              Page {f.page} of {pages} · {data.total} results
            </span>
            <div className="flex gap-2">
              {f.page > 1 && (
                <Link href={`/admin${filterQuery(f, { page: f.page - 1 })}`} className="btn-ghost !min-h-[38px] !px-4 !py-1.5 text-sm">
                  Previous
                </Link>
              )}
              {f.page < pages && (
                <Link href={`/admin${filterQuery(f, { page: f.page + 1 })}`} className="btn-ghost !min-h-[38px] !px-4 !py-1.5 text-sm">
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function StatusTab({ href, active, label, count, warn }: { href: string; active: boolean; label: string; count: number; warn?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
        active
          ? warn
            ? "border-red-600 bg-red-600 text-white"
            : "border-navy-900 bg-navy-900 text-white"
          : warn
            ? "border-red-200 bg-red-50 text-red-700 hover:border-red-300"
            : "border-surface-line bg-white text-navy-900 hover:border-brand-royal/40",
      )}
    >
      {label}
      <span className={cn("rounded-full px-1.5 text-xs", active ? "bg-white/20" : "bg-surface")}>{count}</span>
    </Link>
  );
}

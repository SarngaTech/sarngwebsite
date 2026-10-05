import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { notifyTo, verifyEmail } from "@/lib/lead-handlers";
import { AdminHeader } from "@/components/admin/AdminUI";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

type Check = { label: string; status: "OK" | "FAILED" | "SKIPPED"; detail: string };

async function checkDatabase(): Promise<Check[]> {
  if (!dbConfigured()) return [{ label: "Database connection", status: "FAILED", detail: "DATABASE_URL is not set." }];
  try {
    const t = Date.now();
    await db().$queryRawUnsafe("SELECT 1");
    const ms = Date.now() - t;
    try {
      const count = await db().enquiry.count();
      return [
        { label: "Database connection", status: "OK", detail: `Connected (${ms} ms).` },
        { label: "Enquiry tables", status: "OK", detail: `${count} enquiries stored.` },
      ];
    } catch (err) {
      return [
        { label: "Database connection", status: "OK", detail: `Connected (${ms} ms).` },
        { label: "Enquiry tables", status: "FAILED", detail: `Tables missing or unreadable — run \`npm run db:migrate\`. ${short(err)}` },
      ];
    }
  } catch (err) {
    return [{ label: "Database connection", status: "FAILED", detail: short(err) }];
  }
}

const short = (err: unknown) => {
  const e = err as { code?: string; message?: string };
  return `${e?.code ? `${e.code}: ` : ""}${(e?.message || String(err)).replace(/\s+/g, " ")}`.slice(0, 500);
};

/** Admin-only page that tests the real database and email settings of this deployment. */
export default async function HealthPage() {
  await requireAdmin();
  const [dbChecks, mail] = await Promise.all([checkDatabase(), verifyEmail()]);
  const checks: Check[] = [
    ...dbChecks,
    { label: "Email (SMTP login)", status: mail.status, detail: mail.detail },
    { label: "Team inbox", status: "OK", detail: `Enquiry notifications go to ${notifyTo()}.` },
  ];
  const style = { OK: "bg-emerald-50 text-emerald-700 ring-emerald-200", FAILED: "bg-red-50 text-red-700 ring-red-200", SKIPPED: "bg-amber-50 text-amber-800 ring-amber-200" };
  const label = { OK: "OK", FAILED: "Failed", SKIPPED: "Not configured" };
  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-navy-900">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All enquiries
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Setup check</h1>
        <p className="mt-1 text-sm text-ink-soft">Tests this server&apos;s database and email settings. No email is sent.</p>
        <ul className="mt-6 divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-soft">
          {checks.map((c) => (
            <li key={c.label} className="flex flex-col gap-1.5 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="font-semibold text-navy-900">{c.label}</p>
                <p className="mt-0.5 break-words text-sm text-ink-soft" data-check={c.label}>{c.detail}</p>
              </div>
              <span className={cn("inline-flex shrink-0 self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", style[c.status])}>{label[c.status]}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

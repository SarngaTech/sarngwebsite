import { loginAction } from "../actions";
import { adminConfigured } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

const MESSAGES: Record<string, string> = {
  invalid: "Incorrect password. Please try again.",
  locked: "Too many failed attempts. Please wait 15 minutes and try again.",
  disabled: "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+ characters) in Vercel.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const error = sp.error ? MESSAGES[sp.error] : !adminConfigured() ? MESSAGES.disabled : undefined;
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <form action={loginAction} className="w-full max-w-sm rounded-3xl border border-surface-line bg-white p-8 shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/sarng-symbol.png" alt="" width={44} height={44} className="h-11 w-11" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Enquiry Dashboard</h1>
        <p className="mt-1 text-sm text-ink-soft">Sarng Infotech team access</p>
        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <input type="hidden" name="next" value={sp.next || "/admin"} />
        <label htmlFor="password" className="mt-6 block text-sm font-semibold text-navy-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          className="mt-1.5 w-full rounded-xl border border-surface-line px-4 py-3 text-[15px] focus:border-brand-royal focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
        <button type="submit" className="btn-primary mt-6 w-full">
          Log in
        </button>
      </form>
    </div>
  );
}

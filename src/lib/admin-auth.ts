import "server-only";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "./admin-session";
import { db } from "./db";
import { hashIp } from "./enquiry-store";

/** Server-side guard used by every admin page, server action and admin API route (in addition to middleware). */
export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function clientIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return hashIp(ip);
}

const LOGIN_WINDOW_MIN = 15;
const LOGIN_MAX_FAILURES = 5;

/** True when this IP has too many failed logins in the last 15 minutes. */
export async function loginLocked(ipHash: string) {
  const failures = await db().loginAttempt.count({
    where: { ipHash, success: false, createdAt: { gte: new Date(Date.now() - LOGIN_WINDOW_MIN * 60_000) } },
  });
  return failures >= LOGIN_MAX_FAILURES;
}

export async function recordLogin(ipHash: string, success: boolean) {
  await db().loginAttempt.create({ data: { ipHash, success } });
}

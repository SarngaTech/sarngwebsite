"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { EmailKind, EnquiryStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, SESSION_HOURS, adminConfigured, createSessionToken, passwordMatches } from "@/lib/admin-session";
import { clientIpHash, loginLocked, recordLogin, requireAdmin } from "@/lib/admin-auth";
import { STATUS_FLOW, STATUS_LABEL, addEvent } from "@/lib/enquiry-store";
import { resendEmail } from "@/lib/enquiry-workflow";

const safeNext = (v: FormDataEntryValue | null) => {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/admin") && !s.startsWith("//") ? s : "/admin";
};

export async function loginAction(formData: FormData) {
  const next = safeNext(formData.get("next"));
  const back = (error: string) => redirect(`/admin/login?error=${error}${next !== "/admin" ? `&next=${encodeURIComponent(next)}` : ""}`);
  if (!adminConfigured()) back("disabled");

  const ipHash = await clientIpHash();
  // If the database is unreachable the lockout check is skipped (the password is still required),
  // so the team can still log in and see the database error on the dashboard.
  const locked = await loginLocked(ipHash).catch((err) => {
    console.error("[admin] login lockout check failed", err);
    return false;
  });
  if (locked) back("locked");

  const ok = await passwordMatches(String(formData.get("password") || ""));
  await recordLogin(ipHash, ok).catch((err) => console.error("[admin] could not record login attempt", err));
  if (!ok) back("invalid");

  const token = await createSessionToken();
  if (!token) back("disabled");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  redirect(next);
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function updateStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as EnquiryStatus;
  if (!id || !STATUS_FLOW.includes(status)) return;
  const current = await db().enquiry.findUnique({ where: { id }, select: { status: true } });
  if (!current || current.status === status) return;
  await db().enquiry.update({ where: { id }, data: { status } });
  await addEvent(id, "status_changed", `${STATUS_LABEL[current.status]} → ${STATUS_LABEL[status]}`);
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin");
}

export async function addNoteAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const body = String(formData.get("body") || "").trim().slice(0, 4000);
  const author = String(formData.get("author") || "").trim().slice(0, 80);
  if (!id || !body) return;
  await db().enquiryNote.create({ data: { enquiryId: id, body, author: author || null } });
  await addEvent(id, "note_added", author ? `Note added by ${author}` : "Note added");
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function resendEmailAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const kind = String(formData.get("kind") || "") as EmailKind;
  if (!id || (kind !== "NOTIFICATION" && kind !== "AUTO_REPLY")) return;
  const result = await resendEmail(id, kind);
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin");
  redirect(`/admin/enquiries/${id}?resent=${kind}&result=${result.status}#emails`);
}

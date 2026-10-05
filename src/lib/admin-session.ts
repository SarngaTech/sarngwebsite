/**
 * Admin session tokens (edge-safe: Web Crypto only, usable from middleware and server code).
 * Token format: "<expiresAtMs>.<base64url HMAC-SHA256(secret, 'sarng-admin.<expiresAtMs>')>"
 */
export const ADMIN_COOKIE = "sarng_admin";
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

export function sessionSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

function b64url(buf: ArrayBuffer) {
  let bin = "";
  for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Constant-time string comparison. */
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  return `${expires}.${await hmac(secret, `sarng-admin.${expires}`)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret || !token) return false;
  const [expStr, sig] = token.split(".");
  const expires = Number(expStr);
  if (!expStr || !sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  return safeEqual(sig, await hmac(secret, `sarng-admin.${expires}`));
}

/** Compare a submitted password with ADMIN_PASSWORD without leaking timing information. */
export async function passwordMatches(submitted: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = sessionSecret();
  if (!expected || !secret) return false;
  const [a, b] = await Promise.all([hmac(secret, `pw:${submitted}`), hmac(secret, `pw:${expected}`)]);
  return safeEqual(a, b);
}

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && sessionSecret());

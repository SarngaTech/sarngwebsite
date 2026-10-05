import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

/** Protects /admin and /api/admin. Every admin page, action and API route also re-checks the session on the server. */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const authed = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);

  let res: NextResponse;
  if (isLogin || authed) {
    res = isLogin && authed ? NextResponse.redirect(new URL("/admin", req.url)) : NextResponse.next();
  } else if (pathname.startsWith("/api/")) {
    res = NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  } else {
    const url = new URL("/admin/login", req.url);
    if (pathname !== "/admin") url.searchParams.set("next", pathname + search);
    res = NextResponse.redirect(url);
  }
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"] };

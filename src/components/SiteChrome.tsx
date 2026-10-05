"use client";
import { usePathname } from "next/navigation";

/** Renders public-site chrome (navbar, footer, floating buttons) everywhere except the /admin dashboard. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return <>{children}</>;
}

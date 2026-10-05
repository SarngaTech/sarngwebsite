import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import Logo from "./ui/Logo";
import InstagramIcon from "./ui/InstagramIcon";

function SocialIcon({ label }: { label: string }) {
  const paths: Record<string, React.ReactNode> = {
    LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z" />,
    Instagram: <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1Zm6-7.94a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.1 8.2c-.05-1.47-.39-2.77-1.46-3.84-1.07-1.07-2.37-1.41-3.84-1.48C14.28 2.8 9.72 2.8 8.2 2.88c-1.47.07-2.77.41-3.84 1.48S2.95 6.73 2.88 8.2C2.8 9.72 2.8 14.28 2.88 15.8c.07 1.47.4 2.77 1.48 3.84 1.07 1.07 2.37 1.41 3.84 1.48 1.52.08 6.08.08 7.6 0 1.47-.07 2.77-.41 3.84-1.48 1.07-1.07 1.41-2.37 1.46-3.84.09-1.52.09-6.08 0-7.6Z" />,
    Facebook: <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.28 0-3.84 1.39-3.84 3.95v2.25H8v3h2.46V21h3.04Z" />,
    YouTube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12c0 1.62.14 3.22.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77c.27-1.58.4-3.18.4-4.8s-.13-3.22-.4-4.8ZM10 15V9l5.2 3L10 15Z" />,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      {paths[label]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-royal/25 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-navy-700/20 blur-3xl" />
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-brand-royal via-brand-cyan via-50% to-brand-teal" aria-hidden />

      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo version="full" variant="light" className="h-auto w-[280px]" />
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-400">
            An education and technology company focused on developing practical digital skills and delivering technology solutions.
          </p>
          <p className="mt-5 text-sm font-semibold tracking-wide text-cyan-300">{site.mottoLong}</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${site.name} on ${s.label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  {s.label === "Instagram" ? <InstagramIcon className="h-[18px] w-[18px]" /> : <SocialIcon label={s.label} />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[.14em] text-white">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        <div className="lg:col-span-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[.14em] text-white">Contact</h2>
          <address className="mt-5 space-y-4 text-[15px] not-italic">
            <a href={site.contact.phoneHref} className="flex items-start gap-3 transition hover:text-white">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden /> {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden /> {site.contact.email}
            </a>
            <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition hover:text-white">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" /> {site.contact.instagram}
            </a>
            <a href={site.contact.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`${site.contact.addressLines.join(" ")} (opens Google Maps)`} className="flex items-start gap-3 transition hover:text-white">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden />
              <span>{site.contact.addressLines.join(" ")}</span>
            </a>
          </address>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-400 sm:flex-row">
          <p>
            © 2026 Sarng Infotech. All Rights Reserved.
            <span aria-hidden className="mx-2 text-slate-600">·</span>
            <Link href="/privacy-policy" className="text-slate-300 underline-offset-4 transition hover:text-white hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p>{site.pillars}</p>
        </div>
      </div>
    </footer>
  );
}

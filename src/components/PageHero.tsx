import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-surface-line">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1F6FF_0%,#FFFFFF_100%)]" />
        <div className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-cyan/25 to-navy-700/15 blur-3xl" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      </div>
      <div className="container py-14 sm:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="animate-fade-up mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-mute">
              <li>
                <Link href="/" className="hover:text-brand-royal">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  {c.href ? <Link href={c.href} className="hover:text-brand-royal">{c.label}</Link> : <span aria-current="page" className="font-medium text-navy-800">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="animate-fade-up text-sm font-semibold uppercase tracking-[.16em] text-brand-royal">{eyebrow}</p>}
        <h1 className="animate-fade-up mt-3 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 [animation-delay:60ms] sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="animate-fade-up mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft [animation-delay:120ms] sm:text-xl">{subtitle}</p>}
        {children && <div className="animate-fade-up mt-8 [animation-delay:180ms]">{children}</div>}
      </div>
    </section>
  );
}

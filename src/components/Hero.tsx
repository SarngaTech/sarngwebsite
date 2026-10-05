import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MonitorSmartphone, Users } from "lucide-react";
import { site } from "@/data/site";
import { EnquireButton } from "./EnquiryModal";

const HERO_PHOTO = "/images/hero-students.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F3F7FF_0%,#FFFFFF_70%)]" />
        <div className="absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-brand-cyan/25 to-brand-royal/10 blur-3xl" />
        <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-navy-700/15 to-brand-teal/10 blur-3xl" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_45%,transparent_90%)]" />
      </div>

      <div className="container grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div className="max-w-2xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-brand-royal shadow-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-teal motion-safe:animate-pulse-dot" aria-hidden />
            {site.tagline}
          </p>

          <h1 id="hero-title" className="animate-fade-up mt-6 font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight text-navy-900 [animation-delay:80ms] sm:text-6xl lg:text-[4rem]">
            Learn. Build. Grow.
            <span className="mt-1 block">
              with <span className="text-gradient">Real Skills.</span>
            </span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [animation-delay:160ms] sm:text-xl">
            Technology Training, Internships and Real-World Solutions.
          </p>

          <ul className="animate-fade-up mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-navy-800 [animation-delay:220ms]" aria-label="Our approach">
            {["Learn", "Build", "Grow", "Make an Impact"].map((w, i) => (
              <li key={w} className="flex items-center gap-3">
                {i > 0 && <span className="h-4 w-px bg-slate-300" aria-hidden />}
                {w}
              </li>
            ))}
          </ul>

          <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:280ms] sm:flex-row">
            <Link href="/courses" className="btn-primary group">
              Explore Courses <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <EnquireButton className="btn-ghost">Talk to Us</EnquireButton>
          </div>

          <dl className="animate-fade-up mt-10 grid grid-cols-3 gap-3 border-t border-surface-line pt-8 [animation-delay:340ms] sm:gap-4">
            {[
              { icon: Users, k: "Small batches", v: "focused learning" },
              { icon: MonitorSmartphone, k: "Online · Offline", v: "& hybrid classes" },
              { icon: BadgeCheck, k: "Certified", v: "on completion" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-royal" aria-hidden>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-display text-[15px] font-bold text-navy-900">{k}</dt>
                  <dd className="text-sm text-ink-mute">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual — single students photo */}
        <div className="animate-fade-up relative mx-auto w-full max-w-xl [animation-delay:200ms] lg:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-royal/15 via-brand-cyan/10 to-brand-teal/15 blur-2xl" aria-hidden />
          <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[2rem] border-2 border-brand-royal/15 sm:-right-5 sm:-top-5" aria-hidden />
          <figure className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem] bg-navy-900 shadow-lift ring-1 ring-surface-line sm:aspect-[4/3.6]">
            <Image
              src={HERO_PHOTO}
              alt="Students learning technology together on laptops"
              fill
              priority
              sizes="(min-width:1024px) 45vw, 90vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-6 pb-7 pt-24 sm:px-8 sm:pb-8">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">Technology Training</p>
              <p className="mt-1.5 max-w-md font-display text-xl font-bold leading-snug text-white sm:text-2xl">Learn with mentors, in small batches</p>
              <Link href="/courses" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-sky-200">
                Explore courses <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

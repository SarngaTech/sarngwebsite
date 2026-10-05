import Link from "next/link";
import { ArrowRight, Award, Brain, Code2, Factory, Hand, Info, UserCheck, Users } from "lucide-react";
import { internship } from "@/data/internships";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export const internshipIcons = { brain: Brain, code: Code2, mentor: UserCheck, hands: Hand, team: Users, industry: Factory, certificate: Award } as const;

export default function InternshipSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="section overflow-hidden" aria-labelledby="intern-title">
      <div className="container grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            id="intern-title"
            align="left"
            eyebrow="Internships"
            title={<>Gain Experience.<span className="block text-brand-royal">Build Confidence.</span></>}
            subtitle={internship.subline}
          />
          <Reveal className="mt-6">
            <p className="text-[17px] leading-relaxed text-ink-soft">{internship.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {internship.features.map((f) => {
                const Icon = internshipIcons[f.icon as keyof typeof internshipIcons];
                return (
                  <li key={f.title} className="flex items-center gap-3 rounded-2xl sm:last:col-span-2 border border-surface-line bg-white px-4 py-3.5 shadow-soft">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-royal" aria-hidden>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[15px] font-semibold text-navy-900">{f.title}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-navy-700/15 via-brand-teal/10 to-brand-cyan/10 blur-2xl" aria-hidden />
          <div className="rounded-[2rem] border border-surface-line bg-white p-6 shadow-lift sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[.14em] text-brand-royal">Selection process</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-navy-900">How internship selection works</h3>
            <ol className="relative mt-8 space-y-7 before:absolute before:bottom-3 before:left-[21px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-navy-700 before:to-brand-teal">
              {internship.steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-5">
                  <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-brand-teal font-display text-base font-bold text-white shadow-glow">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h4 className="font-display text-lg font-bold text-navy-900">{s.title}</h4>
                    <p className="mt-0.5 text-[15px] text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 flex gap-2.5 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {internship.disclaimer}
            </p>

            {showCta && (
              <Link href="/internships#apply" className="btn-accent group mt-6 w-full">
                Apply for Internship <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

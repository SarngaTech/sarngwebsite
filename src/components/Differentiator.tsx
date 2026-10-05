import { Briefcase, CheckCircle2, Compass, Users, Wrench } from "lucide-react";
import Reveal from "./ui/Reveal";
import IconTile from "./ui/IconTile";

const features = [
  { icon: Users, title: "Small Batch Learning", text: "Small groups so every learner gets attention and support.", accent: "blue" as const },
  { icon: Wrench, title: "Practical Training", text: "Learn by working with practical exercises and real-world scenarios.", accent: "teal" as const },
  { icon: Compass, title: "Mentor Guidance", text: "Get direct guidance and interaction throughout the learning journey.", accent: "purple" as const },
  { icon: Briefcase, title: "Career-Focused Learning", text: "Build skills that can be applied in academic and professional environments.", accent: "orange" as const },
];

export default function Differentiator() {
  return (
    <section className="section" aria-labelledby="diff-title">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-cyan/25 blur-3xl" />
            <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-navy-700/30 blur-3xl" />
            <div className="bg-grid-dark absolute inset-0 opacity-50" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.16em] text-cyan-300">What makes us different</p>
              <h2 id="diff-title" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Small Batches.<span className="block text-sky-300">Better Learning.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
                We intentionally keep every batch small so that every learner receives focused guidance, interaction and practical support.
              </p>
            </div>

            <ul className="grid gap-3">
              {[
                "Focused attention from your mentor",
                "Your questions answered in every session",
                "Your work reviewed and guided individually",
                "Practice time on real-world exercises",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden />
                  <span className="text-[15px] font-medium text-slate-100 sm:text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 70} className="card group">
              <IconTile icon={f.icon} accent={f.accent} />
              <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

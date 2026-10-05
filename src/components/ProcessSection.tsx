import { BookOpen, ClipboardCheck, Hammer, Presentation, Rocket, Send, Trophy } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const steps = [
  { icon: BookOpen, title: "Learn", text: "Build strong foundations" },
  { icon: ClipboardCheck, title: "Assess", text: "Test your skills" },
  { icon: Trophy, title: "Qualify", text: "Get selected for relevant opportunities" },
  { icon: Hammer, title: "Build", text: "Gain practical technology experience" },
  { icon: Send, title: "Deploy", text: "Apply your learning" },
  { icon: Presentation, title: "Demonstrate", text: "Show your skills and portfolio" },
  { icon: Rocket, title: "Get Career Ready", text: "Prepare for opportunities" },
];

const grads = Array(7).fill("from-brand-royal to-brand-cyan");

export default function ProcessSection() {
  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading id="process-title" eyebrow="How it works" title="Our Process" subtitle="A Structured Journey to Your Success" />

        <ol className="relative mt-14 grid gap-0 lg:grid-cols-7 lg:gap-4">
          {/* connecting line — desktop */}
          <span className="absolute left-[7%] right-[7%] top-8 hidden h-0.5 bg-gradient-to-r from-brand-royal/40 via-brand-cyan/60 to-brand-teal/40 lg:block" aria-hidden />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="relative flex gap-5 pb-9 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
              {/* connecting line — mobile */}
              {i < steps.length - 1 && <span className="absolute left-8 top-16 h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-slate-200 to-slate-100 lg:hidden" aria-hidden />}
              <span className={`relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${grads[i]} text-white shadow-glow ring-8 ring-white`}>
                <s.icon className="h-7 w-7" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="pt-2 lg:pt-5">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-ink-mute">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-snug text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Building2, GraduationCap, School } from "lucide-react";
import Reveal from "./ui/Reveal";

const audiences = [
  { icon: GraduationCap, who: "Students", what: "Skills", text: "Practical technology skills, guided learning and selection-based internships.", grad: "from-brand-royal to-brand-cyan" },
  { icon: School, who: "Colleges", what: "Employability", text: "Structured training programmes that help students become career ready.", grad: "from-navy-700 to-brand-teal" },
  { icon: Building2, who: "Businesses", what: "Solutions", text: "Websites, applications, data, BI and AI solutions that solve real problems.", grad: "from-brand-teal to-brand-green" },
];

export default function AudienceCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {audiences.map((a, i) => (
        <Reveal as="li" key={a.who} delay={i * 80}>
          <article className="card group relative h-full overflow-hidden">
            <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${a.grad} opacity-10 transition group-hover:opacity-20`} aria-hidden />
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.grad} text-white shadow-glow`} aria-hidden>
              <a.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">{a.who}</h3>
            <p className={`mt-1 bg-gradient-to-r ${a.grad} bg-clip-text font-display text-lg font-bold text-transparent`}>{a.what}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{a.text}</p>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

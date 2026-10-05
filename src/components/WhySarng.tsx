import { Award, BookOpenCheck, Briefcase, Cpu, GraduationCap, Hammer, Rocket, UserCheck, Users } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import IconTile from "./ui/IconTile";
import type { AccentKey } from "@/lib/accents";

const pillars = ["Technology Training", "Selection-Based Internships", "Industry-Relevant Skills", "Business Solutions"];

const reasons: { icon: typeof Users; title: string; text: string; accent: AccentKey }[] = [
  { icon: Users, title: "Small batch training", text: "Small batches, so every learner gets attention and support.", accent: "blue" },
  { icon: Hammer, title: "Practical, hands-on learning", text: "Every concept is practised with exercises and real scenarios.", accent: "teal" },
  { icon: Cpu, title: "Industry-relevant technologies", text: "Python, SQL, Power BI, Azure, Generative AI and more.", accent: "cyan" },
  { icon: UserCheck, title: "Mentor-guided learning", text: "Direct interaction and feedback throughout your journey.", accent: "purple" },
  { icon: Briefcase, title: "Internship opportunities", text: "Selection-based internships for learners who qualify.", accent: "orange" },
  { icon: Award, title: "Verified completion certificates", text: "Certificates for learners who complete programme requirements.", accent: "pink" },
  { icon: Rocket, title: "Career-oriented training", text: "Skills you can use in interviews, projects and at work.", accent: "blue" },
  { icon: BookOpenCheck, title: "Support for academic requirements", text: "Guidance aligned to your coursework and academic needs.", accent: "teal" },
  { icon: GraduationCap, title: "Real-world technology exposure", text: "See how technology is applied to real business problems.", accent: "purple" },
];

export default function WhySarng() {
  return (
    <section className="section bg-surface" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          eyebrow="Why Sarng Infotech"
          id="why-title"
          title="Why Learn With Sarng Infotech?"
          subtitle="Skills. People. Progress. A Brighter Tomorrow."
        />

        <Reveal as="div" className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {pillars.map((p) => (
            <span key={p} className="rounded-full border border-surface-line bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-soft">
              {p}
            </span>
          ))}
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 3) * 70} className={`card flex items-start gap-4 ${i === reasons.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <IconTile icon={r.icon} accent={r.accent} />
              <div>
                <h3 className="font-display text-[17px] font-bold text-navy-900">{r.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

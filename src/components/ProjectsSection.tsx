import Link from "next/link";
import { ArrowRight, BookOpenCheck, Briefcase, ClipboardList, Code2, FileText, GraduationCap, Lightbulb, Presentation, Rocket, UserCheck } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import IconTile from "./ui/IconTile";
import { EnquireButton } from "./EnquiryModal";
import type { AccentKey } from "@/lib/accents";

export const projectIcons = {
  mini: Rocket,
  major: GraduationCap,
  portfolio: Briefcase,
  idea: Lightbulb,
  plan: ClipboardList,
  mentor: UserCheck,
  code: Code2,
  doc: FileText,
  present: Presentation,
  review: BookOpenCheck,
} as const;

const typeAccents: AccentKey[] = ["blue", "teal", "cyan"];

/** Home-page section introducing mentor-guided student projects. */
export default function ProjectsSection() {
  return (
    <section className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Student Projects"
          title={<>Build Real Projects. <span className="text-brand-royal">Learn by Doing.</span></>}
          subtitle="Mentor-guided mini, final-year and portfolio projects in the technologies we teach."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {projects.types.map((t, i) => {
            const Icon = projectIcons[t.icon as keyof typeof projectIcons];
            return (
              <Reveal as="li" key={t.title} delay={i * 80} className="card">
                <IconTile icon={Icon} accent={typeAccents[i]} />
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.text}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-surface-line bg-white p-6 shadow-soft sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-mute">Technologies</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {projects.domains.map((d) => (
                <li key={d} className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-navy-800">{d}</li>
              ))}
            </ul>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
            <EnquireButton interest="Student Project" persona="Student" className="btn-primary">
              Enquire for a Project
            </EnquireButton>
            <Link href="/projects" className="btn-ghost group">
              Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

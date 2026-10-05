import PageHero from "@/components/PageHero";
import ProjectForm from "@/components/ProjectForm";
import { projectIcons } from "@/components/ProjectsSection";
import FAQ from "@/components/FAQ";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconTile from "@/components/ui/IconTile";
import { projects } from "@/data/projects";
import { projectFaqs } from "@/data/faq";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import type { AccentKey } from "@/lib/accents";

export const metadata = pageMetadata({
  title: "Student Projects — Mini, Final-Year & Portfolio Projects",
  description:
    "Mentor-guided student projects at Sarng Infotech, Chennai: mini projects, final-year / major projects and portfolio projects in Python, Web, SQL, Power BI, Generative AI, Azure and C/C++.",
  path: "/projects",
  keywords: ["final year projects Chennai", "student projects", "mini projects for students", "Python projects for students"],
});

const accents: AccentKey[] = ["blue", "cyan", "teal", "blue", "cyan", "teal"];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Projects"
        title={<>Build Real Projects. <span className="text-brand-royal">Learn by Doing.</span></>}
        subtitle="Mentor-guided mini, final-year and portfolio projects — you build it, we guide you."
        crumbs={[{ label: "Projects" }]}
      >
        <a href="#enquire" className="btn-primary">Enquire for a Project</a>
      </PageHero>

      <section className="section" aria-labelledby="ptypes-title">
        <div className="container">
          <SectionHeading id="ptypes-title" eyebrow="Projects we guide" title="Choose the Project You Need" subtitle={projects.intro} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.types.map((t, i) => {
              const Icon = projectIcons[t.icon as keyof typeof projectIcons];
              return (
                <Reveal as="li" key={t.title} delay={i * 80} className="card">
                  <IconTile icon={Icon} accent={accents[i]} />
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.text}</p>
                </Reveal>
              );
            })}
          </ul>
          <Reveal className="mt-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-mute">Technologies</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {projects.domains.map((d) => (
                <li key={d} className="rounded-full border border-surface-line bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 shadow-soft">{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="psupport-title">
        <div className="container">
          <SectionHeading id="psupport-title" eyebrow="How we support you" title="Guidance at Every Stage" subtitle="From choosing a topic to presenting your work — with a mentor beside you." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.support.map((s, i) => {
              const Icon = projectIcons[s.icon as keyof typeof projectIcons];
              return (
                <Reveal as="li" key={s.title} delay={(i % 3) * 70} className="card">
                  <IconTile icon={Icon} accent={accents[i]} />
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="enquire" className="section scroll-mt-20" aria-labelledby="penquire-title">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading id="penquire-title" align="left" eyebrow="Enquire" title="Enquire About a Project" subtitle="Tell us about your project. Our team will contact you to discuss the topic, scope and next steps." />
            <Reveal className="mt-8">
              <ol className="relative space-y-6 before:absolute before:bottom-3 before:left-[19px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-brand-royal before:to-brand-teal">
                {projects.steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4">
                    <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-royal to-brand-teal font-display font-bold text-white shadow-glow">{i + 1}</span>
                    <div className="pt-1">
                      <h3 className="font-display text-base font-bold text-navy-900">{s.title}</h3>
                      <p className="mt-0.5 text-[15px] text-ink-soft">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={80} className="rounded-[2rem] border border-surface-line bg-white p-6 shadow-lift sm:p-10">
            <ProjectForm />
          </Reveal>
        </div>
      </section>

      <FAQ items={projectFaqs} title="Project FAQs" />

      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]), faqJsonLd(projectFaqs)]} />
    </>
  );
}

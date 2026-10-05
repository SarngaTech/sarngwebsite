import PageHero from "@/components/PageHero";
import InternshipSection, { internshipIcons } from "@/components/InternshipSection";
import InternshipForm from "@/components/InternshipForm";
import ProcessSection from "@/components/ProcessSection";
import FAQ from "@/components/FAQ";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconTile from "@/components/ui/IconTile";
import { internship } from "@/data/internships";
import { internshipFaqs } from "@/data/faq";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import type { AccentKey } from "@/lib/accents";

export const metadata = pageMetadata({
  title: "Technology Internships for Students — Selection-Based",
  description:
    "Apply for selection-based technology internships at Sarng Infotech, Chennai. Aptitude and technical assessment, mentor-guided hands-on work and a completion certificate.",
  path: "/internships",
  keywords: ["technology internships", "internships for students Chennai"],
});

const featureAccents: AccentKey[] = ["blue", "cyan", "teal", "blue", "cyan", "teal", "blue"];

export default function InternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Internships"
        title={<>Gain Experience. <span className="text-brand-royal">Build Confidence.</span></>}
        subtitle="Earn Experience, Not Just a Certificate."
        crumbs={[{ label: "Internships" }]}
      >
        <a href="#apply" className="btn-accent">Apply for Internship</a>
      </PageHero>

      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <SectionHeading id="what-title" eyebrow="What the internship includes" title="Real Experience, Guided by Mentors" subtitle={internship.intro} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {internship.features.map((f, i) => {
              const Icon = internshipIcons[f.icon as keyof typeof internshipIcons];
              return (
                <Reveal as="li" key={f.title} delay={(i % 4) * 60} className={i === 6 ? "card sm:col-span-2" : "card"}>
                  <IconTile icon={Icon} accent={featureAccents[i]} />
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="bg-surface">
        <InternshipSection showCta={false} />
      </div>

      <section id="apply" className="section scroll-mt-20" aria-labelledby="apply-title">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading id="apply-title" align="left" eyebrow="Apply" title="Apply for Internship" subtitle="Fill in your details below. Shortlisted applicants will be contacted for the assessment." />
            <Reveal className="mt-8 space-y-4 text-[15px] text-ink-soft">
              <p className="rounded-2xl border border-surface-line bg-white p-5 shadow-soft">
                <strong className="block font-display text-navy-900">Selection-based</strong>
                {internship.disclaimer}
              </p>
              <p className="rounded-2xl border border-surface-line bg-white p-5 shadow-soft">
                <strong className="block font-display text-navy-900">Not ready yet?</strong>
                Our courses and online bootcamps help you build the foundations to perform well in the assessments.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="rounded-[2rem] border border-surface-line bg-white p-6 shadow-lift sm:p-10">
            <InternshipForm />
          </Reveal>
        </div>
      </section>

      <div className="bg-surface"><ProcessSection /></div>
      <FAQ items={internshipFaqs} title="Internship FAQs" bg={false} />

      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Internships", path: "/internships" }]), faqJsonLd(internshipFaqs)]} />
    </>
  );
}

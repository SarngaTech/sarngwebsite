import { Eye, Target } from "lucide-react";
import PageHero from "@/components/PageHero";
import AudienceCards from "@/components/AudienceCards";
import WhySarng from "@/components/WhySarng";
import LearnerJourney from "@/components/LearnerJourney";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — Empowering Students, Colleges & Businesses",
  description:
    "Sarng Infotech is an education and technology company in Chennai focused on developing practical digital skills and delivering technology solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Empowering Students. Colleges. Businesses."
        subtitle="An education and technology company focused on developing practical digital skills and delivering technology solutions."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="section" aria-labelledby="who-title">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="who-title" align="left" eyebrow="Who we are" title="Education + Technology" />
            <Reveal className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-soft">
              <p>
                Sarng Infotech brings education and technology together. The name represents strength, innovation, skills and growth — and our commitment to a brighter digital future for the people we work with.
              </p>
              <p>
                We help students and graduates build practical technology skills in small, mentor-guided batches, support colleges with training that improves employability, and deliver technology solutions that help businesses work better.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="relative overflow-hidden rounded-[2rem] bg-navy-950 p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-teal/25 blur-3xl" />
            </div>
            <p className="relative text-sm font-semibold uppercase tracking-[.16em] text-cyan-300">Brand philosophy</p>
            <p className="relative mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Learn. Build. Grow.
              <span className="block text-gradient-light">Make an Impact.</span>
            </p>
            <p className="relative mt-6 text-slate-300">{site.pillars}</p>
            <p className="relative mt-2 text-sm font-medium text-slate-400">{site.tagline}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="mv-title">
        <div className="container">
          <h2 id="mv-title" className="sr-only">Mission and vision</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Target, title: "Our Mission", text: "Help learners develop practical technology skills while supporting organisations with useful technology solutions.", grad: "from-brand-royal to-brand-cyan" },
              { icon: Eye, title: "Our Vision", text: "Build a stronger technology ecosystem where students, educators and businesses grow through practical digital skills and innovation.", grad: "from-navy-700 to-brand-teal" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="card !p-8 sm:!p-10">
                <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.grad} text-white shadow-glow`} aria-hidden>
                  <m.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">{m.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="serve-title">
        <div className="container">
          <SectionHeading id="serve-title" eyebrow="Who we serve" title="Three Audiences. One Purpose." subtitle="Practical digital skills and useful technology — for every stage of the journey." />
          <div className="mt-12"><AudienceCards /></div>
        </div>
      </section>

      <WhySarng />
      <LearnerJourney />
      <CTASection />

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])} />
    </>
  );
}

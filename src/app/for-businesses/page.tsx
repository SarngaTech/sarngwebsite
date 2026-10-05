import PageHero from "@/components/PageHero";
import BusinessServices from "@/components/BusinessServices";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/CTASection";
import { EnquireButton } from "@/components/EnquiryModal";
import { engagementSteps, services } from "@/data/services";
import { site } from "@/data/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IT Solutions in Chennai — Websites, Web Apps, Power BI, Data & AI",
  description:
    "Sarng Infotech delivers technology solutions for businesses: website development, web applications, Power BI, data engineering & ETL, Generative AI solutions and IT consulting.",
  path: "/for-businesses",
  keywords: ["IT solutions Chennai", "Power BI consulting", "data engineering services"],
});

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="For Businesses"
        title={<>Technology That Solves <span className="text-brand-royal">Real Problems.</span></>}
        subtitle="Sarng Infotech also provides technology solutions for businesses — from websites and web applications to data, business intelligence and AI."
        crumbs={[{ label: "For Businesses" }]}
      >
        <EnquireButton persona="Business" interest="Other">Discuss Your Requirement</EnquireButton>
      </PageHero>

      <BusinessServices heading={false} />

      <section className="section" aria-labelledby="engage-title">
        <div className="container">
          <SectionHeading id="engage-title" eyebrow="How we work" title="A Clear, Collaborative Approach" subtitle="Every engagement follows a simple, transparent process." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="card">
                <p className="font-display text-4xl font-extrabold text-brand-royal">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection title="Have a technology requirement?" text="Tell us about it — we'll help you find a practical solution." />

      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "For Businesses", path: "/for-businesses" }]),
          ...services.map((s) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.text,
            provider: { "@type": "Organization", name: site.name, url: site.url },
            areaServed: "Chennai, India",
          })),
        ]}
      />
    </>
  );
}

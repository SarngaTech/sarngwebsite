import PageHero from "@/components/PageHero";
import CourseGrid from "@/components/CourseGrid";
import BootcampSection from "@/components/BootcampSection";
import LearnerJourney from "@/components/LearnerJourney";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { courses } from "@/data/courses";
import { generalFaqs } from "@/data/faq";
import { site } from "@/data/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technology Courses in Chennai — Python, SQL, Power BI, Azure & Gen AI",
  description:
    "Explore Sarng Infotech courses: C, C++, Python, Web Technologies, SQL, Excel, Power BI, Tableau, Generative AI and Azure Data Engineering. Small, mentor-guided batches.",
  path: "/courses",
  keywords: ["technology training Chennai", "Python training", "SQL training", "Power BI training", "Azure Data Engineering"],
});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Our Courses"
        subtitle="Build Strong Technology Skills From Fundamentals to Advanced Concepts. Weekday and weekend batches available."
        crumbs={[{ label: "Courses" }]}
      >
        <p className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden /> Small Batches. Better Learning.
        </p>
      </PageHero>

      <section className="section pt-14" aria-label="Course catalogue">
        <div className="container">
          <CourseGrid />
        </div>
      </section>

      <BootcampSection />
      <LearnerJourney />
      <FAQ items={generalFaqs} />
      <CTASection />

      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: courses.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/courses/${c.slug}`, name: c.title })),
          },
          faqJsonLd(generalFaqs),
        ]}
      />
    </>
  );
}

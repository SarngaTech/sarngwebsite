import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import CourseMarquee from "@/components/CourseMarquee";
import Differentiator from "@/components/Differentiator";
import WhySarng from "@/components/WhySarng";
import CourseGrid from "@/components/CourseGrid";
import InternshipSection from "@/components/InternshipSection";
import BootcampSection from "@/components/BootcampSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import BusinessServices from "@/components/BusinessServices";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <CourseMarquee />
      <Differentiator />
      <WhySarng />

      <section className="section" aria-labelledby="courses-title">
        <div className="container">
          <SectionHeading
            id="courses-title"
            eyebrow="Our Courses"
            title="Build Strong Technology Skills"
            subtitle="From programming fundamentals to data, cloud and Generative AI — learn in small, mentor-guided batches, on weekdays or weekends."
          />
          <div className="mt-12">
            <CourseGrid variant="tiles" />
          </div>
          <div className="mt-10 text-center">
            <Link href="/courses" className="btn-ghost group">
              View all courses <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <InternshipSection />
      <ProjectsSection />
      <BootcampSection />
      <ProcessSection />
      <BusinessServices />
      <AboutPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}

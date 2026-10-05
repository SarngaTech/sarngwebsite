import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import AudienceCards from "./AudienceCards";
import Reveal from "./ui/Reveal";

export default function AboutPreview() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          eyebrow="About Sarng Infotech"
          title="Empowering Students. Colleges. Businesses."
          subtitle="An education and technology company focused on developing practical digital skills and delivering technology solutions."
        />
        <div className="mt-12">
          <AudienceCards />
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/about" className="btn-ghost group">
            More about us <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

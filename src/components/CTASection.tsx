import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EnquireButton } from "./EnquiryModal";
import Reveal from "./ui/Reveal";
import { site } from "@/data/site";

export default function CTASection({
  title = "Ready to Build Your Digital Future?",
  text = site.mottoLong,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section pt-0" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-brand-royal to-brand-cyan px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-brand-cyan/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-teal/40 blur-3xl" />
            <div className="bg-grid-dark absolute inset-0 opacity-40" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-balance font-display text-3xl font-bold leading-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-lg font-medium text-blue-100">{text}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/courses" className="btn-white group">
                Explore Courses <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <EnquireButton className="btn-outline-white">Enquire Now</EnquireButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

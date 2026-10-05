import Image from "next/image";
import Link from "next/link";
import { Check, Wifi } from "lucide-react";
import { bootcamps } from "@/data/bootcamps";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { EnquireButton } from "./EnquiryModal";

export default function BootcampSection() {
  return (
    <section id="bootcamps" className="section bg-surface scroll-mt-20" aria-labelledby="bootcamp-title">
      <div className="container">
        <SectionHeading
          id="bootcamp-title"
          eyebrow="Start here"
          title="Online Bootcamps"
          subtitle="Short, beginner-friendly online bootcamps to build a strong start — separate from our full courses."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {bootcamps.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={i * 90}>
              <article className="card group relative h-full overflow-hidden !p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={`/images/bootcamps/${b.slug}.jpg`}
                    alt={`${b.title} online bootcamp`}
                    fill
                    sizes="(min-width:768px) 480px, 92vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-900 shadow-soft backdrop-blur">
                    <Wifi className="h-3.5 w-3.5 text-brand-royal" aria-hidden /> Online Bootcamp
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-navy-900">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{b.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {b.tags.map((t) => (
                      <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-navy-800">
                        <Check className="h-3.5 w-3.5 text-brand-teal" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-mute">You&apos;ll cover</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-navy-800">
                    {b.covers.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                    <EnquireButton interest={`${b.title} (Online Bootcamp)`} className="btn-primary flex-1">
                      Enquire Now
                    </EnquireButton>
                    <Link href={`/courses/${b.relatedCourse}`} className="btn-ghost flex-1">
                      See full course
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

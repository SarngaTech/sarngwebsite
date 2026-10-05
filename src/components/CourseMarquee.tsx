import Image from "next/image";
import Link from "next/link";
import { courseImage, courses } from "@/data/courses";

/**
 * Continuously moving strip of course artwork. Each card links to its course page.
 * Pauses on hover/focus; static (scrollable) for visitors who prefer reduced motion.
 */
export default function CourseMarquee() {
  const row = [...courses, ...courses]; // duplicated for a seamless loop
  return (
    <section aria-labelledby="marquee-title" className="overflow-hidden border-b border-surface-line bg-white py-14">
      <div className="container mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-brand-royal">Technologies you can learn</p>
          <h2 id="marquee-title" className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">From your first program to cloud data and AI</h2>
        </div>
        <Link href="/courses" className="text-sm font-semibold text-brand-royal hover:underline">View all courses →</Link>
      </div>
      <div className="marquee group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" aria-hidden />
        <ul className="marquee-track flex w-max gap-5">
          {row.map((c, i) => (
            <li key={`${c.slug}-${i}`} aria-hidden={i >= courses.length ? true : undefined}>
              <Link
                href={`/courses/${c.slug}`}
                tabIndex={i >= courses.length ? -1 : undefined}
                className="block w-[260px] overflow-hidden rounded-2xl border border-surface-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift sm:w-[300px]"
              >
                <span className="relative block aspect-[16/9] bg-navy-900">
                  <Image src={courseImage(c.slug)} alt={i >= courses.length ? "" : `${c.title} course`} fill sizes="300px" className="object-cover" />
                </span>
                <span className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[15px] font-semibold text-navy-900">{c.title}</span>
                    <span className="block truncate text-xs text-ink-mute">{c.subtitle}</span>
                  </span>
                  <span className="shrink-0 text-brand-royal" aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

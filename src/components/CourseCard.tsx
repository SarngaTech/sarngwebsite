import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, GraduationCap, MonitorSmartphone } from "lucide-react";
import { courseImage, type Course } from "@/data/courses";
import TechBadge from "./ui/TechBadge";
import { EnquireButton } from "./EnquiryModal";
import { DURATION_PLACEHOLDER, levelRange } from "@/lib/format";

/** Compact tile used on the home page */
export function CourseTile({ course }: { course: Course }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden !p-0">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
        <Image src={courseImage(course.slug)} alt={`${course.title} course`} fill sizes="(min-width:1024px) 240px, (min-width:640px) 45vw, 70vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
      <h3 className="font-display text-[17px] font-semibold leading-snug text-navy-900">
        <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none">
          {course.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-mute">{course.subtitle}</p>
      <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-royal">
        View course <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
      </p>
      </div>
    </article>
  );
}

/** Full catalogue card — stacks on mobile, two-panel on large screens */
export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden !p-0">
      <Link href={`/courses/${course.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[16/6] overflow-hidden bg-navy-900">
        <Image src={courseImage(course.slug)} alt="" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col lg:flex-row">
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <TechBadge label={course.badge} accent={course.accent} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-ink-mute">{course.category}</p>
            <h3 className="font-display text-xl font-semibold text-navy-900">
              <Link href={`/courses/${course.slug}`} className="hover:text-brand-royal focus-visible:text-brand-royal">
                {course.title}
              </Link>
            </h3>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{course.short}</p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-4 w-4 shrink-0 text-brand-royal" aria-hidden />
            <dt className="sr-only">Level</dt>
            <dd className="text-navy-800">{levelRange(course.levels)}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <MonitorSmartphone className="h-4 w-4 shrink-0 text-brand-royal" aria-hidden />
            <dt className="sr-only">Mode</dt>
            <dd className="text-navy-800">{course.modes.join(" · ")}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-brand-royal" aria-hidden />
            <dt className="sr-only">Batches</dt>
            <dd className="text-navy-800">Weekday &amp; weekend batches</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-brand-royal" aria-hidden />
            <dt className="sr-only">Duration</dt>
            <dd className="text-navy-800">Duration: {course.duration ?? DURATION_PLACEHOLDER.toLowerCase()}</dd>
          </div>
        </dl>

        <div className="mt-auto flex gap-2.5 pt-6">
          <Link href={`/courses/${course.slug}`} className="btn-ghost flex-1 !px-4 !py-2.5 text-sm">
            View Details
          </Link>
          <EnquireButton interest={course.title} className="btn-primary flex-1 !px-4 !py-2.5 text-sm">
            Enquire Now
          </EnquireButton>
        </div>
      </div>

      <div className="border-t border-surface-line bg-surface/60 p-6 sm:p-7 lg:w-[44%] lg:shrink-0 lg:border-l lg:border-t-0">
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-ink-mute">What you&apos;ll learn</p>
        <ul className="mt-3 space-y-2.5">
          {course.learn.slice(0, 5).map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm leading-snug text-navy-800">
              <CheckCircle2 className="mt-px h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </article>
  );
}

/** Fills an otherwise-empty grid slot with a genuinely useful action */
export function CourseAdviceCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-navy-900 p-7 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-cyan/25 blur-3xl" aria-hidden />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-sky-300">Course guidance</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">Not sure where to start?</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-300">
          Tell us your background and goals. Our team will suggest a course or bootcamp that fits your current skill level.
        </p>
      </div>
      <EnquireButton interest="Other" className="btn-white relative mt-8 self-start">
        Get Course Guidance
      </EnquireButton>
    </div>
  );
}

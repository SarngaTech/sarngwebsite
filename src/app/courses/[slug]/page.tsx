import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CalendarDays, CheckCircle2, ChevronDown, Clock, GraduationCap, Hammer, ListChecks, MonitorSmartphone, Target, Users, Wrench } from "lucide-react";
import { courseImage, courses, getCourse } from "@/data/courses";
import { site } from "@/data/site";
import TechBadge from "@/components/ui/TechBadge";
import Reveal from "@/components/ui/Reveal";
import { EnquireButton } from "@/components/EnquiryModal";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { CourseTile } from "@/components/CourseCard";
import { DURATION_PLACEHOLDER, levelRange } from "@/lib/format";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { accents } from "@/lib/accents";
import { cn } from "@/lib/cn";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.title} Training — ${c.subtitle}`,
    description: `${c.short} Small batches, mentor guidance and a completion certificate at Sarng Infotech, Chennai.`,
    path: `/courses/${c.slug}`,
    keywords: c.keywords,
  });
}

function Block({ id, icon: Icon, title, children, className }: { id: string; icon: typeof Users; title: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal as="section" className={cn("scroll-mt-28", className)}>
      <div id={id} className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-royal" aria-hidden>
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="font-display text-2xl font-bold text-navy-900">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const a = accents[course.accent];
  const others = courses.filter((c) => c.slug !== course.slug);
  const related = [...others.filter((c) => c.category === course.category), ...others.filter((c) => c.category !== course.category)].slice(0, 4);
  const toc = [
    ["overview", "Overview"], ["audience", "Who is this for?"], ["prerequisites", "Prerequisites"], ["learn", "What you will learn"],
    ["modules", "Module structure"], ["hands-on", "Hands-on learning"], ["tools", "Tools covered"], ["outcomes", "Learning outcomes"], ["certificate", "Certificate"],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-surface-line">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1F6FF_0%,#FFFFFF_100%)]" />
          <div className={cn("absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full bg-gradient-to-br opacity-25 blur-3xl", a.grad)} />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
        </div>
        <div className="container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-mute">
              <ol className="flex flex-wrap gap-1.5">
                <li><Link href="/" className="hover:text-brand-royal">Home</Link> /</li>
                <li><Link href="/courses" className="hover:text-brand-royal">Courses</Link> /</li>
                <li aria-current="page" className="font-medium text-navy-800">{course.title}</li>
              </ol>
            </nav>
            <div className="animate-fade-up flex items-center gap-4">
              <TechBadge label={course.badge} accent={course.accent} size="lg" />
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-soft shadow-soft">{course.category}</span>
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 [animation-delay:60ms] sm:text-5xl lg:text-6xl">
              {course.title}
              <span className="mt-2 block text-2xl font-bold text-ink-soft sm:text-3xl">{course.subtitle}</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft [animation-delay:120ms]">{course.short}</p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row">
              <EnquireButton interest={course.title}>Enquire Now</EnquireButton>
              <a href="#modules" className="btn-ghost">View Curriculum</a>
            </div>
          </div>

          <aside className="animate-fade-up overflow-hidden rounded-3xl border border-surface-line bg-white/90 shadow-lift backdrop-blur [animation-delay:160ms]" aria-label="Course at a glance">
            <div className="relative aspect-[16/8] bg-navy-900">
              <Image src={courseImage(course.slug)} alt={`${course.title} course`} fill priority sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>
            <div className="p-6 sm:p-7">
            <h2 className="font-display text-lg font-bold text-navy-900">At a glance</h2>
            <dl className="mt-5 divide-y divide-surface-line text-[15px]">
              {[
                { icon: GraduationCap, k: "Level", v: levelRange(course.levels) },
                { icon: Clock, k: "Duration", v: course.duration ?? DURATION_PLACEHOLDER },
                { icon: MonitorSmartphone, k: "Training mode", v: course.modes.join(" / ") },
                { icon: CalendarDays, k: "Batches", v: site.batches.summary },
                { icon: Users, k: "Batch size", v: "Small batches" },
                { icon: Award, k: "Certificate", v: "Completion certificate" },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal" aria-hidden />
                  <dt className="w-28 shrink-0 text-ink-mute">{k}</dt>
                  <dd className="font-semibold text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          </aside>
        </div>
      </section>

      {/* Body */}
      <div className="container grid gap-12 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-ink-mute">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-surface-line">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-soft transition hover:border-brand-royal hover:text-navy-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <EnquireButton interest={course.title} className="btn-primary mt-8 w-full !px-4 text-sm">Enquire Now</EnquireButton>
          </div>
        </nav>

        <div className="min-w-0 space-y-16">
          <Block id="overview" icon={ListChecks} title="Course overview">
            <div className="space-y-4 text-[17px] leading-relaxed text-ink-soft">
              {course.overview.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
          </Block>

          <div className="grid gap-8 md:grid-cols-2">
            <Block id="audience" icon={Users} title="Who is this course for?">
              <ul className="prose-list space-y-3 text-[15px] text-navy-800">{course.audience.map((x) => <li key={x}>{x}</li>)}</ul>
            </Block>
            <Block id="prerequisites" icon={CheckCircle2} title="Prerequisites">
              <ul className="prose-list space-y-3 text-[15px] text-navy-800">{course.prerequisites.map((x) => <li key={x}>{x}</li>)}</ul>
            </Block>
          </div>

          <Block id="learn" icon={Target} title="What you will learn">
            <ul className="grid gap-3 sm:grid-cols-2">
              {course.learn.map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-3.5 text-[15px] font-medium text-navy-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="modules" icon={ListChecks} title="Module structure">
            <ol className="space-y-3">
              {course.modules.map((m, i) => (
                <li key={m.title}>
                  <details className="group rounded-2xl border border-surface-line bg-white shadow-soft open:shadow-lift" open={i === 0}>
                    <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-sm font-bold text-white", a.grad)}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[17px] font-semibold text-navy-900">{m.title}</span>
                      <span className="ml-auto hidden text-xs font-medium text-ink-mute sm:inline">{m.topics.length} topics</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-ink-mute transition group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="grid gap-2 px-5 pb-5 pl-[4.5rem] text-[15px] text-ink-soft sm:grid-cols-2">
                      {m.topics.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" aria-hidden />{t}</li>)}
                    </ul>
                  </details>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-mute">Module sequence and depth may be tailored to the batch level. Detailed syllabus available on enquiry.</p>
          </Block>

          <div className="grid gap-8 md:grid-cols-2">
            <Block id="hands-on" icon={Hammer} title="Hands-on learning">
              <ul className="prose-list space-y-3 text-[15px] text-navy-800">{course.handsOn.map((x) => <li key={x}>{x}</li>)}</ul>
            </Block>
            <Block id="tools" icon={Wrench} title="Tools & technologies">
              <ul className="flex flex-wrap gap-2">
                {course.tools.map((t) => <li key={t} className={cn("rounded-full px-3.5 py-2 text-sm font-semibold ring-1", a.soft, a.text, a.ring)}>{t}</li>)}
              </ul>
            </Block>
          </div>

          <Block id="outcomes" icon={Target} title="Learning outcomes">
            <ul className="grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((o, i) => (
                <li key={o} className="card !p-5">
                  <p className="font-display text-sm font-bold text-brand-royal">0{i + 1}</p>
                  <p className="mt-1 text-[15px] font-semibold text-navy-900">{o}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="certificate" icon={Award} title="Duration, mode, batches & certificate">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface p-5">
                <p className="text-sm text-ink-mute">Duration</p>
                <p className="mt-1 font-display font-bold text-navy-900">{course.duration ?? DURATION_PLACEHOLDER}</p>
                <p className="mt-1 text-sm text-ink-soft">Current batch schedule shared on enquiry.</p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <p className="text-sm text-ink-mute">Training mode</p>
                <p className="mt-1 font-display font-bold text-navy-900">{course.modes.join(" / ")}</p>
                <p className="mt-1 text-sm text-ink-soft">Availability varies by batch.</p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <p className="text-sm text-ink-mute">Batches</p>
                <p className="mt-1 font-display font-bold text-navy-900">{site.batches.summary}</p>
                <p className="mt-1 text-sm text-ink-soft">Choose weekday or weekend (Sat &amp; Sun) classes.</p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <p className="text-sm text-ink-mute">Certificate</p>
                <p className="mt-1 font-display font-bold text-navy-900">Completion certificate</p>
                <p className="mt-1 text-sm text-ink-soft">Issued on completing programme requirements.</p>
              </div>
            </div>
          </Block>
        </div>
      </div>

      <FAQ items={course.faqs} title={`${course.title} — FAQs`} />

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="font-display text-3xl font-bold text-navy-900">Explore more courses</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => <li key={c.slug}><CourseTile course={c} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <CTASection title={`Ready to start ${course.title}?`} text="Small batches. Better learning. Talk to us about the next batch." />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.short,
            url: `${site.url}/courses/${course.slug}`,
            provider: { "@type": "Organization", name: site.name, sameAs: site.url },
            educationalLevel: course.levels.join(", "),
            teaches: course.outcomes,
            hasCourseInstance: course.modes.map((m) => ({ "@type": "CourseInstance", courseMode: m.toLowerCase() === "offline" ? "onsite" : m.toLowerCase() === "hybrid" ? "blended" : "online" })),
          },
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }, { name: course.title, path: `/courses/${course.slug}` }]),
          faqJsonLd(course.faqs),
        ]}
      />
    </>
  );
}

import { courses } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { services } from "@/data/services";
import CountUp from "./ui/CountUp";

/** Factual figures only — every number is derived from the site's own data. */
export default function StatsBand() {
  const stats = [
    { n: courses.length, label: "Technology courses", sub: "From C to Azure Data Engineering" },
    { n: bootcamps.length, label: "Online bootcamps", sub: "Beginner-friendly starting points" },
    { n: 3, label: "Learning modes", sub: "Online, offline and hybrid" },
    { n: services.length, label: "Business services", sub: "Web, data, BI and AI solutions" },
  ];
  return (
    <section aria-label="Sarng Infotech at a glance" className="border-y border-surface-line bg-white">
      <div className="container">
        <dl className="grid grid-cols-2 divide-surface-line lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col px-2 py-8 sm:px-6 lg:py-10 ${i < 2 ? "border-b border-surface-line lg:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-surface-line lg:border-r-0" : ""}`}>
              <dt className="order-2 mt-2 text-sm font-semibold text-navy-900">{s.label}</dt>
              <dd className="order-1 font-display text-4xl font-bold tracking-tight text-brand-royal tabular-nums sm:text-5xl">
                <CountUp to={s.n} />
              </dd>
              <dd className="order-3 mt-1 hidden text-sm text-ink-mute sm:block">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

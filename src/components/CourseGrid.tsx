"use client";
import { useMemo, useState } from "react";
import { courseCategories, courses, type Course } from "@/data/courses";
import CourseCard, { CourseAdviceCard, CourseTile } from "./CourseCard";
import { cn } from "@/lib/cn";

/**
 * variant "catalogue": filterable two-column catalogue (course listing page)
 * variant "tiles": compact 5-across tiles; swipeable row on phones (home page)
 */
export default function CourseGrid({ items = courses, variant = "catalogue" }: { items?: Course[]; variant?: "catalogue" | "tiles" }) {
  const [cat, setCat] = useState<(typeof courseCategories)[number]>("All");
  const list = useMemo(() => (cat === "All" ? items : items.filter((c) => c.category === cat)), [cat, items]);

  if (variant === "tiles") {
    return (
      <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-5">
        {items.map((c) => (
          <li key={c.slug} className="w-[62%] shrink-0 snap-start sm:w-auto">
            <CourseTile course={c} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter courses by category">
        <div className="flex w-max gap-2 sm:mx-auto">
          {courseCategories.map((c) => {
            const count = c === "All" ? items.length : items.filter((i) => i.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                data-filter={c}
                aria-selected={cat === c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full border px-5 text-sm font-semibold transition",
                  cat === c ? "border-transparent bg-navy-900 text-white shadow-soft" : "border-surface-line bg-white text-ink-soft hover:border-slate-300 hover:text-navy-900",
                )}
              >
                {c}
                <span className={cn("rounded-full px-2 py-0.5 text-xs", cat === c ? "bg-white/15" : "bg-surface")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid gap-6 lg:grid-cols-2">
        {list.map((c) => (
          <li key={c.slug} data-category={c.category}>
            <CourseCard course={c} />
          </li>
        ))}
        {list.length % 2 === 1 && (
          <li className="hidden lg:block">
            <CourseAdviceCard />
          </li>
        )}
      </ul>
    </div>
  );
}

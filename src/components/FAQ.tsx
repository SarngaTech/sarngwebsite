import { Plus } from "lucide-react";
import type { FAQItem } from "@/data/courses";
import SectionHeading from "./ui/SectionHeading";

export default function FAQ({ items, title = "Frequently Asked Questions", id = "faq-title", bg = true }: { items: FAQItem[]; title?: string; id?: string; bg?: boolean }) {
  return (
    <section className={bg ? "section bg-surface" : "section"} aria-labelledby={id}>
      <div className="container max-w-3xl">
        <SectionHeading id={id} eyebrow="FAQ" title={title} />
        <div className="mt-10 space-y-3">
          {items.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-surface-line bg-white shadow-soft open:shadow-lift">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-[17px] font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-brand-royal transition group-open:rotate-45 group-open:bg-brand-royal group-open:text-white" aria-hidden>
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { BarChart3, Bot, Globe, Lightbulb, Workflow, LayoutDashboard, ArrowRight } from "lucide-react";
import { services, type Service } from "@/data/services";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import IconTile from "./ui/IconTile";
import { EnquireButton } from "./EnquiryModal";

export const serviceIcons: Record<Service["icon"], typeof Globe> = {
  web: Globe,
  app: LayoutDashboard,
  bi: BarChart3,
  etl: Workflow,
  ai: Bot,
  consult: Lightbulb,
};

export default function BusinessServices({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section relative overflow-hidden bg-navy-950 text-white" aria-labelledby="biz-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-brand-royal/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl" />
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
      </div>
      <div className="container relative">
        {heading && (
          <SectionHeading
            id="biz-title"
            dark
            eyebrow="For Businesses"
            title="Technology That Solves Real Problems."
            subtitle="Beyond training, Sarng Infotech delivers practical technology solutions for organisations."
          />
        )}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 70}>
              <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[.04] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.07]">
                <IconTile icon={serviceIcons[s.icon]} accent={s.accent} />
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{s.text}</p>
                <p className="mt-4 rounded-2xl bg-white/5 p-3.5 text-sm text-slate-200">
                  <span className="font-semibold text-cyan-300">Business benefit: </span>
                  {s.benefit}
                </p>
                <EnquireButton
                  interest={`Business: ${s.title}`}
                  persona="Business"
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-5 text-[15px] font-semibold text-white transition hover:text-cyan-300"
                >
                  Discuss Your Requirement <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </EnquireButton>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

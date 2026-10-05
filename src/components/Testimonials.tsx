import { testimonials } from "@/data/testimonials";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

/** Renders only when real, permission-cleared testimonials are added to data/testimonials.ts. */
export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section bg-surface" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow="Learner stories" title="What Our Learners Say" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 70}>
              <figure className="card h-full">
                <blockquote className="text-[15px] leading-relaxed text-navy-800">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-bold text-navy-900">{t.name}</span>
                  {t.role && <span className="block text-ink-mute">{t.role}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

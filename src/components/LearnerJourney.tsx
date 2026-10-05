import { BookOpen, Compass, Dumbbell, Layers, Presentation, Rocket } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const flow = [
  { icon: BookOpen, title: "Learn", text: "Clear concepts, explained simply" },
  { icon: Dumbbell, title: "Practice", text: "Exercises after every topic" },
  { icon: Compass, title: "Get Guidance", text: "Mentor feedback in a small batch" },
  { icon: Layers, title: "Build Skills", text: "Apply concepts to real scenarios" },
  { icon: Presentation, title: "Demonstrate Skills", text: "Show what you can do" },
  { icon: Rocket, title: "Become Career Ready", text: "Confident for what comes next" },
];

export default function LearnerJourney() {
  return (
    <section className="section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading id="journey-title" eyebrow="The learner experience" title="How You Learn With Us" subtitle="Every learner moves through the same practical, guided journey." />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {flow.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 60} className="relative">
              <div className="card flex h-full flex-row items-center gap-4 !p-5 lg:flex-col lg:items-start">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-royal" aria-hidden>
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy-900">{f.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{f.text}</p>
                </div>
              </div>
              {i < flow.length - 1 && (
                <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs text-brand-royal shadow-soft lg:flex" aria-hidden>
                  →
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

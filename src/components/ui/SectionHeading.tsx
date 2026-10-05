import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  dark = false,
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow && (
        <p className={cn("mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[.16em]", dark ? "text-cyan-300" : "text-brand-royal")}>
          <span className="h-px w-6 bg-current opacity-60" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn("text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-navy-900")}>
        {title}
      </Tag>
      {subtitle && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-slate-300" : "text-ink-soft")}>{subtitle}</p>}
    </Reveal>
  );
}

import { accents, type AccentKey } from "@/lib/accents";
import { cn } from "@/lib/cn";

export default function TechBadge({ label, accent, size = "md" }: { label: string; accent: AccentKey; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-10 w-10 text-xs rounded-xl", md: "h-12 w-12 text-sm rounded-2xl", lg: "h-16 w-16 text-lg rounded-2xl" };
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center bg-gradient-to-br font-mono font-bold text-white shadow-glow",
        accents[accent].grad,
        sizes[size],
      )}
    >
      <span className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_55%)]" />
      <span className="relative">{label}</span>
    </span>
  );
}

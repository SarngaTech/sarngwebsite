import type { LucideIcon } from "lucide-react";
import { accents, type AccentKey } from "@/lib/accents";
import { cn } from "@/lib/cn";

export default function IconTile({ icon: Icon, accent = "blue", className }: { icon: LucideIcon; accent?: AccentKey; className?: string }) {
  return (
    <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow", accents[accent].grad, className)} aria-hidden>
      <Icon className="h-6 w-6" strokeWidth={1.9} />
    </span>
  );
}

import type { Level } from "@/data/courses";

/** "Beginner to Advanced", "Intermediate to Advanced", or a single level */
export function levelRange(levels: Level[]) {
  if (levels.length <= 1) return levels[0] ?? "";
  return `${levels[0]} to ${levels[levels.length - 1]}`;
}

export const DURATION_PLACEHOLDER = "Shared on enquiry";

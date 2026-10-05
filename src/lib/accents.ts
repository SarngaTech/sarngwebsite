export type AccentKey = "blue" | "cyan" | "teal" | "purple" | "pink" | "orange";

/**
 * Accent gradients restricted to the official palette
 * (Deep Navy, Royal Blue, Bright Cyan, Aqua Teal, Deep Blue Teal).
 * Keys are kept for data compatibility; values are brand-only.
 */
export const accents: Record<AccentKey, { grad: string; soft: string; text: string; ring: string }> = {
  blue: { grad: "from-brand-royal to-brand-cyan", soft: "bg-blue-50", text: "text-brand-royal", ring: "ring-blue-100" },
  cyan: { grad: "from-brand-cyan to-brand-teal", soft: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-100" },
  teal: { grad: "from-brand-teal to-navy-700", soft: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-100" },
  purple: { grad: "from-navy-800 to-brand-royal", soft: "bg-indigo-50", text: "text-navy-800", ring: "ring-indigo-100" },
  pink: { grad: "from-navy-700 to-brand-teal", soft: "bg-teal-50", text: "text-navy-700", ring: "ring-teal-100" },
  orange: { grad: "from-brand-royal to-navy-700", soft: "bg-blue-50", text: "text-navy-700", ring: "ring-blue-100" },
};

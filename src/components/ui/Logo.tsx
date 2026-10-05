import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Official Sarng Infotech logo (from the approved master PNG — never redrawn or recoloured).
 *  - "compact": symbol + wordmark without tagline (for small sizes such as the navbar, per brand guidelines)
 *  - "full":    complete lockup with tagline (use at 260px width or larger)
 *  - variant "light": white wordmark with the original coloured symbol, for dark backgrounds
 * Replace files in /public/brand with a traced vector master when available.
 */
const files = {
  compact: { dark: "/brand/sarng-logo-notagline.png", light: "/brand/sarng-logo-notagline-white.png", w: 900, h: 299 },
  full: { dark: "/brand/sarng-logo.png", light: "/brand/sarng-logo-white.png", w: 1040, h: 333 },
};

export default function Logo({
  version = "compact",
  variant = "dark",
  className = "h-10 w-auto",
  priority = false,
  link = true,
}: {
  version?: "compact" | "full";
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
  link?: boolean;
}) {
  const f = files[version];
  const img = (
    <Image
      src={variant === "light" ? f.light : f.dark}
      alt={version === "full" ? `${site.name} — ${site.tagline}` : site.name}
      width={f.w}
      height={f.h}
      priority={priority}
      sizes="(min-width: 640px) 300px, 200px"
      className={className}
    />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label={`${site.name} — Home`} className="inline-flex shrink-0 items-center rounded-lg focus-visible:outline-offset-4">
      {img}
    </Link>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/data/heroSlides";
import { AIVisual, BusinessVisual, CodeVisual, DataVisual } from "./hero/SlideVisuals";
import { cn } from "@/lib/cn";

const INTERVAL = 5000;

function Visual({ slide, usePhoto, first }: { slide: HeroSlide; usePhoto: boolean; first: boolean }) {
  if (usePhoto && slide.photo)
    return <Image src={slide.photo} alt={slide.alt} fill priority={first} sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />;
  switch (slide.visual) {
    case "data":
      return <DataVisual />;
    case "ai":
      return <AIVisual />;
    case "business":
      return <BusinessVisual />;
    default:
      return <CodeVisual />;
  }
}

/**
 * Auto-scrolling hero slideshow: cross-fades every 5 s, pauses on hover/focus,
 * supports arrows, dots, swipe and keyboard, and stays still for reduced-motion users.
 */
export default function HeroCarousel({ slides, photos }: { slides: HeroSlide[]; photos: Record<string, boolean> }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go, n]);

  return (
    <div
      data-carousel=""
      className="relative h-full w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => {
        const active = i === index;
        const usePhoto = !!photos[s.id];
        return (
          <div
            key={s.id}
            data-slide={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}: ${s.title}`}
            aria-hidden={!active}
            className={cn("absolute inset-0 transition-opacity duration-700 ease-out", active ? "opacity-100" : "pointer-events-none opacity-0")}
          >
            <Visual slide={s} usePhoto={usePhoto} first={i === 0} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/55 to-transparent px-6 pb-14 pt-20 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">{s.eyebrow}</p>
              <p className="mt-1.5 max-w-md font-display text-lg font-bold leading-snug text-white sm:text-2xl">{s.title}</p>
              <Link href={s.href} tabIndex={active ? 0 : -1} className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-sky-200">
                {s.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between sm:inset-x-8">
        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              data-dot={i}
              aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" data-prev="" aria-label="Previous slide" onClick={() => go(index - 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" data-next="" aria-label="Next slide" onClick={() => go(index + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

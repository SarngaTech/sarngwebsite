"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { courseCategories, courses } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import Logo from "./ui/Logo";
import TechBadge from "./ui/TechBadge";
import InstagramIcon from "./ui/InstagramIcon";
import { useEnquiry } from "./EnquiryModal";

const groups = courseCategories
  .filter((c) => c !== "All")
  .map((cat) => ({ cat, items: courses.filter((c) => c.category === cat) }));

/** Desktop mega-menu listing every course, grouped by category. */
function CoursesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_280px] gap-0 overflow-hidden rounded-3xl border border-surface-line bg-white shadow-[0_24px_60px_-20px_rgba(0,16,56,.35)]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 p-7 xl:grid-cols-4">
        {groups.map((g) => (
          <div key={g.cat} className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.14em] text-ink-mute">{g.cat}</p>
            <ul className="space-y-1">
              {g.items.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface focus-visible:bg-surface"
                  >
                    <TechBadge label={c.badge} accent={c.accent} size="sm" />
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold leading-tight text-navy-900 group-hover:text-brand-royal">{c.title}</span>
                      <span className="block truncate text-xs text-ink-mute">{c.subtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-navy-900 p-7 text-white">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-sky-300">Online Bootcamps</p>
        <ul className="mt-3 space-y-2">
          {bootcamps.map((b) => (
            <li key={b.slug}>
              <Link href={`/courses/${b.relatedCourse}`} onClick={onNavigate} className="flex flex-col rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10">
                {b.title}
                <span className="mt-0.5 text-xs font-medium text-slate-400">Beginner friendly · Online · Weekends</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-slate-300">Small, mentor-guided batches — weekday and weekend timings.</p>
        <Link href="/courses" onClick={onNavigate} className="btn-white mt-auto !min-h-[44px] !py-2 text-sm">
          View all courses <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileCourses, setMobileCourses] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const showMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(true);
  };
  const hideMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(false), 150);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkCls = (href: string) =>
    cn("relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] font-medium xl:px-4 xl:text-[15px] transition-colors", isActive(href) ? "text-brand-royal" : "text-ink-soft hover:text-navy-900");
  const underline = <span className="absolute inset-x-2.5 -bottom-0.5 xl:inset-x-4 h-0.5 rounded-full bg-gradient-to-r from-brand-royal to-brand-cyan" aria-hidden />;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "border-b border-surface-line/80 bg-white/90 shadow-[0_6px_24px_-12px_rgba(15,23,42,.18)] backdrop-blur-xl" : "bg-white/70 backdrop-blur-md",
        )}
      >
        <nav aria-label="Primary" className={cn("container relative flex items-center justify-between gap-6 transition-all duration-300", scrolled ? "h-16" : "h-[76px]")}>
          <Logo priority className={cn("w-auto transition-all duration-300", scrolled ? "h-10" : "h-11 sm:h-12")} />

          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {mainNav.map((item) =>
              item.href === "/courses" ? (
                <li key={item.href} onMouseEnter={showMenu} onMouseLeave={hideMenu} className="static">
                  <div className="flex items-center">
                    <Link href="/courses" aria-current={isActive("/courses") ? "page" : undefined} className={linkCls("/courses")} onFocus={showMenu}>
                      Courses
                      <ChevronDown className={cn("h-4 w-4 transition", menu && "rotate-180")} aria-hidden />
                      {isActive("/courses") && underline}
                    </Link>
                    <button
                      type="button"
                      className="sr-only focus:not-sr-only focus:rounded-md focus:px-1"
                      aria-expanded={menu}
                      aria-controls="courses-menu"
                      onClick={() => setMenu((v) => !v)}
                    >
                      Show course list
                    </button>
                  </div>
                  <div
                    id="courses-menu"
                    onMouseEnter={showMenu}
                    onMouseLeave={hideMenu}
                    className={cn(
                      "absolute inset-x-0 top-full pt-3 transition duration-200",
                      menu ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <CoursesMenu onNavigate={() => setMenu(false)} />
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkCls(item.href)}>
                    {item.label}
                    {isActive(item.href) && underline}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" data-enquire="" onClick={() => openEnquiry()} className="btn-primary hidden whitespace-nowrap !px-5 !py-2.5 sm:inline-flex">
              Enquire Now
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 transition hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered outside <header> so backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white transition-all duration-300 lg:hidden",
          scrolled ? "top-16" : "top-[76px]",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <div className="container flex min-h-full flex-col pb-28 pt-4">
          <ul className="flex flex-col">
            {mainNav.map((item) =>
              item.href === "/courses" ? (
                <li key={item.href} className="border-b border-surface-line">
                  <div className="flex items-center justify-between">
                    <Link href="/courses" className={cn("flex-1 py-4 font-display text-xl font-semibold", isActive("/courses") ? "text-brand-royal" : "text-navy-900")}>
                      Courses
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileCourses((v) => !v)}
                      aria-expanded={mobileCourses}
                      aria-controls="mobile-courses"
                      aria-label={mobileCourses ? "Hide course list" : "Show course list"}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-navy-900"
                    >
                      <ChevronDown className={cn("h-5 w-5 transition", mobileCourses && "rotate-180")} aria-hidden />
                    </button>
                  </div>
                  <ul id="mobile-courses" hidden={!mobileCourses} className="grid gap-1 pb-4">
                    {courses.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/courses/${c.slug}`} className="flex items-center gap-3 rounded-xl p-2 active:bg-surface">
                          <TechBadge label={c.badge} accent={c.accent} size="sm" />
                          <span>
                            <span className="block text-[15px] font-semibold text-navy-900">{c.title}</span>
                            <span className="block text-xs text-ink-mute">{c.subtitle}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href} className="border-b border-surface-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("flex items-center justify-between py-4 font-display text-xl font-semibold", isActive(item.href) ? "text-brand-royal" : "text-navy-900")}
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-slate-300" aria-hidden />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 grid gap-3">
            <button type="button" data-enquire="" onClick={() => { setOpen(false); openEnquiry(); }} className="btn-primary w-full">
              Enquire Now
            </button>
            <a href={site.contact.phoneHref} className="btn-ghost w-full">
              <Phone className="h-4 w-4" aria-hidden /> Call {site.contact.phone}
            </a>
            <a href={site.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
              <InstagramIcon className="h-4 w-4" /> Follow {site.contact.instagram}
            </a>
          </div>
          <p className="mt-auto pt-10 text-center text-sm font-medium text-ink-mute">{site.mottoLong}</p>
        </div>
      </div>
    </>
  );
}

/**
 * Home page hero slideshow.
 * Each slide can show a real photo: drop a file at the `photo` path in /public and it replaces the illustration automatically.
 */
export type SlideVisual = "photo" | "code" | "data" | "ai" | "business";

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  visual: SlideVisual;
  /** Optional photo (under /public). Used when the file exists. */
  photo?: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "learn",
    eyebrow: "Technology Training",
    title: "Learn with mentors, in small batches",
    href: "/courses",
    cta: "Explore courses",
    visual: "photo",
    photo: "/images/hero-students.jpg",
    alt: "Students learning technology together on laptops",
  },
  {
    id: "code",
    eyebrow: "Programming",
    title: "C, C++, Python and Web Technologies",
    href: "/courses",
    cta: "View programming courses",
    visual: "code",
    photo: "/images/slides/programming.jpg",
    alt: "Code editor showing a Python program",
  },
  {
    id: "data",
    eyebrow: "Data & Analytics",
    title: "SQL, Excel, Power BI and Tableau",
    href: "/courses/power-bi",
    cta: "See Power BI course",
    visual: "data",
    photo: "/images/slides/data-analytics.jpg",
    alt: "Business dashboard with charts",
  },
  {
    id: "ai",
    eyebrow: "AI & Cloud",
    title: "Generative AI and Azure Data Engineering",
    href: "/courses/generative-ai",
    cta: "See Generative AI course",
    visual: "ai",
    photo: "/images/slides/ai-cloud.jpg",
    alt: "AI assistant answering a question",
  },
  {
    id: "business",
    eyebrow: "For Businesses",
    title: "Websites, web apps, data and AI solutions",
    href: "/for-businesses",
    cta: "Explore business services",
    visual: "business",
    photo: "/images/slides/business-solutions.jpg",
    alt: "Business website and dashboard on screen",
  },
];

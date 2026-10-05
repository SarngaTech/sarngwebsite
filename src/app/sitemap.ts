export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/courses", "/internships", "/projects", "/for-businesses", "/about", "/contact", "/privacy-policy"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const coursePages = courses.map((c) => ({
    url: `${site.url}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...coursePages];
}

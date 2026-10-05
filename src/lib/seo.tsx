import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata({ title, description, path, keywords }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/sarng-logo.png`,
    image: `${site.url}/opengraph-image`,
    telephone: "+918438653708",
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 193/12, 1st Floor, 100 Feet Road, Jawaharlal Salai, Arumbakkam",
      addressLocality: site.contact.city,
      postalCode: site.contact.postalCode,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.contact.geo.lat, longitude: site.contact.geo.lng },
    hasMap: site.contact.mapLink,
    areaServed: "Chennai, India",
    sameAs: site.social.map((s) => s.href).filter((h) => h.startsWith("http")),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

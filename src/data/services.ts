/** Business technology services. No client names or outcome claims — add real case studies when available. */
export interface Service {
  slug: string;
  icon: "web" | "app" | "bi" | "etl" | "ai" | "consult";
  title: string;
  text: string;
  benefit: string;
  accent: "blue" | "cyan" | "teal" | "purple" | "pink" | "orange";
}

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "web",
    title: "Website Development",
    text: "Fast, responsive and search-friendly websites that present your organisation professionally on every device.",
    benefit: "A credible online presence that turns visitors into enquiries.",
    accent: "blue",
  },
  {
    slug: "web-applications",
    icon: "app",
    title: "Web Applications",
    text: "Custom web applications — portals, dashboards and internal tools — built around the way your team works.",
    benefit: "Replace manual spreadsheets and email chains with a streamlined workflow.",
    accent: "purple",
  },
  {
    slug: "power-bi",
    icon: "bi",
    title: "Power BI",
    text: "Data models, DAX and interactive dashboards that bring your business numbers together in one place.",
    benefit: "Decision-makers see accurate, up-to-date information at a glance.",
    accent: "orange",
  },
  {
    slug: "data-engineering-etl",
    icon: "etl",
    title: "Data Engineering & ETL",
    text: "Reliable data pipelines that collect, clean and organise data from multiple systems, including on Microsoft Azure.",
    benefit: "Trustworthy, analysis-ready data without repetitive manual effort.",
    accent: "teal",
  },
  {
    slug: "ai-solutions",
    icon: "ai",
    title: "AI / Generative AI Solutions",
    text: "Practical AI assistants, document Q&A and automation built with modern language models — applied responsibly.",
    benefit: "Save time on repetitive knowledge work and support your teams.",
    accent: "pink",
  },
  {
    slug: "it-consulting",
    icon: "consult",
    title: "IT Consulting",
    text: "Independent guidance on technology choices, digital transformation roadmaps and implementation planning.",
    benefit: "Invest in the right technology with a clear, practical plan.",
    accent: "cyan",
  },
];

export const engagementSteps = [
  { title: "Discover", text: "We understand your goals, users and current systems." },
  { title: "Plan", text: "We propose a clear scope, approach and timeline." },
  { title: "Build", text: "We design and develop in short, reviewable iterations." },
  { title: "Support", text: "We launch, hand over and support you after go-live." },
];

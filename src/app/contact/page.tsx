import Image from "next/image";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, whatsappLink } from "@/data/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Arumbakkam, Chennai",
  description: "Contact Sarng Infotech, 100 Feet Road, Jawaharlal Salai, Arumbakkam, Chennai 600106. Call +91 84386 53708 or email Info@sarnginfotech.com.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappLink();
  const items = [
    { icon: Phone, label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: InstagramIcon, label: "Instagram", value: site.contact.instagram, href: site.contact.instagramUrl },
    { icon: FacebookIcon, label: "Facebook", value: "Sarng Infotech", href: site.social.find((x) => x.label === "Facebook")!.href },
    { icon: LinkedInIcon, label: "LinkedIn", value: "Sarng Infotech", href: site.social.find((x) => x.label === "LinkedIn")!.href },
    { icon: Globe, label: "Website", value: site.displayUrl, href: site.url },
    { icon: MapPin, label: "Address", value: site.contact.addressLines.join(" "), href: site.contact.mapLink },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Talk" subtitle="Questions about courses, internships, college programmes or a business requirement? We're here to help." crumbs={[{ label: "Contact" }]} />

      <section className="section" aria-label="Contact details and form">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <div className="space-y-6">
            <Reveal className="rounded-[2rem] bg-navy-950 p-7 text-white sm:p-9">
              <h2 className="font-display text-2xl font-bold">Sarng Infotech</h2>
              <p className="mt-1 text-sm text-cyan-300">{site.tagline}</p>
              <address className="mt-7 space-y-5 not-italic">
                {items.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={["Address", "Website", "Instagram", "Facebook", "LinkedIn"].includes(label) ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition group-hover:bg-white/15" aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                      <span className="block break-words font-semibold text-white group-hover:text-cyan-200">{value}</span>
                    </span>
                  </a>
                ))}
              </address>
            </Reveal>

            <Reveal delay={60} className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <a href={site.contact.phoneHref} className="btn-primary !px-4"><Phone className="h-4 w-4" aria-hidden /> Call Us</a>
              <a href={`mailto:${site.contact.email}`} className="btn-ghost !px-4"><Mail className="h-4 w-4" aria-hidden /> Email Us</a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn !px-4 bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,.7)] hover:-translate-y-0.5">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </a>
              )}
            </Reveal>

            <Reveal delay={80} className="flex flex-col items-center gap-5 rounded-[2rem] border border-surface-line bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="shrink-0 overflow-hidden rounded-2xl ring-1 ring-surface-line" aria-label={`Open ${site.instagram.handle} on Instagram`}>
                <Image src={site.instagram.qr} alt={`Instagram QR code for ${site.instagram.handle}`} width={144} height={144} className="h-36 w-36" />
              </a>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-mute">Follow us on Instagram</p>
                <p className="mt-1 font-display text-xl font-bold text-navy-900">{site.instagram.handle}</p>
                <p className="mt-1 text-sm text-ink-soft">Scan the code or tap below for updates on batches, bootcamps and events.</p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn mt-4 !min-h-[44px] !px-5 !py-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-sm text-white shadow-soft hover:-translate-y-0.5">
                  <InstagramIcon className="h-4 w-4" />
                  Follow on Instagram
                </a>
              </div>
            </Reveal>

            <Reveal delay={90} className="flex flex-col items-center gap-5 rounded-[2rem] border border-surface-line bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <a
                href={site.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-[1.25rem] p-[5px] shadow-soft"
                style={{ background: "conic-gradient(from 270deg, #4285F4 0 25%, #EA4335 0 50%, #FBBC05 0 75%, #34A853 0 100%)" }}
                aria-label="Open Sarng Infotech on Google"
              >
                <span className="block overflow-hidden rounded-2xl bg-white">
                  <Image src={site.google.qr} alt="Google Business Profile QR code for Sarng Infotech" width={136} height={136} className="h-[136px] w-[136px]" />
                </span>
              </a>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-ink-mute">Find us on Google</p>
                <p className="mt-1 font-display text-xl font-bold text-navy-900">Sarng Infotech</p>
                <p className="mt-1 text-sm text-ink-soft">Scan the code to see our location, directions and business details on Google.</p>
                <a href={site.google.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 !min-h-[44px] !px-5 !py-2 text-sm">
                  <MapPin className="h-4 w-4 text-brand-royal" aria-hidden /> View on Google
                </a>
              </div>
            </Reveal>

            <Reveal delay={100} className="overflow-hidden rounded-[2rem] border border-surface-line">
              {site.contact.mapEmbedUrl ? (
                <iframe
                  src={site.contact.mapEmbedUrl}
                  title="Sarng Infotech location on Google Maps"
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
              {site.contact.mapEmbedUrl ? (
                <a href={site.contact.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 bg-white px-5 py-4 text-sm font-semibold text-brand-royal hover:bg-surface">
                  <span className="flex items-center gap-2 text-navy-900"><MapPin className="h-4 w-4 text-brand-royal" aria-hidden /> {site.contact.addressLines.join(" ")}</span>
                  <span className="shrink-0 whitespace-nowrap">Get directions →</span>
                </a>
              ) : (
                <div className="relative flex h-72 flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
                  <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-royal to-brand-cyan text-white shadow-glow" aria-hidden>
                    <MapPin className="h-6 w-6" />
                  </span>
                  <p className="relative font-display font-bold text-navy-900">{site.contact.addressLines.join(" ")}</p>
                  <a href={site.contact.mapLink} target="_blank" rel="noopener noreferrer" className="relative text-sm font-semibold text-brand-royal hover:underline">
                    Open in Google Maps →
                  </a>
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={80} className="rounded-[2rem] border border-surface-line bg-white p-6 shadow-lift sm:p-10">
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">Send us an enquiry</h2>
            <p className="mt-2 text-ink-soft">Fill in the form and our team will get back to you.</p>
            <div className="mt-8"><ContactForm /></div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}

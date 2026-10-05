/**
 * Central business information.
 * Edit here (or later wire to a CMS / admin dashboard) — components read from this file only.
 */
export const site = {
  name: "Sarng Infotech",
  shortName: "Sarng",
  tagline: "Powering your digital future",
  motto: "Learn. Build. Grow.",
  mottoLong: "Learn • Build • Grow • Make an Impact",
  pillars: "Skills. People. Progress. A Brighter Tomorrow.",
  description:
    "Sarng Infotech provides practical technology training, internships, online bootcamps and digital technology solutions for students, colleges and businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarnginfotech.com",
  displayUrl: "www.sarnginfotech.com",
  contact: {
    phone: "+91 84386 53708",
    phoneHref: "tel:+918438653708",
    email: "Info@sarnginfotech.com",
    instagram: "@sarng_infotech",
    instagramUrl: "https://www.instagram.com/sarng_infotech/",
    addressLines: ["No. 193/12, 1st Floor,", "100 Feet Road, Jawaharlal Salai,", "Arumbakkam, Chennai - 600106"],
    addressShort: "Arumbakkam, Chennai",
    postalCode: "600106",
    city: "Chennai",
    region: "Tamil Nadu",
    country: "IN",
    /** Google Maps business listing (pin: 13.066046, 80.2098432) */
    mapEmbedUrl: "https://maps.google.com/maps?q=13.066046,80.2098432&z=17&output=embed",
    mapLink:
      "https://www.google.com/maps/place/sarng+infotech/@13.0660512,80.2072683,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267ed1ea2c361:0x7ab954c6f6459d4b!8m2!3d13.066046!4d80.2098432!16s%2Fg%2F11p1hvpm42?hl=en&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
    geo: { lat: 13.066046, lng: 80.2098432 },
    /** Placeholder — update when office hours are confirmed. */
    hours: "Office hours: to be updated",
  },
  whatsapp: {
    /** Digits only. Set NEXT_PUBLIC_WHATSAPP_NUMBER to the confirmed WhatsApp Business number, or "" to hide WhatsApp CTAs. */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918438653708",
    message:
      "Hello Sarng Infotech, I would like to know more about your courses and training programs.",
  },
  /** Batch timings offered for courses and bootcamps */
  batches: {
    summary: "Weekday & Weekend",
    note: "Weekday and weekend batches available",
    options: ["Weekdays batch", "Alternate days batch", "Weekend batch", "Online batch"],
  },
  /** Google Business Profile QR (scans to the Sarng Infotech listing on Google) */
  google: {
    qr: "/images/google-qr.png",
    url: "https://local.google.com/place?placeid=ChIJYcOiHu1nUjoRS51F9sZUuXo",
  },
  instagram: { handle: "@sarng_infotech", url: "https://www.instagram.com/sarng_infotech/", qr: "/images/instagram-qr.png" },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/sarng_infotech/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594978384866" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sarng-infotech-11ab28440/" },
  ],
} as const;

export function whatsappLink(message: string = site.whatsapp.message): string | null {
  if (!site.whatsapp.number) return null;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

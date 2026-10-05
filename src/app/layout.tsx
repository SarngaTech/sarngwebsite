import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import PhoneSheet from "@/components/PhoneSheet";
import SiteChrome from "@/components/SiteChrome";
import { EnquiryProvider } from "@/components/EnquiryModal";
import { site } from "@/data/site";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sarng Infotech | Technology Training, Internships & Digital Solutions",
    template: "%s | Sarng Infotech",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "technology training Chennai",
    "Python training",
    "SQL training",
    "Power BI training",
    "Data Engineering training",
    "Azure Data Engineering",
    "Generative AI training",
    "technology internships",
    "online Python bootcamp",
    "online SQL bootcamp",
    "student technology training",
    "IT solutions Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Sarng Infotech | Technology Training, Internships & Digital Solutions",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarng Infotech | Technology Training, Internships & Digital Solutions",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#001038",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="pb-[72px] sm:pb-0">
        <a href="#main" className="sr-only z-[100] rounded-lg bg-navy-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <EnquiryProvider>
          <SiteChrome>
            <Navbar />
          </SiteChrome>
          <main id="main" className="bg-network">{children}</main>
          <SiteChrome>
            <Footer />
            <WhatsAppButton />
            <MobileActionBar />
            <PhoneSheet />
          </SiteChrome>
        </EnquiryProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}

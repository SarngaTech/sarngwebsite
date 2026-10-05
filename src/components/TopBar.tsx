import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

/** Slim contact strip above the navbar (desktop only). */
export default function TopBar() {
  return (
    <div className="hidden bg-navy-900 text-[13px] text-slate-300 lg:block">
      <div className="container flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-sky-300" aria-hidden /> {site.contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail className="h-3.5 w-3.5 text-sky-300" aria-hidden /> {site.contact.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-sky-300" aria-hidden /> {site.contact.addressShort}
          </li>
        </ul>
        <p className="font-medium text-slate-200">{site.motto} <span className="text-slate-400">— {site.tagline}</span></p>
      </div>
    </div>
  );
}

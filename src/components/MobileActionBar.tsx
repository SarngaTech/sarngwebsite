"use client";
import { MessageSquareText, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppButton";
import { useEnquiry } from "./EnquiryModal";

/** Persistent bottom actions on phones: call, WhatsApp, enquire. */
export default function MobileActionBar() {
  const { open } = useEnquiry();
  const wa = whatsappLink();
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-[55] border-t border-surface-line bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur sm:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 px-3 py-2.5">
        <a href={site.contact.phoneHref} className="flex min-h-[48px] flex-col items-center justify-center rounded-xl text-xs font-semibold text-navy-900 active:bg-surface">
          <Phone className="h-5 w-5 text-brand-royal" aria-hidden />
          Call
        </a>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] flex-col items-center justify-center rounded-xl text-xs font-semibold text-navy-900 active:bg-surface">
            <WhatsAppIcon className="h-5 w-5 text-[#1DA851]" />
            WhatsApp
          </a>
        ) : (
          <a href={`mailto:${site.contact.email}`} className="flex min-h-[48px] flex-col items-center justify-center rounded-xl text-xs font-semibold text-navy-900">
            Email
          </a>
        )}
        <button type="button" data-enquire="" onClick={() => open()} className="btn-primary !min-h-[48px] !gap-1.5 !rounded-xl !px-3 text-sm">
          <MessageSquareText className="h-4 w-4" aria-hidden /> Enquire Now
        </button>
      </div>
    </nav>
  );
}

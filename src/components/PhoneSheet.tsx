"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, MessageSquare, Phone, X } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./WhatsAppButton";

const digits = site.contact.phoneHref.replace(/^tel:/, "");

/**
 * Clicking any phone number on the site (any tel: link) opens this sheet so the visitor
 * can choose to Call, send an SMS, message on WhatsApp or copy the number.
 * Links inside the sheet carry data-direct so they are not intercepted again.
 */
export default function PhoneSheet() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const wa = whatsappLink();

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
    document.body.style.overflow = "";
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!a || a.closest("[data-direct]")) return;
      e.preventDefault();
      lastFocus.current = a;
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.phone);
      setCopied(true);
    } catch {
      /* clipboard unavailable — the number is visible in the sheet */
    }
  };

  const item =
    "flex items-center gap-4 rounded-2xl border border-surface-line bg-white px-4 py-3.5 text-left transition hover:border-brand-royal/40 hover:bg-surface focus-visible:border-brand-royal";
  const iconBox = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl";

  return (
    <div id="phone-sheet" data-direct="" className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" hidden={!open}>
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" data-close="" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-sheet-title"
        className="relative w-full rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-2xl sm:max-w-sm sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="phone-sheet-title" className="font-display text-lg font-bold text-navy-900">
              Contact {site.name}
            </h2>
            <p className="mt-0.5 text-[15px] font-semibold text-brand-royal">{site.contact.phone}</p>
          </div>
          <button
            type="button"
            data-close=""
            onClick={close}
            aria-label="Close"
            className="-mr-2 -mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-surface"
          >
            <X className="pointer-events-none h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-5 grid gap-2.5">
          <a href={`tel:${digits}`} className={item} onClick={() => setTimeout(close, 300)}>
            <span className={`${iconBox} bg-blue-50 text-brand-royal`} aria-hidden>
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-semibold text-navy-900">Call</span>
              <span className="block text-sm text-ink-mute">Speak to our team</span>
            </span>
          </a>
          <a href={`sms:${digits}`} className={item} onClick={() => setTimeout(close, 300)}>
            <span className={`${iconBox} bg-teal-50 text-brand-teal`} aria-hidden>
              <MessageSquare className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-semibold text-navy-900">Send a text (SMS)</span>
              <span className="block text-sm text-ink-mute">Opens your messages app</span>
            </span>
          </a>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={item} onClick={() => setTimeout(close, 300)}>
              <span className={`${iconBox} bg-[#25D366]/10 text-[#25D366]`} aria-hidden>
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-navy-900">WhatsApp</span>
                <span className="block text-sm text-ink-mute">Chat with us on WhatsApp</span>
              </span>
            </a>
          )}
          <button type="button" data-copy-phone={site.contact.phone} onClick={copy} className={item}>
            <span className={`${iconBox} bg-surface text-navy-800`} aria-hidden>
              {copied ? <Check className="h-5 w-5 text-brand-teal" /> : <Copy className="h-5 w-5" />}
            </span>
            <span>
              <span className="block font-semibold text-navy-900" data-copy-label="">{copied ? "Number copied" : "Copy number"}</span>
              <span className="block text-sm text-ink-mute">{site.contact.phone}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

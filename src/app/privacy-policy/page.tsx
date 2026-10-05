import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { site } from "@/data/site";
import { PRIVACY_NOTICE_VERSION } from "@/lib/leads";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Sarng Infotech collects, uses, stores and protects the personal information you share through our website enquiry, contact, internship and project forms.",
  path: "/privacy-policy",
});

/** Human-readable effective date, e.g. "5 October 2026" (kept in sync with the version recorded with each consent). */
const effectiveDate = new Date(`${PRIVACY_NOTICE_VERSION}T00:00:00+05:30`).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const sections = [
  { id: "about", title: "About this policy" },
  { id: "collect", title: "Information we collect" },
  { id: "use", title: "How we use your information" },
  { id: "storage", title: "How your information is stored" },
  { id: "third-parties", title: "Service providers and third parties" },
  { id: "cookies", title: "Cookies" },
  { id: "retention", title: "How long we keep information" },
  { id: "security", title: "Security" },
  { id: "rights", title: "Your rights" },
  { id: "children", title: "Children" },
  { id: "contact", title: "Privacy and grievance contact" },
  { id: "changes", title: "Changes to this policy" },
];

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-surface-line pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-[1.7rem]">
        <span className="mr-2 text-brand-royal">{n}.</span>
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">{children}</div>
    </section>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-royal" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const B = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-navy-900">{children}</strong>;
const A = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => (
  <a
    href={href}
    className="font-medium text-brand-royal underline underline-offset-2 hover:text-navy-900"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
    {external && <span className="sr-only"> (opens in a new tab)</span>}
  </a>
);

export default function PrivacyPolicyPage() {
  const email = site.contact.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Privacy request")}`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect the personal information you share with Sarng Infotech through this website."
        crumbs={[{ label: "Privacy Policy" }]}
      >
        <p className="inline-flex rounded-full border border-surface-line bg-white px-4 py-2 text-sm text-ink-soft">
          Effective date: <strong className="ml-1 font-semibold text-navy-900">{effectiveDate}</strong>
        </p>
      </PageHero>

      <section aria-label="Privacy policy" className="relative">
      <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-[260px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="rounded-3xl border border-surface-line bg-white/90 p-6 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[.14em] text-brand-royal">On this page</p>
          <ol className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2 lg:grid-cols-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-soft transition hover:text-brand-royal">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl space-y-10 rounded-[2rem] border border-surface-line bg-white/95 p-6 shadow-soft sm:p-10">
          <Section id="about" n={1} title="About this policy">
            <p>
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an education and technology company based in Chennai, Tamil Nadu. We provide technology
              training, online bootcamps, internships, student project guidance and technology services for students, colleges and businesses.
            </p>
            <p>
              This policy explains what personal information we collect through <A href={site.url}>{site.displayUrl}</A>, why we collect it, how we
              look after it and the choices and rights you have. We decide why and how this information is used, so we are responsible for it. We have
              written this policy with India&rsquo;s Digital Personal Data Protection Act, 2023 and the rules made under it in mind.
            </p>
          </Section>

          <Section id="collect" n={2} title="Information we collect">
            <p>
              <B>Information you give us in our forms.</B> You can browse this website without telling us who you are. When you submit one of
              our forms, we collect:
            </p>
            <List
              items={[
                <>
                  <B>Enquiry and contact forms:</B> your name, phone number and email address and, depending on the form and the options you
                  choose, whether you are a student, professional, college or business, the course or service you are interested in, your preferred
                  batch (for course and bootcamp enquiries) and your message.
                </>,
                <>
                  <B>Internship application:</B> your name, phone number, email address, college, degree, year of study, preferred technology and
                  skill level, an optional message and, if you choose to upload one, your resume (PDF or Word document).
                </>,
                <>
                  <B>Student project enquiry:</B> your name, phone number, email address, college, project type and preferred technology and, if
                  you provide them, your degree, year of study and a description of your project idea.
                </>,
              ]}
            />
            <p>
              <B>Information recorded when you submit a form.</B> Along with your answers, we record the website page the form was sent from,
              the date and time, your acceptance of this privacy notice, the type of browser and device you used (the browser&rsquo;s
              &ldquo;user agent&rdquo;) and a one-way scrambled code (hash) generated from your internet (IP) address. We use this code only to
              recognise repeated or automated submissions; we do not store your actual IP address with your enquiry.
            </p>
            <p>
              <B>Information we add while handling your enquiry.</B> Each enquiry is given a reference number. We also keep a record of the emails
              we send about it and whether they were delivered, its follow-up status, and any notes our team adds.
            </p>
            <p>
              <B>When you contact us directly.</B> If you call, email or send us a WhatsApp message, we receive the details you choose to share,
              such as your phone number, email address and the content of your message.
            </p>
            <p>
              Please do not include sensitive information, such as financial, health or identity document details, in your message or resume.
              We do not need it to respond to you.
            </p>
          </Section>

          <Section id="use" n={3} title="How we use your information">
            <p>We use the information described above only to:</p>
            <List
              items={[
                "respond to your enquiry and contact you about it by phone, email or WhatsApp;",
                "give you information about the courses, bootcamps, internships, projects or services you asked about;",
                "send you an automatic email confirming that we received your enquiry, with your reference number;",
                "review your internship application and contact you about the selection process;",
                "provide a programme or service you request from us, such as enrolling you in a batch;",
                "keep a record of enquiries and their follow-up status so our team can respond properly;",
                "protect the website and our team from spam, misuse and fraudulent submissions; and",
                "meet our legal obligations.",
              ]}
            />
            <p>
              We process this information on the basis of the consent you give when you tick the privacy checkbox before submitting a form, and for
              the purpose for which you voluntarily provided it.
            </p>
          </Section>

          <Section id="storage" n={4} title="How your information is stored">
            <List
              items={[
                <>
                  Form submissions, including any resume you upload, are stored in a secure, access-controlled cloud database (PostgreSQL, provided by
                  Neon) connected to this website.
                </>,
                <>
                  When you submit a form, a copy of your details (and your resume, if any) is emailed to our team&rsquo;s business mailbox, and a
                  confirmation email is sent to the email address you gave us.
                </>,
                <>
                  Authorised members of our team view, update and export enquiry records through a password-protected administration area that is
                  not available to the public.
                </>,
              ]}
            />
            <p>
              <B>Where your information is processed.</B> Our database is hosted outside India, in Singapore (on Amazon Web Services, through
              Neon). Our website hosting and email providers may also process information on servers outside India.
            </p>
          </Section>

          <Section id="third-parties" n={5} title="Service providers and third parties">
            <p>We use the following providers to run this website, and share information with them only so that they can provide their service to us:</p>
            <List
              items={[
                <>
                  <B>Vercel</B>: hosts this website. It receives every page request and form submission, and processes technical information such as
                  your IP address to deliver the website.
                </>,
                <>
                  <B>Neon</B>: provides the PostgreSQL database where form submissions are stored.
                </>,
                <>
                  <B>GoDaddy</B>: provides our business email service, used to deliver enquiry notifications to our team and confirmation emails to
                  you.
                </>,
              ]}
            />
            <p>
              <B>Other services you may choose to use.</B> Our contact page shows an embedded Google Map, and our website links to WhatsApp,
              Instagram, Facebook, LinkedIn and our Google Business Profile. When the map loads, or when you follow one of these links or message us
              on WhatsApp, the provider (Google or Meta/LinkedIn) may collect information under its own privacy policy, which we do not control.
            </p>
            <p>We may also disclose information where we are required to do so by law or by a lawful order of a government authority or court.</p>
          </Section>

          <Section id="cookies" n={6} title="Cookies">
            <p>
              We do not use analytics, advertising or tracking cookies, and our fonts are served from our own website. The only cookie we set is a
              strictly necessary login cookie used by our own team when signing in to the administration area. Visitors who only browse the site or
              submit a form do not receive it. The embedded Google Map on our contact page may set its own cookies when it loads.
            </p>
          </Section>

          <Section id="retention" n={7} title="How long we keep information">
            <p>
              We keep personal information only for as long as reasonably necessary for the purposes described in this policy, such as responding
              to your enquiry, following up on it and keeping records of the services we provide, or for longer where the law requires it. When it
              is no longer needed, we delete it or make sure it no longer identifies you.
            </p>
            <p>
              Records are not deleted automatically. Deletion is carried out manually by our team, including when you ask us to erase your
              information (see &ldquo;Your rights&rdquo; below).
            </p>
          </Section>

          <Section id="security" n={8} title="Security">
            <p>
              We take reasonable security measures to protect personal information. This website is served over an encrypted (HTTPS) connection,
              the database and email service require authentication, and the administration area is protected by a password, signed login sessions
              and limits on repeated login attempts. Raw IP addresses are not stored with enquiries.
            </p>
            <p>
              No method of transmitting or storing information over the internet is completely secure, so we cannot guarantee absolute security.
              If a personal data breach affecting you occurs, we will take steps to deal with it and notify you and the authorities where the law
              requires.
            </p>
          </Section>

          <Section id="rights" n={9} title="Your rights">
            <p>Subject to applicable law, you can ask us to:</p>
            <List
              items={[
                <>
                  <B>Access:</B> give you a summary of the personal information we hold about you and how we have used it, and tell you who we have
                  shared it with;
                </>,
                <>
                  <B>Correct or update:</B> correct inaccurate or misleading information, complete incomplete information or update it;
                </>,
                <>
                  <B>Erase:</B> delete your personal information when it is no longer needed for the purpose it was collected for, unless we must
                  keep it to comply with the law;
                </>,
                <>
                  <B>Withdraw consent:</B> stop using your information for a purpose you consented to. You can withdraw consent at any time by
                  emailing or calling us. Withdrawal does not affect processing already carried out, and we may then be unable to continue with your
                  enquiry or application;
                </>,
                <>
                  <B>Nominate:</B> name another person to exercise these rights on your behalf in the event of your death or incapacity; and
                </>,
                <>
                  <B>Raise a grievance:</B> complain to us about how we have handled your information.
                </>,
              ]}
            />
            <p>
              To exercise any of these rights, contact us using the details below. Please include your name, the phone number or email address you
              used and, if you have it, your enquiry reference number (for example, SI-2026-01001). Requests are handled by our team personally, and
              we may ask you to confirm your identity before acting on a request.
            </p>
          </Section>

          <Section id="children" n={10} title="Children">
            <p>
              Many of our programmes are for students. If you are under 18, please involve your parent or lawful guardian: they should read this
              policy and agree to the privacy notice before a form is submitted for you, or contact us on your behalf. This website does not use
              tracking, behavioural monitoring or targeted advertising. If a parent or guardian believes we hold a child&rsquo;s information
              without their agreement, please contact us and we will delete it.
            </p>
          </Section>

          <Section id="contact" n={11} title="Privacy and grievance contact">
            <p>
              For any question, request or complaint about your personal information, please contact us. We will acknowledge your request and
              respond as soon as reasonably possible, and in any case within 90 days.
            </p>
            <address className="not-italic">
              <div className="rounded-3xl border border-surface-line bg-surface p-6 sm:p-7">
                <p className="font-display text-lg font-bold text-navy-900">{site.name}</p>
                <ul className="mt-4 space-y-3 text-[15px]">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal" aria-hidden />
                    <span>
                      <A href={mailto}>{email}</A> <span className="text-ink-mute">(subject: &ldquo;Privacy request&rdquo;)</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal" aria-hidden />
                    <A href={site.contact.phoneHref}>{site.contact.phone}</A>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal" aria-hidden />
                    <span>{site.contact.addressLines.join(" ")}</span>
                  </li>
                </ul>
              </div>
            </address>
            <p>
              If you are not satisfied with our response, you may also be able to complain to the Data Protection Board of India under the Digital
              Personal Data Protection Act, 2023 and the rules made under it.
            </p>
          </Section>

          <Section id="changes" n={12} title="Changes to this policy">
            <p>
              We may update this policy when our website, services or legal requirements change. The latest version will always be on this page,
              with its effective date shown at the top. If we make significant changes to how we use personal information you have already given
              us, we will take reasonable steps to let you know.
            </p>
            <p>
              Effective date: <B>{effectiveDate}</B>. Questions? <Link href="/contact" className="font-medium text-brand-royal underline underline-offset-2 hover:text-navy-900">Contact us</Link>.
            </p>
          </Section>
        </article>
      </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])} />
    </>
  );
}

# Sarng Infotech — Website

Production website for **Sarng Infotech** — *Powering your digital future*.
Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS**.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 18.18+ (Node 20/22 recommended). Deploys as-is to Vercel, or to any Node host (`npm run build && npm start`).

## Pages

| Route | Content |
|---|---|
| `/` | Hero → Small-batch differentiator → Why Sarng → Courses → Internships → Online Bootcamps → Our Process → For Businesses → About → CTA |
| `/courses` | Filterable catalogue of all 10 courses, bootcamps, learner journey, FAQ |
| `/courses/[slug]` | Static course pages: overview, audience, prerequisites, modules, hands-on, tools, outcomes, duration, mode, certificate, FAQ, enquiry |
| `/internships` | Selection-based internship programme + application form with resume upload |
| `/for-businesses` | Six business services + engagement approach |
| `/about` | Mission, vision, brand philosophy, audiences |
| `/contact` | Contact details, call / email / WhatsApp CTAs, map slot, contact form |

SEO: per-page metadata, Open Graph image (`/opengraph-image`), `sitemap.xml`, `robots.txt`, favicon/apple icon and JSON-LD (EducationalOrganization, Course, FAQPage, BreadcrumbList, Service).

## Editing content (admin-ready)

All content lives in `src/data/` — components never hard-code business content, so these files can later be replaced by a CMS or admin dashboard with the same shape.

| File | What it controls |
|---|---|
| `site.ts` | Name, tagline, phone, email, address, WhatsApp number, map embed, social links, batch size |
| `courses.ts` | Courses, modules, tools, outcomes, FAQs. **`duration: null` shows "To be announced"** — set a string when confirmed |
| `bootcamps.ts` | Online bootcamps |
| `internships.ts` | Internship features, selection steps, disclaimer, form options |
| `services.ts` | Business services and engagement steps |
| `faq.ts` | General and internship FAQs |
| `testimonials.ts` | Empty by default — the section stays hidden until genuine, permission-cleared testimonials are added |

## Placeholders to complete before launch

- **Course durations / fees** — `src/data/courses.ts` (deliberately not invented).
- **Database, email and admin settings** — see *Deploying on Vercel with Neon* below. Until email is configured, enquiries are still saved and marked "Not configured" in the dashboard.
- **WhatsApp number** — confirm `NEXT_PUBLIC_WHATSAPP_NUMBER` is the official WhatsApp Business number. Set it to an empty string to hide all WhatsApp CTAs.
- **Office hours** — `contact.hours`.

## Brand assets

Per *Sarng Infotech Brand Guidelines v1.0*:

- Colours: Deep Navy `#001038`, Royal Blue `#1261EB`, Bright Cyan `#00A5F5`, Aqua Teal `#00B8A0`, Deep Blue Teal `#07577E` (see `tailwind.config.ts`).
- Typeface: **Poppins** (self-hosted via `@fontsource/poppins`, no external font requests).
- Logo files in `public/brand/` are cut from the approved master PNG without redrawing:
  - `sarng-logo.png` — full lockup with tagline (used ≥ 260 px wide, footer)
  - `sarng-logo-notagline.png` — wordmark without tagline (navbar, below the 260 px tagline minimum)
  - `*-white.png` — white wordmark with the original coloured symbol, for dark backgrounds
  - `sarng-symbol.png`, `src/app/icon.png`, `src/app/apple-icon.png` — symbol-only
  - When the traced vector master is ready, replace these files with the same names.
- Hero photo: `public/images/hero-students.jpg` (from the pitch deck). Replace with any photo of the same name.
- Hero slideshow: slides are defined in `src/data/heroSlides.ts`. Slide 1 uses `public/images/hero-students.jpg`. To replace an illustrated slide with a real photo, add a file at its `photo` path — `public/images/slides/programming.jpg`, `data-analytics.jpg`, `ai-cloud.jpg`, `business-solutions.jpg` (landscape, about 1200×1000 px) — and rebuild. No code change needed.

## Enquiry management (forms → database → emails → dashboard)

All four forms (Enquire Now popup, contact form, internship application, project enquiry) post to **`/api/enquiry`**. The endpoint validates every field (and any resume: PDF/DOC/DOCX, max **4 MB** because Vercel limits request bodies to 4.5 MB), blocks bots with a honeypot, and rate-limits both per server instance and via the database. Then:

1. **Saves the enquiry to PostgreSQL** (Neon) with a unique reference such as **`SI-2026-01001`**. Internship resumes are stored in the database.
2. **Emails the team** at `LEAD_NOTIFY_TO` (**info@sarnginfotech.com**) from `MAIL_FROM` (**director@sarnginfotech.com**). The email shows every field in a table, plus the reference, the resume as an attachment and a link to the dashboard. *Reply-To* is the visitor.
3. Optionally forwards the data to `LEAD_WEBHOOK_URL` (Zapier / Make / n8n / CRM).
4. **Sends the visitor an automatic reply** with their reference number and content matched to their enquiry: course, bootcamp, internship, project, business service, college programme or general. The content comes only from the site's own data in `src/data/`.
5. **Records the result of each email** (Sent / Failed / Not configured, with the error message).
6. Shows the visitor a success message with their reference number.

An enquiry is **never lost because of email**: it is saved first, and failed emails can be resent from the dashboard. If the database itself is unreachable, the team email is sent as a backup and is marked **[NOT SAVED]**. The visitor sees an error only if both the database and the email fail.

Code: `src/app/api/enquiry/route.ts` → `src/lib/enquiry-workflow.ts` (workflow) → `src/lib/enquiry-store.ts` (database) and `src/lib/lead-handlers.ts` (SMTP / webhook) → `src/lib/email-templates.ts`.

### Admin dashboard — `/admin`

Password-protected (`ADMIN_PASSWORD`). Sessions are signed cookies (`ADMIN_SESSION_SECRET`) that expire after 12 hours. After 5 wrong passwords in 15 minutes, logins from that address are blocked for 15 minutes.

- List of all enquiries, newest first, with search (name, email, phone, reference, course, college, message)
- Filters by status, by type, and for **email issues**
- Full enquiry details, the delivery log and an activity trail
- Status changes: **New → Contacted → Follow-up → Enrolled / Closed**
- Internal notes (never sent to the visitor)
- Resend the team notification or the auto-reply
- View or download internship resumes (admins only)
- **Export to CSV** using the current filters (opens correctly in Excel)

### Deploying on Vercel with Neon

1. In Vercel, open the project → **Storage** → **Connect Database** → **Neon** (or add the Neon integration). This sets `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct) automatically.
2. Add the environment variables below in **Project → Settings → Environment Variables**, for Production (and Preview if you use it).
3. Deploy. The `vercel-build` script runs `prisma generate`, then `prisma migrate deploy` (which creates or updates the tables), then `next build`.
4. Open `https://<your-domain>/admin`, log in, then submit a test enquiry on the site. Check that it appears in the dashboard and that both emails arrive.

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string (set by the integration) |
| `DATABASE_URL_UNPOOLED` | Neon direct connection string (set by the integration; used for migrations) |
| `SMTP_HOST` | `smtpout.secureserver.net` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `director@sarnginfotech.com` |
| `SMTP_PASS` | director@ mailbox password — **set only in Vercel, never commit it** |
| `MAIL_FROM` | `Sarng Infotech <director@sarnginfotech.com>` (must be the SMTP_USER mailbox) |
| `LEAD_NOTIFY_TO` | `info@sarnginfotech.com` |
| `ADMIN_PASSWORD` | a strong password for `/admin` |
| `ADMIN_SESSION_SECRET` | a random string of at least 32 characters (e.g. `openssl rand -base64 48`) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.sarnginfotech.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `918438653708` |
| `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_TOKEN` | optional |

For good inbox delivery, make sure the domain's **SPF, DKIM and DMARC** records for GoDaddy email are set (GoDaddy DNS → Email records).

**Local development:** set `DATABASE_URL` and `DATABASE_URL_UNPOOLED` to any PostgreSQL database, then run `npm run db:migrate`. To test without sending real email, run with `MAIL_TRANSPORT=json`: each email is printed to the server log instead.

## Content rules followed

No invented student numbers, placement rates, clients, reviews, salaries, affiliations, accreditations, awards, trainer credentials, prices or durations. Internships are presented as selection-based, not offered in exchange for payment, and without employment guarantees. No "Projects" navigation or project promotion.

## Structure

```
src/
  app/            routes, layout, SEO routes, /api/enquiry
  components/     Navbar, Hero, Differentiator, WhySarng, CourseCard, CourseGrid,
                  InternshipSection, InternshipForm, BootcampSection, ProcessSection,
                  LearnerJourney, BusinessServices, AudienceCards, AboutPreview,
                  Testimonials, FAQ, ContactForm, EnquiryModal, CTASection,
                  PageHero, Footer, WhatsAppButton, ui/*
  data/           editable content
  lib/            lead model & handlers, SEO helpers, utilities
public/brand      logo files
public/images     photography
```

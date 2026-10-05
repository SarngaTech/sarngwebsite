import "server-only";
import { site } from "@/data/site";
import { courses } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { services } from "@/data/services";
import { internship } from "@/data/internships";
import { projects } from "@/data/projects";
import type { LeadPayload } from "./leads";

/**
 * Email templates for lead notifications (to Sarng) and auto-replies (to the person).
 * Plain inline-styled HTML tables so they render consistently in Gmail, Outlook and phone mail apps.
 */

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/** Extra context added once an enquiry is saved. */
export interface EmailMeta {
  /** Unique enquiry reference, e.g. SI-2026-01001 */
  reference?: string;
  /** Link to the enquiry in the admin dashboard (team email only) */
  adminUrl?: string;
  /** false when the database was unavailable and this email is the only record */
  saved?: boolean;
}

const TYPE_NAME: Record<LeadPayload["type"], string> = {
  enquiry: "Enquiry (Enquire Now form)",
  contact: "Contact form",
  internship: "Internship application",
  project: "Project enquiry",
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const NAVY = "#001038";
const ROYAL = "#1261EB";
const MUTED = "#5B6B85";
const LINE = "#E3E8F0";
const BG = "#F5F7FA";

const social = Object.fromEntries(site.social.map((s) => [s.label, s.href]));

function layout(title: string, bodyHtml: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${BG};font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${LINE};">
<tr><td style="background:${NAVY};padding:22px 28px;">
  <img src="${site.url}/brand/sarng-logo-white.png" alt="${esc(site.name)}" width="190" style="display:block;border:0;max-width:190px;height:auto;">
</td></tr>
<tr><td style="padding:28px 28px 8px 28px;font-size:15px;line-height:1.6;">${bodyHtml}</td></tr>
<tr><td style="padding:8px 28px 28px 28px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE};padding-top:16px;font-size:13px;color:${MUTED};line-height:1.7;">
  <tr><td>
    <strong style="color:${NAVY};">${esc(site.name)}</strong> &middot; ${esc(site.tagline)}<br>
    Phone / WhatsApp: <a href="${site.contact.phoneHref}" style="color:${ROYAL};text-decoration:none;">${esc(site.contact.phone)}</a><br>
    Email: <a href="mailto:${site.contact.email}" style="color:${ROYAL};text-decoration:none;">${esc(site.contact.email)}</a><br>
    Address: <a href="${site.contact.mapLink}" style="color:${ROYAL};text-decoration:none;">${esc(site.contact.addressLines.join(" "))}</a><br>
    <a href="${social.Instagram}" style="color:${ROYAL};text-decoration:none;">Instagram</a> &middot;
    <a href="${social.Facebook}" style="color:${ROYAL};text-decoration:none;">Facebook</a> &middot;
    <a href="${social.LinkedIn}" style="color:${ROYAL};text-decoration:none;">LinkedIn</a> &middot;
    <a href="${site.url}" style="color:${ROYAL};text-decoration:none;">${esc(site.displayUrl)}</a>
  </td></tr></table>
</td></tr>
</table></td></tr></table></body></html>`;
}

const h = (t: string) => `<h2 style="margin:22px 0 8px 0;font-size:17px;color:${NAVY};">${esc(t)}</h2>`;
const p = (t: string) => `<p style="margin:0 0 12px 0;">${t}</p>`;
const ul = (items: string[]) =>
  `<ul style="margin:0 0 12px 0;padding-left:20px;">${items.map((i) => `<li style="margin:0 0 6px 0;">${esc(i)}</li>`).join("")}</ul>`;
const ol = (items: string[]) =>
  `<ol style="margin:0 0 12px 0;padding-left:20px;">${items.map((i) => `<li style="margin:0 0 6px 0;">${i}</li>`).join("")}</ol>`;
const button = (label: string, href: string) =>
  `<p style="margin:18px 0;"><a href="${href}" style="display:inline-block;background:${ROYAL};color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px;">${esc(label)}</a></p>`;

const firstName = (name: string) => esc((name || "").trim().split(/\s+/)[0] || "there");

/** Section describing what the person asked about, matched to site content. */
function interestSection(lead: LeadPayload): { html: string; text: string; label: string } {
  const interest = (lead.interest || "").trim();

  if (lead.type === "internship" || interest === "Internship") {
    const steps = internship.steps.map((s) => `<strong>${esc(s.title)}</strong> &mdash; ${esc(s.text)}`);
    const tech = lead.technology ? p(`Track you applied for: <strong>${esc(lead.technology)}</strong>${lead.skillLevel ? ` (${esc(lead.skillLevel)})` : ""}.`) : "";
    return {
      label: "Internship",
      html:
        h("What happens next") +
        tech +
        p(esc(internship.intro)) +
        ol(steps) +
        h("How to prepare") +
        ul(["Revise the fundamentals of your chosen technology", "Practise basic aptitude and logical reasoning questions", "Keep your resume and college details ready"]) +
        p(`<em style="color:${MUTED};">${esc(internship.disclaimer)}</em>`) +
        button("Read about our internships", `${site.url}/internships`),
      text:
        `What happens next:\n${internship.steps.map((s, i) => `${i + 1}. ${s.title} - ${s.text}`).join("\n")}\n\n` +
        `${internship.disclaimer}\nMore: ${site.url}/internships`,
    };
  }

  if (lead.type === "project" || interest === "Student Project") {
    const steps = projects.steps.map((s) => `<strong>${esc(s.title)}</strong> &mdash; ${esc(s.text)}`);
    const picked = [lead.projectType && `Project type: <strong>${esc(lead.projectType)}</strong>`, lead.technology && `Technology: <strong>${esc(lead.technology)}</strong>`]
      .filter(Boolean)
      .join("<br>");
    return {
      label: lead.projectType ? `${lead.projectType}${lead.technology ? ` (${lead.technology})` : ""}` : "Student Project",
      html:
        h("About our student projects") +
        (picked ? p(picked) : "") +
        p(esc(projects.intro)) +
        p("<strong>How we support you:</strong>") +
        ul(projects.support.map((s) => s.title)) +
        h("What happens next") +
        ol(steps) +
        h("To help us prepare, please reply with") +
        ul(["Your project idea or the topic list given by your college (if any)", "Your college's project guidelines and submission dates", "The technologies you already know"]) +
        p(`<em style="color:${MUTED};">${esc(projects.note)}</em>`) +
        button("Read about student projects", `${site.url}/projects`),
      text:
        `About our student projects\n${lead.projectType ? `Project type: ${lead.projectType}\n` : ""}${lead.technology ? `Technology: ${lead.technology}\n` : ""}${projects.intro}\n\n` +
        `What happens next:\n${projects.steps.map((s, i) => `${i + 1}. ${s.title} - ${s.text}`).join("\n")}\n\n` +
        `Please reply with your project idea, your college's guidelines and dates, and the technologies you know.\n${projects.note}\nMore: ${site.url}/projects`,
    };
  }

  const bootcamp = bootcamps.find((b) => interest.startsWith(b.title));
  if (bootcamp) {
    return {
      label: `${bootcamp.title} (Online Bootcamp)`,
      html:
        h(`About the ${bootcamp.title} online bootcamp`) +
        p(esc(bootcamp.summary)) +
        p("<strong>You will cover:</strong>") +
        ul(bootcamp.covers) +
        p(`It is ${bootcamp.tags.map((t) => t.toLowerCase()).join(", ")}. <strong>Batches:</strong> ${esc(site.batches.note)}${lead.batch ? ` (you chose: ${esc(lead.batch)})` : ""}.`) +
        p("Our team will share the next batch date, timings and fee with you.") +
        button("See the full course", `${site.url}/courses/${bootcamp.relatedCourse}`),
      text: `${bootcamp.title} online bootcamp: ${bootcamp.summary}\nYou will cover: ${bootcamp.covers.join("; ")}\nMore: ${site.url}/courses/${bootcamp.relatedCourse}`,
    };
  }

  const course = courses.find((c) => c.title === interest);
  if (course) {
    return {
      label: course.title,
      html:
        h(`About ${course.title}`) +
        p(`${esc(course.subtitle)}. ${esc(course.short)}`) +
        p("<strong>What you will learn:</strong>") +
        ul(course.learn.slice(0, 6)) +
        p(`<strong>Training mode:</strong> ${esc(course.modes.join(" / "))}<br><strong>Batches:</strong> ${esc(site.batches.note)}${lead.batch ? ` (you chose: ${esc(lead.batch)})` : ""}<br><strong>Certificate:</strong> Completion certificate after the programme requirements are met.`) +
        p("Our team will share the upcoming batch schedule, duration and fee details with you.") +
        button(`View the ${course.title} course`, `${site.url}/courses/${course.slug}`),
      text:
        `${course.title} - ${course.subtitle}\n${course.short}\nWhat you will learn:\n- ${course.learn.slice(0, 6).join("\n- ")}\n` +
        `Mode: ${course.modes.join(" / ")}\nBatches: ${site.batches.note}${lead.batch ? ` (you chose: ${lead.batch})` : ""}\nMore: ${site.url}/courses/${course.slug}`,
    };
  }

  const service = services.find((s) => interest === `Business: ${s.title}`);
  if (service) {
    return {
      label: service.title,
      html:
        h(`About our ${service.title} service`) +
        p(esc(service.text)) +
        p(`<strong>How it helps:</strong> ${esc(service.benefit)}`) +
        h("To help us prepare, please reply with") +
        ul(["A short description of your requirement or the problem to solve", "Any existing website, system or data sources involved", "Your preferred timeline and a convenient time for a call"]) +
        button("See our business services", `${site.url}/for-businesses`),
      text: `${service.title}: ${service.text}\nHow it helps: ${service.benefit}\nPlease reply with your requirement, existing systems and timeline.\nMore: ${site.url}/for-businesses`,
    };
  }

  if (interest === "College Training Programme" || lead.persona === "College") {
    return {
      label: "College Training Programme",
      html:
        h("Training programmes for colleges") +
        p("We plan practical technology training for colleges, including courses, online bootcamps and selection-based internships that support student employability.") +
        h("To help us prepare, please reply with") +
        ul(["Your college name and department(s)", "Number of students and year of study", "Technologies of interest and preferred dates or format"]) +
        button("Explore our courses", `${site.url}/courses`),
      text: "Training programmes for colleges. Please reply with your college, departments, number of students, technologies and preferred dates.",
    };
  }

  return {
    label: interest || "General enquiry",
    html:
      p("Our team will review your message and get back to you with the right information.") +
      p("In the meantime, you can explore our courses, online bootcamps and internships:") +
      button("Explore courses", `${site.url}/courses`),
    text: `Our team will review your message and get back to you. Explore courses: ${site.url}/courses`,
  };
}

/** Auto-reply sent to the person who submitted the form. */
export function autoReplyEmail(lead: LeadPayload, meta: EmailMeta = {}): EmailContent {
  const sec = interestSection(lead);
  const isIntern = lead.type === "internship";
  const refTag = meta.reference ? ` [Ref: ${meta.reference}]` : "";
  const subject = isIntern
    ? `We have received your internship application${refTag} | ${site.name}`
    : `Thank you for your enquiry: ${sec.label}${refTag} | ${site.name}`;
  const refHtml = meta.reference
    ? `<p style="margin:0 0 14px 0;padding:10px 14px;background:${BG};border:1px solid ${LINE};border-radius:10px;">Your reference number: <strong style="color:${ROYAL};">${esc(meta.reference)}</strong><br><span style="font-size:13px;color:${MUTED};">Please mention it when you contact us about this ${isIntern ? "application" : "enquiry"}.</span></p>`
    : "";
  const opener = isIntern
    ? p(`Thank you for applying for an internship with <strong>${esc(site.name)}</strong>. We have received your application and our team will review it.`)
    : p(`Thank you for contacting <strong>${esc(site.name)}</strong>. We have received your enquiry about <strong>${esc(sec.label)}</strong> and our team will contact you shortly.`);

  const html = layout(
    subject,
    p(`Dear ${firstName(lead.name)},`) +
      opener +
      refHtml +
      sec.html +
      h("Need a quick answer?") +
      p(`Call or WhatsApp us on <a href="${site.contact.phoneHref}" style="color:${ROYAL};">${esc(site.contact.phone)}</a>, or simply reply to this email.`) +
      p(`Warm regards,<br><strong>Team ${esc(site.name)}</strong><br><span style="color:${MUTED};">${esc(site.mottoLong)}</span>`),
  );

  const text =
    `Dear ${(lead.name || "").split(" ")[0] || "there"},\n\n` +
    (isIntern
      ? `Thank you for applying for an internship with ${site.name}. We have received your application and our team will review it.\n\n`
      : `Thank you for contacting ${site.name}. We have received your enquiry about ${sec.label} and our team will contact you shortly.\n\n`) +
    (meta.reference ? `Your reference number: ${meta.reference}\n\n` : "") +
    `${sec.text}\n\nCall or WhatsApp: ${site.contact.phone}\nEmail: ${site.contact.email}\n\nWarm regards,\nTeam ${site.name}\n${site.url}`;

  return { subject, html, text };
}

const TYPE_LABEL: Record<LeadPayload["type"], string> = {
  enquiry: "New Enquiry",
  contact: "New Contact Form Message",
  internship: "New Internship Application",
  project: "New Project Enquiry",
};

/** Notification sent to Sarng Infotech with every field the person submitted. */
export function notificationEmail(lead: LeadPayload & { receivedAt: string }, resumeName?: string, meta: EmailMeta = {}): EmailContent {
  const rows: [string, string | undefined][] = [
    ["Reference", meta.reference],
    ["Enquiry type", TYPE_NAME[lead.type]],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["I am a", lead.persona],
    ["Interested in", lead.interest],
    ["College", lead.college],
    ["Degree", lead.degree],
    ["Year of study", lead.year],
    ["Preferred batch", lead.batch],
    ["Project type", lead.projectType],
    ["Technology", lead.technology],
    ["Skill level", lead.skillLevel],
    ["Message", lead.message],
    ["Resume", resumeName ? `${resumeName} (attached)` : undefined],
    ["Submitted from", lead.source ? `${site.url}${lead.source}` : undefined],
    ["Received at", new Date(lead.receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"],
  ];
  const filled = rows.filter(([, v]) => v && String(v).trim());
  const label = TYPE_LABEL[lead.type];
  const projectTopic = [lead.projectType, lead.technology].filter(Boolean).join(" - ");
  const topic = lead.type === "project" && projectTopic ? projectTopic : lead.interest || projectTopic;
  const subject = `${meta.saved === false ? "[NOT SAVED] " : ""}[${label}]${meta.reference ? ` ${meta.reference}` : ""} ${lead.name}${topic ? ` | ${topic}` : ""}`;

  const table =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">` +
    filled
      .map(
        ([k, v]) =>
          `<tr><td style="padding:9px 12px;border:1px solid ${LINE};background:${BG};width:34%;font-weight:bold;vertical-align:top;">${esc(k)}</td>` +
          `<td style="padding:9px 12px;border:1px solid ${LINE};vertical-align:top;white-space:pre-wrap;">${esc(v)}</td></tr>`,
      )
      .join("") +
    `</table>`;

  const html = layout(
    subject,
    `<p style="margin:0 0 6px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${ROYAL};font-weight:bold;">${esc(label)}</p>` +
      `<h1 style="margin:0 0 16px 0;font-size:22px;color:${NAVY};">${esc(lead.name)}</h1>` +
      table +
      (meta.saved === false
        ? p(`<br><strong style="color:#B42318;">The enquiry database was unavailable, so this enquiry was NOT saved to the dashboard.</strong> Please keep this email as the record.`)
        : "") +
      p(`<br>Reply to this email to respond directly to ${esc(lead.name)}. An automatic acknowledgement is sent to them separately.`) +
      button(`Call ${lead.phone}`, `tel:${String(lead.phone).replace(/[^\d+]/g, "")}`) +
      (meta.adminUrl ? `<p style="margin:0 0 12px 0;"><a href="${esc(meta.adminUrl)}" style="color:${ROYAL};font-weight:bold;">Open this enquiry in the dashboard &rarr;</a></p>` : ""),
  );
  const text =
    `${label}\n\n${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}` +
    (meta.saved === false ? "\n\nNOTE: the enquiry database was unavailable; this enquiry was NOT saved to the dashboard." : "") +
    (meta.adminUrl ? `\n\nDashboard: ${meta.adminUrl}` : "");
  return { subject, html, text };
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { buildWhere, parseFilters } from "@/lib/admin-queries";
import { EMAIL_STATUS_LABEL, STATUS_LABEL, TYPE_LABEL } from "@/lib/enquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Escape a CSV cell and neutralise spreadsheet formula injection (=, +, -, @ at the start). */
function cell(v: unknown) {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const fmt = (d: Date) => d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  const sp = Object.fromEntries(new URL(req.url).searchParams);
  const where = buildWhere(parseFilters(sp));

  const rows = await db().enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 10_000,
    include: {
      resume: { select: { fileName: true } },
      notes: { orderBy: { createdAt: "asc" }, select: { body: true, author: true, createdAt: true } },
    },
  });

  const header = [
    "Reference", "Received (IST)", "Type", "Status", "Name", "Email", "Phone", "I am a", "Interested in",
    "Preferred batch", "College", "Degree", "Year", "Project type", "Technology", "Skill level", "Message",
    "Resume", "Team email", "Auto-reply", "Submitted from", "Notes",
  ];
  const lines = rows.map((e) =>
    [
      e.reference, fmt(e.createdAt), TYPE_LABEL[e.type], STATUS_LABEL[e.status], e.name, e.email, e.phone, e.persona,
      e.interest, e.batch, e.college, e.degree, e.year, e.projectType, e.technology, e.skillLevel, e.message,
      e.resume?.fileName, EMAIL_STATUS_LABEL[e.notificationStatus], EMAIL_STATUS_LABEL[e.autoReplyStatus], e.source,
      e.notes.map((n) => `[${fmt(n.createdAt)}${n.author ? ` ${n.author}` : ""}] ${n.body}`).join(" | "),
    ]
      .map(cell)
      .join(","),
  );
  // BOM so Excel opens UTF-8 correctly
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sarng-enquiries-${stamp}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}

import "server-only";
import type { EnquiryStatus, EnquiryType, Prisma } from "@prisma/client";
import { STATUS_FLOW } from "./enquiry-store";

/** Shared search/filter logic for the dashboard list and CSV export. */
export interface EnquiryFilters {
  q?: string;
  type?: EnquiryType;
  status?: EnquiryStatus;
  /** "issues" = any email failed or not configured */
  email?: "issues";
  page: number;
}

const TYPES: EnquiryType[] = ["ENQUIRY", "CONTACT", "INTERNSHIP", "PROJECT"];

export function parseFilters(sp: Record<string, string | string[] | undefined>): EnquiryFilters {
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  };
  const type = one("type") as EnquiryType | undefined;
  const status = one("status") as EnquiryStatus | undefined;
  const page = Math.max(1, Number.parseInt(one("page") || "1", 10) || 1);
  return {
    q: one("q")?.slice(0, 100),
    type: type && TYPES.includes(type) ? type : undefined,
    status: status && STATUS_FLOW.includes(status) ? status : undefined,
    email: one("email") === "issues" ? "issues" : undefined,
    page,
  };
}

export function buildWhere(f: EnquiryFilters): Prisma.EnquiryWhereInput {
  const and: Prisma.EnquiryWhereInput[] = [];
  if (f.type) and.push({ type: f.type });
  if (f.status) and.push({ status: f.status });
  if (f.email === "issues") {
    and.push({
      OR: [{ notificationStatus: { in: ["FAILED", "SKIPPED"] } }, { autoReplyStatus: { in: ["FAILED", "SKIPPED"] } }],
    });
  }
  if (f.q) {
    const contains = { contains: f.q, mode: "insensitive" as const };
    and.push({
      OR: [
        { reference: contains },
        { name: contains },
        { email: contains },
        { phone: contains },
        { interest: contains },
        { college: contains },
        { technology: contains },
        { message: contains },
      ],
    });
  }
  return and.length ? { AND: and } : {};
}

/** Query string for links that keep the current filters. */
export function filterQuery(f: Partial<EnquiryFilters>, overrides: Partial<Record<keyof EnquiryFilters, string | number | undefined>> = {}) {
  const params = new URLSearchParams();
  const merged: Record<string, string | number | undefined> = { q: f.q, type: f.type, status: f.status, email: f.email, page: f.page, ...overrides };
  for (const [k, v] of Object.entries(merged)) {
    if (v === undefined || v === "" || (k === "page" && Number(v) <= 1)) continue;
    params.set(k, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

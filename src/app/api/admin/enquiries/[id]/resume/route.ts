import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/** Serves an internship resume to logged-in admins only. PDFs can be viewed inline; everything else downloads. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  const { id } = await params;
  const file = await db().enquiryFile.findUnique({ where: { enquiryId: id } });
  if (!file) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const type = ALLOWED.has(file.mimeType) ? file.mimeType : "application/octet-stream";
  const download = new URL(req.url).searchParams.has("download") || type !== "application/pdf";
  const safeName = file.fileName.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "resume";

  return new NextResponse(Buffer.from(file.data), {
    headers: {
      "Content-Type": type,
      "Content-Length": String(file.data.byteLength),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(file.fileName)}`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "sandbox",
      "Cache-Control": "private, no-store",
    },
  });
}

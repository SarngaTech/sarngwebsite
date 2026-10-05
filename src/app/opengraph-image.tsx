import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Sarng Infotech — Powering your digital future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const logo = fs.readFileSync(path.join(process.cwd(), "public/brand/sarng-logo-white.png")).toString("base64");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#000A26 0%,#001038 55%,#07577E 100%)", color: "white", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo}`} width={420} height={134} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Learn. Build. Grow.</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#00A5F5" }}>with Real Skills.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#CBD5E1" }}>Technology Training • Internships • Online Bootcamps • Business Solutions</div>
      </div>
    ),
    size,
  );
}

// Builds a static, fully clickable preview of the site into ./out
// (no API routes; forms simulate a successful submission).
import { cpSync, rmSync, mkdtempSync, existsSync, mkdirSync, renameSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const root = process.cwd();
const work = mkdtempSync(path.join(tmpdir(), "sarng-preview-"));
cpSync(root, work, { recursive: true, filter: (src) => !/[\\/](node_modules|\.next|out)([\\/]|$)/.test(src.slice(root.length)) });
rmSync(path.join(work, "src/app/api"), { recursive: true, force: true });
rmSync(path.join(work, "src/app/admin"), { recursive: true, force: true }); // dashboard needs a server
rmSync(path.join(work, "src/middleware.ts"), { force: true });
rmSync(path.join(work, "src/app/opengraph-image.tsx"), { force: true });
execSync(`ln -s ${path.join(root, "node_modules")} ${path.join(work, "node_modules")}`);
execSync("npx next build", { cwd: work, stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_STATIC_PREVIEW: "1", NEXT_TELEMETRY_DISABLED: "1" } });
rmSync(path.join(root, "out"), { recursive: true, force: true });
cpSync(path.join(work, "out"), path.join(root, "out"), { recursive: true });
// assetPrefix "/assets" — move Next's static files to match (some static hosts reserve "_"-prefixed folders)
mkdirSync(path.join(root, "out/assets"), { recursive: true });
renameSync(path.join(root, "out/_next"), path.join(root, "out/assets/_next"));
rmSync(work, { recursive: true, force: true });
// Escape literal U+FFFD characters in JS (some hosts reject them); they only occur inside string literals.
for (const f of walk(path.join(root, "out"))) {
  if (!f.endsWith(".js")) continue;
  const src = readFileSync(f, "utf8");
  if (src.includes("\uFFFD")) writeFileSync(f, src.replaceAll("\uFFFD", "\\ufffd"));
}
function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}
console.log(existsSync(path.join(root, "out/index.html")) ? "Preview ready in ./out" : "Preview build failed");

const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], unoptimized: isStaticPreview },
  // Prisma's engine-free client (engineType = "client") loads its query compiler at runtime with
  // fs.readFileSync(path.join(dirname, "query_compiler_bg.wasm")). Next.js output tracing cannot follow a
  // path built at runtime, so the .wasm was left out of the Vercel functions (ENOENT in /admin/health).
  // Ship it explicitly with every route that uses the database (/admin pages + actions, /api routes).
  outputFileTracingIncludes: {
    "/admin": ["./node_modules/.prisma/client/query_compiler_bg.wasm"],
    "/admin/**": ["./node_modules/.prisma/client/query_compiler_bg.wasm"],
    "/api/**": ["./node_modules/.prisma/client/query_compiler_bg.wasm"],
  },
  // `npm run build:preview` produces a static, clickable demo in /out (forms simulate success).
  ...(isStaticPreview ? { output: "export", trailingSlash: true, assetPrefix: "/assets" } : {}),
};
export default nextConfig;

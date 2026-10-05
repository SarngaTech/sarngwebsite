const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], unoptimized: isStaticPreview },
  // `npm run build:preview` produces a static, clickable demo in /out (forms simulate success).
  ...(isStaticPreview ? { output: "export", trailingSlash: true, assetPrefix: "/assets" } : {}),
};
export default nextConfig;

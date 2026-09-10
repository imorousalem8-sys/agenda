import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable dev indicators overlay in development
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // High-performance modern image formats
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Cache-Control & PWA headers
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
        ],
      },
    ];
  },
};

export default nextConfig;

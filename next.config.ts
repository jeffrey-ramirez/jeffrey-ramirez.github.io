import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages. Data (e.g. GitHub activity) is fetched at build time.
  output: "export",
  // GitHub Pages has no image optimization server; screenshots are pre-sized WebP.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

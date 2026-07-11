import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  pageExtensions:
    process.env.NODE_ENV === "production"
      ? ["tsx"] // Excludes .ts API routes in static build
      : ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
  pageExtensions:
    process.env.NODE_ENV === "production"
      ? ["tsx"]
      : ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;
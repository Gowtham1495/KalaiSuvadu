import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  basePath: isGithubPages ? "/KalaiSuvadu" : "",
  assetPrefix: isGithubPages ? "/KalaiSuvadu/" : "",
  images: {
    unoptimized: true,
  },
  pageExtensions:
    process.env.NODE_ENV === "production"
      ? ["tsx"]
      : ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;
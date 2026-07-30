import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPagesBuild ? "/miliai-personal-prototype" : "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. Keep the production repository path
  // isolated from local development so `npm run dev` continues to use `/`.
  // `output: "export"` requires every catch-all path during `next dev` too,
  // which prevents directly opening valid learning/detail URLs locally.
  // Keep the static export for production (including GitHub Pages), while
  // allowing the local prototype to resolve its portal routes normally.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

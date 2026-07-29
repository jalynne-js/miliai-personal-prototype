import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPagesBuild ? "/miliai-personal-prototype" : "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files. Keep the production repository path
  // isolated from local development so `npm run dev` continues to use `/`.
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: '/:path*.png',
        destination: '/:path*.webp',
      },
      {
        source: '/:path*.jpg',
        destination: '/:path*.webp',
      },
      {
        source: '/:path*.jpeg',
        destination: '/:path*.webp',
      },
    ];
  },
};

export default nextConfig;


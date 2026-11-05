import { existsSync } from "node:fs";

// Next.js doesn't load .env.local on its own, so load it here (before NEXT_PUBLIC_* vars are inlined).
if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.barca.group",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  productionBrowserSourceMaps: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization.minimize = false;
    }
    return config;
  },
};

export default nextConfig;

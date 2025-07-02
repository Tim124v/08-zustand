import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimization
  experimental: {
    optimizePackageImports: ["@tanstack/react-query"],
  },

  // Compression
  compress: true,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
  },

  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;

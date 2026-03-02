import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      }
    ],
  },

  compress: true,
  poweredByHeader: false,

  serverExternalPackages: ["mongoose", "bcryptjs", "jsonwebtoken"],

  experimental: {
    serverComponentsHmrCache: false,
  },

  staticPageGenerationTimeout: 120,

  reactStrictMode: true,

  trailingSlash: false,

  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;

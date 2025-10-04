import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.recipetineats.com",
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async redirects() {
    return [
      { source: "/assessment", destination: "/questionnaire", permanent: true },
      { source: "/dashboard", destination: "/results", permanent: true },
    ];
  },
};

export default nextConfig;

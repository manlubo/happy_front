import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "file.gitbaby.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

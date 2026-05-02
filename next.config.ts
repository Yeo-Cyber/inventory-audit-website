import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mjdcxpmtmxmcjgrnjdrc.supabase.co",
        pathname: "/storage/v1/object/public/cms-media/**",
      },
    ],
  },
};

export default nextConfig;

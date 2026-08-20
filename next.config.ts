import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Blocks the site (including /admin) from being embedded in an
          // iframe on another site — closes off clickjacking attacks.
          { key: "X-Frame-Options", value: "DENY" },
          // Stops browsers from guessing ("sniffing") a response's content
          // type, which can otherwise be abused to execute disguised files.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Sends the full referrer to our own pages, but only the origin
          // (not the full path/query) to other sites — avoids leaking
          // internal URLs while keeping normal analytics useful.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site never uses these browser APIs, so explicitly deny them.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

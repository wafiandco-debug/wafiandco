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
      {
        // robots.txt disallows /admin/ from being crawled, but Google's own
        // guidance is that disallow alone doesn't guarantee a URL stays out
        // of search results — a page can still surface as a bare link if
        // discovered another way, since blocking crawling also blocks
        // Google from seeing there's nothing worth indexing. This header is
        // the authoritative signal, independent of robots.txt.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;

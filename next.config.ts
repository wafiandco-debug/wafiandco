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
  async redirects() {
    return [
      // These three slugs belonged to the old hardcoded fallback-article
      // system (src/lib/insights.ts) removed once real Supabase-backed
      // articles existed. Google still has itr-filing-checklist and
      // why-a-virtual-cfo indexed (confirmed via a live site: search) —
      // they currently 404, so anyone clicking through from search hits a
      // dead end. Redirecting to genuinely relevant live content instead
      // of leaving them as 404 also signals Google to drop the old URLs
      // faster than waiting out repeated 404 crawls.
      {
        source: "/insights/itr-filing-checklist",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/insights/why-a-virtual-cfo",
        destination: "/insights/data-analytics-accounting-compliance-to-strategy",
        permanent: true,
      },
      {
        source: "/insights/gst-return-due-dates",
        destination: "/insights",
        permanent: true,
      },
    ];
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
          // Restricts which origins scripts, styles, images, fonts, frames,
          // and network requests can load from — the main defense if a
          // script ever got injected somewhere (e.g. rich-text article
          // content). 'unsafe-inline' on script-src is needed for Next.js's
          // hydration/JSON-LD inline scripts and the GA snippet; connect-src
          // and frame-src stay locked to the specific third parties the site
          // actually talks to (Supabase, GA, the Maps embed), so even with
          // inline scripts permitted, exfiltration/embedding targets are
          // limited to that allowlist.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.supabase.co",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
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

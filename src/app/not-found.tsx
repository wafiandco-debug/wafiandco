import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found | " + siteConfig.name,
  description: "The page you're looking for doesn't exist or may have moved.",
  // Next.js always injects its own <meta name="robots" content="noindex">
  // on a 404 response, on top of whatever we set here — so this page
  // always ends up with two robots tags no matter what. Explicitly setting
  // noindex here (rather than leaving it unset, which inherits the root
  // layout's "index, follow") at least keeps both tags in agreement
  // instead of directly contradicting each other.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-banner text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
      <div className="gradient-blob absolute -top-20 -right-16 h-72 w-72 rounded-full bg-saffron/20" />
      <div className="gradient-blob absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gold/15" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          We couldn&apos;t find{" "}
          <span className="text-gradient-brand">that page.</span>
        </h1>
        <p className="text-body mt-6 max-w-lg text-lg text-white/80">
          The page you&apos;re looking for may have been moved, renamed, or
          no longer exists. Here are a few places to pick up from.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-7 py-3 text-sm font-semibold text-navy shadow-md transition-[background-position,transform] duration-300 hover:bg-right hover:-translate-y-0.5"
          >
            Go to Homepage
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Browse Services
          </Link>
          <Link
            href="/insights"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Read Insights
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

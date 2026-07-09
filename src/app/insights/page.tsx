import type { Metadata } from "next";
import Link from "next/link";
import { getInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Insights | " + siteConfig.name,
  description:
    "Articles and updates on audit, tax, GST, and accounting from WAFI & CO., Chartered Accountants.",
  alternates: { canonical: `${siteConfig.url}/insights` },
  openGraph: {
    title: "Insights | " + siteConfig.name,
    description:
      "Articles and updates on audit, tax, GST, and accounting from WAFI & CO., Chartered Accountants.",
    url: `${siteConfig.url}/insights`,
    type: "website",
  },
};

export const revalidate = 60;

const tagGradients = [
  "text-gradient-saffron",
  "text-gradient-gold",
  "text-gradient-navy",
];

export default async function InsightsPage() {
  const insights = await getInsights();
  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-20 -right-16 h-72 w-72 rounded-full bg-gold/15" />
        <div className="gradient-blob absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-saffron/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Insights
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Notes on tax, compliance, and{" "}
            <span className="text-gradient-brand">running a healthier business.</span>
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {insights.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 80}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="card-glass group block h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${tagGradients[i % tagGradients.length]}`}
                  >
                    {post.category}
                  </span>
                  <h2 className="mt-3 font-serif text-xl text-navy transition-colors group-hover:text-saffron">
                    {post.title}
                  </h2>
                  <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-navy/50">
                    {post.author_name && (
                      <>
                        <span className="font-medium text-navy/70">
                          {post.author_name}
                          {post.author_position ? `, ${post.author_position}` : ""}
                        </span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <time>
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-banner px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="gradient-blob absolute -top-16 left-1/3 h-56 w-56 rounded-full bg-saffron/30" />
          <h2 className="relative font-serif text-3xl">
            Have a question about your finances?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Get in touch for advice specific to your business or personal
            tax situation.
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-block rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-8 py-3 text-sm font-semibold text-navy shadow-md transition-[background-position,transform] duration-300 hover:bg-right hover:-translate-y-0.5"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}

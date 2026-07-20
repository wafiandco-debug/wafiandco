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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | " + siteConfig.name,
    description:
      "Articles and updates on audit, tax, GST, and accounting from WAFI & CO., Chartered Accountants.",
    images: ["/og-image.jpg"],
  },
};

export const revalidate = 60;

const tagGradients = [
  "text-gradient-saffron",
  "text-gradient-gold",
  "text-gradient-navy",
];

const PER_PAGE = 5;

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allInsights = await getInsights();

  const totalPages = Math.max(1, Math.ceil(allInsights.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const insights = allInsights.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-6">
            {insights.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 6) * 60}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="card-glass group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 sm:p-8"
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${tagGradients[i % tagGradients.length]}`}
                  >
                    {post.category}
                  </span>
                  <h2 className="mt-3 font-serif text-xl text-navy transition-colors group-hover:text-saffron sm:text-2xl">
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

          {totalPages > 1 && (
            <nav
              aria-label="Insights pagination"
              className="mt-12 flex items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? "/insights" : `/insights?page=${n}`}
                  aria-current={n === page ? "page" : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ${
                    n === page
                      ? "bg-gradient-brand text-navy"
                      : "text-navy/60 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
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

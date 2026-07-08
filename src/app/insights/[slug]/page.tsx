import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/insights" className="text-sm font-medium text-saffron transition-colors hover:text-gold">
        ← Back to Insights
      </Link>
      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-gradient-brand">
        {post.category}
      </span>
      <h1 className="mt-3 font-serif text-3xl text-navy sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-brand" />
      <time className="mt-4 block text-sm text-navy/50">
        {new Date(post.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <p className="text-body mt-8 text-lg text-navy/75">
        {post.excerpt}
      </p>
      <div className="mt-6 space-y-4">
        {post.content.split(/\n+/).filter(Boolean).map((paragraph, i) => (
          <p key={i} className="text-body text-navy/70">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="text-body mt-6 text-navy/70">
        For advice specific to your situation, please{" "}
        <Link href="/contact" className="text-saffron transition-colors hover:text-gold">
          get in touch with our team
        </Link>
        .
      </p>
    </article>
  );
}

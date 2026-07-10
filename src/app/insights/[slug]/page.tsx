import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";
import MarkdownContent from "@/components/MarkdownContent";

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
  const url = `${siteConfig.url}/insights/${post.slug}`;
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: post.author_name ? [post.author_name] : undefined,
      images: post.author_photo_url ? [post.author_photo_url] : undefined,
    },
    twitter: {
      card: post.author_photo_url ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
    },
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

  const url = `${siteConfig.url}/insights/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.author_photo_url ? { image: [post.author_photo_url] } : {}),
    author: post.author_name
      ? {
          "@type": "Person",
          name: post.author_name,
          ...(post.author_position ? { jobTitle: post.author_position } : {}),
        }
      : { "@type": "Organization", name: siteConfig.fullName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/wafi-logo-text.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      {post.author_name && (
        <div className="mt-4 flex items-center gap-3">
          {post.author_photo_url && (
            <Image
              src={post.author_photo_url}
              alt={post.author_name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-navy">{post.author_name}</p>
            {post.author_position && (
              <p className="text-xs text-navy/60">{post.author_position}</p>
            )}
          </div>
        </div>
      )}
      <p className="text-body mt-8 text-lg text-navy/75">
        {post.excerpt}
      </p>
      <MarkdownContent content={post.content} />
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

import Link from "next/link";
import { getInsights, type Insight } from "@/lib/insights";

function pickRelated(all: Insight[], current: Insight, max: number): Insight[] {
  const others = all.filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, max);
}

export default async function RelatedArticles({ current }: { current: Insight }) {
  const all = await getInsights();
  const related = pickRelated(all, current, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 border-t border-navy/10 pt-8">
      <h2 className="font-serif text-xl text-navy">Related articles</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            className="card-glass group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-gradient-saffron">
              {post.category}
            </span>
            <h3 className="mt-2 font-serif text-base leading-snug text-navy transition-colors group-hover:text-saffron">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

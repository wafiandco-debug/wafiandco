import type { MetadataRoute } from "next";
import { getInsights, INSIGHTS_PER_PAGE } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

// revalidate alone wasn't reliably picking up new articles (same caching
// quirk found on the opengraph-image routes) — force-dynamic guarantees
// every request reflects the current database state. Sitemaps are fetched
// infrequently (mostly by crawlers), so per-request freshness matters far
// more here than the small extra latency.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getInsights();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/insights",
    "/career",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Page 1 is already covered by "/insights" above — list page 2 onward so
  // each self-canonicalized pagination page (see insights/page.tsx) is
  // discoverable straight from the sitemap, not just via crawling the
  // in-page "next page" link.
  const totalPages = Math.max(1, Math.ceil(insights.length / INSIGHTS_PER_PAGE));
  const paginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: totalPages - 1 },
    (_, i) => ({ url: `${siteConfig.url}/insights?page=${i + 2}` })
  );

  return [...staticRoutes, ...insightRoutes, ...paginationRoutes];
}

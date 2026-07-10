import type { MetadataRoute } from "next";
import { getInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

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
    lastModified: new Date(),
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...insightRoutes];
}

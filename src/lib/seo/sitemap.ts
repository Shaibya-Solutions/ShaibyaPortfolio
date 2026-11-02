import type { MetadataRoute } from "next";
import { allowIndexing } from "@/config/site";
import { pageSeo, type PublicPath } from "@/data/seo/pages";
import { services } from "@/data/seo/services";
import { getPublishedArticles } from "@/data/seo/articles";
import { absoluteUrl } from "./metadata";

export async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  if (!allowIndexing) return [];
  const core = (Object.keys(pageSeo) as PublicPath[]).filter((path) => pageSeo[path].kind !== "service");
  const servicePaths = services.map((service) => service.path);
  const pages = [...core, ...servicePaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified: pageSeo[path].modifiedAt,
    changeFrequency: pageSeo[path].changeFrequency,
    priority: pageSeo[path].priority,
  }));
  const articles = (await getPublishedArticles()).filter((article) => article.routeReady).map((article) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error(`Invalid article slug: ${article.slug}`);
    if (!Number.isFinite(Date.parse(article.publishedAt)) || !Number.isFinite(Date.parse(article.modifiedAt)) || Date.parse(article.modifiedAt) < Date.parse(article.publishedAt)) throw new Error(`Invalid publication dates: ${article.slug}`);
    return { url: absoluteUrl(`/resources/${article.slug}`), lastModified: article.modifiedAt, changeFrequency: "monthly" as const, priority: 0.6 };
  });
  const result = [...pages, ...articles];
  if (new Set(result.map((entry) => entry.url)).size !== result.length) throw new Error("Duplicate sitemap URLs.");
  return result;
}

import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        "*",
        "GPTBot",
        "ChatGPT-User",
        "ClaudeBot",
        "Claude-Web",
        "PerplexityBot",
        "Google-Extended",
        "Applebot-Extended",
        "cohere-ai",
        "Meta-ExternalAgent",
      ],
      allow: allowIndexing ? "/" : undefined,
      disallow: allowIndexing ? ["/admin", "/api", "/dashboard", "/account", "/login", "/preview"] : "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

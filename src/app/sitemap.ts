import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shaibya.solutions";
  const routes = [
    "",
    "/about",
    "/careers",
    "/community",
    "/contact",
    "/snyppit",
    "/portfolio",
    "/portfolio/rnd",
    "/portfolio/solutions",
    "/portfolio/websites",
    "/services/3d-modelling-animations",
    "/services/cybersecurity",
    "/services/digital-marketing",
    "/services/software-solutions",
    "/industry/fashion-tech",
    "/industry/fitness",
    "/industry/healthcare",
    "/industry/hospitality",
    "/industry/real-estate",
    "/industry/retail",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}

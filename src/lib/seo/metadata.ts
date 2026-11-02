import type { Metadata } from "next";
import { allowIndexing, site } from "@/config/site";
import { pageSeo, type PublicPath } from "@/data/seo/pages";

export type SitePath = "/" | `/${string}`;

export function absoluteUrl(path: SitePath): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[\\?#]/.test(path)) {
    throw new Error(`Canonical paths must be local paths without a query or fragment: ${path}`);
  }
  return new URL(path, site.url).href;
}

export interface PageMetadataInput {
  path: SitePath;
  title: string;
  description: string;
  image?: SitePath;
  noIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
  };
}

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const title = `${input.title} | ${site.name}`;
  const index = allowIndexing && !input.noIndex;
  const image = {
    url: absoluteUrl(input.image ?? site.socialImage),
    width: 1200,
    height: 630,
    alt: "Shaibya Solutions — custom software, CRM integrations and business automation in Nagpur",
  };

  return {
    // The root layout supplies the branding template; callers pass unbranded titles.
    title: input.path === "/" ? { absolute: title } : input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: {
      index,
      follow: index,
      googleBot: { index, follow: index, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: input.article ? "article" : "website",
      title,
      description: input.description,
      url,
      siteName: site.name,
      locale: site.locale,
      images: [image],
      ...(input.article ? { publishedTime: input.article.publishedTime, modifiedTime: input.article.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description: input.description, images: [image.url] },
  };
}

export function metadataFor(path: PublicPath): Metadata {
  return createPageMetadata({ path, ...pageSeo[path] });
}

export const rootMetadata: Metadata = {
  ...metadataFor("/"),
  metadataBase: new URL(site.url),
  title: { default: `${pageSeo["/"].title} | ${site.name}`, template: `%s | ${site.name}` },
  applicationName: site.name,
  category: "technology",
  formatDetection: { telephone: false },
  icons: { icon: "/favicon.ico" },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

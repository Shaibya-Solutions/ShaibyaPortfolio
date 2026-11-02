import { site, verifiedBusinessDetails } from "@/config/site";
import { pageSeo, type PublicPath } from "@/data/seo/pages";
import type { PublishedArticle } from "@/data/seo/articles";
import { absoluteUrl } from "./metadata";

interface EntityRef { "@id": string }
interface PlaceEntity { "@type": "City" | "Country" | "Place"; name: string }
interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}
interface ImageEntity { "@type": "ImageObject"; "@id": string; url: string; width: number; height: number; caption: string }
interface OrganizationEntity {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  logo: ImageEntity;
  telephone: string;
  email: string;
  address: PostalAddress;
  sameAs: string[];
  areaServed: PlaceEntity[];
  contactPoint: { "@type": "ContactPoint"; contactType: string; telephone: string; email: string };
}
interface ProfessionalServiceEntity {
  "@type": "ProfessionalService";
  "@id": string;
  name: string;
  url: string;
  telephone: string;
  email: string;
  image: string;
  address: PostalAddress;
  areaServed: PlaceEntity[];
  parentOrganization: EntityRef;
  hasMap: string;
  openingHoursSpecification: { "@type": "OpeningHoursSpecification"; dayOfWeek: readonly string[]; opens: string; closes: string }[];
  geo?: { "@type": "GeoCoordinates"; latitude: number; longitude: number };
}
interface WebsiteEntity { "@type": "WebSite"; "@id": string; url: string; name: string; publisher: EntityRef; inLanguage: string }
type WebPageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
interface WebPageEntity {
  "@type": WebPageType;
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: EntityRef;
  publisher: EntityRef;
  breadcrumb?: EntityRef;
  mainEntity?: EntityRef;
}
interface BreadcrumbEntity { "@type": "BreadcrumbList"; "@id": string; itemListElement: { "@type": "ListItem"; position: number; name: string; item: string }[] }
interface ServiceEntity {
  "@type": "Service";
  "@id": string;
  name: string;
  serviceType: string | readonly string[];
  description: string;
  url: string;
  provider: EntityRef;
  areaServed: PlaceEntity[];
}
export interface VisibleFaq { q: string; a: string }
interface FaqEntity { "@type": "FAQPage"; "@id": string; mainEntity: { "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }[] }
interface ItemListEntity { "@type": "ItemList"; "@id": string; itemListElement: { "@type": "ListItem"; position: number; name: string; url: string }[] }
interface ArticleEntity {
  "@type": "BlogPosting";
  "@id": string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: EntityRef;
  publisher: EntityRef;
  image: string;
  mainEntityOfPage: EntityRef;
}
export type SchemaEntity = OrganizationEntity | ProfessionalServiceEntity | WebsiteEntity | WebPageEntity | BreadcrumbEntity | ServiceEntity | FaqEntity | ItemListEntity | ArticleEntity;
export interface SchemaDocument { "@context": "https://schema.org"; "@graph": SchemaEntity[] }

export const entityIds = {
  organization: `${site.url}/#organization`,
  professionalService: `${site.url}/#professional-service`,
  website: `${site.url}/#website`,
} as const;

const areaServed: PlaceEntity[] = [
  { "@type": "City", name: "Nagpur" },
  { "@type": "Country", name: "India" },
  { "@type": "Place", name: "International clients served remotely" },
];

export function businessGraph(): SchemaDocument {
  const address: PostalAddress = { "@type": "PostalAddress", ...site.address };
  const geo = verifiedBusinessDetails.geo;
  if (geo && (!Number.isFinite(geo.latitude) || !Number.isFinite(geo.longitude) || Math.abs(geo.latitude) > 90 || Math.abs(geo.longitude) > 180)) {
    throw new Error("The verified business pin must contain valid latitude and longitude.");
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": entityIds.organization,
        name: site.name,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", "@id": `${site.url}/#logo`, url: absoluteUrl(site.logo), width: 1254, height: 1254, caption: site.name },
        telephone: site.telephone,
        email: site.email,
        address,
        sameAs: [site.social.linkedin, site.social.instagram, verifiedBusinessDetails.github, verifiedBusinessDetails.twitter].filter((value): value is NonNullable<typeof value> => Boolean(value)),
        areaServed,
        contactPoint: { "@type": "ContactPoint", contactType: "Business enquiries", telephone: site.telephone, email: site.email },
      },
      {
        "@type": "ProfessionalService",
        "@id": entityIds.professionalService,
        name: site.name,
        url: absoluteUrl("/"),
        telephone: site.telephone,
        email: site.email,
        image: absoluteUrl(site.socialImage),
        address,
        areaServed,
        parentOrganization: { "@id": entityIds.organization },
        hasMap: site.googleBusinessProfile,
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: site.openingHours.days, opens: site.openingHours.opens, closes: site.openingHours.closes }],
        ...(geo ? { geo: { "@type": "GeoCoordinates" as const, latitude: geo.latitude, longitude: geo.longitude } } : {}),
      },
      { "@type": "WebSite", "@id": entityIds.website, url: absoluteUrl("/"), name: site.name, publisher: { "@id": entityIds.organization }, inLanguage: site.language },
    ],
  };
}

export function faqSchema(path: PublicPath, faqs: readonly VisibleFaq[]): FaqEntity {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

interface PageGraphOptions {
  type?: WebPageType;
  faqs?: readonly VisibleFaq[];
  service?: { name: string; serviceType: string | readonly string[] };
  items?: readonly { name: string; path: `/${string}` }[];
}

export function pageGraph(path: PublicPath, options: PageGraphOptions = {}): SchemaDocument {
  const seo = pageSeo[path];
  const url = absoluteUrl(path);
  const parents: PublicPath[] = path === "/" ? [] : path.startsWith("/portfolio/") ? ["/", "/portfolio", path] : ["/", path];
  const nodes: SchemaEntity[] = [{
    "@type": options.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: site.language,
    isPartOf: { "@id": entityIds.website },
    publisher: { "@id": entityIds.organization },
    ...(parents.length ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(options.service ? { mainEntity: { "@id": `${url}#service` } } : options.items ? { mainEntity: { "@id": `${url}#items` } } : {}),
  }];
  if (parents.length) nodes.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: parents.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item === "/" ? "Home" : item === "/portfolio" ? "Portfolio" : pageSeo[item].title, item: absoluteUrl(item) })),
  });
  if (options.service) nodes.push({
    "@type": "Service", "@id": `${url}#service`, name: options.service.name, serviceType: options.service.serviceType, description: seo.description, url, provider: { "@id": entityIds.organization }, areaServed,
  });
  if (options.faqs?.length) nodes.push(faqSchema(path, options.faqs));
  if (options.items?.length) nodes.push({
    "@type": "ItemList", "@id": `${url}#items`, itemListElement: options.items.map((item, index) => {
      const [pathname, fragment] = item.path.split("#", 2);
      const itemUrl = absoluteUrl(pathname as `/${string}`);
      return { "@type": "ListItem", position: index + 1, name: item.name, url: fragment ? `${itemUrl}#${encodeURIComponent(fragment)}` : itemUrl };
    }),
  });
  return { "@context": "https://schema.org", "@graph": nodes };
}

// Enable alongside a real resource route; unpublished topics never emit this schema.
export function articleGraph(article: PublishedArticle): SchemaDocument {
  const url = absoluteUrl(`/resources/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: site.language, isPartOf: { "@id": entityIds.website }, publisher: { "@id": entityIds.organization }, mainEntity: { "@id": `${url}#article` } },
      { "@type": "BlogPosting", "@id": `${url}#article`, headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.modifiedAt, author: { "@id": entityIds.organization }, publisher: { "@id": entityIds.organization }, image: absoluteUrl(article.image ?? site.socialImage), mainEntityOfPage: { "@id": `${url}#webpage` } },
    ],
  };
}

import type { Metadata } from "next";
import PortfolioWebsitesClient from "@/components/pages/portfolio/PortfolioWebsitesClient";

export const metadata: Metadata = {
  title: "Bespoke Web Development Portfolio | Shaibya Solutions",
  description: "Browse our high-performance marketing websites, digital catalogs, and custom brand spaces.",
  alternates: {
    canonical: "https://shaibya.solutions/portfolio/websites",
  },
  openGraph: {
    title: "Bespoke Web Development Portfolio | Shaibya Solutions",
    description: "Browse our high-performance marketing websites, digital catalogs, and custom brand spaces.",
    url: "https://shaibya.solutions/portfolio/websites",
    type: "website",
  },
};

export default function WebsitesPortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/portfolio/websites/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://shaibya.solutions"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://shaibya.solutions/portfolio"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Websites",
            "item": "https://shaibya.solutions/portfolio/websites"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioWebsitesClient />
    </>
  );
}

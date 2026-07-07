import type { Metadata } from "next";
import PortfolioSolutionsClient from "@/components/pages/portfolio/PortfolioSolutionsClient";

export const metadata: Metadata = {
  title: "Automation & CRM Solutions Portfolio | Shaibya Solutions",
  description: "Browse our custom business tools, CRM platforms, WhatsApp automations, and database pipelines.",
  alternates: {
    canonical: "https://shaibya.solutions/portfolio/solutions",
  },
  openGraph: {
    title: "Automation & CRM Solutions Portfolio | Shaibya Solutions",
    description: "Browse our custom business tools, CRM platforms, WhatsApp automations, and database pipelines.",
    url: "https://shaibya.solutions/portfolio/solutions",
    type: "website",
  },
};

export default function SolutionsPortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/portfolio/solutions/#breadcrumb",
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
            "name": "Solutions",
            "item": "https://shaibya.solutions/portfolio/solutions"
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
      <PortfolioSolutionsClient />
    </>
  );
}

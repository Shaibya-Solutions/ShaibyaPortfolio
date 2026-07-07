import type { Metadata } from "next";
import PortfolioRndClient from "@/components/pages/portfolio/PortfolioRndClient";

export const metadata: Metadata = {
  title: "R&D and MVP Portfolio | Shaibya Solutions",
  description: "Explore our research and development projects, startup MVPs, rapid prototypes, and experimental software systems.",
  alternates: {
    canonical: "https://shaibya.solutions/portfolio/rnd",
  },
  openGraph: {
    title: "R&D and MVP Portfolio | Shaibya Solutions",
    description: "Explore our research and development projects, startup MVPs, rapid prototypes, and experimental software systems.",
    url: "https://shaibya.solutions/portfolio/rnd",
    type: "website",
  },
};

export default function RndPortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/portfolio/rnd/#breadcrumb",
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
            "name": "R&D / MVPs",
            "item": "https://shaibya.solutions/portfolio/rnd"
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
      <PortfolioRndClient />
    </>
  );
}

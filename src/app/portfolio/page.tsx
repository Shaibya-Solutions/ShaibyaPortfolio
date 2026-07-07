import type { Metadata } from "next";
import PortfolioClient from "@/components/pages/portfolio/PortfolioClient";

export const metadata: Metadata = {
  title: "Our Engineering Portfolio | Shaibya Solutions",
  description: "Browse our portfolio of custom software systems, automated WhatsApp lead funnels, gym management software, and high-performance websites.",
  alternates: {
    canonical: "https://shaibya.solutions/portfolio",
  },
  openGraph: {
    title: "Our Engineering Portfolio | Shaibya Solutions",
    description: "Browse our portfolio of custom software systems, automated WhatsApp lead funnels, gym management software, and high-performance websites.",
    url: "https://shaibya.solutions/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/portfolio/#breadcrumb",
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
          }
        ]
      },
      {
        "@type": "CreativeWork",
        "@id": "https://shaibya.solutions/portfolio/#portfolio",
        "name": "Shaibya Solutions Engineering Portfolio",
        "description": "Featured software systems, real estate CRM portals, 3D animations, and retail web applications built for business optimization.",
        "publisher": {
          "@type": "Organization",
          "name": "Shaibya Solutions"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient />
    </>
  );
}

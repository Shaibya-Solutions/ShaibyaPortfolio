import type { Metadata } from "next";
import SoftwareSolutionsClient from "@/components/pages/software-solutions/SoftwareSolutionsClient";

export const metadata: Metadata = {
  title: "Custom Software Engineering & MVP Solutions | Shaibya Solutions",
  description: "We design high-performance websites, custom CRM systems, mobile apps, and enterprise database architectures to automate your business operations.",
  alternates: {
    canonical: "https://shaibya.solutions/services/software-solutions",
  },
  openGraph: {
    title: "Custom Software Engineering & MVP Solutions | Shaibya Solutions",
    description: "We design high-performance websites, custom CRM systems, mobile apps, and enterprise database architectures to automate your business operations.",
    url: "https://shaibya.solutions/services/software-solutions",
    type: "website",
  },
};

export default function SoftwareSolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/services/software-solutions/#breadcrumb",
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
            "name": "Services",
            "item": "https://shaibya.solutions/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Software Solutions",
            "item": "https://shaibya.solutions/services/software-solutions"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/services/software-solutions/#service",
        "name": "Custom Software Engineering & MVP Development",
        "description": "High-performance websites, custom CRM systems, mobile apps, and enterprise database architectures.",
        "provider": {
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
      <SoftwareSolutionsClient />
    </>
  );
}

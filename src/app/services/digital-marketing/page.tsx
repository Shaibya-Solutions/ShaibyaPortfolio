import type { Metadata } from "next";
import DigitalMarketingClient from "@/components/pages/digital-marketing/DigitalMarketingClient";

export const metadata: Metadata = {
  title: "Digital Marketing, SEO & Paid Ad Services | Shaibya Solutions",
  description: "Accelerate your local business growth. We design customer acquisition funnels, run high-ROI Meta & Google ads, and optimize Google Business SEO.",
  alternates: {
    canonical: "https://shaibya.solutions/services/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing, SEO & Paid Ad Services | Shaibya Solutions",
    description: "Accelerate your local business growth. We design customer acquisition funnels, run high-ROI Meta & Google ads, and optimize Google Business SEO.",
    url: "https://shaibya.solutions/services/digital-marketing",
    type: "website",
  },
};

export default function DigitalMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/services/digital-marketing/#breadcrumb",
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
            "name": "Digital Marketing",
            "item": "https://shaibya.solutions/services/digital-marketing"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/services/digital-marketing/#service",
        "name": "Digital Marketing, Social Ads & Local Search SEO",
        "description": "Custom customer acquisition funnels, Meta/Google ad setups, organic GMB review optimization, and short-form video content scripting.",
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
      <DigitalMarketingClient />
    </>
  );
}

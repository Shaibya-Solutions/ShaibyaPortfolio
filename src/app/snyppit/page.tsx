import type { Metadata } from "next";
import SnyppitClient from "@/components/pages/snyppit/SnyppitClient";

export const metadata: Metadata = {
  title: "The Snyppit Story | Shaibya Solutions",
  description: "Read the Snyppit founding story: how we partnered with a student founder to design, engineer, and deploy a fashion-delivery platform in 4 weeks.",
  alternates: {
    canonical: "https://shaibya.solutions/snyppit",
  },
  openGraph: {
    title: "The Snyppit Story | Shaibya Solutions",
    description: "Read the Snyppit founding story: how we partnered with a student founder to design, engineer, and deploy a fashion-delivery platform in 4 weeks.",
    url: "https://shaibya.solutions/snyppit",
    type: "website",
  },
};

export default function SnyppitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://shaibya.solutions/snyppit/#webpage",
        "url": "https://shaibya.solutions/snyppit",
        "name": "The Snyppit Story | Shaibya Solutions",
        "description": "Read the Snyppit founding story: how we partnered with a student founder to design, engineer, and deploy a fashion-delivery platform in 4 weeks."
      },
      {
        "@type": "CreativeWork",
        "@id": "https://shaibya.solutions/snyppit/#creativework",
        "name": "Snyppit",
        "description": "A fashion-delivery platform delivered in minutes, built from napkin sketch to launch in 4 weeks.",
        "url": "https://www.snyypit.com",
        "creator": {
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
      <SnyppitClient />
    </>
  );
}

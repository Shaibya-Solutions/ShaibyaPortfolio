import type { Metadata } from "next";
import AboutClient from "@/components/pages/about/AboutClient";

export const metadata: Metadata = {
  title: "About Our Studio | Shaibya Solutions",
  description: "Learn about the Shaibya Solutions journey from local beginnings in Nagpur to global client partners. We build scalable custom software and process automation systems.",
  alternates: {
    canonical: "https://shaibya.solutions/about",
  },
  openGraph: {
    title: "About Our Studio | Shaibya Solutions",
    description: "Learn about the Shaibya Solutions journey from local beginnings in Nagpur to global client partners.",
    url: "https://shaibya.solutions/about",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://shaibya.solutions/about/#webpage",
        "url": "https://shaibya.solutions/about",
        "name": "About Shaibya Solutions",
        "description": "Learn about the Shaibya Solutions journey from local beginnings in Nagpur to global client partners."
      },
      {
        "@type": "Organization",
        "@id": "https://shaibya.solutions/#organization",
        "name": "Shaibya Solutions",
        "url": "https://shaibya.solutions",
        "logo": "https://shaibya.solutions/logo.png"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}

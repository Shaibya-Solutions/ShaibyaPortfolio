import type { Metadata } from "next";
import CommunityClient from "@/components/pages/community/CommunityClient";

export const metadata: Metadata = {
  title: "Ecosystem & Communities | Shaibya Solutions",
  description: "Join the Shaibya Solutions community ecosystem. Connecting student builders, design specialists, and startup founders to collaborate on modern technology platforms.",
  alternates: {
    canonical: "https://shaibya.solutions/community",
  },
  openGraph: {
    title: "Ecosystem & Communities | Shaibya Solutions",
    description: "Join the Shaibya Solutions community ecosystem. Connecting student builders, design specialists, and startup founders to collaborate on modern technology platforms.",
    url: "https://shaibya.solutions/community",
    type: "website",
  },
};

export default function CommunityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://shaibya.solutions/community/#webpage",
        "url": "https://shaibya.solutions/community",
        "name": "Ecosystem & Communities | Shaibya Solutions",
        "description": "Join the Shaibya Solutions community ecosystem. Connecting student builders, design specialists, and startup founders to collaborate on modern technology platforms."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommunityClient />
    </>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { CyberHeroSection } from "@/components/pages/cybersecurity/CyberHeroSection";
import { CyberServicesSection } from "@/components/pages/cybersecurity/CyberServicesSection";
import { ThreatRadarSection } from "@/components/pages/cybersecurity/ThreatRadarSection";
import { CyberCTASection } from "@/components/pages/cybersecurity/CyberCTASection";

export const metadata: Metadata = {
  title: "Enterprise Cybersecurity & Penetration Testing | Shaibya Solutions",
  description: "Protect your database and applications. We offer compliance audits, API security, pentesting, and incident response frameworks.",
  alternates: {
    canonical: "https://shaibya.solutions/services/cybersecurity",
  },
  openGraph: {
    title: "Enterprise Cybersecurity & Penetration Testing | Shaibya Solutions",
    description: "Protect your database and applications. We offer compliance audits, API security, pentesting, and incident response frameworks.",
    url: "https://shaibya.solutions/services/cybersecurity",
    type: "website",
  },
};

export default function CybersecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/services/cybersecurity/#breadcrumb",
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
            "name": "Cybersecurity",
            "item": "https://shaibya.solutions/services/cybersecurity"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/services/cybersecurity/#service",
        "name": "Enterprise Cybersecurity Consulting & Application Penetration Testing",
        "description": "Compliance audits, pentesting frameworks, API threat radar simulations, and real-time security alerts.",
        "provider": {
          "@type": "Organization",
          "name": "Shaibya Solutions"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-[#10b981]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <CyberHeroSection />
      <CyberServicesSection />
      <ThreatRadarSection />
      <CyberCTASection />
      <Footer />
    </main>
  );
}

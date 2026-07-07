import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { HeroSection } from "@/components/pages/3d-service/HeroSection";
import { ServicesSection } from "@/components/pages/3d-service/ServicesSection";
import { ProcessSliderSection } from "@/components/pages/3d-service/ProcessSliderSection";
import { PortfolioShowcase } from "@/components/pages/3d-service/PortfolioShowcase";
import { CTASection } from "@/components/pages/3d-service/CTASection";

export const metadata: Metadata = {
  title: "3D Modelling & Interactive Web Animations | Shaibya Solutions",
  description: "Leverage immersive Three.js and WebGL interactions to showcase products. High-fidelity 3D modeling and animations tailored for modern websites.",
  alternates: {
    canonical: "https://shaibya.solutions/services/3d-modelling-animations",
  },
  openGraph: {
    title: "3D Modelling & Interactive Web Animations | Shaibya Solutions",
    description: "Leverage immersive Three.js and WebGL interactions to showcase products. High-fidelity 3D modeling and animations tailored for modern websites.",
    url: "https://shaibya.solutions/services/3d-modelling-animations",
    type: "website",
  },
};

export default function ThreeDModellingAnimationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/services/3d-modelling-animations/#breadcrumb",
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
            "name": "3D Modelling & Animations",
            "item": "https://shaibya.solutions/services/3d-modelling-animations"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/services/3d-modelling-animations/#service",
        "name": "3D Modelling & Interactive WebGL Animations",
        "description": "Custom WebGL experiences, Three.js render models, and high-retention 3D page animations.",
        "provider": {
          "@type": "Organization",
          "name": "Shaibya Solutions"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-pink-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <ProcessSliderSection />
      <PortfolioShowcase />
      <CTASection />
      <Footer />
    </main>
  );
}

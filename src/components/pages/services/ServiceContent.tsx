import type { ServiceSlug } from "@/data/seo/services";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import SoftwareSolutionsClient from "@/components/pages/software-solutions/SoftwareSolutionsClient";
import DigitalMarketingClient from "@/components/pages/digital-marketing/DigitalMarketingClient";
import { HeroSection } from "@/components/pages/3d-service/HeroSection";
import { ServicesSection } from "@/components/pages/3d-service/ServicesSection";
import { ProcessSliderSection } from "@/components/pages/3d-service/ProcessSliderSection";
import { PortfolioShowcase } from "@/components/pages/3d-service/PortfolioShowcase";
import { CTASection } from "@/components/pages/3d-service/CTASection";
import { CyberHeroSection } from "@/components/pages/cybersecurity/CyberHeroSection";
import { CyberServicesSection } from "@/components/pages/cybersecurity/CyberServicesSection";
import { ThreatRadarSection } from "@/components/pages/cybersecurity/ThreatRadarSection";
import { CyberCTASection } from "@/components/pages/cybersecurity/CyberCTASection";

// The existing page components, order, classes and styling are preserved.
export default function ServiceContent({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "software-solutions": return <SoftwareSolutionsClient />;
    case "digital-marketing": return <DigitalMarketingClient />;
    case "3d-modelling-animations": return (
      <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-pink-500/30">
        <SiteHeader /><HeroSection /><ServicesSection /><ProcessSliderSection /><PortfolioShowcase /><CTASection /><Footer />
      </main>
    );
    case "cybersecurity": return (
      <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-[#10b981]/30">
        <SiteHeader /><CyberHeroSection /><CyberServicesSection /><ThreatRadarSection /><CyberCTASection /><Footer />
      </main>
    );
  }
}

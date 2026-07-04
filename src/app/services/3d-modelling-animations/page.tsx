"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { HeroSection } from "@/components/pages/3d-service/HeroSection";
import { ServicesSection } from "@/components/pages/3d-service/ServicesSection";
import { ProcessSliderSection } from "@/components/pages/3d-service/ProcessSliderSection";
import { PortfolioShowcase } from "@/components/pages/3d-service/PortfolioShowcase";
import { CTASection } from "@/components/pages/3d-service/CTASection";

export default function ThreeDModellingAnimationsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-pink-500/30">
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

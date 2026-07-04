"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { CyberHeroSection } from "@/components/pages/cybersecurity/CyberHeroSection";
import { CyberServicesSection } from "@/components/pages/cybersecurity/CyberServicesSection";
import { ThreatRadarSection } from "@/components/pages/cybersecurity/ThreatRadarSection";
import { CyberCTASection } from "@/components/pages/cybersecurity/CyberCTASection";

export default function CybersecurityPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-[#10b981]/30">
      <SiteHeader />
      <CyberHeroSection />
      <CyberServicesSection />
      <ThreatRadarSection />
      <CyberCTASection />
      <Footer />
    </main>
  );
}

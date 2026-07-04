"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { DigitalHeroSection } from "@/components/pages/digital/DigitalHeroSection";

import { DigitalCaseStudySection } from "@/components/pages/digital/DigitalCaseStudySection";
import { DigitalShowcaseSection } from "@/components/pages/digital/DigitalShowcaseSection";
import { DigitalAmplifyCTA } from "@/components/pages/digital/DigitalAmplifyCTA";

export default function DigitalwareSolutionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-500/20">
      
      {/* Site Header */}
      <div className="relative z-[100]">
        <SiteHeader />
      </div>
      
      {/* 1. Hero Section (We Don't Just Code. We Build Solutions.) */}
      <DigitalHeroSection />



      {/* 3. Case Study Section */}
      <DigitalCaseStudySection />

      {/* 4. High-Impact Showcase Section */}
      <DigitalShowcaseSection />

      {/* 5. Amplify CTA */}
      <DigitalAmplifyCTA />

      {/* Footer */}
      <Footer />

    </main>
  );
}

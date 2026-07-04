"use client";

import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { SoftScrollExperience } from "@/components/pages/software/SoftScrollExperience";
import { SoftBentoShowcase } from "@/components/pages/software/SoftBentoShowcase";
import { SoftFeaturesParallax } from "@/components/pages/software/SoftFeaturesParallax";
import { SoftCodeShowcase } from "@/components/pages/software/SoftCodeShowcase";

export default function SoftwareSolutionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 w-full">
      
      {/* Site Header */}
      <div className="relative z-[100]">
        <SiteHeader />
      </div>
      
      <div className="w-full">
        
        {/* 1. Minimal Bento Grid Section */}
        <SoftBentoShowcase />

        {/* 2. Awesome 3D Scroll UI Cards Section */}
        <SoftScrollExperience />

        {/* 3. Immersive Parallax Features */}
        <SoftFeaturesParallax />

        {/* 4. Engineering Excellence Code Showcase */}
        <SoftCodeShowcase />

      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}

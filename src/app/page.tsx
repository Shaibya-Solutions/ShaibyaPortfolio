"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const GLHero = dynamic(
  () => import("@/components/features/landing/GLHero"),
  { ssr: false, loading: () => <div className="min-h-screen bg-gradient-to-br from-[#E0F5FC] to-white" /> }
);

const GLAbout = dynamic(
  () => import("@/components/features/landing/GLAbout"),
  { ssr: false, loading: () => <div className="h-64 bg-white" /> }
);

const GLStats = dynamic(
  () => import("@/components/features/landing/GLStats"),
  { ssr: false, loading: () => <div className="h-64 bg-[#022648]" /> }
);

const GLOurWork = dynamic(
  () => import("@/components/features/landing/GLOurWork"),
  { ssr: false, loading: () => <div className="h-screen bg-[#FAF7F2]" /> }
);

const GLIndustries = dynamic(
  () => import("@/components/features/landing/GLIndustries"),
  { ssr: false, loading: () => <div className="h-96 bg-[#f8fbfe]" /> }
);

const GLTestimonials = dynamic(
  () => import("@/components/features/landing/GLTestimonials"),
  { ssr: false, loading: () => <div className="h-96 bg-[#022648]" /> }
);

const GLFAQ = dynamic(
  () => import("@/components/features/landing/GLFAQ"),
  { ssr: false, loading: () => <div className="h-96 bg-[#f8fbfe]" /> }
);

const GLContact = dynamic(
  () => import("@/components/features/landing/GLContact"),
  { ssr: false, loading: () => <div className="h-64 bg-white" /> }
);

const GLInstagram = dynamic(
  () => import("@/components/features/landing/GLInstagram"),
  { ssr: false, loading: () => <div className="h-96 bg-[#faf5ef]" /> }
);

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col">
      <SiteHeader />

      {/* 1. HERO */}
      <GLHero />

      {/* 2. ABOUT */}
      <GLAbout />

      {/* 3. STATS */}
      <GLStats />

      {/* 4. OUR WORK — sticky scroll showcase */}
      <GLOurWork />

      {/* 5. INDUSTRIES */}
      <GLIndustries />

      {/* 8. TESTIMONIALS */}
      <GLTestimonials />

      {/* 9. FAQ */}
      <GLFAQ />

      {/* 11. CONTACT CTA */}
      <GLContact />

      {/* 12. INSTAGRAM FEED */}
      <GLInstagram />

      <Footer />

      {/* Instagram FAB */}
      <a
        href="https://www.instagram.com/deepoffduty/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          boxShadow: "0 4px 24px rgba(220,39,67,0.4)",
        }}
      >
        <FaInstagram size={26} className="text-white" />
      </a>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/917498341146?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Shaibya%20Solutions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #25D366, #1ebe5d)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
        }}
      >
        <FaWhatsapp size={28} className="text-white" />
      </a>
    </main>
  );
}

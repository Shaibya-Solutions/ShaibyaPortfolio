import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import GLHero from "@/components/features/landing/GLHero";
import GLAbout from "@/components/features/landing/GLAbout";
import GLStats from "@/components/features/landing/GLStats";
import GLOurWork from "@/components/features/landing/GLOurWork";
import GLIndustries from "@/components/features/landing/GLIndustries";
import GLTestimonials from "@/components/features/landing/GLTestimonials";
import GLFAQ from "@/components/features/landing/GLFAQ";
import GLContact from "@/components/features/landing/GLContact";
import GLInstagram from "@/components/features/landing/GLInstagram";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { getFaqs, getProjects, getTestimonials } from "@/lib/supabase/portfolio";

export const revalidate = 60;

export const metadata = metadataFor("/");

export default async function HomePage() {
  const [testimonials, faqs, projects] = await Promise.all([getTestimonials(), getFaqs(), getProjects()]);

  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col">
      <JsonLd data={pageGraph("/", { faqs })} />
      <SiteHeader />

      {/* 1. HERO */}
      <GLHero />

      {/* 2. ABOUT */}
      <GLAbout />

      {/* 3. STATS */}
      <GLStats />

      {/* 4. OUR WORK — sticky scroll showcase */}
      <GLOurWork featured={projects.filter((project) => project.featured)} />

      {/* 5. INDUSTRIES */}
      <GLIndustries />

      {/* 8. TESTIMONIALS */}
      <GLTestimonials items={testimonials} />

      {/* 9. FAQ */}
      <GLFAQ faqs={faqs} />

      {/* 11. CONTACT CTA */}
      <GLContact />

      {/* 12. INSTAGRAM FEED */}
      <GLInstagram />

      <Footer />

      {/* Call FAB */}
      <a
        href="tel:+917498341146"
        aria-label="Call Shaibya Solutions"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex size-12 items-center justify-center rounded-full shadow-xl transition-all duration-200 active:scale-95 hover:scale-110 hover:shadow-2xl sm:left-6 sm:size-14"
        style={{
          background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
          boxShadow: "0 4px 24px rgba(14,165,233,0.4)",
        }}
      >
        <FaPhoneAlt size={21} className="text-white sm:text-[24px]" />
      </a>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/917498341146?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Shaibya%20Solutions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-12 items-center justify-center rounded-full shadow-xl transition-all duration-200 active:scale-95 hover:scale-110 hover:shadow-2xl sm:right-6 sm:size-14"
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

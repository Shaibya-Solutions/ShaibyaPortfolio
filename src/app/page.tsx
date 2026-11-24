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
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
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

      {/* Instagram FAB */}
      <a
        href="https://www.instagram.com/deepoffduty/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        className="fixed bottom-6 left-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200 active:scale-95 hover:scale-110 hover:shadow-2xl sm:flex"
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
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-all duration-200 active:scale-95 hover:scale-110 hover:shadow-2xl sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
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

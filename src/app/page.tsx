import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Shaibya Solutions | Digital Engineering & Process Automation Studio",
  description: "We build custom software, CRM integrations, real estate platforms, and WhatsApp automation systems that eliminate manual bottlenecks and accelerate growth.",
  alternates: {
    canonical: "https://shaibya.solutions",
  },
  openGraph: {
    title: "Shaibya Solutions | Digital Engineering & Process Automation Studio",
    description: "We build custom software, CRM integrations, real estate platforms, and WhatsApp automation systems that eliminate manual bottlenecks and accelerate growth.",
    url: "https://shaibya.solutions",
    siteName: "Shaibya Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaibya Solutions | Digital Engineering & Process Automation Studio",
    description: "We build custom software, CRM integrations, real estate platforms, and WhatsApp automation systems that eliminate manual bottlenecks and accelerate growth.",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://shaibya.solutions/#organization",
        "name": "Shaibya Solutions",
        "url": "https://shaibya.solutions",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://shaibya.solutions/#logo",
          "url": "https://shaibya.solutions/logo.png",
          "caption": "Shaibya Solutions Logo"
        },
        "sameAs": [
          "https://www.linkedin.com/company/shaibyasolutions/about/",
          "https://www.instagram.com/deepoffduty/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://shaibya.solutions/#website",
        "url": "https://shaibya.solutions",
        "name": "Shaibya Solutions",
        "publisher": {
          "@id": "https://shaibya.solutions/#organization"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://shaibya.solutions/#localbusiness",
        "name": "Shaibya Solutions",
        "image": "https://shaibya.solutions/logo.png",
        "url": "https://shaibya.solutions",
        "telephone": "+917498341146",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nagpur",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "postalCode": "440001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "21.1458",
          "longitude": "79.0882"
        }
      }
    ]
  };

  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

import type { Metadata } from "next";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Hospitality & Boutique Hotel Direct Booking Systems | Shaibya Solutions",
  description: "Learn how we build boutique hotel booking platforms, reservation engines, and custom property portals. Discover how Sonar Killa tripled direct bookings.",
  alternates: {
    canonical: "https://shaibya.solutions/industry/hospitality",
  },
  openGraph: {
    title: "Hospitality & Boutique Hotel Direct Booking Systems | Shaibya Solutions",
    description: "Learn how we build boutique hotel booking platforms, reservation engines, and custom property portals.",
    url: "https://shaibya.solutions/industry/hospitality",
    type: "website",
  },
};

const data: IndustryPageData = {
  slug: "hospitality",
  eyebrow: "Hospitality",
  heroImage: "/images/screenshots/sonar-killa.png",
  headline: ["From phone inquiries to", "direct guest bookings."],
  heroSub:
    "How we transformed Sonar Killa — a premium boutique heritage hotel in Jaisalmer — replacing booking commissions with direct online reservations and tripling online bookings.",
  heroStats: [
    { value: "Jaisalmer", label: "Client Location" },
    { value: "3×", label: "Online Bookings" },
    { value: "60%", label: "Less Booking Friction" },
    { value: "₹0", label: "OTA Commission" },
  ],
  contextChapter: {
    label: "The Context",
    paragraphs: [
      "Sonar Killa Jaisalmer is a beautiful heritage property built inside the golden fort city. It's rich in history, character, and royal hospitality.",
      "But their booking flow was manual and heavily dependent on third-party OTAs charging 15–20% commission on every stay. <strong>They had no direct booking engine,</strong> and guests had to call or email to confirm rooms.",
      "We built a direct booking portal that showcases their royal heritage and captures reservations instantly — with zero commission.",
    ],
    pullQuote:
      "Helping boutique hotels capture direct bookings and keep 100% of their revenue.",
  },
  painPoints: [
    { emoji: "🏨", title: "Heavy OTA Commission", desc: "Paying high commission percentages to OTAs on every guest booking — losing significant profit margin." },
    { emoji: "📞", title: "Manual Booking Flow", desc: "Confirming bookings manually via phone and email. Time-consuming, error-prone, and prone to double bookings." },
    { emoji: "💻", title: "No Direct Checkout", desc: "No online booking engine. Guests couldn't check availability or book rooms directly on the website." },
    { emoji: "🔍", title: "Low Local Search", desc: "Heritage travelers searching for Jaisalmer heritage stays couldn't find the property on search page 1." },
    { emoji: "📊", title: "No Reservation Calendar", desc: "No central reservation dashboard. Managing room allocations on paper or basic spreadsheets." },
  ],
  solutions: [
    { emoji: "🖥️", title: "Bespoke Hotel Website", desc: "Clean, media-rich website showcasing fort views, rooms, dining, and heritage tours." },
    { emoji: "📅", title: "Direct Booking Engine", desc: "Guest checkout flow with real-time availability, secure room reservations, and instant confirmations." },
    { emoji: "🚀", title: "Hospitality SEO", desc: "Google Business optimization and local keywords to rank for boutique stay queries in Rajasthan." },
    { emoji: "💳", title: "Secure Payment Gateway", desc: "UPI, cards, and international wallets integrated directly into the booking checkout flow." },
    { emoji: "🔔", title: "Automated Guest Alerts", desc: "Reservation details, check-in instructions, and billing invoices sent directly to the guest's WhatsApp/email." },
    { emoji: "📊", title: "Central Room Dashboard", desc: "Manage room inventory, block occupied dates, and track monthly booking analytics in one dashboard." },
  ],
  clients: [
    {
      name: "Sonar Killa Jaisalmer",
      tag: "Featured",
      role: "Boutique hotel transformation",
      desc: "A boutique heritage hotel in Jaisalmer fort. We designed and built a <strong>direct booking website</strong> with high-resolution room galleries, real-time availability calendar, secure payment checkout, and reservation automation. Within 60 days, online bookings tripled and OTA booking commissions dropped significantly.",
      image: "/images/screenshots/sonar-killa.png",
      stats: [{ v: "3×", l: "Online Bookings" }, { v: "60%", l: "Less Phone Calls" }, { v: "Page 1", l: "Google" }],
    },
    {
      name: "Sonar Killa — Website Case Study",
      tag: "Case Study 02",
      role: "Screenshot Showcase",
      desc: "The visual transformation was as dramatic as the metrics. A property rich in history and character finally had a digital home that matched its heritage. Guests now arrive already knowing the rooms, the views, and the experience — converting from the website before even speaking to anyone.",
      image: "/images/screenshots/sonar-killa.png",
      stats: [{ v: "₹0", l: "Commission per Booking" }, { v: "100%", l: "Direct Bookings" }],
    },
  ],
  transformations: [
    { label: "Online booking share", before: "0%", after: "65%+ of total", pct: 85 },
    { label: "Phone call dependency", before: "100%", after: "40%", pct: 60 },
    { label: "Google search ranking", before: "Not listed", after: "Page 1", pct: 90 },
    { label: "Booking platform commission", before: "15–25%", after: "₹0 direct", pct: 75 },
  ],
  faqs: [
    { q: "Do you only work with hotels in Rajasthan?", a: "No — Jaisalmer was our first hospitality project but we work with hotels, resorts, homestays, and boutique properties across India. The digital needs are universal." },
    { q: "Can the booking system handle multiple room types and seasonal pricing?", a: "Yes. We build flexible inventory management with per-room pricing, seasonal rates, minimum stay rules, and blackout dates. You control everything from a simple dashboard." },
    { q: "How do you handle the transition from OTAs to direct bookings?", a: "We build the direct channel first, then help you phase down OTA dependency over 3–6 months without losing revenue. It's a gradual shift, not a cliff." },
    { q: "What about integrating with existing property management software?", a: "We can integrate with most PMS tools via API. If you're on a custom system, we build a lightweight sync layer. We scope this out in the discovery call." },
  ],
  ctaTitle: "Want a booking platform for your property?",
  ctaSub: "We build hospitality websites that convert browsers into guests — and keep them coming back direct, not via OTAs.",
  ctaMessage: "Hi, I run a hotel/resort and I'd like to discuss a direct booking website.",
  accentColor: "#f59e0b",
  accentBg: "rgba(245,158,11,0.06)",
};

export default function HospitalityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/industry/hospitality/#breadcrumb",
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
            "name": "Hospitality",
            "item": "https://shaibya.solutions/industry/hospitality"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/industry/hospitality/#service",
        "name": "Hospitality Booking Platforms & Custom Hotel Website Engineering",
        "description": "Learn how we build boutique hotel booking platforms, reservation engines, and custom property portals.",
        "provider": {
          "@type": "Organization",
          "name": "Shaibya Solutions"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryPageTemplate data={data} />
    </>
  );
}

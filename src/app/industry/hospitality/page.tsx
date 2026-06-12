"use client";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

const data: IndustryPageData = {
  slug: "hospitality",
  eyebrow: "Hospitality",
  heroImage: "/images/solutions/sonarkilla.png",
  headline: ["From phone calls to", "online bookings."],
  heroSub:
    "A Jaisalmer heritage hotel had zero online presence. We built a stunning booking platform that put them on Google Page 1 and tripled their online bookings within 60 days.",
  heroStats: [
    { value: "3×", label: "Online Bookings" },
    { value: "60%", label: "Fewer Phone Calls" },
    { value: "Page 1", label: "Google Ranking" },
    { value: "60 days", label: "Time to Results" },
  ],
  contextChapter: {
    label: "The Story",
    paragraphs: [
      "Sonar Killa Tours had an incredible product — a boutique heritage property right by Jaisalmer Fort, with loyal returning guests and glowing word-of-mouth reviews. But <strong>every single booking happened over phone.</strong>",
      "Travelers searching &ldquo;heritage hotel Jaisalmer&rdquo; on Google found nothing. Booking.com and MakeMyTrip weren't the right fit — they wanted to tell their own story, own their guest relationships, and avoid the 15–25% commission cut.",
      "They needed a <strong>direct booking platform that matched the hotel's character.</strong> Something that made you feel the sand and the fort through a screen.",
    ],
    pullQuote:
      "3× online bookings, Page 1 Google ranking, and 60% fewer phone calls — all in 60 days.",
  },
  painPoints: [
    { emoji: "📵", title: "Phone-Only Bookings", desc: "100% of reservations over phone. Miss a call — miss a booking. No way to capture after-hours inquiries." },
    { emoji: "🌐", title: "Zero Online Visibility", desc: "No website, no Google Business profile. Travelers searching online found competitors instead." },
    { emoji: "🖼️", title: "No Visual Storytelling", desc: "The property's beauty was invisible online. No photo galleries, no virtual tours, no atmosphere conveyed." },
    { emoji: "💸", title: "OTA Commission Drain", desc: "Third-party platforms eat 15–25% per booking. The hotel needed a direct channel to protect margin." },
    { emoji: "⭐", title: "Unmanaged Reviews", desc: "Positive guest experiences weren't being captured as reviews. No systematic way to build trust online." },
  ],
  solutions: [
    { emoji: "🏰", title: "Visual Booking Website", desc: "Immersive website with room showcases, rich photo galleries, and a direct booking flow built for heritage properties." },
    { emoji: "🔍", title: "Local SEO", desc: "Optimised for 'heritage hotel Jaisalmer', 'boutique hotel near Jaisalmer Fort', and 20+ related queries. Page 1 in 60 days." },
    { emoji: "💬", title: "WhatsApp Booking Flow", desc: "Instant booking confirmation and pre-arrival information via WhatsApp. Guests love the personal touch." },
    { emoji: "📸", title: "Rich Media Galleries", desc: "Professional photography integration, virtual walkthroughs, and room comparison pages that convert browsers to bookers." },
    { emoji: "⭐", title: "Review Management", desc: "Automated post-stay review requests via WhatsApp and email. Systematic trust building across Google, TripAdvisor." },
    { emoji: "📊", title: "Booking Analytics", desc: "See where your guests come from, which room types convert best, and track direct-vs-OTA revenue split in real-time." },
  ],
  clients: [
    {
      name: "Sonar Killa Tours",
      site: "sonarkilla.com",
      tag: "Featured",
      role: "Boutique Heritage Hotel Platform",
      desc: "Phone-only bookings to a <strong>fully self-serve online experience.</strong> We built an immersive heritage hotel website with room-by-room photography, an integrated direct booking system, WhatsApp confirmation flow, and local SEO targeting every high-intent Jaisalmer search. The result: 3× online bookings, 60% fewer inbound calls, and a Page 1 Google ranking — in 60 days.",
      image: "/images/solutions/sonarkilla.png",
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
  return <IndustryPageTemplate data={data} />;
}

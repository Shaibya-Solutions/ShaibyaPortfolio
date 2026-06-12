"use client";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

const data: IndustryPageData = {
  slug: "fashion-tech",
  eyebrow: "Startups & R&D",
  heroImage: "/images/solutions/memorybox.png",
  headline: ["From a phone note to", "a live platform."],
  heroSub:
    "A student walked up with nothing but a plan — fashion delivered in minutes, like food delivery but for clothes. We built the entire platform from scratch and launched in 4 weeks.",
  heroStats: [
    { value: "4 wks", label: "Idea to Launch" },
    { value: "3+", label: "MVPs Built" },
    { value: "100%", label: "Digital-First" },
    { value: "Live", label: "Platform Status" },
  ],
  contextChapter: {
    label: "The Idea",
    paragraphs: [
      "Most startup stories start with a deck. This one started with a DM. A college student in Nagpur had an idea: <strong>fashion delivered in minutes,</strong> the way food delivery works — but for clothes. Rental, fast delivery, returns handled. No investor backing. No tech team. Just a vision and urgency.",
      "They needed a partner who could move fast, validate the idea technically, and build something real — not a 6-month agency engagement. They needed <strong>someone who builds with founders, not for them.</strong>",
      "We went from napkin sketch to live platform in 4 weeks. Every decision was made in the open — architecture, UX, pricing model, and post-launch growth strategy.",
    ],
    pullQuote:
      "From a phone note to a live, working platform in 4 weeks. No compromises on quality.",
  },
  painPoints: [
    { emoji: "💡", title: "Vision Without Tech", desc: "Great idea, no engineering team. Couldn't move fast enough alone to validate before a competitor did." },
    { emoji: "🌐", title: "No Digital Platform", desc: "Zero online presence — no way for customers to discover, browse, or place orders." },
    { emoji: "📱", title: "WhatsApp Order Management", desc: "Manual DM-based orders. Unscalable, error-prone, and impossible to track or fulfil reliably." },
    { emoji: "💳", title: "No Payment Integration", desc: "Cash-only or bank transfer. High friction, no refund flow, no transaction records." },
    { emoji: "⏰", title: "Speed to Market", desc: "Every week of delay is a week for competitors. The idea needed to ship fast, learn fast, and iterate." },
  ],
  solutions: [
    { emoji: "🚀", title: "Rapid MVP Development", desc: "We scope the tightest possible v1 — just enough to validate the core value, nothing more. Ship in weeks, not months." },
    { emoji: "🛍️", title: "Product Listing Platform", desc: "Clean, mobile-first catalog with categories, search, availability, and rental/purchase flows built in." },
    { emoji: "🔄", title: "Automated Order Flow", desc: "End-to-end order management: placement, confirmation, delivery assignment, return tracking — zero manual steps." },
    { emoji: "💳", title: "Payment Gateway Integration", desc: "UPI, cards, and wallets. Instant confirmation, automated receipts, and a clean refund flow." },
    { emoji: "📦", title: "Delivery & Logistics Layer", desc: "Built-in delivery zone management, ETA calculation, and rider assignment dashboard for fast local fulfillment." },
    { emoji: "📈", title: "Growth Analytics", desc: "Track orders, revenue, top products, cart abandonment, and customer retention from day one. Build on data." },
  ],
  clients: [
    {
      name: "Snyppit",
      tag: "Featured",
      role: "Fashion Delivery Platform",
      desc: "The founding story. <strong>A student, a idea, and 4 weeks.</strong> We built Snyppit's complete platform from zero: product catalog, rental and purchase flows, delivery management, payment integration, order tracking, and a customer-facing mobile-first website. The platform went live on schedule and started taking real orders in week 5.",
      image: "/images/solutions/memorybox.png",
      stats: [{ v: "4 wks", l: "Idea to Live" }, { v: "Live", l: "Status" }, { v: "100%", l: "Digital-First" }],
    },
    {
      name: "MemoryBox",
      tag: "Case Study 02",
      role: "Personal Archive Platform",
      desc: "A personal memory archiving startup — photos, videos, and voice notes organized into a beautiful timeline. We built the full platform with cloud storage integration, family sharing, and a subscription billing model. <strong>From concept to production in under 4 weeks.</strong>",
      image: "/images/solutions/memorybox.png",
      stats: [{ v: "3 wks", l: "To Production" }, { v: "Cloud", l: "Storage Layer" }, { v: "SaaS", l: "Billing Model" }],
    },
    {
      name: "Sonar Killa Heritage Portal",
      tag: "Case Study 03",
      role: "Startup-Speed Website Build",
      desc: "A boutique heritage hotel owner who wanted their digital presence done right — beautiful, fast, and direct-booking-capable. We moved at startup speed: <strong>design, build, and launch in 3 weeks.</strong> 3× online bookings followed within 60 days.",
      image: "/images/solutions/sonarkilla.png",
      stats: [{ v: "3×", l: "Online Bookings" }, { v: "3 wks", l: "Build Time" }, { v: "Page 1", l: "Google" }],
    },
  ],
  transformations: [
    { label: "Time to market", before: "Months (solo)", after: "4 weeks", pct: 90 },
    { label: "Order management efficiency", before: "Manual WhatsApp", after: "Fully automated", pct: 85 },
    { label: "Payment collection friction", before: "Cash / transfer", after: "Instant digital", pct: 80 },
    { label: "Platform scalability", before: "Zero", after: "Production-ready", pct: 95 },
  ],
  faqs: [
    { q: "Do we work with first-time founders with no tech background?", a: "That's our most common client. We translate your vision into technical decisions, guide you through tradeoffs, and build with transparency at every step." },
    { q: "What if the idea changes after we start building?", a: "It almost always does. We build in 1-week sprints so we can pivot based on real feedback. The architecture is kept flexible for exactly this reason." },
    { q: "What happens after the MVP launches?", a: "We stay involved for the growth phase — analytics, feature prioritisation, performance optimisation, and scaling infrastructure as you grow." },
    { q: "What tech stack do you use?", a: "Next.js, React, Node.js, and a PostgreSQL or Firebase backend depending on the use case. We pick what's right for the product, not what's trendy." },
  ],
  ctaTitle: "Got a startup idea? Let's build it.",
  ctaSub: "We build with founders from day zero. Fast, lean, and production-quality. Let's prototype it together.",
  ctaMessage: "Hi, I have a startup idea and I'd like to discuss building an MVP with your team.",
  accentColor: "#c084fc",
  accentBg: "rgba(192,132,252,0.06)",
};

export default function FashionTechPage() {
  return <IndustryPageTemplate data={data} />;
}

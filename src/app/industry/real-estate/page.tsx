import type { Metadata } from "next";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Real Estate CRM & Property Listing Websites | Shaibya Solutions",
  description: "Learn how we build RERA-compliant property listing websites, lead pipelines, and real estate CRM integrations. Discover how MG Infra tripled lead capture.",
  alternates: {
    canonical: "https://shaibya.solutions/industry/real-estate",
  },
  openGraph: {
    title: "Real Estate CRM & Property Listing Websites | Shaibya Solutions",
    description: "Learn how we build RERA-compliant property listing websites, lead pipelines, and real estate CRM integrations.",
    url: "https://shaibya.solutions/industry/real-estate",
    type: "website",
  },
};

const data: IndustryPageData = {
  slug: "real-estate",
  eyebrow: "Real Estate",
  heroImage: "/images/screenshots/mg-infra.png",
  headline: ["From WhatsApp groups to", "a digitized sales funnel."],
  heroSub:
    "How we transformed MG Infra Properties — a top residential developer in Nagpur — replacing messy WhatsApp groups with automated lead pipelines, boosting listing visibility, and tripling lead capture rates.",
  heroStats: [
    { value: "Nagpur", label: "Client Location" },
    { value: "3×", label: "Lead Capture Rate" },
    { value: "0", label: "Missed Inquiries" },
    { value: "70%", label: "Faster Response" },
  ],
  contextChapter: {
    label: "The Problem",
    paragraphs: [
      "Real estate agents and developers in Nagpur are some of the most dynamic business minds in the city. They manage multi-crore transactions, coordinate client visits, and close deals — <strong>all on WhatsApp groups.</strong>",
      "Listing files are scattered across chats, payment schedules are stored in random notes, and half the inquiries get buried in inbox noise. By the time someone replies, the lead has already contacted a competitor.",
      "That was the reality before we stepped in. <strong>We built a system that lets them manage scale without losing control.</strong>",
    ],
    pullQuote:
      "Bringing structured digital systems to Nagpur's real estate market, capturing every single lead.",
  },
  painPoints: [
    { emoji: "📱", title: "Buried WhatsApp Leads", desc: "Leads arriving in WhatsApp chats and getting buried in chat noise — leading to missed follow-ups.", image: "/images/landing/bento_threat_intelligence.png" },
    { emoji: "📁", title: "Scattered Listing Data", desc: "Property documents, layout maps, and pricing details spread across multiple phones and chat groups." },
    { emoji: "⏰", title: "Slow Response Times", desc: "Taking hours or days to answer basic questions about availability or pricing, losing buyers to competitors." },
    { emoji: "📑", title: "RERA Compliance Friction", desc: "Ensuring all marketing material, disclosures, and registration details match regulatory standards manually." },
    { emoji: "📊", title: "Zero Lead Tracking", desc: "No central database of buyers, pending visits, or agent performance. No forecastable pipeline." },
  ],
  solutions: [
    { emoji: "🖥️", title: "Property Listing Website", desc: "Professional listing portal with category filters, location maps, and interactive layouts." },
    { emoji: "📅", title: "Lead Management CRM", desc: "Unified database for client details, requirements, site visits, and agent assignments." },
    { emoji: "🚀", title: "WhatsApp CRM Integration", desc: "Automated responses, property detail shares, and site-visit confirmation alerts." },
    { emoji: "⚖️", title: "RERA Compliance Layer", desc: "Built-in fields for registration disclosures and compliant layout structures across listings." },
    { emoji: "📂", title: "Centralized Document Hub", desc: "One cloud repository for layout maps, brochures, and legal disclosures — shareable in 1 click." },
    { emoji: "📈", title: "Agent Analytics", desc: "Track lead distribution, call response rates, and monthly conversion metrics in one dashboard." },
  ],
  clients: [
    {
      name: "MG Infra Properties",
      site: "mginfraproperties.in",
      tag: "Case Study 01",
      role: "Residential & Commercial",
      desc: "When we met MG Infra, <strong>100% of their listing management happened in WhatsApp groups.</strong> Buyers would message, get lost in the chat noise, and within hours would be calling a competitor. We built a full property listing website with lead capture forms, area-wise filters, and CRM integration. For the first time, every inquiry had a name, a number, a timestamp, and a follow-up status.",
      image: "/images/screenshots/mg-infra.png",
      stats: [{ v: "3×", l: "Lead Capture" }, { v: "0", l: "Missed Inquiries" }, { v: "70%", l: "Faster Response" }],
    },
    {
      name: "Parmatma Ek Real Estate",
      site: "parmatmaekrealestate.com",
      tag: "Case Study 02",
      role: "Residential Listings",
      desc: "Zero digital presence. <strong>100% referral dependency.</strong> Parmatma Ek was an established name in the Nagpur property circle — but only if you already knew them. We built a conversion-optimized website with neighbourhood guides, WhatsApp lead capture, and local SEO targeting searches like &ldquo;2BHK near Dharampeth&rdquo; and &ldquo;plots near MIHAN.&rdquo; Organic leads doubled within 3 months.",
      image: "/images/screenshots/parmatma-ek.png",
      stats: [{ v: "2×", l: "Organic Leads" }, { v: "50%", l: "Traffic Growth" }, { v: "Page 1", l: "Google Ranking" }],
    },
    {
      name: "Pushkarna Properties",
      tag: "Case Study 03",
      role: "Luxury Residential",
      desc: "A premium Nagpur builder with no digital lead funnel. We designed a high-conversion listing portal with virtual tour embeds, neighbourhood ROI guides, and a WhatsApp-first inquiry flow. Lead response time dropped from days to minutes, and the sales team stopped spending mornings chasing missed messages.",
      image: "/images/solutions/pushkarna.png",
      stats: [{ v: "100%", l: "Digitized Workflow" }, { v: "40%", l: "Time Saved Weekly" }],
    },
  ],
  transformations: [
    { label: "Lead response time", before: "Hours / Days", after: "< 5 minutes", pct: 90 },
    { label: "Inquiry capture rate", before: "~40%", after: "100%", pct: 85 },
    { label: "Organic website traffic", before: "0", after: "2,000+ / mo", pct: 75 },
    { label: "Document retrieval time", before: "Hours", after: "Seconds", pct: 80 },
  ],
  faqs: [
    { q: "How long does it take to build a real estate website?", a: "Most property listing websites go live in 2–3 weeks. With CRM and automation, add 1–2 more. We give a clear timeline on the first call." },
    { q: "What does it cost?", a: "A professional property website starts around ₹30,000–50,000. Full CRM + lead automation ranges ₹1–2 lakh. Transparent quotes upfront, no hidden costs." },
    { q: "Can you handle RERA requirements?", a: "Yes. Our websites include RERA disclosures, project registration numbers, and compliant advertisement formatting as required by law." },
    { q: "Do you provide ongoing support?", a: "Every project includes 30 days of free support. After that, affordable monthly plans cover content updates, lead system maintenance, and performance optimisation." },
  ],
  ctaTitle: "Ready to stop losing leads to WhatsApp noise?",
  ctaSub: "The audit takes 30 minutes. The results show up within 30 days. Book yours before we hit capacity for this quarter.",
  ctaMessage: "Hi, I run a real estate agency and I'd like to discuss a digital lead system.",
  accentColor: "#0ea5e9",
  accentBg: "rgba(14,165,233,0.06)",
};

export default function RealEstatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/industry/real-estate/#breadcrumb",
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
            "name": "Real Estate",
            "item": "https://shaibya.solutions/industry/real-estate"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/industry/real-estate/#service",
        "name": "Real Estate CRM & Compliant Website Engineering",
        "description": "Learn how we build RERA-compliant property listing websites, lead pipelines, and real estate CRM integrations.",
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

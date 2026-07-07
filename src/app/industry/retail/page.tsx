import type { Metadata } from "next";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Retail & E-commerce Operations Systems | Shaibya Solutions",
  description: "Learn how we build digital showrooms, GST-compliant POS systems, and retail inventory management solutions. Discover how Bridgestone Nagpur expanded their reach.",
  alternates: {
    canonical: "https://shaibya.solutions/industry/retail",
  },
  openGraph: {
    title: "Retail & E-commerce Operations Systems | Shaibya Solutions",
    description: "Learn how we build digital showrooms, GST-compliant POS systems, and retail inventory management solutions.",
    url: "https://shaibya.solutions/industry/retail",
    type: "website",
  },
};

const data: IndustryPageData = {
  slug: "retail",
  eyebrow: "Retail",
  heroImage: "/images/screenshots/bridgestone-nagpur.png",
  headline: ["From local showrooms to", "an online catalog."],
  heroSub:
    "How we transformed Bridgestone Nagpur — the leading tire dealer in the region — replacing offline-only catalogs with a digital product showroom, expanding customer reach, and boosting inquiries.",
  heroStats: [
    { value: "Nagpur", label: "Client Location" },
    { value: "5×", label: "Reach Beyond City" },
    { value: "40%", label: "More Inquiries" },
    { value: "Live", label: "Catalog Status" },
  ],
  contextChapter: {
    label: "The Problem",
    paragraphs: [
      "Retail showrooms in Nagpur have a massive selection of inventory. They stock major global brands, different sizes, models, specs, and price points.",
      "But their customer reach is limited to walk-in traffic and word-of-mouth. <strong>They have no digital showroom,</strong> meaning customers have to visit in person just to see if a model is in stock or ask for a price quote.",
      "We built a digital catalog that brings the entire showroom to the customer's phone screen, making discovery frictionless.",
    ],
    pullQuote:
      "Bringing Nagpur's leading tire dealer online, connecting inventory directly to buyer inquiries.",
  },
  painPoints: [
    { emoji: "🏪", title: "Walk-in Only Traffic", desc: "Showroom reach is limited to physical visitors and nearby areas. Out-of-city buyers are ignored." },
    { emoji: "📞", title: "Manual Inquiry Clog", desc: "Answering repetitive phone questions about tyre availability, size specs, and brand options." },
    { emoji: "📓", title: "No Digital Showroom", desc: "No way for customers to browse the inventory or see product specifications online before visiting." },
    { emoji: "🔍", title: "Invisible to Search", desc: "Nagpur car owners searching online for 'Bridgestone tyres Nagpur' couldn't find the showroom on page 1." },
    { emoji: "📊", title: "Scattered Stock Records", desc: "Product updates and new stock arrivals not synced to the sales team's marketing channels instantly." },
  ],
  solutions: [
    { emoji: "🖥️", title: "Digital Product Catalog", desc: "Clean, responsive portal with brand filtering, spec searches, and direct enquiry forms." },
    { emoji: "🚀", title: "Showroom SEO Package", desc: "Google Business and local search keyword optimization to rank for auto queries in Nagpur." },
    { emoji: "💬", title: "WhatsApp Inquiry Flow", desc: "Customers browse the catalog, click a product, and enquire directly on WhatsApp with the spec attached." },
    { emoji: "📂", title: "Dynamic Inventory CMS", desc: "Let non-tech showroom staff add new arrivals, update specs, and change pricing in a couple of clicks." },
    { emoji: "📄", title: "Digital Quote Sheets", desc: "Generate PDF quotes and spec sheets directly from the catalog to share with corporate accounts." },
    { emoji: "📈", title: "Showroom Analytics", desc: "Track page views, top searched tire sizes, and monthly WhatsApp inquiry rates to forecast stock." },
  ],
  clients: [
    {
      name: "Bridgestone Nagpur",
      tag: "Featured",
      role: "Digital showroom",
      desc: "The leading tire dealer in the region. We built a <strong>responsive digital catalog</strong> showcasing Bridgestone's product lineup with filter specs (width, aspect ratio, rim size). Customers browse on mobile, select tires, and submit inquiries directly. Within 90 days, customer reach expanded 5× beyond Nagpur city limits.",
      image: "/images/screenshots/bridgestone-nagpur.png",
      stats: [{ v: "40%", l: "More Inquiries" }, { v: "5×", l: "Reach Beyond Nagpur" }, { v: "90 days", l: "To Results" }],
    },
    {
      name: "Dairy Distribution System",
      tag: "Case Study 02",
      role: "FMCG Digital Operations",
      desc: "A Nagpur dairy distributor managing hundreds of SKUs across dozens of retailers — entirely on paper. We digitized their route management, delivery tracking, payment reconciliation, and inventory alerts. <strong>100% digitized records, zero payment disputes,</strong> and 30% faster collections cycle.",
      image: "/images/solutions/gym.png",
      stats: [{ v: "100%", l: "Digitized Workflow" }, { v: "0", l: "Payment Disputes" }, { v: "30%", l: "Faster Collections" }],
    },
    {
      name: "Smart Shop POS System",
      tag: "Case Study 03",
      role: "GST-Compliant POS & Inventory",
      desc: "A retail chain needing a unified POS system across multiple shop locations. One dashboard, consistent GST billing, cross-location inventory visibility, and a daily sales report delivered to the owner's WhatsApp every evening. <strong>50% faster billing</strong> and complete stock visibility from day one.",
      image: "/images/solutions/memorybox.png",
      stats: [{ v: "50%", l: "Faster Billing" }, { v: "100%", l: "Stock Visibility" }, { v: "3", l: "Locations" }],
    },
  ],
  transformations: [
    { label: "Customer reach beyond city", before: "Local walk-in only", after: "5× beyond Nagpur", pct: 82 },
    { label: "Monthly product inquiries", before: "Walk-in baseline", after: "+40%", pct: 65 },
    { label: "Billing speed", before: "Manual, slow", after: "50% faster", pct: 70 },
    { label: "Inventory visibility", before: "~30% accurate", after: "100% real-time", pct: 90 },
  ],
  faqs: [
    { q: "Do I need to change how I currently manage stock?", a: "No big rip-and-replace. We build on top of your existing flow and digitize it incrementally. Most businesses are fully live within 2–3 weeks with zero disruption." },
    { q: "Can the catalog go online and also work in-store?", a: "Yes. The same product database powers your website, your in-store display screens (if you have them), and your WhatsApp inquiry responses — one update, everywhere." },
    { q: "Is the GST billing compliant with the latest rules?", a: "Always. We keep the billing module updated as GST rules change. You don't need to track amendments — we do that for you." },
    { q: "What if my products change frequently?", a: "We give you a simple CMS to add, remove, and update products yourself. No technical knowledge needed. Changes go live instantly." },
  ],
  ctaTitle: "Ready to modernize your retail business?",
  ctaSub: "From POS systems to digital showrooms — the audit is free and the transformation starts in week one.",
  ctaMessage: "Hi, I run a retail business and I'd like to discuss a digital catalog and POS system.",
  accentColor: "#10b981",
  accentBg: "rgba(16,185,129,0.06)",
};

export default function RetailPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/industry/retail/#breadcrumb",
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
            "name": "Retail",
            "item": "https://shaibya.solutions/industry/retail"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/industry/retail/#service",
        "name": "Retail POS Systems & Online Digital Catalogues",
        "description": "Learn how we build digital showrooms, GST-compliant POS systems, and retail inventory management solutions.",
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

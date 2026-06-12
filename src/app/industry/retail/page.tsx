"use client";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

const data: IndustryPageData = {
  slug: "retail",
  eyebrow: "Retail & FMCG",
  heroImage: "/images/screenshots/touchwood.png",
  headline: ["From registers to", "real-time visibility."],
  heroSub:
    "How we brought Nagpur retail businesses into the digital age — paper-based billing to smart POS, beautiful digital catalogs, and complete stock visibility across every SKU.",
  heroStats: [
    { value: "3+", label: "Retail Clients" },
    { value: "40%", label: "More Inquiries" },
    { value: "5×", label: "Geographic Reach" },
    { value: "50%", label: "Faster Billing" },
  ],
  contextChapter: {
    label: "The Gap",
    paragraphs: [
      "Nagpur has incredible retail businesses — premium furniture makers, FMCG distributors, and specialty shops with decades of craftsmanship and reputation. But their <strong>operations ran entirely on paper.</strong>",
      "The catalog existed only in the showroom. The inventory was on a register that nobody trusted. Billing was a manual calculator, a carbon-copy receipt, and a hope that the math was right.",
      "Customers five kilometers away didn't know they existed. And customers standing in the showroom left without buying because the item they wanted was &ldquo;out of stock&rdquo; — except it wasn't, it was just <strong>invisible in the system.</strong>",
    ],
    pullQuote:
      "Touchwood Furnitech went from Nagpur-only to 5× geographic reach — without opening a single new location.",
  },
  painPoints: [
    { emoji: "🖼️", title: "Showroom-Only Catalog", desc: "Products only visible in person. No way for customers to browse, shortlist, or share before visiting." },
    { emoji: "📋", title: "Inventory on Paper", desc: "Stock levels guessed, never known. Over-ordering, stockouts, and missed sales every week." },
    { emoji: "🧮", title: "Manual Calculator Billing", desc: "Slow, error-prone billing with no GST automation. Every invoice is a risk of a calculation mistake." },
    { emoji: "📍", title: "Local Walk-ins Only", desc: "Business limited to whoever already knows you. No digital funnel to reach customers across Nagpur and beyond." },
    { emoji: "💬", title: "Payment Disputes", desc: "Manual records meant disputes over what was paid, what was owed, and what was returned. Time-consuming and damaging to trust." },
  ],
  solutions: [
    { emoji: "🛋️", title: "Digital Product Catalog", desc: "Beautiful online catalog with category filters, high-res images, and WhatsApp inquiry buttons on every product." },
    { emoji: "📦", title: "Real-Time Inventory", desc: "Live stock levels across all SKUs. Automated low-stock alerts. No more guessing what's available." },
    { emoji: "🧾", title: "GST-Compliant POS", desc: "Automated GST calculation, instant invoicing, digital receipts, and a complete billing history. Zero manual errors." },
    { emoji: "🌍", title: "WhatsApp Commerce", desc: "Product inquiries, price quotes, and order confirmations via WhatsApp — extending reach far beyond the showroom." },
    { emoji: "📊", title: "Sales Analytics", desc: "Top-selling products, seasonal trends, revenue by category, and customer purchase history. Data you can act on." },
    { emoji: "🔄", title: "Returns & Dispute Management", desc: "Complete transaction history with digital proof. Resolve disputes in seconds, not hours." },
  ],
  clients: [
    {
      name: "Touchwood Furnitech",
      site: "touchwoodfurnitech.com",
      tag: "Featured",
      role: "Premium Digital Showroom",
      desc: "A premium furniture manufacturer with stunning work and <strong>zero online presence beyond a phone number.</strong> We built an elegant digital showroom with high-resolution product galleries, category filtering, and WhatsApp inquiry flows for every piece. Within 90 days, 40% more inquiries — and 5× the geographic reach beyond Nagpur city limits.",
      image: "/images/screenshots/touchwood.png",
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
  return <IndustryPageTemplate data={data} />;
}

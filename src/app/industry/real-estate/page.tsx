"use client";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

const data: IndustryPageData = {
  slug: "real-estate",
  eyebrow: "Real Estate",
  heroImage: "/images/screenshots/parmatma-ek.png",
  headline: ["Nagpur's property market", "is booming. Are you?"],
  heroSub:
    "22% sales surge. ₹50,000 crore infrastructure pipeline. MIHAN SEZ. Metro expansion. Local agents desperately need digital systems — not just WhatsApp groups.",
  heroStats: [
    { value: "22%", label: "Sales Surge in Nagpur" },
    { value: "3", label: "Live Clients" },
    { value: "₹50,000 Cr", label: "Infrastructure Pipeline" },
    { value: "70%", label: "Faster Lead Response" },
  ],
  contextChapter: {
    label: "The Market",
    paragraphs: [
      "Nagpur is having a moment. With <strong>MIHAN SEZ, metro expansion, and a ₹50,000 crore infrastructure pipeline</strong>, property inquiries are flooding in from Pune, Mumbai, and Hyderabad.",
      "And yet, local agents were managing it all on WhatsApp. Leads disappearing. Site visits forgotten. Agreements buried in group chats. The <strong>22% sales surge</strong> was creating more chaos than opportunity.",
      "That's where we came in. Not to build a fancy website. To build the <strong>infrastructure that turns inquiries into income.</strong>",
    ],
    pullQuote:
      "The market was exploding, but the agents handling it had no systems to capture it.",
  },
  painPoints: [
    { emoji: "🌐", title: "No Digital Presence", desc: "Buyers search online first — if you're not there, you're invisible. Competitors with basic sites were absorbing every lead." },
    { emoji: "⏰", title: "Lost Leads on WhatsApp", desc: "Leads message at 2 AM. By 9 AM they've already contacted a competitor. No tracking, no follow-up system." },
    { emoji: "📊", title: "No CRM", desc: "Client data across registers, phones, and chats. No way to know which leads are hot or where revenue is leaking." },
    { emoji: "📁", title: "Document Chaos", desc: "Agreements, KYC, and property papers scattered across WhatsApp groups. Finding one document takes hours." },
    { emoji: "🔔", title: "Manual Follow-ups", desc: "Site visit reminders were manual. Re-engaging old leads was impossible. Good opportunities slipped through every week." },
  ],
  solutions: [
    { emoji: "🏠", title: "SEO-Optimized Website", desc: "Property listing site with search filters, area-wise browsing, and Google ranking for local searches. Buyers find you first." },
    { emoji: "💬", title: "Lead Capture → CRM", desc: "Every inquiry from website, WhatsApp, or social media automatically enters a CRM pipeline. Zero missed inquiries." },
    { emoji: "🤖", title: "Follow-up Automation", desc: "Automated WhatsApp/email follow-ups. No lead falls through the cracks. Re-engagement for cold leads built in." },
    { emoji: "📅", title: "Site Visit Scheduler", desc: "Clients book site visits directly. Confirmation and reminder messages sent automatically to both parties." },
    { emoji: "🗂️", title: "Document Management", desc: "All agreements, KYC, and property papers organised digitally. Accessible anywhere, searchable instantly." },
    { emoji: "💰", title: "Commission Dashboard", desc: "Track deals, commissions, and revenue in real-time. Know exactly where your money is at any given moment." },
  ],
  visualShowcase: {
    beforeSrc: "/images/real-estate/room-before.png",
    afterSrc: "/images/real-estate/room-after.png",
    heading: "First impressions\nclosed the deal.",
    subheading:
      "Buyers form opinions in seconds. Professional digital staging and presentation transforms bare listings into aspirational homes — before a single site visit happens.",
  },
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
  ctaMessage: "Hi, I am a real estate agent in Nagpur and I'd like a free 30-min digital audit.",
  accentColor: "#0ea5e9",
  accentBg: "rgba(14,165,233,0.06)",
};

export default function RealEstatePage() {
  return <IndustryPageTemplate data={data} />;
}

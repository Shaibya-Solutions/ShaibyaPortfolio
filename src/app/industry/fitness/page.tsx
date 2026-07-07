import type { Metadata } from "next";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Fitness & Gym Management Systems | Shaibya Solutions",
  description: "Automate your gym operations, track attendance, send WhatsApp renewal alerts, and manage billing. Discover how Revolution Fitness automated their ops.",
  alternates: {
    canonical: "https://shaibya.solutions/industry/fitness",
  },
  openGraph: {
    title: "Fitness & Gym Management Systems | Shaibya Solutions",
    description: "Automate your gym operations, track attendance, send WhatsApp renewal alerts, and manage billing.",
    url: "https://shaibya.solutions/industry/fitness",
    type: "website",
  },
};

const data: IndustryPageData = {
  slug: "fitness",
  eyebrow: "Fitness",
  heroImage: "/images/solutions/gym.png",
  headline: ["From registers to", "a real business."],
  heroSub:
    "How we transformed 5 fitness businesses in Nagpur — replacing manual ops with integrated gym management, boosting members, and cutting admin overhead by 80%.",
  heroStats: [
    { value: "5", label: "Gym Brands Automated" },
    { value: "350", label: "Members (from 120)" },
    { value: "80%", label: "Admin Time Saved" },
    { value: "30%", label: "Revenue Growth MoM" },
  ],
  contextChapter: {
    label: "The Problem",
    paragraphs: [
      "Gym owners in Nagpur are some of the hardest-working entrepreneurs in the city. They're up at 5 AM, training clients, managing staff, collecting fees — <strong>all manually, all day.</strong>",
      "The register has 200 member names. Half have outdated payment dates. The WhatsApp group has 150 unread messages. The trainer didn't show up. And someone's asking for a fee receipt from March.",
      "That was the reality before we stepped in. <strong>The work was there. The system wasn't.</strong>",
    ],
    pullQuote:
      "Revolution Fitness grew 120 → 350 members. The system is ready for your gym.",
  },
  painPoints: [
    { emoji: "📓", title: "Pen & Register Attendance", desc: "Manual daily attendance tracking — error-prone, unsearchable, and impossible to act on for retention insights.", image: "/images/fitness/fit_pain_1.png" },
    { emoji: "💬", title: "WhatsApp Reminders", desc: "Sending individual payment reminders every month is a full-time job. Members ignore them. Revenue leaks silently.", image: "/images/landing/bento_threat_intelligence.png" },
    { emoji: "🔮", title: "Zero Churn Prediction", desc: "No idea which members are about to leave until they already have. Re-engagement happens too late, if at all.", image: "/images/landing/bento_cloud_security.png" },
    { emoji: "📊", title: "No Revenue Visibility", desc: "Monthly revenue is unknown until someone counts receipts at month-end. No dashboard, no forecasting.", image: "/images/landing/bento_compliance_audits.png" },
    { emoji: "🏃", title: "Owner Does Everything", desc: "The owner is the receptionist, accountant, trainer scheduler, and marketer. Growth is impossible under this model.", image: "/images/landing/bento_incident_response.png" },
  ],
  solutions: [
    { emoji: "📱", title: "Digital Check-in System", desc: "QR or phone-based attendance. Real-time tracking, automated logs, and retention analytics built in." },
    { emoji: "🔔", title: "Auto Renewal Reminders", desc: "WhatsApp reminders sent automatically before membership expires. Payment links included. Zero manual effort." },
    { emoji: "📈", title: "Churn Prediction Alerts", desc: "Flag members who haven't checked in recently. Automated re-engagement messages before they cancel." },
    { emoji: "💳", title: "Payment Dashboard", desc: "Real-time revenue, pending dues, renewal forecasts — all in one screen. Updated the moment a payment lands." },
    { emoji: "📅", title: "Trainer Scheduling", desc: "Assign trainers, manage shift rotations, and track client-trainer relationships automatically." },
    { emoji: "🏢", title: "Multi-Branch Support", desc: "One dashboard for all gym locations. Unified billing, cross-branch reporting, and staff management." },
  ],
  clients: [
    {
      name: "Revolution Fitness",
      tag: "Featured",
      role: "Full-stack transformation",
      desc: "The flagship story. <strong>120 members, pen-and-paper everything, owner spending 8 hours a day on admin.</strong> We built a complete digital backbone: website, membership system, attendance tracking, automated renewals, and a WhatsApp bot for new leads. Six months later — 350 active members, 80% less admin time, and the owner is back to actually coaching.",
      image: "/images/screenshots/revolution-fitness.png",
      stats: [{ v: "120→350", l: "Members" }, { v: "80%", l: "Admin Time Saved" }, { v: "6 mo", l: "To Results" }],
    },
    {
      name: "FitManage 360",
      tag: "Case Study 02",
      role: "Gym Management System",
      desc: "A purpose-built gym management platform for growing multi-trainer gyms. <strong>Attendance, renewals, payments, trainer scheduling, and revenue dashboards</strong> — all in one system. Built for gyms that are serious about scaling beyond their first location.",
      image: "/images/solutions/fitlife.png",
      stats: [{ v: "5+", l: "Gyms Live" }, { v: "100%", l: "Renewals Automated" }, { v: "0", l: "Payment Disputes" }],
    },
    {
      name: "Multi-Branch Gym Platform",
      tag: "Case Study 03",
      role: "Enterprise Fitness Ops",
      desc: "Designed for gym chains managing multiple locations with separate staff, inventory, and billing. Centralised control panel with per-branch analytics, unified member database, and cross-location membership portability. Scale without losing visibility.",
      image: "/images/solutions/gym.png",
      stats: [{ v: "3×", l: "Branches Managed" }, { v: "50%", l: "Billing Faster" }],
    },
  ],
  transformations: [
    { label: "Admin hours per week", before: "25+", after: "5", pct: 80 },
    { label: "Active members", before: "120", after: "350", pct: 65 },
    { label: "Membership renewal rate", before: "45%", after: "78%", pct: 70 },
    { label: "Monthly revenue visibility", before: "End of month guess", after: "Real-time", pct: 90 },
  ],
  faqs: [
    { q: "Can the system work for a small single-location gym?", a: "Absolutely. We start with the essentials — attendance, renewals, and a basic revenue dashboard — and add complexity as you grow. Most small gyms go live in under 2 weeks." },
    { q: "Does it integrate with WhatsApp?", a: "Yes. Automated renewal reminders, payment confirmations, and new lead responses are all delivered via WhatsApp. Members already live there — we meet them where they are." },
    { q: "What happens to our existing member data?", a: "We migrate all your existing records during onboarding. Whether it's an Excel sheet, a register, or another software, we handle the transition so nothing gets lost." },
    { q: "Is there a mobile app for members?", a: "We can build a lightweight member portal (web-based or app). For most gyms, the WhatsApp-first approach is more than enough to start. We assess what's right for your setup." },
  ],
  ctaTitle: "Let's build your gym's digital backbone.",
  ctaSub: "Want similar results for your gym? The audit is free. The transformation starts in week one.",
  ctaMessage: "Hi, I run a gym and I'd like to discuss a digital management system.",
  accentColor: "#38bdf8",
  accentBg: "rgba(56,189,248,0.06)",
};

export default function FitnessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/industry/fitness/#breadcrumb",
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
            "name": "Fitness",
            "item": "https://shaibya.solutions/industry/fitness"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/industry/fitness/#service",
        "name": "Fitness Gym Management Software Systems",
        "description": "Automate your gym operations, track attendance, send WhatsApp renewal alerts, and manage billing.",
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

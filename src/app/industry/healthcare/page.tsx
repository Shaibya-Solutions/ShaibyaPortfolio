import type { Metadata } from "next";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Healthcare Website & Patient Booking Solutions | Shaibya Solutions",
  description: "Learn how we build compliant hospital websites, medical portals, and clinic booking systems. Discover how VIMS Hospital digitized their patient intake.",
  alternates: {
    canonical: "https://shaibya.solutions/industry/healthcare",
  },
  openGraph: {
    title: "Healthcare Website & Patient Booking Solutions | Shaibya Solutions",
    description: "Learn how we build compliant hospital websites, medical portals, and clinic booking systems.",
    url: "https://shaibya.solutions/industry/healthcare",
    type: "website",
  },
};

const data: IndustryPageData = {
  slug: "healthcare",
  eyebrow: "Healthcare",
  heroImage: "/images/screenshots/vims-hospital.png",
  headline: ["From manual bookings to", "a digitized hospital."],
  heroSub:
    "How we transformed VIMS Hospital — Nagpur's premier multispecialty hospital — replacing manual appointment logs with integrated booking, boosting online traffic, and scaling patient outreach.",
  heroStats: [
    { value: "Nagpur", label: "Client Location" },
    { value: "10,000+", label: "Monthly Web Visits" },
    { value: "70%", label: "Less Booking Friction" },
    { value: "2.5×", label: "Patient Inquiries" },
  ],
  contextChapter: {
    label: "The Context",
    paragraphs: [
      "VIMS Hospital is one of the most respected healthcare institutions in Nagpur. They have a team of world-class doctors, state-of-the-art ICU facilities, and a legacy of serving patients with empathy.",
      "But their digital presence didn't match their physical standards. <strong>Patients couldn't find doc lists easily, online booking wasn't unified,</strong> and phone lines were clogged with basic questions about doctor availability.",
      "We built a digital ecosystem that matches their clinical standards. <strong>We made the hospital accessible from a phone screen.</strong>",
    ],
    pullQuote:
      "Digitizing Nagpur's leading hospital, bringing patient care to the digital era.",
  },
  painPoints: [
    { emoji: "🏥", title: "Outdated Digital Brand", desc: "A prestigious hospital with a basic, static website that didn't showcase departments or doctors correctly." },
    { emoji: "📞", title: "Clogged Call Center", desc: "Receiving hundreds of phone calls daily just to ask for doctor schedules, OPD timings, and fee structures." },
    { emoji: "📅", title: "No Direct Booking", desc: "No online appointment system. Patients had to call, wait on hold, or visit in person to book a slot." },
    { emoji: "🔍", title: "Invisible to Local Search", desc: "Nagpur residents searching for 'best cardiologist' or 'OPD timing Nagpur' couldn't find VIMS on page 1." },
    { emoji: "📃", title: "Manual Intake Logs", desc: "Patient details collected on paper during check-in, causing long lines at the reception desk." },
  ],
  solutions: [
    { emoji: "🖥️", title: "Dynamic Hospital Website", desc: "Clean, responsive portal with interactive doctor profiles, department details, and facility tours." },
    { emoji: "📅", title: "Direct Appointment Booking", desc: "Self-service scheduling for patients. Pick doctor, choose slot, receive instant confirmation." },
    { emoji: "🚀", title: "Local SEO Optimisation", desc: "Google Business and keyword optimization to rank for local healthcare queries in Nagpur." },
    { emoji: "💬", title: "WhatsApp Alert Integration", desc: "Confirmations, reminder alerts, and prescription links sent directly to the patient's WhatsApp." },
    { emoji: "📄", title: "Online Patient Intake", desc: "Let patients fill out registration details online before arriving, cutting check-in queues by 50%." },
    { emoji: "📊", title: "Admin Portal dashboard", desc: "Manage doctor schedules, block off-duty days, and track booking analytics from one central screen." },
  ],
  clients: [
    {
      name: "VIMS Hospital",
      tag: "Featured",
      role: "Digital transformation",
      desc: "Nagpur's premier multispecialty hospital. We designed and built a <strong>complete digital presence:</strong> a responsive hospital website with department catalogs, dynamic doctor search, interactive maps, and integrated appointment scheduling. Within 90 days, web traffic grew to 10k+ monthly visits and patient booking friction dropped by 70%.",
      image: "/images/screenshots/vims-hospital.png",
      stats: [{ v: "10,000+", l: "Monthly Visits" }, { v: "70%", l: "Friction Cut" }, { v: "Live", l: "Status" }],
    },
    {
      name: "CellCureHub",
      tag: "Case Study 02",
      role: "Specialty Clinic Website",
      desc: "A specialty clinic with cutting-edge treatments but <strong>no digital way for patients to find them.</strong> We built a treatment-focused website with condition explainers, before/after galleries, and a frictionless booking flow. Phone inquiry volume dropped 40% as patients started booking directly online.",
      image: "/images/solutions/cellcurehub.png",
      stats: [{ v: "40%", l: "Less Phone Calls" }, { v: "Page 1", l: "Local Search" }, { v: "3 wks", l: "Launch Time" }],
    },
    {
      name: "MediReach Pro",
      tag: "Case Study 03",
      role: "Digital Growth Suite",
      desc: "Multi-doctor clinic group with 4 locations and no unified digital identity. We built a centralised website with per-location booking, Google Business optimisation for all branches, and an automated patient reminder system. Appointment no-show rate dropped from 35% to under 20%.",
      image: "/images/screenshots/vims-hospital.png",
      stats: [{ v: "35%→20%", l: "No-show Rate" }, { v: "4", l: "Locations Live" }, { v: "60 days", l: "To Results" }],
    },
  ],
  transformations: [
    { label: "Call center dependency", before: "100%", after: "30%", pct: 70 },
    { label: "Monthly website visits", before: "0", after: "10,000+", pct: 88 },
    { label: "New patient inquiries", before: "Baseline", after: "2.5×", pct: 65 },
    { label: "Appointment no-show rate", before: "35%", after: "20%", pct: 55 },
  ],
  faqs: [
    { q: "Does the website need to comply with any healthcare regulations?", a: "Yes. We ensure all content follows medical advertising guidelines in India, including no misleading claims and proper disclaimers on health information pages." },
    { q: "How does online booking integrate with the hospital's existing systems?", a: "We build a standalone booking layer that syncs with your existing appointment registers or HIS software via a simple webhook/API. No rip-and-replace." },
    { q: "Can we add new doctors or departments later?", a: "Absolutely. The CMS is built for non-technical staff to add, edit, and update doctor profiles, departments, and blog content without touching code." },
    { q: "How long does it take to go live?", a: "A full hospital website with booking typically goes live in 4–6 weeks. Smaller clinics in 2–3 weeks. We'll give you a precise timeline after the first call." },
  ],
  ctaTitle: "Ready to digitize your hospital or clinic?",
  ctaSub: "Get a website, online booking, and patient management — all in one system. The audit is free, the impact is measurable.",
  ctaMessage: "Hi, I run a hospital/clinic in Nagpur and I'd like to discuss a digital transformation.",
  accentColor: "#818cf8",
  accentBg: "rgba(129,140,248,0.06)",
};

export default function HealthcarePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://shaibya.solutions/industry/healthcare/#breadcrumb",
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
            "name": "Healthcare",
            "item": "https://shaibya.solutions/industry/healthcare"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://shaibya.solutions/industry/healthcare/#service",
        "name": "Healthcare Digital Transformation & Clinic Booking Software",
        "description": "Learn how we build compliant hospital websites, medical portals, and clinic booking systems.",
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

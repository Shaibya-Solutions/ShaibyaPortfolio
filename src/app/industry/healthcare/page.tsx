"use client";
import IndustryPageTemplate, { type IndustryPageData } from "@/components/features/industry/IndustryPageTemplate";

const data: IndustryPageData = {
  slug: "healthcare",
  eyebrow: "Healthcare",
  heroImage: "/images/screenshots/vims-hospital.png",
  headline: ["From invisible to", "the first page."],
  heroSub:
    "How we gave VIMS Hospital a complete digital identity — from zero online presence to 10k+ monthly visitors, online appointments, and a 2.5× increase in new patients.",
  heroStats: [
    { value: "10k+", label: "Monthly Website Visits" },
    { value: "2", label: "Healthcare Clients" },
    { value: "2.5×", label: "New Patient Growth" },
    { value: "70%", label: "Less Call-Center Load" },
  ],
  contextChapter: {
    label: "The Reality",
    paragraphs: [
      "VIMS Hospital had over 150 doctors across 30+ departments — but <strong>zero digital presence.</strong> Patients found them through word-of-mouth or by physically walking in. New patients in the city? They went to whichever hospital showed up on Google.",
      "Appointment booking was entirely over phone. The call center was overwhelmed. Patients with urgent queries waited on hold. Doctors had no online profiles. The hospital's expertise was invisible to anyone who didn't already know them.",
      "We didn't just build a website. We built a <strong>patient acquisition engine.</strong>",
    ],
    pullQuote:
      "Zero to 10,000 monthly visitors — and a 2.5× jump in new patient inquiries within the first quarter.",
  },
  painPoints: [
    { emoji: "🌐", title: "Zero Online Presence", desc: "No website, no Google listing, no social media. Patients searching online found competitors instead." },
    { emoji: "📞", title: "Overwhelmed Call Center", desc: "100% of appointment bookings happened over phone. Wait times were long, staff were stretched, and patients got frustrated." },
    { emoji: "👨‍⚕️", title: "Invisible Doctors", desc: "150+ doctors with no online profiles. Patients couldn't find specializations or book with specific physicians." },
    { emoji: "📅", title: "No Online Booking", desc: "Walk-in and phone only. No reminders meant high no-show rates. No digital confirmation for patients." },
    { emoji: "📉", title: "Losing to Smaller Clinics", desc: "Smaller clinics with basic websites were capturing online searches. A full hospital was being outranked by solo practitioners." },
  ],
  solutions: [
    { emoji: "🏥", title: "SEO-Optimized Hospital Website", desc: "Department pages, doctor profiles, and treatment explainers optimized for local search queries in Nagpur." },
    { emoji: "📅", title: "Online Appointment Booking", desc: "Patients book with specific doctors by department, date, and time. Automated confirmation + reminders sent instantly." },
    { emoji: "👨‍⚕️", title: "Doctor Profile Pages", desc: "Individual pages for all 150+ doctors with credentials, specializations, and patient reviews. Fully SEO-optimized." },
    { emoji: "📱", title: "WhatsApp Integration", desc: "Patients can book, enquire, and receive appointment reminders via WhatsApp — the channel they actually use." },
    { emoji: "📊", title: "Patient Management Dashboard", desc: "Track appointments, no-shows, re-bookings, and department load in real-time. Full visibility for admin staff." },
    { emoji: "📣", title: "Social Media Strategy", desc: "Health education content, doctor spotlights, and patient success stories driving organic trust and reach." },
  ],
  clients: [
    {
      name: "VIMS Hospital",
      tag: "Featured",
      role: "Full Digital Transformation",
      desc: "<strong>Zero to 10,000+ monthly website visitors</strong> in under 90 days. We built a complete hospital website with 150+ doctor profiles, department pages, online booking for all specialities, and a social media strategy. The call center load dropped 70%. New patient inquiries grew 2.5×. VIMS now ranks on Page 1 for 30+ local healthcare searches.",
      image: "/images/solutions/vims.png",
      stats: [{ v: "10k+", l: "Monthly Visits" }, { v: "2.5×", l: "New Patients" }, { v: "70%", l: "Less Call Volume" }],
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
  return <IndustryPageTemplate data={data} />;
}

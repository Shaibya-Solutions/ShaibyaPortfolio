import type { Metadata } from "next";
import CareersClient from "@/components/pages/careers/CareersClient";

export const metadata: Metadata = {
  title: "Internships & Career Opportunities | Shaibya Solutions",
  description: "Pitch your talent to Shaibya Solutions. We offer 100% remote software engineering internships designed to turn ambitious students into world-class builders.",
  alternates: {
    canonical: "https://shaibya.solutions/careers",
  },
  openGraph: {
    title: "Internships & Career Opportunities | Shaibya Solutions",
    description: "Pitch your talent to Shaibya Solutions. We offer 100% remote software engineering internships designed to turn ambitious students into world-class builders.",
    url: "https://shaibya.solutions/careers",
    type: "website",
  },
};

const TEAM_BUILDERS = [
  {
    name: "Aarav Sharma",
    role: "Engineering Intern · Nagpur",
    contribution: "Built and shipped the core database migrations and automated webhooks for our corporate logistics partners.",
    quote: "On day three, I was pushing code to a production system serving thousands of active users. The mentorship here is unparalleled.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Priya Nair",
    role: "UI/UX Intern · Noida",
    contribution: "Redesigned the entire client portal dashboard, cutting user navigation flows down by 40%.",
    quote: "I wasn't just handed wireframes; I joined strategic client sessions, scoped features, and understood the business economics behind my design.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Devanshu Patel",
    role: "Full Stack Intern · Bangalore",
    contribution: "Integrated the real-time AI analytics pipeline and calendar scheduling systems for our SaaS partners.",
    quote: "Shaibya gave me the tools, the trust, and the scaffolding to incubate my own software ideas. It's a founder track in disguise.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Sophia Martinez",
    role: "Product Intern · Texas, USA",
    contribution: "Coordinated our North American client onboarding pipeline and automated global payment gateway routes.",
    quote: "Even from across borders, the collaboration is seamless. We run fully remote, sync asynchronously, and ship continuously.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Rohan Mehta",
    role: "Backend Intern · Nagpur",
    contribution: "Designed and optimized database indexing paths, reducing API response times by 35% across all core endpoints.",
    quote: "Here, optimization is not a theoretical benchmark; it's a direct user experience. Learning how to manage latency under mentorship was incredible.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Anjali Rao",
    role: "DevOps Intern · Mumbai",
    contribution: "Automated our GitHub CI/CD actions and container deployments to AWS, saving engineers hours of manual setup.",
    quote: "I walked in knowing basic Git and walked out managing deployment networks. Shaibya trusts you with real infrastructure.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Kabir Singh",
    role: "Frontend Intern · Noida",
    contribution: "Integrated micro-interactions, responsive grids, and Framer Motion layout states across all partner projects.",
    quote: "We don't settle for default styles. The focus here is on visual excellence and premium user transitions. No classrooms teach this detail.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Neha Gupta",
    role: "Security Intern · Bangalore",
    contribution: "Implemented OAuth2 security protocols and pen-tested custom API endpoints to protect client billing records.",
    quote: "At Shaibya, security is baked into the product cycle from day zero. I gained hands-on experience hardening live enterprise apps.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  }
];

const IMPACT_LOCATIONS = [
  {
    id: "Nagpur",
    name: "Nagpur (HQ)",
    role: "Development Hub",
    description:
      "Our center of engineering excellence. Here, our core developers and student interns build database architectures, automated workflows, and robust backends from the ground up.",
    details: "Nagpur is where we launch our main development operations and pilot projects.",
    badge: "Center of Dev Excellence",
  },
  {
    id: "Noida",
    name: "Noida",
    role: "Corporate Collaborations",
    description:
      "Partnering with high-growth businesses. Our teams in Noida focus on delivering CRM integrations, custom ERP tools, and dashboard scaling for local corporate clients.",
    details: "Noida serves as our client-success hub for enterprise automation.",
    badge: "Client Success Hub",
  },
  {
    id: "Mumbai",
    name: "Mumbai",
    role: "Business Integrations",
    description:
      "Aligning products with market value. We collaborate with retail, logistics, and financial institutions in Mumbai to design products that unlock massive business efficiency.",
    details: "Connecting code directly to commercial pipelines and financial systems.",
    badge: "Commercial Partnerships",
  },
  {
    id: "Bangalore",
    name: "Bangalore",
    role: "Tech Innovation Hub",
    description:
      "Collaborating with tech leaders. Our team engages with advanced tech stacks, AI modeling pipelines, and startup incubator partners in India's silicon valley.",
    details: "Bangalore acts as our launchpad for future founders and advanced tech stacks.",
    badge: "Future Founder Incubator",
  },
  {
    id: "Texas",
    name: "Texas, USA",
    role: "Global Partner Network",
    description:
      "Unlocking global opportunities. We collaborate with North American businesses to deploy out-of-the-box software, run global internship programs, and validate products internationally.",
    details: "Texas hosts our primary international business development operations.",
    badge: "International Outreach",
  },
];

const MANIFESTO_ITEMS = [
  {
    title: "People-First Culture",
    description: "We believe great products are built by people who feel trusted, supported, and empowered. Instead of measuring success by hours worked or tasks completed, we focus on ownership, continuous learning, and personal growth. We encourage our team members to pursue their ambitions while building impactful technology."
  },
  {
    title: "Excellence in Craftsmanship",
    description: "Quality is never an afterthought. We value clean architecture, intuitive user experiences, scalable systems, and high-performance engineering. We believe that simplicity requires discipline, and thoughtful craftsmanship is what transforms good software into exceptional products."
  },
  {
    title: "Innovation Through Leverage",
    description: "We embrace modern tools, first-principles thinking, and efficient execution over unnecessary bureaucracy. By removing traditional barriers and enabling individuals to take ownership, small, highly capable teams can create solutions that deliver significant business impact."
  }
];

export default function CareersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        "@id": "https://shaibya.solutions/careers/#jobposting",
        "title": "Software Engineer Intern (Founder Track)",
        "description": "Join our distributed digital studio as a Software Engineer Intern. Work on real production client projects, design custom CRM platforms, build WhatsApp automation systems, and receive direct founder mentorship.",
        "datePosted": "2026-07-08",
        "validThrough": "2027-07-08",
        "employmentType": "INTERN",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Shaibya Solutions",
          "sameAs": "https://shaibya.solutions",
          "logo": "https://shaibya.solutions/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          }
        },
        "jobLocationType": "TELECOMMUTE"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersClient
        TEAM_BUILDERS={TEAM_BUILDERS}
        IMPACT_LOCATIONS={IMPACT_LOCATIONS}
        MANIFESTO_ITEMS={MANIFESTO_ITEMS}
      />
    </>
  );
}

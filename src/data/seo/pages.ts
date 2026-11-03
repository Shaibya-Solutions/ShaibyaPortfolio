import type { MetadataRoute } from "next";

export interface SeoPageDefinition {
  title: string;
  description: string;
  kind: "core" | "service" | "industry";
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  modifiedAt: string;
}

export const pageSeo = {
  "/": {
    "title": "Software Development Company in Nagpur",
    "description": "Custom software development in Nagpur for businesses. Automate workflows, connect CRM and ERP systems, and discuss your next project with Shaibya Solutions.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 1,
    "modifiedAt": "2026-11-03"
  },
  "/about": {
    "title": "About Our Software & Automation Studio",
    "description": "Meet Shaibya Solutions, a Nagpur software and automation studio helping businesses digitise workflows, connect systems, and build practical tools for growth.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.6,
    "modifiedAt": "2026-11-02"
  },
  "/contact": {
    "title": "Discuss Your Software & Automation Project",
    "description": "Contact Shaibya Solutions in Ramdaspeth, Nagpur for custom software, CRM integrations, and business automation. Share your requirements and discuss next steps.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.6,
    "modifiedAt": "2026-11-02"
  },
  "/careers": {
    "title": "Careers & Open Roles",
    "description": "Explore software development, video editing, and business development roles at Shaibya Solutions. View our current openings, internships, and apply by email.",
    "kind": "core",
    "changeFrequency": "weekly",
    "priority": 0.5,
    "modifiedAt": "2026-11-02"
  },
  "/community": {
    "title": "Technology & Business Communities",
    "description": "Connect with the Shaibya Solutions community for software, design, and startup collaboration. Explore opportunities to learn, share ideas, and build products.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.5,
    "modifiedAt": "2026-11-02"
  },
  "/privacy-policy": {
    "title": "Privacy Policy",
    "description": "Read how Shaibya Solutions handles website enquiries, job applications, contact details, and technical information, and how to raise a privacy request with us.",
    "kind": "core",
    "changeFrequency": "yearly",
    "priority": 0.3,
    "modifiedAt": "2026-11-02"
  },
  "/snyppit": {
    "title": "The Story Behind Our Software Studio",
    "description": "Explore the story behind Shaibya Solutions and our approach to building software with businesses and founders, from practical ideas to useful digital products.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.5,
    "modifiedAt": "2026-11-02"
  },
  "/portfolio": {
    "title": "Software Development & Automation Portfolio",
    "description": "Explore Shaibya Solutions projects in custom software, business automation, websites, and CRM systems. See the challenges, solutions, and tools behind our work.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/portfolio/websites": {
    "title": "Website Development Portfolio",
    "description": "Explore website projects by Shaibya Solutions for healthcare, property, hospitality, and retail businesses. Review the design, technology, and delivery context.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/portfolio/solutions": {
    "title": "Business Automation & Software Portfolio",
    "description": "Explore management systems, CRM tools, and business automation projects by Shaibya Solutions. See how practical software addresses operational bottlenecks.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/portfolio/rnd": {
    "title": "Software MVPs & Research Projects",
    "description": "Explore prototypes, AI tools, and MVP projects by Shaibya Solutions. Learn how business problems are researched, tested, and developed into useful systems.",
    "kind": "core",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/services/software-solutions": {
    "title": "Custom Software & Business Automation",
    "description": "Build custom software, CRM and ERP integrations, and workflow automation with Shaibya Solutions in Nagpur. Discuss systems that reduce manual business work.",
    "kind": "service",
    "changeFrequency": "monthly",
    "priority": 0.9,
    "modifiedAt": "2026-11-03"
  },
  "/services/digital-marketing": {
    "title": "B2B Digital Marketing & Growth Services",
    "description": "Grow your business with digital marketing from Shaibya Solutions in Nagpur. Explore SEO, content, paid campaigns, and conversion-focused customer journeys.",
    "kind": "service",
    "changeFrequency": "monthly",
    "priority": 0.8,
    "modifiedAt": "2026-11-03"
  },
  "/services/cybersecurity": {
    "title": "Cybersecurity & Application Security",
    "description": "Explore application security, penetration testing, and cloud security services with Shaibya Solutions. Discuss risks, requirements, and a clear security scope.",
    "kind": "service",
    "changeFrequency": "monthly",
    "priority": 0.8,
    "modifiedAt": "2026-11-02"
  },
  "/services/3d-modelling-animations": {
    "title": "3D Animation, Walkthroughs & Interiors",
    "description": "Explore 3D walkthrough videos, product animation, and interior visualisation with Shaibya Solutions, including architectural renderings and concept examples.",
    "kind": "service",
    "changeFrequency": "monthly",
    "priority": 0.8,
    "modifiedAt": "2026-11-02"
  },
  "/industry/real-estate": {
    "title": "Real Estate Software & CRM Automation",
    "description": "Build property websites, lead management workflows, and real estate CRM systems with Shaibya Solutions. Explore software and automation for property businesses.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/industry/fitness": {
    "title": "Gym Management Software & Fitness Automation",
    "description": "Digitise gym memberships, attendance, billing, and renewal reminders with Shaibya Solutions. Explore practical software and automation for fitness businesses.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/industry/healthcare": {
    "title": "Healthcare Websites & Workflow Automation",
    "description": "Explore healthcare websites, appointment workflows, and patient enquiry tools with Shaibya Solutions. Discuss custom digital systems for hospitals and clinics.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/industry/hospitality": {
    "title": "Hospitality Websites & Booking Automation",
    "description": "Build hospitality websites, booking workflows, and guest enquiry tools with Shaibya Solutions. Explore digital systems for hotels and accommodation businesses.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  },
  "/industry/retail": {
    "title": "Retail Software & Inventory Automation",
    "description": "Explore retail websites, inventory tools, billing workflows, and enquiry automation with Shaibya Solutions. Discuss software that fits your retail operations.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-03"
  },
  "/industry/fashion-tech": {
    "title": "Fashion Technology & Custom Software MVPs",
    "description": "Build fashion technology platforms and software MVPs with Shaibya Solutions. Explore product discovery, shopping workflows, and systems for retail founders.",
    "kind": "industry",
    "changeFrequency": "monthly",
    "priority": 0.7,
    "modifiedAt": "2026-11-02"
  }
} as const satisfies Record<string, SeoPageDefinition>;

export type PublicPath = keyof typeof pageSeo;

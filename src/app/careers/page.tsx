import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import CareersClient from "@/components/pages/careers/CareersClient";
import { OPEN_ROLES } from "@/data/careers";

export const metadata = metadataFor("/careers");

const IMPACT_LOCATIONS = [
  {
    id: "Nagpur",
    name: "Nagpur (HQ)",
    role: "Development Hub",
    description:
      "Our development work brings together application interfaces, databases, and automation to solve practical business problems.",
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
      "Exploring software, automation, and product ideas that respond to evolving business needs.",
    details: "A focus on turning technical ideas into practical applications.",
    badge: "Product & Technology",
  },
  {
    id: "Texas",
    name: "Texas, USA",
    role: "Global Partner Network",
    description:
      "Working across borders means understanding different business contexts and communicating clearly throughout a project.",
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
  return (
    <>
      <JsonLd data={pageGraph("/careers", { type: "CollectionPage", items: OPEN_ROLES.map((role) => ({ name: role.title, path: `/careers#${role.id}` })) })} />
      <CareersClient IMPACT_LOCATIONS={IMPACT_LOCATIONS} MANIFESTO_ITEMS={MANIFESTO_ITEMS} />
    </>
  );
}

import type { PublicPath } from "./pages";

export interface ServiceDefinition {
  slug: string;
  path: PublicPath;
  name: string;
  serviceType: string | readonly string[];
}

export const services = [
  { slug: "software-solutions", path: "/services/software-solutions", name: "Custom Software & Business Automation", serviceType: ["Custom software development", "Workflow automation", "CRM and ERP integration"] },
  { slug: "digital-marketing", path: "/services/digital-marketing", name: "Digital Marketing & B2B Growth", serviceType: ["Search engine optimisation", "Content marketing", "Digital campaigns"] },
  { slug: "cybersecurity", path: "/services/cybersecurity", name: "Application & Cloud Security", serviceType: ["Application security", "Penetration testing", "Cloud security"] },
  { slug: "3d-modelling-animations", path: "/services/3d-modelling-animations", name: "3D Visualisation & Animation", serviceType: ["Walkthrough Videos", "Product Animation", "Interior Visualisation"] },
] as const satisfies readonly ServiceDefinition[];

export type ServiceSlug = typeof services[number]["slug"];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

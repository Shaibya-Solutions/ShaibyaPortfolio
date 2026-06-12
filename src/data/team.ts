import { Code, LinkIcon, Palette, Settings, Shield, Zap } from "lucide-react";

export interface CrewMember {
  codename: string;
  dayJob: string;
  nightSkill: string;
  location: string;
  hoverQuote: string;
  icon: React.ElementType;
  color: string;
  /** Avatar/photo URL for ChromaGrid */
  image?: string;
  /** Social handle shown on the ChromaGrid card */
  handle?: string;
  /** Link opened when the ChromaGrid card is clicked */
  url?: string;
}

export const TEAM_MEMBERS: CrewMember[] = [
  {
    codename: "The Backend Alchemist",
    dayJob: "Backend Developer",
    nightSkill: "API Sorcery & Data Flow Design",
    location: "Nagpur, IN",
    hoverQuote:
      "Turns raw data into seamless logic. Architect behind every stable system.",
    icon: Code,
    color: "#00f6ff",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=alchemist&size=300&backgroundColor=0f172a",
    handle: "@backendalchemist",
    url: "https://github.com/shaibyasolutions",
  },
  {
    codename: "The Python Whisperer",
    dayJob: "Senior Python Engineer",
    nightSkill: "Automation, AI, and Backend Craftsmanship",
    location: "Texas, US",
    hoverQuote:
      "Writes code that breathes. Scales systems with precision and Pythonic grace.",
    icon: Zap,
    color: "#e400f6",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=pythonwhisperer&size=300&backgroundColor=0f172a",
    handle: "@pythonwhisperer",
    url: "https://github.com/shaibyasolutions",
  },
  {
    codename: "The Cloud Weaver",
    dayJob: "Salesforce Developer",
    nightSkill: "CRM Customization & Cloud Logic",
    location: "Nagpur, IN",
    hoverQuote:
      "Knits together businesses and technology. Makes Salesforce dance to data's rhythm.",
    icon: LinkIcon,
    color: "#ffc700",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=cloudweaver&size=300&backgroundColor=0f172a",
    handle: "@cloudweaver",
    url: "https://www.linkedin.com/company/shaibyasolutions/about/",
  },
  {
    codename: "The Firewall Phantom",
    dayJob: "Senior Penetration Tester",
    nightSkill: "Ethical Hacking & Threat Simulation",
    location: "Nagpur, IN",
    hoverQuote: "Sees the unseen. Breaks systems before the bad guys can.",
    icon: Shield,
    color: "#e400f6",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=firewallphantom&size=300&backgroundColor=0f172a",
    handle: "@firewallphantom",
    url: "https://github.com/shaibyasolutions",
  },
  {
    codename: "The Fullstack Maverick",
    dayJob: "Senior Fullstack Engineer",
    nightSkill: "End-to-End System Architecture",
    location: "Noida, IN",
    hoverQuote:
      "Bridges front and back with elegance. Ships products that just work.",
    icon: Settings,
    color: "#00f6ff",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=fullstackmaverick&size=300&backgroundColor=0f172a",
    handle: "@fullstackmaverick",
    url: "https://github.com/shaibyasolutions",
  },
  {
    codename: "The 3D Conjurer",
    dayJob: "3D Specialist Artist",
    nightSkill: "Visual Storytelling & Motion Design",
    location: "Nagpur, IN",
    hoverQuote:
      "Shapes imagination into pixels. Turns ideas into stunning 3D experiences.",
    icon: Palette,
    color: "#ffc700",
    image: "https://api.dicebear.com/7.x/bottts/png?seed=3dconjurer&size=300&backgroundColor=0f172a",
    handle: "@3dconjurer",
    url: "https://www.instagram.com/shaibya.solutions",
  },
];

import { Code, LinkIcon, Palette, Settings, Shield, Zap } from "lucide-react";

export interface CrewMember {
  codename: string;
  dayJob: string;
  nightSkill: string;
  location: string;
  hoverQuote: string;
  icon: React.ElementType;
  color: string;
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
  },
  {
    codename: "The Cloud Weaver",
    dayJob: "Salesforce Developer",
    nightSkill: "CRM Customization & Cloud Logic",
    location: "Nagpur, IN",
    hoverQuote:
      "Knits together businesses and technology. Makes Salesforce dance to data’s rhythm.",
    icon: LinkIcon,
    color: "#ffc700",
  },
  {
    codename: "The Firewall Phantom",
    dayJob: "Senior Penetration Tester",
    nightSkill: "Ethical Hacking & Threat Simulation",
    location: "Nagpur, IN",
    hoverQuote: "Sees the unseen. Breaks systems before the bad guys can.",
    icon: Shield,
    color: "#e400f6",
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
  },
];

// data.ts
import { Zap, Code, DollarSign, Target, Clock, Users, Cloud, Cpu, Server, HardDrive, HeartPulse, Hospital, CheckCircle, Smartphone, BarChart, Gem, ArrowUp, Truck, Sparkles, Leaf, GraduationCap, Briefcase, Infinity } from "lucide-react";
import React from "react";

export interface Product {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  category: "AI" | "Web" | "Mobile";
  image: string;
  videoUrl: string;
  blogLink?: string; // Optional field for blog post link
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; value: string; label: string }[];
  quickInfo: { label: string; value: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[];
  challenge: string;
  solution: string;
  impactMetrics: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; value: string; label: string; color: string }[];
  techStack: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; name: string; purpose: string; color: string }[];
  media: { type: "image" | "video"; url: string; alt: string }[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "coaltrack-ai",
    title: "CoalTrack AI",
    tagline: "Smart Billing Automation for Coal Distributors",
    category: "AI",
    image: "/images/coaltrack-hero.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    blogLink: "#", // Placeholder for blog link
    stats: [
      { icon: Clock, value: "4 Hours", label: "Work Time" },
      { icon: Zap, value: "95%", label: "Faster" },
      { icon: DollarSign, value: "75%", label: "Manpower Reduced" },
    ],
    quickInfo: [
      { label: "Industry", value: "Logistics", icon: Truck },
      { label: "Technologies Used", value: "AI, OCR, Web", icon: Code },
      { label: "Duration", value: "Custom", icon: Clock },
      { label: "Team Size", value: "Varies", icon: Users },
      { label: "Client", value: "Confidential", icon: Target },
    ],
    challenge:
      "Coal distributors faced a huge manual workload with 4 employees spending an entire week just entering bills, leading to errors, delays, and wasted resources.",
    solution:
      "We created an AI-based tool where users simply click a photo of a bill and upload it. The system uses automated OCR to extract, validate fields, and generate structured Excel files. It also generates daily/weekly reports automatically with custom business logic.",
    impactMetrics: [
      { icon: Zap, value: "95%", label: "Faster Work", color: "#00f6ff" },
      { icon: DollarSign, value: "Reduced 75%", label: "Manpower", color: "#ffc700" },
      { icon: CheckCircle, value: "90%", label: "Error Reduction", color: "#e400f6" },
    ],
    techStack: [
      { icon: Cpu, name: "Python", purpose: "Backend AI/OCR", color: "#00f6ff" },
      { icon: Server, name: "Node.js", purpose: "API & Logic", color: "#ffc700" },
      { icon: Cloud, name: "AWS", purpose: "Deployment", color: "#e400f6" },
      { icon: Code, name: "React", purpose: "Admin Panel", color: "#00f6ff" },
    ],
    media: [
      { type: "image", url: "/images/coaltrack-1.png", alt: "AI OCR interface for bill processing" },
      { type: "image", url: "/images/coaltrack-2.png", alt: "Automated Excel report" },
      { type: "image", url: "/images/coaltrack-3.png", alt: "Dashboard for bill tracking" },
    ],
  },
  {
    id: 2,
    slug: "fitmanage-360",
    title: "FitManage 360",
    tagline: "All-in-One Gym Management App",
    category: "Mobile",
    image: "/images/fitmanage-hero.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    blogLink: "#",
    stats: [
      { icon: BarChart, value: "80%", label: "Admin Work Reduced" },
      { icon: Users, value: "3x", label: "Client Base Growth" },
      { icon: HeartPulse, value: "25%", label: "Renewal Rate Increase" },
    ],
    quickInfo: [
      { label: "Industry", value: "Fitness", icon: HeartPulse },
      { label: "Technologies Used", value: "Flutter, Firebase", icon: Smartphone },
      { label: "Duration", value: "Varies", icon: Clock },
      { label: "Team Size", value: "2-3", icon: Users },
      { label: "Client", value: "Private Gyms", icon: Target },
    ],
    challenge:
      "Gym owners were struggling with manual registers and spreadsheets, making membership, payment, and client schedule tracking messy and prone to errors.",
    solution:
      "We developed a full-featured gym management app with membership and payment tracking, automated reminders, QR-based attendance, and personalized workout plans. It also includes an analytics dashboard and supports multiple branches for future growth.",
    impactMetrics: [
      { icon: Clock, value: "80%", label: "Less Admin Work", color: "#ffc700" },
      { icon: Users, value: "3x", label: "Client Growth", color: "#00f6ff" },
      { icon: HeartPulse, value: "25%", label: "Renewal Rate", color: "#e400f6" },
    ],
    techStack: [
      { icon: Smartphone, name: "Flutter", purpose: "Cross-platform App", color: "#00f6ff" },
      { icon: Cloud, name: "Firebase", purpose: "Backend & DB", color: "#ffc700" },
      { icon: Code, name: "Dart", purpose: "Application Logic", color: "#e400f6" },
      { icon: BarChart, name: "BigQuery", purpose: "Analytics", color: "#00f6ff" },
    ],
    media: [
      { type: "image", url: "/images/fitmanage-1.png", alt: "Membership dashboard" },
      { type: "image", url: "/images/fitmanage-2.png", alt: "Client profile screen" },
      { type: "image", url: "/images/fitmanage-3.png", alt: "Workout planner UI" },
    ],
  },
  {
    id: 3,
    slug: "medireach-pro",
    title: "MediReach Pro",
    tagline: "Digital Growth & Appointment System for Hospitals",
    category: "Web",
    image: "/images/medireach-hero.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    blogLink: "#",
    stats: [
      { icon: Hospital, value: "70%", label: "Reduced Call-Center Dependency" },
      { icon: ArrowUp, value: "2.5x", label: "New Patient Increase" },
      { icon: CheckCircle, value: "35%", label: "No-Show Reduction" },
    ],
    quickInfo: [
      { label: "Industry", value: "Healthcare", icon: HeartPulse },
      { label: "Technologies Used", value: "React, SEO, SMS", icon: Code },
      { label: "Duration", value: "Varies", icon: Clock },
      { label: "Team Size", value: "3-5", icon: Users },
      { label: "Client", value: "Vims Hospital", icon: Hospital },
    ],
    challenge:
      "Vims Hospital lacked a digital presence, forcing patients to call or visit in person to book appointments, which led to inefficient patient management.",
    solution:
      "We built an SEO-optimized hospital website with an online appointment booking system. The platform includes doctor profiles, health blogs, and automated reminders via SMS/Email to increase visibility and patient trust.",
    impactMetrics: [
      { icon: Hospital, value: "70%", label: "Less Call-Center Dependency", color: "#e400f6" },
      { icon: ArrowUp, value: "2.5x", label: "New Patients", color: "#00f6ff" },
      { icon: CheckCircle, value: "35%", label: "No-Show Reduction", color: "#ffc700" },
    ],
    techStack: [
      { icon: Code, name: "React", purpose: "Frontend System", color: "#00f6ff" },
      { icon: Server, name: "Node.js", purpose: "Booking API", color: "#ffc700" },
      { icon: Cloud, name: "AWS", purpose: "Hosting & SMS", color: "#e400f6" },
      { icon: Sparkles, name: "SEO Tools", purpose: "Digital Growth", color: "#00f6ff" },
    ],
    media: [
      { type: "image", url: "/images/medireach-1.png", alt: "Online appointment booking interface" },
      { type: "image", url: "/images/medireach-2.png", alt: "Hospital website homepage" },
      { type: "image", url: "/images/medireach-3.png", alt: "Doctor profile page" },
    ],
  },
  {
    id: 4,
    slug: "goldharvest-pro",
    title: "GoldHarvest Pro",
    tagline: "Smart Gold Savings & Customer Management",
    category: "Web",
    image: "/images/goldharvest-hero.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    blogLink: "#",
    stats: [
      { icon: Gem, value: "85%", label: "Reduced Admin Work" },
      { icon: ArrowUp, value: "3x", label: "Customer Enrollment" },
      { icon: Users, value: "1,200+", label: "Customers Managed" },
    ],
    quickInfo: [
      { label: "Industry", value: "Jewelry", icon: Gem },
      { label: "Technologies Used", value: "Django, React", icon: Code },
      { label: "Duration", value: "Varies", icon: Clock },
      { label: "Team Size", value: "2-3", icon: Users },
      { label: "Client", value: "Date Jewellers", icon: Target },
    ],
    challenge:
      "Date Jewellers managed their Gold Harvest Plans manually, which led to high manual effort, calculation mistakes, and slow sales growth.",
    solution:
      "We built a digital platform for gold harvest management. It features secure customer accounts, automated payment tracking, bill generation, and dashboards to manage over 1,000 customers.",
    impactMetrics: [
      { icon: HardDrive, value: "1,200+", label: "Customers Managed", color: "#ffc700" },
      { icon: Zap, value: "85%", label: "Reduced Admin Work", color: "#e400f6" },
      { icon: DollarSign, value: "3x", label: "Enrollment Growth", color: "#00f6ff" },
    ],
    techStack: [
      { icon: Cpu, name: "Django", purpose: "Backend API", color: "#ffc700" },
      { icon: Code, name: "React", purpose: "Frontend", color: "#e400f6" },
      { icon: Cloud, name: "PostgreSQL", purpose: "Database", color: "#00f6ff" },
      { icon: Users, name: "Python", purpose: "Business Logic", color: "#ffc700" },
    ],
    media: [
      { type: "image", url: "/images/goldharvest-1.png", alt: "Gold savings plan dashboard" },
      { type: "image", url: "/images/goldharvest-2.png", alt: "Customer profile and payment tracking" },
      { type: "image", url: "/images/goldharvest-3.png", alt: "Automated bill generation" },
    ],
  },
];
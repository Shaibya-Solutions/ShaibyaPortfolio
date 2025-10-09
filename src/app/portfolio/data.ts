import { CheckCircle, Leaf } from "lucide-react";
import React from "react";

export interface Product {
  id: number;
  title: string;
  tagline: string;
  category: "AI" | "Web" | "Mobile";
  image: string;
  deployedLink: string;
  blogLink?: string; // Optional field for blog post link
}

export const products: Product[] = [
  {
    id: 1,
    title: "CoalTrack AI",
    tagline: "Smart Billing Automation for Coal Distributors",
    category: "AI",
    image: "/images/solutions/coal.png",
    deployedLink: "https://demo.coaltrack-ai.com",
    blogLink: "#blog-coaltrack",
  },
  {
    id: 2,
    title: "FitManage 360",
    tagline: "All-in-One Gym Management App",
    category: "Mobile",
    image: "/images/solutions/gym.png",
    deployedLink: "https://appstore.fitmanage360.com",
    blogLink: "#blog-fitmanage",
  }
];

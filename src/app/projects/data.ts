// data.ts
export interface Projects {
    id: number;
    image: string;
    title: string;
    tagline: string;
    category: "Web" | "Mobile" | "AI" | "Cybersecurity" | "MVP" | "Others";
    deployedLink?: string;
    githubLink?: string;
  }
  
  export const projects: Projects[] = [
    {
      id: 1,
      image: "/images/nft-marketplace.png",
      title: "NFT Marketplace",
      tagline: "A Web3 platform for unique digital assets.",
      category: "Web",
      deployedLink: "https://www.example.com/nft-marketplace",
      githubLink: "https://github.com/your-repo/nft-marketplace",
    },
    {
      id: 2,
      image: "/images/meditation-app.png",
      title: "Zenith",
      tagline: "AI-powered meditation and wellness app.",
      category: "Mobile",
      deployedLink: "https://www.example.com/zenith-app",
    },
    {
      id: 3,
      image: "/images/chatbot-tool.png",
      title: "Cortex AI",
      tagline: "A no-code chatbot builder for businesses.",
      category: "AI",
      deployedLink: "https://www.example.com/cortex-ai",
      githubLink: "https://github.com/your-repo/cortex-ai",
    },
    {
      id: 4,
      image: "/images/saas-dashboard.png",
      title: "QuantumFlow",
      tagline: "B2B SaaS dashboard for project analytics.",
      category: "Web",
      deployedLink: "https://www.example.com/quantumflow-saas",
    },
    {
      id: 5,
      image: "/images/smart-home.png",
      title: "EchoGuard",
      tagline: "Home cybersecurity and device monitoring.",
      category: "Cybersecurity",
      deployedLink: "https://www.example.com/echoguard",
      githubLink: "https://github.com/your-repo/echoguard",
    },
    {
      id: 6,
      image: "/images/food-delivery-mvp.png",
      title: "FeastFast MVP",
      tagline: "Rapid prototype for a food delivery service.",
      category: "MVP",
      deployedLink: "https://www.example.com/feastfast",
    },
    {
      id: 7,
      image: "/images/e-commerce-mobile.png",
      title: "RetailFlow",
      tagline: "Mobile e-commerce app with AR features.",
      category: "Mobile",
      deployedLink: "https://www.example.com/retailflow",
      githubLink: "https://github.com/your-repo/retailflow",
    },
    {
      id: 8,
      image: "/images/gold-savings.png",
      title: "GoldVault",
      tagline: "A mobile app for digital gold savings.",
      category: "Mobile",
      deployedLink: "https://www.example.com/goldvault",
      githubLink: "https://github.com/your-repo/goldvault",
    },
    {
      id: 9,
      image: "/images/hospital-app.png",
      title: "HealthConnect",
      tagline: "Hospital management and patient portal.",
      category: "Web",
      deployedLink: "https://www.example.com/healthconnect",
    },
  ];
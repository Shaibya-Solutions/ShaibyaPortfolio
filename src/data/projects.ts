// ─── Project Data Schema ───
// Matches the strategic data model for maximum impact display

export type ProjectType = "website" | "solution" | "rnd";
export type ProjectStatus = "Production" | "MVP" | "Prototype" | "Confidential";

export interface ProjectStat {
  value: string;
  label: string;
  context?: string; // e.g. "7 days → 4 hours"
}

export interface Project {
  // Core Identity
  slug: string;
  name: string;
  tagline: string;
  type: ProjectType;
  industry: string;
  client: string;
  clientLogo?: string;
  liveUrl?: string;
  year: string;

  // Storytelling
  problem: string;
  solution: string;
  keyFeatures?: string[];
  techStack: string[];

  // Impact
  stats: ProjectStat[];

  // Visual
  thumbnail: string;
  screenshots?: string[];
  brandColor?: string;

  // Credibility
  testimonial?: { quote: string; name: string; role: string };
  servicesDelivered: string[];
  tags: string[];
  featured?: boolean;
  confidential?: boolean;
  status?: ProjectStatus;

  // R&D specific
  collaborator?: string;
  journey?: string;
  outcome?: string;
}

// ═══════════════════════════════════════════════════════════════
// TYPE 1 — WEBSITES
// ═══════════════════════════════════════════════════════════════

export const websiteProjects: Project[] = [
  {
    slug: "vims-hospital",
    name: "VIMS Hospital",
    tagline: "Complete digital presence for a leading Nagpur hospital",
    type: "website",
    industry: "Healthcare",
    client: "VIMS Hospital Nagpur",
    liveUrl: "https://vimsnagpur.com",
    year: "2024",
    problem: "VIMS Hospital had no digital presence. Patients had to call or visit physically for appointments. Marketing reach was minimal and new patient acquisition relied entirely on word-of-mouth.",
    solution: "Built a comprehensive SEO-optimized website with online appointments, 150+ doctor profiles, 20+ department listings, patient testimonials, and integrated social media presence.",
    keyFeatures: ["Online appointment booking", "Doctor profile directory", "Department-wise navigation", "Mobile-responsive design", "Local SEO optimization"],
    techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
    stats: [
      { value: "10k+", label: "Monthly Visitors" },
      { value: "150+", label: "Doctors Listed" },
      { value: "2.5x", label: "New Patient Inquiries" },
      { value: "4.8/5", label: "User Rating" },
    ],
    thumbnail: "/images/screenshots/vims-hospital.png",
    servicesDelivered: ["Web Development", "SEO", "Digital Marketing"],
    tags: ["healthcare", "hospital", "nagpur", "seo", "appointments"],
    featured: true,
    testimonial: {
      quote: "Before Shaibya, we had zero digital presence. They built our website, set up online booking, and managed our social media growth. Within 6 months, patient inquiries tripled.",
      name: "Dr. Meena S.",
      role: "Director, VIMS Hospital",
    },
  },
  {
    slug: "sonar-killa-tours",
    name: "Sonar Killa Tours",
    tagline: "Boutique heritage hotel booking platform",
    type: "website",
    industry: "Hospitality",
    client: "Sonar Killa Tours",
    liveUrl: "https://www.sonarkillatours.in",
    year: "2024",
    problem: "A heritage hotel in Jaisalmer had no online booking system. All reservations were managed via phone calls, leading to missed bookings and zero visibility from search engines.",
    solution: "Built a visually rich booking platform with immersive photo galleries, room type comparison, dynamic pricing, and direct WhatsApp booking integration for instant confirmation.",
    keyFeatures: ["Rich media galleries", "Room booking system", "WhatsApp integration", "Dynamic pricing display", "Mobile-first design"],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    stats: [
      { value: "3x", label: "Online Bookings" },
      { value: "60%", label: "Less Phone Calls" },
      { value: "Page 1", label: "Google Ranking" },
    ],
    thumbnail: "/images/screenshots/sonar-killa.png",
    servicesDelivered: ["Web Development", "SEO", "UI/UX Design"],
    tags: ["hospitality", "hotel", "booking", "tourism"],
    featured: true,
  },
  {
    slug: "touchwood-furnitech",
    name: "Touchwood Furnitech",
    tagline: "Premium furniture brand's digital showroom",
    type: "website",
    industry: "Retail",
    client: "Touchwood Furnitech",
    liveUrl: "https://www.touchwoodfurnitech.com",
    year: "2024",
    problem: "A premium furniture manufacturer had no way to showcase their catalog online. Customers had to visit the physical showroom, limiting reach to Nagpur city only.",
    solution: "Designed an elegant digital showroom with high-resolution product galleries, category filtering, inquiry forms, and WhatsApp integration for instant quotes.",
    keyFeatures: ["Product catalog with filters", "High-res image galleries", "WhatsApp inquiry", "Mobile-responsive", "SEO optimized"],
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    stats: [
      { value: "40%", label: "More Inquiries" },
      { value: "5x", label: "Reach Beyond Nagpur" },
    ],
    thumbnail: "/images/screenshots/touchwood.png",
    servicesDelivered: ["Web Development", "UI/UX Design", "SEO"],
    tags: ["furniture", "retail", "catalog", "ecommerce"],
  },
  {
    slug: "mg-infra-properties",
    name: "MG Infra Properties",
    tagline: "Digital backbone for Nagpur's growing real estate player",
    type: "website",
    industry: "Real Estate",
    client: "Manish Group",
    liveUrl: "https://www.mginfraproperties.in",
    year: "2024",
    problem: "MG Infra was managing all property listings via WhatsApp groups and word-of-mouth. No centralized website, no lead tracking, and potential buyers couldn't browse properties independently.",
    solution: "Built a professional property listing website with search filters, area-wise browsing, lead capture forms, and integrated CRM for automated follow-ups.",
    keyFeatures: ["Property listing manager", "Lead capture forms", "Area-wise search", "WhatsApp lead routing", "Responsive design"],
    techStack: ["Next.js", "Tailwind CSS", "Node.js"],
    stats: [
      { value: "3x", label: "Lead Capture Increase" },
      { value: "0", label: "Missed Inquiries" },
      { value: "70%", label: "Faster Response" },
    ],
    thumbnail: "/images/screenshots/mg-infra.png",
    servicesDelivered: ["Web Development", "CRM Integration", "Consulting"],
    tags: ["real-estate", "nagpur", "property", "leads"],
    featured: true,
    testimonial: {
      quote: "Before Shaibya, we were losing leads because we couldn't respond fast enough. Now every inquiry gets captured automatically and routed to the right person.",
      name: "Manish G.",
      role: "Director, MG Infra Properties",
    },
  },
  {
    slug: "parmatma-ek-real-estate",
    name: "Parmatma Ek Real Estate",
    tagline: "Lead generation engine for a Nagpur real estate agency",
    type: "website",
    industry: "Real Estate",
    client: "Parmatma Ek Real Estate",
    liveUrl: "https://www.parmatmaekrealestate.com",
    year: "2024",
    problem: "The agency relied entirely on personal networks and physical visits. No digital presence meant zero organic lead generation and complete dependency on referrals.",
    solution: "Built a conversion-optimized website with property showcases, neighborhood guides, virtual tour links, and automated WhatsApp lead capture system.",
    keyFeatures: ["Property showcase pages", "Lead capture automation", "WhatsApp integration", "Neighborhood guides", "SEO for local search"],
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    stats: [
      { value: "2x", label: "Lead Generation" },
      { value: "50%", label: "Organic Traffic Growth" },
    ],
    thumbnail: "/images/screenshots/parmatma-ek.png",
    servicesDelivered: ["Web Development", "SEO", "Digital Marketing"],
    tags: ["real-estate", "nagpur", "leads", "property"],
  },
  {
    slug: "revolution-fitness",
    name: "Revolution Fitness",
    tagline: "Digital identity for Nagpur's fastest-growing gym",
    type: "website",
    industry: "Fitness",
    client: "Revolution Fitness",
    liveUrl: "https://www.revolutionfitnesss.in",
    year: "2024",
    problem: "Revolution Fitness had no website and relied on Instagram DMs for all communication. Potential members couldn't find class schedules, pricing, or trainer information online.",
    solution: "Built a modern, high-energy website with class schedules, trainer profiles, membership plans, transformation galleries, and direct WhatsApp enrollment.",
    keyFeatures: ["Class schedule display", "Trainer profiles", "Membership CTA", "Transformation gallery", "WhatsApp enrollment"],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    stats: [
      { value: "120→350", label: "Member Growth" },
      { value: "60%", label: "Online Enrollments" },
    ],
    thumbnail: "/images/screenshots/revolution-fitness.png",
    servicesDelivered: ["Web Development", "Social Media Strategy", "Consulting"],
    tags: ["fitness", "gym", "nagpur", "membership"],
    featured: true,
  },
  {
    slug: "snyppit",
    name: "Snyppit",
    tagline: "Fashion delivered in minutes — from idea to live platform",
    type: "website",
    industry: "Fashion Tech",
    client: "Snyppit (Startup)",
    liveUrl: "https://www.snyypit.com",
    year: "2025",
    problem: "A student walked up with nothing but a plan and fire in his eyes: fashion delivered in minutes, like food delivery but for clothes. No tech team, no platform, just a vision.",
    solution: "Built the complete platform from scratch — product listing, delivery flow, order management, customer-facing website. From idea to live in weeks.",
    keyFeatures: ["Product catalog", "Order management", "Delivery tracking", "Payment integration", "Mobile-first UX"],
    techStack: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    stats: [
      { value: "Live", label: "Platform Status" },
      { value: "4 weeks", label: "Idea to Launch" },
    ],
    thumbnail: "/images/solutions/memorybox.png",
    servicesDelivered: ["Full-stack Development", "UI/UX Design", "Consulting"],
    tags: ["fashion", "startup", "ecommerce", "delivery"],
    featured: true,
  },
];

// ═══════════════════════════════════════════════════════════════
// TYPE 2 — SYSTEMS & SOLUTIONS
// ═══════════════════════════════════════════════════════════════

export const solutionProjects: Project[] = [
  {
    slug: "coaltrack-ai",
    name: "CoalTrack AI",
    tagline: "Smart billing automation for coal distributors",
    type: "solution",
    industry: "Logistics & Admin",
    client: "Coal Distribution Co.",
    year: "2024",
    problem: "4 employees spent an entire week manually entering billing data. Errors were common, reports were delayed, and the process consumed massive resources.",
    solution: "AI-based OCR tool where users click a photo of a bill & upload. Automated pipeline extracts fields, validates them, and generates structured Excel files with custom business logic.",
    keyFeatures: ["OCR bill scanning", "Auto-Excel report generation", "Multi-branch support", "Daily/weekly automated reports", "Validation & error detection"],
    techStack: ["Python", "FastAPI", "OpenAI Vision", "React", "PostgreSQL"],
    stats: [
      { value: "95%", label: "Faster Processing", context: "7 days → 4 hours" },
      { value: "75%", label: "Manpower Reduction", context: "4 staff → 1" },
      { value: "500+", label: "Bills/Day" },
      { value: "90%", label: "Error Reduction" },
    ],
    thumbnail: "/images/solutions/coal.png",
    servicesDelivered: ["AI Automation", "Web Development", "Consulting"],
    tags: ["ai", "ocr", "automation", "billing", "logistics"],
    featured: true,
    testimonial: {
      quote: "Shaibya built our CoalTrack AI system that turned a 7-day manual billing process into a 4-hour automated workflow. It's been a game-changer for our operations.",
      name: "Rajesh K.",
      role: "Operations Head, Coal Distribution Co.",
    },
  },
  {
    slug: "fitmanage-360",
    name: "FitManage 360",
    tagline: "All-in-one gym management system",
    type: "solution",
    industry: "Fitness",
    client: "Revolution Fitness, Wave Fitness, Arnold Gold Gym, FitLife Gym, FitLife Fitness Studio",
    year: "2024",
    problem: "Gym owners tracked everything on registers and Excel. Renewals were missed, attendance was manual, trainers weren't tracked, and revenue was leaking from no-show members and expired cards.",
    solution: "End-to-end membership system with automated renewal reminders, attendance tracking, trainer scheduling, workout & diet plan builder, payment dashboard, and social media strategy.",
    keyFeatures: ["Membership management + auto renewals", "Attendance tracking (biometric/QR/manual)", "Trainer assignment & scheduling", "Workout & diet plan builder", "Payment tracking + revenue dashboard", "WhatsApp renewal nudges + inquiry bot"],
    techStack: ["React", "Node.js", "PostgreSQL", "WhatsApp API", "Razorpay"],
    stats: [
      { value: "120→350", label: "Members Growth", context: "Revolution Fitness" },
      { value: "80%", label: "Admin Time Saved" },
      { value: "25%", label: "Renewal Rate Increase" },
      { value: "5", label: "Gym Brands Using It" },
    ],
    thumbnail: "/images/solutions/fitlife.png",
    servicesDelivered: ["Product Development", "WhatsApp Automation", "Consulting"],
    tags: ["fitness", "gym-management", "saas", "automation"],
    featured: true,
    testimonial: {
      quote: "Before Shaibya, I was spending 3 hours a day on WhatsApp chasing renewals. Now it happens automatically. We grew from 120 to 350 members without adding admin staff.",
      name: "Owner",
      role: "Revolution Fitness, Nagpur",
    },
  },
  {
    slug: "property-management",
    name: "Property Management System",
    tagline: "CRM + lead automation for real estate agents",
    type: "solution",
    industry: "Real Estate",
    client: "Manish Group, Parmatma Ek Real Estate",
    year: "2024",
    problem: "Agents managed leads on WhatsApp and notebooks. No CRM, no follow-up automation, site visit scheduling was all manual, and document management was chaotic.",
    solution: "Lead capture from website → CRM pipeline. Property listing manager, client follow-up automation, site visit scheduler with confirmation reminders, document management, and commission tracking.",
    keyFeatures: ["Lead capture → CRM pipeline", "Property listing manager", "Client follow-up automation (WhatsApp/email)", "Site visit scheduler + reminders", "Document management (agreements, KYC)", "Commission & deal tracking dashboard"],
    techStack: ["React", "Node.js", "PostgreSQL", "WhatsApp API"],
    stats: [
      { value: "3x", label: "Lead Capture Increase" },
      { value: "70%", label: "Faster Response Time" },
      { value: "0", label: "Missed Follow-ups" },
    ],
    thumbnail: "/images/solutions/vims.png",
    servicesDelivered: ["Product Development", "CRM Integration", "Consulting"],
    tags: ["real-estate", "crm", "automation", "lead-management"],
    featured: true,
  },
  {
    slug: "dairy-management",
    name: "Dairy Management System",
    tagline: "Digital operations for dairy businesses",
    type: "solution",
    industry: "Agriculture",
    client: "Local Dairy Business",
    year: "2024",
    problem: "A dairy business tracked daily milk collection, fat testing, and payments entirely on paper. Errors in calculation led to disputes with farmers and revenue discrepancies.",
    solution: "Built a digital system for daily collection tracking, automated fat-based pricing, farmer payment calculation, and monthly report generation.",
    keyFeatures: ["Daily collection tracking", "Fat-based price calculator", "Farmer payment automation", "Monthly reports", "Multi-collection point support"],
    techStack: ["React", "Node.js", "MySQL"],
    stats: [
      { value: "100%", label: "Digitized Records" },
      { value: "0", label: "Payment Disputes" },
    ],
    thumbnail: "/images/solutions/coal.png",
    servicesDelivered: ["Product Development", "Consulting"],
    tags: ["dairy", "agriculture", "automation"],
  },
  {
    slug: "shop-management",
    name: "Shop Management System",
    tagline: "Inventory and billing for retail shops",
    type: "solution",
    industry: "Retail",
    client: "Local Retail Business",
    year: "2024",
    problem: "A retail shop owner managed inventory on paper and billing through a basic calculator. Stock tracking was impossible and theft/loss went undetected.",
    solution: "Built a simple yet powerful POS and inventory management system with barcode scanning, stock alerts, daily sales reports, and GST-compliant billing.",
    keyFeatures: ["POS billing system", "Inventory tracking", "Low stock alerts", "Daily/monthly sales reports", "GST-compliant invoicing"],
    techStack: ["React", "Node.js", "MySQL"],
    stats: [
      { value: "50%", label: "Faster Billing" },
      { value: "100%", label: "Stock Visibility" },
    ],
    thumbnail: "/images/solutions/memorybox.png",
    servicesDelivered: ["Product Development"],
    tags: ["retail", "pos", "inventory", "billing"],
  },
  {
    slug: "medireach-pro",
    name: "MediReach Pro",
    tagline: "Digital growth suite for hospitals",
    type: "solution",
    industry: "Healthcare",
    client: "VIMS Hospital Nagpur",
    year: "2024",
    problem: "VIMS Hospital lacked digital presence. Patients had to call or visit physically. Marketing reach was minimal and patient management relied entirely on the call center.",
    solution: "SEO-optimized website with online booking, doctor profiles, automated appointment reminders, social media management, and Google Business optimization.",
    keyFeatures: ["Online appointment booking", "Doctor profile management", "Automated reminders (SMS/WhatsApp)", "Social media growth strategy", "Google Business optimization"],
    techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "WhatsApp API"],
    stats: [
      { value: "70%", label: "Less Call Center Dependency" },
      { value: "2.5x", label: "New Patient Increase" },
      { value: "10k+", label: "Monthly Website Visits" },
      { value: "35%", label: "No-show Reduction" },
    ],
    thumbnail: "/images/solutions/cellcurehub.png",
    servicesDelivered: ["Web Development", "Digital Marketing", "SEO", "Consulting"],
    tags: ["healthcare", "hospital", "digital-marketing", "seo"],
    featured: true,
  },
];

// ═══════════════════════════════════════════════════════════════
// TYPE 3 — R&D / MVP BUILDS
// ═══════════════════════════════════════════════════════════════

export const rndProjects: Project[] = [
  {
    slug: "mirragio-shopping-bot",
    name: "Smart Shopping Bot",
    tagline: "AI-powered shopping assistant for fashion retail",
    type: "rnd",
    industry: "Fashion / Retail",
    client: "Mirragio",
    collaborator: "Mirragio",
    year: "2025",
    status: "MVP",
    problem: "Online fashion shopping is overwhelming. Customers spend hours browsing and often abandon carts because they can't find what they want or get confused by choices.",
    solution: "Built an intelligent shopping bot that understands natural language preferences, recommends outfits based on style/occasion/budget, and guides the customer to purchase.",
    journey: "Worked closely with Mirragio's team to understand their product catalog and customer behavior. Experimented with multiple conversational AI approaches before settling on a hybrid intent-classification + generative model.",
    outcome: "A functional chatbot MVP integrated into their platform that handles product discovery, size recommendations, and direct purchase links.",
    keyFeatures: ["Natural language product search", "Style-based recommendations", "Size guide integration", "Cart integration"],
    techStack: ["Python", "OpenAI API", "React", "Node.js"],
    stats: [
      { value: "3x", label: "Product Discovery Speed" },
      { value: "40%", label: "Less Cart Abandonment" },
    ],
    thumbnail: "/images/solutions/memorybox.png",
    servicesDelivered: ["AI Development", "R&D"],
    tags: ["ai", "chatbot", "fashion", "ecommerce"],
  },
  {
    slug: "bridgestone-hrms",
    name: "HRMS Bot",
    tagline: "Automated HR management for enterprise",
    type: "rnd",
    industry: "Manufacturing",
    client: "Bridgestone",
    collaborator: "Bridgestone",
    year: "2025",
    status: "MVP",
    confidential: true,
    problem: "HR teams at large manufacturing plants handle thousands of employee queries daily — leave balances, payslip requests, policy questions — consuming significant HR bandwidth.",
    solution: "Built a WhatsApp-based HRMS bot that employees can query for leave balance, payslip downloads, policy FAQs, and leave applications — all without contacting HR.",
    journey: "Integrated with Bridgestone's existing HRMS database through secure APIs. Biggest challenge was handling multi-language queries (Hindi + English) and ensuring data privacy compliance.",
    outcome: "A production-ready bot handling 500+ employee queries per day, reducing HR ticket volume by 60%.",
    keyFeatures: ["Leave balance inquiry", "Payslip download", "Policy FAQ", "Leave application via WhatsApp", "Multi-language support"],
    techStack: ["Python", "WhatsApp Business API", "PostgreSQL", "FastAPI"],
    stats: [
      { value: "500+", label: "Daily Queries Handled" },
      { value: "60%", label: "HR Ticket Reduction" },
    ],
    thumbnail: "/images/solutions/coal.png",
    servicesDelivered: ["AI Development", "WhatsApp Automation", "R&D"],
    tags: ["hr", "enterprise", "chatbot", "automation"],
  },
  {
    slug: "biscuit-management",
    name: "Biscuit Management System",
    tagline: "Production & distribution tracking for FMCG",
    type: "rnd",
    industry: "FMCG / Manufacturing",
    client: "Renowned Nagpur Company",
    year: "2025",
    status: "Production",
    confidential: true,
    problem: "A biscuit manufacturing company tracked production batches, quality control, and distribution on paper registers. Inventory mismatches and delayed shipments were common.",
    solution: "Built a production tracking system with batch management, quality control checkpoints, distribution route planning, and real-time inventory visibility.",
    journey: "Spent a week on the factory floor understanding the production pipeline. Mapped every manual step to a digital workflow, ensuring the system was simpler than the paper process it replaced.",
    outcome: "Fully deployed system used daily by production staff. Inventory accuracy went from ~70% to 99%, and distribution delays reduced by 50%.",
    keyFeatures: ["Batch tracking", "Quality control checkpoints", "Distribution management", "Real-time inventory", "Production analytics"],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
    stats: [
      { value: "99%", label: "Inventory Accuracy", context: "Up from ~70%" },
      { value: "50%", label: "Less Distribution Delays" },
    ],
    thumbnail: "/images/solutions/coal.png",
    servicesDelivered: ["Product Development", "Consulting"],
    tags: ["manufacturing", "fmcg", "inventory", "production"],
  },
  {
    slug: "law-practitioner-ai",
    name: "Law Practitioner AI",
    tagline: "AI legal assistant for Indian law practitioners",
    type: "rnd",
    industry: "Legal",
    client: "Internal R&D",
    year: "2025",
    status: "Prototype",
    problem: "Junior lawyers spend hours researching case law and legal precedents. Access to relevant judgments is fragmented across multiple databases.",
    solution: "An AI-powered legal research assistant that can search Indian case law, summarize judgments, identify relevant precedents, and draft preliminary legal arguments.",
    journey: "Built a RAG (Retrieval Augmented Generation) system over Indian legal databases. The challenge was ensuring accuracy — in law, hallucinated citations are dangerous.",
    outcome: "A working prototype that can answer legal questions with cited sources. Currently being tested with 3 practicing lawyers for accuracy validation.",
    keyFeatures: ["Case law search", "Judgment summarization", "Precedent identification", "Draft argument generation"],
    techStack: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI"],
    stats: [
      { value: "10x", label: "Faster Research" },
      { value: "3", label: "Lawyers Testing" },
    ],
    thumbnail: "/images/solutions/cellcurehub.png",
    servicesDelivered: ["AI Development", "R&D"],
    tags: ["ai", "legal", "nlp", "research"],
  },
  {
    slug: "fly-ash-bricks",
    name: "Fly Ash Bricks Management",
    tagline: "Production & order tracking for brick manufacturing",
    type: "rnd",
    industry: "Construction",
    client: "Local Manufacturer",
    collaborator: "Construction Industry Partner",
    year: "2024",
    status: "Production",
    problem: "A fly ash brick manufacturer managed production quantities, orders, and delivery schedules on paper. Order mix-ups and production shortfalls were common.",
    solution: "Built an order management system with production tracking, delivery scheduling, and customer invoicing — all accessible from a mobile-friendly dashboard.",
    keyFeatures: ["Order management", "Production tracking", "Delivery scheduling", "Mobile dashboard", "Invoice generation"],
    techStack: ["React", "Node.js", "MySQL"],
    stats: [
      { value: "0", label: "Order Mix-ups" },
      { value: "100%", label: "Delivery Visibility" },
    ],
    thumbnail: "/images/solutions/pushkarna.png",
    servicesDelivered: ["Product Development"],
    tags: ["construction", "manufacturing", "order-management"],
  },
  {
    slug: "dal-mill-oms",
    name: "Dal Mill Order Management",
    tagline: "Order and inventory system for grain processing",
    type: "rnd",
    industry: "Agriculture / Processing",
    client: "Local Dal Mill",
    year: "2024",
    status: "Production",
    problem: "A dal mill processing unit tracked incoming grain orders, processing status, and outgoing deliveries manually. Delays in order fulfillment and inventory mismatches were frequent.",
    solution: "Built an order management system tracking the full grain processing lifecycle — from raw material intake to processed output and delivery dispatching.",
    keyFeatures: ["Order tracking", "Processing status updates", "Inventory management", "Delivery dispatch", "Daily reports"],
    techStack: ["React", "Node.js", "MySQL"],
    stats: [
      { value: "40%", label: "Faster Order Fulfillment" },
      { value: "100%", label: "Inventory Tracking" },
    ],
    thumbnail: "/images/solutions/sonarkilla.png",
    servicesDelivered: ["Product Development"],
    tags: ["agriculture", "food-processing", "order-management"],
  },
];

// ═══════════════════════════════════════════════════════════════
// COLLABORATORS
// ═══════════════════════════════════════════════════════════════

export const collaborators = [
  { name: "Manish Group", industry: "Real Estate" },
  { name: "Revolution Fitness", industry: "Fitness" },
  { name: "Wave Fitness", industry: "Fitness" },
  { name: "Arnold Gold Gym", industry: "Fitness" },
  { name: "FitLife Gym", industry: "Fitness" },
  { name: "FitLife Fitness Studio", industry: "Fitness" },
  { name: "Snyppit", industry: "Fashion Tech" },
  { name: "VIMS Hospital", industry: "Healthcare" },
  { name: "Blue Duck", industry: "Tech" },
  { name: "Ensis Innovations", industry: "Tech" },
  { name: "CyberBugs", industry: "Cybersecurity" },
  { name: "CellCureHub", industry: "Healthcare" },
  { name: "Mirragio", industry: "Fashion / Retail" },
  { name: "Bridgestone", industry: "Manufacturing" },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

export const allProjects = [...websiteProjects, ...solutionProjects, ...rndProjects];
export const featuredProjects = allProjects.filter(p => p.featured);
export const getProjectBySlug = (slug: string) => allProjects.find(p => p.slug === slug);

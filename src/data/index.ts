import {
  FaCube,
  FaLaptopCode,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaSitemap,
} from "react-icons/fa";

export const projects = [
  {
    title: "CoalTrack AI - Smart Billing Automation",
    description:
      "Coal distributors faced huge manual workload - 4 employees spending a week entering bills. Errors, delays, and resource wastage were common.\n\nSolution:\nAI-based automation tool where users click a photo of a bill & upload. Automated OCR extracts fields, validates them, and generates structured Excel files. Daily/weekly reports generated automatically with custom business logic.",
    stats: [
      { value: "95%", label: "Faster Processing (7 days → 4 hours)" },
      { value: "90%", label: "Data Entry Error Reduction" },
      { value: "75%", label: "Manpower Reduction (4 → 1)" },
      { value: "500+", label: "Bills Processed Daily" },
    ],
    image: "/images/solutions/coal.png",
  },
  {
    title: "FitManage 360 - All-in-One Gym Management App",
    description:
      "Gym owners struggled with registers & spreadsheets - tracking memberships, payments, client schedules, and renewals was messy and error-prone.\n\nSolution:\nA full-featured Gym Management App including membership/payment tracking, automated reminders, attendance management, personalized workout/diet plans, and analytics dashboards. Supports multiple branches & trainers.",
    stats: [
      { value: "80%", label: "Time Saved in Admin Work" },
      { value: "350", label: "Members Scaled from 120 → 350" },
      { value: "+40%", label: "Revenue Forecast Accuracy" },
      { value: "25%", label: "Increased Membership Renewal Rate" },
    ],
    image: "/images/solutions/fitlife.png",
  },
  {
    title: "MediReach Pro - Digital Growth & Appointment System for Hospitals",
    description:
      "Vims Hospital lacked digital presence - patients had to call or visit physically for appointments. Marketing reach was minimal and patient management inefficient.\n\nSolution:\nWebsite & Social Media Growth Suite including SEO-optimized website with online booking, doctor profiles, automated reminders, and social media management to increase patient trust.",
    stats: [
      { value: "70%", label: "Call Center Dependency Reduction" },
      { value: "2.5x", label: "Increase in New Patients" },
      { value: "10k+", label: "Monthly Website Visits" },
      { value: "35%", label: "No-show Reduction via Reminders" },
    ],
    image: "/images/solutions/cellcurehub.png",
  },
  {
    title: "VIMS Hospital Website",
    description:
      "Developed a comprehensive website for VIMS Hospital to enhance their online presence and provide essential information to patients. The website features detailed sections on services, departments, doctor profiles, patient testimonials, and contact information. It is designed with a user-friendly interface and optimized for both desktop and mobile devices.",
    stats: [
      { value: "5k+", label: "Monthly Visitors" },
      { value: "150+", label: "Doctors Listed" },
      { value: "20+", label: "Departments Highlighted" },
      { value: "4.8/5", label: "Average User Rating" },
    ],
    image: "/images/solutions/vims.png",
  },
];

export const testimonials = [
  {
    title: "From Registers to 350 Members",
    rating: 5,
    text: "Before Shaibya, I was spending 3 hours a day on WhatsApp chasing renewals. Now it happens automatically. We grew from 120 to 350 members without adding admin staff. They didn't just build software — they understood how gyms actually run.",
    author: "Revolution Fitness",
    role: "Owner, Revolution Fitness Nagpur",
  },
  {
    title: "Our Hospital Finally Went Digital",
    rating: 5,
    text: "Before Shaibya, we had zero digital presence. They built our website, set up online booking, and managed our social media growth. Within 6 months, patient inquiries tripled and call center dependency dropped by 70%.",
    author: "Dr. Meena S.",
    role: "Director, VIMS Hospital Nagpur",
  },
  {
    title: "Billing That Used to Take a Week Now Takes Hours",
    rating: 5,
    text: "Shaibya built our CoalTrack AI system that turned a 7-day manual billing process into a 4-hour automated workflow. We went from 4 employees doing data entry to just 1 person overseeing the AI. Game-changer.",
    author: "Rajesh K.",
    role: "Operations Head, Coal Distribution Co.",
  },
  {
    title: "Real Estate Leads on Autopilot",
    rating: 5,
    text: "Before working with Shaibya, we were losing leads because we couldn't respond fast enough. Now every inquiry gets captured automatically and routed to the right person. Our lead response time went from hours to minutes.",
    author: "Manish G.",
    role: "Director, MG Infra Properties Nagpur",
  },
  {
    title: "They Built Our Entire Platform in Weeks",
    rating: 5,
    text: "I walked up to Shaibya with nothing but a plan written on my phone — fashion delivered in minutes. They said yes, and within weeks we had a live platform. They don't just work for established companies; they build with founders from day zero.",
    author: "Snyppit Founder",
    role: "Founder, Snyppit - Fashion Delivered in Minutes",
  },
];

export const nav = [
  { href: "/about", label: "About Us" },
  {
    href: "#",
    label: "Industries",
    hasDropdown: true,
    dropdownItems: [
      { href: "/industry/real-estate", label: "Real Estate", icon: FaCube },
      { href: "/industry/fitness", label: "Fitness", icon: FaSitemap },
    ]
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    hasDropdown: true,
    dropdownItems: [
      { href: "/portfolio", label: "All Work", icon: FaPalette },
      { href: "/portfolio/websites", label: "Websites", icon: FaLaptopCode },
      { href: "/portfolio/solutions", label: "Solutions", icon: FaMobileAlt },
      { href: "/portfolio/rnd", label: "R&D / MVPs", icon: FaRobot }
    ]
  },
  { href: "/contact", label: "Contact" }
];

export const products = [
  {
    href: "/portfolio/solutions#coaltrack",
    label: "CoalTrack AI",
    icon: FaRobot,
  },
  {
    href: "/portfolio/solutions#fitmanage",
    label: "FitManage 360",
    icon: FaSitemap,
  },
];

// export const trustedCompanies = [
//   { src: "/logos/amazon-dark.svg", alt: "Amazon" },
//   { src: "/logos/intel.svg", alt: "Intel" },
//   { src: "/logos/flipkart.svg", alt: "Flipkart" },
//   { src: "/logos/meta-3.svg", alt: "Meta" },
//   { src: "/logos/netflix-3.svg", alt: "Netflix" },
//   { src: "/logos/tech-mahindra-new-logo.svg", alt: "Tech Mahindra" },
//   { src: "/logos/tata-consultancy-services-1.svg", alt: "Tata" },
//   { src: "/logos/tesla-motors.svg", alt: "MphasiS" },
//   { src: "/logos/porsche-2.svg", alt: "Quikr" },
//   { src: "/logos/mercedes-benz-9.svg", alt: "Montblanc" },
//   { src: "/logos/coca-cola-2021.svg", alt: "Mercedes-Benz" },
// ];

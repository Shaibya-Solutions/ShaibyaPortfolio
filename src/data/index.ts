import {
  FaBullhorn,
  FaCube,
  FaLaptopCode,
  FaLock,
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
    title: "Transformative AI Solutions",
    rating: 4,
    text: "Working with NuxaaAI was a game-changer for our business. The AI-driven customer support system they implemented reduced our response time by 85%, and our customer satisfaction has never been higher. Highly recommend!",
    author: "Sarah L.",
    role: "Head of Customer Experience, TechWave",
  },
  {
    title: "Unmatched Expertise in AI Marketing",
    rating: 5,
    text: "The AI marketing strategies from NuxaAI boosted our ROI by 200%. Their ability to target and personalize our campaigns has made a huge difference in our conversion rates. We’re thrilled with the results!",
    author: "John M.",
    role: "Chief Marketing Officer, Zenith Media",
  },
  {
    title: "AI Maintenance That Delivers Results",
    rating: 4,
    text: "Thanks to NuxaAI, we’ve cut our equipment downtime by 90% and saved 40% on maintenance costs. Their predictive maintenance solutions are incredibly accurate and have significantly improved our operations.",
    author: "Emily R.",
    role: "Operations Manager, GlobalTech Industries",
  },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/projects", label: "Portfolio" },
  { href: "/portfolio", label: "Solutions" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

export const services = [
  {
    href: "/web",
    label: "Web Development",
    icon: FaLaptopCode,
  },
  {
    href: "/mobile",
    label: "Mobile Development",
    icon: FaMobileAlt,
  },
  {
    href: "/ai",
    label: "AI Solutions",
    icon: FaRobot,
  },
  {
    href: "/3d",
    label: "3D Modeling & Animation",
    icon: FaCube,
  },
  {
    href: "/cybersecurity",
    label: "Cybersecurity",
    icon: FaLock,
  },
  {
    href: "/marketing",
    label: "Digital Marketing",
    icon: FaBullhorn,
  },
  {
    href: "/ui-ux",
    label: "UI/UX Design",
    icon: FaPalette,
  },
  {
    href: "/rd",
    label: "R&D and Innovation",
    icon: FaSitemap,
  },
];

export const products = [
  {
    href: "/portfolio#blog-coaltrack",
    label: "CoalTrack AI",
    icon: FaRobot,
  },
  {
    href: "/portfolio#blog-fitmanage",
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

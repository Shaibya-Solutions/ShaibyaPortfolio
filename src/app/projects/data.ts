// app/projects/data.ts

export interface Projects {
  id: number;
  image: string;
  title: string;
  tagline: string;
  category:
    | "Web"
    | "Mobile"
    | "AI"
    | "Cybersecurity"
    | "MVP"
    | "Others";
  deployedLink?: string;
  githubLink?: string;
  blogLink?: string;
}

export const projects: Projects[] = [
  {
    id: 1,
    image: "/images/solutions/vims.png",
    title: "VIMS Hospital Website",
    tagline:
      "A modern responsive website for VIMS Nagpur — integrating healthcare services, patient information, and appointment booking.",
    category: "Web",
    deployedLink: "https://vimsnagpur.com/",
    blogLink: "https://medium.com/@shaibyasolutions/digital-growth-appointment-system-for-vims-hospital-84efaf2f8dc1",
  },
  {
    id: 2,
    image: "/images/solutions/sonarkilla.png",
    title: "SonarKilla Tours",
    tagline:
      "A tourism and travel platform showcasing luxury Rajasthan experiences, desert safaris, and cultural journeys.",
    category: "Web",
    deployedLink: "https://sonarkillatours.in/",
    blogLink: "https://medium.com/@shaibyasolutions/digital-transformation-for-sonarkilla-tours-bringing-travel-dreams-online-f65e51523e60",
  },
  {
    id: 3,
    image: "/images/solutions/fitlife.png",
    title: "FitLife Gym App",
    tagline:
      "A fitness and membership management mobile app that tracks workouts, schedules, and progress for gym members.",
    category: "Mobile",
    blogLink: "https://medium.com/@shaibyasolutions/fitmanage-360-all-in-one-gym-management-app-that-cut-admin-work-by-80-e7f11612fc4a",
  },
  {
    id: 4,
    image: "/images/solutions/memorybox.png",
    title: "BrainBox AI",
    tagline:
      "An AI-powered MVP platform that helps businesses harness and visualize their data for smarter decisions.",
    category: "AI",
    blogLink: "/blog/memorybox-ai",
  },
  {
    id: 5,
    image: "/images/solutions/cellcurehub.png",
    title: "CellCure Hub",
    tagline:
      "A smart mobile repair and accessories system with live tracking, part reminders, and digital invoices.",
    category: "MVP",
    blogLink: "/blog/cellcure-hub",
  },
  {
    id: 6,
    image: "/images/solutions/pushkarna.png",
    title: "Pushkarna One App",
    tagline:
      "A society super-app with business directory, education, matrimony, donations, and community features.",
    category: "Mobile",
    blogLink: "/blog/pushkarna-one",
  },
];

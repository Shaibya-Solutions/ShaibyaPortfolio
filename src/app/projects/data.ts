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
    blogLink: "/blog/vims-hospital-website",
  },
  {
    id: 2,
    image: "/images/solutions/sonarkilla.png",
    title: "SonarKilla Tours",
    tagline:
      "A tourism and travel platform showcasing luxury Rajasthan experiences, desert safaris, and cultural journeys.",
    category: "Web",
    deployedLink: "https://sonarkillatours.in/",
    blogLink: "/blog/sonarkilla-tours",
  },
  {
    id: 3,
    image: "/images/solutions/fitlife.png",
    title: "FitLife Gym App",
    tagline:
      "A fitness and membership management mobile app that tracks workouts, schedules, and progress for gym members.",
    category: "Mobile",
    blogLink: "/blog/fitlife-gym-app",
  },
  {
    id: 4,
    image: "/images/solutions/memorybox.png",
    title: "MemoryBox AI",
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

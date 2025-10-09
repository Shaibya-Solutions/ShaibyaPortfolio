// app/careers/page.tsx
"use client";
import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { motion, useInView, Variants } from "framer-motion";
import Carousel, { CarouselItem } from "@/components/carousel";
import {
  FiFileText,
  FiUsers,
  FiCode,
  FiLayers,
  FiCamera,
  FiTrendingUp,
} from "react-icons/fi";
import { JSX, useRef } from "react";
import Link from "next/link";
import {
  BsLaptop,
  BsLightbulb,
  BsPeople,
  BsGlobe,
  BsPalette,
  BsShieldLock,
  BsCode,
} from "react-icons/bs";
import SpotlightCard from "@/components/SpotlightCard";

// Internal component for the internship benefits cards
const InternshipCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/60 transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="text-4xl text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
  );
};

// Define the data for the application process carousel
const applicationProcess: CarouselItem[] = [
  {
    title: "Resume & Projects",
    description:
      "Submit your resume, past projects, and a cover letter explaining why you want to work with us.",
    id: 1,
    icon: <FiFileText className="h-[28px] w-[28px] text-cyan-400" />,
  },
  {
    title: "Interview",
    description:
      "A two-part interview to assess your technical skills and cultural fit with our team.",
    id: 2,
    icon: <FiUsers className="h-[28px] w-[28px] text-cyan-400" />,
  },
  {
    title: "Take-Home Task",
    description:
      "A small, real-world task to demonstrate your problem-solving and coding abilities.",
    id: 3,
    icon: <FiCode className="h-[28px] w-[28px] text-cyan-400" />,
  },
  {
    title: "Offer & Onboarding",
    description:
      "If successful, we'll extend an offer and start you on a custom learning path with a dedicated mentor.",
    id: 4,
    icon: <FiLayers className="h-[28px] w-[28px] text-cyan-400" />,
  },
];

const internshipRoles = [
  {
    title: "Interface Engineer",
    description:
      "Bring our designs to life with clean, performant code that powers the user experience.",
    icon: <BsPalette className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Logic Architect",
    description:
      "Design and build the robust and scalable back-end systems that drive our applications.",
    icon: <BsCode className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Intelligence Engineer",
    description:
      "Work on cutting-edge AI and machine learning models to solve complex problems and create intelligent solutions.",
    icon: <BsLightbulb className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Brand Storyteller",
    description:
      "Craft compelling narratives and manage our social media presence to connect with our audience.",
    icon: <FiTrendingUp className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Visual Artist",
    description:
      "Create stunning video content and visual effects that showcase our products and brand identity.",
    icon: <FiCamera className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Digital Guardian",
    description:
      "Help secure our systems by identifying vulnerabilities and ensuring our platforms are protected.",
    icon: <BsShieldLock className="h-6 w-6 text-cyan-400" />,
  },
];

export default function CareersPage() {
  const internshipBenefits = [
    {
      title: "Hands-on Experience",
      description:
        "Work on live, real-world projects that make a tangible impact on our business and clients.",
      icon: <BsLaptop />,
    },
    {
      title: "Learning Opportunities",
      description:
        "Receive mentorship from seasoned professionals and expand your skillset with access to the latest tech.",
      icon: <BsLightbulb />,
    },
    {
      title: "Global Collaboration",
      description:
        "Collaborate with diverse teams and global clients, gaining invaluable industry exposure.",
      icon: <BsGlobe />,
    },
    {
      title: "Performance Rewards",
      description:
        "Your hard work is rewarded with performance-based gifts and exclusive Shaibya merch.",
      icon: <BsPeople />,
    },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />
      {/* Hero Section */}
      <Section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Internships at Shaibya Solutions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Kickstart your career by working on cutting-edge AI and software
            projects.
          </p>
          <Link
            href="#"
            className="mt-8 inline-block px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg shadow-lg hover:bg-cyan-400 transition transform hover:scale-105"
          >
            Apply Now
          </Link>
        </motion.div>
      </Section>
      {/* Why Intern with Us Section */}
      <Section className="py-16 bg-slate-900 border-t border-b border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Intern with Us?
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            We believe in nurturing talent and building future leaders. Our
            programs are designed for maximum growth.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {internshipBenefits.map((benefit, index) => (
            <InternshipCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </Section>

      {/* Internship Roles Section */}
      <Section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build Something Cool
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-10">
            Let's make a change and build cool stuff together, outside the
            college walls.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internshipRoles.map((role, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="p-6">
                <div className="text-3xl mb-4">{role.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-slate-400">{role.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg text-slate-400">Can't find the right fit?</p>
          <p className="text-md text-slate-500 mt-2">
            Just mail us with your skill sets and we'll get back to you if a
            suitable opportunity arises.
          </p>
          <a
            href="mailto:contact@yourcompany.com" // Update with your email
            className="mt-4 inline-block text-lg font-semibold text-cyan-400 hover:text-cyan-500 transition"
          >
            Email Us →
          </a>
        </div>
      </Section>
      {/* The Application Process Section with Carousel */}
      <Section className="py-20 bg-slate-900 border-t border-b border-slate-800 relative overflow-hidden">
        {/* Glowing background element */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at 50% -20%, rgba(6, 182, 212, 0.4), transparent 70%)`,
          }}
        />
        {/* Content */}
        <div className="relative z-10 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Application Process
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A simple, transparent process designed to get to know the real you.
          </p>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex justify-center">
          <Carousel
            items={applicationProcess}
            baseWidth={320}
            autoplay={false}
            loop={false}
            round={false}
          />
        </div>
      </Section>
      <SiteFooter />
    </main>
  );
}

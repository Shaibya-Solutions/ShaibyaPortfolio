// app/careers/page.tsx
"use client";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { motion, useInView, Variants } from "framer-motion";
import { JSX, useRef } from "react";
import Link from "next/link";
import {
  BsLaptop,
  BsLightbulb,
  BsPeople,
  BsWallet2,
  BsGlobe,
} from "react-icons/bs";
import Image from "next/image";

// Internal component for the job cards
const JobCard = ({
  title,
  location,
  type,
}: {
  title: string;
  location: string;
  type: string;
}) => {
  return (
    <Link
      href="#"
      className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 transition-colors duration-200 hover:border-cyan-500"
    >
      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <div className="mt-2 text-sm text-slate-400">
        <span>{location}</span> &bull; <span>{type}</span>
      </div>
    </Link>
  );
};

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

// Internal component for the application process steps
const ProcessStep = ({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const stepVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex items-start gap-4"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex-shrink-0">
        {step}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
};

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

  const applicationProcess = [
    {
      step: 1,
      title: "Resume & Projects",
      description:
        "Submit your resume, past projects, and a cover letter explaining why you want to work with us.",
    },
    {
      step: 2,
      title: "Interview",
      description:
        "A two-part interview to assess your technical skills and cultural fit with our team.",
    },
    {
      step: 3,
      title: "Take-Home Task",
      description:
        "A small, real-world task to demonstrate your problem-solving and coding abilities.",
    },
    {
      step: 4,
      title: "Offer & Onboarding",
      description:
        "If successful, we'll extend an offer and start you on a custom learning path with a dedicated mentor.",
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
            href="#" // Add a link to your application form
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
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Explore Our Internships
        </h2>
        <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-10">
          We offer diverse roles for students passionate about technology and
          innovation.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search roles..."
            className="px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-500 border border-slate-700 w-full md:w-auto"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 w-full md:w-auto">
            <option>All Roles</option>
            <option>Software Engineering</option>
            <option>AI/ML</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Add a placeholder image and a job card */}
          <div className="relative group rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-colors duration-200">
            <Image
              src="/images/intern-image-1.jpg" // Add your image here
              alt="Team working on a project"
              width={500}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6">
              <JobCard
                title="Software Engineering Intern"
                location="Noida, India"
                type="Internship"
              />
            </div>
          </div>
          <div className="relative group rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-colors duration-200">
            <Image
              src="/images/intern-image-2.jpg" // Add your image here
              alt="Data analysis"
              width={500}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6">
              <JobCard
                title="AI/ML Research Intern"
                location="Remote"
                type="Internship"
              />
            </div>
          </div>
          <div className="relative group rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-colors duration-200">
            <Image
              src="/images/intern-image-3.jpg" // Add your image here
              alt="Designer at work"
              width={500}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-6">
              <JobCard
                title="Product Design Intern"
                location="Noida, India"
                type="Internship"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="#"
            className="text-lg font-semibold text-cyan-400 hover:text-cyan-500 transition"
          >
            View all internship opportunities →
          </Link>
        </div>
      </Section>

      {/* The Application Process Section */}
      <Section className="py-20 bg-slate-900 border-t border-b border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Application Process
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A simple, transparent process designed to get to know the real you.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {applicationProcess.map((step, index) => (
            <ProcessStep
              key={index}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

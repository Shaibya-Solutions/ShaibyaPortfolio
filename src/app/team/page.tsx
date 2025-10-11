"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import FlowingMenu from "@/components/FlowingMenu";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  MapPin,
  Briefcase,
  Moon,
  Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Section } from "@/components/shared/section";
import { CrewMember, TEAM_MEMBERS } from "@/data/team";
import Link from "next/link";
import FooterCTA from "@/components/layout/footer/footer-cta";

const useScrollToRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return [ref, scrollTo] as const;
};

const CodenameCard: React.FC<
  CrewMember & { isActive: boolean; onClick: () => void }
> = ({
  codename,
  dayJob,
  nightSkill,
  location,
  hoverQuote,
  icon: Icon,
  color,
  isActive,
  onClick,
}) => {
  const TypedIcon = Icon as React.FC<React.SVGProps<SVGSVGElement>>;
  return (
    <motion.div
      className={`relative p-6 rounded-xl overflow-hidden cursor-pointer bg-[#0a0f1f] border border-slate-800/50 shadow-lg group flex flex-col justify-between h-[220px] transition-all duration-300 ${
        isActive ? "z-30 scale-105" : ""
      }`}
      whileHover={{ scale: 1.05, rotate: isActive ? 0 : -1.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        boxShadow: `0 0 15px ${color}10`,
        border: `1px solid ${color}40`,
      }}
      onClick={onClick}
    >
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            "radial-gradient(ellipse at bottom, #0a0f1f 0%, #010101 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div
          className='star-field absolute inset-0'
          style={{
            background: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')`,
          }}
        ></div>
      </div>
      <motion.div
        className='absolute inset-0 rounded-xl pointer-events-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: `0 0 25px ${color}` }}
      />
      <motion.div
        className='relative z-10 flex flex-col justify-between h-full'
        initial={{ opacity: 1, scale: 1, z: 1 }}
        whileHover={{ opacity: 0, scale: 0.9, z: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className='flex items-start justify-between'>
          <TypedIcon
            style={{ color: color }}
            className='w-8 h-8 flex-shrink-0'
          />
          <p className='text-xs text-[#a8b2d1] flex items-center pt-1'>
            <MapPin className='w-3 h-3 mr-1 text-slate-500' /> {location}
          </p>
        </div>
        <div className='mt-4'>
          <h3 className='text-3xl font-extrabold text-white leading-none mb-1'>
            {codename}
          </h3>
          <p className='text-sm text-slate-400'>
            Day Job:{" "}
            <span className='text-[#00f6ff] font-semibold'>{dayJob}</span>
          </p>
          <p className='text-sm text-slate-400'>
            Night Skill:{" "}
            <span className='text-[#ffc700] font-semibold'>{nightSkill}</span>
          </p>
        </div>
      </motion.div>
      <motion.div
        className='absolute inset-0 p-6 flex items-center justify-center bg-black/95 rounded-xl border-2 border-transparent z-20'
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ border: `2px solid ${color}80` }}
      >
        <p className='text-xl italic text-center font-medium text-white max-w-[80%]'>
          “{hoverQuote}”
        </p>
      </motion.div>
    </motion.div>
  );
};

const MANIFESTO_QUOTES = [
  "We're not moonlighters. We're dream-shapers.",
  "Passion doesn't clock out at 6PM.",
  "Weekends are our launchpads.",
  "Not rebels — just restless.",
  "We don’t chase hype. We build quietly.",
];

const ManifestoCarousel = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % MANIFESTO_QUOTES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      className='relative h-48 flex items-center justify-center text-center px-4'
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode='wait'>
        <motion.p
          key={index}
          className='text-2xl sm:text-3xl lg:text-4xl italic text-white font-medium max-w-4xl mx-auto absolute'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ textShadow: "0 0 10px #ffc70040" }}
        >
          “{MANIFESTO_QUOTES[index]}”
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedDivider: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} className='hidden lg:block w-px h-full relative'>
      <motion.div
        className='absolute w-full bg-gradient-to-b from-transparent via-[#e400f6]/80 to-transparent'
        style={{ height: "30%", top: "0%" }}
        animate={
          inView
            ? {
                top: ["0%", "70%", "0%"],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className='absolute inset-0 bg-slate-800/50 w-px h-full' />
    </div>
  );
};

export default function NightCrewPage() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [crewGridRef, scrollToCrewGrid] = useScrollToRef();

  // Prepare the data for the FlowingMenu component
  const flowingMenuItems = useMemo(() => {
    // Get unique locations from the TEAM_MEMBERS array
    const uniqueLocations = Array.from(
      new Set(TEAM_MEMBERS.map((member) => member.location))
    );

    return uniqueLocations.map((location, index) => ({
      link: "#", // Add a real link if needed, e.g., to a filter or map
      text: location,
      image: `https://picsum.photos/600/400?random=${index + 1}`,
    }));
  }, []);

  return (
    <main className='min-h-screen bg-[#0a0f1f] text-[#a8b2d1]'>
      <SiteHeader />
      {/* 1. Hero Section */}
      <Section className='mt-16 mb-24 text-center relative overflow-hidden'>
        <div className='absolute inset-0 opacity-50 pointer-events-none'>
          <div className='absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#e400f6] opacity-5 blur-3xl' />
          <div className='absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#00f6ff] opacity-5 blur-3xl' />
        </div>
        <motion.h1
          className='relative text-7xl sm:text-8xl lg:text-[10rem] font-extrabold tracking-tighter text-white'
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textShadow: "0 0 15px #00f6ff80" }}
        >
          Meet The <span className='text-[#00f6ff]'>Night Crew</span>
        </motion.h1>
        <motion.div
          className='mt-6 text-xl max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Builders of dreams between deadlines. We are{" "}
          <span
            className='font-bold'
            style={{ color: "#ffc700", textShadow: "0 0 5px #ffc70080" }}
          >
            <Typewriter
              words={[
                "Coders.",
                "Designers.",
                "Automators.",
                "Creators.",
                "Hustlers.",
              ]}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </motion.div>
        <motion.div
          className='mt-4 text-lg max-w-4xl mx-auto italic'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <ManifestoCarousel />
        </motion.div>
        <motion.button
          onClick={scrollToCrewGrid}
          className='mt-12 px-8 py-3 text-lg font-bold rounded-full bg-cyan-500/10 border border-cyan-500/50 text-white shadow-lg relative overflow-hidden'
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 25px #00f6ff`,
            transition: { duration: 0.3 },
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className='relative z-10'
            initial={{ textShadow: "0 0 10px #00f6ff" }}
            animate={{ textShadow: "0 0 20px #00f6ff" }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          >
            See Our Crew
          </motion.span>
          <motion.div
            className='absolute inset-0 bg-cyan-500/20'
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.button>
      </Section>

      {/* 2. Team Grid Section ("Our Crew") */}
      <Section className='mb-24' ref={crewGridRef}>
        <h2 className='text-4xl font-bold text-white mb-12 text-center'>
          Our Operatives (Codename Cards)
        </h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          <AnimatePresence>
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.codename}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CodenameCard
                  {...member}
                  isActive={activeLocation === member.location}
                  onClick={() => setActiveLocation(member.location)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
      {/* 3. "Day vs. Night" Section */}
      <Section className='mb-24'>
        <div className='grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-start'>
          <div className='text-center lg:text-right'>
            <div className='inline-flex items-center text-3xl font-bold text-[#00f6ff] mb-4'>
              <Briefcase className='w-6 h-6 mr-3' /> By Day
            </div>
            <h3 className='text-xl text-white mb-4'>The Professionals</h3>
            <p className='text-lg'>
              We clock in as **Senior Developers, Data Scientists, and
              Engineering Leaders** for top-tier global companies. This is where
              we hone our craft, learn new tech, and master scalable production
              environments.
            </p>
          </div>
          <AnimatedDivider />
          <div className='text-center lg:text-left'>
            <div className='inline-flex items-center text-3xl font-bold text-[#ffc700] mb-4'>
              <Moon className='w-6 h-6 mr-3' /> By Night
            </div>
            <h3 className='text-xl text-white mb-4'>The Creators</h3>
            <p className='text-lg'>
              When the 9-to-5 ends, the passion begins. We are **builders,
              creators, and innovators** working on decentralized apps,
              open-source tools, custom prototypes, and our own dream projects.
            </p>
          </div>
        </div>
      </Section>
      {/* 4. New "Connect & Collaborate" Section */}
      <Section className='mb-24 relative'>
        <div className='bg-slate-900 border border-slate-700/60 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
          {/* Left Column (Text & Button) */}
          <div className='text-center lg:text-left'>
            <h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
              Connect & Collaborate
            </h2>
            <p className='text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-6'>
              Explore our global presence and find a hub near you. We're always
              open to new projects and brilliant minds. Let's build together.
            </p>
            <Link
              href='https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services.' // Update this link to your contact page
            >
              <button className='cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-white px-6 py-3 text-lg font-semibold text-slate-950 shadow-lg transition hover:from-cyan-400 hover:to-white/80'>
                Connect with Us →
              </button>
            </Link>
          </div>
          {/* Right Column (FlowingMenu) */}
          <div className='w-full h-full'>
            {/* <h3 className='text-2xl font-bold text-white text-center mb-6 lg:hidden'>
              Meet us At
            </h3> */}
            <FlowingMenu items={flowingMenuItems} />
          </div>
        </div>
      </Section>
      {/* <FooterCTA /> */}
      <SiteFooter />
    </main>
  );
}

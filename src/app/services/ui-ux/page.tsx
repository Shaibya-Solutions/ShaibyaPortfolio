"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import {
  FaDraftingCompass,
  FaPencilRuler,
  FaUserFriends,
  FaClipboardList,
  FaArrowRight,
  FaFigma,
  FaPalette,
  FaCheckCircle,
  FaLaptopCode,
  FaStar,
  FaSearch,
} from "react-icons/fa";
import { Link } from "lucide-react";

export default function UIUXDetailPage() {
  // --- Data for Core Services Grid ---
  const coreServices = [
    {
      icon: <FaClipboardList className='w-8 h-8 text-indigo-400' />,
      title: "User Research & Strategy",
      content:
        "Deep-dive workshops, user interviews, empathy mapping, and defining the core job-to-be-done (JTBD).",
    },
    {
      icon: <FaPencilRuler className='w-8 h-8 text-pink-400' />,
      title: "Wireframing & Information Architecture",
      content:
        "Building logical flowcharts, low-fidelity wireframes, and sitemaps to establish content hierarchy.",
    },
    {
      icon: <FaFigma className='w-8 h-8 text-cyan-400' />,
      title: "High-Fidelity Prototyping",
      content:
        "Creating interactive mockups, design systems (in Figma/Sketch), and micro-interactions for development handoff.",
    },
    {
      icon: <FaUserFriends className='w-8 h-8 text-yellow-400' />,
      title: "Usability Testing & Iteration",
      content:
        "Conducting A/B tests and user feedback sessions to refine the design for maximum clarity and conversion.",
    },
  ];

  // --- Data for Process Timeline ---
  const processSteps = [
    {
      title: "1. Discover",
      content: "Research, user needs, competitor analysis.",
      icon: FaSearch,
    },
    {
      title: "2. Define",
      content: "Wireframes, user flows, content structure.",
      icon: FaPencilRuler,
    },
    {
      title: "3. Design",
      content: "Visual design, high-fidelity prototypes, interactions.",
      icon: FaPalette,
    },
    {
      title: "4. Deliver",
      content: "Design system finalization, dev handover, QA.",
      icon: FaCheckCircle,
    },
  ];

  // --- Data for Testimonial ---
  const testimonial = {
    quote:
      "Their design process was the most collaborative and transparent we've ever experienced. The final product adoption rates speak for themselves.",
    source: "VP of Product, FinTech Startup",
    rating: 5,
  };

  return (
    <main className='bg-slate-950 text-slate-100'>
      <SiteHeader />

      {/* 1. Unique Hero Section - Wireframe vs Finished App UI (Split Screen) */}
      <Section className='mt-16 mb-24'>
        <div className='relative border border-slate-800/60 rounded-3xl p-6 md:p-20 bg-slate-900/50 overflow-hidden shadow-2xl shadow-indigo-900/50'>
          <div className='relative z-10 max-w-5xl mx-auto text-center'>
            <FaDraftingCompass className='w-16 h-16 text-cyan-400 mx-auto mb-6' />
            <h1 className='text-5xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight'>
              Design That{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400'>
                Drives Action
              </span>
            </h1>
            <p className='mt-6 max-w-3xl mx-auto text-xl text-slate-300'>
              We translate complexity into intuitive, human-centered digital
              experiences—from **sketch to pixel-perfect UI**.
            </p>

            {/* Split Screen Visual Mockup */}
            <div className='flex justify-center gap-4 mt-12 max-w-3xl mx-auto'>
              {/* Wireframe (Low Fidelity) - Dark Themed */}
              <div className='w-1/2 p-6 rounded-xl border-4 border-slate-700 bg-slate-900 shadow-lg relative overflow-hidden'>
                <p className='text-lg font-semibold text-slate-400 mb-4'>
                  Wireframe (Structure)
                </p>
                <div className='h-6 w-3/4 bg-slate-700 mb-2'></div>
                <div className='h-4 w-full bg-slate-800 mb-1'></div>
                <div className='h-4 w-1/2 bg-slate-800 mb-6'></div>
                <div className='h-20 w-full bg-slate-700 mb-4'></div>
                <div className='h-10 w-2/3 bg-indigo-900/50 mx-auto rounded-lg'></div>
                <p className='absolute bottom-2 right-2 text-xs text-slate-600'>
                  Low-Fidelity
                </p>
              </div>
              {/* Polished UI (High Fidelity) - Dark Themed */}
              <div className='w-1/2 p-6 rounded-xl border-4 border-indigo-500 bg-slate-800 shadow-2xl shadow-indigo-900/50 relative overflow-hidden'>
                <p className='text-lg font-bold text-indigo-400 mb-4'>
                  Polished UI (Experience)
                </p>
                <div className='h-6 w-3/4 bg-white text-slate-950 font-bold px-2 mb-2 rounded'>
                  My Dashboard
                </div>
                <div className='h-4 w-full bg-slate-700 mb-1'></div>
                <div className='h-4 w-1/2 bg-slate-700 mb-6'></div>
                <div className='h-20 w-full bg-cyan-900/30 mb-4 rounded-lg border border-cyan-700'></div>
                <div className='h-10 w-2/3 bg-indigo-600 text-white mx-auto rounded-full font-semibold flex items-center justify-center shadow-md'>
                  CTA Button
                </div>
                <p className='absolute bottom-2 right-2 text-xs text-indigo-400'>
                  High-Fidelity
                </p>
              </div>
            </div>

            <Link href='https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services.'>
              <button
                className='mt-12 px-10 py-4 group bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto'
                onClick={() => console.log("Hero CTA: Discuss Design")}
              >
                Discuss Your Design Vision
                <FaArrowRight className='ml-3 w-4 h-4 transition-transform group-hover:translate-x-1' />
              </button>
            </Link>
          </div>
        </div>
      </Section>

      {/* 2. Core Services Grid (Research, Wireframing, Prototyping, Testing) */}
      <Section className='mb-20'>
        <h2 className='text-4xl font-extrabold text-white mb-10 text-center'>
          Our Design Spectrum
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {coreServices.map((item) => (
            <div
              key={item.title}
              className='p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col transition duration-300 hover:border-indigo-500 hover:shadow-xl'
            >
              <div className='mb-4 p-4 rounded-full bg-slate-800/70'>
                {item.icon}
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                {item.title}
              </h3>
              <p className='text-sm text-slate-400'>{item.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Process Timeline */}
      <Section className='mb-24'>
        <h2 className='text-4xl font-extrabold text-white mb-12 text-center'>
          Our Human-Centered Design Process
        </h2>
        <div className='relative'>
          {/* Horizontal Connector Line */}
          <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 transform -translate-y-1/2 hidden lg:block'></div>

          <div className='grid lg:grid-cols-4 gap-8'>
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className='flex flex-col items-center text-center p-6 relative z-10 bg-slate-900/70 rounded-xl shadow-lg border border-slate-800/60 transition duration-300 hover:border-cyan-500'
              >
                <div
                  className={`p-4 rounded-full border-4 border-slate-950 ${
                    index % 2 === 0 ? "bg-indigo-500" : "bg-pink-500"
                  } shadow-lg mb-4`}
                >
                  <step.icon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  {step.title}
                </h3>
                <p className='text-sm text-slate-400 max-w-xs'>
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Client Feedback Quotes */}
      <Section className='mb-20'>
        <div className='p-10 rounded-3xl bg-slate-900/70 border border-slate-800/60 shadow-xl shadow-indigo-900/30'>
          <h2 className='text-4xl font-extrabold text-white mb-8 text-center'>
            What Our Clients Say
          </h2>
          <div className='relative p-6 bg-slate-950 rounded-xl border-l-4 border-indigo-500 shadow-md'>
            <div className='flex mb-3'>
              {Array(testimonial.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} className='w-5 h-5 text-yellow-400' />
                ))}
            </div>
            <p className='text-xl italic text-slate-300'>
              "{testimonial.quote}"
            </p>
            <p className='mt-4 text-sm font-bold text-indigo-400'>
              -- {testimonial.source}
            </p>
          </div>

          <div className='mt-10 text-center'>
            <h3 className='text-2xl font-semibold text-white mb-4'>
              Interactive Prototyping
            </h3>
            <p className='text-lg text-slate-400 max-w-3xl mx-auto mb-6'>
              We deliver all projects in platforms like **Figma** or Sketch,
              allowing for live interactive testing and seamless developer
              handover.
            </p>
            <FaFigma className='w-16 h-16 text-cyan-400 mx-auto' />
          </div>
        </div>
      </Section>

      {/* 5. Final CTA Block */}
      <Section className='mb-24'>
        <div className='relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-slate-900/70 border border-slate-800/60 shadow-2xl shadow-cyan-900/50'>
          <h2 className='text-4xl font-extrabold text-white sm:text-5xl'>
            Ready to design an unforgettable user experience?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-slate-400'>
            Let's start with a discovery workshop to define the perfect digital
            journey for your users.
          </p>
          <button
            className='mt-8 px-10 py-4 group bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto'
            onClick={() =>
              console.log("Final CTA: Book Design Consultation (Placeholder)")
            }
          >
            Book a Design Consultation
            <FaArrowRight className='ml-3 w-4 h-4 transition-transform group-hover:translate-x-1' />
          </button>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

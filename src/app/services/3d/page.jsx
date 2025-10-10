"use client";

import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { ServiceCTA } from "@/components/shared/ServiceCTA";
import {
  FaCamera,
  FaVrCardboard,
  FaLightbulb,
  FaCheckCircle,
  FaRocket,
  FaDollarSign,
  FaBolt,
  FaCube,
  FaPlayCircle,
  FaArrowRight,
} from "react-icons/fa";
import { FaClock, FaPenNib, FaCodeBranch, FaPalette } from "react-icons/fa6";

// NOTE: Placeholder for user's local ModelViewer component
// Assuming this component correctly handles GLB rendering based on props
const ModelViewer = ({ url, width, height }) => {
  // We use the <model-viewer> custom element as a robust fallback/example implementation.
  // In a real project, this would be your imported React component.
  if (
    typeof window !== "undefined" &&
    !document.getElementById("model-viewer-script")
  ) {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.type = "module";
    script.id = "model-viewer-script";
    document.head.appendChild(script);
  }

  return (
    <div
      className='relative rounded-xl overflow-hidden shadow-2xl h-full w-full mx-auto'
      style={{ maxWidth: width, maxHeight: height }}
    >
      <model-viewer
        src={url}
        alt='Hero 3D Model'
        poster='https://placehold.co/400x400/1e293b/ffffff?text=Loading+Model'
        shadow-intensity='1'
        camera-controls
        touch-action='none'
        auto-rotate
        rotation-per-second='10deg'
        exposure='1.5'
        className='w-full h-full'
        style={{
          "--poster-color": "#1E293B",
          "--progress-bar-color": "#06B6D4",
        }} // Cast to assert CSS properties
      >
        <div slot='progress-bar' className='progress-bar-slot'>
          <div className='text-white text-xs p-1'>Loading 3D Model...</div>
        </div>
      </model-viewer>
    </div>
  );
};

export default function CGIDetailPage() {
  // --- Data for New Pipeline Tiled Section ---
  const productionPipeline = [
    {
      title: "1. Modeling (Structure)",
      description:
        "We build the high-fidelity geometric base, ensuring optimal topology for animation or rendering.",
      icon: <FaPenNib className='w-8 h-8 text-indigo-400' />,
    },
    {
      title: "2. Texturing (Detail)",
      description:
        "Applying realistic PBR (Physically Based Rendering) materials, including roughness, metalness, and maps.",
      icon: <FaPalette className='w-8 h-8 text-cyan-400' />,
    },
    {
      title: "3. Lighting (Mood)",
      description:
        "Setting up cinematic lighting rigs, shadows, and environmental reflections to establish mood and focus.",
      icon: <FaLightbulb className='w-8 h-8 text-yellow-400' />,
    },
    {
      title: "4. Final Render (Output)",
      description:
        "Generating the final high-resolution images or animation sequences for marketing, print, or web use.",
      icon: <FaCamera className='w-8 h-8 text-rose-400' />,
    },
  ];

  // Placeholder video source for demonstration.
  const VIDEO_SOURCE_URL =
    "https://res.cloudinary.com/dsq9vnbvd/video/upload/f_auto,q_auto/v1728286154/Sequence_05_efos5k.mp4";

  // Hero Model URL
  const HERO_MODEL_URL =
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb";

  return (
    <main className='bg-slate-950 text-slate-100'>
      <SiteHeader />

      {/* 1. Hero Section: Text on Left, Single Model Viewer on Right */}
      <Section className='mt-16 mb-24'>
        <div className='flex flex-col lg:flex-row items-center justify-between rounded-3xl p-6 md:p-16 border border-indigo-700/60 bg-slate-900/50 relative overflow-hidden'>
          {/* Left Column: Text Content */}
          <div className='relative z-10 lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 max-w-lg'>
            <h1 className='text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight'>
              Interactive{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400'>
                3D Visualization
              </span>
            </h1>
            <p className='mt-6 text-xl text-slate-300'>
              Go beyond flat images. Our **real-time 3D assets** allow users to
              interact, configure, and explore your product from every angle on
              the web.
            </p>
            <button
              className='mt-8 px-10 py-4 group bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center mx-auto lg:mx-0'
              onClick={() => console.log("Hero CTA: Start 3D Project")}
            >
              Start Your 3D Project
              <FaArrowRight className='ml-3 w-4 h-4 transition-transform group-hover:translate-x-1' />
            </button>
          </div>

          {/* Right Column: ModelViewer Component */}
          <div className='relative lg:w-1/2 flex justify-center items-center h-[400px] w-full'>
            <ModelViewer url={HERO_MODEL_URL} width={400} height={400} />
          </div>
        </div>
      </Section>

      {/* 2. CGI Ads Section: Text on Left, Video on Right */}
      <Section className='mb-24'>
        <div className='flex flex-col lg:flex-row items-stretch justify-between rounded-3xl p-6 md:p-16 border border-slate-800/60 bg-slate-900/70 relative overflow-hidden'>
          {/* Left Column: Explanation (Content determines height) */}
          <div className='relative z-10 lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 max-w-lg lg:pr-10'>
            <h2 className='text-4xl font-extrabold text-white leading-tight'>
              Cinematic <span className='text-cyan-400'>CGI Advertising</span>
            </h2>
            <p className='mt-4 text-lg text-slate-300'>
              We create full-scale **animated commercial spots** without needing
              a physical camera. CGI gives you total control over lighting,
              environment, and physics, resulting in visuals that are impossible
              to capture otherwise.
            </p>
            <ul className='mt-6 space-y-3 text-slate-300 text-left mx-auto lg:mx-0 max-w-xs'>
              <li className='flex items-start'>
                <FaCheckCircle className='w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1' />
                Limitless creative freedom
              </li>
              <li className='flex items-start'>
                <FaCheckCircle className='w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1' />
                Significant savings on production costs
              </li>
              <li className='flex items-start'>
                <FaCheckCircle className='w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-1' />
                Perfect for products not yet manufactured
              </li>
            </ul>
          </div>

          {/* Right Column: Auto-Play CGI Ad Video */}
          <div className='relative lg:w-1/2 flex justify-center items-center w-full rounded-xl overflow-hidden shadow-2xl lg:h-full'>
            <video
              className='w-full h-full object-cover'
              src={VIDEO_SOURCE_URL}
              autoPlay
              loop
              muted
              playsInline
              onError={() => console.log("Video failed to load. Check URL.")}
            >
              {/* Fallback */}
            </video>
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10'>
              <FaPlayCircle className='w-12 h-12 text-white/50' />
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Visualization Pipeline: 4 Tiled Sections */}
      <Section className='mb-24'>
        <h2 className='text-4xl font-extrabold text-white mb-12 text-center'>
          The 4 Stages of 3D Production
        </h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {productionPipeline.map((step) => (
            <div
              key={step.title}
              className='p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col items-center text-center transition duration-300 hover:border-cyan-500'
            >
              <div className='mb-4 p-4 rounded-full bg-slate-800/50'>
                {step.icon}
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                {step.title}
              </h3>
              <p className='text-sm text-slate-400'>{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Core Capabilities (Kept as a simple grid for structure) */}
      <Section className='mb-20'>
        <h2 className='text-4xl font-extrabold text-white mb-10 text-center'>
          Our Core Visualization Capabilities
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            {
              icon: <FaVrCardboard className='w-8 h-8 text-cyan-400' />,
              title: "Interactive Web 3D / AR",
              content:
                "Real-time 3D configurators and AR assets for high-engagement web experiences.",
            },
            {
              icon: <FaCube className='w-8 h-8 text-rose-400' />,
              title: "Architectural Visualization",
              content:
                "Detailed 3D models and fly-throughs for real estate and urban planning projects.",
            },
            {
              icon: <FaDollarSign className='w-8 h-8 text-green-400' />,
              title: "Cost & Time Efficiency",
              content:
                "Significant savings over physical photo/video production with zero travel.",
            },
            {
              icon: <FaBolt className='w-8 h-8 text-yellow-400' />,
              title: "Product Configurators",
              content:
                "Allow customers to customize colors, textures, and features in real-time 3D.",
            },
          ].map((cap) => (
            <div
              key={cap.title}
              className='p-6 rounded-xl bg-slate-900/70 border border-slate-800/60 shadow-lg flex flex-col items-center text-center transition duration-300 hover:border-indigo-500'
            >
              <div className='mb-3 p-3 rounded-full bg-slate-800/50'>
                {cap.icon}
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                {cap.title}
              </h3>
              <p className='text-sm text-slate-400'>{cap.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Final CTA Block (Kept the existing one) */}
      <ServiceCTA
        title='Ready to bring your vision to life in 3D?'
        description="Let's discuss your project and create immersive experiences that captivate your audience."
        buttonText='Schedule a Consultation'
        buttonAction={() =>
          console.log("Final CTA: Book a CGI Call (Placeholder)")
        }
        colorTheme='indigo'
      />

      <SiteFooter />
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import DecryptedText from "@/components/ui/DecryptedText";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, Activity } from "lucide-react";

// Dynamically import react-globe.gl to prevent SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function CyberHeroSection() {
  const globeEl = useRef<any>();
  const [arcsData, setArcsData] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    // Generate random threat arcs for the globe
    const N = 20;
    const arcs = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      // Using bright matrix greens
      color: ['#10b981', '#34d399', '#059669'][Math.floor(Math.random() * 3)]
    }));
    setArcsData(arcs);

    // Fetch GeoJSON for vector globe
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data.features);
      })
      .catch(err => console.error("Could not load countries", err));

    // Globe is dynamically imported, so we need to wait for it to mount
    const checkInterval = setInterval(() => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.2;
          controls.enableZoom = false; // Prevents the globe from zooming on scroll
          clearInterval(checkInterval);
        }
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
      {/* Background Matrix/Grid Noise */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10b981]/10 via-white/80 to-white" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mb-16 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-[#10b981]" />
            </div>
            <span className="text-[#10b981] font-mono text-sm tracking-widest uppercase bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/20">
              System Secure
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-slate-900 leading-tight">
            <DecryptedText
              text="Unbreachable"
              speed={40}
              maxIterations={15}
              characters="01"
              className="text-[#10b981]"
              encryptedClassName="text-slate-400"
            />
            <br />
            <span className="text-slate-600">Digital Fortresses</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-600 font-light max-w-xl mb-10 border-l-2 border-[#10b981]/50 pl-4"
          >
            We implement military-grade encryption, secure API endpoints, and proactive threat intelligence to protect your company's digital integrity from global vectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-[#10b981] text-black font-semibold rounded-lg hover:bg-[#34d399] transition-colors flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Secure Your Assets
            </button>
            <button className="px-8 py-4 bg-transparent border border-[#10b981]/30 text-[#10b981] font-semibold rounded-lg hover:bg-[#10b981]/10 transition-colors flex items-center gap-2">
              <Activity className="w-5 h-5" />
              View Live Map
            </button>
          </motion.div>
        </div>

        {/* Right Content - 3D Globe */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* Glowing aura behind globe */}
          <div className="absolute inset-0 bg-[#10b981]/20 blur-[100px] rounded-full scale-75 pointer-events-none" />

          <Globe
            ref={globeEl}
            width={700}
            height={700}
            backgroundColor="rgba(0,0,0,0)"
            rendererConfig={{ alpha: true, antialias: true }}
            showGlobe={false} // Hide the default solid sphere
            showAtmosphere={true}
            atmosphereColor="#e2e8f0"
            atmosphereAltitude={0.15}

            // Vector Polygons for Light Theme
            polygonsData={countries}
            polygonAltitude={0.01}
            polygonCapColor={() => '#f8fafc'} // Extremely light gray/white land
            polygonSideColor={() => '#e2e8f0'}
            polygonStrokeColor={() => '#cbd5e1'} // Visible light borders

            // Cyber Arcs
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 1000}
            arcsTransitionDuration={0}
            arcStroke={1}

            // Connection points
            pointColor={() => "#10b981"}
            pointAltitude={0.05}
            pointRadius={0.08}
          />
        </div>
      </div>
    </section>
  );
}

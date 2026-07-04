"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnet from "@/components/ui/Magnet";
import { Terminal } from "lucide-react";

export function CyberCTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple Matrix Rain Effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+=";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(248, 250, 252, 0.05)"; // Fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Matrix Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_80%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto mb-8 bg-[#10b981]/10 rounded-full flex items-center justify-center border border-[#10b981]/30">
            <Terminal className="w-10 h-10 text-[#10b981]" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 mb-6">
            Initiate Security <span className="text-[#10b981]">Protocol</span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-12">
            Don't wait for a breach. Proactively secure your infrastructure with our enterprise-grade cybersecurity solutions.
          </p>

          <Magnet magnetStrength={2}>
            <button className="group relative px-12 py-5 bg-[#10b981] text-black font-bold text-lg rounded-none uppercase tracking-widest overflow-hidden">
              {/* Glitch hover effect overlay */}
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 opacity-50 group-hover:animate-[slide_1s_ease-in-out_infinite]" />
              
              <span className="relative z-10 flex items-center gap-3">
                Deploy Defense <ShieldIcon />
              </span>
            </button>
          </Magnet>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}} />
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

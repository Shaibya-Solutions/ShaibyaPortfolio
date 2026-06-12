"use client";
import { motion } from "framer-motion";

export default function FooterCTA() {
  return (
    <div id="contact" className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 px-6 py-20 sm:py-28">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Ready to build the future,{" "}
          <span className="opacity-80">together?</span>
        </h2>
        <p className="text-amber-100 text-lg mb-10 leading-relaxed">
          Schedule a free consultation and see how AI and modern development
          can accelerate your business.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <a
            href="mailto:shaibyasolutions@gmail.com?cc=shaibyadevs@gmail.com&subject=Enquiry"
            className="px-8 py-4 bg-white text-amber-700 font-bold rounded-xl shadow-lg hover:bg-amber-50 transition transform hover:scale-105 min-w-[200px] text-center text-base"
          >
            Start a Project
          </a>
          <a
            href="tel:+917498341146"
            className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white transition min-w-[200px] text-center text-base"
          >
            Call Us
          </a>
        </div>
      </motion.div>
    </div>
  );
}

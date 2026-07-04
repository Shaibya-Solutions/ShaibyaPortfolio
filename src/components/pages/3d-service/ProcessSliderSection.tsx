"use client";

import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { motion } from "framer-motion";

export function ProcessSliderSection() {
  return (
    <section className="py-32 bg-slate-50 relative z-10 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-heading text-slate-900 mb-6"
          >
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Wireframe</span> to Reality
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Drag the slider to see how our meticulous modeling process transforms a raw structural wireframe into a breathtaking, photorealistic final render.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl p-2 bg-white border border-slate-200 shadow-2xl"
        >
          {/* Using placeholder images for demonstration purposes */}
          <BeforeAfterSlider 
            beforeSrc="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop" 
            afterSrc="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop&sat=-100" 
            accentColor="#a855f7" 
          />
        </motion.div>
      </div>
    </section>
  );
}

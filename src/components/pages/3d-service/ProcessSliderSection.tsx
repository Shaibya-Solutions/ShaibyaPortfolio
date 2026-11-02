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
            Scroll to watch the room move from structural wireframe to a fully lit interior. Drag the divider, swipe, or use the arrow keys to explore the details at your own pace.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl p-2 bg-white border border-slate-200 shadow-2xl"
        >
          <BeforeAfterSlider 
            beforeSrc="/images/3d/living-room-wireframe.webp"
            afterSrc="/images/3d/living-room-render.webp"
            beforeAlt="Wireframe modelling view of a contemporary living room"
            afterAlt="Photorealistic concept render of the same living room"
            beforeLabel="Wireframe"
            afterLabel="Final render"
            revealOnScroll
            accentColor="#a855f7" 
          />
        </motion.div>
        <p className="text-xs text-slate-500 text-center mt-5">Illustrative architectural concept · The same room, camera, and composition in both views.</p>
      </div>
    </section>
  );
}

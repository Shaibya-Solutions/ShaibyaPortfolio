// components/ChairmanMessage.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/section";

export function ChairmanMessage() {
  return (
    <Section className="py-20">
      <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-12">
        Chairman's Message
      </h2>
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Image and Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3"
        >
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-2">
            <Image
              src="/path-to-your-image.jpg" // Replace with your image path
              alt="Chairman"
              width={400}
              height={400}
              className="rounded-2xl w-full h-auto"
            />
          </div>
        </motion.div>

        {/* The Message */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-2/3 p-8 bg-slate-800 rounded-3xl border border-slate-700"
        >
          <p className="text-lg italic text-slate-300">
            "At Shaibya Solutions, our vision is to be the most well-regarded
            technology provider in India, committed to the highest standards of
            innovation and client success, supported by a culture of continuous
            learning and cutting-edge research.
            <br />
            <br />
            We ask more of ourselves so we can give more to our clients. We push
            the boundaries of excellence in everything we do, so we can deliver
            the highest standards in client-centered solutions. Every day, we
            come to honor a higher purpose - to serve. To excel."
          </p>
          <div className="mt-6 text-right">
            <p className="text-white font-semibold">[Your Chairman's Name]</p>
            <p className="text-sm text-slate-400">
              Chairman & Managing Director
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, Server, Sparkles } from "lucide-react";
import React from "react";
import Image from "next/image";

export function SoftBentoShowcase() {
  return (
    <section className="py-32 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Explore By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ea580c]">Solution</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-4 text-lg font-medium"
          >
            Discover software engineering ecosystems designed perfectly for every scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto h-auto md:h-[600px]">
          
          {/* LEFT: Large Main Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:col-span-6 lg:col-span-5 relative rounded-3xl overflow-hidden group cursor-pointer h-[400px] md:h-full shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <Image 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              alt="Enterprise Architecture"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-10">
              <h3 className="text-3xl font-bold text-white mb-2">Enterprise Architecture</h3>
              <p className="text-slate-300 mb-6 font-medium">Transform your business core</p>
              
              <div className="flex items-center gap-2 text-white font-bold group-hover:text-[#f59e0b] transition-colors">
                Shop now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: 2x2 Grid */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 h-full">
            
            {/* Right Card 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] md:h-[285px] shadow-sm hover:shadow-xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop"
                alt="Web Applications"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 z-10">
                <h4 className="text-xl font-bold text-white">Web Applications</h4>
              </div>
            </motion.div>

            {/* Right Card 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] md:h-[285px] shadow-sm hover:shadow-xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop"
                alt="Mobile Experiences"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 z-10">
                <h4 className="text-xl font-bold text-white">Mobile Experiences</h4>
              </div>
            </motion.div>

            {/* Right Card 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] md:h-[285px] shadow-sm hover:shadow-xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
                alt="Cloud Infrastructure"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 z-10">
                <h4 className="text-xl font-bold text-white">Cloud Infrastructure</h4>
              </div>
            </motion.div>

            {/* Right Card 4 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.4 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer h-[250px] md:h-[285px] shadow-sm hover:shadow-xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"
                alt="AI Intelligence"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 z-10">
                <h4 className="text-xl font-bold text-white">AI Intelligence</h4>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

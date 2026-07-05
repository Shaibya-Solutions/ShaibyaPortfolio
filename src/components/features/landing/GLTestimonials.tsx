"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { testimonials as rawTestimonials } from "@/data";
import { motion } from "framer-motion";

/* Map existing data → TestimonialsColumn shape, using real Unsplash portraits */
const portraitImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
];

const testimonials: TestimonialItem[] = rawTestimonials.map((t, i) => ({
  text: t.text,
  image: portraitImages[i % portraitImages.length],
  name: t.author,
  role: t.role,
}));

/* Split into 3 columns for the masonry effect */
const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 5);

/* Pad shorter columns by duplicating for visual balance */
const padColumn = (col: TestimonialItem[], minLen: number): TestimonialItem[] => {
  if (col.length >= minLen) return col;
  const padded = [...col];
  while (padded.length < minLen) {
    padded.push(...col);
  }
  return padded.slice(0, minLen);
};

const col1 = padColumn(firstColumn, 3);
const col2 = padColumn(secondColumn, 3);
const col3 = padColumn(thirdColumn, 3);

const GLTestimonials = () => {
  return (
    <section id="testimonials" className="relative py-28 lg:py-40 overflow-hidden bg-white border-t border-[#E5E7EB]">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0ea5e9]/[0.03] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="accent-line w-12 mb-10 origin-left" />
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9] mb-5">
            Client Stories
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#111827] leading-[1.15]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What our clients <span className="heading-gradient">say.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#6B7280] max-w-md leading-relaxed">
            Real results from real businesses. Every testimonial reflects measurable impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden"
        >
          <TestimonialsColumn testimonials={col1} duration={18} />
          <TestimonialsColumn
            testimonials={col2}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={col3}
            className="hidden lg:block"
            duration={16}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GLTestimonials;

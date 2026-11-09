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

/* Pad shorter columns by duplicating for visual balance */
const padColumn = (col: TestimonialItem[], minLen: number): TestimonialItem[] => {
  if (col.length >= minLen) return col;
  const padded = [...col];
  while (padded.length < minLen) {
    padded.push(...col);
  }
  return padded.slice(0, minLen);
};

const GLTestimonials = ({ items }: { items?: any[] } = {}) => {
  const source = items && items.length > 0 ? items : rawTestimonials;
  const testimonials: TestimonialItem[] = source.map((t, i) => ({
    text: t.text,
    image: portraitImages[i % portraitImages.length],
    name: t.author,
    role: t.role,
  }));

  const firstColumn = testimonials.slice(0, 2);
  const secondColumn = testimonials.slice(2, 4);
  const thirdColumn = testimonials.slice(4, 5);

  const col1 = padColumn(firstColumn, 3);
  const col2 = padColumn(secondColumn, 3);
  const col3 = padColumn(thirdColumn, 3);

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
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.04] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
            <span className="text-xs font-semibold text-[#0ea5e9] uppercase tracking-[0.2em]">Client Stories</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] font-heading">
            What founders and operators say about working with us.
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] font-sans">
            Real outcomes from real businesses. Here is how our software and automation helped them scale.
          </p>
        </motion.div>

        <div className="relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] -my-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[700px] overflow-hidden">
            <TestimonialsColumn testimonials={col1} duration={35} />
            <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={45} />
            <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GLTestimonials;

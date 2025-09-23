"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data";

export default function Testimonials() {
  return (
    <section className="bg-[#020617] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          What Our Clients Are Saying
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {t.title}
              </h3>

              <div className="flex mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className={`${
                      idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm md:text-base mb-6 leading-relaxed">{t.text}</p>

              <div className="mt-auto">
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-xs md:text-sm text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

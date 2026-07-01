"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const ContactOrbitHero = dynamic(
  () => import("@/components/ui/contact-orbit-hero"),
  { ssr: false, loading: () => <div className="min-h-screen bg-gradient-to-br from-[#E0F5FC] to-white" /> }
);

const faqs = [
  { q: "How long does it take to build a website?", a: "Most websites are live within 2-4 weeks. For complex systems like CRMs or booking platforms, we typically deliver in 4-8 weeks. We'll give you a clear timeline during our first conversation." },
  { q: "What does it cost?", a: "Every project is different. A basic website starts around ₹25,000-50,000. Full business automation systems (like FitManage 360) range from ₹1-3 lakh depending on complexity. We'll always give you a transparent quote upfront." },
  { q: "Can you handle RERA requirements for real estate?", a: "Yes. Our property listing websites are built with RERA compliance in mind — including mandatory disclosures, project registration numbers, and compliant advertisement formatting." },
  { q: "Do you provide ongoing support after launch?", a: "Absolutely. Every project includes 30 days of free support after launch. After that, we offer affordable monthly maintenance plans. Most of our clients stay with us long-term because we keep improving their systems." },
  { q: "I'm not tech-savvy. Can I still use your systems?", a: "That's exactly who we build for. Our systems are designed for business owners, not engineers. If you can use WhatsApp, you can use our tools. We also provide training for your team." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", business: "", service: "Website", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Shaibya Solutions,%0A%0A*Name:* ${formData.name}%0A*Business:* ${formData.business}%0A*Interested in:* ${formData.service}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/+917498341146?text=${text}`, "_blank");
  };

  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col overflow-x-hidden">
      <SiteHeader />

      {/* 1. ORBIT HERO */}
      <ContactOrbitHero />

      {/* 2. FORM + CONTACT INFO */}
      <section id="contact-form" className="py-20 bg-slate-50 relative">
        {/* Subtle top fade from hero */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
              Get in Touch
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Send us a message
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-5 gap-0 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            {/* Contact Info */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] text-slate-800 p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-syne)" }}>
                  Contact Information
                </h3>
                <p className="text-slate-600 mb-10 leading-relaxed">
                  Whether you have a clear project in mind or just want to explore possibilities, we&apos;re here to chat.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FaPhone className="text-slate-500 mt-1" size={18} />
                    <div>
                      <div className="font-semibold text-sm text-slate-500 mb-1">Phone / WhatsApp</div>
                      <a href="tel:+917498341146" className="hover:text-sky-700 transition">+91 7498341146</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <IoMail className="text-slate-500 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-sm text-slate-500 mb-1">Email</div>
                      <a href="mailto:shaibyasolutions@gmail.com" className="hover:text-sky-700 transition">shaibyasolutions@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FaMapMarkerAlt className="text-slate-500 mt-1" size={18} />
                    <div>
                      <div className="font-semibold text-sm text-slate-500 mb-1">Locations</div>
                      <div>Nagpur, India<br />Noida, India<br />Texas, USA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="mt-10 flex justify-end">
                <div className="w-28 h-28 rounded-full bg-sky-200/40 border border-sky-200/60" />
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Your Name</label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="business" className="text-sm font-semibold text-gray-700">Business Name</label>
                    <input
                      type="text" id="business" name="business"
                      value={formData.business} onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-semibold text-gray-700">What do you need help with?</label>
                  <select
                    id="service" name="service"
                    value={formData.service} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors appearance-none"
                  >
                    <option value="Website">Custom Website</option>
                    <option value="WhatsApp Automation">WhatsApp Automation</option>
                    <option value="Gym Management System">Gym Management System</option>
                    <option value="Real Estate CRM">Real Estate CRM / Lead System</option>
                    <option value="AI Solution">AI / Automation Solution</option>
                    <option value="Custom Software / MVP">Custom Software / MVP</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">Tell us about your project</label>
                  <textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors resize-none"
                    placeholder="We're looking to automate our lead capture..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#bae6fd] via-[#7dd3fc] to-[#38bdf8] hover:brightness-95 text-slate-800 font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-sky-300/30 active:scale-[0.98]"
                >
                  <FaWhatsapp size={20} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">FAQ</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Frequently asked questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <FaChevronDown
                    size={14}
                    className={`text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// components/site-footer.tsx
"use client";
import Link from "next/link";
import {
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMedium,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { services, products } from "@/data";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SiteFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.footer
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-slate-900 border-t border-slate-700 relative overflow-hidden"
    >
      {/* Main Footer Links & Info */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-8 sm:pb-12 pt-10 sm:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-y-10 text-gray-400">
        {/* Company Identity */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"
        >
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 block"
          >
            Shaibya Solutions
          </Link>
          <p className="text-sm">AI-powered development from Nagpur to USA.</p>
          <div className="flex space-x-4 mt-3 sm:mt-4 text-xl">
            <a
              href="https://www.linkedin.com/company/shaibyasolutions/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/shaibya.solutions?igsh=emE3dTg4NHVjd243"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://medium.com/@shaibyasolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
              aria-label="Medium"
            >
              <FaMedium />
            </a>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Products
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm">
            {products.map((product) => (
              <li key={product.label}>
                <Link
                  href={product.href}
                  className="hover:text-cyan-400 transition"
                >
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Services
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="hover:text-cyan-400 transition"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Contact
          </h3>
          <div className="space-y-2 sm:space-y-3 text-sm">
            <a
              href="tel:+917498341146"
              className="flex items-center gap-2 hover:text-cyan-400 transition break-all"
            >
              <FaPhone className="text-cyan-500/80 flex-shrink-0" /> +91
              7498341146
            </a>
            <a
              href="mailto:shaibyasolutions@gmail.com?cc=shaibyadevs@gmail.com&subject=Enquiry"
              className="flex items-center gap-2 hover:text-cyan-400 transition break-all"
            >
              <IoMail className="text-cyan-500/80 flex-shrink-0" />{" "}
              shaibyasolutions@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Locations
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-500/80 flex-shrink-0" />{" "}
              Texas (USA)
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-500/80 flex-shrink-0" />{" "}
              Nagpur (India)
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-500/80 flex-shrink-0" />{" "}
              Noida (India)
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 py-4 sm:py-6 px-4 sm:px-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:space-x-6">
            <Link href="#" className="hover:text-white transition">
              Blogs
            </Link>
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-white transition whitespace-nowrap"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

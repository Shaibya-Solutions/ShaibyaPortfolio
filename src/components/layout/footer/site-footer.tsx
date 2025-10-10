// components/site-footer.tsx
"use client";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import {
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

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
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      className='bg-slate-900 border-t border-slate-700 relative overflow-hidden'
    >
      {/* Main Footer Links & Info */}
      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12 pt-16 grid grid-cols-2 md:grid-cols-5 gap-y-10 text-gray-400'>
        {/* Company Identity */}
        <motion.div
          variants={itemVariants}
          className='col-span-2 md:col-span-1'
        >
          <Link href='/' className='text-2xl font-bold text-white mb-4 block'>
            Shaibya Solutions
          </Link>
          <p className='text-sm'>AI-powered development from Nagpur to USA.</p>
          <div className='flex space-x-4 mt-4 text-xl'>
            <a
              href='#'
              className='hover:text-cyan-400 transition'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </a>
            <a
              href='#'
              className='hover:text-cyan-400 transition'
              aria-label='Instagram'
            >
              <FaInstagram />
            </a>
            <a
              href='#'
              className='hover:text-cyan-400 transition'
              aria-label='Twitter X'
            >
              <BsTwitterX />
            </a>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div variants={itemVariants}>
          <h3 className='text-lg font-semibold text-white mb-4'>Products</h3>
          <ul className='space-y-3 text-sm'>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                Hologbox
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                Hologbox Mini
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                GlamBOT
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h3 className='text-lg font-semibold text-white mb-4'>Services</h3>
          <ul className='space-y-3 text-sm'>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                Product development
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                CGI & 3D Animation
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                AI Solutions
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-cyan-400 transition'>
                Cybersecurity
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h3 className='text-lg font-semibold text-white mb-4'>Contact</h3>
          <div className='space-y-3 text-sm'>
            <a
              href='tel:+919833704986'
              className='flex items-center gap-2 hover:text-cyan-400 transition'
            >
              <FaPhone className='text-cyan-500/80' /> +91 9833704986
            </a>
            <a
              href='mailto:shaibyasolutions@gmail.com'
              className='flex items-center gap-2 hover:text-cyan-400 transition'
            >
              <IoMail className='text-cyan-500/80' /> shaibyasolutions@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div variants={itemVariants}>
          <h3 className='text-lg font-semibold text-white mb-4'>Locations</h3>
          <ul className='space-y-3 text-sm'>
            <li className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-cyan-500/80' /> Texas (USA)
            </li>
            <li className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-cyan-500/80' /> Nagpur (India)
            </li>
            <li className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-cyan-500/80' /> Noida (India)
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-slate-700 py-6 px-6 text-xs text-gray-500'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
          <div>
            © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
          </div>
          <div className='flex space-x-6'>
            <Link href='#' className='hover:text-white transition'>
              Blogs
            </Link>
            <Link href='#' className='hover:text-white transition'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-white transition'>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

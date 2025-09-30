"use client";

import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaPhone, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useRef, useEffect } from "react";
import styled from "styled-components";

export function SiteFooter() {
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = archRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el); // animate only once
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <StyledFooter>
      {/* Arch Background */}
      <div ref={archRef} className='footer-arch' />

      {/* Top CTA */}
      <div className='text-center relative z-10 px-6 md:px-12 lg:px-20 py-16'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
          Interested in working together?
        </h2>
        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
          <a
            href='mailto:shaibyasolutions@gmail.com'
            className='px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition'
          >
            Email Us
          </a>
          <a
            href='tel:+919833704986'
            className='px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition'
          >
            Call Us
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-8 pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-300'>
        {/* Get in Touch */}
        <div>
          <h3 className='text-lg font-semibold text-orange-400 mb-4'>
            Get in Touch
          </h3>
          <div className='space-y-2 text-sm'>
            <a
              href='tel:+919833704986'
              className='flex items-center gap-2 hover:text-white transition'
            >
              <FaPhone /> +91 9833704986
            </a>
            <a
              href='mailto:shaibyasolutions@gmail.com'
              className='flex items-center gap-2 hover:text-white transition'
            >
              <IoMail /> shaibyasolutions@gmail.com
            </a>
            <div className='flex space-x-2 mt-2'>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition'
              >
                <FaLinkedin />
              </Link>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition'
              >
                <FaInstagram />
              </Link>
              <Link
                href='#'
                className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition'
              >
                <BsTwitterX />
              </Link>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className='text-lg font-semibold text-orange-400 mb-4'>
            Products
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='#' className='hover:text-white transition'>
                Hologbox
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white transition'>
                Hologbox Mini
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white transition'>
                GlamBOT
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className='text-lg font-semibold text-orange-400 mb-4'>
            Services
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='#' className='hover:text-white transition'>
                Product development
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white transition'>
                CGI & 3D Animation
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white transition'>
                UI/UX Design
              </Link>
            </li>
          </ul>
        </div>

        {/* Office Address */}
        <div>
          <h3 className='text-lg font-semibold text-orange-400 mb-4'>
            Office Address
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>Texas</li>
            <li>Nagpur</li>
            <li>Noida</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800 py-6 px-6 text-xs text-gray-400'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0'>
          <div>
            © {new Date().getFullYear()} Shaibya Solutions. All rights reserved
          </div>
          <div className='flex space-x-4'>
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
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: relative;
  background-color: #020617;

  .footer-arch {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background-image: url("/arch.png");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    z-index: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .footer-arch.is-visible {
    opacity: 1;
  }
`;

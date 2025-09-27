// SiteFooter.jsx
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import styled from "styled-components";
import { useRef, useEffect } from "react";

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
    <StyledComponent>
      <footer className='footer-container'>
        <div className='footer-content'>
          <div className='footer-arch' ref={archRef} />
          <h2 className='footer-title z-5'>Interested in working together?</h2>
          <div className='contact-info z-5'>
            <div className='contact-item'>
              <span className='contact-label'>Email</span>
              <a href='mailto:hello@trzy.in' className='contact-value'>
                hello@trzy.in
              </a>
            </div>
            <div className='contact-item'>
              <span className='contact-label'>Phone</span>
              <a href='tel:+919833704986' className='contact-value'>
                +91 9833704986
              </a>
            </div>
          </div>
        </div>
        {/* Main Footer Content */}{" "}
        <div className='relative z-10 mx-auto max-w-7xl px-6 py-16'>
          {" "}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12 text-white'>
            {" "}
            {/* Get in Touch */}{" "}
            <div className='space-y-4'>
              {" "}
              <h3 className='text-lg font-semibold text-orange-400'>
                {" "}
                Get in Touch{" "}
              </h3>{" "}
              <div className='space-y-3 text-sm text-gray-300'>
                {" "}
                <a
                  href='tel:+919833704986'
                  className='flex items-center gap-2 hover:text-white transition'
                >
                  {" "}
                  <FaPhoneAlt size={18} className='text-orange-400' /> +91
                  9833704986{" "}
                </a>{" "}
                <a
                  href='mailto:hello@trzyin'
                  className='flex items-center gap-2 hover:text-white transition'
                >
                  {" "}
                  <IoMail
                    size={18}
                    className='text-orange-400'
                  /> hello@trzyin{" "}
                </a>{" "}
                <div className='flex space-x-2'>
                  {" "}
                  <Link
                    href='#'
                    className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition'
                  >
                    {" "}
                    <FaLinkedin size={18} />{" "}
                  </Link>{" "}
                  <Link
                    href='#'
                    className='p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition'
                  >
                    {" "}
                    <FaInstagram size={18} />{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Products */}{" "}
            <div className='space-y-4'>
              {" "}
              <h3 className='text-lg font-semibold text-orange-400'>
                {" "}
                Products{" "}
              </h3>{" "}
              <ul className='space-y-2 text-sm text-gray-300'>
                {" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    Hologbox{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    Hologbox Mini{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    GlamBOT{" "}
                  </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            {/* Services */}{" "}
            <div className='space-y-4'>
              {" "}
              <h3 className='text-lg font-semibold text-orange-400'>
                {" "}
                Services{" "}
              </h3>{" "}
              <ul className='space-y-2 text-sm text-gray-300'>
                {" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    Drone Shows{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    CGI & Anamorphic{" "}
                  </Link>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <Link href='#' className='hover:text-white transition'>
                    {" "}
                    Projection Mapping{" "}
                  </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            {/* Office Address */}{" "}
            <div className='space-y-4'>
              {" "}
              <h3 className='text-lg font-semibold text-orange-400'>
                {" "}
                Office Address{" "}
              </h3>{" "}
              <ul className='space-y-2 text-sm text-gray-300'>
                {" "}
                <li>Delhi</li> <li>Gurgaon</li> <li>Mumbai</li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Bottom Bar */}{" "}
        <div className='relative z-10 border-t border-gray-800 py-6 px-6 text-xs text-gray-400'>
          {" "}
          <div className='flex flex-col md:flex-row justify-between items-center'>
            {" "}
            <div>
              {" "}
              © 2025 Trzy X. All rights reserved | Powered by Trzy Innovations{" "}
            </div>{" "}
            <div className='flex space-x-4 mt-2 md:mt-0'>
              {" "}
              <Link href='#' className='hover:text-white transition'>
                {" "}
                Blogs{" "}
              </Link>{" "}
              <Link href='#' className='hover:text-white transition'>
                {" "}
                Privacy Policy{" "}
              </Link>{" "}
              <Link href='#' className='hover:text-white transition'>
                {" "}
                Terms & Conditions{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </footer>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  @keyframes appear {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .footer-container {
    position: relative;
    overflow: hidden;
    background-color: #000;
    z-index: 10;
    color: #fff;
    padding: 4rem 1rem;
    text-align: center;
  }

  .footer-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
    justify-content: center;
  }

  /* ARCH */
  .footer-arch {
    position: absolute;
    z-index: 0; /* make sure content (z-10) sits above */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // transform: translateX(-50%) scale(0.95);
    background-image: url("/arch.png");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover; /* or "contain" depending on desired crop */
    // transition: opacity 900ms ease,
    // transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .footer-arch.is-visible {
    animation: appear 1s linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 100%;
  }

  .footer-title {
    font-size: 4.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
`;

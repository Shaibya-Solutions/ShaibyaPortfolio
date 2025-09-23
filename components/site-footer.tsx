import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin, FaYoutube } from "react-icons/fa6";
import { IoLocationSharp, IoMail } from "react-icons/io5";

export function SiteFooter() {
  return (
    <footer className='mt-20 mb-4 border-t-2 border-white bg-slate-950'>
      <div className='mx-auto max-w-7xl gap-12 px-6 py-12 flex flex-col md:flex-row md:items-start md:justify-between'>
        {/* Logo + About */}
        <div className='max-w-[350px]'>
          <div className='flex items-center gap-4 mb-3'>
            {/* Placeholder logo (replace with actual image if available) */}
            <div className='h-10 w-10 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950'>
              SS
            </div>
            <span className='text-xl font-semibold text-white'>
              Shaibya Solutions
            </span>
          </div>
          <p className='text-sm text-slate-400 leading-relaxed'>
            Building intelligent software and AI solutions for forward-thinking
            teams.
          </p>
          <button className="mt-6 opacity-90 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-cyan-600 hover:to-blue-600 transition">
            Join our newsletter
          </button>
        </div>

        {/* Navigation */}
        <div>
          <div className='mb-3 text-sm font-semibold text-slate-200'>
            Navigation
          </div>
          <ul className='space-y-2 text-sm text-slate-400'>
            <li>
              <Link href='/about' className='hover:text-white'>
                About
              </Link>
            </li>
            <li>
              <Link href='/services' className='hover:text-white'>
                Services
              </Link>
            </li>
            <li>
              <Link href='/projects' className='hover:text-white'>
                Projects
              </Link>
            </li>
            <li>
              <Link href='/products' className='hover:text-white'>
                Products
              </Link>
            </li>
            <li>
              <Link href='/careers' className='hover:text-white'>
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div
            id='contact'
            className='mb-3 text-sm font-semibold text-slate-200'
          >
            Contact
          </div>
          <ul className='space-y-2 text-sm text-slate-400'>
            <li className='flex items-center gap-2 hover:text-white'>
              <IoMail size={18} />
              <a href='mailto:hello@shaibyasolutions.com'>
                hello@shaibyasolutions.com
              </a>
            </li>
            <li className='flex items-center gap-2 hover:text-white'>
              <FaPhoneAlt size={18} />
              <a href='tel:+919876543210'>+91 98765 43210</a>
            </li>
            <li className='flex items-center gap-2 hover:text-white'>
              <IoLocationSharp size={18} />
              Remote-first, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-slate-800/60 py-4 text-xs text-slate-400 px-6'>
        <div>
          © {new Date().getFullYear()} Shaibya Solutions. All rights reserved.
        </div>
        <div className='mt-2 md:mt-0'>
          <div className='flex items-center space-x-4 text-slate-400'>
            <Link
              href='https://twitter.com/shaibya_solutions'
              className='hover:text-white'
            >
              <BsTwitterX size={20} />
            </Link>
            <Link
              href='https://linkedin.com/company/shaibya-solutions'
              className='hover:text-white'
            >
              <FaLinkedin size={22} />
            </Link>
            <Link href='/' className='hover:text-white'>
              <FaYoutube size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

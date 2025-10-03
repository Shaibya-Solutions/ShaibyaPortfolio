"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className='relative flex flex-col items-center justify-center bg-[#020617] py-16 px-6 md:px-12 lg:px-20'>
      <div className='z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center w-full justify-between gap-10'>
        {/* Left Text */}
        <div className='text-center md:text-left md:max-w-md'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Join the AI Revolution
          </h2>
          <p className='text-gray-300 mb-8'>
            Join the AI revolution. Contact us today to learn how we can help
            you unlock the full potential of AI for your business.
          </p>
          <a
            href='/contact'
            className='inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition'
          >
            Contact Us <ArrowUpRight size={18} />
          </a>
        </div>
        {/* Right Side with Earth & Users */}
        <div className='relative flex-1 flex flex-col items-center md:items-end'>
          {/* Users */}
          <div className='flex items-center gap-3 mt-6 md:mt-0'>
            <div className='flex -space-x-3'>
              <Image
                src='/user1.jpg'
                alt='User'
                width={40}
                height={40}
                className='rounded-full border-2 border-[#020617]'
              />
              <Image
                src='/user2.jpg'
                alt='User'
                width={40}
                height={40}
                className='rounded-full border-2 border-[#020617]'
              />
              <Image
                src='/user3.jpg'
                alt='User'
                width={40}
                height={40}
                className='rounded-full border-2 border-[#020617]'
              />
            </div>
            <p className='text-gray-300 text-sm'>
              3.5K+ HAPPY USERS <br /> AND COUNTING
            </p>
          </div>
        </div>
      </div>
      {/* Earth Image */}
      <div className='absolute -bottom-20 flex z-1 justify-center w-full'>
        <Image
          src='/earth.jpeg' // replace with your earth image
          alt='AI Globe'
          width={500}
          height={500}
          className='max-h-[350px] min-w-[960px] object-contain'
        />
      </div>
    </section>
  );
}

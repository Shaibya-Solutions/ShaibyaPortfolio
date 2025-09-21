"use client";

import Image from "next/image";

export default function FeedBackForm() {
  return (
    <section className='bg-[#0a0a1a] text-white py-8 px-6'>
      <div className='max-w-6xl mx-auto border-t-2 border-t-white/20 border-b-2 border-b-white/20 py-12 grid md:grid-cols-2 gap-12 items-center'>
        {/* Left Content */}
        <div className='space-y-6'>
          <h1 className='text-xl md:text-2xl font-semibold leading-snug'>
            Stories that lift you up. Business that lifts the world. We're the
            human-centered entertainment that makes a difference.
          </h1>
          <div className='relative w-full h-80 md:h-[420px]'>
            <Image
              src='/feedback-form.jpg' // put your 3D image in public/images folder
              alt='3D Character'
              fill
              className='object-cover rounded-2xl shadow-lg'
              priority
            />
          </div>
        </div>

        {/* Right Form */}
        <form className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              placeholder='Your Name'
              required
              className='w-full px-4 py-3 rounded-lg bg-transparent border border-[#2a2a40] focus:outline-none focus:border-purple-400'
            />
            <input
              type='email'
              placeholder='example@gmail.com'
              required
              className='w-full px-4 py-3 rounded-lg bg-transparent border border-[#2a2a40] focus:outline-none focus:border-purple-400'
            />
          </div>

          <input
            type='tel'
            placeholder='Your Number'
            className='w-full px-4 py-3 rounded-lg bg-transparent border border-[#2a2a40] focus:outline-none focus:border-purple-400'
          />

          <input
            type='text'
            placeholder='Your Budget'
            required
            className='w-full px-4 py-3 rounded-lg bg-transparent border border-[#2a2a40] focus:outline-none focus:border-purple-400'
          />

          <textarea
            placeholder='Your Message Here'
            required
            rows={4}
            className='w-full px-4 py-3 rounded-lg bg-transparent border border-[#2a2a40] focus:outline-none focus:border-purple-400'
          />

          <p className='text-xs text-gray-400'>
            By proceeding, you are agreeing to Smoking Chimney Studio’s privacy
            policy & communication
          </p>

          <button
            type='submit'
            className='px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition shadow-lg'
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

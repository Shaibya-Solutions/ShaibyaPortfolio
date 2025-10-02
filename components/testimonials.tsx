"use client";

import Slider from "react-slick";
import { Star } from "lucide-react";
import { testimonials } from "@/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className='bg-[#020617] pb-16 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-12'>
          What Our Clients Are Saying
        </h2>

        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className='px-4'>
              <div className='bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex flex-col items-center h-full'>
                <h3 className='text-lg font-semibold text-white mb-3'>
                  {t.title}
                </h3>

                <div className='flex mb-4'>
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className={`${
                        idx < t.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>

                <p className='text-sm md:text-base mb-6 leading-relaxed'>
                  {t.text}
                </p>

                <div className='mt-auto'>
                  <p className='font-semibold text-white'>{t.author}</p>
                  <p className='text-xs md:text-sm text-gray-400'>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

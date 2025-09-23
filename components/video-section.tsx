"use client";

export default function VideoSection() {
  return (
    <section className='bg-[#020617] py-16 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* Heading */}
        <h2 className='text-3xl md:text-4xl font-semibold text-white mb-8 leading-snug max-w-4xl'>
          Intelligent solutions to your business, driving growth, efficiency,
          and innovation.
        </h2>

        {/* Video */}
        <div className='relative h-[480px] rounded-2xl overflow-hidden shadow-lg mb-12'>
          <div className='aspect-video w-full'>
            <iframe
              className='w-full h-[480px]'
              src='https://www.youtube.com/embed/dQw4w9WgXcQ' // replace with your video link
              title='AI Solutions Video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Stats */}
        <div className='flex items-center justify-center gap-8'>
            <div className="text-gray-100 mr-10 text-3xl">
                Measuring impact with data-driven results
            </div>
          <div className='bg-gradient-to-b min-w-[350px] min-h-[160px] from-[#0f172a] to-[#000000] border-2 border-[#0f172a] rounded-2xl p-6 text-start shadow-md'>
            <h3 className='text-5xl mb-8 font-bold text-white'>
              100<span className='text-xl font-medium'>TB</span>
            </h3>
            <p className='text-gray-400 text-end mt-2 text-sm'>DATA PROCESSED DAILY</p>
          </div>
          <div className='bg-gradient-to-b min-w-[350px] min-h-[160px] from-[#0f172a] to-[#000000] border-2 border-[#0f172a] rounded-2xl p-6 text-start shadow-md'>
            <h3 className='text-5xl mb-8 font-bold text-white'>300%</h3>
            <p className='text-gray-400 text-end mt-2 text-sm'>
              AVERAGE ROI FOR OUR CLIENTS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

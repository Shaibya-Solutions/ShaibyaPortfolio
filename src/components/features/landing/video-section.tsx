"use client";

export default function VideoSection() {
  return (
    <section className="bg-[#020617] py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6 sm:mb-8 leading-snug max-w-4xl">
          Intelligent solutions to your business, driving growth, efficiency,
          and innovation.
        </h2>

        {/* Video */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg mb-8 sm:mb-12">
          <div className="aspect-video w-full">
            <video
              src="/videos/Business_Growth_Video_Generation.mp4"
              controls
              playsInline
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="text-gray-100 text-xl sm:text-2xl md:text-3xl text-center lg:text-left lg:mr-10 px-4">
            Measuring impact with data-driven results
          </div>

          <div className="bg-gradient-to-b w-full sm:w-auto sm:min-w-[300px] lg:min-w-[350px] min-h-[140px] sm:min-h-[160px] from-[#0f172a] to-[#000000] border-2 border-[#0f172a] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-start shadow-md">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 font-bold text-white">
              42<span className="text-lg sm:text-xl font-medium">%</span>
            </h3>
            <p className="text-gray-400 text-end mt-2 text-xs sm:text-sm">
              Average Efficiency Improvement for Clients
            </p>
          </div>

          <div className="bg-gradient-to-b w-full sm:w-auto sm:min-w-[300px] lg:min-w-[350px] min-h-[140px] sm:min-h-[160px] from-[#0f172a] to-[#000000] border-2 border-[#0f172a] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-start shadow-md">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 font-bold text-white">
              167%
            </h3>
            <p className="text-gray-400 text-end mt-2 text-xs sm:text-sm">
              Average ROI Growth Across Projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

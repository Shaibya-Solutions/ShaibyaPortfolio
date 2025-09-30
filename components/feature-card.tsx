// import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { TfiArrowTopRight } from "react-icons/tfi";

export function FeatureCard({
  title,
  desc,
  image,
  className,
}: {
  title: string;
  desc: string;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={`group flex flex-col justify-between items-center min-h-[160px] sm:min-w-[320px] hover:bg-gradient-to-br hover:from-cyan-500/90 hover:to-white/90 rounded-2xl border border-slate-800/60 bg-gradient-to-b from-blue-950/50 to-slate-950/60 p-5 shadow-[0_0_0_1px_rgba(8,145,178,0.05)_inset] transition hover:border-cyan-600/40 ${className}`}
    >
      {/* <div className='mb-3 text-cyan-400'>{icon}</div> */}
      <div className='mb-1 text-xl w-full flex justify-between items-center font-semibold group-hover:text-black text-white'>
        <span>{title}</span>
        <Link href='/'>
          <TfiArrowTopRight />
        </Link>
      </div>
      {image && (
        <div className='mb-2'>
          <Image
            width={500}
            height={500}
            src={image}
            alt={title}
            className='h-[250px] w-[350px] object-contain'
          />
        </div>
      )}
      <p className='text-sm leading-relaxed group-hover:text-slate-800 text-slate-400'>
        {desc}
      </p>
    </div>
  );
}

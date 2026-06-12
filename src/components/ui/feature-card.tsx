import Image from "next/image";
import Link from "next/link";
import { TfiArrowTopRight } from "react-icons/tfi";

export function FeatureCard({
  title,
  desc,
  image,
  className,
  href,
}: {
  title: string;
  desc: string;
  image?: string;
  className?: string;
  href: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <div
        className={`group card-hover-glow flex flex-col justify-between items-start h-full min-h-[160px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-amber-300 ${className}`}
      >
        <div className="mb-3 flex w-full items-center justify-between">
          <span className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
            {title}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-500 group-hover:text-white">
            <TfiArrowTopRight size={13} />
          </span>
        </div>

        {image && (
          <div className="my-2 w-full flex justify-center overflow-hidden rounded-xl">
            <Image
              width={500}
              height={500}
              src={image}
              alt={title}
              className="h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <p className="text-sm leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">
          {desc}
        </p>
      </div>
    </Link>
  );
}

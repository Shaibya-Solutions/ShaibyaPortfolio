"use client";

import { useState } from "react";
import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { products, Product } from "@/app/portfolio/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ExternalLink } from "lucide-react";
import FooterCTA from "@/components/layout/footer/footer-cta";

// Initial number of projects to display on the main page
const INITIAL_PROJECT_COUNT = 3;

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      className="max-w-sm rounded-xl overflow-hidden shadow-lg 
                 bg-slate-900 border border-slate-700/60
                 transition-transform duration-300 hover:scale-[1.02] hover:shadow-cyan-500/10"
    >
      <div className="relative w-full aspect-video">
        <Image
          src={product.image}
          alt={`${product.title} preview`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-xl text-white mb-2">{product.title}</h2>
        <p className="text-slate-400 text-base">{product.tagline}</p>
      </div>
      <div className="px-6 pb-4 flex space-x-4">
        {/* Link 1: Deployed Link (Primary Action) */}
        <Link
          href={product.deployedLink}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold 
                     bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 rounded-full 
                     px-4 py-2 transition-all duration-300 hover:bg-cyan-600/40"
        >
          See Deployed
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Link 2: Blog Link (Secondary Action) */}
        {product.blogLink && (
          <Link
            href={product.blogLink}
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 
                       hover:text-white transition-colors px-2 py-2"
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projectsToDisplay = showAllProjects
    ? products
    : products.slice(0, INITIAL_PROJECT_COUNT);
  const showViewMoreButton =
    products.length > INITIAL_PROJECT_COUNT && !showAllProjects;

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[80vh] bg-gradient-to-b from-[#0f1117] to-[#181b24] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950" />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              We Don’t Just Build Products — We Build Possibilities.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 mb-6">
              A showcase of automation, design, and intelligence — built to
              solve real problems.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#product-gallery"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
              >
                Explore Solutions
              </a>
              <Link
                href="/contact"
                className="bg-transparent border border-white/30 text-white hover:border-white/50 py-3 px-6 rounded-full transition-all duration-300"
              >
                Work With Us
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden md:block w-full h-full relative z-10">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
          Scroll to Explore <ArrowDown className="w-4 h-4 mx-auto mt-2" />
        </div>
      </div>

      {/* Product Gallery */}
      <Section id="product-gallery" className="py-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Our Solutions
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {projectsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {showViewMoreButton && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllProjects(true)}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-600/20 px-6 py-3 text-sm font-semibold text-blue-300 transition-colors hover:bg-blue-600/40"
            >
              View All Solutions
            </button>
          </div>
        )}
      </Section>
      <FooterCTA />
      <SiteFooter />
    </main>
  );
}

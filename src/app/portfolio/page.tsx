"use client";

import { useState } from "react";
import { Section } from "@/components/shared/section";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { products, Product } from "@/app/portfolio/data";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowDown,
  ExternalLink,
  Zap,
  Code,
  DollarSign,
  Target,
  Clock,
  Users,
  Cloud,
  Cpu,
  Server,
  HardDrive,
  HeartPulse,
  Hospital,
  CheckCircle,
  Smartphone,
  BarChart,
  Gem,
  ArrowUp,
  Truck,
} from "lucide-react";

// Initial number of projects to display on the main page
const INITIAL_PROJECT_COUNT = 3;

// Corrected ProductCard component with a more engaging design
const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: (p: Product) => void;
}) => {
  return (
    <div
      className="relative group block rounded-2xl overflow-hidden cursor-pointer
                    bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800
                    shadow-xl shadow-black/20 transition-all duration-300 transform-gpu
                    hover:scale-[1.02] hover:shadow-cyan-500/10"
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={`${product.title} preview`}
          width={800}
          height={600}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col justify-end p-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
            {product.title}
          </h2>
          <p className="text-sm text-slate-300">{product.tagline}</p>
        </div>
      </div>

      {/* Hover overlay with buttons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="rounded-full px-6 py-3 text-sm font-semibold text-white bg-blue-600/90 hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
          {product.blogLink && (
            <Link
              href={product.blogLink}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              View Story <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable components for the detailed page
const QuickInfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col items-center p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
    <Icon className="w-8 h-8 text-cyan-400 mb-2" />
    <span className="text-xs text-white/70">{label}</span>
    <span className="text-lg font-semibold text-white mt-1">{value}</span>
  </div>
);

const TechIcon = ({
  icon: Icon,
  name,
  purpose,
  color,
}: {
  icon: any;
  name: string;
  purpose: string;
  color: string;
}) => (
  <div className="relative group p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
    <Icon
      className="w-10 h-10 mx-auto transition-transform duration-300 group-hover:scale-110"
      style={{ color }}
    />
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-md bg-white text-black text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      {purpose}
    </span>
  </div>
);

const ProductDetailSection = ({
  project,
  onBack,
  onSelectSimilar,
}: {
  project: Product;
  onBack: () => void;
  onSelectSimilar: (p: Product) => void;
}) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 pt-8 sticky top-0 bg-slate-950/70 backdrop-blur z-50">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
              style={{
                textShadow: `0 0 10px ${project.impactMetrics[0].color}`,
              }}
            >
              {project.title}
            </h1>
            <p className="text-xl text-slate-400">{project.tagline}</p>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {project.quickInfo.map((info, index) => (
              <QuickInfoCard key={index} {...info} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl border border-red-500/30 bg-red-500/10">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-red-500 rounded-full" />
                The Challenge
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-green-500/30 bg-green-500/10">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-green-500 rounded-full" />
                The Solution
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {project.impactMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border flex items-start gap-4"
                    style={{
                      borderColor: metric.color + "50",
                      backgroundColor: metric.color + "10",
                    }}
                  >
                    <Icon
                      className="w-8 h-8 flex-shrink-0"
                      style={{ color: metric.color }}
                    />
                    <div>
                      <div
                        className="text-4xl font-bold leading-none"
                        style={{ color: metric.color }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-sm text-white/80 mt-2">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 overflow-x-auto whitespace-nowrap space-x-4 pb-4">
            {project.media.map((item, index) => (
              <div
                key={index}
                className="inline-block relative w-[300px] md:w-[400px] h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Tech Stack
            </h2>
            <div className="flex justify-center flex-wrap gap-6">
              {project.techStack.map((tech, index) => (
                <TechIcon key={index} {...tech} />
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want something like this for your business?
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              Build With Us
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 border-t border-white/10 mt-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          See Similar Solutions
        </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {products
            .filter((p) => p.slug !== project.slug)
            .map((proj) => (
              <div
                key={proj.slug}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onSelectSimilar(proj);
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all duration-300 border border-white/20 cursor-pointer"
              >
                {proj.title}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default function PortfolioPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projectsToDisplay = showAllProjects
    ? products
    : products.slice(0, INITIAL_PROJECT_COUNT);
  const showViewMoreButton =
    products.length > INITIAL_PROJECT_COUNT && !showAllProjects;

  return (
    <main className="bg-slate-950 text-slate-100">
      <SiteHeader />

      {selectedProduct ? (
        <ProductDetailSection
          project={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onSelectSimilar={(p) => setSelectedProduct(p)}
        />
      ) : (
        <>
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
                    Explore Products
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
              Our Projects
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {projectsToDisplay.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>

            {showViewMoreButton && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAllProjects(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-600/20 px-6 py-3 text-sm font-semibold text-blue-300 transition-colors hover:bg-blue-600/40"
                >
                  View All Projects
                </button>
              </div>
            )}
          </Section>
        </>
      )}

      <SiteFooter />
    </main>
  );
}

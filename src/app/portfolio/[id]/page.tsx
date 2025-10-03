import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { projects } from "@/data";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return projects.map((_, index) => ({
    id: index.toString(),
  }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const projectIndex = parseInt(params.id);
  const project = projects[projectIndex];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Shaibya Solutions Portfolio`,
    description: project.description.split("\n\n")[0],
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectIndex = parseInt(params.id);
  const project = projects[projectIndex];

  if (!project || projectIndex < 0 || projectIndex >= projects.length) {
    notFound();
  }

  // Split description into problem and solution
  const descriptionParts = project.description.split("\n\nSolution:\n");
  const problemStatement = descriptionParts[0];
  const solutionDescription = descriptionParts[1] || "";

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Back Navigation */}
      <div className='container mx-auto px-4 pt-8'>
        <Link
          href='/portfolio'
          className='inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group'
        >
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Section */}
      <section className='container mx-auto px-4 py-12'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            {project.title}
          </h1>

          {/* Project Image */}
          <div className='relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'>
            {project.stats.map((stat, index) => (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'
              >
                <div className='text-3xl md:text-4xl font-bold text-purple-400 mb-2'>
                  {stat.value}
                </div>
                <div className='text-sm text-white/80'>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Problem Statement */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-white mb-6 flex items-center gap-3'>
              <div className='w-2 h-8 bg-red-500 rounded-full' />
              The Challenge
            </h2>
            <div className='bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10'>
              <p className='text-lg text-white/90 leading-relaxed whitespace-pre-line'>
                {problemStatement}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-white mb-6 flex items-center gap-3'>
              <div className='w-2 h-8 bg-green-500 rounded-full' />
              Our Solution
            </h2>
            <div className='bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10'>
              <p className='text-lg text-white/90 leading-relaxed mb-6'>
                {solutionDescription.split(". ")[0]}.
              </p>

              {/* Key Features List */}
              <div className='space-y-3'>
                {solutionDescription
                  .split(". ")
                  .slice(1)
                  .filter((feature) => feature.trim())
                  .map((feature, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-3 text-white/80'
                    >
                      <CheckCircle2 className='w-6 h-6 text-green-400 flex-shrink-0 mt-0.5' />
                      <span className='text-base'>{feature.trim()}.</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className='bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Impact Summary
            </h2>
            <p className='text-white/90 text-lg mb-6'>
              This project delivered measurable business value across multiple
              dimensions:
            </p>
            <div className='grid md:grid-cols-2 gap-4'>
              {project.stats.map((stat, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <CheckCircle2 className='w-5 h-5 text-green-400 flex-shrink-0' />
                  <span className='text-white/80'>
                    <span className='font-semibold text-purple-300'>
                      {stat.value}
                    </span>{" "}
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className='mt-16 text-center'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Ready to transform your business?
            </h3>
            <p className='text-white/70 mb-6 max-w-2xl mx-auto'>
              Let's discuss how we can create a custom solution tailored to your
              specific needs and challenges.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50'
            >
              Get Started
              <ArrowLeft className='w-5 h-5 rotate-180' />
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation to Other Projects */}
      <section className='container mx-auto px-4 py-12 border-t border-white/10'>
        <h3 className='text-2xl font-bold text-white mb-6 text-center'>
          Explore More Projects
        </h3>
        <div className='flex justify-center gap-4 flex-wrap'>
          {projects.map(
            (proj, index) =>
              index !== projectIndex && (
                <Link
                  key={index}
                  href={`/portfolio/${index}`}
                  className='px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all duration-300 border border-white/20'
                >
                  {proj.title.split(" - ")[0]}
                </Link>
              )
          )}
        </div>
      </section>
    </div>
  );
}

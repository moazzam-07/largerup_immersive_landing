import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export const portfolioProjects = [
  {
    id: 'wizspace',
    name: 'Wizspace Interior',
    url: 'https://wizspaceinterior.com',
    category: 'Turnkey Architecture',
    location: 'Kolkata',
    image: '/portfolio/portfolio-1.png',
    scope: 'Bespoke residential & commercial turnkey interior design engine with instant estimate calculator.',
  },
  {
    id: 'da-interiors',
    name: 'DA Interiors',
    url: 'https://da-interiors.vercel.app/',
    category: 'Bespoke Luxury Living',
    location: 'Kolkata',
    image: '/portfolio/portfolio-2.png',
    scope: 'Curated 3D panoramic showroom showcasing high-value apartment and duplex transformations.',
  },
  {
    id: 'luxhome',
    name: 'LUXHOME Pvt. Ltd.',
    url: 'https://luxihome.in',
    category: 'Ultra-Luxury Penthouses',
    location: 'Kolkata',
    image: '/portfolio/portfolio-3.png',
    scope: 'Architectural penthouses, standalone villas, and ultra-high-ticket residential design client acquisition.',
  },
  {
    id: 'deco-perfect',
    name: 'Deco Perfect',
    url: 'https://decoperfect.com',
    category: 'Turnkey Flats & Renovation',
    location: 'Kolkata',
    image: '/portfolio/portfolio-4.png',
    scope: 'Modern 2 & 3 BHK flats and full-home renovations with guaranteed handover timelines.',
  },
];

export default function PortfolioCreations() {
  return (
    <section className="w-full mb-12 sm:mb-16">
      {/* Section Header */}
      <div className="w-full text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-2">
          Websites we've engineered for interior studios
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
          Tap any studio website below to explore the live, custom digital experience we built for them.
        </p>
      </div>

      {/* 2-Column Responsive Grid of Built Portfolio Websites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {portfolioProjects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-neutral-200/90 hover:border-neutral-900 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.99] shadow-xs hover:shadow-md"
            title={`Visit ${project.name} (${project.url})`}
          >
            {/* Website Preview Image Container */}
            <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden border-b border-neutral-100">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />

              {/* Minimal Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
                <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span>Open live website</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight group-hover:text-black transition-colors flex items-center gap-1.5">
                    <span>{project.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{project.category}</p>
                </div>
                <span className="text-xs text-neutral-600 font-medium bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200/60">
                  {project.location}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

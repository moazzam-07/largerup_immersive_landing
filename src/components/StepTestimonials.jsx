import React, { useState } from 'react';
import { ArrowRight, Play, Star, CheckCircle, Award } from 'lucide-react';
import VideoModal from './VideoModal';

export default function StepTestimonials({ onNext }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const testimonials = [
    {
      id: 'luxihome',
      studio: 'LuxiHome Interiors',
      owner: 'Ar. Farhan Sheikh',
      city: 'Mumbai',
      projectType: 'Turnkey Luxury Villa',
      metric: '₹38L Project Closed',
      poster: '/videos/luxihome-poster.jpg',
      videoSrc: '/videos/luxihome.mp4',
      quote: 'Before LargerUp, 80% of our inquiries were bargain hunters. Our new website filtered out low budgets before the first call.',
    },
    {
      id: 'alam',
      studio: 'The Alam Interior',
      owner: 'Zeeshan Alam',
      city: 'Delhi NCR',
      projectType: '4BHK Penthouse',
      metric: '14 Homeowner Inquiries/mo',
      poster: '/videos/the-alam-interior-poster.jpg',
      videoSrc: '/videos/the-alam-interior.mp4',
      quote: 'Homeowners now treat us like an established architectural studio. No comparison with Justdial contractors.',
    },
    {
      id: 'deco',
      studio: 'Deco Perfect Studios',
      owner: 'Sneha & Team',
      city: 'Bangalore',
      projectType: 'Commercial & High-End Flat',
      metric: '3X Conversion Rate',
      poster: '/videos/deco-perfect-poster.jpg',
      videoSrc: '/videos/deco-perfect.mp4',
      quote: 'The website paid for itself in the first consultation we closed. Cleanest experience an interior designer can get.',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3 sm:py-6 flex flex-col items-center text-center animate-blur-in">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas-soft border border-hairline mb-3.5 shadow-ios-pill">
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span className="text-xs font-semibold text-ink tracking-tight">
          Real Studio Outcomes
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2">
        See how studios like yours win higher-ticket projects.
      </h2>

      {/* Subtext */}
      <p className="text-xs sm:text-sm text-muted font-normal leading-relaxed max-w-md mb-6">
        Click any case study to hear directly from studio founders who upgraded their client acquisition with LargerUp.
      </p>

      {/* 3 Video Cards - Mobbin Clean Aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6 text-left">
        {testimonials.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideo(item)}
            className="group relative rounded-2xl overflow-hidden bg-canvas border border-hairline hover:border-hairline-strong transition-all duration-300 hover:shadow-ios-card cursor-pointer flex flex-col active:scale-[0.98]"
          >
            {/* Video Poster Thumbnail (Aspect 9:16 or 4:5) */}
            <div className="relative aspect-[4/5] bg-ink-deep overflow-hidden">
              <img
                src={item.poster}
                alt={item.studio}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white text-ink flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>

              {/* Top Verified Pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-1 border border-white/20">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                <span>{item.city}</span>
              </div>

              {/* Bottom Metric Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/90 text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                  {item.metric}
                </span>
                <span className="block text-white text-xs font-bold truncate">
                  {item.studio}
                </span>
              </div>
            </div>

            {/* Quote Snippet */}
            <div className="p-3 bg-canvas-soft border-t border-hairline flex-1 flex flex-col justify-between">
              <p className="text-[11px] text-muted leading-relaxed line-clamp-2 italic mb-2">
                "{item.quote}"
              </p>
              <span className="text-[10px] font-semibold text-ink flex items-center gap-1">
                <Award className="w-3 h-3 text-muted" />
                {item.owner}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full max-w-md bg-ink hover:bg-ink-soft text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group"
      >
        <span>Lock In Your Consultation Time</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      <p className="text-[11px] text-muted font-normal mt-2.5">
        Next: Select your preferred 15-minute slot over the next 3 days
      </p>

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}

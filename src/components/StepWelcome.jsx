import React from 'react';
import { ArrowRight, Sparkles, Check, Shield, Star, Award } from 'lucide-react';

export default function StepWelcome({ onNext }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 sm:py-6 flex flex-col items-center text-center animate-blur-in">
      {/* Category Pill - Mobbin Style */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-soft border border-hairline mb-5 shadow-ios-pill">
        <Sparkles className="w-3.5 h-3.5 text-ink" />
        <span className="text-xs font-semibold text-ink tracking-tight">
          2026 Interior Studio Grant Initiative
        </span>
      </div>

      {/* Main Title - Saans / Plus Jakarta Sans Display */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.08] mb-4">
        Where elite interior studios find clients that work.
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-muted font-normal leading-relaxed max-w-md mb-6">
        Get an ultra-luxury, custom portfolio website engineered exclusively for your interior studio. <span className="font-semibold text-ink">100% complimentary</span> design & development.
      </p>

      {/* Interactive Mobbin-Style Visual Deck Preview */}
      <div className="w-full relative rounded-card bg-canvas-soft border border-hairline p-3 sm:p-4 mb-6 shadow-ios-card overflow-hidden">
        {/* Floating Mini Browser Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="px-3 py-0.5 rounded-full bg-canvas border border-hairline text-[11px] font-mono text-muted">
            interiors.largerup.com/studio-preview
          </div>
          <div className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Live Preview
          </div>
        </div>

        {/* 3 Interior Showcase Cards Carousel */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="group relative rounded-card-sm overflow-hidden border border-hairline bg-canvas aspect-[3/4] shadow-sm">
            <img
              src="/portfolio/portfolio-1.png"
              alt="Luxury Living Interior Design"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left">
              <span className="block text-[10px] font-semibold text-white truncate">The Alam Interior</span>
              <span className="block text-[8px] text-white/80">Residential Villa</span>
            </div>
          </div>

          <div className="group relative rounded-card-sm overflow-hidden border border-ink/20 bg-canvas aspect-[3/4] shadow-md ring-2 ring-ink/5">
            <img
              src="/portfolio/portfolio-2.png"
              alt="Minimalist Modular Kitchen & Decor"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left">
              <span className="block text-[10px] font-semibold text-white truncate">LuxiHome Design</span>
              <span className="block text-[8px] text-white/80">Penthouse Styling</span>
            </div>
          </div>

          <div className="group relative rounded-card-sm overflow-hidden border border-hairline bg-canvas aspect-[3/4] shadow-sm">
            <img
              src="/portfolio/portfolio-3.png"
              alt="Contemporary Architecture & Interiors"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left">
              <span className="block text-[10px] font-semibold text-white truncate">Deco Perfect</span>
              <span className="block text-[8px] text-white/80">Luxury 4BHK</span>
            </div>
          </div>
        </div>

        {/* Floating Tag */}
        <div className="mt-3 flex items-center justify-between text-left text-[11px] text-muted px-1">
          <span className="flex items-center gap-1.5 font-medium">
            <Award className="w-3.5 h-3.5 text-ink" />
            Curated Architectural Typography & Motion
          </span>
          <span className="text-ink font-semibold">Value: ₹45,000+ (Zero Cost)</span>
        </div>
      </div>

      {/* Feature Pills Grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-md mb-6 text-left">
        <div className="flex items-start gap-2 p-2.5 rounded-card-sm bg-canvas-soft border border-hairline">
          <div className="w-4 h-4 rounded-full bg-ink text-white flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-2.5 h-2.5" />
          </div>
          <div className="text-xs">
            <span className="font-semibold text-ink block">Direct High-Ticket Clients</span>
            <span className="text-muted text-[11px]">No sharing leads with 10 competitors</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2.5 rounded-card-sm bg-canvas-soft border border-hairline">
          <div className="w-4 h-4 rounded-full bg-ink text-white flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-2.5 h-2.5" />
          </div>
          <div className="text-xs">
            <span className="font-semibold text-ink block">Ready in 7 Business Days</span>
            <span className="text-muted text-[11px]">Turnkey copy, visuals & WhatsApp link</span>
          </div>
        </div>
      </div>

      {/* Primary iOS Action Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full max-w-md bg-ink hover:bg-ink-soft text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group"
      >
        <span>Claim Free Studio Website</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      {/* Micro Disclaimer */}
      <p className="text-[11px] text-muted font-normal mt-3">
        Takes 60 seconds · No credit card required · Only for verified interior professionals
      </p>
    </div>
  );
}

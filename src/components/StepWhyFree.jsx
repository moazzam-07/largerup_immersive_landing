import React from 'react';
import { ArrowRight, Compass, MessageSquareQuote, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function StepWhyFree({ onNext, name }) {
  const firstName = (name || '').trim().split(' ')[0] || 'there';

  return (
    <div className="w-full max-w-xl mx-auto px-5 py-4 sm:py-8 flex flex-col text-left animate-blur-in">
      {/* Top Tag & Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-semibold text-neutral-800 mb-3 tracking-wide uppercase">
          <span>Direct & Transparent</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          Why are we building your website for free?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          No hidden agendas. Here is the honest blueprint behind why LargerUp provides complimentary studio websites.
        </p>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="space-y-3.5 mb-6">
        {/* Pillar 1: Dedicated to Interior Studios */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-neutral-300 transition-all duration-150">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-0.5">
                Startup Focus
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-1">
                We are dedicated specifically to the interior design industry.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                As an ambitious design & engineering startup, we focus exclusively on architecture and interior studios. Providing exceptional upfront work is how we earn trust and prove our standard.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Video Testimonial Exchange */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-neutral-300 transition-all duration-150">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-0.5">
                Fair Value Exchange
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-1">
                Your candid testimonial is our currency.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We engineer your custom portfolio at zero design and development charge. All we ask in return is your honest video review and testimonial once your website goes live.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 3: SEO, Hosting & Maintenance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-neutral-300 transition-all duration-150">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-0.5">
                Engineered for Inquiries
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-1">
                Full local SEO, lightning hosting, and ongoing maintenance.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We don't just hand over a site and leave. We set up local architectural SEO, mobile performance, cloud security, and ongoing technical support so homeowners in your city easily find and contact you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Line */}
      <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70 mb-6 flex items-center gap-2 text-xs text-neutral-600">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Code & Domain Ownership • Zero Lock-in Contracts</span>
      </div>

      {/* Continue CTA */}
      <button
        onClick={onNext}
        className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
      >
        <span>Continue to Schedule Call</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

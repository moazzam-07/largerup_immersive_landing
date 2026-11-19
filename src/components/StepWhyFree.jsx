import React from 'react';
import { ArrowRight, Check, HeartHandshake, Video, MessageCircle } from 'lucide-react';

export default function StepWhyFree({ onNext, name }) {
  const firstName = (name || '').trim().split(' ')[0] || 'there';

  return (
    <div className="w-full max-w-lg mx-auto px-5 py-3 sm:py-6 flex flex-col text-left animate-blur-in">
      {/* Title & Subtitle - Short & Direct */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1.5">
          Why is this website free?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          A simple, honest deal between us and interior designers.
        </p>
      </div>

      {/* 3 Short, Jargon-Free Points in a Single Unified Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-4 mb-4">
        {/* Point 1 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              1. We're looking for interior clients
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We are a new team focusing 100% on interior designers. Building your website for free is our way of showing our work and earning your trust.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100" />

        {/* Point 2 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              2. All we ask is an honest review
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You get a custom website at zero cost. In return, all we ask is a short video review sharing your honest feedback once your site is live.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100" />

        {/* Point 3 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              3. Built to bring you real client inquiries
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We set up your Google search, make your site super fast on phones, and connect it directly to WhatsApp so local clients can easily call or message you.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Line */}
      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-5 px-1">
        <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
        <span>You own 100% of your website, photos, and domain name.</span>
      </div>

      {/* Single Clear CTA Button */}
      <button
        onClick={onNext}
        className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
      >
        <span>Pick a Call Time</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

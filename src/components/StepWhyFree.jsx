import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { TypingAnimation } from './ui/typing-animation';

export default function StepWhyFree({ onNext }) {
  return (
    <div className="w-full max-w-lg mx-auto px-5 py-4 sm:py-8 flex flex-col text-left animate-blur-in">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <TypingAnimation
          as="h1"
          duration={35}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1.5 block"
        >
          Why is this website free?
        </TypingAnimation>
        <p className="text-xs sm:text-sm text-neutral-500">
          A transparent partnership for interior design studios.
        </p>
      </div>

      {/* 3 Ultra-Crisp Points: Concise & direct without long paragraphs */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-3.5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-900 font-bold text-xs">
            1
          </div>
          <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
            We focus exclusively on interior design studios & architects.
          </span>
        </div>

        <div className="border-t border-neutral-100" />

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-900 font-bold text-xs">
            2
          </div>
          <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
            In exchange, we only ask for an honest video review once your site goes live.
          </span>
        </div>

        <div className="border-t border-neutral-100" />

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-900 font-bold text-xs">
            3
          </div>
          <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">
            Engineered with local Google SEO and direct WhatsApp inquiries.
          </span>
        </div>
      </div>

      {/* Trust Line */}
      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-6 px-1">
        <Check className="w-4 h-4 text-neutral-900 shrink-0 stroke-[2.5]" />
        <span>You own 100% of your website code, domain, and photos.</span>
      </div>

      {/* Single Clear CTA Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
      >
        <span>See Client Results</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

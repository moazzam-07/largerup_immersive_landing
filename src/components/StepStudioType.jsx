import React, { useState } from 'react';
import { ArrowRight, Building2, User, Hammer, Palette, Check } from 'lucide-react';
import { TypingAnimation } from './ui/typing-animation';

export default function StepStudioType({ name, value, onNext }) {
  const [selected, setSelected] = useState(value || '');

  const options = [
    {
      id: 'Interior Design Studio / Firm',
      title: 'Interior Design Studio',
      desc: 'Residential or commercial firm with an active team.',
      icon: Building2,
    },
    {
      id: 'Independent Interior Designer',
      title: 'Independent Designer',
      desc: 'Solo interior designer or independent consultant.',
      icon: User,
    },
    {
      id: 'Architecture & Turnkey Contractor',
      title: 'Turnkey & Architecture Firm',
      desc: 'End-to-end architectural planning and execution.',
      icon: Hammer,
    },
    {
      id: '3D Visualizer & Decor Stylist',
      title: '3D Visualizer / Stylist',
      desc: 'High-end 3D rendering and interior styling.',
      icon: Palette,
    },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => {
      onNext(id);
    }, 180);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      <TypingAnimation
        as="h1"
        duration={35}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2 block"
      >
        What describes your work?
      </TypingAnimation>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        This helps us tailor your website structure and portfolio layout.
      </p>

      <div className="space-y-3 mb-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between gap-4 group ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50/80 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-400 bg-white active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-base font-semibold text-neutral-900">
                    {opt.title}
                  </span>
                  <span className="block text-xs text-neutral-500 mt-0.5">
                    {opt.desc}
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className="w-full bg-neutral-900 hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

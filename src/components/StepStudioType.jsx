import React, { useState } from 'react';
import { ArrowRight, Building2, User, Hammer, Palette, Check } from 'lucide-react';

export default function StepStudioType({ name, value, onNext }) {
  const [selectedRole, setSelectedRole] = useState(value || '');

  const roles = [
    {
      id: 'Studio Owner',
      title: 'Interior Design Studio / Firm',
      desc: 'Residential or commercial design firm with an active team or office.',
      icon: Building2,
      badge: 'Popular',
    },
    {
      id: 'Freelance Designer',
      title: 'Solo Interior Designer / Architect',
      desc: 'Independent practitioner seeking direct, high-value client commissions.',
      icon: User,
    },
    {
      id: 'Turnkey Contractor',
      title: 'Turnkey & Execution Contractor',
      desc: 'Comprehensive civil, modular, and turnkey interior solutions.',
      icon: Hammer,
    },
    {
      id: '3D Visualizer / Decorator',
      title: 'Luxury Stylist & 3D Visualizer',
      desc: 'High-end 3D rendering, decor curation, and bespoke space styling.',
      icon: Palette,
    },
  ];

  const handleSelect = (roleId) => {
    setSelectedRole(roleId);
    // Instant smooth progress
    setTimeout(() => {
      onNext(roleId);
    }, 220);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-blur-in">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2.5">
        Nice to meet you, {name || 'Designer'}.
      </h2>

      <p className="text-sm text-muted font-normal leading-relaxed max-w-md mb-6">
        What best describes your interior design practice?
      </p>

      {/* Options Stack */}
      <div className="w-full space-y-2.5 mb-6 text-left">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleSelect(role.id)}
              className={`w-full p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 text-left group relative ${
                isSelected
                  ? 'bg-canvas-soft border-ink shadow-ios-card ring-2 ring-ink/10'
                  : 'bg-canvas-soft/60 hover:bg-canvas-soft border-hairline hover:border-hairline-strong active:scale-[0.99]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isSelected
                      ? 'bg-ink text-white'
                      : 'bg-canvas border border-hairline text-ink group-hover:bg-ink group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm sm:text-base font-bold text-ink">
                      {role.title}
                    </span>
                    {role.badge && (
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-ink text-white">
                        {role.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              </div>

              {/* Check Radio */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                  isSelected
                    ? 'bg-ink border-ink text-white'
                    : 'border-hairline group-hover:border-hairline-strong'
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
        disabled={!selectedRole}
        onClick={() => selectedRole && onNext(selectedRole)}
        className="w-full max-w-md bg-ink hover:bg-ink-soft disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

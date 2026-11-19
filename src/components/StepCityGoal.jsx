import React, { useState } from 'react';
import { ArrowRight, MapPin, Target, Sparkles } from 'lucide-react';

export default function StepCityGoal({ name, cityValue, goalValue, studioNameValue, onNext }) {
  const [studioName, setStudioName] = useState(studioNameValue || '');
  const [city, setCity] = useState(cityValue || '');
  const [goal, setGoal] = useState(goalValue || 'High-Ticket Homeowners');
  const [error, setError] = useState('');

  const quickCities = [
    'Mumbai',
    'Delhi NCR',
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
  ];

  const goals = [
    {
      id: 'High-Ticket Homeowners',
      label: 'Acquire high-budget homeowners (> ₹15L–50L+)',
    },
    {
      id: 'Stop Broker Dependency',
      label: 'End reliance on Justdial/broker cuts & low-margin referrals',
    },
    {
      id: 'Luxury Brand Perception',
      label: 'Build an ultra-luxurious digital identity that commands premium fees',
    },
  ];

  const handleContinue = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please select or enter your studio city.');
      return;
    }
    setError('');
    onNext({
      studioName: studioName.trim() || `${name}'s Studio`,
      city: city.trim(),
      goal,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-blur-in">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2.5">
        Tell us about your studio.
      </h2>

      <p className="text-sm text-muted font-normal leading-relaxed max-w-md mb-6">
        We calibrate your website typography, showcase projects, and local SEO for your exact market.
      </p>

      <form onSubmit={handleContinue} className="w-full space-y-5 text-left">
        {/* Studio Name */}
        <div>
          <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
            Studio / Brand Name <span className="text-muted font-normal normal-case">(or your personal name)</span>
          </label>
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            placeholder="e.g. Studio Vista Architecture"
            className="w-full bg-canvas-soft border border-hairline hover:border-hairline-strong focus:border-ink rounded-2xl px-4 py-3.5 text-base font-medium text-ink placeholder:text-muted/50 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all duration-200"
          />
        </div>

        {/* City Input + Pills */}
        <div>
          <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
            Primary City / Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Mumbai, South Delhi, Whitefield Bangalore..."
            className="w-full bg-canvas-soft border border-hairline hover:border-hairline-strong focus:border-ink rounded-2xl px-4 py-3.5 text-base font-medium text-ink placeholder:text-muted/50 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all duration-200 mb-2.5"
          />

          {/* Quick city pills */}
          <div className="flex flex-wrap gap-1.5">
            {quickCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCity(c);
                  if (error) setError('');
                }}
                className={`text-xs px-3 py-1 rounded-full border transition-all duration-150 active:scale-95 ${
                  city.toLowerCase() === c.toLowerCase()
                    ? 'bg-ink text-white border-ink font-semibold'
                    : 'bg-canvas-soft hover:bg-canvas-field border-hairline text-muted hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium mt-1.5 px-1 animate-shake">
              {error}
            </p>
          )}
        </div>

        {/* Primary Goal Selection */}
        <div>
          <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
            Top Priority for Next 90 Days
          </label>
          <div className="space-y-2">
            {goals.map((g) => {
              const isSelected = goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-canvas-soft border-ink text-ink font-semibold shadow-sm'
                      : 'bg-canvas-soft/60 hover:bg-canvas-soft border-hairline text-muted hover:text-ink'
                  }`}
                >
                  <span>{g.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-ink bg-ink text-white'
                        : 'border-hairline'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-ink hover:bg-ink-soft text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group mt-4"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

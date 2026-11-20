import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TypingAnimation } from './ui/typing-animation';

export default function StepCityGoal({ name, cityValue, studioNameValue, onNext }) {
  const [studioName, setStudioName] = useState(studioNameValue || '');
  const [city, setCity] = useState(cityValue || '');
  const [errors, setErrors] = useState({});
  const [q1Done, setQ1Done] = useState(false);

  const quickCities = [
    'Kolkata',
    'Mumbai',
    'Delhi NCR',
    'Bangalore',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!city.trim()) {
      newErrors.city = 'Please select or enter your city';
    }

    if (!studioName.trim()) {
      newErrors.studioName = 'Please enter your studio or business name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext({
      studioName: studioName.trim(),
      city: city.trim(),
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      <TypingAnimation
        as="h1"
        duration={35}
        onComplete={() => setQ1Done(true)}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2 block"
      >
        Where are you based?
      </TypingAnimation>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        This helps local clients in your city easily find your work.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Input */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            City or Town <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
            }}
            placeholder="e.g. Kolkata, Mumbai, Bangalore..."
            className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl px-5 py-4 text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150 mb-3"
          />

          {/* Clean City Chips */}
          <div className="flex flex-wrap gap-2">
            {quickCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCity(c);
                  if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 active:scale-95 ${
                  city.toLowerCase() === c.toLowerCase()
                    ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {errors.city && (
            <p className="text-xs text-red-500 font-medium mt-2 px-1">
              {errors.city}
            </p>
          )}
        </div>

        {/* Studio / Brand Name */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              <TypingAnimation
                as="span"
                duration={30}
                enabled={q1Done}
                className="inline-block"
              >
                Studio or Brand Name
              </TypingAnimation>{' '}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            type="text"
            value={studioName}
            onChange={(e) => {
              setStudioName(e.target.value);
              if (errors.studioName) setErrors((prev) => ({ ...prev, studioName: '' }));
            }}
            placeholder={`e.g. Studio Vista or ${name ? `${name} Interiors` : 'Your Name Designs'}`}
            className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl px-5 py-3.5 text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150"
          />

          {/* Subtle note suggesting to write own name if no studio */}
          <p className="text-[12px] text-neutral-400 mt-2 px-1 leading-normal">
            No studio name yet? You can simply use your own name (e.g.{' '}
            <button
              type="button"
              onClick={() => {
                const suggestion = `${name ? name : 'Design'} Interiors`;
                setStudioName(suggestion);
                if (errors.studioName) setErrors((prev) => ({ ...prev, studioName: '' }));
              }}
              className="text-neutral-700 underline underline-offset-2 hover:text-black font-medium"
            >
              {name ? `${name} Interiors` : 'Your Name Interiors'}
            </button>
            ).
          </p>

          {errors.studioName && (
            <p className="text-xs text-red-500 font-medium mt-2 px-1">
              {errors.studioName}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm pt-4"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

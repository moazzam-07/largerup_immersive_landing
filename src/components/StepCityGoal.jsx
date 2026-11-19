import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StepCityGoal({ name, cityValue, studioNameValue, onNext }) {
  const [studioName, setStudioName] = useState(studioNameValue || '');
  const [city, setCity] = useState(cityValue || '');
  const [error, setError] = useState('');

  const quickCities = [
    'Mumbai',
    'Delhi NCR',
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Kolkata',
    'Chennai',
    'Ahmedabad',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter or select your city');
      return;
    }
    setError('');
    onNext({
      studioName: studioName.trim() || `${name}'s Studio`,
      city: city.trim(),
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
        Where are you based?
      </h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        We optimize your website layout and project portfolio for your local market.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Input */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            City / Location
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Mumbai, Bangalore, Delhi..."
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
                  if (error) setError('');
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

          {error && (
            <p className="text-xs text-red-500 font-medium mt-2 px-1">
              {error}
            </p>
          )}
        </div>

        {/* Studio / Brand Name (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            Studio Name <span className="text-neutral-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            placeholder="e.g. Studio Vista or leave blank to use your name"
            className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl px-5 py-3.5 text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150"
          />
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

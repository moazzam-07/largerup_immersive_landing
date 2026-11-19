import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, User } from 'lucide-react';

export default function StepName({ value, onNext }) {
  const [name, setName] = useState(value || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Autofocus input smoothly
    inputRef.current?.focus();
  }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to personalize your studio website.');
      return;
    }
    setError('');
    onNext(name.trim());
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center animate-blur-in">
      {/* Icon Badge */}
      <div className="w-12 h-12 rounded-full bg-canvas-soft border border-hairline flex items-center justify-center text-ink mb-5 shadow-ios-pill">
        <User className="w-5 h-5 text-ink" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2.5">
        What is your name?
      </h2>

      {/* Subtext */}
      <p className="text-sm text-muted font-normal leading-relaxed max-w-sm mb-8">
        We’ll personalize your studio design deck and website prototype with your name and branding.
      </p>

      {/* Form Card */}
      <form onSubmit={handleContinue} className="w-full max-w-md space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-canvas-soft border border-hairline hover:border-hairline-strong focus:border-ink rounded-2xl px-5 py-4 text-lg font-medium text-ink placeholder:text-muted/50 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all duration-200"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium text-left px-2 animate-shake">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-ink hover:bg-ink-soft text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group mt-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <p className="text-[12px] text-muted/70 text-center font-normal pt-1">
          Press <kbd className="px-1.5 py-0.5 rounded bg-canvas-field border border-hairline text-ink font-mono text-[10px]">Enter ↵</kbd> to continue
        </p>
      </form>
    </div>
  );
}

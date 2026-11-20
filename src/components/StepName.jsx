import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TypingAnimation } from './ui/typing-animation';

export default function StepName({ value, onNext }) {
  const [name, setName] = useState(value || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setError('');
    onNext(name.trim());
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      {/* Question with Typing Animation */}
      <TypingAnimation
        as="h1"
        duration={35}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2 block"
      >
        What's your name?
      </TypingAnimation>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        We'll customize your free website preview for you.
      </p>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="Your full name"
            autoComplete="name"
            className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl px-5 py-4 text-lg font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150"
          />
          {error && (
            <p className="text-xs text-red-500 font-medium mt-2 px-1">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

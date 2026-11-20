import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Floating Next Button for long / scrollable slides.
 * Appears at the bottom-right when the user is scrolled away from the primary inline button.
 * Smoothly converges and dissolves into the inline button as the user scrolls down to it.
 */
export default function FloatingNextButton({
  targetRef,
  onClick,
  label = 'Next',
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    // Check visibility using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If inline button is in viewport, hide floating button
        // If inline button is scrolled off-screen, display floating button
        setShow(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    // Initial check in case observer hasn't fired yet
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;
    setShow(!inView);

    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed bottom-6 right-5 z-40 bg-neutral-900 hover:bg-black text-white font-medium text-xs sm:text-sm py-3 px-4.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transition-all duration-300 active:scale-95 border border-white/20 backdrop-blur-md cursor-pointer ${
        show
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

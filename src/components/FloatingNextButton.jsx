import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Floating Next Button for long / scrollable slides.
 * Floats at bottom-right with generous padding and margins.
 * When the user scrolls down to the inline button, it animates across the screen,
 * gliding directly towards the center and converging seamlessly into the inline button.
 */
export default function FloatingNextButton({
  targetRef,
  onClick,
  label = 'Pick a Date',
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    // Check visibility using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);

    // Initial check on mount
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;
    setIsIntersecting(inView);

    return () => observer.disconnect();
  }, [targetRef]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <button
      type="button"
      onClick={onClick}
      className={`fixed bottom-8 right-6 sm:bottom-9 sm:right-8 z-40 bg-neutral-900 hover:bg-black text-white font-semibold text-sm py-3.5 px-6 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex items-center gap-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 border border-white/15 backdrop-blur-md cursor-pointer ${
        !isIntersecting
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-x-[calc(50vw-50%-1.5rem)] -translate-y-2 scale-110 pointer-events-none'
      }`}
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>,
    document.body
  );
}

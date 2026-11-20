import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Floating Next Button for long / scrollable slides.
 * Portaled to document.body to remain strictly anchored to the viewport.
 * Features generous padding, margin, and typography.
 * Smoothly dissolves into the inline button as the user scrolls down to it.
 */
export default function FloatingNextButton({
  targetRef,
  onClick,
  label = 'Continue',
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <button
      type="button"
      onClick={onClick}
      className={`fixed bottom-8 right-6 sm:bottom-9 sm:right-8 z-40 bg-neutral-900 hover:bg-black text-white font-semibold text-sm py-3.5 px-6 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex items-center gap-2.5 transition-all duration-300 active:scale-95 border border-white/15 backdrop-blur-md cursor-pointer ${
        show
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>,
    document.body
  );
}

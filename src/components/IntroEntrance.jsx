import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Highlighter } from './ui/highlighter';
import LargerUpLogo from './LargerUpLogo';

/**
 * Premium Intro Entrance for Meta Ad Arrivals
 * Displays "Claim your free website" with sophisticated blur, tracking, and marker animation,
 * followed by a fast, cinematic blur-and-noise dissolve morphing into Step 1.
 */
export default function IntroEntrance({ onComplete }) {
  const [phase, setPhase] = useState('entering'); // 'entering' | 'highlighting' | 'exiting'

  useEffect(() => {
    // 1. Enter and reveal text
    const highlightTimer = setTimeout(() => {
      setPhase('highlighting');
    }, 500);

    // 2. Trigger fast blur + noise exit transition
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 1600);

    // 3. Complete and unmount overlay
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2050);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Allow clicking anywhere to skip immediately
  const handleFastSkip = () => {
    setPhase('exiting');
    setTimeout(() => {
      onComplete();
    }, 220);
  };

  return (
    <motion.div
      onClick={handleFastSkip}
      initial={{ opacity: 1 }}
      animate={
        phase === 'exiting'
          ? {
              opacity: 0,
              filter: 'blur(20px)',
              scale: 1.04,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }
          : { opacity: 1, filter: 'blur(0px)', scale: 1 }
      }
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white text-neutral-900 px-6 py-10 cursor-pointer select-none overflow-hidden"
    >
      {/* Subtle Noise / Film Grain Filter Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft Ambient Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.02)_0%,transparent_70%)]" />

      {/* Top Bar Branding (Clean without badge) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg flex items-center justify-start relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <LargerUpLogo className="w-6 h-6 text-neutral-900" />
          <span className="font-bold tracking-tight text-sm text-neutral-900">
            LargerUp
          </span>
        </div>
      </motion.div>

      {/* Center Cinematic Content */}
      <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto my-auto relative z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.15] mb-4"
        >
          <span>Claim your </span>
          <span className="relative inline-block whitespace-nowrap">
            {phase !== 'entering' ? (
              <Highlighter
                action="highlight"
                color="#fef08a"
                strokeWidth={2}
                padding={4}
                animationDuration={600}
              >
                free website.
              </Highlighter>
            ) : (
              <span>free website.</span>
            )}
          </span>
        </motion.h1>

        {/* Subtitle - Transparent Value Exchange */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto leading-relaxed"
        >
          We build your custom high-converting studio website in exchange for your honest video review.
        </motion.p>
      </div>

      {/* Bottom Hint / Fast Skip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="w-full max-w-lg flex items-center justify-between text-[11px] text-neutral-400 relative z-10"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          Loading your application...
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFastSkip();
          }}
          className="hover:text-neutral-700 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Tap to start now &rarr;
        </button>
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import LargerUpLogo from './LargerUpLogo';

export default function StepProgressBar({
  currentStep,
  totalSteps,
  onBack,
  canGoBack,
  stepTitles = [],
}) {
  return (
    <header className="w-full max-w-2xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
      {/* Top Bar: Logo, Step Tag & Badge */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Previous step"
              className="w-8 h-8 rounded-full bg-canvas-soft border border-hairline flex items-center justify-center text-ink hover:bg-canvas-field transition-all duration-150 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-white shadow-ios-pill">
              <LargerUpLogo className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-ink flex items-center gap-1.5">
              LargerUp
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-canvas-field border border-hairline text-muted">
                Studio Edition
              </span>
            </span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas-soft border border-hairline text-[11px] font-medium text-ink">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>5 Studio Grants Left</span>
        </div>
      </div>

      {/* iOS Segmented Progress Bar */}
      {currentStep > 0 && currentStep <= totalSteps && (
        <div className="space-y-1.5">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepNumber = idx + 1;
              const isFilled = stepNumber <= currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div
                  key={idx}
                  className="h-1 rounded-full overflow-hidden bg-hairline-soft transition-all duration-300"
                >
                  <div
                    className={`h-full transition-all duration-500 ease-ios-spring ${
                      isFilled ? 'bg-ink w-full' : 'w-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted font-medium px-0.5">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            {stepTitles[currentStep - 1] && (
              <span className="text-ink font-semibold tracking-tight">
                {stepTitles[currentStep - 1]}
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

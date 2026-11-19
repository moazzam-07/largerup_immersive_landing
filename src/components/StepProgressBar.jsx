import React from 'react';
import { ArrowLeft } from 'lucide-react';
import LargerUpLogo from './LargerUpLogo';

export default function StepProgressBar({
  currentStep,
  totalSteps,
  onBack,
  canGoBack,
}) {
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <header className="w-full max-w-xl mx-auto px-6 pt-6 sm:pt-8 pb-3">
      <div className="flex items-center justify-between h-9 mb-4">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-3">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-all duration-150 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <LargerUpLogo className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                LargerUp
              </span>
            </div>
          )}
        </div>

        {/* Right: Subtle Step Counter */}
        <span className="text-xs font-medium text-neutral-400">
          {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Apple / Uber style slim 2px progress track */}
      <div className="w-full h-[3px] bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-900 transition-all duration-400 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}

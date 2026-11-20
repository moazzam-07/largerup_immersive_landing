import React from 'react';
import { Calendar, Check, ArrowRight } from 'lucide-react';
import { TypingAnimation } from './ui/typing-animation';

export default function StepSelectDate({
  availableDays = [],
  selectedDate,
  onSelectDate,
}) {
  return (
    <div className="w-full max-w-lg mx-auto px-5 py-4 sm:py-8 flex flex-col text-left animate-blur-in">
      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800 mb-2.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Step 1 of 2: Select Date</span>
        </div>
        <TypingAnimation
          as="h1"
          duration={35}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1 block"
        >
          Pick a consultation date.
        </TypingAnimation>
        <p className="text-xs sm:text-sm text-neutral-500">
          Choose an available day over the next 3 days to talk about your website.
        </p>
      </div>

      {/* 3 Large, Clean Touch Pills */}
      <div className="space-y-3 mb-6">
        {availableDays.map((day, idx) => {
          const isSelected = selectedDate?.dateStr === day.dateStr;
          const isTomorrow = idx === 0;

          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day)}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between group active:scale-[0.99] ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 shadow-sm ring-2 ring-neutral-900/5'
                  : 'border-neutral-200 hover:border-neutral-400 bg-white shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-800 group-hover:bg-neutral-200'
                  }`}
                >
                  <span className="text-[10px] uppercase font-semibold leading-none">
                    {day.weekday}
                  </span>
                  <span className="text-sm font-extrabold leading-none mt-0.5">
                    {day.monthDay?.split(' ')[1] || idx + 20}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-neutral-900">
                      {day.weekday}, {day.monthDay}
                    </span>
                    {isTomorrow && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                        Tomorrow
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    {day.slots?.length || 4} available slots
                  </span>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Clock, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export default function StepSelectSlot({
  selectedDate,
  onBackToDate,
  onConfirmBooking,
  isSubmitting,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const slots = selectedDate?.slots || [];

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    onConfirmBooking(selectedSlot);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-5 py-4 sm:py-8 flex flex-col text-left animate-blur-in">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
            <Clock className="w-3.5 h-3.5" />
            <span>Step 2 of 2: Select Time</span>
          </div>
          <button
            type="button"
            onClick={onBackToDate}
            className="text-xs text-neutral-500 hover:text-black font-medium flex items-center gap-1 underline underline-offset-2"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Change Date</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
          Pick a call time.
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Open slots for <span className="font-semibold text-neutral-800">{selectedDate?.dayLabel || 'selected day'}</span> (IST).
        </p>
      </div>

      {/* 2-Column Slot Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5 max-h-[300px] overflow-y-auto no-scrollbar pr-0.5">
        {slots.map((slot, idx) => {
          const isSelected = selectedSlot?.time === slot.time;

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSlotClick(slot)}
              className={`py-3.5 px-4 rounded-xl border text-center font-medium text-sm transition-all duration-150 active:scale-[0.98] ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-2 ring-neutral-900/10'
                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
              }`}
            >
              {slot.formatted}
            </button>
          );
        })}
      </div>

      {/* Confirm Button */}
      <button
        type="button"
        disabled={!selectedSlot || isSubmitting}
        onClick={handleConfirm}
        className={`w-full py-3.5 sm:py-4 px-6 rounded-full font-medium text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-sm ${
          selectedSlot && !isSubmitting
            ? 'bg-neutral-900 hover:bg-black text-white active:scale-[0.98]'
            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reserving Call Slot...</span>
          </>
        ) : (
          <>
            <span>
              {selectedSlot
                ? `Confirm for ${selectedSlot.formatted}`
                : 'Select a time slot above'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

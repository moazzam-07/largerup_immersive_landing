import React, { useState } from 'react';
import { Calendar, Clock, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepCalendar({
  name,
  onConfirmBooking,
  isSubmitting,
}) {
  // Generate the strictly next 3 days starting from tomorrow
  const getNextThreeDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const dayName = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const fullDate = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const weekdayFull = d.toLocaleDateString('en-US', { weekday: 'long' });

      days.push({
        id: d.toISOString().split('T')[0],
        label: dayName,
        date: fullDate,
        weekday: weekdayFull,
        slotsLeft: i === 1 ? 2 : i === 2 ? 3 : 2,
      });
    }
    return days;
  };

  const availableDays = getNextThreeDays();
  const [selectedDay, setSelectedDay] = useState(availableDays[0].id);
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM');
  const [error, setError] = useState('');

  const timeSlots = [
    { time: '11:30 AM', period: 'Morning' },
    { time: '02:00 PM', period: 'Afternoon' },
    { time: '04:30 PM', period: 'Afternoon' },
    { time: '06:30 PM', period: 'Evening' },
    { time: '08:00 PM', period: 'Evening' },
  ];

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) {
      setError('Please choose a date and time slot.');
      return;
    }

    const chosenDayObj = availableDays.find((d) => d.id === selectedDay);
    const bookingDetails = {
      date: `${chosenDayObj.weekday}, ${chosenDayObj.date}`,
      time: selectedSlot,
      formatted: `${chosenDayObj.weekday}, ${chosenDayObj.date} at ${selectedSlot}`,
    };

    // Confetti effect celebrating the reservation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#141414', '#0066ff', '#10b981', '#707070'],
    });

    onConfirmBooking(bookingDetails);
  };

  const currentDayObj = availableDays.find((d) => d.id === selectedDay);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-blur-in">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas-soft border border-hairline mb-3.5 shadow-ios-pill">
        <Calendar className="w-3.5 h-3.5 text-ink" />
        <span className="text-xs font-semibold text-ink tracking-tight">
          Strictly 3-Day Window · 15-Min 1-on-1 Strategy
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2">
        Pick your onboarding call slot.
      </h2>

      {/* Subtext */}
      <p className="text-sm text-muted font-normal leading-relaxed max-w-md mb-6">
        We review your studio portfolio, outline your custom website blueprint, and hand over your credentials.
      </p>

      <form onSubmit={handleConfirm} className="w-full space-y-6 text-left">
        {/* Next 3 Days Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              1. Select Date (Next 3 Days)
            </span>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {currentDayObj?.slotsLeft} slots remaining
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {availableDays.map((d) => {
              const isSelected = selectedDay === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDay(d.id)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-ink text-white border-ink shadow-ios-pill'
                      : 'bg-canvas-soft hover:bg-canvas-field border-hairline text-ink'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isSelected ? 'text-white/80' : 'text-muted'
                    }`}
                  >
                    {d.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold my-0.5">
                    {d.date}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected ? 'text-emerald-300' : 'text-emerald-600'
                    }`}
                  >
                    {d.slotsLeft} slots open
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots Grid */}
        <div>
          <span className="text-xs font-bold text-ink uppercase tracking-wider block mb-2">
            2. Select 15-Min Consultation Window
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between active:scale-95 ${
                    isSelected
                      ? 'bg-canvas-soft border-ink text-ink font-bold ring-2 ring-ink/10 shadow-sm'
                      : 'bg-canvas-soft/60 hover:bg-canvas-soft border-hairline text-muted hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-semibold text-ink">
                      {slot.time}
                    </span>
                    <span className="block text-[10px] text-muted font-normal">
                      IST ({slot.period})
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-ink border-ink text-white'
                        : 'border-hairline'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium px-1 animate-shake">
            {error}
          </p>
        )}

        {/* Call Summary Banner */}
        <div className="p-3.5 rounded-2xl bg-canvas-soft border border-hairline flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-ink block">
                {currentDayObj?.weekday}, {currentDayObj?.date} at {selectedSlot}
              </span>
              <span className="text-[11px] text-muted">Google Meet / Phone Call with Creative Lead</span>
            </div>
          </div>
          <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Free
          </span>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink hover:bg-ink-soft disabled:opacity-50 text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group"
        >
          <span>Confirm Booking & Reserve Studio Slot</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <p className="text-[11px] text-muted/70 text-center font-normal">
          Instant WhatsApp & calendar invite will be dispatched upon confirmation.
        </p>
      </form>
    </div>
  );
}

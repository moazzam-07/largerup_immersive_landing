import React, { useState } from 'react';
import { ArrowRight, Clock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepCalendar({
  name,
  onConfirmBooking,
  isSubmitting,
}) {
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
      });
    }
    return days;
  };

  const availableDays = getNextThreeDays();
  const [selectedDay, setSelectedDay] = useState(availableDays[0].id);
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM');
  const [error, setError] = useState('');

  const timeSlots = [
    '11:30 AM',
    '02:00 PM',
    '04:30 PM',
    '06:30 PM',
    '08:00 PM',
  ];

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) {
      setError('Please select a date and time slot.');
      return;
    }

    const chosenDayObj = availableDays.find((d) => d.id === selectedDay);
    const bookingDetails = {
      date: `${chosenDayObj.weekday}, ${chosenDayObj.date}`,
      time: selectedSlot,
      formatted: `${chosenDayObj.weekday}, ${chosenDayObj.date} at ${selectedSlot}`,
    };

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#000000', '#525252', '#a3a3a3'],
    });

    onConfirmBooking(bookingDetails);
  };

  const currentDayObj = availableDays.find((d) => d.id === selectedDay);

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
        Schedule a 15-min call.
      </h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        Pick a time over the next 3 days to go over your studio projects and review your site layout.
      </p>

      <form onSubmit={handleConfirm} className="space-y-6">
        {/* Date Tabs */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2.5">
            Select Day
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {availableDays.map((d) => {
              const isSelected = selectedDay === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDay(d.id)}
                  className={`py-3 px-2 rounded-2xl border text-center transition-all duration-150 active:scale-95 flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}
                >
                  <span
                    className={`text-[11px] font-medium uppercase tracking-wider ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {d.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold mt-0.5">
                    {d.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Chips */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2.5">
            Select Time Slot (IST)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border text-center transition-all duration-150 active:scale-95 text-sm font-semibold ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium px-1">
            {error}
          </p>
        )}

        {/* Selected Slot Summary Bar */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-neutral-900 block text-sm">
                {currentDayObj?.weekday}, {currentDayObj?.date} at {selectedSlot}
              </span>
              <span className="text-neutral-500 text-xs">15-Minute Strategy & Project Walkthrough</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neutral-900 hover:bg-black disabled:opacity-50 text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm pt-4"
        >
          <span>Confirm Call Time</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import StepProgressBar from './components/StepProgressBar';
import StepName from './components/StepName';
import StepStudioType from './components/StepStudioType';
import StepCityGoal from './components/StepCityGoal';
import StepContact from './components/StepContact';
import StepWhyFree from './components/StepWhyFree';
import StepReviews from './components/StepReviews';
import StepSelectDate from './components/StepSelectDate';
import StepSelectSlot from './components/StepSelectSlot';
import StepSuccess from './components/StepSuccess';
import { createTwentyLead, updateTwentyLeadToMeetingBooked } from './lib/twentyCrm';
import { fetchAvailableSlots, createCalBooking } from './lib/calApi';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);
  const twentyOppIdRef = useRef(null);

  // Available slots for the 2-slide booking flow
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    studioName: '',
    city: '',
    phone: '',
    rawPhone: '',
    email: '',
    bookingSlot: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  // Pre-fetch available booking slots on mount
  useEffect(() => {
    fetchAvailableSlots().then((days) => {
      setAvailableDays(days);
      if (days && days.length > 0) {
        setSelectedDate(days[0]);
      }
    });
  }, []);

  // Smooth Apple / Uber style step transition
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
        }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Lead Lifecycle Dispatcher (Non-blocking background execution)
  const dispatchLeadCapture = (updatedData = {}) => {
    const merged = { ...formData, ...updatedData };
    const currentStage = updatedData.stage || 'NEW LEAD';

    const payload = {
      fullName: merged.name || 'Interior Professional',
      email: merged.email || '',
      phone: merged.phone || '',
      role: merged.role || 'Interior Studio',
      studioName: merged.studioName || '',
      city: merged.city || '',
      stage: currentStage,
      status: currentStage,
      bookingSlot: merged.bookingSlot || (currentStage === 'MEETING BOOKED' ? 'Booked via Cal.com' : 'Pending'),
      notes: `Studio: ${merged.studioName || 'N/A'} | City: ${merged.city || 'N/A'} | Stage: ${currentStage} | Slot: ${merged.bookingSlot || 'Pending'}`,
      submittedAt: new Date().toISOString(),
      source: 'LargerUp Customer Onboarding Flow',
    };

    // 1. Dispatch to Webhook / Evolution WhatsApp in background
    fetch(
      'https://moazzammasood5--largerup-lead-webhook-submit-lead.us-east.modal.run',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ).catch((err) => {
      console.warn('Background webhook dispatch note:', err);
    });

    // 2. Dispatch to Twenty CRM
    if (currentStage === 'NEW LEAD') {
      createTwentyLead(merged)
        .then((res) => {
          if (res?.opportunityId) {
            twentyOppIdRef.current = res.opportunityId;
          }
        })
        .catch((err) => {
          console.warn('Twenty CRM lead creation note:', err);
        });
    } else if (currentStage === 'MEETING BOOKED') {
      if (twentyOppIdRef.current) {
        updateTwentyLeadToMeetingBooked(twentyOppIdRef.current, {
          bookingSlot: merged.bookingSlot,
          startTime: updatedData.startTime,
          meetingUrl: updatedData.meetingUrl,
        }).catch((err) => {
          console.warn('Twenty CRM booking update note:', err);
        });
      }
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Custom booking completion handler
  const handleSlotBooking = async (slot) => {
    setIsSubmitting(true);

    try {
      // 1. Create booking in Cal.com via direct API
      const bookingRes = await createCalBooking({
        start: slot.time,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        studioName: formData.studioName,
        city: formData.city,
      });

      const formattedTime = `${selectedDate?.dayLabel || ''} at ${slot.formatted}`;

      const details = {
        date: selectedDate?.dayLabel || 'Scheduled Date',
        time: slot.formatted,
        formatted: formattedTime,
        meetingUrl: bookingRes?.meetingUrl || 'https://meet.google.com/demgrow-meet',
        startTime: slot.time,
      };

      setBookingDetails(details);
      setFormData((prev) => ({ ...prev, bookingSlot: formattedTime }));

      // 2. Confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#000000', '#525252', '#a3a3a3'],
      });

      // 3. Update Twenty CRM Opportunity:
      // - leadStatus: "MEETING_BOOKED" (Lead life)
      // - stage: "MEETING_BOOKED" (Lead Pipeline)
      // - meetingBookedAt: slot.time
      // - Note attached with Google Meet link
      dispatchLeadCapture({
        stage: 'MEETING BOOKED',
        bookingSlot: formattedTime,
        startTime: slot.time,
        meetingUrl: details.meetingUrl,
      });

      // Advance to celebration slide
      setCurrentStep(9);
    } catch (err) {
      console.warn('Booking flow note:', err);
      setCurrentStep(9);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Top Apple / Uber Navigation */}
      {currentStep < 9 && (
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={8}
          onBack={handleBack}
          canGoBack={currentStep > 1}
        />
      )}

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center py-4 w-full">
        <div ref={containerRef} className="w-full">
          {/* Step 1: Name */}
          {currentStep === 1 && (
            <StepName
              value={formData.name}
              onNext={(name) => {
                setFormData((prev) => ({ ...prev, name }));
                handleNext();
              }}
            />
          )}

          {/* Step 2: Practice Type */}
          {currentStep === 2 && (
            <StepStudioType
              name={formData.name}
              value={formData.role}
              onNext={(role) => {
                setFormData((prev) => ({ ...prev, role }));
                handleNext();
              }}
            />
          )}

          {/* Step 3: Studio Name & City */}
          {currentStep === 3 && (
            <StepCityGoal
              name={formData.name}
              cityValue={formData.city}
              studioNameValue={formData.studioName}
              onNext={({ studioName, city }) => {
                setFormData((prev) => ({ ...prev, studioName, city }));
                handleNext();
              }}
            />
          )}

          {/* Step 4: Contact (Phone + Mandatory Email) */}
          {currentStep === 4 && (
            <StepContact
              formData={formData}
              onSaveLead={(contactData) => {
                setFormData((prev) => ({ ...prev, ...contactData }));
                dispatchLeadCapture({ ...contactData, stage: 'NEW LEAD' });
              }}
              onNext={(contactData) => {
                setFormData((prev) => ({ ...prev, ...contactData }));
                handleNext();
              }}
            />
          )}

          {/* Step 5: Why Complimentary (Ultra-crisp & concise, no videos) */}
          {currentStep === 5 && (
            <StepWhyFree
              onNext={handleNext}
            />
          )}

          {/* Step 6: Dedicated Client Reviews Video Slide (Before Calendar) */}
          {currentStep === 6 && (
            <StepReviews
              onNext={handleNext}
            />
          )}

          {/* Step 7: Custom Slide 1 - Select Date (3 clean pills, ~140px tall, zero scroll) */}
          {currentStep === 7 && (
            <StepSelectDate
              availableDays={availableDays}
              selectedDate={selectedDate}
              onSelectDate={(day) => {
                setSelectedDate(day);
                handleNext();
              }}
            />
          )}

          {/* Step 8: Custom Slide 2 - Select Slot (2-column buttons, ~220px tall, zero scroll) */}
          {currentStep === 8 && (
            <StepSelectSlot
              selectedDate={selectedDate}
              onBackToDate={() => setCurrentStep(7)}
              onConfirmBooking={handleSlotBooking}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Step 9: Booking Confirmed + Full Video Testimonials Showcase */}
          {currentStep === 9 && (
            <StepSuccess
              formData={formData}
              bookingDetails={bookingDetails}
            />
          )}
        </div>
      </main>

      {/* Subtle bottom footer */}
      <footer className="w-full py-4 px-6 text-center border-t border-neutral-100">
        <div className="max-w-lg mx-auto flex items-center justify-between text-xs text-neutral-400">
          <span>© {new Date().getFullYear()} LargerUp</span>
          <a
            href="https://interiors.largerup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700 transition-colors"
          >
            interiors.largerup.com
          </a>
        </div>
      </footer>
    </div>
  );
}

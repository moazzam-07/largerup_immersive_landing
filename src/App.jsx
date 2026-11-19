import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import StepProgressBar from './components/StepProgressBar';
import StepName from './components/StepName';
import StepStudioType from './components/StepStudioType';
import StepCityGoal from './components/StepCityGoal';
import StepContact from './components/StepContact';
import StepWhyFree from './components/StepWhyFree';
import StepCalendar from './components/StepCalendar';
import StepSuccess from './components/StepSuccess';
import { createTwentyLead, updateTwentyLeadToMeetingBooked } from './lib/twentyCrm';

export default function App() {
  // Direct landing on Step 1: Name
  const [currentStep, setCurrentStep] = useState(1);
  const containerRef = useRef(null);
  const twentyOppIdRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Top Apple / Uber Navigation */}
      {currentStep < 7 && (
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={6}
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
                // Dispatches as "NEW LEAD" to Twenty CRM & Webhook immediately in background
                dispatchLeadCapture({ ...contactData, stage: 'NEW LEAD' });
              }}
              onNext={(contactData) => {
                setFormData((prev) => ({ ...prev, ...contactData }));
                handleNext();
              }}
            />
          )}

          {/* Step 5: Why Complimentary & SEO/Maintenance Value */}
          {currentStep === 5 && (
            <StepWhyFree
              name={formData.name}
              onNext={handleNext}
            />
          )}

          {/* Step 6: Preloaded Cal.com Container:
              Mounted immediately in background so iframe scripts are ready with 0s lag */}
          <div style={{ display: currentStep === 6 ? 'block' : 'none' }}>
            <StepCalendar
              name={formData.name}
              formData={formData}
              onConfirmBooking={(booking) => {
                setBookingDetails(booking);
                setFormData((prev) => ({ ...prev, bookingSlot: booking.formatted }));
                // Dispatches updated stage: "MEETING BOOKED" to Twenty CRM & Webhook in background
                dispatchLeadCapture({
                  stage: 'MEETING BOOKED',
                  bookingSlot: booking.formatted,
                  startTime: booking.raw?.startTime,
                });
                setCurrentStep(7);
              }}
            />
          </div>

          {/* Step 7: Booking Confirmed + Testimonials & Social Proof */}
          {currentStep === 7 && (
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

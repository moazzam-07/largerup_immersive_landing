import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import StepProgressBar from './components/StepProgressBar';
import StepWelcome from './components/StepWelcome';
import StepName from './components/StepName';
import StepStudioType from './components/StepStudioType';
import StepCityGoal from './components/StepCityGoal';
import StepContact from './components/StepContact';
import StepTestimonials from './components/StepTestimonials';
import StepCalendar from './components/StepCalendar';
import StepSuccess from './components/StepSuccess';

const STEP_TITLES = [
  'Identity',
  'Practice',
  'Market',
  'Reach',
  'Outcomes',
  'Schedule',
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    studioName: '',
    city: '',
    goal: '',
    phone: '',
    rawPhone: '',
    email: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  // Emil Kowalski & GSAP Smooth Step Transition
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 14,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
        }
      );
    }
    // Scroll to top smoothly on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Lead capture webhook to modal endpoint
  const sendLeadWebhook = async (updatedData = {}) => {
    const merged = { ...formData, ...updatedData };
    const payload = {
      fullName: merged.name || 'Interior Professional',
      email: merged.email || '',
      phone: merged.phone || '',
      role: merged.role || 'Interior Studio',
      notes: `Studio: ${merged.studioName || 'N/A'} | City: ${merged.city || 'N/A'} | Goal: ${merged.goal || 'N/A'} | Slot: ${merged.bookingSlot || 'Pending'}`,
      submittedAt: new Date().toISOString(),
      source: 'LargerUp Immersive Onboarding (iOS Flow)',
    };

    try {
      await fetch(
        'https://moazzammasood5--largerup-lead-webhook-submit-lead.us-east.modal.run',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      console.warn('Lead capture webhook notification handled:', err);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between selection:bg-ink selection:text-white">
      {/* iOS App Navigation Header */}
      <StepProgressBar
        currentStep={currentStep}
        totalSteps={6}
        stepTitles={STEP_TITLES}
        onBack={handleBack}
        canGoBack={currentStep > 0 && currentStep < 7}
      />

      {/* Main Fluid Container */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-8 w-full">
        <div ref={containerRef} className="w-full">
          {currentStep === 0 && (
            <StepWelcome onNext={handleNext} />
          )}

          {currentStep === 1 && (
            <StepName
              value={formData.name}
              onNext={(name) => {
                setFormData((prev) => ({ ...prev, name }));
                handleNext();
              }}
            />
          )}

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

          {currentStep === 3 && (
            <StepCityGoal
              name={formData.name}
              cityValue={formData.city}
              goalValue={formData.goal}
              studioNameValue={formData.studioName}
              onNext={({ studioName, city, goal }) => {
                setFormData((prev) => ({ ...prev, studioName, city, goal }));
                handleNext();
              }}
            />
          )}

          {currentStep === 4 && (
            <StepContact
              formData={formData}
              onSaveLead={async (contactData) => {
                setFormData((prev) => ({ ...prev, ...contactData }));
                await sendLeadWebhook(contactData);
              }}
              onNext={(contactData) => {
                setFormData((prev) => ({ ...prev, ...contactData }));
                handleNext();
              }}
            />
          )}

          {currentStep === 5 && (
            <StepTestimonials onNext={handleNext} />
          )}

          {currentStep === 6 && (
            <StepCalendar
              name={formData.name}
              isSubmitting={isSubmitting}
              onConfirmBooking={async (booking) => {
                setIsSubmitting(true);
                setBookingDetails(booking);
                setFormData((prev) => ({ ...prev, bookingSlot: booking.formatted }));
                await sendLeadWebhook({ bookingSlot: booking.formatted });
                setIsSubmitting(false);
                setCurrentStep(7);
              }}
            />
          )}

          {currentStep === 7 && (
            <StepSuccess
              formData={formData}
              bookingDetails={bookingDetails}
            />
          )}
        </div>
      </main>

      {/* Bottom Minimalist Footer */}
      <footer className="w-full py-4 px-4 border-t border-hairline/60 text-center">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted">
          <span>
            © {new Date().getFullYear()} LargerUp Inc. Handcrafted for Interior Designers.
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Direct Studio Grants Active
            </span>
            <a
              href="https://interiors.largerup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              interiors.largerup.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

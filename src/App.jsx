import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import StepProgressBar from './components/StepProgressBar';
import StepName from './components/StepName';
import StepStudioType from './components/StepStudioType';
import StepCityGoal from './components/StepCityGoal';
import StepContact from './components/StepContact';
import StepCalendar from './components/StepCalendar';
import StepSuccess from './components/StepSuccess';

export default function App() {
  // Land directly on Step 1 (Asking for Name)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    studioName: '',
    city: '',
    phone: '',
    rawPhone: '',
    email: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  // Smooth Apple/Uber style step transition
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Lead capture webhook
  const sendLeadWebhook = async (updatedData = {}) => {
    const merged = { ...formData, ...updatedData };
    const payload = {
      fullName: merged.name || 'Interior Professional',
      email: merged.email || '',
      phone: merged.phone || '',
      role: merged.role || 'Interior Studio',
      notes: `Studio: ${merged.studioName || 'N/A'} | City: ${merged.city || 'N/A'} | Slot: ${merged.bookingSlot || 'Pending'}`,
      submittedAt: new Date().toISOString(),
      source: 'LargerUp Customer Onboarding Flow',
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
      console.warn('Lead capture webhook notification:', err);
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
      {/* Sleek Apple / Uber top navigation */}
      {currentStep < 6 && (
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={5}
          onBack={handleBack}
          canGoBack={currentStep > 1}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-4 w-full">
        <div ref={containerRef} className="w-full">
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
              studioNameValue={formData.studioName}
              onNext={({ studioName, city }) => {
                setFormData((prev) => ({ ...prev, studioName, city }));
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
            <StepCalendar
              name={formData.name}
              isSubmitting={isSubmitting}
              onConfirmBooking={async (booking) => {
                setIsSubmitting(true);
                setBookingDetails(booking);
                setFormData((prev) => ({ ...prev, bookingSlot: booking.formatted }));
                await sendLeadWebhook({ bookingSlot: booking.formatted });
                setIsSubmitting(false);
                setCurrentStep(6);
              }}
            />
          )}

          {currentStep === 6 && (
            <StepSuccess
              formData={formData}
              bookingDetails={bookingDetails}
            />
          )}
        </div>
      </main>

      {/* Subtle, calm bottom footer */}
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

import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

export default function StepContact({
  formData,
  onNext,
  onSaveLead,
}) {
  const [phone, setPhone] = useState(
    formData.rawPhone || formData.phone?.replace(/[^0-9]/g, '').slice(-10) || ''
  );
  const [email, setEmail] = useState(formData.email || '');
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(cleaned);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!phone || phone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid business email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const contactData = {
      phone: `+91 ${phone}`,
      rawPhone: phone,
      email: email.trim(),
    };

    // Non-blocking background dispatch:
    // Dispatches lead as "NEW LEAD" in background without blocking UI
    if (onSaveLead) {
      try {
        onSaveLead(contactData);
      } catch (err) {
        console.warn('Background lead capture dispatch:', err);
      }
    }

    // Advance immediately
    onNext(contactData);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-6 sm:py-12 flex flex-col text-left animate-blur-in">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
        What's your phone number?
      </h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        We'll send your completed website preview and project files directly to your mobile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Phone Input */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center gap-1.5 text-neutral-900 font-semibold text-base border-r border-neutral-200 pr-3 py-1 pointer-events-none">
              <span>🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="98765 43210"
              autoComplete="tel-national"
              className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl pl-24 pr-5 py-4 text-lg font-semibold tracking-wide text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 font-medium mt-1.5 px-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email Input (Compulsory) */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="e.g. contact@yourstudio.com"
            autoComplete="email"
            className="w-full bg-white border border-neutral-300 focus:border-neutral-900 rounded-2xl px-5 py-4 text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all duration-150"
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium mt-1.5 px-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
          <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span>Your contact information is kept strictly private. Zero spam.</span>
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm pt-4"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}

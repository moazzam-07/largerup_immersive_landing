import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, ShieldCheck, Lock, Sparkles, Loader2 } from 'lucide-react';

export default function StepContact({
  formData,
  onNext,
  onSaveLead,
}) {
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    // Keep numbers only for clean Indian mobile digits
    const cleaned = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(cleaned);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const contactData = {
      phone: `+91 ${phone}`,
      rawPhone: phone,
      email: email.trim() || `${phone}@interior-lead.largerup.com`,
    };

    // Trigger lead capture webhook immediately in background
    try {
      if (onSaveLead) {
        await onSaveLead(contactData);
      }
    } catch (err) {
      console.warn('Webhook capture handled:', err);
    } finally {
      setIsSubmitting(false);
      onNext(contactData);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center animate-blur-in">
      {/* Icon Badge */}
      <div className="w-12 h-12 rounded-full bg-canvas-soft border border-hairline flex items-center justify-center text-ink mb-5 shadow-ios-pill">
        <Phone className="w-5 h-5 text-ink" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2.5">
        Where should we send your custom preview?
      </h2>

      {/* Subtext */}
      <p className="text-sm text-muted font-normal leading-relaxed max-w-sm mb-6">
        Our senior creative team will assemble your prototype and send a direct private link via WhatsApp.
      </p>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 text-left">
        {/* WhatsApp Phone */}
        <div>
          <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
            WhatsApp Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 text-ink font-semibold text-sm border-r border-hairline pr-2.5 py-1 pointer-events-none">
              <span className="text-base">🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="98765 43210"
              className="w-full bg-canvas-soft border border-hairline hover:border-hairline-strong focus:border-ink rounded-2xl pl-24 pr-4 py-4 text-base font-semibold tracking-wide text-ink placeholder:text-muted/40 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all duration-200"
            />
          </div>
          <span className="text-[11px] text-muted block mt-1 px-1">
            We will only contact you regarding your studio website preview.
          </span>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
            Studio Email <span className="text-muted font-normal normal-case">(optional)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. contact@yourstudio.com"
              className="w-full bg-canvas-soft border border-hairline hover:border-hairline-strong focus:border-ink rounded-2xl pl-11 pr-4 py-3.5 text-base font-medium text-ink placeholder:text-muted/40 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all duration-200"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium px-1 animate-shake">
            {error}
          </p>
        )}

        {/* Privacy Note */}
        <div className="p-3 rounded-xl bg-canvas-soft border border-hairline flex items-center gap-2.5 text-[11px] text-muted">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Strictly confidential. No spam, no marketing calls, ever.</span>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink hover:bg-ink-soft disabled:opacity-50 text-white font-semibold text-base py-4 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-ios-pill flex items-center justify-center gap-2 group mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Application...</span>
            </>
          ) : (
            <>
              <span>Continue to Studio Proof & Reviews</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

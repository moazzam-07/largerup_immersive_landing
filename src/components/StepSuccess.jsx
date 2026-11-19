import React from 'react';
import { CheckCircle2, MessageCircle, ExternalLink, Calendar, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function StepSuccess({
  formData,
  bookingDetails,
}) {
  const whatsappNumber = '919876543210'; // Team WhatsApp or dynamic link
  const clientFirstName = formData.name ? formData.name.split(' ')[0] : 'Designer';

  const whatsappMessage = encodeURIComponent(
    `Hi LargerUp team, I just applied for the free studio website initiative for ${formData.studioName || formData.name}. My consultation is scheduled for ${bookingDetails?.formatted || 'the upcoming slot'}. Looking forward!`
  );

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center animate-blur-in">
      {/* Big Animated Success Check */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-5 shadow-ios-pill animate-bounce-subtle">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2">
        You're Confirmed, {clientFirstName}!
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-muted font-normal leading-relaxed max-w-md mb-6">
        Your complimentary studio website reservation has been accepted. We have saved your project brief and locked in your consultation.
      </p>

      {/* Summary Card - Mobbin White Luxury */}
      <div className="w-full rounded-2xl bg-canvas-soft border border-hairline p-5 mb-6 text-left shadow-ios-card space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Reservation Overview
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Complimentary Build Slot #04
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted block text-[11px] mb-0.5">Studio / Founder</span>
            <span className="font-bold text-ink text-sm block truncate">
              {formData.studioName || formData.name}
            </span>
            <span className="text-muted text-[11px]">{formData.city}</span>
          </div>

          <div>
            <span className="text-muted block text-[11px] mb-0.5">Practice Type</span>
            <span className="font-bold text-ink text-sm block truncate">
              {formData.role || 'Interior Studio'}
            </span>
            <span className="text-emerald-600 text-[11px] font-medium">Free Design Grant</span>
          </div>
        </div>

        {bookingDetails && (
          <div className="p-3 rounded-xl bg-canvas border border-hairline flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-ink block">
                {bookingDetails.formatted}
              </span>
              <span className="text-[11px] text-muted">
                1-on-1 Strategy & Design Architecture Handover
              </span>
            </div>
          </div>
        )}

        <div className="pt-1 text-[11px] text-muted leading-relaxed flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>WhatsApp confirmation sent to {formData.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        {/* Direct WhatsApp Chat */}
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-pill transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Connect with Creative Lead on WhatsApp</span>
        </a>

        {/* Explore Live Portal */}
        <a
          href="https://interiors.largerup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-canvas-soft hover:bg-canvas-field text-ink font-semibold text-sm py-3.5 px-6 rounded-pill border border-hairline transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Explore interiors.largerup.com</span>
          <ExternalLink className="w-4 h-4 text-muted" />
        </a>
      </div>

      {/* What to Prepare Card */}
      <div className="mt-8 text-left p-4 rounded-2xl bg-canvas-soft/60 border border-hairline w-full">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ink" />
          What Happens Next
        </h4>
        <ul className="text-xs text-muted space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-canvas-field border border-hairline text-ink font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span>Our design team configures your bespoke layout based on your answers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-canvas-field border border-hairline text-ink font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span>Have 4–8 project photos ready for your consultation call.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-canvas-field border border-hairline text-ink font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span>Your live website will be ready to deploy in 7 business days.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

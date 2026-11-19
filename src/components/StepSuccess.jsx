import React from 'react';
import { CheckCircle2, MessageCircle, ExternalLink, Calendar } from 'lucide-react';

export default function StepSuccess({
  formData,
  bookingDetails,
}) {
  const clientFirstName = formData.name ? formData.name.split(' ')[0] : 'there';

  const whatsappMessage = encodeURIComponent(
    `Hi LargerUp team, I just completed onboarding for ${formData.studioName || formData.name}. Our call is booked for ${bookingDetails?.formatted || 'our scheduled slot'}.`
  );

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-8 sm:py-14 flex flex-col text-left animate-blur-in">
      {/* Success Check */}
      <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-6 shadow-sm">
        <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
        You're all set, {clientFirstName}.
      </h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        We've confirmed your consultation and reserved your studio website build slot.
      </p>

      {/* Overview Card */}
      <div className="w-full rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 mb-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Consultation Details
          </span>
          <span className="text-xs font-medium text-neutral-900 bg-white px-2.5 py-1 rounded-full border border-neutral-200">
            Confirmed via Cal.com
          </span>
        </div>

        {bookingDetails && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-neutral-900 text-sm block">
                {bookingDetails.formatted}
              </span>
              <span className="text-xs text-neutral-500">15-minute 1-on-1 design walkthrough</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-neutral-200">
          <div>
            <span className="text-neutral-500 block text-[11px] mb-0.5">Studio / Practice</span>
            <span className="font-semibold text-neutral-900 truncate block">
              {formData.studioName || formData.name}
            </span>
            <span className="text-neutral-500">{formData.city}</span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[11px] mb-0.5">Phone</span>
            <span className="font-semibold text-neutral-900 truncate block">
              {formData.phone}
            </span>
            <span className="text-neutral-500">{formData.role || 'Studio'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-base py-3.5 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Message on WhatsApp</span>
        </a>

        <a
          href="https://interiors.largerup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-sm py-3.5 px-6 rounded-full border border-neutral-200 transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Explore interiors.largerup.com</span>
          <ExternalLink className="w-4 h-4 text-neutral-400" />
        </a>
      </div>
    </div>
  );
}

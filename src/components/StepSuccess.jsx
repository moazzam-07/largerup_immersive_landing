import React from 'react';
import {
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Calendar,
  Star,
  Sparkles,
} from 'lucide-react';

export default function StepSuccess({ formData, bookingDetails }) {
  const clientFirstName = formData.name ? formData.name.split(' ')[0] : 'there';

  const whatsappMessage = encodeURIComponent(
    `Hi LargerUp team, I'm ${formData.name} from ${formData.studioName || formData.name}. Our call is confirmed for ${bookingDetails?.formatted || 'our scheduled call'}.`
  );

  const testimonials = [
    {
      name: 'Devyani Sen',
      role: 'Interior Designer',
      studio: 'Atelier Devyani',
      city: 'Kolkata',
      quote:
        'LargerUp built our website in just 5 days. Local homeowners now find us on Google and message us directly on WhatsApp for new interior projects.',
      tag: 'Residential Interiors',
    },
    {
      name: 'Arjun Verma',
      role: 'Architect',
      studio: 'Studio Atmos',
      city: 'Bangalore',
      quote:
        'Our clients love how clean our portfolio looks on their phones. We got two high-value villa projects right after launching.',
      tag: 'Turnkey & Design',
    },
    {
      name: 'Meera Singhal',
      role: 'Founder',
      studio: 'The Line Studio',
      city: 'Mumbai',
      quote:
        'Super simple and honest team. They handled our Google search, photos, and WhatsApp setup without any technical headache.',
      tag: 'Bespoke Homes',
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-5 py-5 sm:py-8 flex flex-col text-left animate-blur-in">
      {/* Success Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 mb-3 self-start">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Call Confirmed</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
        You're all set, {clientFirstName}!
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 mb-4">
        We've booked your call and started preparing {formData.studioName || 'your'} website design.
      </p>

      {/* Booking Summary Capsule */}
      <div className="w-full rounded-2xl bg-neutral-50 border border-neutral-200/90 p-4 mb-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Call Time
          </span>
          <span className="text-[11px] font-medium text-neutral-900 bg-white px-2 py-0.5 rounded-full border border-neutral-200">
            Google Meet
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
              <span className="text-xs text-neutral-500">15-minute quick walkthrough of your site</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-neutral-200/80">
          <div>
            <span className="text-neutral-500 block text-[11px]">Studio</span>
            <span className="font-semibold text-neutral-900 truncate block">
              {formData.studioName || formData.name}
            </span>
            <span className="text-neutral-500">{formData.city}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Contact</span>
            <span className="font-semibold text-neutral-900 truncate block">
              {formData.phone}
            </span>
            <span className="text-neutral-500 truncate block">{formData.email}</span>
          </div>
        </div>
      </div>

      {/* Testimonials Header */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 mb-0.5">
          <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
          <span>What other interior designers say</span>
        </div>
        <p className="text-xs text-neutral-500">
          Real feedback from designers we've worked with.
        </p>
      </div>

      {/* Testimonials Cards */}
      <div className="space-y-3 mb-5">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                {item.tag}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-2.5">
              "{item.quote}"
            </p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
              <div>
                <span className="font-semibold text-neutral-900 block text-xs">
                  {item.name}
                </span>
                <span className="text-neutral-500 text-[11px]">
                  {item.role}, {item.studio}
                </span>
              </div>
              <span className="text-neutral-400 text-[11px]">{item.city}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center mb-5">
        <div>
          <span className="block text-sm sm:text-base font-bold text-neutral-900">5–7 Days</span>
          <span className="text-[10px] text-neutral-500">Fast Delivery</span>
        </div>
        <div>
          <span className="block text-sm sm:text-base font-bold text-neutral-900">100% Free</span>
          <span className="text-[10px] text-neutral-500">Design & Build</span>
        </div>
        <div>
          <span className="block text-sm sm:text-base font-bold text-neutral-900">WhatsApp</span>
          <span className="text-[10px] text-neutral-500">Direct Inquiries</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm py-3 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Message on WhatsApp</span>
        </a>

        <a
          href="https://interiors.largerup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-xs sm:text-sm py-3 px-6 rounded-full border border-neutral-200 transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>See Example Websites</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
        </a>
      </div>
    </div>
  );
}

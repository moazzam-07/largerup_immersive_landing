import React, { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import confetti from 'canvas-confetti';
import { ExternalLink } from 'lucide-react';

export default function StepCalendar({
  name,
  formData,
  onConfirmBooking,
}) {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#171717' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });

        cal('on', {
          action: 'bookingSuccessful',
          callback: (e) => {
            const bookingData = e.detail?.data;
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#000000', '#525252', '#a3a3a3'],
            });

            const formattedTime = bookingData?.startTime
              ? new Date(bookingData.startTime).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : 'Confirmed 15-Minute Call';

            onConfirmBooking({
              date: formattedTime,
              time: '15-min call',
              formatted: formattedTime,
              raw: bookingData,
            });
          },
        });
      } catch (err) {
        console.warn('Cal embed setup:', err);
      }
    })();
  }, [onConfirmBooking]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8 flex flex-col text-left animate-blur-in">
      <div className="px-2 mb-4">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-1.5">
          Schedule your 15-min call.
        </h1>
        <p className="text-sm text-neutral-500">
          Select an available slot on our calendar to review your studio project blueprint.
        </p>
      </div>

      {/* Cal.com Official Embed Container */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm min-h-[580px] mb-4">
        <Cal
          calLink="demgrow-kf1eni/15min"
          style={{ width: '100%', height: '100%', minHeight: '580px', overflow: 'auto' }}
          config={{
            name: formData?.name || name,
            email: formData?.email || '',
            notes: `Studio: ${formData?.studioName || 'N/A'} | City: ${formData?.city || 'N/A'} | Phone: ${formData?.phone || 'N/A'}`,
            theme: 'light',
          }}
        />
      </div>

      {/* Helpful direct link in case iframe cookies are blocked on certain mobile browsers */}
      <div className="px-2 flex items-center justify-between text-xs text-neutral-400">
        <span>Direct Cal.com Scheduling</span>
        <a
          href="https://cal.com/demgrow-kf1eni/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 hover:text-black flex items-center gap-1 underline underline-offset-2"
        >
          <span>Open calendar in new tab</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

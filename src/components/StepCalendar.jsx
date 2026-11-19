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
          hideEventTypeDetails: true, // Strips out title, description, and event meta
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
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col text-left animate-blur-in">
      <div className="px-1 mb-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
          Pick a 15-min call time.
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Select an available slot over the next 3 days to review your studio website.
        </p>
      </div>

      {/* Cal.com Official Embed Container - Compact and Clean */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm min-h-[540px] mb-3">
        <Cal
          calLink="demgrow-kf1eni/15min?hideEventTypeDetails=true&layout=month_view"
          style={{ width: '100%', height: '100%', minHeight: '540px', overflow: 'auto' }}
          config={{
            name: formData?.name || name || '',
            email: formData?.email || '',
            notes: `Studio: ${formData?.studioName || 'N/A'} | City: ${formData?.city || 'N/A'} | Phone: ${formData?.phone || 'N/A'}`,
            theme: 'light',
          }}
        />
      </div>

      {/* Direct Fallback link */}
      <div className="px-1 flex items-center justify-between text-xs text-neutral-400">
        <span>Direct Calendar Link</span>
        <a
          href="https://cal.com/demgrow-kf1eni/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 hover:text-black flex items-center gap-1 underline underline-offset-2"
        >
          <span>Open in new tab</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Calendar,
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import VideoTestimonials from './VideoTestimonials';
import VideoModal from './VideoModal';

export default function StepSuccess({ formData, bookingDetails }) {
  const clientFirstName = formData.name ? formData.name.split(' ')[0] : 'there';
  const [showOverlay, setShowOverlay] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalInitialTime, setModalInitialTime] = useState(0);
  const [modalMuted, setModalMuted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hi LargerUp team, I'm ${formData.name} from ${formData.studioName || formData.name}. Our call is confirmed for ${bookingDetails?.formatted || 'our scheduled call'}.`
  );

  // Auto-dismiss overlay after 3 seconds
  useEffect(() => {
    if (!showOverlay) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowOverlay(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showOverlay]);

  const handleOpenModal = (item, curTime = 0, isMuted = false) => {
    setModalVideo(item);
    setModalInitialTime(curTime);
    setModalMuted(isMuted);
  };

  const handleCloseModal = () => {
    setModalVideo(null);
    setModalInitialTime(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 sm:py-6 flex flex-col text-left animate-blur-in relative">
      {/* 3-Second Confirmation Overlay Modal */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md transition-all duration-300"
          onClick={() => setShowOverlay(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-neutral-100 flex flex-col items-center text-center animate-scale-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
              aria-label="Close confirmation"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-emerald-100/90 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              Call Confirmed
            </span>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-1">
              You're all set, {clientFirstName}!
            </h2>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
              We've booked your call and started preparing {formData.studioName || 'your'} website preview.
            </p>

            {/* Quick Meeting Capsule */}
            <div className="w-full bg-neutral-50 border border-neutral-200/90 rounded-2xl p-3 mb-4 text-left">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1 font-medium">
                <span className="uppercase tracking-wider">Scheduled Time</span>
                <span className="bg-white border border-neutral-200 text-neutral-800 px-2 py-0.5 rounded-full text-[10px]">
                  Google Meet
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-semibold text-neutral-900 truncate">
                  {bookingDetails?.formatted || '15-Minute Strategy Walkthrough'}
                </span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] mb-3"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Timer countdown bar */}
            <div className="w-full flex items-center justify-between text-[11px] text-neutral-400 mt-1">
              <span>Showing client reviews in {countdown}s...</span>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-neutral-700 hover:text-neutral-900 font-semibold underline inline-flex items-center gap-0.5"
              >
                <span>View Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="w-full h-1 bg-neutral-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Persistent Subtle Top Status Capsule (Allows reopening booking details anytime) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 bg-neutral-50/90 border border-neutral-200/90 rounded-2xl px-4 py-2.5 mb-5 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-neutral-900">Call Confirmed</span>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-600 truncate max-w-[200px] sm:max-w-none">
            {bookingDetails?.formatted || '15-min walkthrough'}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setCountdown(5);
              setShowOverlay(true);
            }}
            className="text-neutral-600 hover:text-neutral-900 font-medium underline text-xs"
          >
            Booking Details
          </button>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
          >
            <MessageCircle className="w-3 h-3 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Testimonials Slide Content — 100% Fully Visible At Last */}
      <div className="w-full text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[11px] font-semibold text-neutral-700 mb-2.5">
          <Sparkles className="w-3 h-3 text-neutral-800" />
          <span>Verified Interior Studios • Video Case Studies</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-2">
          How interior studios scale their client pipeline.
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
          Watch how studio founders switched from portal leads to an exclusive custom portfolio website engineered for high-ticket clients.
        </p>
      </div>

      {/* Full Video Testimonials Grid (Luxihome, The Alam Interior, Deco Perfect) */}
      <VideoTestimonials
        onOpenModal={handleOpenModal}
        className="w-full py-0 border-0"
        hideHeader={true}
        hideCta={true}
      />

      {/* Subtle Walkthrough Prep & WhatsApp Footer */}
      <div className="bg-neutral-50 border border-neutral-200/90 rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mt-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Your walkthrough is confirmed</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-neutral-900">
            Have recent site photos or floor plans?
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-0.5">
            Feel free to drop them directly to our design team on WhatsApp before the call.
          </p>
        </div>
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all shrink-0 active:scale-95 inline-flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Open WhatsApp Chat</span>
        </a>
      </div>

      {/* Fullscreen Video Modal Player */}
      <VideoModal
        isOpen={!!modalVideo}
        videoData={modalVideo}
        initialTime={modalInitialTime}
        initialMuted={modalMuted}
        onClose={handleCloseModal}
      />
    </div>
  );
}

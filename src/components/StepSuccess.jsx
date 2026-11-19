import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Calendar,
  Sparkles,
} from 'lucide-react';
import VideoTestimonials from './VideoTestimonials';
import VideoModal from './VideoModal';

export default function StepSuccess({ formData, bookingDetails }) {
  const clientFirstName = formData.name ? formData.name.split(' ')[0] : 'there';
  const [modalVideo, setModalVideo] = useState(null);
  const [modalInitialTime, setModalInitialTime] = useState(0);
  const [modalMuted, setModalMuted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hi LargerUp team, I'm ${formData.name} from ${formData.studioName || formData.name}. Our call is confirmed for ${bookingDetails?.formatted || 'our scheduled call'}.`
  );

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
    <div className="w-full max-w-2xl mx-auto px-4 py-5 sm:py-8 flex flex-col text-left animate-blur-in">
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
      <div className="w-full rounded-2xl bg-neutral-50 border border-neutral-200/90 p-4 mb-4 space-y-3">
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

      {/* Primary WhatsApp Action */}
      <div className="mb-8">
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm sm:text-base py-3.5 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Message on WhatsApp</span>
        </a>
      </div>

      {/* Real Video Testimonials Section from interiors.largerup.com */}
      <div className="w-full pt-4 border-t border-neutral-200">
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
            <span>Watch Real Video Reviews</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            Hear from interior studios we've built websites for
          </h2>
        </div>

        {/* Video Testimonials Component */}
        <VideoTestimonials onOpenModal={handleOpenModal} />
      </div>

      {/* Fullscreen Video Modal */}
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

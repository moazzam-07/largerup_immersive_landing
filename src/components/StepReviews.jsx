import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import VideoTestimonials from './VideoTestimonials';
import VideoModal from './VideoModal';
import { TypingAnimation } from './ui/typing-animation';
import FloatingNextButton from './FloatingNextButton';

export default function StepReviews({ onNext }) {
  const [modalVideo, setModalVideo] = useState(null);
  const [modalInitialTime, setModalInitialTime] = useState(0);
  const [modalMuted, setModalMuted] = useState(false);
  const bottomButtonRef = useRef(null);

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
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col text-left animate-blur-in relative">
      {/* Title & Subtitle */}
      <div className="w-full text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <TypingAnimation
          as="h1"
          duration={30}
          className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-2 block"
        >
          Our clients whom we helped by increasing their sales
        </TypingAnimation>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
          See how our sophisticated lead generation and management systems helped these interior studios get more inquiries and easily manage them.
        </p>
      </div>

      {/* 3 Video Testimonials Cards */}
      <VideoTestimonials
        onOpenModal={handleOpenModal}
        className="w-full py-0 border-0"
        hideHeader={true}
        hideCta={true}
      />

      {/* Floating Action Button (Visible when scrolled away from bottom button) */}
      <FloatingNextButton
        targetRef={bottomButtonRef}
        onClick={onNext}
        label="Pick a Date"
      />

      {/* Primary Inline Continue Action */}
      <div ref={bottomButtonRef} className="w-full max-w-md mx-auto mt-6 sm:mt-8">
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-base py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
        >
          <span>Pick a Consultation Date</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
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

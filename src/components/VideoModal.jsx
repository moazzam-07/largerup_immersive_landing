import React, { useEffect, useRef } from 'react';
import { X, Play, Volume2, VolumeX } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-ink rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all duration-150 active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-[9/16] max-h-[80vh] w-full bg-black">
          <video
            ref={videoRef}
            src={video.videoSrc}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Studio Info Footer */}
        <div className="p-4 bg-ink border-t border-white/10 text-left">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
            Verified Studio Case Study
          </span>
          <h4 className="text-white text-base font-bold mb-1">
            {video.studio}
          </h4>
          <p className="text-white/70 text-xs leading-relaxed">
            "{video.quote}"
          </p>
        </div>
      </div>
    </div>
  );
}

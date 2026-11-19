import React, { useState } from 'react';
import { ArrowRight, Check, HeartHandshake, Video, MessageCircle, Play } from 'lucide-react';
import { videoCaseStudies } from './VideoTestimonials';
import VideoModal from './VideoModal';

export default function StepWhyFree({ onNext, name }) {
  const [modalVideo, setModalVideo] = useState(null);

  return (
    <div className="w-full max-w-lg mx-auto px-5 py-3 sm:py-6 flex flex-col text-left animate-blur-in">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
          Why is this website free?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          A simple, honest deal between us and interior designers.
        </p>
      </div>

      {/* 3 Core Points in Single Unified Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-3.5 mb-4">
        {/* Point 1 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              1. We're looking for interior clients
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We are a new team focusing 100% on interior designers. Building your website for free is our way of showing our work and earning your trust.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-100" />

        {/* Point 2 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <Video className="w-4 h-4" />
          </div>
          <div className="w-full">
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              2. All we ask is an honest review
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-2.5">
              You get a custom website at zero cost. In return, all we ask is a short video review sharing your honest feedback once your site is live.
            </p>

            {/* Tap-to-play Video Testimonials Reel Preview */}
            <div className="w-full pt-1">
              <span className="text-[11px] font-semibold text-neutral-500 block mb-1.5">
                Watch real studio video reviews (Tap to play):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {videoCaseStudies.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setModalVideo(item)}
                    className="relative aspect-[9/14] rounded-xl overflow-hidden border border-neutral-200 group text-left shadow-sm active:scale-95 transition-all"
                  >
                    <img
                      src={item.poster}
                      alt={item.studio}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                      <span className="text-[10px] font-bold block truncate leading-tight">
                        {item.studio}
                      </span>
                      <span className="text-[9px] text-white/70 block">
                        {item.location}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100" />

        {/* Point 3 */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-800 mt-0.5">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
              3. Built to bring you real client inquiries
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We set up your Google search, make your site super fast on phones, and connect it directly to WhatsApp so local clients can easily call or message you.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Line */}
      <div className="flex items-center gap-2 text-xs text-neutral-600 mb-4 px-1">
        <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
        <span>You own 100% of your website, photos, and domain name.</span>
      </div>

      {/* Single Clear CTA Button */}
      <button
        onClick={onNext}
        className="w-full bg-neutral-900 hover:bg-black text-white font-medium text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-full transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group shadow-sm"
      >
        <span>Pick a Call Time</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!modalVideo}
        videoData={modalVideo}
        initialTime={0}
        initialMuted={false}
        onClose={() => setModalVideo(null)}
      />
    </div>
  );
}

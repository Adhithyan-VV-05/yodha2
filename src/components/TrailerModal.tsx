"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export function TrailerModal({ isOpen, onClose, videoUrl = "/trailer.webm" }: TrailerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Auto-play prevented:", err);
        });
      }
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden select-none">
      {/* DISCREET FLOATING TOP-RIGHT CLOSE BUTTON */}
      <button
        onClick={() => {
          if (videoRef.current) videoRef.current.pause();
          onClose();
        }}
        aria-label="Close Trailer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {/* FULLSCREEN VIDEO PLAYER: 100VW x 100VH ON PC (NO BORDERS), 100VW ACCORDING HEIGHT CENTERED ON MOBILE */}
      <video
        ref={videoRef}
        src={videoUrl || "/trailer.webm"}
        autoPlay
        playsInline
        preload="auto"
        onEnded={onClose}
        className="w-screen h-screen object-cover hidden sm:block"
      />

      <video
        ref={(el) => {
          if (el && isOpen) {
            el.onended = onClose;
            const p = el.play();
            if (p !== undefined) p.catch(() => {});
          }
        }}
        src={videoUrl || "/trailer.webm"}
        autoPlay
        playsInline
        preload="auto"
        onEnded={onClose}
        className="w-screen h-auto max-h-screen object-contain block sm:hidden mx-auto"
      />
    </div>
  );
}

export default TrailerModal;

"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export function TrailerModal({ isOpen, onClose, videoUrl = "/trailer.mp4" }: TrailerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setOpacity(1);
      const playVideo = (v: HTMLVideoElement | null) => {
        if (!v) return;
        v.currentTime = 0;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Auto-play prevented:", err);
          });
        }
      };
      playVideo(videoRef.current);
      playVideo(mobileVideoRef.current);
    }
  }, [isOpen, videoUrl]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && video.currentTime) {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 2 && remaining > 0) {
        // Linearly fade opacity from 1 down to 0 over the last 2 seconds
        const currentOpacity = Math.max(0, Math.min(1, remaining / 2));
        setOpacity(currentOpacity);
      } else if (remaining > 2) {
        setOpacity(1);
      }
    }
  };

  const handleVideoEnded = () => {
    setOpacity(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ opacity }}
      className="group fixed inset-0 z-[99999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden select-none transition-opacity duration-300 ease-out"
    >
      {/* FLOATING TOP-RIGHT CLOSE BUTTON - APPEARS ONLY WHEN HOVERED */}
      <button
        onClick={() => {
          if (videoRef.current) videoRef.current.pause();
          if (mobileVideoRef.current) mobileVideoRef.current.pause();
          onClose();
        }}
        aria-label="Close Trailer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-2xl active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {/* FULLSCREEN VIDEO PLAYER ON PC */}
      <video
        ref={videoRef}
        src={videoUrl || "/trailer.mp4"}
        autoPlay
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-screen h-screen object-cover hidden sm:block pointer-events-none"
      />

      {/* FULLWIDTH VIDEO PLAYER ON MOBILE */}
      <video
        ref={mobileVideoRef}
        src={videoUrl || "/trailer.mp4"}
        autoPlay
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-screen h-auto max-h-screen object-contain block sm:hidden mx-auto pointer-events-none"
      />
    </div>
  );
}

export default TrailerModal;

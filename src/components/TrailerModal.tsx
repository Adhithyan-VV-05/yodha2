"use client";
import { useEffect, useRef } from "react";
import { X, Film, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-hidden select-none animate-fade-in">
        {/* BACKGROUND AMBIENT GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[180px] pointer-events-none" />

        {/* FULLSCREEN RESPONSIVE VIDEO CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-gradient-to-b from-[#080d26] via-[#04081c] to-[#020512] border border-blue-500/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.5)] flex flex-col items-center justify-center max-h-[95vh]"
        >
          {/* HEADER BAR */}
          <div className="w-full px-4 py-3 sm:px-6 sm:py-4 border-b border-blue-500/30 flex items-center justify-between bg-slate-950/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center">
                <Film className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono font-extrabold text-blue-400 uppercase tracking-widest">
                  OFFICIAL HACKATHON TRAILER
                </span>
                <span className="text-xs sm:text-sm font-black font-heading text-white tracking-tight">
                  YODHA 2.0 — WARRIORS OF AI
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                onClose();
              }}
              aria-label="Close Trailer"
              className="p-2 rounded-full bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* VIDEO PLAYER AREA - FITS MOBILE SCREEN WIDTH PERFECTLY & CENTERED */}
          <div className="relative w-full bg-black flex items-center justify-center overflow-hidden min-h-[220px] max-h-[78vh] sm:max-h-[82vh] p-1">
            <video
              ref={videoRef}
              src={videoUrl || "/trailer.webm"}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full h-auto max-h-[76vh] sm:max-h-[80vh] object-contain mx-auto rounded-xl"
            />
          </div>

          {/* FOOTER BAR */}
          <div className="w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-950/90 border-t border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-xs font-mono text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold truncate">
              <Volume2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>JYOTHY ENGINEERING COLLEGE (AUTONOMOUS)</span>
            </div>
            <span className="text-blue-400 font-black tracking-wider uppercase">
              11 & 12 SEPTEMBER 2026
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default TrailerModal;

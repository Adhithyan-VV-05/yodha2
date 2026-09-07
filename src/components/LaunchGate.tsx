"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface LaunchGateProps {
  onLaunch: () => void;
}

export function LaunchGate({ onLaunch }: LaunchGateProps) {
  return (
    <motion.div
      key="launch-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(16px)", transition: { duration: 0.6, ease: "easeInOut" } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center text-white overflow-hidden select-none px-4"
    >
      {/* 1. BLURRED DAY HILLS BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/bg-hills-day-pc.webp"
          alt="Day Hills Background"
          className="w-full h-full object-cover object-center filter blur-md scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm pointer-events-none" />
      </div>

      {/* 2. ONLY THE CONTINUOUSLY PULSING LAUNCH YODHA 2.0 BUTTON */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center"
      >
        <button
          type="button"
          onClick={onLaunch}
          className="group relative inline-flex items-center justify-center gap-3.5 px-9 sm:px-12 py-4.5 sm:py-5.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white font-mono text-base sm:text-lg font-black tracking-widest uppercase cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.7)] hover:shadow-[0_0_75px_rgba(59,130,246,0.95)] transition-all duration-300 border-2 border-blue-300/50"
        >
          {/* PULSING GLOW SHADOW BACKDROP */}
          <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-50 group-hover:opacity-90 blur-lg transition-opacity duration-300 pointer-events-none animate-pulse" />

          {/* CIRCULAR PLAY ICON */}
          <span className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
          </span>

          <span className="relative z-10 font-heading">LAUNCH YODHA 2.0</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default LaunchGate;

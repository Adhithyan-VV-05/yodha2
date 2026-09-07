"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getCachedVideoBlobUrl, downloadMultithreadedVideo } from "../lib/videoCache";

interface LaunchGateProps {
  onLaunch: (videoUrl?: string) => void;
}

export function LaunchGate({ onLaunch }: LaunchGateProps) {
  const [trailerState, setTrailerState] = useState<"idle" | "loading" | "ready">("idle");
  const [trailerProgress, setTrailerProgress] = useState<number>(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const TRAILER_FILE = "/final trailer.MP4";
    const CACHE_KEY = "yodha_final_trailer_v1";

    const initPreload = async () => {
      try {
        // 1. Check IndexedDB cache first for instant launch
        const cachedUrl = await getCachedVideoBlobUrl(CACHE_KEY);
        if (cachedUrl && isMounted) {
          setVideoBlobUrl(cachedUrl);
          setTrailerProgress(100);
          setTrailerState("ready");
          return;
        }

        // 2. Start multithreaded parallel video download with live progress
        if (isMounted) {
          setTrailerState("loading");
          setTrailerProgress(0);
        }

        const url = await downloadMultithreadedVideo(TRAILER_FILE, CACHE_KEY, (pct) => {
          if (isMounted) {
            setTrailerProgress(pct);
          }
        });

        if (isMounted) {
          setVideoBlobUrl(url);
          setTrailerProgress(100);
          setTrailerState("ready");
        }
      } catch (err) {
        console.warn("Launch gate video download fallback:", err);
        if (isMounted) {
          setTrailerState("ready");
        }
      }
    };

    initPreload();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    const targetUrl = videoBlobUrl || "/final trailer.MP4";
    onLaunch(targetUrl);
  };

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

      {/* 2. ONLY THE LAUNCH YODHA 2.0 BUTTON WITH LIVE PRELOAD PROGRESS & PULSE */}
      <motion.div
        animate={trailerState === "ready" ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center"
      >
        <button
          type="button"
          onClick={handleClick}
          title={trailerState === "ready" ? "Click to Launch YODHA 2.0" : `Buffering Trailer (${trailerProgress}%)`}
          className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-12 py-4 sm:py-5.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white font-mono text-base sm:text-lg font-black tracking-widest uppercase cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.7)] hover:shadow-[0_0_75px_rgba(59,130,246,0.95)] transition-all duration-300 border-2 border-blue-300/50"
        >
          {/* PULSING GLOW SHADOW BACKDROP */}
          <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-50 group-hover:opacity-90 blur-lg transition-opacity duration-300 pointer-events-none animate-pulse" />

          {/* CIRCULAR PLAY ICON / PROGRESS RING */}
          {trailerState === "ready" ? (
            <span className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
            </span>
          ) : (
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="3" className="text-blue-950" fill="none" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-white transition-all duration-200"
                  fill="none"
                  strokeDasharray={87.96}
                  strokeDashoffset={87.96 - (87.96 * trailerProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-mono text-[9px] font-black text-white">
                {trailerProgress}%
              </span>
            </div>
          )}

          <span className="relative z-10 font-heading">
            {trailerState === "ready" ? "LAUNCH YODHA 2.0" : `LOADING ${trailerProgress}%`}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default LaunchGate;

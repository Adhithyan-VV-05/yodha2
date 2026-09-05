"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING AI CORE...");

  useEffect(() => {
    let animId: number | null = null;
    let timerId: number | null = null;

    const runRealPreloader = async () => {
      const imagesToPreload = [
        "/yodha-hero-bg2-pc.png",
        "/yodha-hero--bg2-mob.png",
        "/bg-hills-day-pc.webp",
        "/bg-hills-night-pc.webp",
        "/logo.webp",
        "/gold.webp",
        "/silver.webp",
        "/bronze.webp",
      ];

      let loadedCount = 0;
      const totalAssets = imagesToPreload.length + 2;

      const updateProgress = (stepName?: string) => {
        loadedCount++;
        const pct = Math.min(90, Math.floor((loadedCount / totalAssets) * 90));
        setProgress((prev) => Math.max(prev, pct));
        if (stepName) setStatusText(stepName);
      };

      // 1. Preload & Decode Images eagerly
      const imgPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          const onDone = () => {
            updateProgress(`DECODING VISUALS (${loadedCount}/${totalAssets})...`);
            resolve(true);
          };
          if (img.complete) {
            onDone();
          } else {
            img.onload = onDone;
            img.onerror = onDone;
          }
        });
      });

      // 2. Preload Fonts
      const fontsPromise = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        updateProgress("LOADING NEURAL FONTS...");
        return true;
      });

      // 3. DOM Readiness
      const domPromise = new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
          updateProgress("SYNCHRONIZING DOM MATRIX...");
          resolve(true);
        } else {
          window.addEventListener(
            "DOMContentLoaded",
            () => {
              updateProgress("SYNCHRONIZING DOM MATRIX...");
              resolve(true);
            },
            { once: true }
          );
        }
      });

      await Promise.all([...imgPromises, fontsPromise, domPromise]);

      const startTime = performance.now();
      const fillDuration = 450;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor(90 + (elapsed / fillDuration) * 10));
        setProgress(currentPct);
        setStatusText(currentPct === 100 ? "SYSTEM READY • WARRIORS OF AI" : "FINALIZING PROTOCOLS...");

        if (elapsed < fillDuration) {
          animId = requestAnimationFrame(stepFill);
        } else {
          setProgress(100);
          timerId = window.setTimeout(onComplete, 300);
        }
      };

      animId = requestAnimationFrame(stepFill);
    };

    runRealPreloader();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (timerId !== null) window.clearTimeout(timerId);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="intro-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020512] text-white overflow-hidden select-none px-4"
    >
      {/* Dynamic Laser Scanning Line */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_25px_rgba(59,130,246,0.9)] opacity-40 pointer-events-none z-10"
      />

      {/* Electric Blue Ambient Aura Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Center Spartan Emblem & Concentric Armor Ring */}
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Rotating Glowing Ring */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-blue-500/20 border-t-blue-400 border-r-blue-400 animate-spin shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-sky-400/30 border-b-sky-300 animate-spin-slow" />

          {/* Glowing Helmet Logo */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute drop-shadow-[0_0_35px_rgba(59,130,246,0.8)]"
          >
            <img src="/logo.webp" alt="Yodha Spartan Emblem" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </motion.div>
        </div>

        {/* Official Animated Y-O-D-H-A Title */}
        <div className="max-w-xs sm:max-w-sm mb-4 px-2">
          <YodhaTitleBanner size="sm" align="center" />
        </div>
      </div>

      {/* Cyber Neon Progress Bar & Live Status */}
      <div className="w-full max-w-xs sm:max-w-sm relative z-10 mt-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
          <span className="tracking-widest uppercase text-[10px] text-blue-400 font-bold truncate max-w-[200px]">
            {statusText}
          </span>
          <span className="text-white font-extrabold">{progress}%</span>
        </div>
        <div className="w-full h-[5px] bg-slate-900 border border-blue-500/30 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

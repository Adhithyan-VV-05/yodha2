import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId: number | null = null;
    let timerId: number | null = null;

    const runRealPreloader = async () => {
      const imagesToPreload = [
        "/yodha-hero-bg-pc.webp",
        "/yodha-hero--bg-mob.webp",
        "/bg-hills-day-pc.webp",
        "/bg-hills-night-pc.webp",
        "/logo.webp",
      ];

      let loadedCount = 0;
      const totalAssets = imagesToPreload.length + 2; // +1 for fonts, +1 for DOM

      const updateProgress = () => {
        loadedCount++;
        const pct = Math.min(90, Math.floor((loadedCount / totalAssets) * 90));
        setProgress((prev) => Math.max(prev, pct));
      };

      // 1. Preload Background Images & Logo
      const imgPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.complete) {
            updateProgress();
            resolve(true);
          } else {
            img.onload = () => {
              updateProgress();
              resolve(true);
            };
            img.onerror = () => {
              updateProgress();
              resolve(true);
            };
          }
        });
      });

      // 2. Preload Web Fonts
      const fontsPromise = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        updateProgress();
        return true;
      });

      // 3. DOM Interactive Readiness
      const domPromise = new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
          updateProgress();
          resolve(true);
        } else {
          window.addEventListener(
            "DOMContentLoaded",
            () => {
              updateProgress();
              resolve(true);
            },
            { once: true }
          );
        }
      });

      // Wait until ALL background images + fonts + DOM are 100% ready
      await Promise.all([...imgPromises, fontsPromise, domPromise]);

      const startTime = performance.now();
      const fillDuration = 400;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor(90 + (elapsed / fillDuration) * 10));
        setProgress(currentPct);

        if (elapsed < fillDuration) {
          animId = requestAnimationFrame(stepFill);
        } else {
          setProgress(100);
          timerId = window.setTimeout(onComplete, 250);
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
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden select-none px-4"
    >
      {/* Ambient Background Glow */}
      <div className="absolute w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Center Spinner & Background-Removed Spartan Emblem Logo */}
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <div className="relative flex items-center justify-center mb-6">
          {/* Glowing Concentric Armor Ring */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin shadow-lg" />
          <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-slate-500/30 border-b-slate-300 animate-spin-slow" />
          
          {/* Center Background-Removed Spartan Emblem Logo */}
          <div className="absolute drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            <img src="/logo.webp" alt="Yodha Spartan Emblem" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
          </div>
        </div>

        {/* Dynamic Animated Y-O-D-H-A Title Letters */}
        <div className="max-w-xs sm:max-w-sm mb-4 px-2">
          <YodhaTitleBanner size="sm" align="center" />
        </div>
      </div>

      {/* Cyber Neon Bottom Progress Bar */}
      <div className="w-full max-w-xs relative z-10 mt-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="tracking-widest uppercase text-[10px] text-blue-300">INITIALIZING AI CORE</span>
          <span className="text-white font-extrabold">{progress}%</span>
        </div>
        <div className="w-full h-[4px] bg-slate-900 border border-blue-500/20 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-full shadow-lg transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InteractiveLogoBall } from "./InteractiveLogoBall";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    let animId: number | null = null;
    let timerId: number | null = null;

    const runRealPreloader = async () => {
      let loadedCount = 0;
      const totalAssets = 3;

      const updateProgress = () => {
        loadedCount++;
        const pct = Math.min(80, Math.floor((loadedCount / totalAssets) * 80));
        setProgress((prev) => Math.max(prev, pct));
      };

      // 1. Preload Logo Image & Ball Texture
      const logoPromise = new Promise((resolve) => {
        const img = new Image();
        img.src = logo;
        if (img.complete) {
          updateProgress();
          resolve(true);
        } else {
          img.onload = () => { updateProgress(); resolve(true); };
          img.onerror = () => { updateProgress(); resolve(true); };
        }
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
          window.addEventListener("DOMContentLoaded", () => {
            updateProgress();
            resolve(true);
          }, { once: true });
        }
      });

      await Promise.all([logoPromise, fontsPromise, domPromise]);

      // Progress bar smoothly fills to 100% when ball & assets are ready
      const startTime = performance.now();
      const fillDuration = 500;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor(80 + (elapsed / fillDuration) * 20));
        setProgress(currentPct);

        if (elapsed < fillDuration) {
          animId = requestAnimationFrame(stepFill);
        } else {
          setProgress(100);
          setIsFullyLoaded(true);

          // CONTINUES OUTER RING ANIMATION FOR EXACTLY 2 SECONDS AFTER BALL HAS LOADED!
          timerId = window.setTimeout(onComplete, 2000);
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
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#020308] text-white overflow-hidden select-none px-4 py-8 sm:px-6 sm:py-12"
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-slate-400 tracking-widest uppercase z-10"
      >
        <span className="flex items-center gap-2 font-bold text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span>YODHA 2.0</span>
        </span>
        <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200 border border-white/10 backdrop-blur-md">
          11th & 12th
        </span>
      </motion.div>

      {/* Center Original Standard Loading Spinner Visual */}
      <div className="flex flex-col items-center justify-center z-10 text-center my-auto">
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer Concentric Glowing Orbit Ring Continues Spinning Until 2 Seconds After Loading */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
          <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-indigo-500/20 border-b-purple-400 animate-spin-slow" />
          
          {/* Center 3D Logo Ball */}
          <div className="absolute">
            <InteractiveLogoBall size="md" />
          </div>
        </div>

        {/* Loading Progress Status Text */}
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
          {isFullyLoaded ? "BALL & SHADERS READY" : "WARRIORS OF AI"}
        </h3>
        <p className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-4">
          {isFullyLoaded ? "INITIALIZING IMMERSIVE EXPERIENCE.." : "Loading Innovation Portal.."}
        </p>
      </div>

      {/* Bottom Clean Progress Bar */}
      <div className="w-full max-w-md z-10 relative pb-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>{isFullyLoaded ? "ASSETS LOADED (WAITING 2S)" : "INITIALIZING RESOURCES"}</span>
          <span className="text-sky-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-[4px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md relative">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

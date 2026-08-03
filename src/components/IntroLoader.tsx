import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Intro3DCanvas } from "./Intro3DCanvas";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isRealAssetsReady, setIsRealAssetsReady] = useState(false);

  useEffect(() => {
    let animId: number | null = null;
    let timerId: number | null = null;

    // REAL RESOURCE PRELOADER: Track image load events + font compilation
    const runRealAssetPreloader = async () => {
      let loadedCount = 0;
      const totalAssets = 3; // 1. Logo image, 2. Web fonts, 3. DOM Ready state

      const updateProgress = () => {
        loadedCount++;
        const targetPct = Math.min(100, Math.floor((loadedCount / totalAssets) * 100));
        setProgress((prev) => Math.max(prev, targetPct));
      };

      // Asset 1: Preload Main Logo Image
      const logoPromise = new Promise((resolve) => {
        const img = new Image();
        img.src = logo;
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

      // Asset 2: Preload Document Web Fonts
      const fontsPromise = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        updateProgress();
        return true;
      });

      // Asset 3: DOM Interactive State
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

      // All real assets are 100% loaded! Smoothly fill remaining progress bar to 100%
      setIsRealAssetsReady(true);

      const startTime = performance.now();
      const fillDuration = 1800; // 1.8s smooth progress bar finish

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const fillPct = Math.min(100, Math.floor(50 + (elapsed / fillDuration) * 50));
        
        setProgress((prev) => Math.max(prev, fillPct));

        if (elapsed < fillDuration) {
          animId = requestAnimationFrame(stepFill);
        } else {
          setProgress(100);
          setIsEnding(true);
          timerId = window.setTimeout(onComplete, 1200); // Trigger 3D impact dispersion -> enter site
        }
      };

      animId = requestAnimationFrame(stepFill);
    };

    runRealAssetPreloader();

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#020308] text-white overflow-hidden select-none px-4 py-6 sm:px-6 sm:py-8"
    >
      {/* FULL CANVAS 3D YODHA 2.0 SCENE */}
      <Intro3DCanvas progress={progress} isEnding={isEnding} />

      {/* Ambient Glowing Backdrop matching landing page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-[100px] sm:blur-[170px] pointer-events-none animate-pulse" />

      {/* Top Bar Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-300 tracking-widest uppercase z-10"
      >
        <span className="flex items-center gap-2 font-bold text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span>YODHA HACKATHON</span>
        </span>
        <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200 border border-white/10 backdrop-blur-md">
          11th & 12th
        </span>
      </motion.div>

      {/* Center Loader Status Overlay: Real Asset Loading Status */}
      <div className="flex flex-col items-center z-10 text-center mt-auto mb-6">
        <div className="flex items-center gap-3 text-slate-300 font-mono text-xs tracking-widest bg-[#04060b]/90 border border-sky-500/30 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_25px_rgba(56,189,248,0.25)]">
          <span className="text-slate-200 font-semibold uppercase tracking-wider">
            {isEnding ? "YODHA 2.0 READY" : isRealAssetsReady ? "COMPILING SHADERS.." : "PRELOADING ASSETS.."}
          </span>
          <span className="text-sky-400 font-black text-sm">{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full max-w-md z-10">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

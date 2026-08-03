import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

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

      // 1. Preload Logo Image
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
          timerId = window.setTimeout(onComplete, 2000); // Hold outer ring 2s post load
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020308] text-white overflow-hidden select-none px-4"
    >
      {/* Center Minimalist Spinner & 2D Logo */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center mb-6">
          {/* Glowing Concentric Orbit Ring */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin shadow-[0_0_25px_rgba(56,189,248,0.4)]" />
          <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-indigo-500/20 border-b-purple-400 animate-spin-slow" />
          
          {/* Center 2D Logo */}
          <div className="absolute">
            <img src={logo} alt="Yodha Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          </div>
        </div>

        {/* Clean Title */}
        <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white mb-6 uppercase">
          YODHA 2.0
        </h2>
      </div>

      {/* Minimal Bottom Progress Bar */}
      <div className="w-full max-w-xs relative">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <span>LOADING</span>
          <span className="text-sky-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

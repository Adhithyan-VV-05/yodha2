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
      const imagesToPreload = ["/logo.webp", "/yodha-hero-bg2-pc.png"];
      let loadedCount = 0;
      const totalAssets = imagesToPreload.length;

      const updateProgress = (stepName?: string) => {
        loadedCount++;
        const pct = Math.min(90, Math.floor((loadedCount / totalAssets) * 90));
        setProgress((prev) => Math.max(prev, pct));
        if (stepName) setStatusText(stepName);
      };

      const imgPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          const onDone = () => {
            updateProgress("LOADING SYSTEM ASSETS...");
            resolve(true);
          };
          if (img.complete) onDone();
          else {
            img.onload = onDone;
            img.onerror = onDone;
          }
        });
      });

      await Promise.all(imgPromises);

      const startTime = performance.now();
      const fillDuration = 400;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor(90 + (elapsed / fillDuration) * 10));
        setProgress(currentPct);
        setStatusText(currentPct === 100 ? "SYSTEM READY" : "LOADING YODHA 2.0...");

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
        filter: "blur(24px)",
        transition: { duration: 0.45, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden select-none px-4 bg-[#020617]/98 backdrop-blur-3xl"
      style={{
        backdropFilter: "blur(100px) saturate(200%)",
        WebkitBackdropFilter: "blur(100px) saturate(200%)",
      }}
    >
      {/* ULTRA HEAVY FROSTED BLUR OVERLAY (TOTAL OBSCURATION ON ALL DEVICES) */}
      <div
        className="absolute inset-0 bg-[#020617]/95 pointer-events-none z-0"
        style={{
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)",
        }}
      />

      {/* LASER SCANNING BAR STARTING FROM THE ABSOLUTE TOP (0vh to 100vh) */}
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_25px_rgba(59,130,246,0.9)] opacity-60 pointer-events-none z-10"
      />

      {/* MINIMAL CENTER LOGO (BIG LOGO, NO CIRCLES/ORBIT RINGS) */}
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <div className="relative flex items-center justify-center mb-5">
          <img
            src="/logo.webp"
            alt="Yodha Logo"
            className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.85)]"
          />
        </div>

        {/* BRAND TITLE */}
        <div className="max-w-xs sm:max-w-sm mb-5 px-2">
          <YodhaTitleBanner size="sm" align="center" />
        </div>
      </div>

      {/* CLEAN CYBER PROGRESS BAR */}
      <div className="w-full max-w-xs sm:max-w-sm relative z-10">
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

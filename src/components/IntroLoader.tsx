"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING AI SCANNER...");

  useEffect(() => {
    let animId: number | null = null;
    let timerId: number | null = null;

    const runRealPreloader = async () => {
      const imagesToPreload = ["/logo.webp", "/yodha-hero-bg2-pc.webp"];
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
            updateProgress("SCANNING SYSTEM ASSETS...");
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
      const fillDuration = 350;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor(90 + (elapsed / fillDuration) * 10));
        setProgress(currentPct);
        setStatusText(currentPct === 100 ? "SCAN COMPLETE" : "FINALIZING SYSTEM...");

        if (elapsed < fillDuration) {
          animId = requestAnimationFrame(stepFill);
        } else {
          setProgress(100);
          timerId = window.setTimeout(onComplete, 200);
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
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden select-none px-4 bg-transparent"
      style={{
        backdropFilter: "blur(50px) saturate(180%)",
        WebkitBackdropFilter: "blur(50px) saturate(180%)",
      }}
    >
      {/* ULTRA FAST REAL SCANNER LASER BEAM */}
      <motion.div
        animate={{ y: ["0vh", "100vh", "0vh"] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_35px_#22d3ee,0_0_15px_#38bdf8] opacity-95 pointer-events-none z-20"
      />

      {/* LIGHT SCANNING TRAIL SHROUD */}
      <motion.div
        animate={{ y: ["-10vh", "90vh", "-10vh"] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent pointer-events-none z-10"
      />

      {/* CENTER BRANDING LOGO & TITLE */}
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

      {/* FAST CYBER PROGRESS BAR */}
      <div className="w-full max-w-xs sm:max-w-sm relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-200 mb-2">
          <span className="tracking-widest uppercase text-[10px] text-cyan-400 font-bold truncate max-w-[200px]">
            {statusText}
          </span>
          <span className="text-white font-extrabold">{progress}%</span>
        </div>
        <div className="w-full h-[5px] bg-black/60 border border-cyan-500/40 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-400 rounded-full shadow-[0_0_15px_#22d3ee] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

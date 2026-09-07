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
      const imagesToPreload = ["/logo.webp", "/yodha-hero-bg2-pc.webp", "/bg-hills-day-pc.webp"];
      let loadedCount = 0;
      const totalAssets = imagesToPreload.length;

      const imgPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          const onDone = () => {
            loadedCount++;
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

      // Smooth, deliberate scanning fill duration (1800ms)
      const startTime = performance.now();
      const fillDuration = 1800;

      const stepFill = (now: number) => {
        const elapsed = now - startTime;
        const currentPct = Math.min(100, Math.floor((elapsed / fillDuration) * 100));
        setProgress(currentPct);

        if (currentPct < 30) {
          setStatusText("INITIALIZING AI SCANNER...");
        } else if (currentPct < 70) {
          setStatusText("SCANNING SYSTEM ASSETS...");
        } else if (currentPct < 100) {
          setStatusText("VERIFYING CORE PROTOCOLS...");
        } else {
          setStatusText("SYSTEM READY");
        }

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
        scale: 1.03,
        filter: "blur(16px)",
        transition: { duration: 0.55, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden select-none px-4 bg-[#03060d]/90"
      style={{
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
      }}
    >
      {/* SLEEK, CRISP SCENIC SCANNER LASER LINE (BEHIND CONTENT, ABOVE BACKGROUND) */}
      <motion.div
        animate={{ y: ["0vh", "100vh", "0vh"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee,0_0_10px_#38bdf8] opacity-95 pointer-events-none z-5"
      />

      {/* CENTER BRANDING LOGO & TITLE */}
      <div className="flex flex-col items-center justify-center text-center relative z-20">
        <div className="relative flex items-center justify-center mb-6">
          <motion.img
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            src="/logo.webp"
            alt="Yodha Logo"
            className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]"
          />
        </div>

        {/* BRAND TITLE */}
        <div className="max-w-xs sm:max-w-sm mb-6 px-2">
          <YodhaTitleBanner size="sm" align="center" />
        </div>
      </div>

      {/* CYBER PROGRESS BAR */}
      <div className="w-full max-w-xs sm:max-w-sm relative z-20">
        <div className="flex items-center justify-between text-xs font-mono text-slate-200 mb-2">
          <span className="tracking-widest uppercase text-[10px] text-cyan-400 font-bold truncate max-w-[220px]">
            {statusText}
          </span>
          <span className="text-white font-extrabold">{progress}%</span>
        </div>
        <div className="w-full h-[5px] bg-black/70 border border-cyan-500/40 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-400 rounded-full shadow-[0_0_15px_#22d3ee] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

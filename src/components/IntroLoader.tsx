import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThreeDHeroVisual } from "./ThreeDHeroVisual";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // Exactly 4 seconds real loader animation
    const startTime = performance.now();

    // Asset preloading (Preload logo image into browser cache)
    const preloadImage = new Image();
    preloadImage.src = logo;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 250);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const brandLetters = ["Y", "O", "D", "H", "A", " ", "2", ".", "0"];

  return (
    <motion.div
      key="intro-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#020409] text-white overflow-hidden select-none px-8 py-10"
    >
      {/* Dynamic Ambient Glowing Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />

      {/* Top Bar Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-slate-300 tracking-widest uppercase z-10"
      >
        <span className="flex items-center gap-2 font-bold text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span>YODHA HACKATHON</span>
        </span>
        <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200 border border-white/10">
          11th & 12th
        </span>
      </motion.div>

      {/* Center 3D Sphere (REAL 4-SECOND 100x GIANT SHRINK ANIMATION) */}
      <div className="flex flex-col items-center my-auto z-10 w-full max-w-md">
        <div className="w-full relative flex justify-center mb-2">
          <ThreeDHeroVisual isLoader={true} progress={progress} />
        </div>

        {/* Staggered Letter Entrance with Neon Glow */}
        <div className="flex items-center gap-1 sm:gap-3 text-4xl sm:text-6xl md:text-7xl font-black tracking-widest font-mono text-white mb-4 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
          {brandLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 25, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={char === "2" || char === "." || char === "0" ? "text-transparent bg-clip-text bg-gradient-to-b from-sky-300 via-sky-400 to-cyan-500" : "text-white"}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Progress Display */}
        <div className="flex items-center gap-3 text-slate-300 font-mono text-xs tracking-widest">
          <span className="text-slate-400">LOADING EXPERIENCE</span>
          <span className="text-sky-400 font-black text-sm">{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md z-10">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

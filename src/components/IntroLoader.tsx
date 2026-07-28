import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // Exactly 3 seconds
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 300);
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
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#03050a] text-white overflow-hidden select-none px-8 py-14"
    >
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Bar Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-slate-400 tracking-widest uppercase z-10"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>FRONTEND SPECTRUM</span>
        </span>
        <span>JULY 2026 EDITION</span>
      </motion.div>

      {/* Center Classic Typographic Reveal */}
      <div className="flex flex-col items-center my-auto z-10">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Yodha Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
          />
        </motion.div>

        {/* Staggered Letter Entrance */}
        <div className="flex items-center gap-1 sm:gap-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest font-mono text-white mb-6">
          {brandLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={char === "2" || char === "." || char === "0" ? "text-sky-400" : "text-white"}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Minimal Progress Number */}
        <div className="flex items-baseline gap-1 text-slate-300 font-mono text-sm tracking-widest">
          <span>LOADING EXPERIENCE</span>
          <span className="text-sky-400 font-bold ml-2">{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>

      {/* Bottom Minimalist Progress Bar */}
      <div className="w-full max-w-md z-10">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

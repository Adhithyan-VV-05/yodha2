import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Card3DFlipProps {
  front: ReactNode;
  back: ReactNode;
  flipDirection?: "horizontal" | "vertical" | "zoomSlide" | "scale";
  className?: string;
  glowColor?: string;
}

export function Card3DFlip({
  front,
  back,
  flipDirection = "horizontal",
  className = "",
  glowColor = "rgba(56, 189, 248, 0.4)",
}: Card3DFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Variant transformations based on direction - all text stays upright on back
  const flipVariants = {
    horizontal: {
      front: { rotateY: 0 },
      back: { rotateY: 180 },
      flippedFront: { rotateY: -180 },
      flippedBack: { rotateY: 0 },
    },
    vertical: {
      front: { rotateX: 0 },
      back: { rotateX: -180 },
      flippedFront: { rotateX: 180 },
      flippedBack: { rotateX: 0 },
    },
    zoomSlide: {
      front: { scale: 1, z: 0, rotateY: 0 },
      back: { scale: 0.85, z: -50, rotateY: 180 },
      flippedFront: { scale: 0.85, z: -50, rotateY: -180 },
      flippedBack: { scale: 1, z: 0, rotateY: 0 },
    },
    scale: {
      front: { scale: 1, opacity: 1 },
      back: { scale: 0.9, opacity: 0, rotateY: 180 },
      flippedFront: { scale: 0.9, opacity: 0, rotateY: -180 },
      flippedBack: { scale: 1, opacity: 1, rotateY: 0 },
    },
  }[flipDirection];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`relative cursor-pointer select-none group ${className}`}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleCardClick}
    >
      {/* Ambient Glow Aura */}
      <div
        className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
      />

      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <motion.div
          initial={false}
          animate={isFlipped ? flipVariants.flippedFront : flipVariants.front}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] via-slate-950/90 to-slate-950 backdrop-blur-xl shadow-2xl overflow-hidden p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {front}
        </motion.div>

        {/* BACK FACE */}
        <motion.div
          initial={false}
          animate={isFlipped ? flipVariants.flippedBack : flipVariants.back}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 w-full h-full rounded-3xl border border-sky-400/40 bg-gradient-to-b from-sky-950/90 via-slate-950 to-black backdrop-blur-2xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {back}
        </motion.div>
      </div>
    </div>
  );
}

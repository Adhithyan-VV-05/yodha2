"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Card3DFlipProps {
  front: ReactNode;
  back: ReactNode;
  flipDirection?: "horizontal" | "vertical" | "zoomSlide" | "scale";
  className?: string;
  bgImage?: string;
  borderOverlayImage?: string;
}

export function Card3DFlip({
  front,
  back,
  flipDirection = "horizontal",
  className = "",
  bgImage,
  borderOverlayImage = "/about_border.webp",
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
      className={`relative cursor-pointer select-none group shine-sweep ${className}`}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleCardClick}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <motion.div
          initial={false}
          animate={isFlipped ? flipVariants.flippedFront : flipVariants.front}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full rounded-3xl border border-slate-400/40 bg-slate-950 backdrop-blur-xl shadow-xl overflow-hidden p-6 flex flex-col items-center justify-center text-center relative"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {borderOverlayImage && (
            <div className="absolute inset-0 pointer-events-none z-15 border border-slate-300/30 rounded-3xl overflow-hidden">
              <img src={borderOverlayImage} alt="" className="w-full h-full object-cover opacity-25 mix-blend-overlay" />
            </div>
          )}
          {bgImage && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-25 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/85 to-[#02040a]/60 z-10" />
            </div>
          )}
          <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
            {front}
          </div>
        </motion.div>

        {/* BACK FACE */}
        <motion.div
          initial={false}
          animate={isFlipped ? flipVariants.flippedBack : flipVariants.back}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 w-full h-full rounded-3xl border border-slate-400/50 bg-slate-950 backdrop-blur-2xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {borderOverlayImage && (
            <div className="absolute inset-0 pointer-events-none z-15 border border-slate-300/30 rounded-3xl overflow-hidden">
              <img src={borderOverlayImage} alt="" className="w-full h-full object-cover opacity-25 mix-blend-overlay" />
            </div>
          )}
          {bgImage && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover object-center scale-105 opacity-30 filter brightness-75 contrast-120"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/95 via-[#02040a]/90 to-[#02040a] z-10" />
            </div>
          )}
          <div className="relative z-20 w-full h-full flex flex-col justify-between">
            {back}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

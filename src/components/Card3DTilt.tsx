import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  bgImage?: string;
}

export function Card3DTilt({
  children,
  className = "",
  intensity = 15,
  bgImage,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / (height / 2)) * -intensity;
    const rY = ((mouseX - width / 2) / (width / 2)) * intensity;

    setRotateX(rX);
    setRotateY(rY);

    const px = Math.round((mouseX / width) * 100);
    const py = Math.round((mouseY / height) * 100);
    setGlowPos({ x: px, y: py });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 shine-sweep ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
        className="w-full h-full relative overflow-hidden rounded-3xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {bgImage && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={bgImage}
              alt=""
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-25 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/85 to-[#02040a]/60 z-10" />
          </div>
        )}

        {/* Dynamic Holographic Dark Glass Sheen */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.08), transparent 45%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

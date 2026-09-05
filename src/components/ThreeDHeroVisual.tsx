"use client";
import logo from "../assets/logo.webp";

interface ThreeDHeroVisualProps {
  isLoader?: boolean;
  progress?: number;
  isEnding?: boolean;
  bounceEntrance?: boolean;
}

export function ThreeDHeroVisual({ isLoader = false }: ThreeDHeroVisualProps) {
  return (
    <div
      className={`relative w-full ${
        isLoader ? "h-[320px] sm:h-[400px]" : "h-[380px] sm:h-[480px] lg:h-[560px]"
      } flex items-center justify-center select-none overflow-hidden`}
    >
      <img
        src={(logo as any)?.src || logo}
        alt="Yodha Logo"
        className="w-44 h-44 sm:w-60 sm:h-60 object-contain p-2 rounded-full bg-black/50"
      />
    </div>
  );
}

export default ThreeDHeroVisual;


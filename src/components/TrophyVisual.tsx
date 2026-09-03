import { Sparkles, Star } from "lucide-react";
import { YodhaImage } from "./YodhaImage";

interface TrophyVisualProps {
  rank: 1 | 2 | 3;
  className?: string;
}

export function TrophyVisual({ rank, className = "" }: TrophyVisualProps) {
  const isGold = rank === 1;
  const isSilver = rank === 2;

  // High-Resolution Transparent 3D Online Trophy Image URLs
  const trophyImage = isGold
    ? "https://cdn-icons-png.flaticon.com/512/3112/3112946.webp"
    : isSilver
    ? "https://cdn-icons-png.flaticon.com/512/3112/3112955.webp"
    : "https://cdn-icons-png.flaticon.com/512/3112/3112963.webp";

  const glowColor = isGold
    ? "rgba(245, 158, 11, 0.45)"
    : isSilver
    ? "rgba(226, 232, 240, 0.4)"
    : "rgba(217, 119, 6, 0.4)";

  const badgeText = isGold ? "1ST PLACE • ₹40,000" : isSilver ? "2ND PLACE • ₹20,000" : "3RD PLACE • ₹10,000";
  const badgeBorder = isGold ? "border-amber-400/40 text-amber-300" : isSilver ? "border-slate-300/40 text-slate-200" : "border-amber-700/40 text-amber-400";

  return (
    <div className={`relative flex flex-col items-center justify-center py-6 select-none ${className}`}>
      {/* Background Aura Glow */}
      <div 
        className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full blur-[60px] pointer-events-none transition-all duration-700"
        style={{ background: glowColor }}
      />

      {/* Static 3D Trophy Image */}
      <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]">
        <YodhaImage
          src={trophyImage}
          alt={`Rank ${rank} Trophy`}
          className="w-full h-full object-contain filter brightness-105 contrast-105"
        />

        {/* Sparkle Icon */}
        <div className="absolute -top-2 -right-2 text-amber-300">
          <Sparkles className="w-6 h-6 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
        </div>
      </div>

      {/* Badge Text */}
      <span className={`mt-4 px-3.5 py-1 rounded-full bg-slate-950/80 border ${badgeBorder} text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 shadow-md backdrop-blur-md`}>
        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
        <span>{badgeText}</span>
      </span>
    </div>
  );
}

export default TrophyVisual;


import { motion } from "framer-motion";

interface HeroRoboVisualProps {
  onOpenRegister?: (trackName?: string) => void;
}

export function HeroRoboVisual({ onOpenRegister }: HeroRoboVisualProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center select-none py-2">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full flex items-center justify-center cursor-pointer"
        onClick={() => onOpenRegister && onOpenRegister()}
      >
        <img
          src="/robo.webp"
          alt="YODHA AI Robo"
          className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-contain filter drop-shadow-[0_15px_30px_rgba(56,189,248,0.35)] hover:drop-shadow-[0_20px_45px_rgba(56,189,248,0.55)] hover:scale-105 transition-all duration-300"
        />
      </motion.div>
    </div>
  );
}

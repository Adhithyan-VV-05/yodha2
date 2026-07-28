import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KineticTextProps {
  words?: string[];
  className?: string;
}

export function KineticText({
  words = ["CRAFTING", "ENGINEERING", "INVENTING", "FORGING", "DESIGNING"],
  className = "",
}: KineticTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className={`inline-block relative h-[1.15em] overflow-hidden align-bottom max-w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDuration?: number;
}

const GLYPHS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#@$%&*";

export function TextScramble({
  text,
  className = "",
  scrambleSpeed = 35,
  revealDuration = 1200,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = Math.floor(revealDuration / scrambleSpeed);
    const length = text.length;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * length);

      const scrambled = text
        .split("")
        .map((char, idx) => {
          if (char === " ") return " ";
          if (idx < revealedCount) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [isInView, text, scrambleSpeed, revealDuration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`inline-block font-mono ${className}`}
    >
      {displayText}
    </motion.span>
  );
}

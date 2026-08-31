import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AwwwardsCardProps {
  children: ReactNode;
  direction?: "top" | "bottom" | "fade";
  delay?: number;
  className?: string;
}

export function AwwwardsCard({
  children,
  direction = "bottom",
  delay = 0,
  className = "",
}: AwwwardsCardProps) {
  const getInitialState = () => {
    switch (direction) {
      case "top":
        return { opacity: 0, y: -120, scale: 0.92, rotate: -2 };
      case "bottom":
        return { opacity: 0, y: 120, scale: 0.92, rotate: 2 };
      case "fade":
        return { opacity: 0, scale: 0.88, y: 0, rotate: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth physics spring curve
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default AwwwardsCard;

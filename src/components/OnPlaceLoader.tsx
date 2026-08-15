import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface OnPlaceLoaderProps {
  children: ReactNode;
  fallbackHeight?: string;
  className?: string;
  threshold?: number;
}

export function OnPlaceLoader({
  children,
  fallbackHeight = "min-h-[200px]",
  className = "",
  threshold = 0.1,
}: OnPlaceLoaderProps) {
  const [isReached, setIsReached] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use IntersectionObserver to trigger loading when reaching section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsReached(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "300px 0px 300px 0px", // Pre-trigger 300px before scrolling into viewport
        threshold,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {isReached ? (
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      ) : (
        <div className={`w-full ${fallbackHeight} flex items-center justify-center opacity-0`} />
      )}
    </div>
  );
}

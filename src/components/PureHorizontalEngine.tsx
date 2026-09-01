import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue } from "framer-motion";



export interface SectionInfo {
  id: string;
  name: string;
  widthVw?: number; // Optional horizontal width (default: 100vw)
}

interface PureHorizontalEngineProps {
  sections: SectionInfo[];
  children: ReactNode[];
}

export function PureHorizontalEngine({ sections, children }: PureHorizontalEngineProps) {
  const totalWidthVw = sections.reduce((acc, sec) => acc + (sec.widthVw || 100), 0);

  const rawX = useMotionValue(0);

  const touchStartRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const progressPercentRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getViewportWidth = () => window.innerWidth;
    const getMaxScroll = () => {
      const w = getViewportWidth();
      return Math.max(0, (totalWidthVw - 100) * (w / 100));
    };

    // Wheel event interceptor: prevents browser vertical scroll & drives horizontal rawX
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const maxScroll = getMaxScroll();
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const nextX = Math.min(0, Math.max(-maxScroll, currentXRef.current - delta * 1.15));
      currentXRef.current = nextX;
      rawX.set(nextX);
    };

    // Touch event interceptor for mobile touch dragging
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const maxScroll = getMaxScroll();
        const touchCurrent = e.touches[0].clientX;
        const diffX = touchCurrent - touchStartRef.current;
        touchStartRef.current = touchCurrent;
        const nextX = Math.min(0, Math.max(-maxScroll, currentXRef.current + diffX * 1.5));
        currentXRef.current = nextX;
        rawX.set(nextX);
      }
    };

    // Track motion value updates for top progress bar
    const unsubscribe = rawX.on("change", (val) => {
      const maxScroll = getMaxScroll();
      const absVal = Math.abs(val);
      const progress = maxScroll > 0 ? (absVal / maxScroll) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, progress));
      progressPercentRef.current = clamped;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${clamped}%`;
      }
    });

    const handleResize = () => {
      const maxScroll = getMaxScroll();
      const clampedX = Math.min(0, Math.max(-maxScroll, currentXRef.current));
      currentXRef.current = clampedX;
      rawX.set(clampedX);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [totalWidthVw, rawX]);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden z-10 select-none">
      {/* Top Fixed Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/70 z-50 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 transition-all duration-150 ease-out shadow-sm"
          style={{ width: "0%" }}
        />
      </div>

      {/* Dynamic Multi-Width Horizontal Motion Track */}
      <motion.div
        style={{ x: rawX, width: `${totalWidthVw}vw` }}
        className="flex h-screen items-center relative z-10"
      >
        {children.map((child, idx) => {
          const widthVw = sections[idx]?.widthVw || 100;
          return (
            <div
              key={sections[idx]?.id || idx}
              style={{ width: `${widthVw}vw`, flexBasis: `${widthVw}vw` }}
              className="h-screen flex-shrink-0 overflow-hidden flex flex-col justify-center items-center px-2 md:px-4 py-1 relative max-h-screen"
            >
              {child}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default PureHorizontalEngine;


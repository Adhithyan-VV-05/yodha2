import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface SectionInfo {
  id: string;
  name: string;
}

interface AwwwardsScrollEngineProps {
  sections: SectionInfo[];
  children: ReactNode[];
}

export function AwwwardsScrollEngine({ sections, children }: AwwwardsScrollEngineProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  // Measure vertical scroll progress of targetRef container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Physics spring smoothing for Awwwards liquid motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.0001,
  });

  // Map vertical scroll progress to horizontal translation (-X)
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${((sections.length - 1) / sections.length) * 100}%`]
  );

  // Update active section index and progress percentage on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      setProgressPercent(clamped * 100);

      const computedIndex = Math.min(
        sections.length - 1,
        Math.max(0, Math.round(clamped * (sections.length - 1)))
      );
      setActiveIndex(computedIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, sections.length]);

  // Smooth scroll to target section index
  const scrollToSection = (index: number) => {
    if (!targetRef.current) return;
    const totalHeight = targetRef.current.clientHeight - window.innerHeight;
    const targetY = targetRef.current.offsetTop + (index / (sections.length - 1)) * totalHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeIndex > 0) scrollToSection(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < sections.length - 1) scrollToSection(activeIndex + 1);
  };

  return (
    // Outer scroll container that provides vertical scroll height
    <div
      ref={targetRef}
      className="relative bg-transparent"
      style={{ height: `${sections.length * 100}vh` }}
    >
      {/* Top Fixed Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/60 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Sticky Viewport pinned strictly at 100vh height */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden z-10 flex items-center">
        {/* Horizontal Track translated along X axis */}
        <motion.div
          style={{ x, width: `${sections.length * 100}vw` }}
          className="flex h-screen items-center relative z-10 will-change-transform"
        >
          {children.map((child, idx) => (
            <div
              key={sections[idx]?.id || idx}
              className="w-screen h-screen min-w-[100vw] flex-shrink-0 overflow-hidden flex flex-col justify-center items-center px-4 md:px-12 py-6 relative select-none max-h-screen"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Bottom Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-sky-500/25 shadow-2xl shadow-sky-950/60 text-white select-none transition-all">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full border transition-all ${
            activeIndex === 0
              ? "opacity-30 border-slate-700 cursor-not-allowed text-slate-500"
              : "border-sky-500/30 bg-sky-950/40 hover:bg-sky-500/20 hover:border-sky-400 active:scale-95 text-sky-400"
          }`}
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Section Title & Step Indicator */}
        <div className="flex items-center gap-2 px-2">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow hidden sm:block" />
          <span className="text-xs md:text-sm font-semibold tracking-wide text-sky-200 min-w-[120px] md:min-w-[160px] text-center truncate">
            {sections[activeIndex]?.name || `Section ${activeIndex + 1}`}
          </span>
          <span className="text-[10px] md:text-xs font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
            {activeIndex + 1}/{sections.length}
          </span>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="hidden lg:flex items-center gap-1.5 px-1">
          {sections.map((sec, idx) => (
            <button
              key={sec.id || idx}
              onClick={() => scrollToSection(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              title={sec.name}
              aria-label={`Scroll to ${sec.name}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={activeIndex === sections.length - 1}
          className={`p-2 rounded-full border transition-all ${
            activeIndex === sections.length - 1
              ? "opacity-30 border-slate-700 cursor-not-allowed text-slate-500"
              : "border-sky-500/30 bg-sky-950/40 hover:bg-sky-500/20 hover:border-sky-400 active:scale-95 text-sky-400"
          }`}
          aria-label="Next Section"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
}

export default AwwwardsScrollEngine;

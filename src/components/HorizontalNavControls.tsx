import { useState, useEffect, type RefObject } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface SectionInfo {
  id: string;
  name: string;
}

interface HorizontalNavControlsProps {
  sections: SectionInfo[];
  containerRef: RefObject<HTMLDivElement | null>;
}

export function HorizontalNavControls({ sections, containerRef }: HorizontalNavControlsProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      const sectionWidth = container.clientWidth;
      if (sectionWidth > 0) {
        const index = Math.min(
          sections.length - 1,
          Math.max(0, Math.round(scrollLeft / sectionWidth))
        );
        setActiveSectionIndex(index);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, sections.length]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const targetLeft = index * container.clientWidth;
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeSectionIndex > 0) {
      scrollToSection(activeSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeSectionIndex < sections.length - 1) {
      scrollToSection(activeSectionIndex + 1);
    }
  };

  return (
    <>
      {/* Top Fixed Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/60 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-500/20 shadow-2xl shadow-sky-950/50 text-white select-none transition-all">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={activeSectionIndex === 0}
          className={`p-2 rounded-full border transition-all ${
            activeSectionIndex === 0
              ? "opacity-30 border-slate-700 cursor-not-allowed text-slate-500"
              : "border-sky-500/30 bg-sky-950/40 hover:bg-sky-500/20 hover:border-sky-400 active:scale-95 text-sky-400"
          }`}
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Current Active Section Badge & Indicator Dots */}
        <div className="flex items-center gap-2 px-2">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow hidden sm:block" />
          <span className="text-xs md:text-sm font-semibold tracking-wide text-sky-200 min-w-[120px] md:min-w-[160px] text-center truncate">
            {sections[activeSectionIndex]?.name || `Section ${activeSectionIndex + 1}`}
          </span>
          <span className="text-[10px] md:text-xs font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
            {activeSectionIndex + 1}/{sections.length}
          </span>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="hidden lg:flex items-center gap-1.5 px-1">
          {sections.map((sec, idx) => (
            <button
              key={sec.id || idx}
              onClick={() => scrollToSection(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeSectionIndex
                  ? "w-6 bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              title={sec.name}
              aria-label={`Scroll to ${sec.name}`}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={activeSectionIndex === sections.length - 1}
          className={`p-2 rounded-full border transition-all ${
            activeSectionIndex === sections.length - 1
              ? "opacity-30 border-slate-700 cursor-not-allowed text-slate-500"
              : "border-sky-500/30 bg-sky-950/40 hover:bg-sky-500/20 hover:border-sky-400 active:scale-95 text-sky-400"
          }`}
          aria-label="Next Section"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </>
  );
}

export default HorizontalNavControls;

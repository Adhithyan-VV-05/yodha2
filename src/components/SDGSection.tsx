import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SDG_ITEMS, getNextSdgId, type SDGItem } from "../data/sdgData";

// UN Emblem Official Vector Component
function UNEmblemLogo({ className = "w-20 h-20 text-purple-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Globe Grid Circles */}
      <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <ellipse cx="100" cy="100" rx="46" ry="18" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <ellipse cx="100" cy="100" rx="18" ry="46" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      
      {/* Left Olive Wreath Branch */}
      <path d="M50 135 C38 120, 36 95, 48 72 C42 80, 40 98, 46 112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M42 125 C30 115, 28 90, 40 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="36" cy="115" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="100" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="34" cy="85" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="42" cy="72" r="3" fill="currentColor" opacity="0.9" />

      {/* Right Olive Wreath Branch */}
      <path d="M150 135 C162 120, 164 95, 152 72 C158 80, 160 98, 154 112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M158 125 C170 115, 172 90, 160 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="164" cy="115" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="168" cy="100" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="166" cy="85" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="158" cy="72" r="3" fill="currentColor" opacity="0.9" />

      {/* Bottom Laurel Base Tie */}
      <path d="M92 152 C96 156, 104 156, 108 152" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Vector Icon Generator for individual SDGs
function SDGVectorIcon({ iconName, className = "w-6 h-6" }: { iconName: SDGItem["iconName"]; className?: string }) {
  switch (iconName) {
    case "health":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.71l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.7z" />
          <path d="M7 12h3l1.5-3 2 6 1.5-3H17" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M9.5 14.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" opacity="0.7" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="4" y="2" width="7" height="20" rx="1" />
          <rect x="13" y="8" width="7" height="14" rx="1" />
          <path d="M7 6h1" />
          <path d="M7 10h1" />
          <path d="M7 14h1" />
          <path d="M16 12h1" />
          <path d="M16 16h1" />
        </svg>
      );
    case "industry":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M2 20h20" />
          <path d="M6 20V10l6-4v14" />
          <path d="M12 20V6l8-4v18" />
          <path d="M9 14h.01" />
          <path d="M16 11h.01" />
          <path d="M16 15h.01" />
        </svg>
      );
    case "climate":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          <path d="M11.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
          <path d="M4 12h2" />
          <path d="M5.5 6.5l1.5 1.5" />
          <path d="M12 2v2" />
        </svg>
      );
    case "nature":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M10 10v11" />
          <path d="M10 14a6 6 0 1 0-8-5.65 6 6 0 0 0 8 5.65z" />
          <path d="M17 12v9" />
          <path d="M17 15a4.5 4.5 0 1 0-6-4.24A4.5 4.5 0 0 0 17 15z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SDGSection() {
  const [activeSdgId, setActiveSdgId] = useState<number>(3);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Active item data
  const activeItem = SDG_ITEMS.find((item) => item.id === activeSdgId) || SDG_ITEMS[0];

  // 1. AUTOMATIC 4-SECOND SELECTION TIMER ENGINE
  const resetAndStartAutoTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveSdgId((currentId) => getNextSdgId(currentId));
    }, 4000);
  };

  useEffect(() => {
    resetAndStartAutoTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeSdgId]);

  // 2. MANUAL CLICK HANDLER WITH TIMER RESET
  const handleSelectSdg = (id: number) => {
    if (id === activeSdgId) {
      resetAndStartAutoTimer();
    } else {
      setActiveSdgId(id);
    }
  };

  // 3. CONTINUOUS DESKTOP & MOBILE RAF ORBITAL ENGINE (~36s full revolution)
  useEffect(() => {
    const updateOrbit = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isVisibleRef.current) {
        const speed = (2 * Math.PI) / 36000;
        setOrbitAngle((prev) => (prev + deltaTime * speed) % (2 * Math.PI));
      }

      animFrameRef.current = requestAnimationFrame(updateOrbit);
    };

    animFrameRef.current = requestAnimationFrame(updateOrbit);

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setHasEnteredView(true);
          isVisibleRef.current = !document.hidden;
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Compute desktop 6-card orbital positions
  // Radius X = 440px, Radius Y = 285px (generous clearance spacing so cards NEVER touch or overlap center circle)
  const desktopRadiusX = 440;
  const desktopRadiusY = 285;

  const desktopCardsWithPos = SDG_ITEMS.map((item, idx) => {
    const cardAngle = orbitAngle + idx * ((2 * Math.PI) / 6);
    const posX = Math.cos(cardAngle) * desktopRadiusX;
    const posY = Math.sin(cardAngle) * desktopRadiusY;

    return {
      ...item,
      posX,
      posY,
      isActive: item.id === activeSdgId,
      idx,
    };
  });

  // Compute mobile 6-circle orbital positions (~155px radius)
  const mobileRadius = 155;
  const mobileCirclesWithPos = SDG_ITEMS.map((item, idx) => {
    const circleAngle = orbitAngle + idx * ((2 * Math.PI) / 6);
    const posX = Math.cos(circleAngle) * mobileRadius;
    const posY = Math.sin(circleAngle) * mobileRadius;

    return {
      ...item,
      posX,
      posY,
      isActive: item.id === activeSdgId,
      idx,
    };
  });

  return (
    <section
      ref={sectionRef}
      id="sdg"
      className="py-16 sm:py-24 relative overflow-hidden bg-transparent text-slate-900 select-none w-full z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center space-y-8 sm:space-y-12">
        
        {/* TOP EDITORIAL HEADER */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">


          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-heading leading-[1.15]"
          >
            Aligning Healthcare AI with <br className="hidden sm:inline" />
            <span className="text-purple-600 font-extrabold">
              Global Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            YODHA Hackathon projects directly align with official United Nations SDGs to drive measurable global social impact.
          </motion.p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP PRESENTATION MODE (≥ 1024px lg): CONTINUOUS ORBITAL ENGINE */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:flex relative w-full h-[680px] items-center justify-center">

          {/* STATIONARY MAIN CENTER CIRCLE WITH PROMINENT PURPLE BORDER */}
          <div className="relative z-20 flex items-center justify-center">
            <div className="w-[360px] h-[360px] rounded-full relative p-1.5 flex items-center justify-center">
              {/* Outer Glowing Purple Ring Accent */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/80 shadow-[0_0_40px_rgba(168,85,247,0.35)] pointer-events-none" />

              {/* Inner Glass Center Disc */}
              <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-2xl border border-purple-200/60 shadow-[0_20px_60px_rgba(124,58,237,0.2),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <UNEmblemLogo className="w-48 h-48 text-purple-600/10 absolute inset-0 m-auto pointer-events-none z-0" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center max-w-[260px]"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100/90 border border-purple-300 text-purple-700 font-mono text-[11px] font-bold tracking-wider uppercase mb-2.5">
                      <span>SDG {activeItem.id}</span>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-purple-600 border border-purple-500 shadow-md flex items-center justify-center text-white mb-2.5 shadow-purple-300">
                      <SDGVectorIcon iconName={activeItem.iconName} className="w-7 h-7" />
                    </div>

                    <h3 className="text-base font-black text-slate-950 uppercase tracking-tight leading-tight mb-2 whitespace-pre-line">
                      {activeItem.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {activeItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 6 DESKTOP ORBITING SDG CARDS (SCALE-0 ENTRANCE BLOOM FROM CENTER + CONTINUOUS ORBIT) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            {desktopCardsWithPos.map((card) => (
              <motion.div
                key={`desktop-card-${card.id}`}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={
                  hasEnteredView
                    ? { scale: 1, opacity: 1, x: card.posX, y: card.posY }
                    : { scale: 0, opacity: 0, x: 0, y: 0 }
                }
                transition={{
                  scale: { duration: 0.85, delay: card.idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.7, delay: card.idx * 0.07 },
                  x: { duration: 0.05, ease: "linear" },
                  y: { duration: 0.05, ease: "linear" },
                }}
                className="absolute pointer-events-auto"
              >
                <button
                  type="button"
                  onClick={() => handleSelectSdg(card.id)}
                  aria-label={`Select SDG ${card.id} ${card.title.replace("\n", " ")}`}
                  className={`w-[290px] rounded-3xl p-4 flex items-center justify-between text-left transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-xl border ${
                    card.isActive
                      ? "bg-white/95 border-purple-500/90 shadow-[0_0_35px_rgba(168,85,247,0.35)] scale-[1.04] ring-2 ring-purple-400/50"
                      : "bg-white/75 hover:bg-white/90 border-white/90 shadow-[0_10px_35px_rgba(124,58,237,0.08)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.15)] hover:border-purple-200/90"
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Small Icon Holder Dot: Vibrant Purple Fill on Selected Card */}
                    <div
                      className={`w-12 h-12 rounded-full border shadow-inner flex items-center justify-center shrink-0 transition-all ${
                        card.isActive
                          ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                          : "bg-purple-50/90 border-purple-200/70 text-purple-600"
                      }`}
                    >
                      <SDGVectorIcon iconName={card.iconName} className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-purple-600 uppercase block mb-0.5">
                        SDG {card.id}
                      </span>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug whitespace-pre-line">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center shrink-0 pl-2">
                    <span
                      className={`font-mono font-black text-2xl leading-none transition-colors ${
                        card.isActive ? "text-purple-600" : "text-purple-300/60"
                      }`}
                    >
                      {card.numberStr}
                    </span>
                    <span
                      className={`text-xs mt-1 transition-transform ${
                        card.isActive ? "translate-x-1 text-purple-600 font-bold" : "text-purple-400/70"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE PRESENTATION MODE (< 1024px): ROTATING ICON-ONLY RING     */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex lg:hidden flex-col items-center justify-center w-full min-h-[460px] relative py-4">
          
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">

            {/* MOBILE MAIN CENTER HUB DISK WITH PURPLE BORDER */}
            <div className="w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] rounded-full bg-white/90 backdrop-blur-2xl border-4 border-purple-500/80 shadow-[0_15px_45px_rgba(124,58,237,0.25)] flex flex-col items-center justify-center p-4 text-center z-20 relative overflow-hidden">
              <UNEmblemLogo className="w-36 h-36 text-purple-600/10 absolute inset-0 m-auto pointer-events-none z-0" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center max-w-[190px]"
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-mono text-[10px] font-bold tracking-wider uppercase mb-1.5">
                    SDG {activeItem.id}
                  </span>

                  <h3 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-tight leading-tight mb-1 whitespace-pre-line">
                    {activeItem.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 leading-snug font-normal line-clamp-3">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 6 SMALL ROTATING ICON-ONLY SURROUNDING CIRCLES */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
              {mobileCirclesWithPos.map((circle) => (
                <motion.div
                  key={`mobile-circle-${circle.id}`}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={
                    hasEnteredView
                      ? { scale: 1, opacity: 1, x: circle.posX, y: circle.posY }
                      : { scale: 0, opacity: 0, x: 0, y: 0 }
                  }
                  transition={{
                    scale: { duration: 0.75, delay: circle.idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.6, delay: circle.idx * 0.07 },
                    x: { duration: 0.05, ease: "linear" },
                    y: { duration: 0.05, ease: "linear" },
                  }}
                  className="absolute pointer-events-auto"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectSdg(circle.id)}
                    aria-label={`Select SDG ${circle.id}`}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-xl border ${
                      circle.isActive
                        ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-110 ring-2 ring-purple-300"
                        : "bg-white/85 border-purple-200/80 text-purple-600 shadow-[0_6px_20px_rgba(124,58,237,0.1)] hover:scale-105"
                    }`}
                  >
                    <SDGVectorIcon iconName={circle.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SDGSection;

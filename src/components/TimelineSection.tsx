import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { TIMELINE_DAYS } from "../data/timelineData";
import type { DayItem, ActivityItem } from "../data/timelineData";

// Helper to parse timing string for small mobile circles
function parseShortTime(timeStr: string): { timeNum: string; period: string } {
  const match = timeStr.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
  if (match) {
    return { timeNum: match[1], period: match[2].toUpperCase() };
  }
  return { timeNum: timeStr.slice(0, 5), period: "" };
}

export function TimelineSection() {
  const [selectedDay, setSelectedDay] = useState<DayItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Trigger entrance animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute items surrounding the central hub
  const activeChildren = selectedDay
    ? [
        ...selectedDay.activities.map((act) => ({ type: "activity" as const, data: act })),
        { type: "back" as const, data: null },
      ]
    : TIMELINE_DAYS.map((day) => ({ type: "day" as const, data: day }));

  const childCount = activeChildren.length;

  // Selection handlers
  const handleSelectDay = (day: DayItem) => {
    setSelectedDay(day);
    setSelectedActivity(null);
  };

  const handleSelectActivity = (act: ActivityItem) => {
    setSelectedActivity(act);
  };

  const handleBackToDays = () => {
    setSelectedDay(null);
    setSelectedActivity(null);
  };

  // Radial positioning metrics with generous PC clearance spacing
  const desktopRx = childCount > 6 ? 485 : 435;
  const desktopRy = childCount > 6 ? 310 : 270;

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="py-16 sm:py-24 relative overflow-hidden bg-transparent text-slate-950 select-none w-full z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center space-y-8">
        
        {/* EDITORIAL SECTION HEADER IN SDG LIGHT THEME */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-slate-950 tracking-tight"
          >
            THE <span className="text-purple-600 font-extrabold">JOURNEY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-base text-slate-700 font-mono font-semibold max-w-2xl mx-auto"
          >
            {selectedDay ? (
              <span className="flex items-center justify-center gap-2 text-purple-700 font-bold">
                <span>{selectedDay.dayId}</span> • <span>{selectedDay.subtitle}</span>
              </span>
            ) : (
              "3 Days • 48-Hour Hackathon Journey"
            )}
          </motion.p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP VIEW (≥ 1024px lg): RADIAL INTERACTIVE HUB IN SDG LIGHT THEME */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:flex relative w-full h-[680px] items-center justify-center">

          {/* SVG CONNECTING LINES FROM HUB TO CARDS (BEHIND CENTER DISC) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {activeChildren.map((item, idx) => {
              const angle = (2 * Math.PI * idx) / childCount - Math.PI / 2;
              const posX = Math.cos(angle) * desktopRx;
              const posY = Math.sin(angle) * desktopRy;

              const hubRadius = 185;
              const lineStartX = Math.cos(angle) * hubRadius;
              const lineStartY = Math.sin(angle) * hubRadius;

              const isHighlighted =
                item.type === "activity" && selectedActivity?.id === (item.data as ActivityItem).id;

              return (
                <g key={`svg-line-${idx}`}>
                  <line
                    x1={`calc(50% + ${lineStartX}px)`}
                    y1={`calc(50% + ${lineStartY}px)`}
                    x2={`calc(50% + ${posX}px)`}
                    y2={`calc(50% + ${posY}px)`}
                    className={`transition-all duration-500 ${
                      isHighlighted
                        ? "stroke-purple-600 stroke-[3px] filter drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]"
                        : "stroke-purple-400/50 stroke-[1.5px]"
                    }`}
                  />
                  <circle
                    cx={`calc(50% + ${posX}px)`}
                    cy={`calc(50% + ${posY}px)`}
                    r={isHighlighted ? "6" : "4"}
                    className={`transition-all duration-500 ${
                      isHighlighted ? "fill-purple-600 stroke-white stroke-2" : "fill-purple-500"
                    }`}
                  />
                </g>
              );
            })}
          </svg>

          {/* SURROUNDING CARDS (LOWER Z-INDEX z-10 THAN MAIN CENTER DISC) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            {activeChildren.map((item, idx) => {
              const angle = (2 * Math.PI * idx) / childCount - Math.PI / 2;
              const posX = Math.cos(angle) * desktopRx;
              const posY = Math.sin(angle) * desktopRy;

              if (item.type === "back") {
                return (
                  <motion.div
                    key="desktop-back-card"
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={
                      hasEnteredView
                        ? { scale: 1, opacity: 1, x: posX, y: posY }
                        : { scale: 0, opacity: 0, x: 0, y: 0 }
                    }
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                    className="absolute pointer-events-auto z-10"
                  >
                    <button
                      type="button"
                      onClick={handleBackToDays}
                      className="px-6 py-3.5 rounded-3xl bg-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_10px_25px_rgba(147,51,234,0.35)] hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                      <span>BACK TO DAYS</span>
                    </button>
                  </motion.div>
                );
              }

              if (item.type === "day") {
                const dayData = item.data as DayItem;
                return (
                  <motion.div
                    key={`desktop-day-${dayData.id}`}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={
                      hasEnteredView
                        ? { scale: 1, opacity: 1, x: posX, y: posY }
                        : { scale: 0, opacity: 0, x: 0, y: 0 }
                    }
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className="absolute pointer-events-auto z-10"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectDay(dayData)}
                      className="w-72 rounded-3xl p-6 text-left transition-all duration-300 cursor-pointer backdrop-blur-2xl border bg-white/90 border-purple-200/90 shadow-[0_10px_35px_rgba(124,58,237,0.1)] hover:bg-white hover:border-purple-400 hover:shadow-[0_20px_45px_rgba(124,58,237,0.2)] hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-black text-purple-600 uppercase tracking-widest">
                          {dayData.dayId}
                        </span>
                        <Calendar className="w-4.5 h-4.5 text-purple-600" />
                      </div>
                      <h4 className="text-base font-bold text-slate-950 font-heading leading-snug">
                        {dayData.subtitle}
                      </h4>
                    </button>
                  </motion.div>
                );
              }

              // Activity Card
              const actData = item.data as ActivityItem;
              const isSelected = selectedActivity?.id === actData.id;

              return (
                <motion.div
                  key={`desktop-act-${actData.id}`}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={
                    hasEnteredView
                      ? { scale: isSelected ? 1.08 : 1, opacity: 1, x: posX, y: posY }
                      : { scale: 0, opacity: 0, x: 0, y: 0 }
                  }
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="absolute pointer-events-auto z-10"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectActivity(actData)}
                    className={`w-64 p-4 rounded-3xl backdrop-blur-2xl transition-all duration-300 text-left border cursor-pointer ${
                      isSelected
                        ? "bg-purple-600 border-purple-500 shadow-[0_15px_40px_rgba(147,51,234,0.35)] text-white scale-105"
                        : "bg-white/90 border-purple-200/80 hover:border-purple-400 hover:bg-white shadow-[0_10px_30px_rgba(124,58,237,0.08)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.18)] text-slate-950"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-[11px] font-mono font-bold flex items-center gap-1.5 truncate ${isSelected ? "text-purple-100" : "text-purple-600"}`}>
                        <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`} />
                        <span>{actData.time}</span>
                      </span>
                      <span className={`text-xs font-mono shrink-0 ${isSelected ? "text-white" : "text-purple-600"}`}>→</span>
                    </div>
                    <h5 className={`text-xs sm:text-sm font-bold font-heading line-clamp-2 leading-snug ${isSelected ? "text-white" : "text-slate-950"}`}>
                      {actData.title}
                    </h5>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* STATIONARY MAIN CENTER CIRCLE (HIGHER Z-INDEX z-40 + PURE GLASSMORPHISM WITHOUT SOLID BACKGROUND) */}
          <div className="relative z-40 flex items-center justify-center">
            <div className="w-[360px] h-[360px] rounded-full relative p-1.5 flex items-center justify-center">
              {/* Outer Glowing Purple Ring Accent */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/80 shadow-[0_0_45px_rgba(168,85,247,0.35)] pointer-events-none" />

              {/* Inner Pure Glass Center Disc (No solid bg fill, pure glassmorphism) */}
              <div className="w-full h-full rounded-full bg-slate-950/40 backdrop-blur-2xl border border-purple-400/50 shadow-[0_20px_60px_rgba(168,85,247,0.3)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden text-white">
                <AnimatePresence mode="wait">
                  {selectedActivity ? (
                    <motion.div
                      key={`act-detail-${selectedActivity.id}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center max-w-[270px] space-y-2 relative z-10"
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/60 text-purple-300 font-mono text-[11px] font-bold">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>{selectedActivity.time}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black font-heading text-white uppercase tracking-tight leading-tight drop-shadow-md">
                        {selectedActivity.title}
                      </h3>

                      <div className="w-12 h-[1px] bg-purple-400/60 my-1" />

                      <p className="text-xs text-slate-200 font-sans leading-relaxed font-normal max-w-[270px] drop-shadow-sm">
                        {selectedActivity.description}
                      </p>
                    </motion.div>
                  ) : selectedDay ? (
                    <motion.div
                      key={`day-summary-${selectedDay.id}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center max-w-[260px] space-y-2 relative z-10"
                    >
                      <span className="text-[10px] font-mono font-extrabold text-purple-400 tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                        {selectedDay.kicker}
                      </span>

                      <h3 className="text-3xl font-black font-heading text-white tracking-tight drop-shadow-md">
                        {selectedDay.dayId}
                      </h3>

                      <p className="text-xs font-mono text-purple-300 font-bold drop-shadow-sm">
                        {selectedDay.subtitle}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="initial-summary"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center max-w-[250px] space-y-2 relative z-10"
                    >
                      <span className="text-[10px] font-mono font-extrabold text-purple-400 tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                        YODHA 2.0
                      </span>

                      <h3 className="text-2xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
                        THE JOURNEY
                      </h3>

                      <div className="w-12 h-[1px] bg-purple-400 my-1" />

                      <p className="text-[11px] font-mono text-slate-200 font-bold drop-shadow-sm">
                        3 DAYS • 48 HOURS
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE PRESENTATION MODE (< 1024px): RADIAL SMALL CIRCLES RING IN SDG LIGHT THEME */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex lg:hidden flex-col items-center justify-center w-full min-h-[460px] relative py-4">
          
          <div className="relative w-[330px] h-[330px] sm:w-[370px] sm:h-[370px] flex items-center justify-center">

            {/* MOBILE MAIN CENTER HUB DISC (HIGHER Z-INDEX z-40 + PURE GLASSMORPHISM WITHOUT SOLID BACKGROUND) */}
            <div className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] rounded-full bg-slate-950/40 backdrop-blur-2xl border-4 border-purple-500/80 shadow-[0_12px_40px_rgba(168,85,247,0.3)] flex flex-col items-center justify-center p-3.5 text-center z-40 relative overflow-hidden text-white">
              <AnimatePresence mode="wait">
                {selectedActivity ? (
                  <motion.div
                    key={`mob-act-detail-${selectedActivity.id}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center max-w-[155px] sm:max-w-[180px] space-y-1 relative z-10"
                  >
                    <span className="px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 font-mono text-[8px] sm:text-[9px] font-bold flex items-center gap-1 border border-purple-500/40">
                      <Clock className="w-2.5 h-2.5 text-purple-400" />
                      <span>{selectedActivity.time}</span>
                    </span>

                    <h3 className="text-[11px] sm:text-xs font-black font-heading text-white uppercase leading-tight drop-shadow-md">
                      {selectedActivity.title}
                    </h3>

                    <div className="w-8 h-[1px] bg-purple-400/60 my-0.5" />

                    <p className="text-[9px] sm:text-[10px] text-slate-200 font-sans leading-tight font-normal max-w-[155px] sm:max-w-[180px] line-clamp-3">
                      {selectedActivity.description}
                    </p>
                  </motion.div>
                ) : selectedDay ? (
                  <motion.div
                    key={`mob-day-summary-${selectedDay.id}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center max-w-[150px] sm:max-w-[170px] space-y-1 relative z-10"
                  >
                    <span className="text-[8px] sm:text-[9px] font-mono font-extrabold text-purple-400 tracking-wider uppercase">
                      {selectedDay.kicker}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                      {selectedDay.dayId}
                    </h3>

                    <p className="text-[9px] sm:text-[10px] font-mono text-purple-300 font-bold">
                      {selectedDay.subtitle}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mob-initial-summary"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center max-w-[150px] sm:max-w-[170px] space-y-1 relative z-10"
                  >
                    <span className="text-[8px] sm:text-[9px] font-mono font-extrabold text-purple-400 tracking-wider uppercase">
                      YODHA 2.0
                    </span>

                    <h3 className="text-sm sm:text-base font-black font-heading text-white">
                      THE JOURNEY
                    </h3>

                    <p className="text-[9px] sm:text-[10px] font-mono text-slate-200 font-bold">
                      3 DAYS • 48 HOURS
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SMALL ROTATING / POSITIONED SURROUNDING CIRCLES RING (LOWER Z-INDEX z-10 THAN MOBILE CENTER DISC z-40) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
              {activeChildren.map((item, idx) => {
                const mobAngle = (2 * Math.PI * idx) / childCount - Math.PI / 2;
                const mobRadius = childCount > 6 ? 145 : 130;
                const posX = Math.cos(mobAngle) * mobRadius;
                const posY = Math.sin(mobAngle) * mobRadius;

                if (item.type === "back") {
                  return (
                    <motion.div
                      key="mob-back-circle"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, x: posX, y: posY }}
                      transition={{ duration: 0.4, delay: idx * 0.03 }}
                      className="absolute pointer-events-auto z-10"
                    >
                      <button
                        type="button"
                        onClick={handleBackToDays}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-600 border-2 border-purple-400 text-white flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.4)] active:scale-95 cursor-pointer"
                        title="Back to Days"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  );
                }

                if (item.type === "day") {
                  const dayData = item.data as DayItem;
                  return (
                    <motion.div
                      key={`mob-day-circle-${dayData.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, x: posX, y: posY }}
                      transition={{ duration: 0.45, delay: idx * 0.05 }}
                      className="absolute pointer-events-auto z-10"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectDay(dayData)}
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/90 border-2 border-purple-400 text-purple-700 font-mono text-[11px] sm:text-xs font-black uppercase flex items-center justify-center shadow-[0_6px_20px_rgba(124,58,237,0.15)] hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        DAY {dayData.id}
                      </button>
                    </motion.div>
                  );
                }

                // Activity Small Circle
                const actData = item.data as ActivityItem;
                const isSelected = selectedActivity?.id === actData.id;
                const { timeNum, period } = parseShortTime(actData.time);

                return (
                  <motion.div
                    key={`mob-act-circle-${actData.id}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: isSelected ? 1.15 : 1, opacity: 1, x: posX, y: posY }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className="absolute pointer-events-auto z-10"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectActivity(actData)}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-xl border ${
                        isSelected
                          ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] scale-110 ring-2 ring-purple-300"
                          : "bg-white/90 border-purple-300/80 text-purple-700 hover:border-purple-500 shadow-[0_4px_15px_rgba(124,58,237,0.12)]"
                      }`}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] font-extrabold leading-none tracking-tighter">
                        {timeNum}
                      </span>
                      {period && (
                        <span className="font-mono text-[7px] sm:text-[8px] font-bold opacity-85 uppercase leading-none tracking-tighter mt-0.5">
                          {period}
                        </span>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default TimelineSection;

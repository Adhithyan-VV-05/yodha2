import { useState, useEffect } from "react";
import { ArrowRight, Shield } from "lucide-react";
import { HeroRoboVisual } from "./HeroRoboVisual";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
}

export function FirstLoadHero({ onOpenRegister }: FirstLoadHeroProps) {
  // Countdown Timer targeting 11 September 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 11,
    minutes: 30,
    seconds: 39,
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-11T09:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerItems = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <section id="hero-page" className="relative w-full h-full flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. PC / DESKTOP VIEW (EXACT SIZING MATCH TO LEFT SIDE OF MOCKUP)          */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex flex-col justify-between h-full w-full py-1">
        
        {/* TOP ROW: 2-COLUMN SPLIT (Left Details • Right AI Robot Mascot) */}
        <div className="grid grid-cols-12 gap-6 items-center w-full my-auto">
          
          {/* Left Column: YODHA Title, Subtext, Pill Badge, College Text, Blue CTA Button */}
          <div className="col-span-7 flex flex-col items-start text-left space-y-4">
            {/* YODHA Title Banner + WARRIORS OF AI subtext with cyan lines */}
            <YodhaTitleBanner size="lg" align="left" />

            {/* Pill Badge: 🛡️ 48-HOUR HEALTHCARE AI HACKATHON */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>48-HOUR HEALTHCARE AI HACKATHON</span>
            </div>

            {/* Subtitle: JYOTHI ENGINEERING COLLEGE (AUTONOMOUS) • DEPT OF AI & DATA SCIENCE */}
            <div className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed font-medium">
              <p>JYOTHI ENGINEERING COLLEGE (AUTONOMOUS) •</p>
              <p>DEPT OF AI & DATA SCIENCE</p>
            </div>

            {/* Blue Glowing Pill Button: REGISTER TEAM NOW ➔ */}
            <button
              onClick={() => onOpenRegister()}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 text-slate-950 font-black text-xs tracking-widest uppercase hover:brightness-115 transition-all shadow-[0_0_30px_rgba(56,189,248,0.65)] flex items-center gap-2 cursor-pointer pointer-events-auto active:scale-95 hover:scale-105"
            >
              <span>REGISTER TEAM NOW</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Right Column: Large AI Robot Mascot with subtle glowing aura */}
          <div className="col-span-5 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <HeroRoboVisual onOpenRegister={onOpenRegister} />
          </div>

        </div>

        {/* BOTTOM ROW: CENTERED HACKATHON STARTS IN HEADER LINE + 4 CIRCULAR TIMERS */}
        <div className="w-full flex flex-col items-center justify-center space-y-2 pt-1 pb-1">
          {/* Header Line */}
          <div className="flex items-center justify-center gap-4 w-full max-w-xl">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-cyan-400" />
            <span className="text-xs font-mono font-black tracking-widest text-cyan-300 uppercase shrink-0">
              HACKATHON STARTS IN
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-cyan-400/60 to-cyan-400" />
          </div>

          {/* 4 Horizontal Circular Timer Pods */}
          <div className="flex items-center justify-center gap-5 xl:gap-7">
            {timerItems.map((item) => (
              <div key={item.label} className="relative w-18 h-18 sm:w-20 sm:h-20 xl:w-22 xl:h-22 flex flex-col items-center justify-center">
                <div className="absolute inset-[8%] rounded-full bg-[#030919]/90 border border-cyan-400/40 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.25)]" />
                <div className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow">
                  <img src="/countdown circle.webp" alt={item.label} className="w-full h-full object-contain" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center -translate-y-1 z-10">
                  <div className="relative font-digital flex items-center justify-center">
                    <span className="font-digital text-xl sm:text-2xl font-normal text-cyan-950/40 select-none">88</span>
                    <span className="absolute inset-0 flex items-center justify-center font-digital text-xl sm:text-2xl font-normal text-cyan-300 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-[14%] left-0 right-0 text-center z-10">
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold text-cyan-300 tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (EXACT SIZING MATCH TO RIGHT SIDE OF MOCKUP)               */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col justify-between h-full w-full py-1 text-center items-center space-y-1.5">
        
        {/* 1. YODHA Title Banner + WARRIORS OF AI */}
        <div className="w-full flex justify-center scale-85 sm:scale-100">
          <YodhaTitleBanner size="lg" align="center" />
        </div>

        {/* 2. Centered Hovering AI Robot Mascot */}
        <div className="w-full flex justify-center my-auto max-h-[180px] sm:max-h-[220px]">
          <HeroRoboVisual onOpenRegister={onOpenRegister} />
        </div>

        {/* 3. Pill Badge: 🛡️ 48-HOUR HEALTHCARE AI HACKATHON */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
          <Shield className="w-3 h-3 text-cyan-400" />
          <span>48-HOUR HEALTHCARE AI HACKATHON</span>
        </div>

        {/* 4. Subtitle Text */}
        <div className="text-[10px] sm:text-[11px] font-mono text-slate-300 leading-tight space-y-0.5 max-w-xs">
          <p>JYOTHI ENGINEERING COLLEGE (AUTONOMOUS) •</p>
          <p>DEPT OF AI & DATA SCIENCE</p>
        </div>

        {/* 5. Full-Width Glowing Blue Pill Button */}
        <button
          onClick={() => onOpenRegister()}
          className="w-full max-w-xs py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 text-slate-950 font-black text-xs tracking-widest uppercase hover:brightness-115 transition-all shadow-[0_0_20px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>REGISTER TEAM NOW</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>

        {/* 6. Bottom Section: HACKATHON STARTS IN + 4 Circular Timers */}
        <div className="w-full flex flex-col items-center space-y-1 pt-0.5">
          <div className="flex items-center justify-center gap-2 w-full max-w-xs">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-400/70" />
            <span className="text-[9px] font-mono font-black tracking-widest text-cyan-300 uppercase">
              HACKATHON STARTS IN
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-400/70" />
          </div>

          <div className="grid grid-cols-4 gap-1.5 w-full max-w-[240px]">
            {timerItems.map((item) => (
              <div key={item.label} className="relative aspect-square flex flex-col items-center justify-center">
                <div className="absolute inset-[10%] rounded-full bg-[#030919]/90 border border-cyan-400/40 pointer-events-none" />
                <div className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow">
                  <img src="/countdown circle.webp" alt={item.label} className="w-full h-full object-contain" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center -translate-y-0.5 z-10">
                  <div className="relative font-digital flex items-center justify-center">
                    <span className="font-digital text-base sm:text-lg font-normal text-cyan-300 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-[10%] left-0 right-0 text-center z-10">
                  <span className="text-[7px] font-mono font-extrabold text-cyan-300 uppercase tracking-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

export default FirstLoadHero;

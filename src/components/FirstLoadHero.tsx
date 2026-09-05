"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Code, Target, Play, MapPin, Users, Lightbulb, Globe, Trophy } from "lucide-react";

interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
  onOpenTrailer?: () => void;
}

export function FirstLoadHero({ onOpenRegister: _, onOpenTrailer }: FirstLoadHeroProps) {
  // Live countdown timer targeting 1 October 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 10,
    minutes: 15,
    seconds: 40,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-01T09:00:00+05:30").getTime();

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

  return (
    <section className="relative w-full min-h-screen pt-10 sm:pt-20 lg:pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none z-10">
      
      {/* MAIN IMPACT HEADLINE & BRIEF */}
      <div className="relative z-20 max-w-3xl max-sm:my-0 max-sm:pt-1 my-auto space-y-3 sm:space-y-4 py-2 sm:py-4">
        <motion.h1
          initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 uppercase leading-[1.05] font-heading"
        >
          RISE AS <span className="text-blue-600 font-black">WARRIORS</span>, <br />
          THINK AS <span className="text-blue-600 font-black">INNOVATORS</span>, <br />
          BUILD FOR <span className="text-blue-600 font-black">HUMANITY</span>.
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-12 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full origin-left shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="text-xs sm:text-sm lg:text-base text-slate-900 font-semibold max-w-xl leading-relaxed font-sans"
        >
          A <strong className="text-blue-600 font-black">battlefield</strong> for <strong className="text-slate-950 font-black">bold ideas</strong>, where <strong className="text-slate-950 font-black">technology</strong> finds <span className="text-blue-600 font-bold">purpose</span><br className="hidden sm:inline" />{" "}
          and <span className="text-blue-600 font-extrabold">innovation</span> leaves an <strong className="text-blue-600 font-black">impact</strong>.
        </motion.p>

        {/* 3 STAT CARDS PLACED JUST ABOVE THE TIMER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xl pt-2"
        >
          {/* CARD 1 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">48 HOURS</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">NON-STOP</span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Code className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">16 PROBLEMS</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">REAL WORLD</span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Target className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">1 MISSION</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">AI IMPACT</span>
            </div>
          </div>
        </motion.div>

        {/* COUNTDOWN + WATCH TRAILER + LOCATION DECK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 pt-1"
        >
          
          {/* MINIMAL COUNTDOWN BOX */}
          <div className="p-3.5 rounded-2xl bg-[#08112d]/95 border border-blue-500/40 backdrop-blur-2xl flex flex-col space-y-1.5 shadow-md">
            <span className="text-[9px] font-mono font-extrabold text-blue-400 uppercase tracking-widest text-center">
              HACKATHON STARTS IN
            </span>
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">DAYS</span>
              </div>
              <span className="text-lg font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">HRS</span>
              </div>
              <span className="text-lg font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">MIN</span>
              </div>
              <span className="text-lg font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">SEC</span>
              </div>
            </div>
          </div>

          {/* WATCH TRAILER ACTION */}
          <button
            onClick={() => onOpenTrailer && onOpenTrailer()}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xs font-mono font-black text-slate-950 max-sm:text-white uppercase tracking-wider group-hover:text-blue-600 transition-colors">
              TRAILER
            </span>
          </button>

          {/* MINIMAL LOCATION INFO */}
          <div className="flex items-start gap-2 max-w-xs text-left">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex flex-col text-[11px] font-mono text-slate-900 max-sm:text-white leading-tight">
              <span className="font-black text-slate-950 max-sm:text-white uppercase">JYOTHI ENGINEERING COLLEGE (AUTONOMOUS)</span>
              <span className="text-[9px] text-slate-600 max-sm:text-slate-300 font-bold uppercase">DEPT. OF AI & DS</span>
            </div>
          </div>

        </motion.div>
      </div>

      {/* BOTTOM DECK: SHORTENED MINIMAL FEATURE DOCK WITH CENTERED SEPARATING LINES */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full px-2 py-2.5 sm:px-4 sm:py-3.5 rounded-2xl bg-[#050612]/95 border border-blue-500/40 backdrop-blur-xl shadow-lg flex items-center justify-between gap-1 sm:gap-2 text-xs font-mono"
      >
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">COLLABORATE</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">INNOVATE</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">IMPACT</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">WIN & GROW</span>
        </div>
      </motion.div>

    </section>
  );
}

export default FirstLoadHero;

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
    <section className="relative w-full min-h-screen pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none z-10">
      
      {/* MAIN IMPACT HEADLINE & BRIEF */}
      <div className="relative z-20 max-w-3xl my-auto space-y-4 py-4">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 uppercase leading-[1.05] font-heading"
        >
          BUILD AI SOLUTIONS <br />
          THAT <span className="text-purple-600 font-black">SAVE LIVES</span> <br />
          AND <span className="text-purple-600 font-black">PROTECT</span> <br />
          OUR PLANET.
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-10 h-1 bg-purple-600 rounded-full origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm sm:text-lg text-slate-800 max-w-xl font-medium leading-relaxed font-sans"
        >
          An autonomous innovation{" "}
          <strong className="text-slate-950 font-black max-sm:text-slate-950 max-sm:font-black">challenge</strong>{" "}
          <span className="text-purple-600 font-bold max-sm:text-purple-600">for</span> young minds with{" "}
          <strong className="text-slate-950 font-black">bold ideas</strong> and{" "}
          <strong className="text-purple-600 font-extrabold">bigger impact</strong>.
        </motion.p>

        {/* 3 STAT CARDS PLACED JUST ABOVE THE TIMER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xl pt-2"
        >
          {/* CARD 1 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-purple-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-purple-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">48 HOURS</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">NON-STOP</span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-purple-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Code className="w-4 h-4 text-purple-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">20+ PROBLEMS</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">REAL WORLD</span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-purple-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <Target className="w-4 h-4 text-purple-600 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-mono font-black text-slate-950">1 MISSION</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-slate-600 font-bold uppercase hidden sm:block">AI IMPACT</span>
            </div>
          </div>
        </motion.div>

        {/* COUNTDOWN + WATCH TRAILER + LOCATION DECK */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          
          {/* MINIMAL COUNTDOWN BOX */}
          <div className="p-3.5 rounded-2xl bg-[#0b0818]/95 border border-purple-500/40 backdrop-blur-2xl flex flex-col space-y-1.5 shadow-md">
            <span className="text-[9px] font-mono font-extrabold text-purple-400 uppercase tracking-widest text-center">
              HACKATHON STARTS IN
            </span>
            <div className="flex items-center justify-center gap-2.5 text-center">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">DAYS</span>
              </div>
              <span className="text-lg font-bold text-purple-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">HRS</span>
              </div>
              <span className="text-lg font-bold text-purple-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">MIN</span>
              </div>
              <span className="text-lg font-bold text-purple-400">:</span>
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xs font-mono font-black text-slate-950 max-sm:text-white uppercase tracking-wider group-hover:text-purple-600 transition-colors">
              TRAILER
            </span>
          </button>

          {/* MINIMAL LOCATION INFO */}
          <div className="flex items-start gap-2 max-w-xs text-left">
            <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div className="flex flex-col text-[11px] font-mono text-slate-900 max-sm:text-white leading-tight">
              <span className="font-black text-slate-950 max-sm:text-white uppercase">JYOTHI ENGINEERING COLLEGE (AUTONOMOUS)</span>
              <span className="text-[9px] text-slate-600 max-sm:text-slate-300 font-bold uppercase">DEPT. OF AI & DS</span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM DECK: SHORTENED MINIMAL FEATURE DOCK */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full p-3 sm:p-4 rounded-2xl bg-[#050612]/95 border border-purple-500/30 backdrop-blur-xl shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono"
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">COLLABORATE</span>
        </div>

        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">INNOVATE</span>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">IMPACT</span>
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">WIN & GROW</span>
        </div>
      </motion.div>

    </section>
  );
}

export default FirstLoadHero;

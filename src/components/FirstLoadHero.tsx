import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Code, Target, Play, MapPin, Users, Lightbulb, Globe, Trophy } from "lucide-react";

interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
  onOpenTrailer?: () => void;
}

export function FirstLoadHero({ onOpenRegister: _, onOpenTrailer }: FirstLoadHeroProps) {
  // Live countdown timer targeting 11 September 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 11,
    minutes: 30,
    seconds: 39,
  });

  // Scroll position state for dynamic scroll exit animation
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Calculate scroll offsets for smooth exit animation (rock slides RIGHT, contents slide LEFT)
  const rockScrollOffset = Math.min(1200, scrollY * 0.85);
  const contentScrollOffset = -Math.min(600, scrollY * 0.65);
  const heroContentOpacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section className="relative w-full min-h-screen pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none z-10">
      
      {/* SEPARATE MONOLITH ROCK OVERLAY (5vh TOP MARGIN, ENTERS FROM BELOW WITH SMOOTH EASE, SCROLLS OFF TO RIGHT) */}
      <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 w-screen h-[95vh] pointer-events-none z-10 overflow-hidden">
        <motion.img
          src="/yodha-rock-pc.png"
          alt="Yodha Monolith Rock"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1], // Ultra-smooth cubic bezier ease
          }}
          style={{
            transform: `translateX(${rockScrollOffset}px)`,
          }}
          className="w-full h-full object-cover object-right-bottom filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* HERO MAIN CONTENT GRID (EMERGES FROM BELOW BASELINE + SCROLLS OFF TO LEFT) */}
      <motion.div
        style={{
          transform: `translateX(${contentScrollOffset}px)`,
          opacity: heroContentOpacity,
        }}
        className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto transition-opacity duration-75"
      >
        
        {/* LEFT SIDE CONTENT COLUMN */}
        <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6">
          
          {/* 1. MAIN IMPACT HEADLINE (EMERGES FROM BELOW BASELINE) */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 uppercase leading-[1.02] font-sans"
          >
            BUILD AI SOLUTIONS <br />
            THAT <span className="text-purple-600 font-black">SAVE LIVES</span> <br />
            AND <span className="text-purple-600 font-black">PROTECT</span> <br />
            OUR PLANET.
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-12 h-1 bg-purple-600 rounded-full origin-left"
          />

          {/* 2. SUBTITLE TEXT (TWINKLING / SHIMMER EFFECT ON INITIAL LOAD THEN NORMAL) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0, 0.2, 1, 0.3, 1, 0.6, 1],
              y: 0,
            }}
            transition={{
              opacity: { duration: 1.4, delay: 0.8, times: [0, 0.2, 0.4, 0.6, 0.75, 0.88, 1] },
              y: { duration: 0.8, delay: 0.7, ease: "easeOut" },
            }}
            className="text-base sm:text-lg text-slate-800 max-w-xl font-medium leading-relaxed"
          >
            An autonomous innovation challenge for young minds with{" "}
            <strong className="text-slate-950 font-black">bold ideas</strong> and{" "}
            <strong className="text-purple-600 font-extrabold">bigger impact</strong>.
          </motion.p>

          {/* 3. THREE STAT GLASS CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-2xl pt-2"
          >
            
            {/* CARD 1 */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-purple-300/40 backdrop-blur-xl flex items-center gap-3.5 shadow-md">
              <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-300 p-2 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider">
                  48 HOURS
                </span>
                <span className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                  OF NON-STOP INNOVATION
                </span>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-purple-300/40 backdrop-blur-xl flex items-center gap-3.5 shadow-md">
              <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-300 p-2 flex items-center justify-center shrink-0">
                <Code className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider">
                  20+
                </span>
                <span className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                  REAL-WORLD PROBLEMS
                </span>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-purple-300/40 backdrop-blur-xl flex items-center gap-3.5 shadow-md">
              <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-300 p-2 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider">
                  1 MISSION
                </span>
                <span className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                  TO CREATE IMPACT
                </span>
              </div>
            </div>

          </motion.div>

          {/* 4. COUNTDOWN DECK + TRAILER + LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-6 pt-4 w-full"
          >
            
            {/* COUNTDOWN GLASS DECK */}
            <div className="p-4 rounded-2xl bg-[#0b0818]/95 border border-purple-500/40 backdrop-blur-2xl flex flex-col space-y-2 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <span className="text-[10px] font-mono font-extrabold text-purple-400 uppercase tracking-widest text-center">
                HACKATHON STARTS IN
              </span>
              <div className="flex items-center justify-center gap-3 text-center">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">DAYS</span>
                </div>
                <span className="text-xl font-bold text-purple-400">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">HOURS</span>
                </div>
                <span className="text-xl font-bold text-purple-400">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">MINUTES</span>
                </div>
                <span className="text-xl font-bold text-purple-400">:</span>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">SECONDS</span>
                </div>
              </div>
            </div>

            {/* WATCH TRAILER ACTION */}
            <button
              onClick={() => onOpenTrailer && onOpenTrailer()}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-all">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider group-hover:text-purple-600 transition-colors">
                WATCH TRAILER
              </span>
            </button>

            {/* LOCATION INFO */}
            <div className="flex items-start gap-2.5 max-w-xs text-left ml-auto sm:ml-0">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="flex flex-col text-xs font-mono text-slate-800 space-y-0.5">
                <span className="font-black text-slate-950">
                  JYOTHI ENGINEERING COLLEGE (AUTONOMOUS)
                </span>
                <div className="w-8 h-0.5 bg-purple-600/60 my-0.5" />
                <span className="text-[10px] text-slate-600 font-bold uppercase">
                  DEPT. OF AI & DATA SCIENCE
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>

      {/* 5. BOTTOM FLOATING FEATURE DOCK */}
      <motion.div
        style={{
          transform: `translateY(${Math.min(200, scrollY * 0.4)}px)`,
          opacity: heroContentOpacity,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        className="relative z-20 mt-12 w-full p-4 sm:p-5 rounded-3xl bg-[#050612]/95 border border-purple-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        
        {/* COL 1: COLLABORATE */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-purple-950/90 border border-purple-500/40 p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              COLLABORATE
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Work with brilliant minds from across the nation.
            </span>
          </div>
        </div>

        {/* COL 2: INNOVATE */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-purple-950/90 border border-purple-500/40 p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Lightbulb className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              INNOVATE
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Solve real-world healthcare challenges using AI.
            </span>
          </div>
        </div>

        {/* COL 3: IMPACT */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-purple-950/90 border border-purple-500/40 p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              IMPACT
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Build solutions that create a better tomorrow.
            </span>
          </div>
        </div>

        {/* COL 4: WIN & GROW */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-purple-950/90 border border-purple-500/40 p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              WIN & GROW
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Exciting prizes, mentorship & career opportunities.
            </span>
          </div>
        </div>

      </motion.div>

    </section>
  );
}

export default FirstLoadHero;

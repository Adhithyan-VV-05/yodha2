import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { TextScramble } from "./TextScramble";
import { HeroCommandCenter } from "./HeroCommandCenter";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
}

export function FirstLoadHero({ onOpenRegister }: FirstLoadHeroProps) {
  // Countdown Timer targeting 11 September 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  const handleExploreThemes = () => {
    const el = document.getElementById("tracks");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const timerItems = [
    { label: "D", value: timeLeft.days },
    { label: "H", value: timeLeft.hours },
    { label: "M", value: timeLeft.minutes },
    { label: "S", value: timeLeft.seconds },
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden pt-12 sm:pt-20 pb-8 flex items-center justify-center">
      {/* Interactive Command Hub & Landing Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Tight & Properly Spaced Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* LEFT COLUMN: Interactive Hackathon Command Hub */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col justify-center items-center order-1 lg:order-1 w-full relative z-20 pointer-events-auto"
            >
              <HeroCommandCenter onOpenRegister={onOpenRegister} />
            </motion.div>

            {/* RIGHT COLUMN: Kinetic Hero Banner & Metadata */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">

              {/* Dynamic Animated Y-O-D-H-A Title Banner */}
              <div className="mb-2 w-full flex justify-center lg:justify-start">
                <YodhaTitleBanner size="lg" align="left" />
              </div>

              {/* Tagline Capsule Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5 }}
                onClick={() => onOpenRegister()}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-600 backdrop-blur-xl text-xs font-mono text-slate-200 mb-4 shadow-md cursor-pointer relative z-30 pointer-events-auto group"
              >
                <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-extrabold tracking-widest uppercase text-white text-[11px] sm:text-xs">
                  <TextScramble text="INNOVATE • IMPACT — BE A WARRIOR OF AI" revealDuration={1000} />
                </span>
              </motion.div>

              {/* Institution Metadata Tags */}
              <div className="w-full max-w-xl mb-3">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="text-[11px] sm:text-xs font-mono font-extrabold text-white uppercase tracking-wider bg-slate-900/90 border border-sky-400/40 px-3 py-1 rounded-full shadow-sm">
                    JYOTHI ENGINEERING COLLEGE (AUTONOMOUS)
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-300 border border-white/20 px-3 py-1 rounded-full bg-black/40">
                    DEPT OF AI & DATA SCIENCE
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-1 text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed"
              >
                A 48-hour national-level innovation challenge bringing together engineering students to build AI solutions that <strong className="text-white font-bold">save lives</strong> and <strong className="text-cyan-300 font-bold">protect our planet</strong>.
              </motion.p>

              {/* Sci-Fi Circular Countdown Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 w-full max-w-xl mx-auto lg:mx-0 relative select-none"
              >
                {/* Sci-Fi Header Bar */}
                <div className="relative flex items-center justify-center mb-3 w-full px-1">
                  <div className="flex-1 flex items-center gap-1">
                    <div className="w-2 h-2 border-l-2 border-t-2 border-cyan-400 -rotate-45" />
                    <div className="h-[2px] w-full bg-gradient-to-r from-sky-500/90 via-cyan-400 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                  </div>

                  <div className="px-3 text-center shrink-0">
                    <span className="text-xs sm:text-sm font-mono font-black tracking-widest text-cyan-300 uppercase">
                      HACKATHON STARTS IN
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                    <div className="h-[2px] w-full bg-gradient-to-l from-sky-500/90 via-cyan-400 to-transparent" />
                    <div className="w-2 h-2 border-r-2 border-t-2 border-cyan-400 rotate-45" />
                  </div>
                </div>

                {/* 4 Circular Pods Grid */}
                <div className="relative w-full flex items-center justify-center">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-0 pointer-events-none" />

                  <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full relative z-10">
                    {timerItems.map((item) => (
                      <div
                        key={item.label}
                        className="relative aspect-square flex flex-col items-center justify-center group"
                      >
                        {/* Inner Disc */}
                        <div className="absolute inset-[12%] rounded-full bg-[#030919]/90 backdrop-blur-md border border-cyan-400/30 pointer-events-none z-0 overflow-hidden" />

                        {/* Metallic Frame Image */}
                        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-spin-slow">
                          <img
                            src="/countdown circle.webp"
                            alt={item.label}
                            className="w-full h-full object-contain pointer-events-none"
                            style={{
                              WebkitBackfaceVisibility: "hidden",
                              backfaceVisibility: "hidden",
                              transform: "translateZ(0)",
                            }}
                          />
                        </div>

                        {/* Centered Numbers */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
                          <div className="relative font-digital flex items-center justify-center leading-none">
                            <span className="font-digital text-2xl sm:text-4xl font-normal text-cyan-950/40 select-none pointer-events-none tracking-wider leading-none">
                              88
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center font-digital text-2xl sm:text-4xl font-normal text-cyan-300 tracking-wider leading-none">
                              {String(item.value).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Unit Label */}
                        <div className="absolute bottom-[16%] left-0 right-0 z-20 flex items-center justify-center text-center pointer-events-none">
                          <span className="text-[10px] sm:text-xs font-mono font-bold text-sky-400/90 tracking-widest uppercase">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
              >
                <button
                  onClick={() => onOpenRegister()}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-black font-black text-xs sm:text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer pointer-events-auto"
                >
                  <span>REGISTER TEAM NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExploreThemes}
                  className="px-5 py-3 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm tracking-wider uppercase hover:border-cyan-400 hover:text-white transition-all cursor-pointer pointer-events-auto"
                >
                  EXPLORE TRACKS
                </button>
              </motion.div>

            </div>

        </div>

      </div>
    </section>
  );
}

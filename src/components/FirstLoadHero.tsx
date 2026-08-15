import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Clock, Sparkles, Cpu, Shield } from "lucide-react";
import { TextScramble } from "./TextScramble";
import { SplineScene } from "@/components/ui/splite";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface FirstLoadHeroProps {
  onOpenRegister: () => void;
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
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden min-h-screen pt-20 sm:pt-28 pb-16 flex items-center justify-center">
      {/* Interactive 3D Robot Core & Landing Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-140px)]">

            {/* LEFT COLUMN: Interactive 3D Robot with Sleek Bottom Tech Frame */}
            <div className="lg:col-span-5 flex flex-col justify-start items-center order-1 lg:order-1 w-full -mt-2 sm:-mt-6 lg:-mt-10 self-start">
              <div className="w-full max-w-xl h-[300px] sm:h-[450px] lg:h-[560px] relative flex justify-center items-center overflow-visible select-none pointer-events-auto scale-90 sm:scale-95 lg:scale-100 origin-top">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  showChestLogo={true}
                />

                {/* Sleek Tech Dock Bottom Base Frame for the Robot */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center">
                  <div className="px-5 py-1 rounded-full bg-slate-950/90 border border-slate-700 backdrop-blur-xl shadow-xl text-center flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-[10px] font-mono font-extrabold text-slate-200 tracking-widest uppercase">
                      YODHA AI ROBOTIC CORE
                    </span>
                  </div>
                  <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-1" />
                </div>

                {/* Bottom Edge Gradient Fade Mask */}
                <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-gradient-to-t from-[#020510] via-[#020510]/75 to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* RIGHT COLUMN: Kinetic Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">

              {/* Dynamic Animated Y-O-D-H-A Title Letters (Reveals on Screen 2) */}
              <div className="mb-4">
                <YodhaTitleBanner size="lg" align="left" />
              </div>

              {/* "BE A WARRIOR OF AI" METALLIC SILVER & SAPPHIRE BLUE CAPSULE BADGE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.7 }}
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/90 border border-slate-600 backdrop-blur-xl text-xs font-mono text-slate-200 mb-6 shadow-lg cursor-pointer relative z-30 pointer-events-auto group"
              >
                <Shield className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="font-extrabold tracking-widest uppercase text-white">
                  <TextScramble text="BE A WARRIOR OF AI" revealDuration={1000} />
                </span>
              </motion.div>

              {/* HACKATHON TITLE TAGS */}
              <div className="w-full max-w-xl mb-3">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="text-xs font-mono font-extrabold text-slate-100 uppercase tracking-widest bg-slate-900/90 border border-blue-500/40 px-3.5 py-1.5 rounded-full shadow-md">
                    NATIONAL AI HACKATHON 2.0
                  </span>
                  <span className="text-xs font-mono text-slate-300 border border-white/20 px-3.5 py-1.5 rounded-full">
                    SEP 11-12, 2026
                  </span>
                </div>
              </div>

              {/* SUBTITLE */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
              >
                A 24-hour national-level AI hackathon where engineering students build intelligent solutions to solve real-world <strong className="text-white font-bold">healthcare</strong> and <strong className="text-blue-300 font-bold">environmental challenges</strong>.
              </motion.p>

              {/* HIGH-IMPACT COUNTDOWN WIDGET */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 w-full max-w-xl p-4 sm:p-5 rounded-3xl bg-slate-950/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-[11px] font-mono text-slate-200 uppercase tracking-widest font-extrabold">
                      <TextScramble text="COUNTDOWN TO LAUNCH" revealDuration={800} />
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 border border-white/20 px-2 py-0.5 rounded-full">
                    SEP 11, 2026
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {timerItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 relative overflow-hidden group hover:border-blue-400 transition-colors"
                    >
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 tracking-wider font-bold mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ACTION CTA BUTTONS (REALISTIC METALLIC SILVER) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-30 pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenRegister}
                  className="btn-metallic-silver w-full sm:w-auto px-8 py-4 text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest cursor-pointer relative z-30 pointer-events-auto group"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform" />
                  <span>REGISTER NOW</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  onClick={handleExploreThemes}
                  className="btn-metallic-outline w-full sm:w-auto px-8 py-4 text-xs sm:text-sm rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xl relative z-30 pointer-events-auto"
                >
                  <Cpu className="w-4 h-4 text-slate-300" />
                  <span>EXPLORE THEMES</span>
                </button>
              </motion.div>

              {/* VALUE PROPOSITION BADGES */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-xl border-t border-white/10 pt-6"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-blue-500/30 text-blue-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block leading-tight">24 Hours</span>
                    <span className="text-[10px] text-slate-400 font-mono">Non-stop building</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-600 text-slate-200">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block leading-tight">AI-Focused</span>
                    <span className="text-[10px] text-slate-400 font-mono">Healthcare & Nature</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-blue-500/30 text-blue-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block leading-tight">₹70,000 Pool</span>
                    <span className="text-[10px] text-slate-400 font-mono">INR Cash Bounties</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
    </section>
  );
}

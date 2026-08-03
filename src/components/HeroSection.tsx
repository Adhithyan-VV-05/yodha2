import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Clock, Sparkles, Users, Cpu, ShieldCheck, Lock } from "lucide-react";
import { KineticText } from "./KineticText";
import { ThreeDHeroVisual } from "./ThreeDHeroVisual";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
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

  // Helper for circular progress rings
  const timerItems = [
    { label: "DAYS", value: timeLeft.days, max: 365, color: "#38bdf8" },
    { label: "HOURS", value: timeLeft.hours, max: 24, color: "#818cf8" },
    { label: "MINS", value: timeLeft.minutes, max: 60, color: "#c084fc" },
    { label: "SECS", value: timeLeft.seconds, max: 60, color: "#34d399" },
  ];

  return (
    <section id="about" className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center overflow-hidden">
      {/* Dynamic Ambient Background Orbs */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-30, 30, -30],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-gradient-to-tr from-sky-500/20 via-indigo-500/15 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [30, -30, 30],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Prominent 3D Black Sphere Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="w-full max-w-lg relative flex justify-center items-center overflow-hidden">
              <ThreeDHeroVisual bounceEntrance={true} />
            </div>
          </div>

          {/* RIGHT COLUMN: Kinetic Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">

            {/* "BE A WARRIOR OF AI" GLOWING CAPSULE BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/30 via-indigo-500/30 to-purple-500/30 border border-sky-400/80 backdrop-blur-xl text-xs font-mono text-sky-200 mb-6 shadow-[0_0_30px_rgba(56,189,248,0.8)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <span className="font-extrabold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]">
                BE A WARRIOR OF AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
            >
              <KineticText words={["INNOVATE", "PROTECT", "DIAGNOSE", "TRANSFORM", "CONQUER"]} />
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-400">
                YODHA Hackathon 2026
              </span>
            </motion.h1>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              A 24-hour national-level AI hackathon where engineering students build intelligent solutions to solve real-world <span className="text-sky-400 font-bold">healthcare</span> and <span className="text-emerald-400 font-bold">environmental challenges</span>.
            </motion.p>

            {/* CYBERPUNK HOLOGRAPHIC RADIAL COUNTDOWN TIMER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950/90 via-sky-950/40 to-slate-950/90 border border-sky-400/30 backdrop-blur-2xl max-w-lg w-full shadow-[0_0_35px_rgba(56,189,248,0.2)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                  <span>COUNTDOWN TO LAUNCH</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  SEP 11, 2026
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {timerItems.map((item, idx) => {
                  const strokeDashoffset = 150 - (150 * (item.value % item.max)) / item.max;
                  return (
                    <div key={idx} className="flex flex-col items-center relative group">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                        {/* Circular SVG Ring */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                          <circle
                            cx="30"
                            cy="30"
                            r="24"
                            className="text-white/10"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="transparent"
                          />
                          <motion.circle
                            cx="30"
                            cy="30"
                            r="24"
                            stroke={item.color}
                            strokeWidth="4"
                            strokeDasharray="150"
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>

                        {/* Digits Display */}
                        <motion.span
                          key={item.value}
                          initial={{ scale: 1.2, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute text-lg sm:text-2xl font-black font-mono text-white tracking-tighter"
                        >
                          {String(item.value).padStart(2, "0")}
                        </motion.span>
                      </div>

                      <span className="text-[10px] font-mono font-bold text-slate-300 mt-1 uppercase tracking-widest">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(56,189,248,0.6)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onOpenRegister();
                  const el = document.getElementById("register");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold rounded-2xl shadow-[0_10px_30px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-widest uppercase cursor-pointer relative z-30 pointer-events-auto"
              >
                <Sparkles className="w-4 h-4 text-sky-200 animate-spin" />
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExploreThemes}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-widest uppercase cursor-pointer relative z-30 pointer-events-auto"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Explore Themes</span>
              </motion.button>
            </motion.div>

            {/* Event Highlights Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg"
            >
              {[
                { icon: <Clock className="w-4 h-4 text-sky-400" />, title: "24 Hours", desc: "Non-stop building" },
                { icon: <Cpu className="w-4 h-4 text-emerald-400" />, title: "AI-Focused", desc: "Healthcare & Nature" },
                { icon: <Users className="w-4 h-4 text-indigo-400" />, title: "National Level", desc: "Pan-India hackers" },
                { icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, title: "Prototypes", desc: "Live product demos" },
                { icon: <Trophy className="w-4 h-4 text-amber-400" />, title: "₹70,000 Pool", desc: "INR Cash Bounties" },
                { icon: <Sparkles className="w-4 h-4 text-pink-400" />, title: "Mentorship", desc: "Industry experts" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl text-left shadow-md hover:border-white/20 transition-all"
                >
                  <div className="p-2 bg-white/5 rounded-xl shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* SECRET RIDDLE CHALLENGE PROMOTIONAL CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-950/90 to-amber-950/50 border border-purple-500/40 backdrop-blur-2xl w-[95vw] max-w-[95vw] mx-auto shadow-[0_0_40px_rgba(168,85,247,0.25)] text-left relative overflow-hidden"
            >
              {/* Lock Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>SECRET RIDDLE CHALLENGE</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  UNLOCKING SOON • STAY TUNED
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-white mb-1">
                Solve the Riddle & Avail 80% Discount on Selection of Your Team!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                The official Yodha 2.0 AI riddle challenge will be unlocked soon. Solve it correctly to claim an exclusive <strong className="text-amber-300">80% discount</strong> on team selection fees!
              </p>

              {/* Riddle Input Form Placeholder (Locked State) */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative w-full flex-1">
                  <input
                    type="text"
                    disabled
                    placeholder="Enter riddle answer... (Unlocking Soon, Stay Tuned)"
                    className="w-full px-4 py-2.5 bg-black/60 border border-purple-500/30 rounded-xl text-xs text-slate-400 placeholder:text-slate-500 focus:outline-none cursor-not-allowed select-none opacity-80 font-mono"
                  />
                </div>
                <button
                  disabled
                  className="w-full sm:w-auto px-5 py-2.5 bg-purple-900/40 text-purple-300/70 border border-purple-500/30 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed opacity-80 shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Submit Answer</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

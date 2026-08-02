import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Clock, Sparkles, Flame, Zap } from "lucide-react";
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
        className="absolute bottom-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Prominent 3D Black Sphere Visual (Seamless Transition) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="w-full max-w-md relative flex justify-center items-center overflow-hidden">
              <ThreeDHeroVisual bounceEntrance={true} />
            </div>
          </div>

          {/* RIGHT COLUMN: Kinetic Content & CTAs with Smooth Entrance Stagger */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2">

            {/* Top Date Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-400/30 backdrop-blur-xl text-xs font-mono text-sky-300 mb-6 shadow-[0_0_25px_rgba(56,189,248,0.3)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <span className="font-bold tracking-widest uppercase">
                SEPTEMBER 11, 2026 • REGISTRATION OPEN
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
            >
              <KineticText words={["BUILD", "INNOVATE", "CREATE", "CONQUER", "TRANSFORM"]} />
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-400">
                THE FUTURE AT YODHA 2.0
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              Join elite creators, engineers, and visionaries for a 24-hour non-stop hackathon starting <span className="text-sky-400 font-bold">September 11, 2026</span>. Build next-generation applications, win prizes, and make your mark.
            </motion.p>

            {/* Countdown Cards targeting 11 September 2026 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 grid grid-cols-4 gap-3 bg-gradient-to-r from-white/[0.05] via-white/[0.03] to-white/[0.05] border border-white/10 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl max-w-md w-full shadow-2xl"
            >
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-sky-400">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
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
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold rounded-2xl shadow-[0_10px_30px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-200 animate-spin" />
                <span>Register Team Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href="#tracks"
                className="w-full sm:w-auto px-8 py-4 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-100 font-bold rounded-2xl backdrop-blur-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm tracking-widest uppercase"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Explore Tracks</span>
              </a>
            </motion.div>

            {/* Event Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg"
            >
              {[
                { icon: <Clock className="w-4 h-4 text-sky-400" />, title: "Sep 11, 2026", desc: "24-hr building frenzy" },
                { icon: <Trophy className="w-4 h-4 text-amber-400" />, title: "₹70,000 Pool", desc: "Grand Prize & bounties" },
                { icon: <Flame className="w-4 h-4 text-purple-400" />, title: "Hybrid Event", desc: "Online & On-site" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl text-left shadow-md hover:border-white/20 transition-all"
                >
                  <div className="p-2.5 bg-white/5 rounded-xl shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

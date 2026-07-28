import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Clock, Globe, Sparkles } from "lucide-react";
import { KineticText } from "./KineticText";
import logo from "../assets/logo.png";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Tilt for Logo Container
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="relative min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center justify-center overflow-hidden">
      {/* Soft Floating Gradient Mesh (No hard edges) */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-25, 25, -25],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Split Grid: Left Big Logo on PC / Scaled Responsive Logo on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Smooth Borderless Logo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="perspective-1000 w-full max-w-[280px] sm:max-w-sm lg:max-w-none cursor-pointer group"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full aspect-square bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent rounded-3xl backdrop-blur-2xl p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow group-hover:shadow-[0_20px_80px_rgba(56,189,248,0.2)]"
              >
                {/* Soft Radial Backlight Glow Behind Logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-indigo-500/15 to-purple-500/15 rounded-3xl blur-3xl opacity-50 group-hover:opacity-90 transition duration-700 pointer-events-none" />

                {/* Big Yodha Logo - Scaled Fluidly */}
                <img
                  src={logo}
                  alt="Yodha 2.0 Logo"
                  className="w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_35px_rgba(56,189,248,0.6)] group-hover:scale-105 transition-transform duration-500 relative z-10"
                />

                <div className="mt-4 sm:mt-6 flex flex-col items-center text-center relative z-10">
                  <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
                    YODHA <span className="text-sky-400">2.0</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">
                    THE ULTIMATE HACKATHON
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Responsive Kinetic Content & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Smooth Top Date Capsule (No hard border stroke) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md text-xs font-mono text-sky-300 mb-6 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="font-medium tracking-wide">
                JULY 28 – 30, 2026 • REGISTRATION OPEN
              </span>
            </motion.div>

            {/* Fluid Kinetic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.15]"
            >
              <KineticText words={["CRAFTING", "ENGINEERING", "INVENTING", "FORGING", "DESIGNING"]} />
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-1 sm:mt-0">THE NEXT GENERATION OF WEB APPS</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              Assemble your team for Yodha 2.0 — a premier 24-hour global frontend hackathon where developers and designers build award-worthy web applications.
            </motion.p>

            {/* Smooth Countdown Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 grid grid-cols-4 gap-2 sm:gap-4 bg-white/[0.03] backdrop-blur-xl p-3 sm:p-5 rounded-2xl max-w-md w-full shadow-xl"
            >
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-300">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-[0_10px_30px_rgba(56,189,248,0.35)] hover:shadow-[0_15px_40px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-wide uppercase"
              >
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Register Your Team</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href="#tracks"
                className="w-full sm:w-auto px-8 py-4 bg-white/[0.05] text-slate-200 hover:text-white hover:bg-white/[0.1] font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center text-xs sm:text-sm tracking-wide uppercase"
              >
                <span>Explore Tracks</span>
              </a>
            </motion.div>

            {/* Smooth Event Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg"
            >
              {[
                { icon: <Clock className="w-4 h-4 text-sky-400" />, title: "24 Hours", desc: "Non-stop building" },
                { icon: <Trophy className="w-4 h-4 text-amber-400" />, title: "$25,000", desc: "Total prize pool" },
                { icon: <Globe className="w-4 h-4 text-indigo-400" />, title: "Global Access", desc: "Online & Hybrid" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] backdrop-blur-md rounded-xl text-left shadow-sm"
                >
                  <div className="p-2 bg-white/5 rounded-lg shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
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

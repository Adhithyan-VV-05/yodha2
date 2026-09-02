import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Lightbulb,
  Rocket,
  Users,
  Network,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function WhyParticipateSection() {
  const [activeTab, setActiveTab] = useState(0);

  const BENEFITS = [
    {
      id: "prizes",
      num: "01",
      title: "₹70,000 Cash Pool & Trophies",
      subtitle: "Compete for top national cash rewards, official trophies, plaques, & cloud infrastructure credits.",
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      badge: "NATIONAL REWARDS",
      stat: "₹70,000 Pool",
      highlight: "1st Prize: ₹35,000 + Trophy",
      color: "from-amber-500/20 via-amber-500/10 to-transparent",
      accentColor: "text-amber-400",
      borderColor: "border-amber-500/40",
      glowColor: "shadow-[0_0_30px_rgba(245,158,11,0.25)]",
      points: [
        "1st Prize: ₹35,000 Cash + National Winner Trophy",
        "2nd Prize: ₹20,000 Cash + Runner-Up Trophy",
        "3rd Prize: ₹10,000 Cash + Excellence Plaque",
        "Special Innovation Track Award: ₹5,000 Cash",
      ],
    },
    {
      id: "impact",
      num: "02",
      title: "Solve Real-World AI Problems",
      subtitle: "Address critical challenges in Healthcare disease prediction and Environmental AI monitoring.",
      icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
      badge: "REAL-WORLD IMPACT",
      stat: "Healthcare & Eco",
      highlight: "UN SDG Aligned Tracks",
      color: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/40",
      glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.25)]",
      points: [
        "Build computer vision disease diagnostic models",
        "Deploy urban clean energy & water monitoring AI",
        "Direct alignment with United Nations SDGs",
        "Live judging by industry domain experts",
      ],
    },
    {
      id: "marathon",
      num: "03",
      title: "48-Hour Coding Marathon",
      subtitle: "Transform abstract ideas into functional, deployable AI prototypes in an intense 48-hour sprint.",
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      badge: "48H OFFLINE SPRINT",
      stat: "48H Non-Stop",
      highlight: "High-Octane Building",
      color: "from-blue-500/20 via-blue-500/10 to-transparent",
      accentColor: "text-blue-400",
      borderColor: "border-blue-500/40",
      glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.25)]",
      points: [
        "48-hour non-stop hackathon sprint at JEC campus",
        "High-speed infrastructure & meal access provided",
        "Live prototype testing & final stage presentation",
        "Battle alongside top AI developers across India",
      ],
    },
    {
      id: "network",
      num: "04",
      title: "National Innovator Network",
      subtitle: "Form high-performance teams with talented engineers, researchers, and designers across India.",
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      badge: "TOP TALENT HUB",
      stat: "100+ Innovators",
      highlight: "Cross-College Teams",
      color: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/40",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.25)]",
      points: [
        "Network with top technical talent nationwide",
        "Lifetime access to YODHA AI Innovator Community",
        "Find co-founders & project research collaborators",
        "Direct recruitment spotlight for standout builders",
      ],
    },
    {
      id: "mentorship",
      num: "05",
      title: "1-on-1 Expert Mentorship",
      subtitle: "Get technical feedback and architectural guidance from industry software architects & AI researchers.",
      icon: <Network className="w-6 h-6 text-purple-400" />,
      badge: "EXPERT GUIDANCE",
      stat: "Industry Mentors",
      highlight: "Live Code Reviews",
      color: "from-purple-500/20 via-purple-500/10 to-transparent",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/40",
      glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.25)]",
      points: [
        "1-on-1 architectural reviews during building hours",
        "Guidance on model deployment & API scaling",
        "Pitch feedback before final jury presentation",
        "Incubation pathway opportunities post-hackathon",
      ],
    },
    {
      id: "certification",
      num: "06",
      title: "National Certification",
      subtitle: "Receive official participant and winner certificates from Jyothi Engineering College to boost your resume.",
      icon: <Award className="w-6 h-6 text-sky-400" />,
      badge: "OFFICIAL CREDENTIALS",
      stat: "KTU Approved",
      highlight: "National Certificate",
      color: "from-sky-500/20 via-sky-500/10 to-transparent",
      accentColor: "text-sky-400",
      borderColor: "border-sky-500/40",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.25)]",
      points: [
        "Verified national certificates signed by JEC authorities",
        "Eligible for official KTU academic activity points",
        "Shareable digital badges for LinkedIn & GitHub",
        "Official recognition for high-impact innovation",
      ],
    },
  ];

  const current = BENEFITS[activeTab];

  return (
    <section id="why-participate" className="py-2 sm:py-4 relative overflow-hidden bg-transparent text-white select-none w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans leading-none"
          >
            WHY PARTICIPATE IN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              YODHA 2.0?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Explore the core advantages of joining South India's premier AI hackathon sprint at Jyothi Engineering College.
          </motion.p>
        </div>

        {/* DYNAMIC INTERACTIVE COMMAND HUB (NO GENERIC CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: INTERACTIVE ADVANTAGE NAVIGATION MATRIX (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            {BENEFITS.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                    isActive
                      ? "bg-slate-900/90 border-cyan-400/80 shadow-[0_0_25px_rgba(56,189,248,0.25)] translate-x-1"
                      : "bg-[#040a1b]/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-sky-300 to-blue-500 rounded-r-full"
                    />
                  )}

                  <div className="flex items-center gap-3.5 relative z-10">
                    <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-950/80 border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-105"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 group-hover:text-cyan-300"
                    }`}>
                      {item.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {item.num}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.2 rounded border ${
                          isActive
                            ? "bg-cyan-950 border-cyan-400/40 text-cyan-300"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}>
                          {item.stat}
                        </span>
                      </div>
                      <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                        isActive ? "text-white font-black" : "text-slate-300 group-hover:text-white"
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="relative z-10 shrink-0 ml-2">
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? "text-cyan-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: EXPANDED COMMAND TERMINAL DISPLAY DECK (7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`w-full rounded-3xl p-6 sm:p-8 bg-[#03091c]/90 border ${current.borderColor} backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between ${current.glowColor}`}
              >
                {/* Background Ambient Glow */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${current.color} blur-3xl pointer-events-none rounded-full opacity-60`} />
                
                {/* Metallic Card Frame Image Texture */}
                <img
                  src="/metallic_card_frame.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-20 mix-blend-screen"
                />

                <div className="relative z-10">
                  {/* Top Bar Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                        {current.badge}
                      </span>
                    </div>

                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border bg-slate-900/90 ${current.borderColor} ${current.accentColor}`}>
                      {current.highlight}
                    </span>
                  </div>

                  {/* Main Title & Subtitle */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-4 rounded-2xl border bg-slate-900/90 ${current.borderColor} shrink-0`}>
                      {current.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        ADVANTAGE {current.num} OF 06
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                    {current.subtitle}
                  </p>

                  {/* Key Highlights Grid */}
                  <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-6 space-y-3">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>INCLUDED ADVANTAGE BREAKDOWN</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${current.accentColor}`} />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Info */}
                <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${current.accentColor}`} />
                    <span>YODHA 2.0 National Hackathon Standard</span>
                  </div>
                  <span className="text-slate-300 font-bold">
                    Jyothi Engineering College
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM METRIC ADVANTAGE HIGHLIGHT BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 select-none"
        >
          {[
            { label: "Total Cash Pool", val: "₹70,000", sub: "Trophies + Cash Awards" },
            { label: "Offline Sprint", val: "48 Hours", sub: "Non-stop AI Building" },
            { label: "National Reach", val: "100+ Builders", sub: "Cross-Institutional" },
            { label: "KTU Eligible", val: "Activity Points", sub: "National Certification" },
          ].map((m, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#040a1b]/70 border border-slate-800/80 text-center hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
            >
              <div className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white font-mono">
                {m.val}
              </div>
              <div className="text-xs font-bold text-white mt-1">{m.label}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

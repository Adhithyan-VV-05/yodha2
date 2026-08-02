import { motion } from "framer-motion";
import { Activity, Heart, Brain, Stethoscope, Globe2, Leaf, Target, Shield, Lightbulb, Users2, Rocket, Sparkles, Quote } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

export function AboutSection() {
  const WHAT_YOULL_BUILD = [
    { title: "Disease Prevention", category: "HEALTHCARE HUD", icon: <Activity className="w-6 h-6 text-sky-400" />, desc: "Predictive early warning systems & health risk forecasting.", accent: "from-sky-500/20 via-sky-500/5 to-transparent", border: "border-sky-500/30" },
    { title: "Healthcare Solutions", category: "PATIENT CARE", icon: <Heart className="w-6 h-6 text-rose-400" />, desc: "Patient monitoring, tele-health, and accessible care systems.", accent: "from-rose-500/20 via-rose-500/5 to-transparent", border: "border-rose-500/30" },
    { title: "Medical Diagnosis", category: "NEURAL AI", icon: <Brain className="w-6 h-6 text-purple-400" />, desc: "AI-assisted clinical imaging analysis and diagnostic intelligence.", accent: "from-purple-500/20 via-purple-500/5 to-transparent", border: "border-purple-500/30" },
    { title: "AI Decision Support", category: "CLINICAL ENGINE", icon: <Stethoscope className="w-6 h-6 text-indigo-400" />, desc: "Real-time clinical decision engines for doctors and caregivers.", accent: "from-indigo-500/20 via-indigo-500/5 to-transparent", border: "border-indigo-500/30" },
    { title: "Environmental Monitoring", category: "SATELLITE RADAR", icon: <Globe2 className="w-6 h-6 text-emerald-400" />, desc: "Smart satellite & IoT monitoring for air, water, and ecosystem health.", accent: "from-emerald-500/20 via-emerald-500/5 to-transparent", border: "border-emerald-500/30" },
    { title: "Sustainable Living", category: "GREEN TECH", icon: <Leaf className="w-6 h-6 text-teal-400" />, desc: "AI tools for renewable energy, waste management, and green cities.", accent: "from-teal-500/20 via-teal-500/5 to-transparent", border: "border-teal-500/30" },
  ];

  const MISSION_CARDS = [
    { num: "01", title: "Problem Solving", desc: "Inspire engineering students to solve critical real-world problems using Artificial Intelligence.", icon: <Lightbulb className="w-5 h-5 text-amber-400" /> },
    { num: "02", title: "Sustainability", desc: "Promote groundbreaking innovation in healthcare accessibility and environmental sustainability.", icon: <Leaf className="w-5 h-5 text-emerald-400" /> },
    { num: "03", title: "Preventive Care", desc: "Advance AI for disease prevention, diagnosis accuracy, treatment support, and universal health care.", icon: <Heart className="w-5 h-5 text-rose-400" /> },
    { num: "04", title: "Intelligent Tech", desc: "Develop cutting-edge intelligent technologies addressing climate & environmental challenges.", icon: <Globe2 className="w-5 h-5 text-sky-400" /> },
    { num: "05", title: "Industry Bridge", desc: "Bridge academia and industry through active cross-pollination, technical mentorship, and guidance.", icon: <Users2 className="w-5 h-5 text-indigo-400" /> },
    { num: "06", title: "Social Impact", desc: "Foster student entrepreneurship, social impact ventures, and commercialization pathways.", icon: <Rocket className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#04060c]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* 1. ABOUT YODHA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-sky-400" />
              <span>ABOUT THE HACKATHON</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Empowering the Next Generation of AI Warriors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
            >
              <strong className="text-white">YODHA Hackathon</strong> is a 24-hour national-level innovation challenge that empowers engineering students to transform bold ideas into impactful AI-powered solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              Participants collaborate in high-energy teams, innovate under guidance from industry mentors, and build practical functional prototypes addressing real-world healthcare and environmental problems.
            </motion.p>
          </div>

          <div className="lg:col-span-6">
            <Card3DTilt intensity={12}>
              <div className="p-8 rounded-3xl bg-gradient-to-b from-sky-500/15 via-indigo-950/40 to-slate-950 border border-sky-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 text-sky-400/20">
                  <Shield className="w-32 h-32" />
                </div>
                <span className="px-3 py-1 bg-sky-400/20 border border-sky-400/30 rounded-full text-[11px] font-mono text-sky-300 font-bold uppercase tracking-widest">
                  24-Hour AI Challenge
                </span>
                <h3 className="text-2xl font-black text-white mt-4">Pan-India Innovation Hub</h3>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" /> Open to all Engineering & Tech Students
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" /> ₹70,000 INR Cash Prize Pool + Bounties
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" /> Direct Seed Incubation & Cloud Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" /> Expert Mentorship & Live Prototype Demos
                  </li>
                </ul>
              </div>
            </Card3DTilt>
          </div>
        </div>

        {/* 2. WHAT YOU'LL BUILD (Unique HUD Cards with Minimalistic Motion) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2 font-bold"
            >
              SOLUTION DOMAINS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              AI Solutions That Make a Difference
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOULL_BUILD.map((item, idx) => (
              <Card3DTilt key={idx} intensity={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, ease: "easeOut" }}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${item.accent} border ${item.border} backdrop-blur-xl transition-all duration-300 group relative overflow-hidden shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                      className="p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              </Card3DTilt>
            ))}
          </div>
        </div>

        {/* 3. VISION & PHILOSOPHY */}
        <Card3DTilt intensity={8}>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950/60 via-indigo-950/60 to-purple-950/60 border border-sky-400/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-8">
            <div className="p-5 rounded-2xl bg-sky-500/20 border border-sky-400/40 shrink-0">
              <Quote className="w-10 h-10 text-sky-300" />
            </div>

            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block font-bold mb-1">
                OUR VISION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                To Build India's Premier AI Innovation Platform
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                To build one of India's leading AI innovation platforms where students, researchers, startups, and industry experts collaborate to create intelligent technologies that improve healthcare and protect the environment.
              </p>
              
              <div className="mt-5 p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-amber-300 font-mono italic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>"Prevention is Better Than Cure." — Inspired by this philosophy, YODHA encourages innovations that prevent future challenges while solving existing real-world problems through Artificial Intelligence.</span>
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* 4. MISSION (6 Hex-Structured Cards with Minimalistic Floating Badges) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2 font-bold"
            >
              OUR MISSION
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              Driven by Six Core Pillars
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MISSION_CARDS.map((card, idx) => (
              <Card3DTilt key={idx} intensity={10}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] via-slate-950/80 to-slate-950 border border-white/10 hover:border-indigo-400/40 backdrop-blur-xl h-full flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                        {card.icon}
                      </div>
                      <span className="font-mono text-xs font-extrabold text-sky-300 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-400/30 shadow-sm">
                        PILLAR {card.num}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{card.desc}</p>
                  </div>
                </motion.div>
              </Card3DTilt>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

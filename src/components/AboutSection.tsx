import { motion } from "framer-motion";
import { Activity, Heart, Brain, Stethoscope, Globe2, Leaf, Target, Shield, Lightbulb, Users2, Rocket, Sparkles, Quote, RotateCw } from "lucide-react";
import { Card3DFlip } from "./Card3DFlip";

export function AboutSection() {
  const WHAT_YOULL_BUILD = [
    { title: "Disease Prevention", category: "HEALTHCARE HUD", icon: <Activity className="w-8 h-8 text-sky-400" />, desc: "Predictive early warning AI systems & population health risk forecasting.", tags: ["Predictive AI", "Risk Models", "Early Warning"], glow: "rgba(56, 189, 248, 0.4)", flipDir: "horizontal" as const },
    { title: "Healthcare Solutions", category: "PATIENT CARE", icon: <Heart className="w-8 h-8 text-rose-400" />, desc: "Patient monitoring, remote tele-health, and accessible clinical care tools.", tags: ["Telehealth", "Patient Care", "Smart Monitoring"], glow: "rgba(244, 63, 94, 0.4)", flipDir: "vertical" as const },
    { title: "Medical Diagnosis", category: "NEURAL AI", icon: <Brain className="w-8 h-8 text-purple-400" />, desc: "AI-assisted clinical imaging analysis, MRI/CT scans, and diagnostic intelligence.", tags: ["Medical Vision", "Diagnostics", "Neural Net"], glow: "rgba(192, 132, 252, 0.4)", flipDir: "zoomSlide" as const },
    { title: "AI Decision Support", category: "CLINICAL ENGINE", icon: <Stethoscope className="w-8 h-8 text-indigo-400" />, desc: "Real-time clinical decision support engines for doctors and triage caregivers.", tags: ["Clinical AI", "Triage", "Doctor Support"], glow: "rgba(129, 140, 248, 0.4)", flipDir: "horizontal" as const },
    { title: "Environmental Monitoring", category: "SATELLITE RADAR", icon: <Globe2 className="w-8 h-8 text-emerald-400" />, desc: "Smart satellite & IoT sensor monitoring for air, water, and ecosystem health.", tags: ["IoT Sensors", "Satellite Radar", "Ecology"], glow: "rgba(52, 211, 153, 0.4)", flipDir: "vertical" as const },
    { title: "Sustainable Living", category: "GREEN TECH", icon: <Leaf className="w-8 h-8 text-teal-400" />, desc: "AI tools for renewable energy optimization, waste management, and green cities.", tags: ["Clean Energy", "Green Cities", "Recycling"], glow: "rgba(45, 212, 191, 0.4)", flipDir: "zoomSlide" as const },
  ];

  const MISSION_CARDS = [
    { num: "01", title: "Problem Solving", desc: "Inspire engineering students to solve critical real-world problems using Artificial Intelligence.", icon: <Lightbulb className="w-6 h-6 text-amber-400" />, flipDir: "vertical" as const },
    { num: "02", title: "Sustainability", desc: "Promote groundbreaking innovation in healthcare accessibility and environmental sustainability.", icon: <Leaf className="w-6 h-6 text-emerald-400" />, flipDir: "horizontal" as const },
    { num: "03", title: "Preventive Care", desc: "Advance AI for disease prevention, diagnosis accuracy, treatment support, and universal health care.", icon: <Heart className="w-6 h-6 text-rose-400" />, flipDir: "zoomSlide" as const },
    { num: "04", title: "Intelligent Tech", desc: "Develop cutting-edge intelligent technologies addressing climate & environmental challenges.", icon: <Globe2 className="w-6 h-6 text-sky-400" />, flipDir: "vertical" as const },
    { num: "05", title: "Industry Bridge", desc: "Bridge academia and industry through active cross-pollination, technical mentorship, and guidance.", icon: <Users2 className="w-6 h-6 text-indigo-400" />, flipDir: "horizontal" as const },
    { num: "06", title: "Social Impact", desc: "Foster student entrepreneurship, social impact ventures, and commercialization pathways.", icon: <Rocket className="w-6 h-6 text-purple-400" />, flipDir: "zoomSlide" as const },
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
            <Card3DFlip
              flipDirection="horizontal"
              glowColor="rgba(56, 189, 248, 0.5)"
              className="h-80"
              front={
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 rounded-2xl bg-sky-500/20 border border-sky-400/40 mb-4">
                    <Shield className="w-12 h-12 text-sky-400" />
                  </div>
                  <span className="px-3 py-1 bg-sky-400/20 border border-sky-400/30 rounded-full text-[11px] font-mono text-sky-300 font-bold uppercase tracking-widest mb-2">
                    PAN-INDIA HUB
                  </span>
                  <h3 className="text-2xl font-black text-white">24-Hour AI Challenge</h3>
                  <span className="text-xs font-mono text-slate-400 mt-3 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin" /> Tap / Hover to reveal details
                  </span>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <span className="px-3 py-1 bg-sky-400/20 border border-sky-400/30 rounded-full text-[10px] font-mono text-sky-300 font-bold uppercase tracking-widest block w-fit mb-3">
                      HACKATHON OVERVIEW
                    </span>
                    <h4 className="text-xl font-black text-white mb-3">National Innovation Platform</h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-medium">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Open to all Engineering & Tech Students
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" /> ₹70,000 INR Cash Prize Pool + Bounties
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Direct Seed Incubation & Cloud Credits
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Expert Mentorship & Live Demos
                      </li>
                    </ul>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3">
                    September 11th & 12th, 2026
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* 2. WHAT YOU'LL BUILD (Brief Front Cards -> 3D Flip Back Cards) */}
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
            <span className="text-xs font-mono text-slate-400 mt-2 block">
              Tap / Hover any card to flip and explore domain details
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOULL_BUILD.map((item, idx) => (
              <Card3DFlip
                key={idx}
                flipDirection={item.flipDir}
                glowColor={item.glow}
                className="h-64"
                front={
                  <div className="flex flex-col items-center justify-center text-center my-auto">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-3">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] font-mono text-slate-400 mt-3 flex items-center gap-1 opacity-75">
                      <RotateCw className="w-3 h-3 text-sky-400 animate-spin" /> Tap / Hover to flip
                    </span>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-500/30 uppercase tracking-wider block w-fit mb-2">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        {/* 3. VISION & PHILOSOPHY */}
        <Card3DFlip
          flipDirection="scale"
          glowColor="rgba(56, 189, 248, 0.5)"
          className="min-h-[300px] sm:min-h-[260px]"
          front={
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full p-6 sm:p-8 my-auto text-center md:text-left">
              <div className="p-5 rounded-2xl bg-sky-500/20 border border-sky-400/40 shrink-0">
                <Quote className="w-10 h-10 text-sky-300" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block font-bold mb-1">
                  OUR VISION & PHILOSOPHY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  "Prevention is Better Than Cure."
                </h3>
                <span className="text-xs font-mono text-slate-400 mt-2 block flex items-center justify-center md:justify-start gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin" /> Tap / Hover to flip & read full vision statement
                </span>
              </div>
            </div>
          }
          back={
            <div className="flex flex-col justify-between h-full text-left p-4 sm:p-6 space-y-4">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block font-bold mb-1">
                  FULL VISION STATEMENT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  India's Premier AI Innovation Platform
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  To build one of India's leading AI innovation platforms where students, researchers, startups, and industry experts collaborate to create intelligent technologies that improve healthcare and protect the environment.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-sky-500/30 text-xs text-amber-300 font-mono italic">
                Inspired by "Prevention is Better Than Cure", YODHA encourages innovations that prevent future challenges while solving existing real-world problems.
              </div>
            </div>
          }
        />

        {/* 4. MISSION (6 Hex Cards with Smooth 3D Flip Animations) */}
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
              <Card3DFlip
                key={idx}
                flipDirection={card.flipDir}
                glowColor="rgba(129, 140, 248, 0.4)"
                className="h-60"
                front={
                  <div className="flex flex-col items-center justify-center text-center my-auto">
                    <span className="font-mono text-xs font-extrabold text-sky-300 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-400/30 mb-3">
                      PILLAR {card.num}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-2">
                      {card.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white">{card.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 flex items-center gap-1 opacity-75">
                      <RotateCw className="w-3 h-3 text-sky-400 animate-spin" /> Tap / Hover to flip
                    </span>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-sky-400">PILLAR {card.num}</span>
                        {card.icon}
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{card.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">{card.desc}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                      YODHA 2.0 Mission Pillar
                    </span>
                  </div>
                }
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

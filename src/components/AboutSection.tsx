import { motion } from "framer-motion";
import { Target, Shield, Sparkles, RotateCw } from "lucide-react";
import { Card3DFlip } from "./Card3DFlip";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ABOUT YODHA & JYOTHI ENGINEERING COLLEGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-cyan-400" />
              <span>ABOUT THE HACKATHON</span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400 tracking-tight leading-tight"
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
              <strong className="text-white">YODHA — Warriors of AI</strong> is a 48-hour national-level innovation challenge organized by the <strong className="text-white">Department of Artificial Intelligence & Data Science</strong> at <strong className="text-cyan-300 font-bold">Jyothi Engineering College (Autonomous), Cheruthuruthy, Thrissur</strong>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              Established in 2002, NAAC 'A' Grade & NBA accredited Jyothi Engineering College fosters research, incubation with TATA Technologies (IIIC) & JEC TBI. YODHA brings engineering students together to build deployable AI prototypes that solve critical healthcare and environmental challenges.
            </motion.p>
          </div>

          <div className="lg:col-span-6">
            <Card3DFlip
              flipDirection="horizontal"
              bgImage={CARD_BACKGROUNDS.about.challenge}
              className="h-80"
              front={
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 mb-4 shadow-md">
                    <Shield className="w-12 h-12 text-cyan-300" />
                  </div>
                  <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-[11px] font-mono text-slate-200 font-bold uppercase tracking-widest mb-2">
                    JYOTHI ENGINEERING COLLEGE
                  </span>
                  <h3 className="text-2xl font-black text-white">48-Hour AI Innovation Challenge</h3>
                  <span className="text-xs font-mono text-slate-400 mt-3 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Tap / Hover to reveal details
                  </span>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest block w-fit mb-3">
                      DEPT OF AI & DATA SCIENCE
                    </span>
                    <h4 className="text-xl font-black text-white mb-2">Building Intelligent Solutions</h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-medium">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Established in 2002 • NAAC 'A' Grade Accredited
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> First AI & DS Dept in Kerala (ESTD 2020, KTU)
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> TATA Technologies IIIC & JEC TBI Incubation
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 48-Hour Offline Coding Marathon at JEC Auditorium
                      </li>
                    </ul>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3">
                    Website: yodha.aidajecc.in • Cheruthuruthy, Thrissur
                  </span>
                </div>
              }
            />
          </div>
        </div>

      </div>
    </section>
  );
}

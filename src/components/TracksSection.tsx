import { motion } from "framer-motion";
import { Cpu, ArrowRight, ShieldCheck, HeartPulse, Stethoscope } from "lucide-react";

interface TracksSectionProps {
  onSelectTrack?: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare") => void;
}

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  const healthRoboSrc = encodeURI("/health robo.webp");

  return (
    <section id="tracks" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white select-none z-10">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Health Robot Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          onClick={() => onOpenTrackPage("healthcare")}
          className="lg:col-span-5 flex justify-center cursor-pointer group"
        >
          <img
            src={healthRoboSrc}
            alt="Healthcare AI Track"
            className="w-full h-auto max-h-[460px] object-contain filter drop-shadow-[0_15px_30px_rgba(239,68,68,0.35)] group-hover:scale-105 transition-all duration-300"
          />
        </motion.div>

        {/* Right Column: Healthcare Track Details & Problem Statements */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans"
          >
            Healthcare AI Track
          </motion.h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            Transform clinical diagnostic workflows with machine learning models, medical image analysis, early disease prediction, and real-time patient monitoring algorithms.
          </p>

          {/* Key Focus Highlights Grid */}
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-200">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/85 border border-purple-500/30">
              <HeartPulse className="w-4 h-4 text-red-400 shrink-0" />
              <span>AI Disease Diagnostics</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/85 border border-purple-500/30">
              <Stethoscope className="w-4 h-4 text-red-400 shrink-0" />
              <span>Medical Computer Vision</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/85 border border-purple-500/30">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
              <span>Predictive Clinical Care</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/85 border border-purple-500/30">
              <Cpu className="w-4 h-4 text-red-400 shrink-0" />
              <span>Generative AI for Healthcare</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenTrackPage("healthcare")}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:brightness-110 hover:scale-105 transition-all cursor-pointer"
            >
              <span>EXPLORE ALL 20 PROBLEM STATEMENTS</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TracksSection;

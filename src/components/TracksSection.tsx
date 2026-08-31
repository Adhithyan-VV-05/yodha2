import { motion } from "framer-motion";
import { Cpu, Activity, ArrowRight, ShieldCheck, HeartPulse, Stethoscope } from "lucide-react";

interface TracksSectionProps {
  onSelectTrack?: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare") => void;
}

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  const healthRoboSrc = encodeURI("/health robo.webp");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-white select-none py-1">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        
        {/* Left Column: Health Robot Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          onClick={() => onOpenTrackPage("healthcare")}
          className="lg:col-span-5 flex justify-center cursor-pointer group"
        >
          <img
            src={healthRoboSrc}
            alt="Healthcare AI Track"
            className="w-full h-[40vh] sm:h-[48vh] lg:h-[55vh] max-h-[460px] object-contain filter drop-shadow-[0_15px_30px_rgba(239,68,68,0.35)] group-hover:scale-105 transition-all duration-300"
          />
        </motion.div>

        {/* Right Column: Healthcare Track Details & Problem Statements */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 font-mono text-xs font-bold uppercase tracking-widest">
            <Activity className="w-4 h-4 text-red-400" />
            <span>CORE THEME • HEALTHCARE AI INNOVATION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Healthcare AI Track
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Transform clinical diagnostic workflows with machine learning models, medical image analysis, early disease prediction, and real-time patient monitoring algorithms.
          </p>

          {/* Key Focus Highlights Grid */}
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-slate-200">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <HeartPulse className="w-4 h-4 text-red-400 shrink-0" />
              <span>AI Disease Diagnostics</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <Stethoscope className="w-4 h-4 text-red-400 shrink-0" />
              <span>Medical Computer Vision</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
              <span>Predictive Clinical Care</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <Cpu className="w-4 h-4 text-red-400 shrink-0" />
              <span>Smart Hospital Systems</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              onClick={() => onOpenTrackPage("healthcare")}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-red-500 via-rose-600 to-red-700 text-white font-black text-xs sm:text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>EXPLORE HEALTHCARE PROBLEM STATEMENTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TracksSection;

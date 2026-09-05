import { motion } from "framer-motion";
import { Cpu, ArrowRight, ShieldCheck, HeartPulse, Stethoscope, Activity, FileText } from "lucide-react";

interface TracksSectionProps {
  onSelectTrack?: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare") => void;
}

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  const healthRoboSrc = encodeURI("/health robo.webp");

  return (
    <section id="tracks" className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 select-none z-10">
      
      {/* 1ST HALF LIGHT THEME CONTAINER (AS IT WAS BEFORE) */}
      <div className="max-w-6xl mx-auto w-full p-6 sm:p-10 lg:p-12 rounded-3xl bg-white/90 border border-blue-200 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Health Robot Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          onClick={() => onOpenTrackPage("healthcare")}
          className="lg:col-span-5 flex flex-col items-center justify-center cursor-pointer group relative"
        >
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

          <img
            src={healthRoboSrc}
            alt="Healthcare AI Track"
            className="w-full h-auto max-h-[460px] object-contain filter drop-shadow-[0_15px_30px_rgba(239,68,68,0.3)] group-hover:scale-105 transition-all duration-300 relative z-10"
          />
        </motion.div>

        {/* Right Column: Healthcare Track Details & Problem Statements */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
              <Activity className="w-4 h-4 text-red-600 animate-pulse" />
              <span>CORE THEME • HEALTHCARE AI INNOVATION</span>
            </span>

            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start space-y-2"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-normal leading-snug font-heading text-slate-950 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span>THE</span>
                <span className="text-red-600 font-black">HEALTHCARE</span>
                <span>THEME</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 w-24 bg-gradient-to-r from-red-600 via-rose-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)] origin-left"
              />
            </motion.div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
            Leverage Machine Learning and Python to revolutionize disease prediction, early diagnosis, and patient monitoring. Build smart, data-driven solutions that improve accessibility and enhance the future of healthcare services.
          </p>

          {/* Key Focus Highlights Grid */}
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-900">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 transition-colors shadow-sm">
              <HeartPulse className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-950 text-xs">AI Disease Diagnostics</span>
                <span className="text-[10px] text-slate-600">Early anomaly detection</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 transition-colors shadow-sm">
              <Stethoscope className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-950 text-xs">Medical Computer Vision</span>
                <span className="text-[10px] text-slate-600">X-Ray & MRI segmentation</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 transition-colors shadow-sm">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-950 text-xs">Predictive Clinical Care</span>
                <span className="text-[10px] text-slate-600">Patient risk stratification</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 transition-colors shadow-sm">
              <Cpu className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-950 text-xs">Generative Healthcare AI</span>
                <span className="text-[10px] text-slate-600">Clinical LLM assistants</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenTrackPage("healthcare")}
              className="px-7 py-4 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-lg hover:brightness-110 hover:scale-105 transition-all cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>EXPLORE ALL PS</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TracksSection;

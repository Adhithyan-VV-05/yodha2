import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";

export function RiddleTeaserSection() {
  return (
    <section className="py-6 relative z-20 flex justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-[95vw] max-w-[95vw] mx-auto p-5 sm:p-7 rounded-3xl bg-slate-950/95 border border-blue-500/40 backdrop-blur-2xl shadow-2xl text-left relative overflow-hidden flex flex-col justify-between shine-sweep"
      >
        {/* Generated Metallic Silver Cyber Border Overlay */}
        <div className="absolute inset-0 pointer-events-none z-15 border-2 border-slate-300/40 rounded-3xl overflow-hidden">
          <img src="/riddle_border.webp" alt="" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
        </div>

        {/* Background Cipher Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={CARD_BACKGROUNDS.riddle.cipher}
            alt=""
            className="w-full h-full object-cover object-center opacity-20 filter brightness-90 contrast-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-[#020617]/70 z-10" />
        </div>

        <div className="relative z-20">
          {/* Lock Badge Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-200 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>SECRET RIDDLE CHALLENGE</span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
              UNLOCKING SOON • STAY TUNED
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
            <span>Solve the Riddle & Avail 80% Discount on Selection of Your Team!</span>
            <Sparkles className="w-5 h-5 text-blue-300 shrink-0 hidden sm:inline" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5 max-w-4xl">
            The official Yodha 2.0 AI riddle challenge will be unlocked soon. Solve it correctly to claim an exclusive <strong className="text-white font-bold">80% discount</strong> on your team selection fees!
          </p>

          {/* Riddle Input Form Placeholder (Locked State) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <input
                type="text"
                disabled
                placeholder="Enter riddle answer... (Unlocking Soon, Stay Tuned)"
                className="w-full px-4 py-3 bg-black/60 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-400 placeholder:text-slate-500 focus:outline-none cursor-not-allowed select-none opacity-80 font-mono"
              />
            </div>
            <button
              disabled
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-slate-200 via-white to-slate-300 text-slate-950 border border-white/80 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider cursor-not-allowed opacity-80 shrink-0 flex items-center justify-center gap-2 shadow-md"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Submit Answer</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

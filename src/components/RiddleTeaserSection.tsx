import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function RiddleTeaserSection() {
  return (
    <section className="py-6 relative z-20 flex justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-[95vw] max-w-[95vw] mx-auto p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-950/95 to-amber-950/60 border border-purple-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] text-left relative overflow-hidden flex flex-col justify-between"
      >
        {/* Lock Badge Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>SECRET RIDDLE CHALLENGE</span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            UNLOCKING SOON • STAY TUNED
          </span>
        </div>

        <h3 className="text-lg sm:text-2xl font-black text-white mb-2">
          Solve the Riddle & Avail 80% Discount on Selection of Your Team!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5 max-w-4xl">
          The official Yodha 2.0 AI riddle challenge will be unlocked soon. Solve it correctly to claim an exclusive <strong className="text-amber-300">80% discount</strong> on your team selection fees!
        </p>

        {/* Riddle Input Form Placeholder (Locked State) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-1">
            <input
              type="text"
              disabled
              placeholder="Enter riddle answer... (Unlocking Soon, Stay Tuned)"
              className="w-full px-4 py-3 bg-black/60 border border-purple-500/30 rounded-xl text-xs sm:text-sm text-slate-400 placeholder:text-slate-500 focus:outline-none cursor-not-allowed select-none opacity-80 font-mono"
            />
          </div>
          <button
            disabled
            className="w-full sm:w-auto px-6 py-3 bg-purple-900/40 text-purple-300/70 border border-purple-500/30 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider cursor-not-allowed opacity-80 shrink-0 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Submit Answer</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

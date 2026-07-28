import { motion } from "framer-motion";
import { Trophy, Award, Gift, Check, Sparkles } from "lucide-react";

interface PrizesSectionProps {
  onOpenRegister: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section id="prizes" className="py-16 sm:py-24 relative overflow-hidden bg-[#04060b]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2 font-semibold"
          >
            REWARDS & BOUNTIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            $25,000 Total Prize Pool
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
          >
            Recognizing exceptional engineering, design craft, and product innovation.
          </motion.p>
        </div>

        {/* Podium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col justify-between hover:scale-[1.01] transition-all backdrop-blur-xl order-2 md:order-1 shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                <Award className="w-6 h-6 text-slate-300" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Second Place
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-5">$6,000</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> Silver Yodha Trophy & Certificate
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> $5,000 Cloud Credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> Mentorship & Network Access
                </li>
              </ul>
            </div>
          </motion.div>

          {/* 1st Place - Grand Champion */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }, opacity: { duration: 0.6 } }}
            className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-amber-500/15 via-slate-950/90 to-slate-950 flex flex-col justify-between shadow-[0_20px_50px_rgba(245,158,11,0.15)] relative overflow-hidden order-1 md:order-2 md:-translate-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Trophy className="w-7 h-7 text-amber-300 animate-pulse" />
                </div>
                <span className="px-3 py-1 bg-amber-500/20 rounded-full text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                  Grand Champion
                </span>
              </div>

              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                First Place Winner
              </span>
              <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 mt-1 mb-5">
                $10,000
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-amber-100/90 font-medium">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Gold Yodha 2.0 Award
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Direct Seed Venture Incubation
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Keynote Slot at Global Conference
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Developer Hardware Kit
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenRegister}
              className="mt-6 sm:mt-8 w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold rounded-xl shadow-lg hover:brightness-110 transition-all text-xs uppercase tracking-wider"
            >
              Register to Participate
            </motion.button>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }, opacity: { duration: 0.6 } }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col justify-between hover:scale-[1.01] transition-all backdrop-blur-xl order-3 shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                <Gift className="w-6 h-6 text-amber-500" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Third Place
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-5">$4,000</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> Bronze Yodha Plaque
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> $2,500 Cloud Credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" /> Developer Tool Subscriptions
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Category Bounties Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950/20 via-indigo-950/20 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-xl">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block font-semibold">
              SPECIAL BOUNTIES
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
              $5,000 Category & Community Awards
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Awarded for Best AI Integration, Best Motion Graphic, Accessibility Excellence, and People's Choice Winner.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="w-full md:w-auto px-6 py-3.5 bg-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-all uppercase tracking-wider shrink-0"
          >
            Submit Entry
          </button>
        </div>
      </div>
    </section>
  );
}

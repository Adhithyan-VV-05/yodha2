import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Gift, Check, Sparkles } from "lucide-react";
import { ThreeDTrophy } from "./ThreeDTrophy";
import { Card3DTilt } from "./Card3DTilt";

interface PrizesSectionProps {
  onOpenRegister: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  const [isInView, setIsInView] = useState(false);

  return (
    <section id="prizes" className="py-16 sm:py-24 relative overflow-hidden bg-[#04060b]">
      {/* Radial Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2 font-bold"
          >
            REWARDS & CASH BOUNTIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-tight"
          >
            ₹70,000 Prize Pool
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
          >
            All prize rewards are disbursed in Indian Rupees (INR) along with mentorship and credits.
          </motion.p>
        </motion.div>

        {/* Podium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
          
          {/* 2nd Place - Silver Trophy (#2) */}
          <Card3DTilt intensity={14} className="order-2 md:order-1 flex" glowColor="rgba(226, 232, 240, 0.35)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-400/10 via-slate-950/90 to-slate-950 border border-slate-400/30 flex flex-col justify-between backdrop-blur-xl w-full shadow-2xl"
            >
              <ThreeDTrophy rank={2} isInView={isInView} spawnDelay={0.5} />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-400/20 border border-slate-400/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-slate-200" />
                  </div>
                  <span className="px-3 py-1 bg-slate-400/20 border border-slate-400/30 rounded-full text-[10px] font-mono text-slate-200 uppercase tracking-widest font-bold">
                    Silver Medal
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                  Second Place Winner
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-5">₹20,000</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> Silver Yodha Trophy & Plaque
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> ₹25,000 Cloud Infrastructure Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> Mentorship & Network Access
                  </li>
                </ul>
              </div>
            </motion.div>
          </Card3DTilt>

          {/* 1st Place - Gold Trophy (#1) */}
          <Card3DTilt intensity={18} className="order-1 md:order-2 md:-translate-y-4 flex" glowColor="rgba(245, 158, 11, 0.45)">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-500/20 via-slate-950/95 to-slate-950 border border-amber-500/50 flex flex-col justify-between shadow-[0_20px_60px_rgba(245,158,11,0.3)] relative overflow-hidden w-full"
            >
              <ThreeDTrophy rank={1} isInView={isInView} spawnDelay={0} />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Trophy className="w-5 h-5 text-amber-300 animate-pulse" />
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                    Grand Champion
                  </span>
                </div>

                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-bold">
                  First Place Winner
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 mt-1 mb-5">
                  ₹40,000
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-amber-100/90 font-medium">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Official Gold Yodha 2.0 Award
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> ₹50,000 Cloud & AI Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Direct Seed Incubation Slot
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Premium Developer Hardware Kit
                  </li>
                </ul>
              </div>
            </motion.div>
          </Card3DTilt>

          {/* 3rd Place - Bronze Trophy (#3) */}
          <Card3DTilt intensity={14} className="order-3 flex" glowColor="rgba(217, 119, 6, 0.35)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-900/15 via-slate-950/90 to-slate-950 border border-amber-700/30 flex flex-col justify-between backdrop-blur-xl w-full shadow-2xl"
            >
              <ThreeDTrophy rank={3} isInView={isInView} spawnDelay={0.5} />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-700/20 border border-amber-700/30 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="px-3 py-1 bg-amber-700/20 border border-amber-700/30 rounded-full text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                    Bronze Medal
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                  Third Place Winner
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-5">₹10,000</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> Bronze Yodha Plaque
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> ₹15,000 Infrastructure Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" /> Pro Developer Tool Subscriptions
                  </li>
                </ul>
              </div>
            </motion.div>
          </Card3DTilt>
        </div>

        {/* Special INR Bounties Card with Register Now CTA */}
        <Card3DTilt intensity={8} className="w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-xl">
            <div className="text-center md:text-left">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block font-bold">
                SPECIAL BOUNTIES & AWARDS
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                ₹10,000 Category & Community Prizes
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Awarded for Best AI Integration, Best Design Experience, Accessibility Excellence, and People's Choice Winner.
              </p>
            </div>

            <button
              onClick={onOpenRegister}
              className="px-8 py-3.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl uppercase tracking-widest shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:brightness-110 transition-all cursor-pointer shrink-0 relative z-30 pointer-events-auto flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-200 animate-spin" />
              <span>Register Now</span>
            </button>
          </div>
        </Card3DTilt>

      </div>
    </section>
  );
}

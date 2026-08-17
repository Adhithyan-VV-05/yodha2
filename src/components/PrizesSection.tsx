import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Award, Gift, Check, Sparkles, ShieldCheck } from "lucide-react";

interface PrizesSectionProps {
  onOpenRegister: () => void;
}

function ViewportCenterTrophyCard({
  children,
  trophyImgSrc,
  trophyAlt,
  baseTilt = 0,
  className = "",
}: {
  children: React.ReactNode;
  trophyImgSrc: string;
  trophyAlt: string;
  glowColorClass?: string;
  baseTilt?: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"],
  });

  // 3D Trophy Breakout Float: Float upward (-32px) and scale (1.25x) outside card border at center
  const trophyY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, -32, 0]);
  const trophyScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [1, 1.25, 1]);

  return (
    <div ref={cardRef} className="w-full relative py-6 sm:py-0">
      {/* Fixed Card Shell with overflow-visible to allow 3D trophy breakout float */}
      <div
        style={{ transform: `rotate(${baseTilt}deg)` }}
        className={`relative overflow-visible transition-shadow duration-300 ${className}`}
      >
        {/* Metallic Border Overlay */}
        <div className="absolute inset-0 pointer-events-none z-15 border-2 border-slate-400/30 rounded-3xl overflow-hidden">
          <img src="/about_border.png" alt="" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
        </div>

        <div className="relative z-20">
          {/* Full-Visibility 3D Trophy Image */}
          <div className="relative w-full h-44 sm:h-56 mb-4 flex items-center justify-center overflow-visible">
            <motion.img
              style={{ y: trophyY, scale: trophyScale }}
              src={trophyImgSrc}
              alt={trophyAlt}
              className="h-full w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] group-hover:rotate-3 transition-transform duration-500 relative z-30 origin-bottom"
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section id="prizes" className="py-20 sm:py-28 relative overflow-hidden bg-transparent text-white z-20">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>NATIONAL PRIZE REWARDS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400 tracking-tight">
            ₹70,000 Prize Pool
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Direct INR cash prizes, incubation slots, seed support, and cloud credits awarded to top AI innovation teams.
          </p>
        </motion.div>

        {/* 3D Tilted Full-Visibility Trophy Podium Deck (MOBILE ORDER: GOLD 1st, SILVER 2nd, BRONZE 3rd) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-end mb-12 relative z-20">
          
          {/* 1ST PLACE - GOLD CHAMPION TROPHY CARD (Mobile Order 1, Desktop Center) */}
          <ViewportCenterTrophyCard
            trophyImgSrc="/gold.png"
            trophyAlt="Gold Yodha Champion Trophy"
            glowColorClass="bg-amber-500/20"
            baseTilt={0}
            className="order-1 md:order-2 p-7 sm:p-8 rounded-3xl bg-slate-950/98 border-2 border-amber-400/70 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group cursor-pointer border-t-amber-300"
          >
            <div className="flex items-center justify-between mb-3 border-t border-amber-500/20 pt-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xs font-mono text-amber-300 uppercase tracking-wider font-extrabold">
                1ST PLACE WINNER
              </span>
            </div>

            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-400 mb-4 font-mono">
              ₹30,000
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 font-medium">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> 4K Gold Yodha 2.0 Winner Trophy
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> ₹50,000 Cloud & AI Credits
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Direct Seed Incubation Slot
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> Pro Developer Hardware Kit
              </li>
            </ul>
          </ViewportCenterTrophyCard>

          {/* 2ND PLACE - SILVER TROPHY CARD (Mobile Order 2, Desktop Left, Tilted -4deg) */}
          <ViewportCenterTrophyCard
            trophyImgSrc="/silver.png"
            trophyAlt="Silver Yodha Trophy"
            glowColorClass="bg-slate-400/10"
            baseTilt={-4}
            className="order-2 md:order-1 p-6 sm:p-7 rounded-3xl bg-slate-950/95 border border-slate-400/50 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group border-t-white/90 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 border-t border-slate-800 pt-4">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Award className="w-5 h-5 text-slate-200" />
              </div>
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">
                2ND PLACE WINNER
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 font-mono">₹20,000</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> Silver Yodha Trophy & Plaque
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> ₹25,000 Cloud Infrastructure Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> Technical Mentorship & Network
              </li>
            </ul>
          </ViewportCenterTrophyCard>

          {/* 3RD PLACE - BRONZE TROPHY CARD (Mobile Order 3, Desktop Right, Tilted +4deg) */}
          <ViewportCenterTrophyCard
            trophyImgSrc="/bronze.png"
            trophyAlt="Bronze Yodha Trophy"
            glowColorClass="bg-amber-700/10"
            baseTilt={4}
            className="order-3 md:order-3 p-6 sm:p-7 rounded-3xl bg-slate-950/95 border border-amber-700/50 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group border-t-amber-600/80 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 border-t border-slate-800 pt-4">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-800/60 flex items-center justify-center">
                <Gift className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-xs font-mono text-amber-500/90 uppercase tracking-wider font-bold">
                3RD PLACE WINNER
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 font-mono">₹10,000</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> Bronze Yodha Medal & Plaque
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> ₹15,000 Infrastructure Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" /> Pro Developer Tool Subscriptions
              </li>
            </ul>
          </ViewportCenterTrophyCard>

        </div>

        {/* Special Track Bounties & Community Awards Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-500/40 shrink-0">
              <ShieldCheck className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest font-extrabold block mb-1">
                SPECIAL TRACK BOUNTIES • ₹10,000 INR
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Best AI Integration, Best Design & Community Choice Awards
              </h4>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="btn-metallic-silver px-8 py-3.5 text-xs rounded-2xl uppercase tracking-widest shrink-0 cursor-pointer"
          >
            Register Team to Win
          </button>
        </motion.div>

 

        {/* Special Track Bounties & Community Awards Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-500/40 shrink-0">
              <ShieldCheck className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest font-extrabold block mb-1">
                SPECIAL TRACK BOUNTIES • ₹10,000 INR
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Best AI Integration, Best Design & Community Choice Awards
              </h4>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="btn-metallic-silver px-8 py-3.5 text-xs rounded-2xl uppercase tracking-widest shrink-0 cursor-pointer"
          >
            Register Team to Win
          </button>
        </motion.div>

      </div>
    </section>
  );
}



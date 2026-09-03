import { motion } from "framer-motion";

interface PrizesSectionProps {
  onOpenRegister?: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section id="prizes" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto select-none z-10">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-12">
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading"
        >
          PRIZE POOL & <span className="text-purple-400">REWARDS</span>
        </motion.h2>

        <p className="text-sm sm:text-base text-slate-200 font-medium">
          Battle it out for a massive total prize pool of ₹70,000!
        </p>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Claim the champion's title and walk away with the ₹30,000 first prize. Innovate, create an impact, and earn your share of the rewards, including a special ₹5,000 award for standout tech.
        </p>
      </div>

      {/* 3 PODIUM CARDS - HORIZONTALLY SCROLLABLE ON MOBILE, SNAP-CENTER */}
      <div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 items-stretch w-full max-w-5xl mx-auto px-4 py-4 scrollbar-none justify-start md:justify-center">
        
        {/* 1ST PLACE - GOLD CARD */}
        <div
          onClick={() => onOpenRegister && onOpenRegister()}
          className="w-[85vw] max-w-[340px] md:w-auto shrink-0 snap-center p-6 sm:p-8 rounded-3xl bg-[#030816]/90 border-2 border-amber-400 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-full h-48 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <img
              src="/gold.webp"
              alt="1st Place Gold Trophy"
              className="max-h-44 object-contain filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.45)] group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="w-full pt-4 space-y-2">
            <span className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-widest block">
              1ST PLACE WINNER
            </span>

            <div className="h-[1px] w-16 bg-amber-500/40 mx-auto my-2" />

            <h3 className="text-4xl font-black text-amber-300 font-mono">
              ₹30,000
            </h3>

            <p className="text-xs font-medium text-slate-300 leading-relaxed pt-2">
              Gold Trophy • Seed Incubation Slot • AI Cloud Credits • KTU Certification
            </p>
          </div>
        </div>

        {/* 2ND PLACE - SILVER CARD */}
        <div
          onClick={() => onOpenRegister && onOpenRegister()}
          className="w-[85vw] max-w-[340px] md:w-auto shrink-0 snap-center p-6 sm:p-8 rounded-3xl bg-[#030816]/90 border border-slate-400 backdrop-blur-2xl shadow-[0_0_25px_rgba(148,163,184,0.2)] flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-full h-48 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-slate-400/10 rounded-full blur-2xl pointer-events-none" />
            <img
              src="/silver.webp"
              alt="2nd Place Silver Trophy"
              className="max-h-44 object-contain filter drop-shadow-[0_10px_20px_rgba(148,163,184,0.35)] group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="w-full pt-4 space-y-2">
            <span className="text-xs font-mono font-extrabold text-slate-300 uppercase tracking-widest block">
              2ND PLACE RUNNER-UP
            </span>

            <div className="h-[1px] w-16 bg-slate-400/40 mx-auto my-2" />

            <h3 className="text-4xl font-black text-slate-200 font-mono">
              ₹20,000
            </h3>

            <p className="text-xs font-medium text-slate-300 leading-relaxed pt-2">
              Silver Trophy • Mentorship Track • AI Credits • KTU Certification
            </p>
          </div>
        </div>

        {/* 3RD PLACE - BRONZE CARD */}
        <div
          onClick={() => onOpenRegister && onOpenRegister()}
          className="w-[85vw] max-w-[340px] md:w-auto shrink-0 snap-center p-6 sm:p-8 rounded-3xl bg-[#030816]/90 border border-amber-700/60 backdrop-blur-2xl shadow-[0_0_25px_rgba(180,83,9,0.2)] flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-full h-48 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-amber-700/10 rounded-full blur-2xl pointer-events-none" />
            <img
              src="/bronze.webp"
              alt="3rd Place Bronze Trophy"
              className="max-h-44 object-contain filter drop-shadow-[0_10px_20px_rgba(180,83,9,0.35)] group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="w-full pt-4 space-y-2">
            <span className="text-xs font-mono font-extrabold text-amber-500 uppercase tracking-widest block">
              3RD PLACE EXCELLENCE
            </span>

            <div className="h-[1px] w-16 bg-amber-700/40 mx-auto my-2" />

            <h3 className="text-4xl font-black text-amber-400 font-mono">
              ₹10,000
            </h3>

            <p className="text-xs font-medium text-slate-300 leading-relaxed pt-2">
              Excellence Plaque • AI Credits • KTU Certification
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PrizesSection;

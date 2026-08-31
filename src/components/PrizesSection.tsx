import { Trophy } from "lucide-react";

interface PrizesSectionProps {
  onOpenRegister?: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section id="prizes-page" className="relative w-full h-full flex flex-col justify-between py-2 sm:py-4 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. PC / DESKTOP VIEW (EXACT MATCH TO LEFT SIDE OF PRIZES MOCKUP)          */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex flex-col justify-between h-full w-full py-2 items-center">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto my-auto space-y-1.5">
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>NATIONAL TROPHY PODIUM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            ₹70,000 National Cash{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Pool
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3 w-48 mx-auto pt-1">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
        </div>

        {/* 3 EQUAL VERTICAL CARDS GRID */}
        <div className="grid grid-cols-3 gap-6 items-stretch w-full max-w-5xl my-auto">
          
          {/* 1ST PLACE - GOLD CARD (GLOWING GOLD BORDER) */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-6 rounded-3xl bg-[#030816]/90 border-2 border-amber-400 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col items-center justify-between text-center cursor-pointer hover:scale-102 transition-all group"
          >
            <div className="w-full h-44 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <img
                src="/gold.webp"
                alt="1st Place Gold Trophy"
                className="max-h-40 object-contain filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.45)] group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="w-full pt-2 space-y-1">
              <span className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-widest block">
                1ST PLACE WINNER
              </span>

              <div className="h-[1px] w-12 bg-amber-500/40 mx-auto my-1" />

              <h3 className="text-3xl font-black text-amber-300 font-mono">
                ₹30,000
              </h3>

              <p className="text-[11px] font-medium text-slate-300 leading-snug pt-1">
                Gold Trophy • Seed Incubation Slot • AI Cloud Credits
              </p>
            </div>
          </div>

          {/* 2ND PLACE - SILVER CARD */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-6 rounded-3xl bg-[#030816]/90 border border-slate-500/40 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-between text-center cursor-pointer hover:scale-102 transition-all group"
          >
            <div className="w-full h-44 flex items-center justify-center relative">
              <img
                src="/silver.webp"
                alt="2nd Place Silver Trophy"
                className="max-h-36 object-contain filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="w-full pt-2 space-y-1">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest block">
                2ND PLACE WINNER
              </span>

              <div className="h-[1px] w-12 bg-slate-600/40 mx-auto my-1" />

              <h3 className="text-3xl font-black text-white font-mono">
                ₹20,000
              </h3>

              <p className="text-[11px] font-medium text-slate-300 leading-snug pt-1">
                Silver Trophy & Plaque • Mentorship Access
              </p>
            </div>
          </div>

          {/* 3RD PLACE - BRONZE CARD */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-6 rounded-3xl bg-[#030816]/90 border border-amber-700/50 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-between text-center cursor-pointer hover:scale-102 transition-all group"
          >
            <div className="w-full h-44 flex items-center justify-center relative">
              <img
                src="/bronze.webp"
                alt="3rd Place Bronze Trophy"
                className="max-h-36 object-contain filter drop-shadow-[0_10px_20px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="w-full pt-2 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                3RD PLACE WINNER
              </span>

              <div className="h-[1px] w-12 bg-amber-800/40 mx-auto my-1" />

              <h3 className="text-3xl font-black text-white font-mono">
                ₹10,000
              </h3>

              <p className="text-[11px] font-medium text-slate-300 leading-snug pt-1">
                Bronze Medal & Plaque • Pro Subscriptions
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (EXACT MATCH TO RIGHT SIDE OF PRIZES MOCKUP)              */}
      {/* ========================================================================= */}
      <div className="flex lg:hidden flex-col justify-between h-full w-full py-1 text-center items-center space-y-2">
        
        {/* HEADER SECTION */}
        <div className="space-y-1 w-full my-auto">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>NATIONAL TROPHY PODIUM</span>
          </div>

          <h2 className="text-2xl font-black text-white font-sans leading-tight">
            ₹70,000
          </h2>
          <h3 className="text-lg font-black text-white font-sans leading-none">
            National Cash <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pool</span>
          </h3>
        </div>

        {/* 3 STACKED HORIZONTAL ROW CARDS (TROPHY LEFT • DETAILS RIGHT) */}
        <div className="w-full max-w-xs space-y-2.5 my-auto">
          
          {/* ROW 1: 1ST PLACE GOLD */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-3 rounded-2xl bg-[#030816]/95 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-16 h-20 shrink-0 flex items-center justify-center">
              <img src="/gold.webp" alt="Gold Trophy" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-extrabold text-amber-400 uppercase tracking-wider block">
                1ST PLACE WINNER
              </span>
              <h4 className="text-lg font-black text-amber-300 font-mono leading-none">
                ₹30,000
              </h4>
              <p className="text-[9px] font-medium text-slate-300 leading-tight pt-0.5">
                Gold Trophy • Seed Incubation Slot • AI Cloud Credits
              </p>
            </div>
          </div>

          {/* ROW 2: 2ND PLACE SILVER */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-3 rounded-2xl bg-[#030816]/95 border border-slate-500/40 flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-16 h-20 shrink-0 flex items-center justify-center">
              <img src="/silver.webp" alt="Silver Trophy" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-wider block">
                2ND PLACE WINNER
              </span>
              <h4 className="text-lg font-black text-white font-mono leading-none">
                ₹20,000
              </h4>
              <p className="text-[9px] font-medium text-slate-300 leading-tight pt-0.5">
                Silver Trophy & Plaque • Mentorship Access
              </p>
            </div>
          </div>

          {/* ROW 3: 3RD PLACE BRONZE */}
          <div
            onClick={() => onOpenRegister && onOpenRegister()}
            className="p-3 rounded-2xl bg-[#030816]/95 border border-amber-700/50 flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-16 h-20 shrink-0 flex items-center justify-center">
              <img src="/bronze.webp" alt="Bronze Trophy" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-wider block">
                3RD PLACE WINNER
              </span>
              <h4 className="text-lg font-black text-white font-mono leading-none">
                ₹10,000
              </h4>
              <p className="text-[9px] font-medium text-slate-300 leading-tight pt-0.5">
                Bronze Medal & Plaque • Pro Subscriptions
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default PrizesSection;

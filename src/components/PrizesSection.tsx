import { Trophy } from "lucide-react";

interface PrizesSectionProps {
  onOpenRegister?: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section id="prizes" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto select-none z-10">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-12">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest backdrop-blur-md shadow-md">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>NATIONAL TROPHY PODIUM</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
          ₹70,000 National Cash{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Pool
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300">
          Compete against top developers across India for national cash rewards, official trophies, plaques & KTU activity points.
        </p>
      </div>

      {/* 3 PODIUM CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full max-w-5xl mx-auto">
        
        {/* 1ST PLACE - GOLD CARD */}
        <div
          onClick={() => onOpenRegister && onOpenRegister()}
          className="p-8 rounded-3xl bg-[#030816]/90 border-2 border-amber-400 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
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
          className="p-8 rounded-3xl bg-[#030816]/90 border border-slate-500/40 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-full h-48 flex items-center justify-center relative">
            <img
              src="/silver.webp"
              alt="2nd Place Silver Trophy"
              className="max-h-40 object-contain filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="w-full pt-4 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest block">
              2ND PLACE WINNER
            </span>

            <div className="h-[1px] w-16 bg-slate-600/40 mx-auto my-2" />

            <h3 className="text-4xl font-black text-white font-mono">
              ₹20,000
            </h3>

            <p className="text-xs font-medium text-slate-300 leading-relaxed pt-2">
              Silver Trophy & Plaque • Mentorship Access • KTU Certification
            </p>
          </div>
        </div>

        {/* 3RD PLACE - BRONZE CARD */}
        <div
          onClick={() => onOpenRegister && onOpenRegister()}
          className="p-8 rounded-3xl bg-[#030816]/90 border border-amber-700/40 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-between text-center cursor-pointer hover:scale-105 transition-all group"
        >
          <div className="w-full h-48 flex items-center justify-center relative">
            <img
              src="/bronze.webp"
              alt="3rd Place Bronze Trophy"
              className="max-h-40 object-contain filter drop-shadow-[0_10px_20px_rgba(217,119,6,0.3)] group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="w-full pt-4 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
              3RD PLACE WINNER
            </span>

            <div className="h-[1px] w-16 bg-amber-700/40 mx-auto my-2" />

            <h3 className="text-4xl font-black text-amber-400 font-mono">
              ₹10,000
            </h3>

            <p className="text-xs font-medium text-slate-300 leading-relaxed pt-2">
              Bronze Trophy & Certificate • Activity Points • Tech Swag
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default PrizesSection;

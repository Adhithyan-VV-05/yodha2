import { motion } from "framer-motion";

interface PrizesSectionProps {
  onOpenRegister?: () => void;
}

export function PrizesSection({ onOpenRegister }: PrizesSectionProps) {
  return (
    <section
      id="prizes"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 z-20 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* MAIN CONTAINER */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* HEADER AREA */}
          <div className="text-center mb-12 sm:mb-16 space-y-2.5 w-full">
            {/* SUBTITLE TRACKING LABEL */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 sm:w-12 h-[1px] bg-slate-700/60" />
              <span className="text-xs font-mono font-medium tracking-[0.35em] text-slate-400 uppercase">
                REWARDS FOR IMPACT
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-slate-700/60" />
            </div>

            {/* MAIN CINEMATIC SERIF PRIZES TITLE */}
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 py-1 drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              PRIZES
            </h2>

            {/* RECOGNIZING IDEAS THAT CREATE REAL IMPACT */}
            <p className="text-[11px] sm:text-xs font-mono tracking-[0.3em] text-slate-400 uppercase max-w-md mx-auto px-4">
              RECOGNIZING IDEAS THAT CREATE REAL IMPACT.
            </p>
          </div>

          {/* DESKTOP TROPHY LAYOUT (3 COLUMNS: 2ND | 1ST | 3RD) */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-12 items-end w-full max-w-4xl mx-auto pt-4 pb-8">
            {/* 2ND PRIZE - SILVER TROPHY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative mb-4 flex items-center justify-center">
                <img
                  src="/silver.webp"
                  alt="Second prize trophy"
                  className="w-44 sm:w-48 lg:w-56 h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:-translate-y-2 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif tracking-[0.25em] text-slate-300 uppercase block font-medium">
                  2ND PRIZE
                </span>
                <div className="font-serif text-3xl lg:text-4xl text-slate-200 font-normal tracking-tight group-hover:text-white transition-colors">
                  ₹20,000
                </div>
              </div>
            </motion.div>

            {/* 1ST PRIZE - GOLD TROPHY (CENTER DOMINANT, LARGER & HIGHER) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center group cursor-pointer -mt-8 pb-2"
            >
              <div className="relative mb-4 flex items-center justify-center">
                <img
                  src="/gold.webp"
                  alt="First prize trophy"
                  className="w-56 sm:w-64 lg:w-76 h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] group-hover:-translate-y-2.5 transition-transform duration-300 scale-105"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-amber-300 uppercase block font-medium">
                  1ST PRIZE
                </span>
                <div className="font-serif text-4xl lg:text-5xl text-amber-200 font-normal tracking-tight group-hover:text-amber-100 transition-colors">
                  ₹30,000
                </div>
              </div>
            </motion.div>

            {/* 3RD PRIZE - BRONZE TROPHY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative mb-4 flex items-center justify-center">
                <img
                  src="/bronze.webp"
                  alt="Third prize trophy"
                  className="w-44 sm:w-48 lg:w-56 h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:-translate-y-2 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif tracking-[0.25em] text-amber-500/90 uppercase block font-medium">
                  3RD PRIZE
                </span>
                <div className="font-serif text-3xl lg:text-4xl text-amber-400/90 font-normal tracking-tight group-hover:text-amber-300 transition-colors">
                  ₹15,000
                </div>
              </div>
            </motion.div>
          </div>

          {/* MOBILE / TABLET TROPHY LAYOUT (SINGLE COLUMN VERTICAL FLOW: 1ST -> 2ND -> 3RD) */}
          <div className="flex md:hidden flex-col items-center gap-12 w-full pt-2 pb-6">
            {/* 1ST PRIZE (GOLD) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center active:scale-98 transition-transform"
            >
              <img
                src="/gold.webp"
                alt="First prize trophy"
                className="w-56 sm:w-64 h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] mb-3"
              />
              <span className="text-xs font-serif tracking-[0.25em] text-amber-300 uppercase font-medium">
                1ST PRIZE
              </span>
              <div className="font-serif text-4xl text-amber-200 font-normal tracking-tight mt-1">
                ₹30,000
              </div>
            </motion.div>

            {/* 2ND PRIZE (SILVER) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center active:scale-98 transition-transform"
            >
              <img
                src="/silver.webp"
                alt="Second prize trophy"
                className="w-48 sm:w-52 h-auto object-contain filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.6)] mb-3"
              />
              <span className="text-xs font-serif tracking-[0.25em] text-slate-300 uppercase font-medium">
                2ND PRIZE
              </span>
              <div className="font-serif text-3xl text-slate-200 font-normal tracking-tight mt-1">
                ₹20,000
              </div>
            </motion.div>

            {/* 3RD PRIZE (BRONZE) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => onOpenRegister && onOpenRegister()}
              className="flex flex-col items-center text-center active:scale-98 transition-transform"
            >
              <img
                src="/bronze.webp"
                alt="Third prize trophy"
                className="w-48 sm:w-52 h-auto object-contain filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.6)] mb-3"
              />
              <span className="text-xs font-serif tracking-[0.25em] text-amber-500/90 uppercase font-medium">
                3RD PRIZE
              </span>
              <div className="font-serif text-3xl text-amber-400/90 font-normal tracking-tight mt-1">
                ₹15,000
              </div>
            </motion.div>
          </div>

          {/* SPECIAL AWARD SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 sm:mt-16 text-center space-y-2 w-full"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 sm:w-16 h-[1px] bg-slate-700/60" />
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.35em] text-slate-400 uppercase">
                SPECIAL AWARD
              </span>
              <div className="w-10 sm:w-16 h-[1px] bg-slate-700/60" />
            </div>

            <div className="font-serif text-4xl sm:text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight pt-1">
              ₹5,000
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PrizesSection;

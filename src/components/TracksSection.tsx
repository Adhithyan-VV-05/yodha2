import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

interface TracksSectionProps {
  onSelectTrack?: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare" | "environmental") => void;
}

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  const healthRoboSrc = encodeURI("/health robo.webp");
  const envRoboSrc = encodeURI("/env robo.webp");

  return (
    <section id="tracks" className="py-10 sm:py-16 relative overflow-hidden bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>HACKATHON THEMES & PROBLEM STATEMENTS</span>
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight"
          >
            Two Core Innovation Tracks
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed px-2"
          >
            Click on <strong className="text-red-400 font-bold">Healthcare AI</strong> or <strong className="text-emerald-400 font-bold">Environmental AI</strong> below to explore detailed problem statements and track info.
          </motion.p>
        </div>

        {/* 2-Image Single Row Layout with Gentle Levitating Floating Animation */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 md:gap-8 items-center justify-center w-full max-w-6xl mx-auto select-none px-1">
          
          {/* IMAGE 1: HEALTH ROBOT (health robo.png) - 60vh Mobile, 65vh PC, Slight Glow & Floating Motion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6 },
              x: { duration: 0.6 },
            }}
            onClick={() => onOpenTrackPage("healthcare")}
            className="flex items-center justify-center cursor-pointer group"
          >
            <img
              src={healthRoboSrc}
              alt="Healthcare AI Track (health robo.png)"
              className="w-full h-[60vh] sm:h-[65vh] object-contain filter drop-shadow-[0_4px_15px_rgba(239,68,68,0.2)] group-hover:drop-shadow-[0_8px_25px_rgba(239,68,68,0.45)] group-hover:scale-105 transition-all duration-300"
            />
          </motion.div>

          {/* IMAGE 2: ENVIRONMENT ROBOT (env robo.png) - 60vh Mobile, 65vh PC, Slight Glow & Floating Motion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 0.6 },
              x: { duration: 0.6 },
            }}
            onClick={() => onOpenTrackPage("environmental")}
            className="flex items-center justify-center cursor-pointer group"
          >
            <img
              src={envRoboSrc}
              alt="Environmental AI Track (env robo.png)"
              className="w-full h-[60vh] sm:h-[65vh] object-contain filter drop-shadow-[0_4px_15px_rgba(34,197,94,0.2)] group-hover:drop-shadow-[0_8px_25px_rgba(34,197,94,0.45)] group-hover:scale-105 transition-all duration-300"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

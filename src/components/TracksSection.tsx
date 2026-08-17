import { motion } from "framer-motion";
import { Stethoscope, Trees, ArrowRight, Cpu, Layers } from "lucide-react";
import { YodhaImage } from "./YodhaImage";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  ENVIRONMENTAL_PROBLEM_STATEMENTS,
  getPSImage,
} from "../data/problemStatements";

interface TracksSectionProps {
  onSelectTrack: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare" | "environmental") => void;
}

const THEME_TRACKS = [
  {
    id: "healthcare" as const,
    title: "Healthcare AI",
    icon: <Stethoscope className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400" />,
    badge: "🩺 HEALTHCARE TRACK (IDs 1 - 10)",
    description: "Develop AI solutions that prevent disease, improve diagnostic accuracy, support clinical decision-making, and expand universal healthcare accessibility.",
    statements: HEALTHCARE_PROBLEM_STATEMENTS.slice(0, 4),
    bgImage: CARD_BACKGROUNDS.tracks.healthcare,
    floatClass: "animate-float-card",
  },
  {
    id: "environmental" as const,
    title: "Environmental AI",
    icon: <Trees className="w-6 sm:w-8 h-6 sm:h-8 text-slate-200" />,
    badge: "🌿 SUSTAINABILITY TRACK (IDs 11 - 20)",
    description: "Build intelligent systems to monitor environmental ecosystems, detect forest fires, analyze water quality, and mitigate climate disaster risks.",
    statements: ENVIRONMENTAL_PROBLEM_STATEMENTS.slice(0, 4),
    bgImage: CARD_BACKGROUNDS.tracks.environmental,
    floatClass: "animate-float-delayed",
  },
];

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  return (
    <section id="tracks" className="py-20 sm:py-28 relative overflow-hidden bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
            className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight"
          >
            Two Core Innovation Tracks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Explore the 20 dedicated visual Problem Statement Cards for Healthcare (IDs 1–10) & Environmental AI (IDs 11–20). Click <strong className="text-white font-bold">Choose Track</strong> to view full details.
          </motion.p>
        </div>

        {/* 2-Card Layout with Problem Statement Image Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {THEME_TRACKS.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`h-full ${track.floatClass}`}
            >
              <div
                onClick={() => onOpenTrackPage(track.id)}
                className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-blue-500/30 flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-md group hover:border-blue-400 transition-all duration-500 cursor-pointer shadow-2xl shine-sweep"
              >
                {/* Generated Metallic Silver Tracks Border Overlay */}
                <div className="absolute inset-0 pointer-events-none z-15 border border-slate-400/40 rounded-3xl overflow-hidden">
                  <img src="/tracks_border.png" alt="" className="w-full h-full object-cover opacity-25 mix-blend-overlay" />
                </div>

                {/* Theme Background Image with Dark Contrast Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={track.bgImage}
                    alt=""
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-20 filter brightness-90 contrast-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/85 to-[#020617]/60 z-10" />
                </div>

                <div className="relative z-20">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-200 bg-slate-900 border border-blue-500/40 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {track.badge}
                    </span>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 group-hover:scale-110 transition-transform">
                      {track.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">{track.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">{track.description}</p>

                  {/* Problem Statement Image Cards Preview Grid */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-400" />
                        <span>PROBLEM STATEMENT CARDS:</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 font-bold">10 Statements</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {track.statements.map((st) => (
                        <div
                          key={st.id}
                          className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-black/70 group/ps transition-transform hover:scale-102"
                        >
                          <YodhaImage
                            src={getPSImage(st)}
                            alt={st.title}
                            className="w-full h-full object-cover group-hover/ps:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-black/80 text-slate-200 border border-white/20">
                            #{st.id}
                          </div>
                          <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white truncate block">
                            {st.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Horizontally Centered Button */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-center mt-auto relative z-30 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTrackPage(track.id);
                    }}
                    className="btn-metallic-silver w-full max-w-xs flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm tracking-widest uppercase group/btn cursor-pointer relative z-30 pointer-events-auto shadow-xl"
                  >
                    <span>Explore Track & Statements</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

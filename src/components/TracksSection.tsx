import { motion } from "framer-motion";
import { Stethoscope, Trees, ArrowRight, Cpu } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface TracksSectionProps {
  onSelectTrack: (trackName: string) => void;
  onOpenTrackPage: (trackType: "healthcare" | "environmental") => void;
}

const THEME_TRACKS = [
  {
    id: "healthcare",
    title: "Healthcare AI",
    icon: <Stethoscope className="w-6 sm:w-8 h-6 sm:h-8 text-rose-400" />,
    badge: "🩺 HEALTHCARE TRACK (IDs 1 - 20)",
    description: "Develop AI solutions that prevent disease, improve diagnostic accuracy, support clinical decision-making, and expand universal healthcare accessibility.",
    subTopics: [
      "Disease Prevention",
      "Medical Diagnosis",
      "Patient Care",
      "Healthcare Accessibility",
      "Clinical Decision Support",
    ],
    gradient: "from-rose-500/20 via-sky-500/10 to-transparent",
    glowColor: "rgba(244, 63, 94, 0.35)",
  },
  {
    id: "environmental",
    title: "Environmental AI",
    icon: <Trees className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-400" />,
    badge: "🌿 SUSTAINABILITY TRACK (IDs 21 - 40)",
    description: "Build intelligent systems to monitor environmental ecosystems, detect forest fires, analyze water quality, and mitigate climate disaster risks.",
    subTopics: [
      "Water Quality Monitoring",
      "Climate & Disaster Management",
      "Smart Environmental Monitoring",
      "Forest Fire Detection",
      "Biodiversity Protection",
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.35)",
  },
];

export function TracksSection({ onOpenTrackPage }: TracksSectionProps) {
  return (
    <section id="tracks" className="py-20 sm:py-28 relative overflow-hidden bg-[#06080e]/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>HACKATHON THEMES</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 tracking-tight"
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
            Click <strong className="text-sky-300">Choose Track</strong> below to view the 40 dedicated Problem Statements for Healthcare (IDs 1–20) & Environmental AI (IDs 21–40).
          </motion.p>
        </div>

        {/* 2-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {THEME_TRACKS.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <Card3DTilt glowColor={track.glowColor} className="h-full">
                <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${track.gradient} bg-slate-950/80 border border-white/10 flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-xl group hover:border-sky-400/40 transition-all duration-300`}>
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-sky-300 bg-sky-950/80 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                        {track.badge}
                      </span>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        {track.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">{track.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">{track.description}</p>

                    {/* Sub-Topics List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        KEY FOCUS AREAS:
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {track.subTopics.map((sub, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs font-mono text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg hover:border-sky-400/30 transition-colors"
                          >
                            • {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Horizontally Centered Floating Button (Unaffected by Card Tilt) */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-center mt-auto relative z-50 pointer-events-auto">
                    <button
                      onClick={() => {
                        onOpenTrackPage(track.id as "healthcare" | "environmental");
                      }}
                      className="w-full max-w-xs flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:brightness-115 group/btn transition-all cursor-pointer relative z-50 pointer-events-auto"
                    >
                      <span>Choose Track</span>
                      <ArrowRight className="w-4 h-4 text-sky-200 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

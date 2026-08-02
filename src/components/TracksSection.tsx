import { motion } from "framer-motion";
import { Stethoscope, Trees, ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface TracksSectionProps {
  onSelectTrack: (trackName: string) => void;
}

const THEME_TRACKS = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI",
    icon: <Stethoscope className="w-8 h-8 text-rose-400" />,
    badge: "🩺 HEALTHCARE TRACK",
    description: "Develop AI solutions that prevent disease, improve diagnostic accuracy, support clinical decision-making, and expand universal healthcare accessibility.",
    subTopics: [
      "Disease Prevention",
      "Medical Diagnosis",
      "Patient Care",
      "Healthcare Accessibility",
      "Clinical Decision Support",
    ],
    prizePool: "₹35,000 Track Pool",
    gradient: "from-rose-500/20 via-sky-500/10 to-transparent",
    glowColor: "rgba(244, 63, 94, 0.35)",
  },
  {
    id: "environmental-ai",
    title: "Environmental AI",
    icon: <Trees className="w-8 h-8 text-emerald-400" />,
    badge: "🌿 SUSTAINABILITY TRACK",
    description: "Build intelligent systems to monitor environmental ecosystems, detect forest fires, analyze water quality, and mitigate climate disaster risks.",
    subTopics: [
      "Water Quality Monitoring",
      "Climate & Disaster Management",
      "Smart Environmental Monitoring",
      "Forest Fire Detection",
      "Biodiversity Protection",
    ],
    prizePool: "₹35,000 Track Pool",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.35)",
  },
];

export function TracksSection({ onSelectTrack }: TracksSectionProps) {
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
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Innovation Tracks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 text-base max-w-xl mx-auto"
          >
            Select your team's track focus and build intelligent AI solutions for healthcare and environmental sustainability.
          </motion.p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {THEME_TRACKS.map((track, i) => (
            <Card3DTilt key={track.id} intensity={14} glowColor={track.glowColor} className="flex">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-slate-950/90 border border-white/10 backdrop-blur-xl flex flex-col justify-between group relative overflow-hidden shadow-2xl w-full"
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                      {track.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 border border-sky-400/30 px-3.5 py-1.5 rounded-full shadow-sm">
                      {track.prizePool}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    {track.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-sky-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm leading-relaxed font-normal">
                    {track.description}
                  </p>

                  {/* Subtopics List */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <span className="text-xs font-mono text-sky-400 font-bold block mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-sky-400" /> Focus Problem Areas
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {track.subTopics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-slate-200 font-medium hover:border-sky-400/50 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <span className="text-xs text-slate-400 font-mono">24-Hour Hackathon Entry</span>
                  <button
                    onClick={() => onSelectTrack(track.title)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all uppercase tracking-widest cursor-pointer"
                  >
                    <span>Select Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}

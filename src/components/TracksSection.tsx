import { motion } from "framer-motion";
import { Cpu, Globe, Layers, Palette, ArrowRight } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface TracksSectionProps {
  onSelectTrack: (trackName: string) => void;
}

const TRACKS = [
  {
    id: "ai-ui",
    title: "AI Interfaces & Generative UI",
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    description: "Design and build reactive user interfaces powered by artificial intelligence, adaptive components, and real-time LLM integration.",
    prize: "₹25,000 Track Pool",
    tags: ["React 19", "AI SDK", "Generative Web", "WebSockets"],
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    glowColor: "rgba(56, 189, 248, 0.35)",
  },
  {
    id: "web3",
    title: "Web3 & Decentralized Web",
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    description: "Engineer accessible web3 applications, intuitive wallet interfaces, zero-knowledge dashboards, and decentralized protocol frontends.",
    prize: "₹20,000 Track Pool",
    tags: ["Ethers.js", "Solana", "IPFS", "Zero Knowledge"],
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    glowColor: "rgba(129, 140, 248, 0.35)",
  },
  {
    id: "immersive",
    title: "Immersive Digital Creative",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    description: "Push the boundaries of spatial interactive design using smooth motion choreography, visualizers, and creative canvas experiences.",
    prize: "₹15,000 Track Pool",
    tags: ["Interactive Web", "Graphics", "Framer Motion", "Canvas"],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    glowColor: "rgba(192, 132, 252, 0.35)",
  },
  {
    id: "craftsmanship",
    title: "UI Craftsmanship & Open Tech",
    icon: <Palette className="w-6 h-6 text-emerald-400" />,
    description: "Focus on micro-interactions, responsive design systems, performance optimization, and accessible web experiences for all users.",
    prize: "₹10,000 Track Pool",
    tags: ["Design Systems", "Tailwind CSS", "Performance", "Accessibility"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "rgba(52, 211, 153, 0.35)",
  },
];

export function TracksSection({ onSelectTrack }: TracksSectionProps) {
  return (
    <section id="tracks" className="py-16 sm:py-24 relative overflow-hidden bg-[#06080e]/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold"
          >
            HACKATHON CATEGORIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Choose Your Track
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
          >
            Select from 4 specialized tracks with dedicated INR cash pools for innovators and builders.
          </motion.p>
        </div>

        {/* Tracks Grid with Tilt Effects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {TRACKS.map((track, i) => (
            <Card3DTilt key={track.id} intensity={12} glowColor={track.glowColor} className="flex">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-slate-950/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between group relative overflow-hidden shadow-2xl w-full"
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                      {track.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 border border-sky-400/30 px-3.5 py-1 rounded-full shadow-sm">
                      {track.prize}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-sky-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {track.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] sm:text-[11px] font-mono text-slate-300 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
                  <span className="text-[11px] text-slate-400 font-mono">Individual & Team Entry</span>
                  <button
                    onClick={() => onSelectTrack(track.title)}
                    className="flex items-center gap-2 text-xs font-black text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1.5 transition-all cursor-pointer"
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

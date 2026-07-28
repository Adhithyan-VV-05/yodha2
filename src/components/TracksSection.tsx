import { motion } from "framer-motion";
import { Cpu, Globe, Layers, Palette, ArrowRight } from "lucide-react";

interface TracksSectionProps {
  onSelectTrack: (trackName: string) => void;
}

const TRACKS = [
  {
    id: "ai-ui",
    title: "AI Interfaces & Generative UI",
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    description: "Design and build reactive user interfaces powered by artificial intelligence, adaptive components, and real-time LLM integration.",
    prize: "$8,000 Track Pool",
    tags: ["React 19", "AI SDK", "Generative Web", "WebSockets"],
    gradient: "from-sky-500/15 via-indigo-500/10 to-transparent",
  },
  {
    id: "web3",
    title: "Web3 & Decentralized Web",
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
    description: "Engineer accessible web3 applications, intuitive wallet interfaces, zero-knowledge dashboards, and decentralized protocol frontends.",
    prize: "$6,500 Track Pool",
    tags: ["Ethers.js", "Solana", "IPFS", "Zero Knowledge"],
    gradient: "from-indigo-500/15 via-purple-500/10 to-transparent",
  },
  {
    id: "3d-motion",
    title: "3D Graphics & Creative WebGL",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    description: "Push the boundaries of spatial web design using Three.js, WebGL shaders, smooth motion choreography, and canvas visualizers.",
    prize: "$6,000 Track Pool",
    tags: ["Three.js", "WebGL", "Framer Motion", "GLSL"],
    gradient: "from-purple-500/15 via-pink-500/10 to-transparent",
  },
  {
    id: "craftsmanship",
    title: "UI Craftsmanship & Open Tech",
    icon: <Palette className="w-6 h-6 text-emerald-400" />,
    description: "Focus on micro-interactions, responsive design systems, performance optimization, and accessible web experiences for all users.",
    prize: "$4,500 Track Pool",
    tags: ["Design Systems", "Tailwind CSS", "Performance", "Accessibility"],
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
  },
];

export function TracksSection({ onSelectTrack }: TracksSectionProps) {
  return (
    <section id="tracks" className="py-16 sm:py-24 relative overflow-hidden bg-[#06080e]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-semibold"
          >
            HACKATHON CATEGORIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
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
            Select from 4 specialized tracks tailored for visual artists, frontend architects, and creative builders.
          </motion.p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {TRACKS.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl flex flex-col justify-between group relative overflow-hidden shadow-xl"
            >
              {/* Smooth Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-105 transition-transform">
                    {track.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-sky-300 bg-sky-950/70 px-3.5 py-1 rounded-full shadow-sm">
                    {track.prize}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
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
                      className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] sm:text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-[11px] text-slate-400 font-mono">Individual & Team Entry</span>
                <button
                  onClick={() => onSelectTrack(track.title)}
                  className="flex items-center gap-2 text-xs font-bold text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Select Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

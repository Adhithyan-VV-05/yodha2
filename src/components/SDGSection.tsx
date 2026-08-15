import { motion } from "framer-motion";
import { Globe, Heart, Droplets, Building2, Building, ThermometerSun, Trees, RotateCw } from "lucide-react";
import { Card3DFlip } from "./Card3DFlip";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";

export function SDGSection() {
  const SDGS = [
    {
      code: "SDG 3",
      title: "Good Health & Well-being",
      icon: <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Advance AI for disease prevention, diagnosis accuracy, and healthcare accessibility.",
      color: "bg-blue-600",
      flipDir: "horizontal" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg3,
    },
    {
      code: "SDG 6",
      title: "Clean Water & Sanitation",
      icon: <Droplets className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Develop smart water quality monitoring and resource conservation systems.",
      color: "bg-slate-700",
      flipDir: "vertical" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg6,
    },
    {
      code: "SDG 9",
      title: "Industry & Innovation",
      icon: <Building2 className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Foster sustainable industrial innovation, AI infrastructure, and research.",
      color: "bg-blue-700",
      flipDir: "zoomSlide" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg9,
    },
    {
      code: "SDG 11",
      title: "Sustainable Cities",
      icon: <Building className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Engineer smart environmental monitoring tools for urban communities.",
      color: "bg-slate-800",
      flipDir: "horizontal" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg11,
    },
    {
      code: "SDG 13",
      title: "Climate Action",
      icon: <ThermometerSun className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Build AI models for climate resilience, forest fire detection, and disaster mitigation.",
      color: "bg-blue-800",
      flipDir: "vertical" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg13,
    },
    {
      code: "SDG 15",
      title: "Life on Land",
      icon: <Trees className="w-6 sm:w-8 h-6 sm:h-8 text-white" />,
      desc: "Protect terrestrial ecosystems, biodiversity, and forestry using AI tools.",
      color: "bg-slate-600",
      flipDir: "zoomSlide" as const,
      bgImage: CARD_BACKGROUNDS.sdgs.sdg15,
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#040c21] to-[#020617] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>GLOBAL IMPACT FRAMEWORK</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight"
          >
            UN Sustainable Development Goals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
          >
            YODHA Hackathon projects directly align with official United Nations SDGs to drive measurable global social impact.
          </motion.p>
        </div>

        {/* 2-Card Grid Layout on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {SDGS.map((sdg) => (
            <Card3DFlip
              key={sdg.code}
              flipDirection={sdg.flipDir}
              bgImage={sdg.bgImage}
              className="h-56 sm:h-64"
              front={
                <div className="flex flex-col items-center justify-center text-center my-auto p-2 sm:p-4">
                  <div className={`p-2.5 sm:p-4 rounded-2xl ${sdg.color} shadow-lg mb-2 sm:mb-3`}>
                    {sdg.icon}
                  </div>
                  <span className="font-mono text-[9px] sm:text-xs font-black text-white bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                    {sdg.code}
                  </span>
                  <h3 className="text-xs sm:text-lg font-bold text-white leading-snug">{sdg.title}</h3>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1.5 flex items-center gap-1 opacity-75">
                    <RotateCw className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-blue-400 animate-spin" /> Flip
                  </span>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left p-2.5 sm:p-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] sm:text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">
                        {sdg.code}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full ${sdg.color}`} />
                    </div>
                    <h4 className="text-xs sm:text-base font-bold text-white mb-1">{sdg.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-300 leading-normal sm:leading-relaxed font-normal">{sdg.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-slate-400">
                    <span>UN Target</span>
                    <span className="text-blue-300 font-semibold">Official Alignment</span>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Globe, Heart, Droplets, Building2, Building, ThermometerSun, Trees } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

export function SDGSection() {
  const SDGS = [
    {
      code: "SDG 3",
      title: "Good Health & Well-being",
      icon: <Heart className="w-6 h-6 text-white" />,
      desc: "Advance AI for disease prevention, diagnosis accuracy, and healthcare accessibility.",
      color: "bg-[#E5243B]",
      borderColor: "border-[#E5243B]/60",
      glowColor: "rgba(229, 36, 59, 0.4)",
    },
    {
      code: "SDG 6",
      title: "Clean Water & Sanitation",
      icon: <Droplets className="w-6 h-6 text-white" />,
      desc: "Develop smart water quality monitoring and resource conservation systems.",
      color: "bg-[#26BDE2]",
      borderColor: "border-[#26BDE2]/60",
      glowColor: "rgba(38, 189, 226, 0.4)",
    },
    {
      code: "SDG 9",
      title: "Industry, Innovation & Infrastructure",
      icon: <Building2 className="w-6 h-6 text-white" />,
      desc: "Foster sustainable industrial innovation, AI infrastructure, and research.",
      color: "bg-[#FD6925]",
      borderColor: "border-[#FD6925]/60",
      glowColor: "rgba(253, 105, 37, 0.4)",
    },
    {
      code: "SDG 11",
      title: "Sustainable Cities & Communities",
      icon: <Building className="w-6 h-6 text-white" />,
      desc: "Engineer smart environmental monitoring tools for urban communities.",
      color: "bg-[#FD9D24]",
      borderColor: "border-[#FD9D24]/60",
      glowColor: "rgba(253, 157, 36, 0.4)",
    },
    {
      code: "SDG 13",
      title: "Climate Action",
      icon: <ThermometerSun className="w-6 h-6 text-white" />,
      desc: "Build AI models for climate resilience, forest fire detection, and disaster mitigation.",
      color: "bg-[#3F7E44]",
      borderColor: "border-[#3F7E44]/60",
      glowColor: "rgba(63, 126, 68, 0.4)",
    },
    {
      code: "SDG 15",
      title: "Life on Land",
      icon: <Trees className="w-6 h-6 text-white" />,
      desc: "Protect terrestrial ecosystems, biodiversity, and forestry using AI tools.",
      color: "bg-[#56C02B]",
      borderColor: "border-[#56C02B]/60",
      glowColor: "rgba(86, 192, 43, 0.4)",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#04060b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>GLOBAL IMPACT FRAMEWORK</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            UN Sustainable Development Goals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-300 text-base max-w-xl mx-auto"
          >
            YODHA Hackathon projects directly align with official United Nations SDGs to drive measurable global social impact.
          </motion.p>
        </div>

        {/* SDG Cards Grid with Official SDG Colors & Minimalistic Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SDGS.map((sdg, idx) => (
            <Card3DTilt key={sdg.code} intensity={12} glowColor={sdg.glowColor}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, ease: "easeOut" }}
                className={`p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-slate-950/90 border ${sdg.borderColor} backdrop-blur-xl h-full flex flex-col justify-between shadow-xl relative overflow-hidden group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                      className={`p-3 rounded-2xl ${sdg.color} shadow-lg`}
                    >
                      {sdg.icon}
                    </motion.div>
                    <span className="font-mono text-xs font-black text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {sdg.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {sdg.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {sdg.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>UN Target Goal</span>
                  <span className="text-sky-400 font-semibold">Official Alignment</span>
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}

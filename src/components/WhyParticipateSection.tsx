import { motion } from "framer-motion";
import { Lightbulb, Users, Rocket, Trophy, Network, Award, RotateCw } from "lucide-react";
import { Card3DFlip } from "./Card3DFlip";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";

export function WhyParticipateSection() {
  const BENEFITS = [
    {
      title: "Solve Real Problems",
      icon: <Lightbulb className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400" />,
      desc: "Address critical challenges in healthcare disease prevention, medical decision support, and climate sustainability.",
      badge: "Real Impact",
      flipDir: "horizontal" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.real_problems,
    },
    {
      title: "Collaborate Innovators",
      icon: <Users className="w-6 sm:w-8 h-6 sm:h-8 text-slate-200" />,
      desc: "Form high-performance teams with talented engineers, researchers, and designers across India.",
      badge: "National Network",
      flipDir: "vertical" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.innovators,
    },
    {
      title: "Build AI Products",
      icon: <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400" />,
      desc: "Transform abstract ideas into functional, deployable AI prototypes in an intense 24-hour hackathon.",
      badge: "24-Hr Sprint",
      flipDir: "zoomSlide" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.build_ai,
    },
    {
      title: "Win Cash Prizes",
      icon: <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-slate-200" />,
      desc: "Compete for ₹70,000 INR Cash Prize Pool, official trophies, plaques, and cloud infrastructure credits.",
      badge: "₹70,000 Pool",
      flipDir: "horizontal" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.cash_prizes,
    },
    {
      title: "Network with Experts",
      icon: <Network className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400" />,
      desc: "Get 1-on-1 technical feedback and career guidance from industry software architects and AI researchers.",
      badge: "Mentorship",
      flipDir: "vertical" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.network_experts,
    },
    {
      title: "Earn Certificates",
      icon: <Award className="w-6 sm:w-8 h-6 sm:h-8 text-slate-200" />,
      desc: "Receive official national participant and winner certificates to boost your career and portfolio.",
      badge: "Recognition",
      flipDir: "zoomSlide" as const,
      bgImage: CARD_BACKGROUNDS.whyParticipate.certificates,
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-2 font-bold"
          >
            PARTICIPANT ADVANTAGES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400 tracking-tight"
          >
            Why Participate in YODHA?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
          >
            Empower your engineering journey with mentorship, cash rewards, and real-world AI building experience.
          </motion.p>
        </div>

        {/* 2-Card Grid Layout on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {BENEFITS.map((item, idx) => (
            <Card3DFlip
              key={idx}
              flipDirection={item.flipDir}
              bgImage={item.bgImage}
              className="h-56 sm:h-64"
              front={
                <div className="flex flex-col items-center justify-center text-center my-auto p-2 sm:p-4">
                  <div className="p-2.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 mb-2 sm:mb-3 shadow-md">
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-0.5 sm:py-1 bg-slate-900 border border-slate-700 rounded-full text-[9px] sm:text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider mb-1.5">
                    {item.badge}
                  </span>
                  <h3 className="text-xs sm:text-lg font-bold text-white leading-snug">{item.title}</h3>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1.5 flex items-center gap-1 opacity-75">
                    <RotateCw className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-blue-400 animate-spin" /> Flip
                  </span>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left p-2.5 sm:p-4">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-wider block w-fit mb-1.5">
                      {item.badge}
                    </span>
                    <h4 className="text-xs sm:text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-300 leading-normal sm:leading-relaxed font-normal">{item.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-slate-400">
                    <span>YODHA Advantage</span>
                    <span className="text-blue-300 font-semibold">Verified</span>
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

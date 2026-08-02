import { motion } from "framer-motion";
import { Lightbulb, Users, Rocket, Trophy, Network, Award } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

export function WhyParticipateSection() {
  const BENEFITS = [
    {
      title: "Solve Real-World Problems",
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
      desc: "Address critical challenges in healthcare disease prevention, medical decision support, and climate sustainability.",
      badge: "Real Impact",
      accent: "border-amber-500/30 bg-amber-500/5",
    },
    {
      title: "Collaborate with Innovators",
      icon: <Users className="w-6 h-6 text-sky-400" />,
      desc: "Form high-performance teams with talented engineers, researchers, and designers across India.",
      badge: "National Network",
      accent: "border-sky-500/30 bg-sky-500/5",
    },
    {
      title: "Build AI Products",
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      desc: "Transform abstract ideas into functional, deployable AI prototypes in an intense 24-hour hackathon.",
      badge: "24-Hr Sprint",
      accent: "border-purple-500/30 bg-purple-500/5",
    },
    {
      title: "Win Exciting Prizes",
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      desc: "Compete for ₹70,000 INR Cash Prize Pool, official trophies, plaques, and cloud infrastructure credits.",
      badge: "₹70,000 Pool",
      accent: "border-amber-400/40 bg-amber-400/10",
    },
    {
      title: "Network with Experts",
      icon: <Network className="w-6 h-6 text-indigo-400" />,
      desc: "Get 1-on-1 technical feedback and career guidance from industry software architects and AI researchers.",
      badge: "Mentorship",
      accent: "border-indigo-500/30 bg-indigo-500/5",
    },
    {
      title: "Earn Certificates",
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      desc: "Receive official national participant and winner certificates to boost your career and portfolio.",
      badge: "Recognition",
      accent: "border-emerald-500/30 bg-emerald-500/5",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#06080e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold"
          >
            PARTICIPANT ADVANTAGES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Why Participate in YODHA?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-300 text-base max-w-xl mx-auto"
          >
            Empower your engineering journey with mentorship, cash rewards, and real-world AI building experience.
          </motion.p>
        </div>

        {/* Bento Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((item, idx) => (
            <Card3DTilt key={idx} intensity={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, ease: "easeOut" }}
                className={`p-7 rounded-3xl bg-gradient-to-b from-white/[0.05] to-slate-950/90 border ${item.accent} backdrop-blur-xl h-full flex flex-col justify-between group shadow-xl relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                      className="p-3 rounded-2xl bg-white/10 border border-white/15"
                    >
                      {item.icon}
                    </motion.div>
                    <span className="px-3.5 py-1 bg-white/10 border border-white/15 rounded-full text-[10px] font-mono text-sky-300 font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}

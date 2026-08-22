import { motion } from "framer-motion";
import { Lightbulb, Users, Rocket, Trophy, Network, Award, Sparkles, CheckCircle2 } from "lucide-react";

export function WhyParticipateSection() {
  const BENEFITS = [
    {
      id: "prizes",
      title: "₹70,000 Cash Prize Pool",
      subtitle: "Compete for top cash rewards, official trophies, plaques, & cloud infrastructure credits.",
      icon: <Trophy className="w-8 h-8 text-amber-400" />,
      badge: "CASH POOL & TROPHIES",
      featured: true,
      stats: "₹70,000 Pool",
      points: [
        "1st Prize: ₹35,000 Cash + National Winner Trophy",
        "2nd Prize: ₹20,000 Cash + Runner-Up Trophy",
        "3rd Prize: ₹10,000 Cash + Excellence Plaque",
        "Special Innovation Track Award: ₹5,000",
      ],
    },
    {
      id: "impact",
      title: "Solve Real-World Problems",
      subtitle: "Address critical challenges in Healthcare disease prediction & Environmental monitoring.",
      icon: <Lightbulb className="w-7 h-7 text-cyan-400" />,
      badge: "REAL IMPACT",
      featured: false,
      stats: "Healthcare & Eco AI",
      points: [
        "Build AI tools that save lives",
        "Protect ecosystems & clean water",
      ],
    },
    {
      id: "marathon",
      title: "48-Hour Coding Marathon",
      subtitle: "Transform abstract ideas into functional, deployable AI prototypes in an intense 48-hour sprint.",
      icon: <Rocket className="w-7 h-7 text-cyan-400" />,
      badge: "48H SPRINT",
      featured: false,
      stats: "Offline Marathon",
      points: [
        "48-hour non-stop building sprint",
        "Live judging & prototype demo",
      ],
    },
    {
      id: "network",
      title: "National Innovator Network",
      subtitle: "Form high-performance teams with talented engineers, researchers, and designers across India.",
      icon: <Users className="w-7 h-7 text-cyan-400" />,
      badge: "COLLABORATION",
      featured: false,
      stats: "Top Talent",
      points: [
        "Cross-institutional teamwork",
        "Lifetime innovator community",
      ],
    },
    {
      id: "mentorship",
      title: "1-on-1 Expert Mentorship",
      subtitle: "Get technical feedback and architectural guidance from industry software architects & AI researchers.",
      icon: <Network className="w-7 h-7 text-cyan-400" />,
      badge: "EXPERT GUIDANCE",
      featured: false,
      stats: "Industry Mentors",
      points: [
        "Code & model architecture review",
        "Career & startup incubator guidance",
      ],
    },
    {
      id: "certification",
      title: "National Certification",
      subtitle: "Receive official participant and winner certificates from Jyothi Engineering College to boost your resume.",
      icon: <Award className="w-7 h-7 text-cyan-400" />,
      badge: "RECOGNITION",
      featured: false,
      stats: "Official Certificate",
      points: [
        "Verified KTU academic points eligible",
        "Portfolio & LinkedIn badge",
      ],
    },
  ];

  return (
    <section id="why-participate" className="py-20 sm:py-28 relative overflow-hidden bg-transparent text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3"
          >
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
            <span>PARTICIPANT ADVANTAGES</span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-none"
          >
            WHY PARTICIPATE IN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              YODHA 2.0?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Supercharge your engineering career with national mentorship, cash rewards, incubation access, and real-world AI building experience.
          </motion.p>
        </div>

        {/* FUTURISTIC BENTO ADVANTAGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 bg-[#040a1b]/85 border backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden ${
                item.featured
                  ? "md:col-span-2 lg:col-span-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  : "border-slate-800 hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
              }`}
            >
              {/* Metallic Card Frame Image Texture */}
              <img
                src="/metallic_card_frame.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-25 mix-blend-screen group-hover:opacity-40 transition-opacity"
              />

              {/* Corner LED Glow Dots */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400/70 group-hover:bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400/70 group-hover:bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${
                    item.featured
                      ? "bg-amber-950/40 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                      : "bg-[#08132e] border-cyan-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  }`}>
                    {item.icon}
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    item.featured
                      ? "bg-amber-950/80 border-amber-400/50 text-amber-300"
                      : "bg-cyan-950/80 border-cyan-400/40 text-cyan-300"
                  }`}>
                    {item.stats}
                  </span>
                </div>

                {/* Badge Category Tag */}
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1 relative z-10">
                  {item.badge}
                </span>

                {/* Title */}
                <h3 className={`font-black text-white font-sans tracking-tight mb-2 relative z-10 ${
                  item.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                }`}>
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-normal relative z-10">
                  {item.subtitle}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 mb-4 relative z-10">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        item.featured ? "text-amber-400" : "text-cyan-400"
                      }`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="text-slate-400">YODHA Advantage</span>
                <span className={`font-bold flex items-center gap-1 ${
                  item.featured ? "text-amber-300" : "text-cyan-300"
                }`}>
                  <span>Verified</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

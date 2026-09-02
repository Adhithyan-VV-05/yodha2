import { motion } from "framer-motion";
import { MapPin, Sparkles, Flag, CheckCircle2, Rocket, Award, ShieldAlert } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface ScheduleItem {
  phase: string;
  stepNum: string;
  time: string;
  title: string;
  description: string;
  category: string;
  location: string;
  icon: typeof Rocket;
  isKey?: boolean;
}

const HACKATHON_PHASES: ScheduleItem[] = [
  {
    phase: "PHASE 1",
    stepNum: "01",
    time: "OCTOBER 1ST",
    title: "The 48-Hour Sprint",
    description: "48 continuous hours of brainstorming, coding, and building, starting October 1st. The clock is ticking!",
    category: "Coding Sprint",
    location: "Jyothi Engg College",
    icon: Rocket,
    isKey: true,
  },
  {
    phase: "PHASE 2",
    stepNum: "02",
    time: "MILESTONES",
    title: "The Checkpoint Challenge",
    description: "Prove your progress through three rigorous checkpoints—from initial architecture review to final prototype validation.",
    category: "Checkpoints",
    location: "Auditorium Stage",
    icon: ShieldAlert,
  },
  {
    phase: "PHASE 3",
    stepNum: "03",
    time: "MENTORSHIP",
    title: "Guided to Glory",
    description: "Level up your solution with dedicated technical and industry mentoring sessions throughout your hackathon journey.",
    category: "Mentoring",
    location: "Mentoring Hub",
    icon: Sparkles,
    isKey: true,
  },
  {
    phase: "PHASE 4",
    stepNum: "04",
    time: "FIVE STAGES",
    title: "Phase by Phase",
    description: "Navigate the five phases of Yodha: Online Registration, Idea Submission, Selection, the 48-Hour Offline Marathon, and Final Judging.",
    category: "Marathon",
    location: "Campus Grounds",
    icon: Flag,
  },
  {
    phase: "PHASE 5",
    stepNum: "05",
    time: "OCTOBER 3RD",
    title: "The Path to the Pitch",
    description: "From the opening inauguration to the final project demonstrations on October 3rd—every single minute counts.",
    category: "Grand Finale",
    location: "Main Stage",
    icon: Award,
    isKey: true,
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-transparent select-none">
      {/* Background Ambient Purple Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[200px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading"
          >
            THE <span className="text-purple-400">JOURNEY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Five phases. One goal. <strong className="text-purple-400 font-bold">Offline 48-Hour Coding Marathon</strong> at Jyothi Engineering College Auditorium.
          </motion.p>
        </div>

        {/* ZIGZAG TIMELINE CONTAINER */}
        <div className="relative">
          {/* CENTRAL GLOWING SPINE (Centered on Desktop, Left on Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-0" />

          {/* TIMELINE ITEMS LIST */}
          <div className="space-y-12 md:space-y-16">
            {HACKATHON_PHASES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* CENTRAL NODE CIRCLE WITH GLOWING STEP NUMBER */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                      className={`w-12 h-12 rounded-full border-2 bg-[#050817] flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.7)] cursor-pointer ${
                        item.isKey
                          ? "border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.9)]"
                          : "border-purple-500/50"
                      }`}
                    >
                      <span className="font-mono text-xs font-black text-purple-300">{item.stepNum}</span>
                    </motion.div>
                  </div>

                  {/* CONTENT CARD (50% Width on Desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <Card3DTilt intensity={6}>
                      <div className="p-6 sm:p-8 rounded-3xl bg-[#060919]/90 border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300 relative group overflow-hidden">
                        {/* Ambient Aura Highlight inside Card */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

                        {/* Top Info Bar */}
                        <div className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="px-3 py-1 bg-purple-950/80 border border-purple-500/40 rounded-full text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        </div>

                        {/* Title & Icon */}
                        <div className={`flex items-center gap-3 mb-2.5 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-md">
                            <IconComp className="w-4 h-4 text-purple-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {item.description}
                        </p>

                        {/* Bottom Status Tag */}
                        <div className={`mt-4 pt-3 border-t border-purple-500/20 flex items-center gap-2 text-[11px] font-mono text-purple-300 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </Card3DTilt>
                  </div>

                  {/* Empty Spacer Column for Desktop Symmetry */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;

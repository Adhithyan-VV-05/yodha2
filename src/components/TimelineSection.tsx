import { motion } from "framer-motion";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface ScheduleItem {
  phase: string;
  time: string;
  title: string;
  description: string;
  category: string;
  location: string;
  isKey?: boolean;
}

const HACKATHON_PHASES: ScheduleItem[] = [
  {
    phase: "PHASE 1",
    time: "ONLINE",
    title: "Online Registration",
    description: "Teams register online at yodha.aidajecc.in and submit team details and primary domain preference.",
    category: "Registration",
    location: "yodha.aidajecc.in",
  },
  {
    phase: "PHASE 2",
    time: "RELEASE",
    title: "Problem Statement Release & Proposal",
    description: "Official problem statements released across Healthcare & Environmental AI tracks. Teams submit proposals.",
    category: "Ideation",
    location: "Online Portal",
    isKey: true,
  },
  {
    phase: "PHASE 3",
    time: "SHORTLIST",
    title: "Shortlisting Top 40 Teams",
    description: "Expert faculty & mentor panel reviews proposals and shortlists the top 40 teams for the offline marathon.",
    category: "Evaluation",
    location: "Jyothi Engg College",
  },
  {
    phase: "PHASE 4",
    time: "48 HOURS",
    title: "Offline 48-Hour Coding Marathon",
    description: "Shortlisted teams participate in the 48-hour non-stop prototype development marathon at Jyothi Engineering College Auditorium.",
    category: "Coding Marathon",
    location: "JEC Auditorium",
    isKey: true,
  },
  {
    phase: "PHASE 5",
    time: "FINALS",
    title: "Final Judging & Prize Distribution",
    description: "Live prototype demonstration to jury panel followed by grand prize distribution.",
    category: "Grand Finale",
    location: "Main Stage",
    isKey: true,
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-transparent">

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            From Registration To Results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 text-base"
          >
            Five phases. One goal. <span className="text-purple-400 font-bold">Offline 48-Hour Coding Marathon</span> at Jyothi Engineering College Auditorium.
          </motion.p>
        </div>

        {/* Timeline Events List */}
        <div className="relative border-l-2 border-gradient-to-b from-sky-400 via-indigo-500 to-purple-500 ml-4 sm:ml-28 space-y-8 pl-6 sm:pl-10">
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

          {HACKATHON_PHASES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -35, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Diamond Node */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`absolute -left-[32px] sm:-left-[48px] top-4 w-5 h-5 rounded-sm border-2 transform rotate-45 transition-all duration-300 ${
                  item.isKey
                    ? "bg-sky-400 border-white shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                    : "bg-[#06080e] border-indigo-400/60 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                }`}
              />

              {/* Phase Badge (Desktop Left) */}
              <div className="hidden sm:block absolute -left-32 top-3 text-xs font-mono font-bold text-sky-400 w-24 text-right">
                {item.phase}
              </div>

              {/* 3D Card Container */}
              <Card3DTilt intensity={8}>
                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                    item.isKey
                      ? "bg-gradient-to-r from-sky-950/50 via-indigo-950/30 to-slate-950 border-sky-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="sm:hidden text-xs font-mono text-sky-400 flex items-center gap-1 font-bold">
                      {item.phase}
                    </span>
                    <span className="px-3 py-0.5 bg-white/10 border border-white/15 rounded-md text-[10px] font-mono text-sky-300 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 ml-auto">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" /> {item.location}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    {item.isKey && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

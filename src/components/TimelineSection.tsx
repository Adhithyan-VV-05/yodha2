import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Calendar, Sparkles } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  category: string;
  location: string;
  isKey?: boolean;
}

const SCHEDULE: Record<number, ScheduleItem[]> = {
  1: [
    {
      time: "09:00 AM",
      title: "Check-in & Welcome Reception",
      description: "Participant orientation, digital badge activation, and team formation lounge.",
      category: "Check-in",
      location: "Main Stage & Discord",
    },
    {
      time: "10:30 AM",
      title: "Opening Keynote & Track Briefing",
      description: "Official welcome by mentors, hackathon guidelines, and track criteria review.",
      category: "Keynote",
      location: "Main Stage",
      isKey: true,
    },
    {
      time: "12:00 PM",
      title: "Hacking Begins!",
      description: "Official start of the 24-hour development marathon. Project repositories initialized.",
      category: "Hacking",
      location: "Virtual Labs & On-site",
      isKey: true,
    },
    {
      time: "04:00 PM",
      title: "Workshop: Creative Digital Architecture",
      description: "Interactive session on optimizing 60fps performance, canvas visualizers, and state systems.",
      category: "Workshop",
      location: "Workshop Room",
    },
    {
      time: "09:00 PM",
      title: "Midnight Mentor Checkpoint",
      description: "Technical feedback and live debugging with industry software architects.",
      category: "Mentorship",
      location: "Discord Voice & Hub",
    },
  ],
  2: [
    {
      time: "08:00 AM",
      title: "Sunrise Progress Review",
      description: "Optional check-in with technical judges for architecture refinement and advice.",
      category: "Mentorship",
      location: "Mentorship Hub",
    },
    {
      time: "12:00 PM",
      title: "Hacking Freeze & Final Submission",
      description: "All project submissions, source code, and demo videos must be submitted.",
      category: "Deadline",
      location: "Submission Portal",
      isKey: true,
    },
    {
      time: "02:30 PM",
      title: "Top Finalist Live Demos",
      description: "Top shortlisted teams present live product demonstrations to the grand judging panel.",
      category: "Demos",
      location: "Main Stage",
      isKey: true,
    },
    {
      time: "05:00 PM",
      title: "Grand Awards Ceremony & Prize Distribution",
      description: "Announcement of Grand Champion (₹40,000), Track Winners, and INR cash bounties.",
      category: "Ceremony",
      location: "Main Stage",
      isKey: true,
    },
  ],
};

export function TimelineSection() {
  const [activeDay, setActiveDay] = useState<number>(1);

  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>EVENT ROADMAP • 11th & 12th</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            2-Day Hackathon Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-slate-300 text-base"
          >
            Intense 24-hour building schedule on <span className="text-sky-400 font-bold">11th and 12th</span>.
          </motion.p>
        </div>

        {/* Day Selection Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { day: 1, label: "DAY 1", desc: "11th" },
            { day: 2, label: "DAY 2", desc: "12th" },
          ].map((tab) => (
            <button
              key={tab.day}
              onClick={() => setActiveDay(tab.day)}
              className={`px-8 py-3.5 rounded-2xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeDay === tab.day
                  ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white border-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-105"
                  : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="block text-sm tracking-wider">{tab.label}</span>
              <span className="text-[11px] font-mono text-slate-300 opacity-90">{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* Timeline Events List with Permanent Entrance Animations (viewport once: true) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative border-l-2 border-gradient-to-b from-sky-400 via-indigo-500 to-purple-500 ml-4 sm:ml-28 space-y-8 pl-6 sm:pl-10"
          >
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

            {SCHEDULE[activeDay].map((item, idx) => (
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

                {/* Timestamp (Desktop Left) */}
                <div className="hidden sm:block absolute -left-32 top-3 text-xs font-mono font-bold text-sky-400 w-24 text-right">
                  {item.time}
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
                      <span className="sm:hidden text-xs font-mono text-sky-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {item.time}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

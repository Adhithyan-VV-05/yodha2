import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

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
      title: "Opening Keynote & Briefing",
      description: "Official welcome by industry mentors, hackathon guidelines, and track criteria review.",
      category: "Keynote",
      location: "Main Stage",
      isKey: true,
    },
    {
      time: "12:00 PM",
      title: "Hacking Begins",
      description: "Official start of the 24-hour development period. Repositories initialized.",
      category: "Hacking",
      location: "Virtual Labs",
      isKey: true,
    },
    {
      time: "04:00 PM",
      title: "Workshop: Frontend Performance & Motion",
      description: "Interactive session on optimizing 60fps animations, WebGL canvas performance, and bundle size.",
      category: "Workshop",
      location: "Workshop Room",
    },
  ],
  2: [
    {
      time: "09:00 AM",
      title: "Mentorship & Code Reviews",
      description: "Book 1-on-1 sessions with technical judges for code architectural guidance and feedback.",
      category: "Mentorship",
      location: "Mentorship Hub",
    },
    {
      time: "02:00 PM",
      title: "Midway Checkpoint & Office Hours",
      description: "Optional progress demo and assistance with Firebase or Google Form integration.",
      category: "Support",
      location: "Help Desk",
    },
    {
      time: "08:00 PM",
      title: "Draft Submission Preview",
      description: "Opportunity to verify deployment URLs and test form submissions prior to final freeze.",
      category: "Checkpoint",
      location: "Online Portal",
    },
  ],
  3: [
    {
      time: "12:00 PM",
      title: "Code Freeze & Final Submission",
      description: "All code commits and demo videos must be submitted to the official portal.",
      category: "Deadline",
      location: "Submission Portal",
      isKey: true,
    },
    {
      time: "02:00 PM",
      title: "Finalist Live Demos",
      description: "Top selected teams present 3-minute live product demonstrations to the judging panel.",
      category: "Demos",
      location: "Main Stage",
      isKey: true,
    },
    {
      time: "05:00 PM",
      title: "Awards Ceremony & Closing Remarks",
      description: "Announcement of track winners, grand champion, and prize distribution.",
      category: "Ceremony",
      location: "Main Stage",
      isKey: true,
    },
  ],
};

export function TimelineSection() {
  const [activeDay, setActiveDay] = useState<number>(1);

  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-[#06080e]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">
            EVENT ROADMAP
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Hackathon Schedule
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            3 days of building, learning, and presenting your work.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { day: 1, label: "Day 1", desc: "July 28" },
            { day: 2, label: "Day 2", desc: "July 29" },
            { day: 3, label: "Day 3", desc: "July 30" },
          ].map((tab) => (
            <button
              key={tab.day}
              onClick={() => setActiveDay(tab.day)}
              className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                activeDay === tab.day
                  ? "bg-white text-black border-white shadow-md"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="block">{tab.label}</span>
              <span className="text-[10px] font-mono text-slate-400 opacity-80">{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* Timeline Events List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="relative border-l border-white/10 ml-4 sm:ml-28 space-y-6 pl-6 sm:pl-8"
          >
            {SCHEDULE[activeDay].map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-2 w-3 h-3 rounded-full border transition-transform ${
                    item.isKey
                      ? "bg-sky-400 border-white shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                      : "bg-[#06080e] border-slate-600"
                  }`}
                />

                {/* Left Timestamp (Desktop) */}
                <div className="hidden sm:block absolute -left-32 top-1.5 text-xs font-mono text-slate-400 w-24 text-right">
                  {item.time}
                </div>

                {/* Card Container */}
                <div
                  className={`p-6 rounded-2xl border transition-all duration-200 ${
                    item.isKey
                      ? "bg-white/[0.04] border-white/20 shadow-md"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="sm:hidden text-xs font-mono text-sky-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-slate-300">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 ml-auto">
                      <MapPin className="w-3 h-3 text-sky-400" /> {item.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

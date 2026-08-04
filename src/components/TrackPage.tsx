import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, X, HeartPulse, Leaf, Search, Tag, CheckCircle2, ChevronRight } from "lucide-react";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  ENVIRONMENTAL_PROBLEM_STATEMENTS,
  HEALTHCARE_STYLES,
  ENVIRONMENTAL_STYLES,
} from "../data/problemStatements";
import type { ProblemStatement, ProblemStatementStyle } from "../data/problemStatements";

interface TrackPageProps {
  trackType: "healthcare" | "environmental";
  onBack: () => void;
  onOpenRegisterWithTrack: (trackName: string) => void;
}

export function TrackPage({ trackType, onBack, onOpenRegisterWithTrack }: TrackPageProps) {
  const [selectedStatement, setSelectedStatement] = useState<ProblemStatement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const isHealthcare = trackType === "healthcare";

  const statements: ProblemStatement[] = isHealthcare
    ? HEALTHCARE_PROBLEM_STATEMENTS
    : ENVIRONMENTAL_PROBLEM_STATEMENTS;

  const stylesMap: Record<number, ProblemStatementStyle> = isHealthcare
    ? HEALTHCARE_STYLES.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
    : ENVIRONMENTAL_STYLES.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

  const filteredStatements = statements.filter((st) => {
    const matchesSearch =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.cardDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty === "All" || st.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  const getStyleForId = (id: number): ProblemStatementStyle => {
    return (
      stylesMap[id] || {
        id,
        theme: "Default",
        primary: isHealthcare ? "#EF4444" : "#10B981",
        secondary: isHealthcare ? "#F87171" : "#34D399",
        accent: isHealthcare ? "#FCA5A5" : "#6EE7B7",
        background: isHealthcare ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
        border: isHealthcare ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)",
        heading: "#FFFFFF",
        content: "#E2E8F0",
        button: isHealthcare ? "#DC2626" : "#059669",
        buttonHover: isHealthcare ? "#B91C1C" : "#047857",
        glow: isHealthcare ? "rgba(239,68,68,0.45)" : "rgba(16,185,129,0.45)",
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#03060d] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Dynamic Radial Aura Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none z-0"
        style={{
          background: isHealthcare
            ? "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(14,165,233,0.08) 100%)"
            : "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.08) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-white/10 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Main Page</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hidden sm:inline-block">
            YODHA 2.0 • {isHealthcare ? "Healthcare Track" : "Environmental Track"}
          </span>
        </div>

        {/* Track Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4 border"
            style={{
              borderColor: isHealthcare ? "rgba(239,68,68,0.5)" : "rgba(16,185,129,0.5)",
              backgroundColor: isHealthcare ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
              color: isHealthcare ? "#FCA5A5" : "#6EE7B7",
            }}
          >
            {isHealthcare ? <HeartPulse className="w-4 h-4 text-rose-400" /> : <Leaf className="w-4 h-4 text-emerald-400" />}
            <span>{isHealthcare ? "HEALTHCARE AI TRACK (IDs 1 - 10)" : "ENVIRONMENTAL AI TRACK (IDs 11 - 20)"}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-400 tracking-tight">
            {isHealthcare ? "Healthcare AI Problem Statements" : "Environmental AI Problem Statements"}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Select a problem statement below to review full challenges, objectives, constraints, and innovation scope for Yodha 2.0.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white/[0.03] border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem statements or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold shrink-0">Difficulty:</span>
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-sky-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of 20 Problem Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredStatements.map((st) => {
            const stStyle = getStyleForId(st.id);

            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between border backdrop-blur-xl shadow-xl relative overflow-hidden transition-all group"
                style={{
                  backgroundColor: stStyle.background,
                  borderColor: stStyle.border,
                }}
              >
                <div>
                  {/* Top Bar: ID Pill & Difficulty */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-black border"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderColor: stStyle.secondary,
                        color: stStyle.accent,
                      }}
                    >
                      ID #{st.id}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase bg-black/50 text-slate-300 border border-white/10">
                      {st.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold mb-3 leading-snug" style={{ color: stStyle.heading }}>
                    {st.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5 line-clamp-3">
                    {st.cardDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {st.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10 flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 text-sky-400" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => setSelectedStatement(st)}
                  className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border border-white/10 hover:brightness-110"
                  style={{
                    backgroundColor: stStyle.button,
                    color: "#FFFFFF",
                  }}
                >
                  <span>Read Details & Solve</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL PROBLEM STATEMENT READ-MORE MODAL */}
      <AnimatePresence>
        {selectedStatement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStatement(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#090d19] border border-white/20 p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto z-10 text-left"
            >
              {/* Top Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-sky-500/20 text-sky-300 border border-sky-400/40">
                    ID #{selectedStatement.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {selectedStatement.category} AI TRACK
                  </span>
                </div>

                <button
                  onClick={() => setSelectedStatement(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">{selectedStatement.title}</h2>

              {/* Background Section */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold mb-1">
                  BACKGROUND CONTEXT
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedStatement.readMore.background}
                </p>
              </div>

              {/* Problem Challenge */}
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold mb-1">
                  THE CHALLENGE
                </h4>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  {selectedStatement.readMore.challenge}
                </p>
              </div>

              {/* Key Objectives */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold mb-2">
                  KEY OBJECTIVES
                </h4>
                <ul className="space-y-2">
                  {selectedStatement.readMore.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Technologies */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold mb-2">
                  SUGGESTED TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStatement.readMore.suggestedTechnologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-purple-950/60 border border-purple-500/40 text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal CTA: Register for this Track */}
              <button
                onClick={() => {
                  setSelectedStatement(null);
                  onOpenRegisterWithTrack(
                    isHealthcare ? "Healthcare AI" : "Environmental AI"
                  );
                }}
                className="w-full py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-200 animate-spin" />
                <span>Register Team for {selectedStatement.category} AI Track</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

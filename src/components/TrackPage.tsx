import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, X, HeartPulse, Leaf, Search, Tag, CheckCircle2, ChevronRight, Maximize2, Filter, ChevronDown } from "lucide-react";
import { YodhaImage } from "./YodhaImage";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  ENVIRONMENTAL_PROBLEM_STATEMENTS,
  HEALTHCARE_STYLES,
  ENVIRONMENTAL_STYLES,
  getPSImage,
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

  // Native Browser Backtrack Support (Listens for Browser Back Button / ESC)
  useEffect(() => {
    const handlePopState = () => {
      if (selectedStatement) {
        setSelectedStatement(null);
      } else {
        onBack();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedStatement) setSelectedStatement(null);
        else onBack();
      }
    };

    window.history.pushState({ track: trackType, modal: !!selectedStatement }, "");
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedStatement, trackType, onBack]);

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
    <div className="min-h-screen bg-transparent text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
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
            className="btn-metallic-silver flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider cursor-pointer hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 text-slate-950" />
            <span>Back to Main Page</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hidden sm:inline-block">
            YODHA 2.0 • {isHealthcare ? "Healthcare Track" : "Environmental Track"}
          </span>
        </div>

        {/* Track Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4 border shadow-md"
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

        {/* Search & Theme Difficulty Dropdown Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#040816]/90 border border-sky-500/30 p-4 rounded-2xl backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem statements or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-cyan-400/30 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>

          {/* THEMED CYBERPUNK DIFFICULTY DROPDOWN MENU */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIFFICULTY LEVEL:</span>
            </span>
            <div className="relative w-full sm:w-56">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full appearance-none bg-[#070e22] border border-cyan-400/50 hover:border-cyan-300 rounded-xl px-4 py-2.5 pr-10 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer transition-all uppercase tracking-wider"
              >
                <option value="All" className="bg-[#070e22] text-cyan-300 font-bold">⚡ All Difficulties</option>
                <option value="Easy" className="bg-[#070e22] text-emerald-300 font-bold">🟢 Easy</option>
                <option value="Medium" className="bg-[#070e22] text-amber-300 font-bold">🟡 Medium</option>
                <option value="Hard" className="bg-[#070e22] text-rose-300 font-bold">🔴 Hard</option>
              </select>
              <ChevronDown className="w-4 h-4 text-cyan-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid of 20 Problem Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredStatements.map((st) => {
            const stStyle = getStyleForId(st.id);
            const psImage = getPSImage(st);

            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl p-5 sm:p-6 flex flex-col justify-between border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all group"
                style={{
                  backgroundColor: stStyle.background,
                  borderColor: stStyle.border,
                }}
              >
                <div>
                  {/* Image Card Container */}
                  <div
                    onClick={() => {
                      setSelectedStatement(st);
                      window.history.pushState({ modal: st.id }, "");
                    }}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 group/img border border-white/15 shadow-lg cursor-pointer bg-black/60"
                  >
                    <YodhaImage
                      src={psImage}
                      alt={st.title}
                      className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c17] via-black/30 to-transparent opacity-85 group-hover/img:opacity-50 transition-opacity" />

                    {/* Top Left ID Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span
                        className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black border backdrop-blur-md shadow-md"
                        style={{
                          backgroundColor: "rgba(3, 6, 13, 0.8)",
                          borderColor: stStyle.secondary,
                          color: stStyle.accent,
                        }}
                      >
                        ID #{st.id}
                      </span>
                    </div>

                    {/* Top Right Difficulty Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase border shadow-md backdrop-blur-md ${
                        st.difficulty === "Easy"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                          : st.difficulty === "Medium"
                          ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                          : "bg-rose-950/80 text-rose-300 border-rose-500/40"
                      }`}>
                        {st.difficulty}
                      </span>
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-300 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded border border-sky-400/30">
                        {st.category} AI
                      </span>
                      <span className="text-[10px] font-mono text-white bg-sky-500/80 backdrop-blur-md px-2 py-0.5 rounded border border-sky-300/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 shadow-lg font-bold">
                        <Maximize2 className="w-3 h-3 text-white" /> View Image
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold mb-2.5 leading-snug" style={{ color: stStyle.heading }}>
                    {st.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4 line-clamp-3">
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
                  onClick={() => {
                    setSelectedStatement(st);
                    window.history.pushState({ modal: st.id }, "");
                  }}
                  className="btn-metallic-silver w-full py-3 px-4 rounded-xl text-xs font-mono font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform"
                >
                  <span>Read Details & Solve</span>
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL PROBLEM STATEMENT READ-MORE MODAL WITH BACKTRACK SUPPORT */}
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
              className="relative w-full max-w-3xl rounded-3xl bg-[#090d19] border border-cyan-400/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(56,189,248,0.3)] max-h-[90vh] overflow-y-auto z-10 text-left"
            >
              {/* Top Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-sky-500/20 text-sky-300 border border-sky-400/40">
                    ID #{selectedStatement.id}
                  </span>
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest font-bold">
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

              {/* Problem Statement Hero Image Card in Modal */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-2xl group bg-black/80">
                <YodhaImage
                  src={getPSImage(selectedStatement)}
                  alt={selectedStatement.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d19] via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-sky-300 border border-sky-400/40 shadow-md">
                    Problem Statement Card #{selectedStatement.id}
                  </span>
                  <a
                    href={getPSImage(selectedStatement)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-sky-500/80 hover:bg-sky-400 text-white backdrop-blur-md border border-sky-300/40 flex items-center gap-1.5 transition-all shadow-lg"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Full Image
                  </a>
                </div>
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
                className="btn-metallic-silver w-full py-4 rounded-2xl uppercase tracking-widest text-xs sm:text-sm font-mono font-extrabold flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
                <span>Register Team for {selectedStatement.category} AI Track</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, X, Search, CheckCircle2, ChevronRight, Maximize2, Filter } from "lucide-react";
import { YodhaImage } from "./YodhaImage";
import { CyberDropdown } from "./ui/CyberDropdown";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  getPSImage,
} from "../data/problemStatements";
import type { ProblemStatement } from "../data/problemStatements";

interface TrackPageProps {
  trackType: "healthcare";
  onBack: () => void;
  onOpenRegisterWithTrack: (trackName: string) => void;
}

export function TrackPage({ trackType, onBack, onOpenRegisterWithTrack }: TrackPageProps) {
  const [selectedStatement, setSelectedStatement] = useState<ProblemStatement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

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

  const statements: ProblemStatement[] = HEALTHCARE_PROBLEM_STATEMENTS;

  const filteredStatements = statements.filter((st) => {
    const matchesSearch =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.cardDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty === "All" || st.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-transparent text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden select-none">
      
      {/* OUR NIGHT HILLS THEME BACKGROUND IMAGE LAYER */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/bg-hills-night-pc.webp"
          alt="Yodha Night Hills Background"
          className="w-full h-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-slate-950/55 pointer-events-none" />
      </div>

      {/* Background Aura Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-purple-600/15 blur-[200px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-purple-500/20 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900 border border-purple-500/40 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer hover:scale-105 transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Track Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading">
            Healthcare AI Problem <span className="text-purple-400">Statements</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Select a problem statement below to review full challenges, objectives, constraints, and innovation scope for YODHA 2.0.
          </p>
        </div>

        {/* Search & Difficulty Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-950/70 border border-purple-500/30 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem statements or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-purple-500/30 rounded-xl text-xs sm:text-sm font-sans text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-purple-400" />
              <span>DIFFICULTY:</span>
            </span>
            <CyberDropdown
              options={[
                { value: "All", label: "ALL DIFFICULTIES" },
                { value: "Easy", label: "EASY LEVEL", badge: "EASY" },
                { value: "Medium", label: "MEDIUM LEVEL", badge: "MEDIUM" },
                { value: "Hard", label: "HARD LEVEL", badge: "HARD" },
              ]}
              value={selectedDifficulty}
              onChange={(val) => setSelectedDifficulty(val as string)}
              className="w-full sm:w-56"
            />
          </div>
        </div>

        {/* Grid of 20 Problem Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredStatements.map((st) => {
            const psImage = getPSImage(st);

            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-3xl p-5 sm:p-6 flex flex-col justify-between border bg-slate-950/70 border-purple-500/30 hover:border-purple-400/60 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all group"
              >
                <div>
                  {/* Image Card Container */}
                  <div
                    onClick={() => {
                      setSelectedStatement(st);
                      window.history.pushState({ modal: st.id }, "");
                    }}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 group/img border border-purple-500/20 shadow-md cursor-pointer bg-black"
                  >
                    <YodhaImage
                      src={psImage}
                      alt={st.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060919] via-black/20 to-transparent opacity-85" />

                    {/* Top Left ID Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black bg-slate-950/90 text-purple-300 border border-purple-500/40">
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
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug font-heading">
                    {st.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4 line-clamp-3">
                    {st.cardDescription}
                  </p>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => {
                    setSelectedStatement(st);
                    window.history.pushState({ modal: st.id }, "");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform shadow-md"
                >
                  <span>Review Problem Details</span>
                  <ChevronRight className="w-4 h-4 text-white" />
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
              className="relative w-full max-w-3xl rounded-3xl bg-[#060919] border border-purple-500/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto z-10 text-left text-white"
            >
              {/* Top Close Button */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-purple-950/80 text-purple-300 border border-purple-500/40">
                    ID #{selectedStatement.id}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedStatement(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Problem Statement Image */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 border border-purple-500/20 shadow-2xl group bg-black">
                <YodhaImage
                  src={getPSImage(selectedStatement)}
                  alt={selectedStatement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060919] via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 right-3">
                  <a
                    href={getPSImage(selectedStatement)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-purple-600/80 hover:bg-purple-500 text-white backdrop-blur-md border border-purple-400/40 flex items-center gap-1.5 transition-all shadow-lg"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Full Image
                  </a>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading mb-4">{selectedStatement.title}</h2>

              {/* Background Section */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold mb-1">
                  BACKGROUND CONTEXT
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedStatement.readMore.background}
                </p>
              </div>

              {/* Problem Challenge */}
              <div className="mb-6 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                <h4 className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold mb-1">
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
                  onOpenRegisterWithTrack("Healthcare AI");
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-transform shadow-xl"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Register Team for {selectedStatement.category} AI Track</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TrackPage;

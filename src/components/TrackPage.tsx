import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, X, Search, Check, ChevronDown, Maximize2, ArrowRight } from "lucide-react";
import { YodhaImage } from "./YodhaImage";
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

function DifficultyDots({ difficulty }: { difficulty: "Easy" | "Medium" | "Hard" }) {
  const filledCount = difficulty === "Easy" ? 2 : difficulty === "Medium" ? 3 : 4;
  const colorClass =
    difficulty === "Easy"
      ? "text-emerald-400"
      : difficulty === "Medium"
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <div className={`flex items-center gap-1.5 text-[11px] font-mono font-bold ${colorClass} uppercase tracking-wider`}>
      <span>{difficulty}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={`text-[8px] ${i <= filledCount ? "opacity-100" : "opacity-30"}`}>
            ●
          </span>
        ))}
      </div>
    </div>
  );
}

export function TrackPage({ trackType, onBack, onOpenRegisterWithTrack }: TrackPageProps) {
  const [selectedStatement, setSelectedStatement] = useState<ProblemStatement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="min-h-screen bg-transparent text-white py-6 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden select-none">
      
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
        
        {/* TOP HEADER ROW: BACK BUTTON (LEFT) */}
        <div className="flex items-center justify-between mb-6 sm:mb-10 pt-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#081122]/80 border border-purple-500/35 text-slate-200 hover:text-white font-mono text-xs font-medium uppercase tracking-wider cursor-pointer hover:border-purple-400 transition-all shadow-lg backdrop-blur-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
            <span>BACK TO HOME</span>
          </button>
        </div>

        {/* SECTION HEADER AREA */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-3">
          {/* TRACKING SUBTITLE LABEL */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 sm:w-16 h-[1px] bg-slate-700/60" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.35em] text-slate-400 uppercase">
              REAL CHALLENGES. BRIGHTER TOMORROW
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-slate-700/60" />
          </div>

          {/* MAIN CINEMATIC TITLE */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white py-1 drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            Healthcare AI <span className="text-purple-400">Problem Statements</span>
          </h1>

          {/* SUPPORTING DESCRIPTION */}
          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl mx-auto leading-relaxed">
            Explore real-world healthcare challenges and build AI solutions for a better, healthier tomorrow.
          </p>
        </div>

        {/* SEARCH & DIFFICULTY FILTER CONTROLS BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Search Box */}
          <div className="relative w-full sm:flex-1 bg-[#070e1c]/80 border border-purple-500/35 rounded-2xl px-4 py-3 backdrop-blur-xl focus-within:border-purple-400/80 transition-all shadow-lg">
            <div className="flex items-center">
              <Search className="w-4 h-4 text-purple-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problem statements..."
                className="w-full bg-transparent text-xs sm:text-sm font-sans text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Difficulty Dropdown */}
          <div className="relative w-full sm:w-64 shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#070e1c]/80 border border-purple-500/35 hover:border-purple-400/70 rounded-2xl px-4 py-2 backdrop-blur-xl transition-all cursor-pointer flex items-center justify-between text-left shadow-lg"
            >
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                  FILTER
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-white block mt-0.5">
                  {selectedDifficulty === "All" ? "Difficulty" : `${selectedDifficulty}`}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-full bg-[#0c1427]/95 border border-purple-500/40 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 space-y-1"
                >
                  <button
                    onClick={() => {
                      setSelectedDifficulty("All");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-sans transition-colors cursor-pointer ${
                      selectedDifficulty === "All"
                        ? "bg-purple-600/30 text-white font-semibold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>All Difficulties</span>
                    {selectedDifficulty === "All" && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  </button>

                  {(["Easy", "Medium", "Hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-sans transition-colors cursor-pointer ${
                        selectedDifficulty === diff
                          ? "bg-purple-600/30 text-white font-semibold"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{diff}</span>
                      <DifficultyDots difficulty={diff} />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* PROBLEM STATEMENTS GRID (3 COLUMNS ON DESKTOP, EXACTLY MATCHING SCREENSHOT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredStatements.map((st) => {
            const psImage = getPSImage(st);
            const subCategory = st.tags[0] || st.category;

            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-3xl p-4 sm:p-5 flex flex-col justify-between bg-transparent border border-purple-500/35 hover:border-purple-400/80 backdrop-blur-sm transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  {/* Image Banner */}
                  <div
                    onClick={() => {
                      setSelectedStatement(st);
                      window.history.pushState({ modal: st.id }, "");
                    }}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-3 bg-black border border-purple-500/20 shadow-md cursor-pointer group/img"
                  >
                    <YodhaImage
                      src={psImage}
                      alt={st.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Metadata Row: ID | SubCategory & Difficulty Dots */}
                  <div className="flex items-center justify-between text-xs font-mono mb-2 px-0.5">
                    <div className="text-slate-400 font-medium tracking-wider text-[11px]">
                      ID #{st.id.toString().padStart(2, "0")} &nbsp;|&nbsp; {subCategory}
                    </div>
                    <DifficultyDots difficulty={st.difficulty} />
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => {
                      setSelectedStatement(st);
                      window.history.pushState({ modal: st.id }, "");
                    }}
                    className="text-lg sm:text-xl font-serif font-normal text-white mb-2 leading-snug hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {st.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal mb-4 line-clamp-3">
                    {st.cardDescription}
                  </p>
                </div>

                {/* View Challenge Link */}
                <button
                  onClick={() => {
                    setSelectedStatement(st);
                    window.history.pushState({ modal: st.id }, "");
                  }}
                  className="text-purple-400 font-mono text-xs font-bold tracking-wider hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer pt-1 self-start group/btn"
                >
                  <span>View Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover/btn:translate-x-1 transition-transform" />
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
              exit={{ opacity: 0, scale: 1, y: 0 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#060919] border border-purple-500/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto z-10 text-left text-white"
            >
              {/* Top Close Button */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-purple-950/80 text-purple-300 border border-purple-500/40">
                    ID #{selectedStatement.id.toString().padStart(2, "0")}
                  </span>
                  <DifficultyDots difficulty={selectedStatement.difficulty} />
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
              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white mb-4">{selectedStatement.title}</h2>

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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
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
                <span>Register Team for Healthcare AI Track</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TrackPage;

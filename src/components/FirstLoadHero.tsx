"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Code, Target, Play, MapPin, Users, Lightbulb, Globe, Trophy } from "lucide-react";

interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
  onOpenTrailer?: () => void;
}

export function FirstLoadHero({ onOpenRegister: _, onOpenTrailer }: FirstLoadHeroProps) {
  // Live countdown timer targeting 1 October 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 10,
    minutes: 15,
    seconds: 40,
  });

  // Mobile 1.5s cycling phrase state (stacked words)
  const mobilePhrases = [
    { word1: "RISE", word2: "AS", word3: "WARRIORS," },
    { word1: "THINK", word2: "AS", word3: "INNOVATORS," },
    { word1: "BUILD", word2: "FOR", word3: "HUMANITY." },
  ];
  const [mobileIndex, setMobileIndex] = useState(0);

  // PC Typewriter animation state (displays ONE sentence at a time)
  const pcSentences = [
    { text: "RISE AS ", keyword: "WARRIORS," },
    { text: "THINK AS ", keyword: "INNOVATORS," },
    { text: "BUILD FOR ", keyword: "HUMANITY." },
  ];
  const [pcIndex, setPcIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Timer Countdown Effect
  useEffect(() => {
    const targetDate = new Date("2026-10-01T09:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mobile sentence cycle interval (1.5 seconds per sentence)
  useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % mobilePhrases.length);
    }, 1500);
    return () => clearInterval(mobileTimer);
  }, [mobilePhrases.length]);

  // PC Typewriter effect
  useEffect(() => {
    const currentItem = pcSentences[pcIndex];
    const fullText = currentItem.text + currentItem.keyword;
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < fullText.length) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 60);
      } else {
        // Pause for 1.5 seconds when full sentence is typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setPcIndex((prev) => (prev + 1) % pcSentences.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, pcIndex, pcSentences]);

  // Helper to render PC typewriter sentence with blue keyword styling
  const renderPcTypewriterSentence = () => {
    const currentItem = pcSentences[pcIndex];
    const prefixLen = currentItem.text.length;

    if (charIndex <= prefixLen) {
      return (
        <span className="text-slate-950 font-black">
          {currentItem.text.slice(0, charIndex)}
        </span>
      );
    } else {
      const keywordChars = currentItem.keyword.slice(0, charIndex - prefixLen);
      return (
        <span>
          <span className="text-slate-950 font-black">{currentItem.text}</span>
          <span className="text-blue-600 font-serif font-black drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            {keywordChars}
          </span>
        </span>
      );
    }
  };

  const activeMobilePhrase = mobilePhrases[mobileIndex];

  return (
    <section className="relative w-full min-h-screen pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none z-10">
      
      {/* DESKTOP (PC) VIEW LAYOUT (POSITIONED AT 30VH BELOW TOP, SLIGHTLY ALIGNED LEFT) */}
      <div className="hidden sm:block relative z-20 max-w-2xl pt-[28vh] space-y-4">
        
        {/* TYPEWRITER PC HEADLINE - ONE SENTENCE AT A TIME */}
        <div className="h-20 flex items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] font-sans">
            {renderPcTypewriterSentence()}
            <span className="inline-block w-1.5 h-10 bg-blue-600 ml-1 animate-pulse" />
          </h1>
        </div>

        {/* BLUE GRADIENT ACCENT BAR */}
        <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

        {/* SUBHEADLINE BRIEF */}
        <p className="text-sm lg:text-base text-slate-900 font-semibold max-w-lg leading-relaxed font-sans">
          A battlefield for <strong className="text-blue-600 font-extrabold">bold ideas</strong>,<br />
          where technology meets <strong className="text-blue-600 font-extrabold">purpose</strong> and <strong className="text-blue-600 font-extrabold">innovation</strong> leaves an <strong className="text-blue-600 font-extrabold">impact</strong>.
        </p>

        {/* 3 STAT CARDS IN A ROW */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-1">
          <div className="p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-black text-slate-950">48 HOURS</span>
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase">NON-STOP</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
              <Code className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-black text-slate-950">16 PROBLEMS</span>
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase">REAL WORLD</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/90 border border-blue-200 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-black text-slate-950">CREATE IMPACT</span>
              <span className="text-[9px] font-mono text-slate-600 font-bold uppercase">AI MISSION</span>
            </div>
          </div>
        </div>

        {/* TIMER + TRAILER + JYOTHY LOCATION ALL IN ONE SINGLE ROW ON PC */}
        <div className="flex items-center gap-5 pt-2 flex-nowrap">
          {/* COUNTDOWN BOX */}
          <div className="p-3.5 rounded-2xl bg-[#08112d]/95 border border-blue-500/40 backdrop-blur-2xl flex flex-col space-y-1 shadow-md shrink-0">
            <span className="text-[9px] font-mono font-extrabold text-blue-400 uppercase tracking-widest text-center">
              HACKATHON STARTS IN
            </span>
            <div className="flex items-center justify-center gap-2 text-center">
              <div className="flex flex-col">
                <span className="text-xl font-black font-mono text-white">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">DAYS</span>
              </div>
              <span className="text-base font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl font-black font-mono text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">HRS</span>
              </div>
              <span className="text-base font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl font-black font-mono text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">MIN</span>
              </div>
              <span className="text-base font-bold text-blue-400">:</span>
              <div className="flex flex-col">
                <span className="text-xl font-black font-mono text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">SEC</span>
              </div>
            </div>
          </div>

          {/* TRAILER BUTTON */}
          <button
            onClick={() => onOpenTrailer && onOpenTrailer()}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
              TRAILER
            </span>
          </button>

          {/* JYOTHY LOCATION WITH BLUE MAP PIN (NO N BADGE) IN SAME ROW */}
          <div className="flex items-center gap-2 text-left shrink-0">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="flex flex-col text-[10px] lg:text-[11px] font-mono text-slate-900 leading-tight">
              <span className="font-black text-slate-950 uppercase">JYOTHY ENGINEERING COLLEGE (AUTONOMOUS)</span>
              <span className="text-[8px] lg:text-[9px] text-slate-600 font-bold uppercase">DEPT. OF AI & DS</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW LAYOUT (STACKED WORDS CYCLING 1.5s + CONTENT PLACED BELOW 60VH) */}
      <div className="block sm:hidden relative z-20 w-full pt-16">
        
        {/* CYCLING STACKED PHRASE ANIMATION (TOP SECTION) */}
        <div className="h-32 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col text-left space-y-0.5"
            >
              <span className="text-2xl font-black text-slate-950 uppercase font-sans tracking-tight">
                {activeMobilePhrase.word1}
              </span>
              <span className="text-2xl font-black text-slate-950 uppercase font-sans tracking-tight">
                {activeMobilePhrase.word2}
              </span>
              <span className="text-2xl font-black text-blue-600 font-serif tracking-tight">
                {activeMobilePhrase.word3}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SUBHEADLINE & ALL SUBSEQUENT CONTENTS PLACED BELOW 60VH ON MOBILE */}
        <div className="pt-[22vh] space-y-4">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full" />

          {/* SUBHEADLINE BRIEF BELOW 60VH */}
          <p className="text-xs text-slate-900 font-semibold leading-relaxed font-sans">
            A battlefield for <strong className="text-blue-600 font-extrabold">bold ideas</strong>,<br />
            where technology meets <strong className="text-blue-600 font-extrabold">purpose</strong> and <strong className="text-blue-600 font-extrabold">innovation</strong> leaves an <strong className="text-blue-600 font-extrabold">impact</strong>.
          </p>

          {/* 3 STAT CARDS BELOW 60VH */}
          <div className="grid grid-cols-3 gap-2 w-full pt-1">
            <div className="p-2 rounded-xl bg-white/90 border border-blue-200 flex items-center gap-1.5 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-[10px] font-mono font-black text-slate-950">48 HOURS</span>
            </div>

            <div className="p-2 rounded-xl bg-white/90 border border-blue-200 flex items-center gap-1.5 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
                <Code className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-[10px] font-mono font-black text-slate-950">16 PROBLEMS</span>
            </div>

            <div className="p-2 rounded-xl bg-white/90 border border-blue-200 flex items-center gap-1.5 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-blue-100/80 border border-blue-200/60 flex items-center justify-center shrink-0">
                <Target className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-[10px] font-mono font-black text-slate-950">CREATE IMPACT</span>
            </div>
          </div>

          {/* TIMER + TRAILER BELOW 60VH */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-[#08112d]/95 border border-blue-500/40 backdrop-blur-2xl flex flex-col space-y-1 shadow-md">
              <span className="text-[8px] font-mono font-extrabold text-blue-400 uppercase tracking-widest text-center">
                HACKATHON STARTS IN
              </span>
              <div className="flex items-center justify-center gap-2 text-center">
                <div className="flex flex-col">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">DAYS</span>
                </div>
                <span className="text-sm font-bold text-blue-400">:</span>
                <div className="flex flex-col">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">HRS</span>
                </div>
                <span className="text-sm font-bold text-blue-400">:</span>
                <div className="flex flex-col">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">MIN</span>
                </div>
                <span className="text-sm font-bold text-blue-400">:</span>
                <div className="flex flex-col">
                  <span className="text-lg font-black font-mono text-white">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-mono text-slate-400 font-bold uppercase">SEC</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenTrailer && onOpenTrailer()}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 flex items-center justify-center shadow-md">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider">
                TRAILER
              </span>
            </button>
          </div>

          {/* JYOTHY LOCATION BELOW 60VH */}
          <div className="flex items-center gap-2 text-left pt-1">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="flex flex-col text-[10px] font-mono text-slate-900 leading-tight">
              <span className="font-black text-slate-950 uppercase">JYOTHY ENGINEERING COLLEGE (AUTONOMOUS)</span>
              <span className="text-[8px] text-slate-600 font-bold uppercase">DEPT. OF AI & DS</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FEATURE DECK */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full px-2 py-2.5 sm:px-4 sm:py-3.5 rounded-2xl bg-[#050612]/95 border border-blue-500/40 backdrop-blur-xl shadow-lg flex items-center justify-between gap-1 sm:gap-2 text-xs font-mono mt-6"
      >
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">COLLABORATE</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">INNOVATE</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">IMPACT</span>
        </div>

        <div className="h-3.5 sm:h-5 w-[1px] bg-blue-500/40 shrink-0" />

        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-2 min-w-0">
          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight sm:tracking-wider text-[8px] min-[380px]:text-[9px] sm:text-[11px] truncate">WIN & GROW</span>
        </div>
      </motion.div>

    </section>
  );
}

export default FirstLoadHero;

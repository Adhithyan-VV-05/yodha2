"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Code, Target, Play, MapPin, Users, Lightbulb, Globe, Trophy } from "lucide-react";
import { getCachedVideoBlobUrl, downloadMultithreadedVideo } from "../lib/videoCache";


interface FirstLoadHeroProps {
  onOpenRegister: (trackName?: string) => void;
  onOpenTrailer?: (videoUrl?: string) => void;
}

export function FirstLoadHero({ onOpenRegister: _, onOpenTrailer }: FirstLoadHeroProps) {
  // Trailer Download & Live Progress State
  const [trailerState, setTrailerState] = useState<"idle" | "loading" | "ready">("idle");
  const [trailerProgress, setTrailerProgress] = useState<number>(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);

  // Live countdown timer targeting 1 October 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 10,
    minutes: 15,
    seconds: 40,
  });

  // Background Preloading of Trailer Video after Site Content is Loaded

  useEffect(() => {
    let isMounted = true;
    const TRAILER_FILE = "/main trailer.mp4";
    const CACHE_KEY = "yodha_main_trailer_v2";

    const initPreload = async () => {
      try {
        // 1. Check IndexedDB cache first
        const cachedUrl = await getCachedVideoBlobUrl(CACHE_KEY);
        if (cachedUrl && isMounted) {
          setVideoBlobUrl(cachedUrl);
          setTrailerProgress(100);
          setTrailerState("ready");
          return;
        }

        // 2. Start multithreaded parallel background download after content load
        if (isMounted) {
          setTrailerState("loading");
          setTrailerProgress(0);
        }

        const url = await downloadMultithreadedVideo(TRAILER_FILE, CACHE_KEY, (pct) => {
          if (isMounted) {
            setTrailerProgress(pct);
          }
        });

        if (isMounted) {
          setVideoBlobUrl(url);
          setTrailerProgress(100);
          setTrailerState("ready");
        }
      } catch (err) {
        console.warn("Background trailer download issue:", err);
        if (isMounted) {
          setTrailerState("ready");
        }
      }
    };

    // Delay start until site main content is mounted
    const timer = setTimeout(() => {
      initPreload();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleTrailerClick = () => {
    const targetUrl = videoBlobUrl || "/main trailer.mp4";
    if (onOpenTrailer) {
      onOpenTrailer(targetUrl);
    }
  };


  // 2.5s phrase dataset for both PC and Mobile (NO COMMAS)
  const phrases = [
    {
      mobile: { word1: "RISE", word2: "AS", word3: "WARRIORS" },
      pc: { prefix: "RISE AS ", keyword: "WARRIORS" }
    },
    {
      mobile: { word1: "THINK", word2: "AS", word3: "INNOVATORS" },
      pc: { prefix: "THINK AS ", keyword: "INNOVATORS" }
    },
    {
      mobile: { word1: "BUILD", word2: "FOR", word3: "HUMANITY" },
      pc: { prefix: "BUILD FOR ", keyword: "HUMANITY" }
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Shared cycling interval for both PC and Mobile (2.5 seconds)
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    },3000);
    return () => clearInterval(cycleTimer);
  }, [phrases.length]);

  const activePhrase = phrases[currentIndex];

  return (
    <section className="relative w-full min-h-screen pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none z-10">
      
      {/* DESKTOP (PC) VIEW LAYOUT (POSITIONED AT 25VH BELOW TOP) */}
      <div className="hidden sm:block relative z-20 max-w-3xl pt-[25vh]">
        
        {/* HEADING SECTION: ONE SENTENCE WITHOUT BREAK + UNDERLINE DIRECTLY FOR HEADING */}
        <div className="space-y-3">
          <div className="h-20 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] font-heading whitespace-nowrap"
              >
                <span className="text-slate-950 font-black font-heading">{activePhrase.pc.prefix}</span>
                <span className="text-blue-600 font-heading font-black drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  {activePhrase.pc.keyword}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* BLUE GRADIENT UNDERLINE BAR DIRECTLY FOR THE HEADING */}
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
        </div>

        {/* 10VH GAP FROM THE HEADING SECTION TO SUBSEQUENT CONTENT */}
        <div className="mt-[10vh] space-y-4">
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
              onClick={handleTrailerClick}
              title={trailerState === "ready" ? "Click to Launch Trailer" : `Buffering Trailer (${trailerProgress}%)`}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0 transition-all active:scale-95"
            >
              {trailerState === "ready" ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
                  <Play className="w-4.5 h-4.5 text-white fill-white ml-0.5" />
                </div>
              ) : (
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="3" className="text-blue-950" fill="none" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-blue-500 transition-all duration-200"
                      fill="none"
                      strokeDasharray={87.96}
                      strokeDashoffset={87.96 - (87.96 * trailerProgress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-mono text-[9px] font-black text-slate-950">
                    {trailerProgress}%
                  </span>
                </div>
              )}

              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                  {trailerState === "ready" ? "LAUNCH TRAILER" : "WILL BE PLAYED SOON"}
                </span>
                {trailerState === "loading" && (
                  <span className="text-[9px] font-mono text-blue-600 font-black uppercase">
                    BUFFERING {trailerProgress}%
                  </span>
                )}
              </div>
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
      </div>

      {/* MOBILE VIEW LAYOUT */}
      <div className="block sm:hidden relative z-20 w-full pt-12">
        
        {/* HEADING SECTION: CYCLING STACKED PHRASE + UNDERLINE ATTACHED RIGHT UNDER HEADING */}
        <div className="pl-[5vw] flex flex-col items-start space-y-3">
          <div className="h-36 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col text-left space-y-0.5"
              >
                <span className="text-3xl min-[400px]:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight leading-none">
                  {activePhrase.mobile.word1}
                </span>
                <span className="text-3xl min-[400px]:text-4xl font-black text-slate-950 uppercase font-heading tracking-tight leading-none">
                  {activePhrase.mobile.word2}
                </span>
                <span className="text-3xl min-[400px]:text-4xl font-black text-blue-600 font-heading tracking-tight leading-none drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  {activePhrase.mobile.word3}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* UNDERLINE BAR DIRECTLY UNDER THE HEADING (FIXED POSITION, DOES NOT MOVE WHILE TEXT CYCLES) */}
          <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>

        {/* SUBHEADLINE & ALL SUBSEQUENT CONTENTS PLACED BELOW ON MOBILE */}
        <div className="pt-[30vh] space-y-4">
          {/* SUBHEADLINE BRIEF (MOBILE ONLY) - BLACK TEXT EXCEPT "and" & "leaves" (WHITE) AND BLUE KEYWORDS */}
          <p className="text-xs font-semibold leading-relaxed font-sans">
            <span className="text-slate-950">A battlefield for </span>
            <strong className="text-blue-600 font-extrabold">bold ideas</strong>
            <span className="text-slate-950">,<br />where technology meets </span>
            <strong className="text-blue-600 font-extrabold">purpose </strong>
            <span className="text-white">and </span>
            <strong className="text-blue-600 font-extrabold">innovation </strong>
            <span className="text-white">leaves </span>
            <span className="text-slate-950">an </span>
            <strong className="text-blue-600 font-extrabold">impact</strong>.
          </p>

          {/* 3 STAT CARDS BELOW 20VH */}
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

          {/* TIMER + TRAILER BELOW 20VH */}
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
              onClick={handleTrailerClick}
              title={trailerState === "ready" ? "Click to Launch Trailer" : `Buffering Trailer (${trailerProgress}%)`}
              className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-all"
            >
              {trailerState === "ready" ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </div>
              ) : (
                <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="3" className="text-slate-900" fill="none" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-blue-400 transition-all duration-200"
                      fill="none"
                      strokeDasharray={87.96}
                      strokeDashoffset={87.96 - (87.96 * trailerProgress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-mono text-[8px] font-black text-white">
                    {trailerProgress}%
                  </span>
                </div>
              )}

              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                  {trailerState === "ready" ? "LAUNCH" : "WILL BE PLAYED SOON"}
                </span>
                {trailerState === "loading" && (
                  <span className="text-[9px] font-mono text-sky-400 font-black uppercase">
                    BUFFERING {trailerProgress}%
                  </span>
                )}
              </div>
            </button>

          </div>

          {/* JYOTHY LOCATION BELOW 20VH - HORIZONTALLY CENTERED ON MOBILE WITH WHITE TEXT */}
          <div className="flex items-center justify-center text-center gap-2 pt-2 w-full mx-auto">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="flex flex-col text-[10px] font-mono leading-tight text-center">
              <span className="font-black text-white uppercase">JYOTHY ENGINEERING COLLEGE (AUTONOMOUS)</span>
              <span className="text-[8px] text-slate-300 font-bold uppercase">DEPT. OF AI & DS</span>
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

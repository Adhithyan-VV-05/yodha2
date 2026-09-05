"use client";
import { ArrowUp } from "lucide-react";
import logo from "../assets/logo.webp";

interface CompactFooterProps {
  onOpenRegister?: () => void;
}

export function CompactFooter({ onOpenRegister }: CompactFooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-transparent text-white select-none z-20 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* CLEAN THIN BLUE SEPARATOR LINE ABOVE FOOTER */}
      <div className="w-full max-w-6xl mx-auto mb-10 sm:mb-12">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* BRAND MINIMAL HEADER */}
        <div className="flex items-center gap-3">
          <img src={(logo as any)?.src || logo} alt="Yodha Spartan Logo" className="w-9 h-9 object-contain shrink-0" />
          <div>
            <h4 className="text-lg font-black font-heading tracking-tight text-white flex items-center justify-center md:justify-start gap-1">
              <span>YODHA</span>
              <span className="text-blue-400 font-bold">2.0</span>
            </h4>
            <p className="text-[10px] font-mono text-blue-300/80 uppercase tracking-widest">
              Warriors of AI • <a href="https://aidajecc.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Dept of AD (AIDA)</a>, <a href="https://www.jecc.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">JECC</a>
            </p>
          </div>
        </div>

        {/* INLINE NAV LINKS */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300">
          <button onClick={() => scrollToSection("about")} className="hover:text-blue-300 transition-colors cursor-pointer">
            About
          </button>
          <button onClick={() => scrollToSection("tracks")} className="hover:text-blue-300 transition-colors cursor-pointer">
            Problem Statements
          </button>
          <button onClick={() => scrollToSection("timeline")} className="hover:text-blue-300 transition-colors cursor-pointer">
            Journey
          </button>
          <button onClick={() => scrollToSection("prizes")} className="hover:text-blue-300 transition-colors cursor-pointer">
            Prizes
          </button>
          <button
            onClick={() => {
              if (onOpenRegister) onOpenRegister();
              else scrollToSection("register");
            }}
            className="hover:text-blue-300 font-bold text-blue-400 transition-colors cursor-pointer"
          >
            Register
          </button>
        </nav>

        {/* SOCIAL & BACK TO TOP */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <a
            href="https://aidajecc.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors text-blue-400 font-bold"
          >
            AIDA Portal
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://www.jecc.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors text-blue-400 font-bold"
          >
            JECC Campus
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://www.instagram.com/yodha_hackathon.official?igsh=cmxiNGs2c2hiMDdy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors"
          >
            Instagram
          </a>
          <span className="text-slate-600">•</span>
          <a href="mailto:yodha@jecc.ac.in" className="hover:text-blue-300 transition-colors">
            yodha@jecc.ac.in
          </a>
          <span className="text-slate-600">•</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-blue-300 transition-colors cursor-pointer text-slate-300 font-bold"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

      </div>

      {/* MINIMAL QUIET COPYRIGHT LINE */}
      <div className="mt-8 text-center text-[11px] font-mono text-slate-500">
        © 2026 YODHA 2.0 Organizing Committee. All rights reserved.
      </div>
    </footer>
  );
}

export default CompactFooter;

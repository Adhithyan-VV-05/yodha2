"use client";
import { ArrowUp, ExternalLink, Mail, Instagram, Globe } from "lucide-react";
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

  const logoSrc = (logo as any)?.src || logo || "/logo.webp";

  return (
    <footer className="relative w-full text-white select-none z-20 pt-16 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#02040a] via-[#030611]/80 to-transparent">
      {/* TOP GLOW LINE ACCENT */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* BRAND IDENTITY */}
        <div className="flex items-center gap-3.5 shrink-0">
          <img src={logoSrc} alt="YODHA 2.0 Logo" className="w-10 h-10 object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
          <div>
            <h4 className="text-xl font-black font-heading tracking-tight text-white flex items-center justify-center md:justify-start gap-1">
              <span>YODHA</span>
              <span className="text-blue-400 font-extrabold">2.0</span>
            </h4>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
              WARRIORS OF AI • AIDA & JECC
            </p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300">
          <button onClick={() => scrollToSection("about")} className="hover:text-blue-400 transition-colors cursor-pointer">
            About
          </button>
          <button onClick={() => scrollToSection("tracks")} className="hover:text-blue-400 transition-colors cursor-pointer">
            Tracks
          </button>
          <button onClick={() => scrollToSection("timeline")} className="hover:text-blue-400 transition-colors cursor-pointer">
            Journey
          </button>
          <button onClick={() => scrollToSection("prizes")} className="hover:text-blue-400 transition-colors cursor-pointer">
            Prizes
          </button>
          <button onClick={() => scrollToSection("faq")} className="hover:text-blue-400 transition-colors cursor-pointer">
            FAQ
          </button>
          <button
            onClick={() => {
              if (onOpenRegister) onOpenRegister();
              else scrollToSection("register");
            }}
            className="text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
          >
            Register
          </button>
        </nav>

        {/* SOCIAL & BACK TO TOP BUTTON */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <a
            href="https://aidajecc.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="AIDA Official Site"
            className="w-9 h-9 rounded-full bg-slate-950/80 border border-blue-500/30 hover:border-blue-400 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all cursor-pointer shadow-md"
          >
            <Globe className="w-4 h-4 text-blue-400" />
          </a>

          <a
            href="https://www.instagram.com/yodha_hackathon.official?igsh=cmxiNGs2c2hiMDdy"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Official"
            className="w-9 h-9 rounded-full bg-slate-950/80 border border-blue-500/30 hover:border-blue-400 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all cursor-pointer shadow-md"
          >
            <Instagram className="w-4 h-4 text-blue-400" />
          </a>

          <a
            href="mailto:yodha@jecc.ac.in"
            title="Email Support"
            className="w-9 h-9 rounded-full bg-slate-950/80 border border-blue-500/30 hover:border-blue-400 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4 text-blue-400" />
          </a>

          <button
            onClick={scrollToTop}
            title="Back to Top"
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.5)] active:scale-95 ml-1"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>

      {/* MINIMAL BOTTOM COPYRIGHT & ATTRIBUTION LINE */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2 text-center sm:text-left">
        <span>© 2026 YODHA 2.0 • All Rights Reserved.</span>
        <span>Organized by Dept. of Artificial Intelligence & Data Science, Jyothi Engineering College</span>
      </div>
    </footer>
  );
}

export default CompactFooter;

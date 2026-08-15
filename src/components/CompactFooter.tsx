import { ArrowUp } from "lucide-react";
import { InteractiveLogoBall } from "./InteractiveLogoBall";

export function CompactFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020408]/95 backdrop-blur-2xl py-6 px-4 sm:px-8 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <InteractiveLogoBall size="sm" />
          <div>
            <h4 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              <span>YODHA</span>
              <span className="text-sky-400 font-extrabold">2.0</span>
            </h4>
            <p className="text-[10px] text-sky-400/90 font-mono uppercase tracking-wider font-semibold">
              WARRIORS OF AI • SEP 11th & 12th
            </p>
          </div>
        </div>

        {/* Official Instagram Link & Back to top button */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/yodha_hackathon.official?igsh=cmxiNGs2c2hiMDdy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-400/40 text-pink-300 hover:text-white text-xs font-mono font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          >
            {/* Custom Instagram SVG Icon */}
            <svg className="w-3.5 h-3.5 fill-current text-pink-400" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@yodha_hackathon.official</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

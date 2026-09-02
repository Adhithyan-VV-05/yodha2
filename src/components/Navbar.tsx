import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.webp";

interface NavbarProps {
  onOpenRegister: (trackName?: string) => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.05;
      setScrolledPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROBLEM STATEMENTS", href: "#tracks" },
    { name: "JOURNEY", href: "#timeline" },
    { name: "PRIZES", href: "#prizes" },
    { name: "REGISTER", href: "#register", isAction: true },
  ];

  return (
    <>
      {/* 1. FULL NAVBAR (VISIBLE ONLY IN HERO SECTION) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolledPastHero
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 py-4 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* BRAND LOGO WITH DOWNWARDS ALIGNED 2.0 */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0">
              <img src={logo} alt="Yodha Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex items-baseline">
              <span className="font-black text-2xl sm:text-3xl text-slate-950 tracking-tight font-sans">
                YODHA
              </span>
              <span className="text-purple-600 font-extrabold text-xs sm:text-sm font-mono relative top-[3px] ml-1.5">
                2.0
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS (DARK CHARCOAL TEXT FOR HERO CANVAS) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.isAction) {
                    e.preventDefault();
                    onOpenRegister();
                  }
                }}
                className="text-xs font-mono font-bold text-slate-900 hover:text-purple-600 transition-colors tracking-widest uppercase cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP REGISTER CTA BUTTON */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:brightness-115 hover:scale-105 transition-all cursor-pointer active:scale-95"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* MOBILE THREE LINES HAMBURGER TOGGLE WHEN IN HERO */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2.5 text-slate-900 hover:text-purple-600 rounded-xl bg-white/80 border border-purple-500/40 backdrop-blur-md cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      {/* 2. MINIMAL THREE LINES HAMBURGER BUTTON (VISIBLE WHEN SCROLLED PAST HERO) */}
      <div
        className={`fixed top-4 right-4 sm:top-6 sm:right-8 z-50 transition-all duration-500 ${
          scrolledPastHero
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="p-3.5 rounded-full bg-slate-950/90 border-2 border-purple-500/60 backdrop-blur-2xl text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* 3. MENU DRAWER / MODAL FOR SECTION LINKS */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-950 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-baseline">
                <span className="font-black text-2xl text-white tracking-tight font-sans">
                  YODHA
                </span>
                <span className="text-purple-400 font-bold text-xs font-mono relative top-[2px] ml-1.5">
                  2.0
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (link.isAction) {
                      e.preventDefault();
                      onOpenRegister();
                    }
                  }}
                  className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm font-mono font-bold text-slate-200 hover:text-white hover:border-purple-500/50 transition-all flex items-center justify-between uppercase tracking-wider"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </a>
              ))}
            </div>

            {/* Register CTA */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)] cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

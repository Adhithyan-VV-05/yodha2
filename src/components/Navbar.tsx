import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Info,
  Lightbulb,
  Route,
  Trophy,
  HelpCircle,
  FileText,
} from "lucide-react";
import logo from "../assets/logo.webp";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

interface NavbarProps {
  onOpenRegister: (trackName?: string) => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Keep navbar visible continuously as a floating liquid glass element
      setShowNavbar(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about", icon: Info },
    { name: "PROBLEMS", href: "#tracks", icon: Lightbulb },
    { name: "JOURNEY", href: "#timeline", icon: Route },
    { name: "PRIZES", href: "#prizes", icon: Trophy },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
    { name: "GUIDELINES", href: "#guidelines", icon: FileText },
  ];

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full transition-all duration-500 transform flex justify-center ${
        showNavbar
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-28 opacity-0 pointer-events-none"
      }`}
    >
      {/* DESKTOP NAVBAR (FLOATING 3D LIQUID GLASS PILL BAR) */}
      <div className="hidden lg:block max-w-6xl w-[94%] pt-4">
        <LiquidGlassSurface className="rounded-full">
          <div className="w-full px-6 py-3.5 flex items-center justify-between">
            {/* BRAND LOGO */}
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0">
                <img
                  src={logo}
                  alt="YODHA Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex items-baseline">
                <span className="font-heading font-black text-2xl text-slate-950 dark:text-white tracking-tight">
                  YODHA
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-bold text-xs font-mono relative top-[1px] ml-1.5">
                  2.0
                </span>
              </div>
            </a>

            {/* DESKTOP HORIZONTAL NAV LINKS */}
            <nav className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors tracking-wider uppercase cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* DESKTOP REGISTER BUTTON */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenRegister()}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>REGISTER</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </LiquidGlassSurface>
      </div>

      {/* MOBILE & TABLET NAVBAR (FLOATING PILL & CINEMATIC EXPANDED MENU WITH LIQUID GLASS SURFACE) */}
      <div className="block lg:hidden max-w-sm sm:max-w-md w-[92%] pt-3">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {!menuOpen ? (
              /* CLOSED MOBILE COMPACT PILL NAVBAR */
              <motion.div
                key="closed-pill-mobile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LiquidGlassSurface className="rounded-full">
                  <div className="w-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between">
                    <a
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 group shrink-0"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.4)] shrink-0 flex items-center justify-center bg-slate-950">
                        <img
                          src={logo}
                          alt="YODHA Logo"
                          className="w-full h-full object-cover scale-105"
                        />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-medium text-lg sm:text-xl text-white tracking-wide">
                          YODHA
                        </span>
                        <span className="text-purple-400 font-mono text-xs font-bold">
                          2.0
                        </span>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => setMenuOpen(true)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-600/70 hover:border-slate-400 text-slate-200 hover:text-white bg-slate-800/40 hover:bg-slate-800/70 flex items-center justify-center transition-all cursor-pointer shadow-inner active:scale-95"
                      aria-label="Open Navigation Menu"
                    >
                      <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                    </button>
                  </div>
                </LiquidGlassSurface>
              </motion.div>
            ) : (
              /* OPEN MOBILE CINEMATIC EXPANDED PANEL */
              <motion.div
                key="open-panel-mobile"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LiquidGlassSurface className="rounded-3xl">
                  <div className="w-full p-5 sm:p-6 flex flex-col space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
                      <a
                        href="#"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 group shrink-0"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.4)] shrink-0 flex items-center justify-center bg-slate-950">
                          <img
                            src={logo}
                            alt="YODHA Logo"
                            className="w-full h-full object-cover scale-105"
                          />
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif font-medium text-xl text-white tracking-wide">
                            YODHA
                          </span>
                          <span className="text-purple-400 font-mono text-xs font-bold">
                            2.0
                          </span>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-600/70 hover:border-slate-400 text-slate-200 hover:text-white bg-slate-800/40 hover:bg-slate-800/70 flex items-center justify-center transition-all cursor-pointer shadow-inner active:scale-95"
                        aria-label="Close Navigation Menu"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                      </button>
                    </div>

                    <div className="flex flex-col space-y-1 py-1">
                      {navLinks.map((link) => {
                        const IconComp = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-3 px-3.5 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all flex items-center justify-between group border-b border-slate-800/40 last:border-b-0 cursor-pointer"
                          >
                            <div className="flex items-center gap-3.5">
                              <IconComp className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors stroke-[1.75]" />
                              <span className="font-serif text-sm tracking-[0.2em] font-normal uppercase">
                                {link.name}
                              </span>
                            </div>
                            <span className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all text-xs">
                              →
                            </span>
                          </a>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onOpenRegister();
                        }}
                        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-serif text-xs tracking-[0.2em] font-medium uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        <span>REGISTER NOW</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    <div className="pt-1 text-center">
                      <div className="text-[9px] font-mono tracking-[0.25em] text-slate-500 uppercase">
                        IDEAS TODAY • A HEALTHIER TOMORROW
                      </div>
                    </div>
                  </div>
                </LiquidGlassSurface>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

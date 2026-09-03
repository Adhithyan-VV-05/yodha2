import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.webp";

interface NavbarProps {
  onOpenRegister: (trackName?: string) => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar ONLY appears when user scroll reaches the About section on all devices
      const aboutElem = document.getElementById("about");
      if (aboutElem) {
        const rect = aboutElem.getBoundingClientRect();
        setShowNavbar(rect.top <= window.innerHeight * 0.85);
      } else {
        setShowNavbar(window.scrollY > window.innerHeight * 0.85);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROBLEMS", href: "#tracks" },
    { name: "JOURNEY", href: "#timeline" },
    { name: "PRIZES", href: "#prizes" },
    { name: "REGISTER", href: "#register", isAction: true },
  ];

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-6xl w-[94%] transition-all duration-500 transform ${
        showNavbar
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-28 opacity-0 pointer-events-none"
      }`}
    >
      {/* LIQUID GLASSMORPHISM CONTAINER THAT EXPANDS VERTICALLY ON MOBILE */}
      <div
        className={`w-full px-5 py-3.5 rounded-b-3xl bg-white/60 dark:bg-[#060817]/80 border-b border-x border-white/70 dark:border-purple-500/50 backdrop-blur-3xl shadow-[0_15px_35px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all duration-300 ease-in-out ${
          menuOpen ? "rounded-3xl shadow-[0_20px_45px_rgba(124,58,237,0.3)]" : ""
        }`}
      >
        {/* TOP COMPACT ROW: BRAND LOGO + DESKTOP NAV / MOBILE HAMBURGER TOGGLE */}
        <div className="flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0">
              <img src={logo} alt="YODHA Logo" className="w-full h-full object-cover scale-110" />
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

          {/* DESKTOP NAV LINKS */}
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
                className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors tracking-wider uppercase cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP REGISTER BUTTON */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-all cursor-pointer"
            >
              <span>REGISTER</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* MOBILE HAMBURGER ICON TOGGLE */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-950 dark:text-white hover:text-purple-600 transition-colors cursor-pointer"
              aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              {menuOpen ? <X size={24} className="text-purple-500" /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* EXPANDABLE VERTICAL MOBILE NAVIGATION PANEL (SCALES DOWN ON CLICK) */}
        {menuOpen && (
          <div className="flex lg:hidden flex-col gap-3 pt-4 pb-2 mt-3 border-t border-white/40 dark:border-purple-500/30 animate-in fade-in slide-in-from-top-3 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMenuOpen(false); // Collapses back down so all contents are properly visible
                  if (link.isAction) {
                    e.preventDefault();
                    onOpenRegister();
                  }
                }}
                className="py-2 px-3 rounded-xl hover:bg-purple-500/10 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase tracking-wider flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-purple-400 text-xs">→</span>
              </a>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false); // Collapses back down
                onOpenRegister();
              }}
              className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-95 transition-all"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;

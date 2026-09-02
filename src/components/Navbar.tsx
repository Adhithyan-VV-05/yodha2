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
      // Hide navbar completely inside the Hero section (scrollY <= 35vh).
      // Shows only after user scrolls past the hero section.
      setShowNavbar(window.scrollY > window.innerHeight * 0.35);
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
    <>
      {/* LIQUID GLASSMORPHISM NAVBAR WITH ROUNDED BOTTOM EDGES (NO NAVBAR IN HERO SECTION) */}
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 max-w-6xl w-[94%] transition-all duration-500 transform ${
          showNavbar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* LIQUID GLASSMORPHISM CONTAINER (ROUNDED BOTTOM EDGES: rounded-b-3xl) */}
        <div className="w-full px-6 py-3.5 rounded-b-3xl bg-white/45 dark:bg-[#060817]/65 border-b border-x border-white/60 dark:border-purple-500/40 backdrop-blur-3xl shadow-[0_15px_35px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
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

          {/* MOBILE HAMBURGER TOGGLE */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-slate-950 dark:text-white hover:text-purple-600 cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </header>

      {/* FULLSCREEN MOBILE NAV OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-3xl flex flex-col justify-between p-6 text-white animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="font-heading font-black text-2xl text-white tracking-tight">YODHA</span>
              <span className="text-purple-400 font-bold text-xs font-mono ml-1.5">2.0</span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-white">
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto text-left">
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
                className="text-xl font-heading font-bold text-slate-100 hover:text-purple-400 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;

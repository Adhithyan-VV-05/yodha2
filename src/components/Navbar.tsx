import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, Shield } from "lucide-react";
import { InteractiveLogoBall } from "./InteractiveLogoBall";

interface NavbarProps {
  onOpenRegister: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)) : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tracks", href: "#tracks" },
    { name: "Prizes", href: "#prizes" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Floating Glass Pill Container with Dynamic Full Perimeter Scroll Border */}
        <div className="relative p-[1.5px] rounded-full overflow-hidden transition-all duration-500">
          
          {/* Dynamic Perimeter Border Fill starting from bottom */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-all"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, #38bdf8 0%, #818cf8 ${scrollProgress}%, rgba(255,255,255,0.12) ${scrollProgress}%, rgba(255,255,255,0.12) 100%)`,
            }}
          />

          {/* Inner Content Body */}
          <div
            className={`relative flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-[#04060b]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85)]"
                : "bg-black/70 backdrop-blur-xl shadow-lg"
            }`}
          >
            {/* BRAND IDENTITY WITH SNUG-FIT 3D INTERACTIVE BALL */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <InteractiveLogoBall size="sm" />
              <div className="flex flex-col justify-center">
                <span className="font-black tracking-tight text-white text-sm sm:text-lg leading-none group-hover:text-sky-300 transition-colors">
                  YODHA <span className="text-sky-400 font-extrabold">2.0</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-emerald-400 hidden sm:inline" />
                  <span>AI HACKATHON</span>
                </span>
              </div>
            </a>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full px-3 py-1 shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-indigo-500/20 rounded-full transition-all duration-300 border border-transparent hover:border-sky-400/30"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* DESKTOP REGISTER CTA BUTTON */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(56,189,248,0.6)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenRegister}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black text-xs rounded-full shadow-lg transition-all uppercase tracking-widest cursor-pointer border border-white/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-spin" />
                <span>Register Team</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* MOBILE HAMBURGER TOGGLE */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-200 hover:text-white rounded-full bg-white/10 border border-white/15 backdrop-blur-md cursor-pointer"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden max-w-7xl mx-auto px-4 mt-2"
          >
            <div className="bg-[#04060b]/98 border border-sky-500/30 backdrop-blur-2xl px-6 py-6 rounded-3xl shadow-2xl flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-200 hover:text-sky-400 py-1 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs rounded-2xl shadow-[0_0_20px_rgba(56,189,248,0.4)] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  <span>Register Team Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

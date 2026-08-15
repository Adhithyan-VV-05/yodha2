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
        {/* Floating Glass Pill Container with Dynamic Silver-Blue Scroll Border */}
        <div className="relative p-[1.5px] rounded-full overflow-hidden transition-all duration-500">
          
          {/* Dynamic Silver-Blue Perimeter Border Fill starting from bottom */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-all"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, #2563eb 0%, #cbd5e1 ${scrollProgress}%, rgba(148,163,184,0.2) ${scrollProgress}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />

          {/* Inner Content Body (Ultra Luxury Metallic Chrome Theme) */}
          <div
            className={`relative flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-500 border border-slate-400/30 ${
              scrolled
                ? "bg-gradient-to-r from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-2xl shadow-[0_4px_30px_rgba(203,213,225,0.2)]"
                : "bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-xl"
            }`}
          >
            {/* BRAND IDENTITY */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
              <InteractiveLogoBall size="md" />
              <div className="flex flex-col justify-center">
                <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 text-sm sm:text-lg leading-none group-hover:brightness-125 transition-all">
                  YODHA <span className="text-slate-100 font-black">2.0</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-300 font-extrabold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-blue-400 hidden sm:inline" />
                  <span>WARRIORS OF AI</span>
                </span>
              </div>
            </a>

            {/* DESKTOP NAV LINKS (METALLIC CHROME PILL DOCK) */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-400/40 backdrop-blur-xl rounded-full px-3 py-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-xs font-black text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 border border-transparent hover:border-slate-300/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* DESKTOP REGISTER CTA BUTTON (METALLIC SILVER) */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onOpenRegister();
                  const el = document.getElementById("register");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-metallic-silver flex items-center gap-2 px-6 py-2.5 text-xs rounded-full uppercase tracking-widest cursor-pointer relative z-30 pointer-events-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin" />
                <span>Register Team</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
              </motion.button>
            </div>

            {/* MOBILE HAMBURGER TOGGLE */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-200 hover:text-white rounded-full bg-slate-900/90 border border-slate-400/60 backdrop-blur-md cursor-pointer"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN DRAWER (METALLIC CHROME) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden max-w-7xl mx-auto px-4 mt-2"
          >
            <div className="bg-slate-950/98 border border-slate-400/50 backdrop-blur-2xl px-6 py-6 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-black text-slate-200 hover:text-white py-1 transition-colors flex items-center justify-between uppercase tracking-wider"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}

              <div className="pt-4 border-t border-white/15 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                    const el = document.getElementById("register");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-metallic-silver w-full py-3.5 px-6 text-xs rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer relative z-30 pointer-events-auto"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Register Team Now</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

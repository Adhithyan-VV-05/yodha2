import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { InteractiveLogoBall } from "./InteractiveLogoBall";

interface NavbarProps {
  onOpenRegister: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tracks", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#04060b]/92 backdrop-blur-2xl border-b border-sky-500/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          : "bg-[#04060b]/60 backdrop-blur-xl border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Identity with 3D Interactive Logo Ball */}
        <a href="#" className="flex items-center gap-3 group">
          <InteractiveLogoBall size="sm" />
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-white text-lg leading-none">
              YODHA <span className="text-sky-400">2.0</span>
            </span>
            <span className="text-[10px] font-mono text-sky-300 font-bold uppercase tracking-widest mt-1">
              11th & 12th
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(56,189,248,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenRegister}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs rounded-full shadow-lg transition-all uppercase tracking-widest cursor-pointer border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-spin" />
            <span>Register Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle Only */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-200 hover:text-white rounded-xl bg-white/10 border border-white/15 backdrop-blur-md cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#04060b]/98 border-b border-sky-500/20 backdrop-blur-2xl px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-200 hover:text-sky-400 py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Register Button inside Dropdown Section */}
              <div className="pt-4 border-t border-white/10 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
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

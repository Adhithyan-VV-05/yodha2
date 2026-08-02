import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

interface NavbarProps {
  onOpenRegister: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 3D Tilt State for Navbar
  const navRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / (height / 2)) * -6;
    const rY = ((mouseX - width / 2) / (width / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tracks", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 py-4 px-4 sm:px-8 pointer-events-none"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`max-w-7xl mx-auto px-6 lg:px-8 py-3 rounded-full pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-[#04060b]/92 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
            : "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center justify-between" style={{ transformStyle: "preserve-3d" }}>
          
          {/* 3D Brand Identity */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, z: 20 }}
            className="flex items-center gap-3 group cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-sky-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.img
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                src={logo}
                alt="Yodha Logo"
                className="w-9 h-9 object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tight text-white text-lg leading-none">
                YODHA <span className="text-sky-400">2.0</span>
              </span>
              <span className="text-[10px] font-mono text-sky-300 font-bold uppercase tracking-widest mt-1">
                11th & 12th
              </span>
            </div>
          </motion.a>

          {/* Center 3D Floating Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.1, y: -2, z: 15 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all relative group"
              >
                <span>{link.name}</span>
                <div className="absolute inset-0 rounded-full bg-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.a>
            ))}
          </nav>

          {/* Right 3D CTA Button */}
          <div className="hidden md:flex items-center gap-4" style={{ transformStyle: "preserve-3d" }}>
            <motion.button
              whileHover={{ scale: 1.08, z: 25, boxShadow: "0 0 35px rgba(56,189,248,0.6)" }}
              whileTap={{ scale: 0.95, z: 10 }}
              onClick={onOpenRegister}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black text-xs rounded-full shadow-[0_10px_25px_rgba(56,189,248,0.4)] transition-all uppercase tracking-widest cursor-pointer border border-white/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-spin" />
              <span>Register Team</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-bold text-xs rounded-full"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#04060b]/98 border-b border-white/10 backdrop-blur-2xl px-6 py-6 mt-4 rounded-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold text-slate-200 hover:text-sky-400 py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

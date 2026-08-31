import { motion } from "framer-motion";
import { Camera, Sparkles, Building2 } from "lucide-react";

export function VerticalYodhaCarousel() {
  const col1Images = [
    "/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg",
    "/6.jpeg", "/7.jpeg", "/8.jpeg", "/9.jpeg", "/10.jpeg",
  ];

  const col2Images = [
    "/11.jpeg", "/12.jpeg", "/13.jpeg", "/14.jpeg", "/15.jpeg",
    "/16.jpeg", "/17.jpeg", "/18.jpeg", "/19.jpeg", "/20.jpeg",
  ];

  return (
    <section className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden select-none bg-transparent text-white">
      {/* Background Gradient & Radial Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020510] via-[#050c1f] to-[#020510] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* MARQUEE CAROUSEL WRAPPER (FULL 100VH VERTICAL MASK) */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 px-4 md:px-12 opacity-30 hover:opacity-75 transition-opacity duration-700 pointer-events-none z-0 overflow-hidden">
        
        {/* COLUMN 1: SCROLLS UP INFINITELY */}
        <div className="h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col1Images, ...col1Images].map((img, idx) => (
              <div key={`col1-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-lg bg-black/60 shrink-0">
                <img src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* COLUMN 2: SCROLLS DOWN INFINITELY */}
        <div className="h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col2Images, ...col2Images].map((img, idx) => (
              <div key={`col2-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-sky-500/30 shadow-lg bg-black/60 shrink-0">
                <img src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* COLUMN 3 (DESKTOP ONLY): SCROLLS UP INFINITELY */}
        <div className="hidden md:block h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col1Images.slice().reverse(), ...col1Images.slice().reverse()].map((img, idx) => (
              <div key={`col3-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-indigo-500/30 shadow-lg bg-black/60 shrink-0">
                <img src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* CENTERED HIGH-IMPACT OVERLAY CARD */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 sm:py-10 rounded-3xl bg-[#030818]/90 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_60px_rgba(56,189,248,0.3)] text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest">
          <Camera className="w-4 h-4 text-cyan-400" />
          <span>SECTION 09 • PAST YODHA MOVEMENTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
          A Legacy of National{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            AI Innovation
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
          Highlights & memories from past YODHA hackathon marathons organized by the Department of Artificial Intelligence & Data Science at Jyothi Engineering College.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 border-t border-slate-800">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Jyothi Engineering College (Autonomous)
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Cheruthuruthy, Thrissur
          </span>
        </div>

      </div>
    </section>
  );
}

export default VerticalYodhaCarousel;

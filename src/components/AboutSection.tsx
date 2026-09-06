"use client";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Landmark } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 select-none z-10 space-y-12">
      
      {/* PANEL 1: ABOUT YODHA 2.0 */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl font-heading text-slate-950">
            ABOUT THE <span className="text-blue-600 font-heading">HACKATHON</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-base sm:text-lg text-slate-800 max-w-3xl leading-relaxed font-normal"
        >
          Join innovative minds from across the country to ideate and develop AI-driven solutions addressing the most pressing challenges in Healthcare.
        </motion.p>

        <p className="text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed">
          Align your code with a cause by innovating for UN Sustainable Development Goals, specifically Good Health and Well-Being.
        </p>

        <p className="text-xs sm:text-sm text-blue-900 max-w-3xl leading-relaxed font-semibold">
          Proudly organized by the Department of Artificial Intelligence and Data Science at Jyothi Engineering College to foster a culture of creativity and collaboration.
        </p>

        {/* 1ST HALF LIGHT THEME STAT CARDS */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-white/90 border border-blue-200 backdrop-blur-xl shadow-md">
            <span className="text-[10px] font-mono text-blue-700 block font-bold uppercase tracking-wider">DURATION</span>
            <span className="text-base font-bold text-slate-950">48 Hours Non-Stop</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-blue-200 backdrop-blur-xl shadow-md">
            <span className="text-[10px] font-mono text-blue-700 block font-bold uppercase tracking-wider">MODE</span>
            <span className="text-base font-bold text-slate-950">Offline Campus Sprint</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-blue-200 backdrop-blur-xl shadow-md">
            <span className="text-[10px] font-mono text-blue-700 block font-bold uppercase tracking-wider">PRIZE POOL</span>
            <span className="text-base font-bold text-slate-950">₹70,000 INR Pool</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-blue-200 backdrop-blur-xl shadow-md">
            <span className="text-[10px] font-mono text-blue-700 block font-bold uppercase tracking-wider">CERTIFICATION</span>
            <span className="text-base font-bold text-slate-950">KTU Activity Points</span>
          </div>
        </div>

      </div>

      {/* PANEL 2: INSTITUTION & DEPT OF AI & DS (CREATIVE OPEN ARCHITECTURE - NO CARDS) */}
      <div className="relative w-full max-w-6xl mx-auto pt-12 mt-8 border-t border-slate-200/80">
        
        {/* SECTION CATEGORY HEADER */}
        <div className="flex items-center justify-center gap-3 mb-10 text-center">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500" />
          <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-[0.25em]">
            ORGANIZERS & HOST VENUE
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative">
          
          {/* LEFT: ORGANIZING BODY (AIDA DEPT) - OPEN CREATIVE DISPLAY */}
          <div className="lg:col-span-6 relative group flex flex-col justify-between space-y-6 text-left p-2">
            
            {/* WATERMARK BACKGROUND ACCENT */}
            <span className="absolute -top-6 -left-2 text-7xl font-black font-heading text-blue-900/[0.04] pointer-events-none select-none">
              AIDA
            </span>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>ORGANIZING BODY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading leading-tight group-hover:text-blue-600 transition-colors">
                Department of AI & Data Science <span className="text-blue-600 font-heading">(AIDA)</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-xl">
                The Department of Artificial Intelligence and Data Science at Jyothi Engineering College is dedicated to pioneering innovation, nurturing technical talent, and bridging academic excellence with real-world industry impact.
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <a
                href="https://aidajecc.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 cursor-pointer group/btn"
              >
                <span>EXPLORE AIDA DEPARTMENT</span>
                <ExternalLink className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* VERTICAL DIVIDER ON DESKTOP */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent pointer-events-none" />

          {/* RIGHT: HOST CAMPUS (JYOTHY ENGINEERING COLLEGE) - OPEN CREATIVE DISPLAY */}
          <div className="lg:col-span-6 relative group flex flex-col justify-between space-y-6 text-left p-2">
            
            {/* WATERMARK BACKGROUND ACCENT */}
            <span className="absolute -top-6 -left-2 text-7xl font-black font-heading text-slate-900/[0.04] pointer-events-none select-none">
              JECC
            </span>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest">
                <Landmark className="w-3.5 h-3.5 text-blue-600" />
                <span>HOST CAMPUS</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-slate-950 font-heading leading-tight group-hover:text-blue-600 transition-colors">
                Jyothi Engineering College <span className="text-slate-600 text-base font-normal font-sans">(Autonomous)</span>
              </h4>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl">
                Cheruthuruthy, Thrissur, Kerala — A premier NAAC accredited engineering campus equipped with state-of-the-art AI labs, high-performance computing clusters, and modern innovation spaces.
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <a
                href="https://www.jecc.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 cursor-pointer border border-slate-800 group/btn"
              >
                <span>VISIT JECC CAMPUS</span>
                <ExternalLink className="w-4 h-4 text-sky-400 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default AboutSection;

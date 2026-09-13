"use client";

import React from "react";
import { motion } from "framer-motion";

export function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-12 z-20 select-none overflow-hidden bg-transparent text-white block min-h-[300px]"
    >
      <div className="max-w-6xl mx-auto relative space-y-12 sm:space-y-16">
        
        {/* ==========================================
            HEADER SECTION
           ========================================== */}
        <div className="relative w-full flex flex-col items-center justify-center text-center space-y-3">
          
          

          {/* TOP TRACKING BADGE */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 sm:w-16 h-[1px] bg-blue-500/40" />
            <span className="text-xs font-mono font-bold tracking-[0.35em] text-blue-300 uppercase">
              OUR PARTNERS
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-blue-500/40" />
          </div>

          {/* MAIN SERIF HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center space-y-2 text-center"
          >
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 py-1 drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)] uppercase">
              FOR A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 font-bold">
                BRIGHTER
              </span>{" "}
              TOMORROW
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
          </motion.div>


        </div>

        {/* ==========================================
            TITLE SPONSOR CARD
           ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto bg-[#070e1c]/45 backdrop-blur-xl border border-blue-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 hover:bg-[#091224]/60 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1"
        >
          {/* CENTERED TOP BADGE */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#050b1e] border border-blue-400 px-6 sm:px-8 py-1 rounded-full text-blue-300 font-mono text-xs font-bold tracking-[0.25em] uppercase shadow-lg z-10 whitespace-nowrap">
            TITLE SPONSOR
          </div>

          {/* LEFT SIDE: SPIN THEORY LOGO */}
          <div className="flex items-center justify-center flex-1 w-full md:w-auto">
            <img
              src="/sponsors and others/IMG_9231.PNG"
              alt="Spin Theory - Ideas Into Reality"
              className="max-w-[240px] sm:max-w-[300px] md:max-w-[340px] h-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            />
          </div>

          {/* VERTICAL DIVIDER WITH DIAMOND ACCENT */}
          <div className="hidden md:flex flex-col items-center justify-center self-stretch relative my-2">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/40 to-transparent relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-sky-400 rotate-45 border border-blue-300 shadow-[0_0_8px_rgba(56,189,248,0.9)] shrink-0" />
            </div>
          </div>

          {/* RIGHT SIDE: SPIN THEORY DESCRIPTION */}
          <div className="flex-1 text-center md:text-left space-y-2 max-w-md">
            <h3 className="font-mono text-lg sm:text-xl font-black text-slate-100 group-hover:text-white transition-colors tracking-[0.2em] uppercase">
              SPIN THEORY
            </h3>
            <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed uppercase tracking-wider font-semibold">
              TRANSFORMING DATA INTO PRACTICAL SOLUTIONS AND MEASURABLE REAL-WORLD IMPACT THROUGH AI STRATEGY, MACHINE LEARNING, AND INNOVATION.
            </p>
          </div>
        </motion.div>

        {/* ==========================================
            OUR SUPPORTING SPONSORS SECTION
           ========================================== */}
        <div className="space-y-6 pt-4">
          {/* SECTION DIVIDER */}
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="flex-1 h-[1px] bg-slate-800 max-w-[3rem] sm:max-w-[6rem]" />
            <span className="text-[10px] sm:text-sm font-mono font-bold text-slate-400 tracking-[0.25em] uppercase whitespace-nowrap">
              OUR SUPPORTING SPONSORS
            </span>
            <div className="flex-1 h-[1px] bg-slate-800 max-w-[3rem] sm:max-w-[6rem]" />
          </div>

          {/* 3-COLUMN SPONSORS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* CARD 1: COMPUTER SOCIETY OF INDIA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#070e1c]/45 backdrop-blur-xl text-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/40 flex items-center gap-4 hover:bg-[#091224]/60 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <img
                src="/sponsors and others/CSI logo.png"
                alt="Computer Society of India"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-100 group-hover:text-white transition-colors leading-tight uppercase">
                  COMPUTER SOCIETY OF INDIA
                </h4>
              </div>
            </motion.div>

            {/* CARD 2: INDIAN SOCIETY FOR TECHNICAL EDUCATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#070e1c]/45 backdrop-blur-xl text-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/40 flex items-center gap-4 hover:bg-[#091224]/60 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <img
                src="/sponsors and others/IEST logo.png"
                alt="Indian Society for Technical Education"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 drop-shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-100 group-hover:text-white transition-colors leading-tight uppercase">
                  INDIAN SOCIETY FOR TECHNICAL EDUCATION
                </h4>
              </div>
            </motion.div>

            {/* CARD 3: MULEARN JEC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#070e1c]/45 backdrop-blur-xl text-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/40 flex items-center gap-4 hover:bg-[#091224]/60 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <img
                src="/sponsors and others/mulearn-campus-logo.png"
                alt="Mulearn JEC"
                className="w-20 sm:w-24 object-contain shrink-0 drop-shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-100 group-hover:text-white transition-colors leading-tight uppercase">
                  MULEARN JEC
                </h4>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ==========================================
            SUPPORTING GLOBAL GOALS SECTION
           ========================================== */}
        <div className="space-y-6 pt-4">
          {/* SECTION DIVIDER */}
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="flex-1 h-[1px] bg-slate-800 max-w-[3rem] sm:max-w-[6rem]" />
            <span className="text-[10px] sm:text-sm font-mono font-bold text-slate-400 tracking-[0.25em] uppercase whitespace-nowrap">
              SUPPORTING GLOBAL GOALS
            </span>
            <div className="flex-1 h-[1px] bg-slate-800 max-w-[3rem] sm:max-w-[6rem]" />
          </div>

          {/* 2-COLUMN GLOBAL GOALS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            
            {/* CARD 1: SDG 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#070e1c]/45 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[#091224]/60 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <img
                src="/sponsors and others/SDG 3.png"
                alt="SDG 3 Good Health and Well-Being"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain shrink-0 shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <span className="font-mono text-xs font-bold text-emerald-500 group-hover:text-emerald-400 uppercase tracking-wider block transition-colors">
                  SDG 3
                </span>
                <h4 className="font-sans text-xs sm:text-sm font-black text-slate-100 group-hover:text-white transition-colors uppercase tracking-tight leading-tight">
                  GOOD HEALTH AND WELL-BEING
                </h4>
              </div>
            </motion.div>

            {/* CARD 2: SDG 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#070e1c]/45 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 shadow-[0_6px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[#091224]/60 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <img
                src="/sponsors and others/SDG 9.png"
                alt="SDG 9 Industry, Innovation and Infrastructure"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain shrink-0 shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <span className="font-mono text-xs font-bold text-orange-500 group-hover:text-orange-400 uppercase tracking-wider block transition-colors">
                  SDG 9
                </span>
                <h4 className="font-sans text-xs sm:text-sm font-black text-slate-100 group-hover:text-white transition-colors uppercase tracking-tight leading-tight">
                  INDUSTRY, INNOVATION AND INFRASTRUCTURE
                </h4>
              </div>
            </motion.div>

          </div>
        </div>



      </div>
    </section>
  );
}

export default PartnersSection;

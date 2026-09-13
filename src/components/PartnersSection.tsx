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
          className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 transition-all duration-300 group hover:-translate-y-1 p-6 sm:p-10"
        >
          {/* CENTERED TOP BADGE */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#050b1e] border border-blue-400 px-6 sm:px-8 py-1 rounded-full text-blue-300 font-mono text-xs font-bold tracking-[0.25em] uppercase shadow-lg z-10 whitespace-nowrap">
            TITLE SPONSOR
          </div>

          <div className="flex items-center justify-center w-full">
            <img
              src="/sponsors and others/IMG_9231.PNG"
              alt="Spin Theory"
              className="max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <p className="text-sm sm:text-base text-slate-300/90 text-center max-w-xl font-sans leading-relaxed tracking-wide mt-2 mb-2">
            Pioneering the future of technology through intelligent solutions and visionary innovation. Spin Theory is dedicated to empowering the next generation of creators to build a smarter, more connected world.
          </p>

          <a
            href="https://spintheory.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 hover:text-white transition-all duration-300 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          >
            <span>Visit Site</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
              className="flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 p-4"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                src="/sponsors and others/CSI logo.png"
                alt="Computer Society of India"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* CARD 2: INDIAN SOCIETY FOR TECHNICAL EDUCATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 p-4"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                src="/sponsors and others/IEST logo.png"
                alt="Indian Society for Technical Education"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* CARD 3: MULEARN JEC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 p-4"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 1 }}
                src="/sponsors and others/mulearn-campus-logo.png"
                alt="Mulearn JEC"
                className="w-32 sm:w-40 h-24 sm:h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
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
              className="flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 p-4"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                src="/sponsors and others/SDG 3.png"
                alt="SDG 3 Good Health and Well-Being"
                className="w-24 sm:w-32 rounded-xl object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* CARD 2: SDG 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 p-4"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                src="/sponsors and others/SDG 9.png"
                alt="SDG 9 Industry, Innovation and Infrastructure"
                className="w-24 sm:w-32 rounded-xl object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

          </div>
        </div>



      </div>
    </section>
  );
}

export default PartnersSection;

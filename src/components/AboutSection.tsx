"use client";
import { motion } from "framer-motion";

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

      {/* PANEL 2: INSTITUTION & DEPT OF AI & DS */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-300">
        
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-4">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">ORGANIZING BODY</span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-950 font-heading">
            Department of AI & Data Science
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">
            The Department of Artificial Intelligence and Data Science at Jyothi Engineering College is dedicated to pioneering innovation, nurturing technical talent, and bridging academic excellence with real-world industry impact.
          </p>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200 shadow-xl space-y-4 text-left">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">HOST CAMPUS</span>
          <h4 className="text-xl font-bold text-slate-950 font-heading">
            Jyothi Engineering College (Autonomous)
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            Cheruthuruthy, Thrissur, Kerala — A premier NAAC accredited engineering campus equipped with state-of-the-art AI labs, high-performance computing clusters, and modern innovation spaces.
          </p>
        </div>

      </div>

    </section>
  );
}

export default AboutSection;

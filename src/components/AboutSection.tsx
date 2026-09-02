import { motion } from "framer-motion";
import { Sparkles, Award } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white select-none z-10 space-y-16">
      
      {/* PANEL 1: ABOUT YODHA 2.0 */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-6">
        
        {/* HEADING EMERGES FROM BELOW BASELINE ON SCROLL */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-400 tracking-tight leading-tight max-w-4xl font-sans"
        >
          Empowering the Next Generation of AI Warriors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal"
        >
          <strong className="text-white">YODHA — Warriors of AI</strong> is a 48-hour national-level innovation challenge organized by the <strong className="text-white">Department of Artificial Intelligence & Data Science</strong> at <strong className="text-purple-300 font-bold">Jyothi Engineering College (Autonomous), Cheruthuruthy, Thrissur</strong>.
        </motion.p>

        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Engineers across India come together in a non-stop offline marathon to turn cutting-edge machine learning concepts into deployable prototypes for real-world healthcare innovation.
        </p>

        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-[10px] font-mono text-purple-400 block font-bold uppercase tracking-wider">DURATION</span>
            <span className="text-base font-bold text-white">48 Hours Non-Stop</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-[10px] font-mono text-purple-400 block font-bold uppercase tracking-wider">MODE</span>
            <span className="text-base font-bold text-white">Offline Campus Sprint</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-[10px] font-mono text-purple-400 block font-bold uppercase tracking-wider">PRIZE POOL</span>
            <span className="text-base font-bold text-white">₹70,000 INR Pool</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-[10px] font-mono text-purple-400 block font-bold uppercase tracking-wider">CERTIFICATION</span>
            <span className="text-base font-bold text-white">KTU Activity Points</span>
          </div>
        </div>

      </div>

      {/* PANEL 2: INSTITUTION & DEPT OF AI & DS */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-800">
        
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight"
          >
            Pioneering Artificial Intelligence Excellence in Kerala
          </motion.h3>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Established in 2002, NAAC 'A' Grade & NBA accredited Jyothi Engineering College is a leader in technical education, research, and innovation. The Department of AI & DS (ESTD 2020) was among the first under KTU to launch dedicated undergraduate AI programs.
          </p>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950/85 border border-purple-500/30 backdrop-blur-xl space-y-4 text-left shadow-2xl">
          <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>CAMPUS HIGHLIGHTS & INCUBATION</span>
          </h4>

          <ul className="space-y-3 text-sm text-slate-300 font-normal">
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" /> NAAC 'A' Grade & NBA Accredited Autonomous Institution
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" /> TATA Technologies Industrial Innovation Center (IIIC)
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" /> JEC Technology Business Incubator (JEC TBI Seed Fund)
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" /> State-of-the-Art GPU & Deep Learning Infrastructure
            </li>
          </ul>
        </div>

      </div>

    </section>
  );
}

export default AboutSection;

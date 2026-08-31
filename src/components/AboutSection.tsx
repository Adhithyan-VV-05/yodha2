import { motion } from "framer-motion";
import { Target, Sparkles, Award, Building2 } from "lucide-react";

export function AboutSection() {
  return (
    <div className="w-full h-full flex flex-row items-center justify-between text-white select-none">
      
      {/* PANEL 1: ABOUT YODHA 2.0 (100vw) */}
      <div className="w-[100vw] h-full flex-shrink-0 flex flex-col justify-center items-center px-4 md:px-12 py-4 relative">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center space-y-3">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest"
          >
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTION 02 • ABOUT THE HACKATHON</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400 tracking-tight leading-tight max-w-3xl">
            Empowering the Next Generation of AI Warriors
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            <strong className="text-white">YODHA — Warriors of AI</strong> is a 48-hour national-level innovation challenge organized by the <strong className="text-white">Department of Artificial Intelligence & Data Science</strong> at <strong className="text-cyan-300 font-bold">Jyothi Engineering College (Autonomous), Cheruthuruthy, Thrissur</strong>.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Engineers across India come together in a non-stop offline marathon to turn cutting-edge machine learning concepts into deployable prototypes for real-world healthcare innovation.
          </p>

          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl text-left">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">DURATION</span>
              <span className="text-sm font-bold text-white">48 Hours Non-Stop</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">MODE</span>
              <span className="text-sm font-bold text-white">Offline Campus Sprint</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">PRIZE POOL</span>
              <span className="text-sm font-bold text-white">₹70,000 INR Pool</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-bold">CERTIFICATION</span>
              <span className="text-sm font-bold text-white">KTU Activity Points</span>
            </div>
          </div>

        </div>
      </div>

      {/* PANEL 2: INSTITUTION & DEPT OF AI & DS (100vw) */}
      <div className="w-[100vw] h-full flex-shrink-0 flex flex-col justify-center items-center px-4 md:px-12 py-4 relative">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs font-bold uppercase tracking-widest w-fit mx-auto lg:mx-0">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>JYOTHI ENGINEERING COLLEGE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Pioneering Artificial Intelligence Excellence in Kerala
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Established in 2002, NAAC 'A' Grade & NBA accredited Jyothi Engineering College is a leader in technical education, research, and innovation. The Department of AI & DS (ESTD 2020) was among the first under KTU to launch dedicated undergraduate AI programs.
            </p>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-3 text-left">
            <h4 className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>CAMPUS HIGHLIGHTS & INCUBATION</span>
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" /> NAAC 'A' Grade & NBA Accredited Autonomous Institution
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" /> TATA Technologies Industrial Innovation Center (IIIC)
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" /> JEC Technology Business Incubator (JEC TBI Seed Fund)
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" /> Hosted at JEC Auditorium, Cheruthuruthy, Thrissur
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              Official Portal: yodha.aidajecc.in
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AboutSection;

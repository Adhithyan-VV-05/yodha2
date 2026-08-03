import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";
import { InteractiveLogoBall } from "./InteractiveLogoBall";

interface ClosingCTAProps {
  onOpenRegister: () => void;
}

export function ClosingCTA({ onOpenRegister }: ClosingCTAProps) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#03050a]">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-emerald-500/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card3DTilt intensity={12}>
          <div
            onClick={onOpenRegister}
            className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-sky-950/60 via-slate-950 to-black border-2 border-sky-500/40 backdrop-blur-2xl shadow-[0_20px_80px_rgba(56,189,248,0.25)] text-center relative overflow-hidden flex flex-col items-center cursor-pointer hover:border-sky-400 transition-all group"
          >
            
            {/* 3D Interactive Logo Ball */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <InteractiveLogoBall size="xl" />
            </motion.div>

            <span className="px-4 py-1.5 bg-sky-400/20 border border-sky-400/30 rounded-full text-xs font-mono text-sky-300 font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>JOIN THE MOVEMENT</span>
            </span>

            <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 tracking-tight max-w-2xl">
              Be a Warrior of AI
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Join the next generation of innovators and create AI-powered solutions that improve lives, protect our planet, and shape the future.
            </p>

            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(56,189,248,0.6)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onOpenRegister();
                const el = document.getElementById("register");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 px-10 py-4.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 text-sm tracking-widest uppercase cursor-pointer border border-white/20 relative z-30 pointer-events-auto"
            >
              <Sparkles className="w-4 h-4 text-sky-200 animate-spin" />
              <span>Register Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <span className="text-xs font-mono text-slate-400 mt-5">
              Event Dates: <strong className="text-sky-300">September 11th & 12th, 2026</strong> • National Level Entry
            </span>

          </div>
        </Card3DTilt>
      </div>
    </section>
  );
}

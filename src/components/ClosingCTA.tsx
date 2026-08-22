import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import { Card3DTilt } from "./Card3DTilt";
import { InteractiveLogoBall } from "./InteractiveLogoBall";
import { CARD_BACKGROUNDS } from "../data/cardBackgrounds";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface ClosingCTAProps {
  onOpenRegister: () => void;
}

export function ClosingCTA({ onOpenRegister }: ClosingCTAProps) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card3DTilt intensity={12} bgImage={CARD_BACKGROUNDS.cta.launchpad}>
          <div
            onClick={onOpenRegister}
            className="p-8 sm:p-14 rounded-3xl bg-slate-950/95 border-2 border-slate-700 backdrop-blur-2xl shadow-2xl text-center relative overflow-hidden flex flex-col items-center cursor-pointer hover:border-blue-500 transition-all group"
          >
            
            {/* 3D Interactive Logo Ball */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 relative z-20"
            >
              <InteractiveLogoBall size="xl" />
            </motion.div>

            {/* Official Animated Y-O-D-H-A Title Banner */}
            <div className="my-3 relative z-20">
              <YodhaTitleBanner align="center" size="sm" />
            </div>

            <span className="px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono text-slate-200 font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2 shadow-sm relative z-20">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>JOIN THE MOVEMENT</span>
            </span>

            <p className="mt-2 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed relative z-20">
              Together, let's build AI solutions that save lives & protect our planet. Innovate. Impact. Be a Warrior of AI.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onOpenRegister();
                const el = document.getElementById("register");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-metallic-silver mt-8 px-10 py-4.5 rounded-2xl flex items-center justify-center gap-3 text-sm tracking-widest uppercase cursor-pointer relative z-30 pointer-events-auto group/btn"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover/btn:rotate-45 transition-transform" />
              <span>Register Today</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>

            <span className="text-xs font-mono text-slate-400 mt-5 relative z-20">
              Jyothi Engineering College (Autonomous), Cheruthuruthy, Thrissur • <strong className="text-white">yodha.aidajecc.in</strong>
            </span>

          </div>
        </Card3DTilt>
      </div>
    </section>
  );
}

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { RegistrationSection } from "./RegistrationSection";
import { CompactFooter } from "./CompactFooter";

interface RegistrationPageProps {
  onBack: () => void;
  selectedTrack?: string;
}

export function RegistrationPage({ onBack, selectedTrack }: RegistrationPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#03060d] text-white font-sans relative overflow-x-hidden flex flex-col justify-between select-none">
      {/* Dynamic Background Hills & Purple Glow matching site theme */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
        <img
          src="/bg-hills-night-pc.png"
          alt="Night Hills Background"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* TOP FLOATING BACK BUTTON ONLY (NO TOP NAVIGATION BAR) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-950/90 border border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-2xl transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>Back to Main Portal</span>
        </button>
      </div>

      {/* NORMAL SITE VIEW REGISTRATION CONTENT */}
      <main className="relative z-10 w-full flex-1 max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <RegistrationSection selectedTrack={selectedTrack} />
      </main>

      {/* GLASSMORPHISM FOOTER */}
      <CompactFooter />
    </div>
  );
}

export default RegistrationPage;

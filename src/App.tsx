import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroLoader } from "./components/IntroLoader";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TracksSection } from "./components/TracksSection";
import { TimelineSection } from "./components/TimelineSection";
import { PrizesSection } from "./components/PrizesSection";
import { RegistrationSection } from "./components/RegistrationSection";
import { Globe, Share2, MessageSquare, ArrowUp } from "lucide-react";
import logo from "./assets/logo.png";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("AI Interfaces & Generative UI");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#03060d] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-hidden">
      {/* Smooth Continuous Ambient Background Motion Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] ambient-orb-1" />
        <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] ambient-orb-2" />
        <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[150px] ambient-orb-1" />
      </div>

      {/* 3-Second Classic Intro Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col min-h-screen relative z-10"
        >
          {/* Navbar */}
          <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* Main Content Sections */}
          <main className="flex-grow">
            <HeroSection onOpenRegister={() => setRegisterModalOpen(true)} />
            <TracksSection onSelectTrack={handleOpenRegisterWithTrack} />
            <TimelineSection />
            <PrizesSection onOpenRegister={() => setRegisterModalOpen(true)} />
            <RegistrationSection selectedTrack={selectedTrack} />
          </main>

          {/* Registration Modal */}
          <RegistrationSection
            isOpen={registerModalOpen}
            onClose={() => setRegisterModalOpen(false)}
            selectedTrack={selectedTrack}
          />

          {/* Footer */}
          <footer className="border-t border-white/10 bg-[#020409] py-12 px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand & Subtitle */}
              <div className="flex items-center gap-3">
                <img src={logo} alt="Yodha Logo" className="w-8 h-8 object-contain" />
                <div>
                  <h4 className="font-bold text-white text-base tracking-tight">
                    YODHA <span className="text-sky-400 font-extrabold">2.0</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    The Premier Frontend Hackathon • July 2026
                  </p>
                </div>
              </div>

              {/* Social Links & Back To Top */}
              <div className="flex items-center gap-4 text-slate-400">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" title="Twitter / X">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors" title="Discord">
                  <MessageSquare className="w-4 h-4" />
                </a>
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors ml-2"
                  title="Back to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 font-mono border-t border-white/5 pt-6">
              © 2026 YODHA 2.0. All rights reserved.
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;

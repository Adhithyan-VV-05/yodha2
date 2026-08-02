import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroLoader } from "./components/IntroLoader";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TracksSection } from "./components/TracksSection";
import { SDGSection } from "./components/SDGSection";
import { WhyParticipateSection } from "./components/WhyParticipateSection";
import { TimelineSection } from "./components/TimelineSection";
import { PrizesSection } from "./components/PrizesSection";
import { ClosingCTA } from "./components/ClosingCTA";
import { RegistrationSection } from "./components/RegistrationSection";
import { ThreeDBackground } from "./components/ThreeDBackground";
import { InteractiveLogoBall } from "./components/InteractiveLogoBall";
import { Globe, Share2, MessageSquare, ArrowUp } from "lucide-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#03060d] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <ThreeDBackground />

      {/* Intro Loader Curtain */}
      <AnimatePresence mode="wait">
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Landing Page */}
      <div className={`flex flex-col min-h-screen relative z-10 transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {/* Navbar */}
        <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />

        {/* Main Content Sections (All 10 Official Content Sections) */}
        <main className="flex-grow">
          {/* 1. Hero Section */}
          <HeroSection onOpenRegister={() => setRegisterModalOpen(true)} />
          
          {/* 2, 3, 4, 5. About Yodha, What You'll Build, Vision, Mission */}
          <AboutSection />
          
          {/* 6. Hackathon Themes (Innovation Tracks) */}
          <TracksSection onSelectTrack={handleOpenRegisterWithTrack} />

          {/* 7. UN Sustainable Development Goals */}
          <SDGSection />

          {/* 8. Why Participate? */}
          <WhyParticipateSection />

          {/* 9. Event Roadmap & Schedule */}
          <TimelineSection />

          {/* 9. Prize Pool & Rewards */}
          <PrizesSection onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* 10. Closing Section */}
          <ClosingCTA onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* Registration Form (Embedded Section) */}
          <RegistrationSection selectedTrack={selectedTrack} />
        </main>

        {/* Registration Modal Popup */}
        <RegistrationSection
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          selectedTrack={selectedTrack}
        />

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#020409]/90 backdrop-blur-2xl py-12 px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand & Subtitle with Interactive Logo Ball */}
            <div className="flex items-center gap-3">
              <InteractiveLogoBall size="sm" />
              <div>
                <h4 className="font-bold text-white text-base tracking-tight">
                  YODHA <span className="text-sky-400 font-extrabold">2.0</span>
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Warriors of AI • Healthcare & Sustainability • 11th & 12th
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
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white transition-colors ml-2 cursor-pointer"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 font-mono border-t border-white/5 pt-6">
            © 2026 YODHA Hackathon • Healthcare & Environmental AI. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

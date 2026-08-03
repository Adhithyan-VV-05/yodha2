import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroLoader } from "./components/IntroLoader";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TracksSection } from "./components/TracksSection";
import { SDGSection } from "./components/SDGSection";
import { WhyParticipateSection } from "./components/WhyParticipateSection";
import { PrizesSection } from "./components/PrizesSection";
import { ClosingCTA } from "./components/ClosingCTA";
import { RegistrationSection } from "./components/RegistrationSection";
import { PastGallerySection } from "./components/PastGallerySection";
import { CompactFooter } from "./components/CompactFooter";
import { MinimalBackgroundVisual } from "./components/MinimalBackgroundVisual";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#03060d] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-x-hidden">
      {/* Lightweight Minimalistic Background Video Visual */}
      <MinimalBackgroundVisual />

      {/* Intro Loader Curtain */}
      <AnimatePresence mode="wait">
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Landing Page */}
      <div className={`flex flex-col min-h-screen relative z-10 transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none hidden" : "opacity-100 block"}`}>
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

          {/* 9. Prize Pool & Rewards */}
          <PrizesSection onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* 10. Closing CTA Section */}
          <ClosingCTA onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* 11. Past Hackathon Movements (Positioned just above footer) */}
          <PastGallerySection />

          {/* Registration Form (Embedded Section) */}
          <RegistrationSection selectedTrack={selectedTrack} />
        </main>

        {/* Registration Modal Popup */}
        <RegistrationSection
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          selectedTrack={selectedTrack}
        />

        {/* Ultra-Compact Footer */}
        <CompactFooter />
      </div>
    </div>
  );
}

export default App;

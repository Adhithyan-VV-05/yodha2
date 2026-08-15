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
import { TrackPage } from "./components/TrackPage";
import { RiddleTeaserSection } from "./components/RiddleTeaserSection";
import { trackUserSession } from "./lib/firebase";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare" | "environmental">("home");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  useEffect(() => {
    // Start Firebase visit increment & session duration tracking telemetry
    const cleanupSessionTracker = trackUserSession();

    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      cleanupSessionTracker();
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#020510] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-x-hidden">
      {/* Fixed Minimalistic Background Canvas Visual */}
      <MinimalBackgroundVisual />

      {/* Intro Loader Curtain */}
      <AnimatePresence mode="wait">
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main App Experience */}
      {activePage !== "home" ? (
        <div className="min-h-screen relative z-20">
          <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />
          <TrackPage
            trackType={activePage}
            onBack={() => {
              setActivePage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenRegisterWithTrack={handleOpenRegisterWithTrack}
          />
          {registerModalOpen && (
            <RegistrationSection
              isOpen={true}
              onClose={() => setRegisterModalOpen(false)}
              selectedTrack={selectedTrack}
            />
          )}
          <CompactFooter />
        </div>
      ) : (
        <div className={`flex flex-col min-h-screen relative z-10 transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none hidden" : "opacity-100 block"}`}>
          {/* Navbar */}
          <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />

          {/* Main Content Sections (Immediate Loading for Ultra-Fast Instant Scroll) */}
          <main className="flex-grow">
            {/* 1. Hero Section (Screen 1: Logo Emblem; Screen 2: Interactive 3D Robot & Details) */}
            <HeroSection onOpenRegister={() => setRegisterModalOpen(true)} />

            {/* Secret Riddle Challenge */}
            <RiddleTeaserSection />
            
            {/* 2, 3, 4, 5. About Yodha, Vision, Mission */}
            <AboutSection />
            
            {/* 6. Innovation Tracks */}
            <TracksSection
              onSelectTrack={handleOpenRegisterWithTrack}
              onOpenTrackPage={(tType) => {
                setActivePage(tType);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 7. UN Sustainable Development Goals */}
            <SDGSection />

            {/* 8. Why Participate? */}
            <WhyParticipateSection />

            {/* 9. Standalone Prize Rewards & Trophies Section */}
            <PrizesSection onOpenRegister={() => setRegisterModalOpen(true)} />

            {/* 10. Closing CTA Section */}
            <ClosingCTA onOpenRegister={() => setRegisterModalOpen(true)} />

            {/* 11. Past Hackathon Movements */}
            <PastGallerySection />
          </main>

          {/* Registration Modal Popup - ONLY opens when Register button is clicked */}
          {registerModalOpen && (
            <RegistrationSection
              isOpen={true}
              onClose={() => setRegisterModalOpen(false)}
              selectedTrack={selectedTrack}
            />
          )}

          {/* Ultra-Compact Footer */}
          <CompactFooter />
        </div>
      )}
    </div>
  );
}

export default App;


import { useState, useEffect } from "react";
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
import KineticGrid from "./components/ui/kinetic-grid";
import { TrackPage } from "./components/TrackPage";
import { RiddleTeaserSection } from "./components/RiddleTeaserSection";
import { trackUserSession } from "./lib/firebase";

function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare" | "environmental">("home");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  const handleSelectPage = (page: "home" | "healthcare" | "environmental") => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page !== "home") {
      window.history.pushState({ activePage: page }, "");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePage("home");
    };
    window.addEventListener("popstate", handlePopState);

    // Start Firebase visit increment & session duration tracking telemetry
    const cleanupSessionTracker = trackUserSession();
    document.body.style.overflow = "auto";

    // Dynamic Typewriter Document Title Animation
    const titles = [
      "YODHA 2.0",
      "WARRIORS OF AI",
      "YODHA — WARRIORS OF AI",
      "JYOTHI ENGINEERING COLLEGE",
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const typeTitle = () => {
      const currentFullTitle = titles[titleIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      document.title = currentFullTitle.substring(0, charIndex) + (charIndex < currentFullTitle.length ? " ▌" : "");

      let typeSpeed = isDeleting ? 40 : 85;

      if (!isDeleting && charIndex === currentFullTitle.length) {
        typeSpeed = 2200; // Pause on full title
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 400; // Pause before next title
      }

      timer = setTimeout(typeTitle, typeSpeed);
    };

    typeTitle();

    return () => {
      window.removeEventListener("popstate", handlePopState);
      cleanupSessionTracker();
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <KineticGrid className="min-h-screen bg-[#020510] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-x-hidden">
      {/* Main App Experience */}
      {activePage !== "home" ? (
        <div className="min-h-screen relative z-20">
          {/* Navbar temporarily removed */}
          <TrackPage
            trackType={activePage}
            onBack={() => handleSelectPage("home")}
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
        <div className="flex flex-col min-h-screen relative z-10 opacity-100 block">
          {/* Navbar temporarily removed */}

          {/* Main Content Sections (Immediate Loading for Ultra-Fast Instant Scroll) */}
          <main className="flex-grow">
            {/* 1. Hero Section & Interactive Command Center */}
            <HeroSection onOpenRegister={handleOpenRegisterWithTrack} />

            {/* Secret Riddle Challenge */}
            <RiddleTeaserSection />
            
            {/* 2. About Yodha & Jyothi Engineering College */}
            <AboutSection />

            {/* 3. Innovation Tracks */}
            <TracksSection
              onSelectTrack={handleOpenRegisterWithTrack}
              onOpenTrackPage={(tType) => handleSelectPage(tType)}
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
    </KineticGrid>
  );
}

export default App;


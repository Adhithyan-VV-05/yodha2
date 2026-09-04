import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TracksSection } from "./components/TracksSection";
import { PrizesSection } from "./components/PrizesSection";
import { TimelineSection } from "./components/TimelineSection";
import { FAQSection } from "./components/FAQSection";
import { GuidelinesSection } from "./components/GuidelinesSection";
import { RegistrationPage } from "./components/RegistrationPage";
import { CompactFooter } from "./components/CompactFooter";
import { VerticalYodhaCarousel } from "./components/VerticalYodhaCarousel";
import { TrackPage } from "./components/TrackPage";
import { ScrollBackgroundManager } from "./components/ScrollBackgroundManager";
import { TrailerModal } from "./components/TrailerModal";
import { IntroLoader } from "./components/IntroLoader";
import { trackUserSession } from "./lib/firebase";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare" | "register">("home");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setActivePage("register");
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState({ activePage: "register" }, "");
  };

  const handleSelectPage = (page: "home" | "healthcare" | "register") => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page !== "home") {
      window.history.pushState({ activePage: page }, "");
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.activePage) {
        setActivePage(e.state.activePage);
      } else {
        setActivePage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);

    // Start Firebase visit increment & session duration tracking telemetry
    const cleanupSessionTracker = trackUserSession();

    // Static Document Title
    document.title = "YODHA 2.0 — WARRIORS OF AI";

    return () => {
      window.removeEventListener("popstate", handlePopState);
      cleanupSessionTracker();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#03060d] text-white selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* INITIAL PRELOADER: GATES SITE UNTIL HERO & BACKGROUND IMAGES ARE LOADED */}
      <AnimatePresence>
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Dynamic Scroll-Driven Fixed Background (Night/Day Hills) for All Non-Hero Sections */}
      {activePage === "home" && <ScrollBackgroundManager />}

      {/* DEDICATED FULL PAGE VIEWS */}
      {activePage === "register" ? (
        <RegistrationPage
          onBack={() => handleSelectPage("home")}
          selectedTrack={selectedTrack}
        />
      ) : activePage === "healthcare" ? (
        <div className="min-h-screen w-full relative z-20">
          <TrackPage
            trackType={activePage}
            onBack={() => handleSelectPage("home")}
            onOpenRegisterWithTrack={handleOpenRegisterWithTrack}
          />
        </div>
      ) : (
        <div className="relative z-10 w-full min-h-screen block">
          {/* Top Navbar Header */}
          <Navbar onOpenRegister={handleOpenRegisterWithTrack} />

          {/* 1. Hero Section */}
          <HeroSection
            onOpenRegister={handleOpenRegisterWithTrack}
            onOpenTrailer={() => setTrailerModalOpen(true)}
          />

          {/* 2. About YODHA 2.0 */}
          <AboutSection />

          {/* 3. Healthcare AI Tracks */}
          <TracksSection
            onOpenTrackPage={(tType) => handleSelectPage(tType)}
          />

          {/* 4. Hackathon Journey (Timeline) in SDG Position */}
          <TimelineSection />

          {/* 5. Prizes & Trophies */}
          <PrizesSection onOpenRegister={() => handleOpenRegisterWithTrack()} />

          {/* 6. FAQ Section (Cinematic Editorial Accordion) */}
          <FAQSection />

          {/* 7. Guidelines Section */}
          <GuidelinesSection />

          {/* 9. Vertical YODHA Moving Carousel */}
          <VerticalYodhaCarousel />

          {/* 10. Glassmorphism Footer */}
          <CompactFooter />

          {/* Trailer Video Modal Popup */}
          <TrailerModal
            isOpen={trailerModalOpen}
            onClose={() => setTrailerModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;

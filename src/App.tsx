import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CompactFooter } from "./components/CompactFooter";
import { ScrollBackgroundManager } from "./components/ScrollBackgroundManager";
import { IntroLoader } from "./components/IntroLoader";

// Lazy load non-hero sections below the fold for optimal initial load speed
const AboutSection = lazy(() => import("./components/AboutSection").then((m) => ({ default: m.AboutSection })));
const TracksSection = lazy(() => import("./components/TracksSection").then((m) => ({ default: m.TracksSection })));
const PrizesSection = lazy(() => import("./components/PrizesSection").then((m) => ({ default: m.PrizesSection })));
const TimelineSection = lazy(() => import("./components/TimelineSection").then((m) => ({ default: m.TimelineSection })));
const FAQSection = lazy(() => import("./components/FAQSection").then((m) => ({ default: m.FAQSection })));
const GuidelinesSection = lazy(() => import("./components/GuidelinesSection").then((m) => ({ default: m.GuidelinesSection })));
const RegistrationPage = lazy(() => import("./components/RegistrationPage").then((m) => ({ default: m.RegistrationPage })));
const VerticalYodhaCarousel = lazy(() => import("./components/VerticalYodhaCarousel").then((m) => ({ default: m.VerticalYodhaCarousel })));
const TrackPage = lazy(() => import("./components/TrackPage").then((m) => ({ default: m.TrackPage })));
const TrailerModal = lazy(() => import("./components/TrailerModal").then((m) => ({ default: m.TrailerModal })));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare" | "register">("home");

  // Preserve home page scroll position when opening dedicated sub-pages
  const homeScrollPosRef = useRef<number>(0);

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (activePage === "home") {
      homeScrollPosRef.current = window.scrollY;
    }
    if (trackName) setSelectedTrack(trackName);
    setActivePage("register");
    window.scrollTo({ top: 0, behavior: "instant" });
    window.history.pushState({ activePage: "register" }, "");
  };

  const handleSelectPage = (page: "home" | "healthcare" | "register") => {
    if (page === activePage) return;

    if (activePage === "home") {
      homeScrollPosRef.current = window.scrollY;
    }

    setActivePage(page);

    if (page !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.history.pushState({ activePage: page }, "");
    }
  };

  // Restore saved scroll position when returning to the home page
  useEffect(() => {
    if (activePage === "home" && homeScrollPosRef.current > 0) {
      const savedPos = homeScrollPosRef.current;
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedPos, behavior: "instant" });
      });
    }
  }, [activePage]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.activePage) {
        setActivePage(e.state.activePage);
      } else {
        setActivePage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);

    document.title = "YODHA 2.0 — WARRIORS OF AI";

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#03060d] text-white selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* INITIAL PRELOADER */}
      <AnimatePresence>
        {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Dynamic Scroll-Driven Fixed Background */}
      {activePage === "home" && <ScrollBackgroundManager />}

      {/* DEDICATED FULL PAGE VIEWS */}
      <Suspense fallback={<div className="min-h-screen bg-[#03060d]" />}>
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

            {/* 1. Hero Section (Loaded Immediately) */}
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

            {/* 4. Hackathon Journey (Timeline) */}
            <TimelineSection />

            {/* 5. Prizes & Trophies */}
            <PrizesSection onOpenRegister={() => handleOpenRegisterWithTrack()} />

            {/* 6. FAQ Section */}
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
      </Suspense>
    </div>
  );
}

export default App;

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
import { VerticalYodhaCarousel } from "./components/VerticalYodhaCarousel";
import KineticGrid from "./components/ui/kinetic-grid";
import { TrackPage } from "./components/TrackPage";
import { trackUserSession } from "./lib/firebase";
import { PureHorizontalEngine, type SectionInfo } from "./components/PureHorizontalEngine";
import { AwwwardsCard } from "./components/AwwwardsCard";

const SECTIONS: SectionInfo[] = [
  { id: "hero", name: "Page 1 • Command Center", widthVw: 100 },
  { id: "about", name: "Section 02 • About YODHA 2.0", widthVw: 200 },
  { id: "tracks", name: "Section 03 • Healthcare AI Track", widthVw: 100 },
  { id: "sdg", name: "Section 04 • UN SDG Goals", widthVw: 100 },
  { id: "why", name: "Section 05 • Why Participate", widthVw: 100 },
  { id: "prizes", name: "Section 06 • Prizes & Rewards", widthVw: 100 },
  { id: "cta", name: "Section 07 • Join Movement", widthVw: 100 },
  { id: "gallery", name: "Section 08 • Past Movements", widthVw: 100 },
  { id: "carousel", name: "Section 09 • Vertical Past YODHA Carousel", widthVw: 100 },
];

function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare">("home");

  const handleOpenRegisterWithTrack = (trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setRegisterModalOpen(true);
  };

  const handleSelectPage = (page: "home" | "healthcare") => {
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

    // Completely lock document body vertical scroll
    document.body.style.overflow = "hidden";

    // Start Firebase visit increment & session duration tracking telemetry
    const cleanupSessionTracker = trackUserSession();

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
      document.body.style.overflow = "hidden";
      clearTimeout(timer);
    };
  }, []);

  return (
    <KineticGrid
      planeBackground={true}
      className="h-screen w-screen bg-[#020510] text-white selection:bg-sky-400 selection:text-black font-sans relative overflow-hidden"
    >
      {/* Main App Experience */}
      {activePage !== "home" ? (
        <div className="h-screen w-screen overflow-y-auto relative z-20">
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
        <div className="relative z-10 w-screen h-screen overflow-hidden">
          {/* 100% Vertically Fixed Pure Horizontal Engine */}
          <PureHorizontalEngine sections={SECTIONS}>
            {/* 1. Page 1: Hero Section (YODHA Title + Robot + Timer + CTA) */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="top">
                <HeroSection onOpenRegister={handleOpenRegisterWithTrack} />
              </AwwwardsCard>
            </div>

            {/* 2. Section 02: About YODHA 2.0 (200vw Horizontal Span) */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="bottom">
                <AboutSection />
              </AwwwardsCard>
            </div>

            {/* 3. Section 03: Innovation Tracks (200vw Horizontal Span) */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="top">
                <TracksSection
                  onSelectTrack={handleOpenRegisterWithTrack}
                  onOpenTrackPage={(tType) => handleSelectPage(tType)}
                />
              </AwwwardsCard>
            </div>

            {/* 4. Section 04: UN Sustainable Development Goals */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="bottom">
                <SDGSection />
              </AwwwardsCard>
            </div>

            {/* 5. Section 05: Why Participate? */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="top">
                <WhyParticipateSection />
              </AwwwardsCard>
            </div>

            {/* 6. Section 06: Standalone Prize Rewards & Trophies (200vw Horizontal Span) */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="bottom">
                <PrizesSection onOpenRegister={() => setRegisterModalOpen(true)} />
              </AwwwardsCard>
            </div>

            {/* 7. Section 07: Closing CTA Section */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="top">
                <ClosingCTA onOpenRegister={() => setRegisterModalOpen(true)} />
              </AwwwardsCard>
            </div>

            {/* 8. Section 08: Past Hackathon Movements */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="bottom">
                <PastGallerySection />
              </AwwwardsCard>
            </div>

            {/* 9. Section 09: Vertical Past YODHA Carousel */}
            <div className="w-full h-full flex flex-col justify-center items-center section-100vh-fit">
              <AwwwardsCard direction="top">
                <VerticalYodhaCarousel />
              </AwwwardsCard>
            </div>
          </PureHorizontalEngine>

          {/* Registration Modal Popup */}
          {registerModalOpen && (
            <RegistrationSection
              isOpen={true}
              onClose={() => setRegisterModalOpen(false)}
              selectedTrack={selectedTrack}
            />
          )}
        </div>
      )}
    </KineticGrid>
  );
}

export default App;

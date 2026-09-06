"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TracksSection } from "@/components/TracksSection";
import { PrizesSection } from "@/components/PrizesSection";
import { TimelineSection } from "@/components/TimelineSection";
import { FAQSection } from "@/components/FAQSection";
import { GuidelinesSection } from "@/components/GuidelinesSection";
import { RegistrationPage } from "@/components/RegistrationPage";
import { ReferralRoomPage } from "@/components/ReferralRoomPage";
import { ReferralDashboardModal } from "@/components/ReferralDashboardModal";
import { CompactFooter } from "@/components/CompactFooter";
import { VerticalYodhaCarousel } from "@/components/VerticalYodhaCarousel";
import { TrackPage } from "@/components/TrackPage";
import { ScrollBackgroundManager } from "@/components/ScrollBackgroundManager";
import { TrailerModal } from "@/components/TrailerModal";
import { IntroLoader } from "@/components/IntroLoader";
import { trackUserSession } from "@/lib/firebase";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [trailerVideoUrl, setTrailerVideoUrl] = useState<string | undefined>(undefined);
  const [selectedTrack, setSelectedTrack] = useState("Healthcare AI");
  const [activePage, setActivePage] = useState<"home" | "healthcare" | "register" | "referral-room">("home");

  // Referral Dashboard & Room State
  const [referralDashboardCode, setReferralDashboardCode] = useState<string>("");
  const [isReferralDashboardOpen, setIsReferralDashboardOpen] = useState<boolean>(false);

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

  const handleOpenTrailer = (videoUrl?: string) => {
    if (videoUrl) setTrailerVideoUrl(videoUrl);
    setTrailerModalOpen(true);
  };

  const handleOpenReferralDashboard = (code: string) => {
    if (code && code.trim()) {
      setReferralDashboardCode(code.trim().toUpperCase());
      setIsReferralDashboardOpen(true);
    }
  };

  const handleSelectPage = (page: "home" | "healthcare" | "register" | "referral-room") => {
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

  // Extract referral codes from URL parameters on initial load
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get("ref") || urlParams.get("referral") || urlParams.get("r");
      const viewRefCode = urlParams.get("view_ref") || urlParams.get("dashboard_ref") || urlParams.get("code") || urlParams.get("ref_room");
      const pathname = window.location.pathname.toLowerCase();
      const isRegisterPath = pathname.includes("register");
      const isReferralRoomPath = pathname.includes("referral") || pathname.includes("room");

      if (viewRefCode && viewRefCode.trim()) {
        const cleanViewRef = viewRefCode.trim().toUpperCase();
        setReferralDashboardCode(cleanViewRef);
        setActivePage("referral-room");
      } else if (isReferralRoomPath && refCode) {
        setReferralDashboardCode(refCode.trim().toUpperCase());
        setActivePage("referral-room");
      } else if (refCode && refCode.trim()) {
        const cleanRef = refCode.trim().toUpperCase();
        localStorage.setItem("yodha_referral_code", cleanRef);
        setActivePage("register");
      } else if (isRegisterPath) {
        setActivePage("register");
      }
    } catch (err) {
      console.warn("Error parsing URL referral params:", err);
    }
  }, []);

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

    const cleanupSessionTracker = trackUserSession();

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
      {activePage === "referral-room" ? (
        <ReferralRoomPage
          onBack={() => handleSelectPage("home")}
          referralCode={referralDashboardCode}
        />
      ) : activePage === "register" ? (
        <RegistrationPage
          onBack={() => handleSelectPage("home")}
          selectedTrack={selectedTrack}
          onOpenReferralDashboard={handleOpenReferralDashboard}
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
            onOpenTrailer={handleOpenTrailer}
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
            videoUrl={trailerVideoUrl}
          />
        </div>
      )}

      {/* REFERRAL DASHBOARD MODAL */}
      <ReferralDashboardModal
        isOpen={isReferralDashboardOpen}
        onClose={() => setIsReferralDashboardOpen(false)}
        referralCode={referralDashboardCode}
      />
    </div>
  );
}


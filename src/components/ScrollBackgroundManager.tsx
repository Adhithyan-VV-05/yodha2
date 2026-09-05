"use client";
import { useState, useEffect } from "react";

export function ScrollBackgroundManager() {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [secondHalfOpacity, setSecondHalfOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;

      // 1. HERO BACKGROUND OPACITY:
      // Completely visible (100%) from 0 to 40vh scroll.
      // Begins fading after 40vh scroll (from 40vh to 90vh).
      const fadeStart = h * 0.4;
      const fadeEnd = h * 0.9;

      let currentHeroOpacity = 1;
      if (scrollY <= fadeStart) {
        currentHeroOpacity = 1;
      } else if (scrollY < fadeEnd) {
        currentHeroOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      } else {
        currentHeroOpacity = 0;
      }
      setHeroOpacity(currentHeroOpacity);

      // 2. 1ST HALF VS 2ND HALF THEME SPLIT (DYNAMICALLY LOCATES 2ND HALF SECTIONS ON MOBILE & PC)
      // 1st Half: Hero, About, Tracks, SDG -> Light Theme
      // 2nd Half: Prizes, Timeline, CTA, Carousel, Footer -> Dark Theme
      const targetSection = document.getElementById("prizes");
      let splitPoint = h * 2.8;
      if (targetSection) {
        splitPoint = Math.max(h * 1.5, targetSection.offsetTop - h * 0.4);
      }

      if (scrollY >= splitPoint) {
        const transitionP = Math.min(1, (scrollY - splitPoint) / (h * 0.4));
        setSecondHalfOpacity(transitionP);
      } else {
        setSecondHalfOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
      
      {/* 1. HERO BACKGROUND LAYER (100% COMPLETELY VISIBLE AT 0-40vh, FADES AFTER 40vh) */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out z-10"
        style={{ opacity: heroOpacity }}
      >
        <picture className="w-full h-full">
          <source media="(min-width: 640px)" srcSet="/yodha-hero-bg2-pc.png" />
          <img
            src="/yodha-hero--bg2-mob.png"
            alt="Yodha Hero Background"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      {/* 2. 1ST HALF LIGHT THEME DAY BACKDROP */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none z-0"
        style={{ opacity: 1 - secondHalfOpacity }}
      >
        <img
          src="/bg-hills-day-pc.webp"
          alt="1st Half Light Theme Backdrop"
          className="w-full h-full object-cover object-center opacity-100"
        />
      </div>

      {/* 3. 2ND HALF DARK THEME MIDNIGHT BACKDROP */}
      <div
        className="absolute inset-0 w-full h-full bg-[#03060d] transition-opacity duration-500 pointer-events-none z-0"
        style={{ opacity: secondHalfOpacity }}
      >
        <img
          src="/bg-hills-night-pc.webp"
          alt="2nd Half Dark Theme Backdrop"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
      </div>

    </div>
  );
}

export default ScrollBackgroundManager;

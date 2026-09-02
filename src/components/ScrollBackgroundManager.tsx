import { useState, useEffect } from "react";

export function ScrollBackgroundManager() {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [nightOpacity, setNightOpacity] = useState(0);
  const [dayOpacity, setDayOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;
      const transitionWindow = h * 0.05; // Quick 5vh scroll window for background change at section end
      const sectionHeight = h;

      // 1. HERO SECTION BACKGROUND TRANSITION
      // Hero section lasts for 100vh. First 95vh is 100% steady bright hero image.
      // In the last 5vh of Hero (scrollY between 95vh and 100vh), it rapidly transitions into Section 2 & 3's Night theme.
      const heroStable = sectionHeight - transitionWindow;

      let currentHeroOpacity = 0;
      if (scrollY <= heroStable) {
        currentHeroOpacity = 1;
      } else if (scrollY < sectionHeight) {
        const p = (scrollY - heroStable) / transitionWindow;
        const smoothP = p * p * (3 - 2 * p); // smoothstep
        currentHeroOpacity = 1 - smoothP;
      } else {
        currentHeroOpacity = 0;
      }

      // 2. NON-HERO SECTIONS (2 SECTIONS PER THEME, 5vh TRANSITION AT THE END OF THE 2nd SECTION)
      // Block size = 2 * sectionHeight (200vh per theme block)
      const scrolledPastHero = Math.max(0, scrollY - sectionHeight);
      const blockSize = 2 * sectionHeight;
      const blockIndex = Math.floor(scrolledPastHero / blockSize);
      const offsetInBlock = scrolledPastHero % blockSize;
      const stableZoneInBlock = blockSize - transitionWindow;

      // Block schedule:
      // Block 0 (Sections 2 & 3: About & Tracks) -> Night Theme
      // Block 1 (Sections 4 & 5: SDG & Why) -> Day Theme
      // Block 2 (Sections 6 & 7: Prizes & Timeline) -> Night Theme
      // Block 3 (Sections 8 & 9: CTA/Gallery & Carousel) -> Day Theme

      let currentBlockIsDay = blockIndex % 2 === 1;
      let blockDayVal = currentBlockIsDay ? 1 : 0;

      if (offsetInBlock >= stableZoneInBlock) {
        // We are in the last 5vh of the 2nd section in the current theme block!
        const transitionProgress = (offsetInBlock - stableZoneInBlock) / transitionWindow;
        const smoothT = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);

        if (currentBlockIsDay) {
          // Rapidly changing from Day Theme to Night Theme
          blockDayVal = 1 - smoothT;
        } else {
          // Rapidly changing from Night Theme to Day Theme
          blockDayVal = smoothT;
        }
      }

      // Transition from Hero to Block 0 (Sections 2 & 3: Night) in the last 5vh of Hero
      let finalNight = 0;
      let finalDay = 0;

      if (scrollY < sectionHeight) {
        if (scrollY >= heroStable) {
          const heroTransitionP = (scrollY - heroStable) / transitionWindow;
          const smoothHeroP = heroTransitionP * heroTransitionP * (3 - 2 * heroTransitionP);
          // Rapidly fading from Hero (100% Bright) into Night Theme (Block 0)
          finalNight = smoothHeroP;
          finalDay = 0;
        } else {
          finalNight = 0;
          finalDay = 0;
        }
      } else {
        finalDay = blockDayVal;
        finalNight = 1 - blockDayVal;
      }

      setHeroOpacity(currentHeroOpacity);
      setNightOpacity(Math.min(1, Math.max(0, finalNight)));
      setDayOpacity(Math.min(1, Math.max(0, finalDay)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
      {/* 1. HERO BACKGROUND LAYER (100% BRIGHT DAY IMAGE - NO DARK OVERLAYS) */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out"
        style={{ opacity: heroOpacity }}
      >
        {/* Hero Background Layer (bg-hills-day-pc.png) */}
        <img
          src="/bg-hills-day-pc.png"
          alt="Yodha Day Hills Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. NIGHT HILLS BACKGROUND LAYER */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out"
        style={{ opacity: nightOpacity }}
      >
        <img
          src="/bg-hills-night-pc.png"
          alt="Night Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      </div>

      {/* 3. DAY HILLS BACKGROUND LAYER */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out"
        style={{ opacity: dayOpacity }}
      >
        <img
          src="/bg-hills-day-pc.png"
          alt="Day Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
      </div>
    </div>
  );
}

export default ScrollBackgroundManager;

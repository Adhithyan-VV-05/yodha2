import React from "react";

interface LiquidGlassSurfaceProps {
  className?: string;
  children?: React.ReactNode;
  filterId?: string;
}

export function LiquidGlassSurface({
  className = "",
  children,
  filterId = "yodha-navbar-lens-filter",
}: LiquidGlassSurfaceProps) {
  return (
    <>
      {/* SVG PHYSICAL OPTICAL LENS DISPLACEMENT FILTER */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            {/* Smooth fluid lens turbulence for physical optical spreading refraction */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.022"
              numOctaves="3"
              result="noise"
            />
            {/* Displaces background content passing behind the glass lens */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="lensDisplaced"
            />
            <feGaussianBlur in="lensDisplaced" stdDeviation="0.3" result="lensBlur" />
          </filter>
        </defs>
      </svg>

      {/* 3D FLOATING OPTICAL LENS CONTAINER */}
      <div
        className={`relative overflow-hidden transition-all duration-300 ${className} shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(168,85,247,0.25),inset_0_2.5px_4px_rgba(255,255,255,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.95),inset_0_-6px_18px_rgba(0,0,0,0.65),inset_0_0_25px_rgba(255,255,255,0.15)] border border-white/60 dark:border-purple-400/40`}
      >
        {/* PHYSICAL LENS BACKDROP REFRACTION (WARPS & SPREADS BACKGROUND SCROLLING UNDERNEATH) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] bg-white/40 dark:bg-[#06091c]/75 backdrop-blur-xl backdrop-saturate-[1.7] backdrop-contrast-[1.12] backdrop-brightness-[1.05]"
          style={{
            filter: `url(#${filterId})`,
          }}
        />

        {/* LENS CURVATURE SPECULAR GLOSS SHEEN */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-b from-white/45 via-white/10 to-transparent opacity-95" />

        {/* TOP-LEFT LIGHT FLARE ARC (CONVEX GLASS REFLECTION) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-[inherit] bg-gradient-to-br from-white/40 via-transparent to-transparent" />

        {/* CHROMATIC INNER PERIMETER RIM */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-white/40 dark:border-white/20 mix-blend-overlay" />

        {/* CRISP FOREGROUND INTERACTIVE CONTENT (SHARP, PERFECTLY VISIBLE & READABLE) */}
        <div className="relative z-10 pointer-events-auto filter-none text-slate-900 dark:text-white">
          {children}
        </div>
      </div>
    </>
  );
}

export default LiquidGlassSurface;



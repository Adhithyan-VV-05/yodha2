import React from "react";

interface LiquidGlassSurfaceProps {
  className?: string;
  children?: React.ReactNode;
  filterId?: string;
}

export function LiquidGlassSurface({
  className = "",
  children,
  filterId = "yodha-navbar-glass-filter",
}: LiquidGlassSurfaceProps) {
  return (
    <>
      {/* SVG LIQUID DISPLACEMENT FILTER */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
          </filter>
        </defs>
      </svg>

      {/* 3D LIQUID GLASS CONTAINER WITH FLOATING SHADOW & GLASS RIM */}
      <div
        className={`relative overflow-hidden transition-all duration-300 ${className} shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_35px_rgba(147,51,234,0.2),inset_0_2.5px_3px_rgba(255,255,255,0.85),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-5px_15px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.12)] border border-white/60 dark:border-purple-400/40`}
      >
        {/* REFRACTIVE BACKDROP LAYER WITH SVG LIQUID DISPLACEMENT */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] bg-white/50 dark:bg-[#070b1e]/75 backdrop-blur-2xl backdrop-saturate-[1.8] backdrop-contrast-[1.1] backdrop-brightness-[1.05]"
          style={{
            filter: `url(#${filterId})`,
          }}
        />

        {/* 3D GLASS EDGE BEVEL & TOP GLOSS SHINE */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-90" />

        {/* TOP-LEFT SPECULAR LIGHT REFLECTION ARC */}
        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-[inherit] bg-gradient-to-br from-white/35 via-transparent to-transparent" />

        {/* INNER LIQUID EDGE WARP REFLECTION RING */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-white/30 dark:border-white/15 mix-blend-overlay" />

        {/* FOREGROUND INTERACTIVE CONTENT */}
        <div className="relative z-10 pointer-events-auto">{children}</div>
      </div>
    </>
  );
}

export default LiquidGlassSurface;


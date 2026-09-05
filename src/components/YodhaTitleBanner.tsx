"use client";
interface YodhaTitleBannerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "left" | "center";
}

const LETTERS = [
  { id: "Y", src: "/Y.webp" },
  { id: "O", src: "/O.webp" },
  { id: "D", src: "/D.webp" },
  { id: "H", src: "/H.webp" },
  { id: "A", src: "/A.webp" },
];

export function YodhaTitleBanner({ size = "md", className = "", align = "center" }: YodhaTitleBannerProps) {
  const letterSizes = {
    sm: "h-10 sm:h-12",
    md: "h-14 sm:h-20 md:h-24 lg:h-28",
    lg: "h-16 sm:h-24 md:h-28 lg:h-32",
    xl: "h-20 sm:h-32 md:h-40 lg:h-48",
  }[size];

  const warriorSizes = {
    sm: "w-full max-w-[320px] sm:max-w-[400px] h-auto max-h-14",
    md: "w-full max-w-[420px] sm:max-w-[620px] md:max-w-[780px] lg:max-w-[940px] h-auto max-h-20 sm:max-h-28 md:max-h-36",
    lg: "w-full max-w-[480px] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[1080px] h-auto max-h-24 sm:max-h-34 md:max-h-40",
    xl: "w-full max-w-[580px] sm:max-w-[880px] md:max-w-[1100px] lg:max-w-[1300px] h-auto max-h-28 sm:max-h-44 md:max-h-52",
  }[size];

  const alignmentClass = align === "left" ? "items-center lg:items-start" : "items-center";

  return (
    <div className={`flex flex-col select-none ${alignmentClass} ${className}`}>
      {/* Tight-knit Y-O-D-H-A Title Letter Row */}
      <div className="flex items-center -space-x-1 sm:-space-x-2 md:-space-x-3 py-1 relative z-20">
        {LETTERS.map((letter) => (
          <div key={letter.id} className="relative">
            <img
              src={letter.src}
              alt={letter.id}
              className={`${letterSizes} w-auto object-contain`}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* WARRIORS OF AI Graphic Banner */}
      <div className="mt-[-6px] sm:mt-[-12px] md:mt-[-16px] flex items-center justify-center w-full px-2 relative z-10">
        <img
          src="/warrior of ai.webp"
          alt="WARRIORS OF AI"
          className={`${warriorSizes} object-contain filter brightness-110`}
          loading="eager"
        />
      </div>
    </div>
  );
}

export default YodhaTitleBanner;





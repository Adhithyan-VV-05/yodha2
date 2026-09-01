import React from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  bgImage?: string;
}

export function Card3DTilt({
  children,
  className = "",
  bgImage,
}: Card3DTiltProps) {
  return (
    <div className={`relative ${className}`}>
      {bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[#02040a]/80" />
        </div>
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default Card3DTilt;


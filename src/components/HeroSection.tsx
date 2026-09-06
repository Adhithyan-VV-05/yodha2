"use client";
import { FirstLoadHero } from "./FirstLoadHero";

interface HeroSectionProps {
  onOpenRegister: (trackName?: string) => void;
  onOpenTrailer?: (videoUrl?: string) => void;
}

export function HeroSection({ onOpenRegister, onOpenTrailer }: HeroSectionProps) {
  return <FirstLoadHero onOpenRegister={onOpenRegister} onOpenTrailer={onOpenTrailer} />;
}

export default HeroSection;


import { FirstLoadHero } from "./FirstLoadHero";

interface HeroSectionProps {
  onOpenRegister: (trackName?: string) => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return <FirstLoadHero onOpenRegister={onOpenRegister} />;
}



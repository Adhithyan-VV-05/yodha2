import { FirstLoadHero } from "./FirstLoadHero";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return <FirstLoadHero onOpenRegister={onOpenRegister} />;
}


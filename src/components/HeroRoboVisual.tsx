interface HeroRoboVisualProps {
  onOpenRegister?: (trackName?: string) => void;
}

export function HeroRoboVisual({ onOpenRegister }: HeroRoboVisualProps) {
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center select-none py-2">
      <div
        className="w-full flex items-center justify-center cursor-pointer"
        onClick={() => onOpenRegister && onOpenRegister()}
      >
        <img
          src="/robo.webp"
          alt="YODHA AI Robo"
          className="w-full h-auto max-h-[22vh] sm:max-h-[28vh] lg:max-h-[420px] object-contain"
        />
      </div>
    </div>
  );
}

export default HeroRoboVisual;


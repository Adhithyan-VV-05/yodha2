import { useEffect, useRef } from "react";

export function MinimalBackgroundVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 65 : 120;

    interface LiveStar {
      x: number;
      y: number;
      radius: number;
      minAlpha: number;
      maxAlpha: number;
      speed1: number;
      speed2: number;
      phase1: number;
      phase2: number;
      color: string;
      hasFlare: boolean;
    }

    // Calm, elegant star palette (soft white, azure, ice blue)
    const starColors = [
      "rgba(255, 255, 255, ",   // Soft Pure White
      "rgba(186, 230, 253, ",   // Ice Blue Sparkle
      "rgba(56, 189, 248, ",    // Sky Blue Star
      "rgba(148, 163, 184, ",   // Slate Star
      "rgba(96, 165, 250, ",    // Deep Space Azure
    ];

    const stars: LiveStar[] = [];

    for (let i = 0; i < starCount; i++) {
      const rand = Math.random();
      let radius: number;
      let hasFlare = false;

      if (rand < 0.8) {
        radius = 0.5 + Math.random() * 0.7;
      } else if (rand < 0.95) {
        radius = 1.1 + Math.random() * 0.5;
      } else {
        radius = 1.8 + Math.random() * 0.6;
        hasFlare = true;
      }

      // Gentle, smooth slow breathing stars (no aggressive rapid blinking)
      const speed1 = 0.3 + Math.random() * 0.8;
      const minAlpha = 0.15 + Math.random() * 0.2;
      const maxAlpha = 0.6 + Math.random() * 0.25;

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius,
        minAlpha,
        maxAlpha,
        speed1,
        speed2: 0.5 + Math.random() * 1.0,
        phase1: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        hasFlare,
      });
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.012;

      ctx.clearRect(0, 0, w, h);

      // Render Subtle Twinkling Stars
      stars.forEach((star) => {
        const wave1 = Math.sin(time * star.speed1 + star.phase1);
        const wave2 = Math.cos(time * star.speed2 + star.phase2);
        const combined = (wave1 * 0.65 + wave2 * 0.35 + 1) / 2;

        const currentAlpha = star.minAlpha + combined * (star.maxAlpha - star.minAlpha);

        // Core star body
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020510]">
      {/* PC View Background Image (pc bg.jpeg) */}
      <img
        src="/pc bg.jpeg"
        alt=""
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-90"
      />
      {/* Mobile View Background Image (mob bg.jpeg) */}
      <img
        src="/mob bg.jpeg"
        alt=""
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-90"
      />
      {/* Canvas for Live Twinkling Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-10 opacity-90" />
    </div>
  );
}




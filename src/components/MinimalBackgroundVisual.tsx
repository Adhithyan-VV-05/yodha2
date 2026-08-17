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

    // Exact color palette matching bg.png & bg2.png space nebulae and star glow
    const starColors = [
      "rgba(255, 255, 255, ",   // Brilliant Pure White
      "rgba(0, 240, 255, ",     // Electric Neon Cyan
      "rgba(56, 189, 248, ",    // Sky Blue Star
      "rgba(186, 230, 253, ",   // Ice Blue Sparkle
      "rgba(96, 165, 250, ",    // Deep Space Azure
      "rgba(168, 85, 247, ",    // Cosmic Purple Star
    ];

    const stars: LiveStar[] = [];

    for (let i = 0; i < starCount; i++) {
      const rand = Math.random();
      let radius: number;
      let hasFlare = false;

      if (rand < 0.75) {
        radius = 0.5 + Math.random() * 0.8;
      } else if (rand < 0.93) {
        radius = 1.3 + Math.random() * 0.7;
      } else {
        radius = 2.1 + Math.random() * 0.9;
        hasFlare = true;
      }

      // 40% Fast Frequent Flickering Stars, 40% Medium, 20% Slow
      const speedTier = Math.random();
      let speed1: number;
      if (speedTier < 0.45) {
        speed1 = 3.8 + Math.random() * 5.2; // Rapid live blinking
      } else if (speedTier < 0.85) {
        speed1 = 1.6 + Math.random() * 2.0; // Medium shimmering
      } else {
        speed1 = 0.5 + Math.random() * 0.9; // Slow deep breathing
      }

      const minAlpha = 0.02 + Math.random() * 0.12; // Drops down to near-black for dramatic blinking contrast
      const maxAlpha = 0.75 + Math.random() * 0.25; // Reaches full vibrant brightness

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius,
        minAlpha,
        maxAlpha,
        speed1,
        speed2: 1.0 + Math.random() * 3.0,
        phase1: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        hasFlare,
      });
    }

    // Micro Shooting Star / Meteor logic
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
      dx: number;
      dy: number;
    }
    let shootingStar: ShootingStar | null = null;

    const createShootingStar = () => {
      const startX = Math.random() * w;
      const startY = Math.random() * (h * 0.4);
      shootingStar = {
        x: startX,
        y: startY,
        length: 60 + Math.random() * 80,
        speed: 12 + Math.random() * 10,
        alpha: 1,
        dx: 3 + Math.random() * 3,
        dy: 2 + Math.random() * 2,
      };
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;
    let nextShootingStarTime = 100;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016;

      ctx.clearRect(0, 0, w, h);

      // Render Twinkling Stars
      stars.forEach((star) => {
        const wave1 = Math.sin(time * star.speed1 + star.phase1);
        const wave2 = Math.cos(time * star.speed2 + star.phase2);
        const combined = (wave1 * 0.65 + wave2 * 0.35 + 1) / 2;

        const currentAlpha = star.minAlpha + combined * (star.maxAlpha - star.minAlpha);

        // Draw 4-point cross-flare for bright focal stars
        if (star.hasFlare && currentAlpha > 0.4) {
          const flareLen = star.radius * 5.0 * (currentAlpha / star.maxAlpha);
          const flareAlpha = currentAlpha * 0.4;

          ctx.save();
          ctx.strokeStyle = `${star.color}${flareAlpha})`;
          ctx.lineWidth = 0.8;

          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();

          ctx.restore();
        }

        // Draw radial aura for medium/large glowing stars
        if (star.radius > 1.2) {
          const glowRadius = star.radius * 3.8;
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glowRadius
          );
          gradient.addColorStop(0, `${star.color}${currentAlpha * 0.5})`);
          gradient.addColorStop(0.5, `${star.color}${currentAlpha * 0.18})`);
          gradient.addColorStop(1, `${star.color}0)`);

          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core star body
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.fill();
      });

      // Render Shooting Star
      if (!shootingStar && time > nextShootingStarTime) {
        createShootingStar();
        nextShootingStarTime = time + 120 + Math.random() * 240;
      }

      if (shootingStar) {
        shootingStar.x += shootingStar.dx * (shootingStar.speed / 4);
        shootingStar.y += shootingStar.dy * (shootingStar.speed / 4);
        shootingStar.alpha -= 0.02;

        if (shootingStar.alpha <= 0 || shootingStar.x > w || shootingStar.y > h) {
          shootingStar = null;
        } else {
          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - shootingStar.dx * 15,
            shootingStar.y - shootingStar.dy * 15
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
          grad.addColorStop(0.4, `rgba(56, 189, 248, ${shootingStar.alpha * 0.6})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - shootingStar.dx * 15,
            shootingStar.y - shootingStar.dy * 15
          );
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Fixed Deep Space Galaxy Background Layer (z-0) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020510]">
        {/* PC View Background Image (pc bg.jpeg) */}
        <img
          src="/pc bg.jpeg"
          alt=""
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />
        {/* Mobile View Background Image (mob bg.jpeg) */}
        <img
          src="/mob bg.jpeg"
          alt=""
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />
        {/* Canvas for Live Twinkling Stars - z-10 (above background image, below page content) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-10 opacity-95" />
      </div>

      {/* Topmost Screen HUD Frame Layer (Topmost Z-Index: z-[9999]) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* PC Screen Frame Overlay (frame_pc.png) */}
        <img
          src="/frame_pc.png"
          alt=""
          className="hidden md:block fixed inset-0 w-full h-full object-fill pointer-events-none z-[9999]"
        />
        {/* Mobile Screen Frame Overlay (frame_mob.png) */}
        <img
          src="/frame_mob.png"
          alt=""
          className="block md:hidden fixed inset-0 w-full h-full object-fill pointer-events-none z-[9999]"
        />
      </div>
    </>
  );
}



import { useEffect, useRef } from "react";

export function MinimalBackgroundVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Dynamic particle count based on screen width for 60 FPS performance
    const particleCount = window.innerWidth < 640 ? 24 : 45;
    const particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseA = 0.15 + Math.random() * 0.3;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: baseA,
        baseAlpha: baseA,
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
      time += 0.015;

      // Base deep pitch space background
      ctx.fillStyle = "#020510";
      ctx.fillRect(0, 0, w, h);

      // Subtle Breathing Radial Light Spot 1 (Top Left)
      const g1Radius = Math.min(w, h) * (0.45 + Math.sin(time * 0.8) * 0.05);
      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 10, w * 0.25, h * 0.3, g1Radius);
      g1.addColorStop(0, "rgba(37, 99, 235, 0.12)");
      g1.addColorStop(0.5, "rgba(14, 165, 233, 0.05)");
      g1.addColorStop(1, "rgba(2, 5, 16, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Subtle Breathing Radial Light Spot 2 (Bottom Right)
      const g2Radius = Math.min(w, h) * (0.5 + Math.cos(time * 0.6) * 0.05);
      const g2 = ctx.createRadialGradient(w * 0.75, h * 0.7, 10, w * 0.75, h * 0.7, g2Radius);
      g2.addColorStop(0, "rgba(99, 102, 241, 0.1)");
      g2.addColorStop(0.5, "rgba(56, 189, 248, 0.04)");
      g2.addColorStop(1, "rgba(2, 5, 16, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Render micro-constellation network connecting lines
      const maxDist = window.innerWidth < 640 ? 80 : 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render particle nodes
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        p.alpha = p.baseAlpha + Math.sin(time + idx) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${Math.max(0.05, p.alpha)})`;
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
      {/* 4K Minimal Dark Obsidian Premium Backdrop Texture (Ultra-Soft, Non-Intrusive) */}
      <img
        src="/cyber_bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-18 mix-blend-soft-light filter brightness-90 contrast-110 pointer-events-none"
      />
      <canvas ref={canvasRef} className="w-full h-full block opacity-70 relative z-10" />
    </div>
  );
}


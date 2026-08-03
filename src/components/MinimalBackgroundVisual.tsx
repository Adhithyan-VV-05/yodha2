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

    // Create 80 lightweight, fast ambient floating stardust particles
    const particleCount = window.innerWidth < 640 ? 35 : 80;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];

    const colors = ["rgba(56, 189, 248, ", "rgba(129, 140, 248, ", "rgba(192, 132, 252, "];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: 0.2 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
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
      time += 0.01;

      // Dark pitch background matching landing page theme
      ctx.fillStyle = "#03060d";
      ctx.fillRect(0, 0, w, h);

      // Draw subtle radial ambient nebula glows
      const cx1 = w * 0.25 + Math.sin(time * 0.5) * 40;
      const cy1 = h * 0.3 + Math.cos(time * 0.5) * 30;
      const g1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, w * 0.45);
      g1.addColorStop(0, "rgba(56, 189, 248, 0.08)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const cx2 = w * 0.75 + Math.cos(time * 0.4) * 40;
      const cy2 = h * 0.7 + Math.sin(time * 0.4) * 30;
      const g2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, w * 0.45);
      g2.addColorStop(0, "rgba(168, 85, 247, 0.07)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Render drifting stardust particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#03060d]">
      <canvas ref={canvasRef} className="w-full h-full block opacity-90" />
    </div>
  );
}

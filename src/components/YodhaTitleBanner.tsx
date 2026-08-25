import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface YodhaTitleBannerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "left" | "center";
}

const LETTERS = [
  { id: "Y", src: "/Y.webp", delay: 0.05 },
  { id: "O", src: "/O.webp", delay: 0.1 },
  { id: "D", src: "/D.webp", delay: 0.15 },
  { id: "H", src: "/H.webp", delay: 0.2 },
  { id: "A", src: "/A.webp", delay: 0.25 },
];

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

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

  // Physics state for each letter (fleeing repulsion physics)
  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<PhysicsState[]>([
    { x: 0, y: 0, vx: 0, vy: 0 },
    { x: 0, y: 0, vx: 0, vy: 0 },
    { x: 0, y: 0, vx: 0, vy: 0 },
    { x: 0, y: 0, vx: 0, vy: 0 },
    { x: 0, y: 0, vx: 0, vy: 0 },
  ]);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;

    const updatePhysics = () => {
      animId = requestAnimationFrame(updatePhysics);

      const mouse = mousePosRef.current;

      for (let i = 0; i < LETTERS.length; i++) {
        const el = letterRefs.current[i];
        const p = physicsRef.current[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // Calculate original un-displaced base center of letter
        const baseCenterX = rect.left - p.x + rect.width / 2;
        const baseCenterY = rect.top - p.y + rect.height / 2;

        const currentX = baseCenterX + p.x;
        const currentY = baseCenterY + p.y;

        const dx = currentX - mouse.x;
        const dy = currentY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion radius (cursor cannot touch letters)
        const radius = 130;

        let fx = 0;
        let fy = 0;

        if (dist < radius && dist > 0) {
          const pushFactor = 1 - dist / radius;
          const force = pushFactor * pushFactor * 16;
          const angle = Math.atan2(dy, dx);
          fx = Math.cos(angle) * force;
          fy = Math.sin(angle) * force;
        }

        // Damped spring return force back to origin (0, 0)
        const springK = 0.09;
        const damping = 0.84;

        const springFx = -p.x * springK;
        const springFy = -p.y * springK;

        p.vx = (p.vx + fx + springFx) * damping;
        p.vy = (p.vy + fy + springFy) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Max displacement threshold
        const maxOffset = 140;
        p.x = Math.max(-maxOffset, Math.min(maxOffset, p.x));
        p.y = Math.max(-maxOffset, Math.min(maxOffset, p.y));

        // Smoothly apply hardware-accelerated transform directly to DOM element (0 React re-renders)
        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0)`;
      }
    };

    updatePhysics();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`flex flex-col select-none ${alignmentClass} ${className}`}>
      {/* Tight-knit Y-O-D-H-A Title Letter Row (Single Unified Word) */}
      <div className="flex items-center -space-x-1 sm:-space-x-2 md:-space-x-3 py-1 relative z-20">
        {LETTERS.map((letter, idx) => (
          <motion.div
            key={letter.id}
            ref={(el) => {
              letterRefs.current[idx] = el;
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: letter.delay }}
            className="relative group cursor-pointer"
          >
            <img
              src={letter.src}
              alt={letter.id}
              className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:brightness-125`}
              loading="eager"
            />
          </motion.div>
        ))}
      </div>

      {/* WARRIORS OF AI Graphic Banner (Larger, Centered, Closer, Smooth Horizontal Elaborating/Shrinking Pulse) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-[-6px] sm:mt-[-12px] md:mt-[-16px] flex items-center justify-center w-full px-2 relative z-10"
      >
        <motion.img
          src="/warrior of ai.webp"
          alt="WARRIORS OF AI"
          animate={{
            scaleX: [1, 1.05, 0.96, 1.04, 1],
            scaleY: [1, 0.98, 1.02, 0.99, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className={`${warriorSizes} object-contain filter brightness-110 drop-shadow-[0_4px_16px_rgba(56,189,248,0.4)]`}
          loading="eager"
        />
      </motion.div>
    </div>
  );
}




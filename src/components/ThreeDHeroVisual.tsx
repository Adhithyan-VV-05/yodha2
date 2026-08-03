import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface ThreeDHeroVisualProps {
  isLoader?: boolean;
  progress?: number;
  isEnding?: boolean; // When loading finishes, trigger Pulsar Star Explosion burst
  bounceEntrance?: boolean;
}

export function ThreeDHeroVisual({ isLoader = false, progress = 0, isEnding = false }: ThreeDHeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 380;
    const height = containerRef.current.clientHeight || 380;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - Positioned for prominent ball
    const cameraZ = isLoader ? 5.2 : 5.8;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = cameraZ;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4. Prominent 3D Black Sphere
    const sphereRadius = 1.55;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);

    // High-Res Canvas Texture for Crisp Dual Logo Visibility
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 2048;
    canvasTex.height = 1024;
    const ctx = canvasTex.getContext("2d");

    if (ctx) {
      // Pure Black Sphere Background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 2048, 1024);

      // Load logo image & render centered at UV 0.25 (Side 1) and UV 0.75 (Side 2)
      const img = new Image();
      img.src = logo;
      img.onload = () => {
        const logoSize = 800;
        const topY = (1024 - logoSize) / 2;

        // Side 1 Logo (UV u = 0.25 -> x = 512)
        ctx.drawImage(img, 512 - logoSize / 2, topY, logoSize, logoSize);

        // Side 2 Logo (UV u = 0.75 -> x = 1536)
        ctx.drawImage(img, 1536 - logoSize / 2, topY, logoSize, logoSize);

        sphereTexture.needsUpdate = true;
      };
    }

    const sphereTexture = new THREE.CanvasTexture(canvasTex);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Pure Pitch Black Metallic Surface with High Emissive Brightness
    const sphereMat = new THREE.MeshStandardMaterial({
      map: sphereTexture,
      emissiveMap: sphereTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.85,
      color: 0x000000,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(sphereMesh);

    // PULSAR STAR EXPLOSION SHOCKWAVE PARTICLES RING
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = sphereRadius * (0.8 + Math.random() * 0.4);
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const speed = 4 + Math.random() * 8;
      particleVelocities.push(
        new THREE.Vector3(Math.cos(angle) * speed, (Math.random() - 0.5) * 2, Math.sin(angle) * speed)
      );
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    keyLight.position.set(6, 5, 6);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0xa855f7, 3.2);
    backLight.position.set(-6, -4, -6);
    scene.add(backLight);

    // Mouse & Touch Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const mouseY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      targetRotationY = mouseX * 0.85;
      targetRotationX = mouseY * 0.85;
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w < 640) {
        camera.position.z = isLoader ? 6.2 : 6.8;
      } else {
        camera.position.z = isLoader ? 5.2 : 5.8;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let endingStartTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      sphereMesh.rotation.y = elapsedTime * (isLoader ? 1.2 : 0.45);

      if (isLoader) {
        if (isEnding) {
          // SPECTACULAR PULSAR STAR EXPLOSION ANIMATION
          if (endingStartTime === 0) endingStartTime = elapsedTime;
          const t = elapsedTime - endingStartTime; // 0 to 1.0 sec

          if (t < 0.4) {
            // Phase 1: Energy Accumulation & Supercharge (0 - 0.4s)
            const chargeFactor = t / 0.4;
            const currentScale = 1 + chargeFactor * 0.35;
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            sphereMat.emissiveIntensity = 0.7 + chargeFactor * 8.0; // Blinding glow
          } else if (t < 0.75) {
            // Phase 2: Supernova Pulsar Explosion Burst (0.4s - 0.75s)
            const burstFactor = (t - 0.4) / 0.35;
            const currentScale = 1.35 + burstFactor * 2.2; // Expands outward
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            sphereMat.emissiveIntensity = 8.7 * (1 - burstFactor);
            particleMat.opacity = Math.sin(burstFactor * Math.PI); // Particle flare ring

            // Expand shockwave particles
            const positions = particleGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
              positions[i * 3] += particleVelocities[i].x * 0.03;
              positions[i * 3 + 1] += particleVelocities[i].y * 0.03;
              positions[i * 3 + 2] += particleVelocities[i].z * 0.03;
            }
            particleGeo.attributes.position.needsUpdate = true;
          } else {
            // Phase 3: Cosmic Collapse & Dissolve to Size 0 (0.75s - 1.0s)
            const collapseFactor = (t - 0.75) / 0.25;
            const currentScale = Math.max(0, 3.55 * (1 - collapseFactor));
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            particleMat.opacity = Math.max(0, 1 - collapseFactor);
          }
        } else {
          // Dynamic initial shrink from 100x down to 1x as progress goes 0 -> 100%
          const shrinkFactor = Math.max(1, 10 - 9 * (progress / 100));
          mainGroup.scale.set(shrinkFactor, shrinkFactor, shrinkFactor);
        }
        sphereMesh.position.y = Math.sin(elapsedTime * 3) * 0.1;
      }

      // Smooth tracking lerp
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isLoader, progress, isEnding]);

  return (
    <motion.div
      initial={
        !isLoader
          ? { y: 40, opacity: 0 }
          : false
      }
      animate={
        isLoader
          ? { opacity: 1 }
          : { y: 0, opacity: 1 }
      }
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full ${
        isLoader ? "h-[320px] sm:h-[400px]" : "h-[340px] sm:h-[420px] lg:h-[480px]"
      } flex items-center justify-center select-none overflow-hidden touch-none`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing max-w-full max-h-full touch-none"
      />

      {!isLoader && (
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: [0, -5, 0],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.3 },
          }}
          className="absolute bottom-1 px-5 py-1 rounded-full bg-slate-950/80 border border-sky-400/30 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] text-center pointer-events-none"
        >
          <span className="text-[11px] font-mono font-bold text-sky-300 tracking-widest uppercase">
            YODHA 2.0 • 11th & 12th
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

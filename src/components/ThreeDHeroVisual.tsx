import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface ThreeDHeroVisualProps {
  isLoader?: boolean;
  progress?: number;
  isEnding?: boolean;
  bounceEntrance?: boolean;
}

export function ThreeDHeroVisual({ isLoader = false, progress = 0, isEnding = false }: ThreeDHeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DBallReady, setIs3DBallReady] = useState(false);
  const [hasContextError, setHasContextError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = Math.max(1, container.clientWidth || window.innerWidth || 360);
    let height = Math.max(1, container.clientHeight || window.innerHeight || 360);
    const isMobile = width < 640 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const cameraZ = isLoader ? (isMobile ? 6.2 : 5.2) : (isMobile ? 6.8 : 5.8);
    const aspect = (width > 0 && height > 0) ? width / height : 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.z = cameraZ;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height, false);
      // High pixel ratio up to 3 for crystal-clear sharp rendering on mobile and PC
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    } catch {
      setHasContextError(true);
      return;
    }

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const sphereRadius = 1.55;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);

    // ULTRA HD TEXTURE CANVAS (2048 x 1024)
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 2048;
    canvasTex.height = 1024;
    const ctx = canvasTex.getContext("2d");

    const sphereTexture = new THREE.CanvasTexture(canvasTex);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;
    // PREVENT DOWN-SAMPLING BLUR
    sphereTexture.generateMipmaps = false;
    sphereTexture.minFilter = THREE.LinearFilter;
    sphereTexture.magFilter = THREE.LinearFilter;

    const sphereMat = new THREE.MeshStandardMaterial({
      map: sphereTexture,
      emissiveMap: sphereTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.9,
      color: 0x000000,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(sphereMesh);

    // Load High-Res Logo Image & Render Crisp Texture
    const img = new Image();
    img.src = logo;

    const renderCrispTexture = () => {
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 2048, 1024);

      const logoSize = 780;
      const topY = (1024 - logoSize) / 2;

      ctx.drawImage(img, 512 - logoSize / 2, topY, logoSize, logoSize);
      ctx.drawImage(img, 1536 - logoSize / 2, topY, logoSize, logoSize);

      sphereTexture.needsUpdate = true;
      setIs3DBallReady(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      renderCrispTexture();
    } else {
      img.onload = () => renderCrispTexture();
    }

    // Pulsar Particle Ring
    const particleCount = isMobile ? 60 : 120;
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    keyLight.position.set(6, 5, 6);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0xa855f7, 3.2);
    backLight.position.set(-6, -4, -6);
    scene.add(backLight);

    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const mouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const mouseY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      targetRotationY = mouseX * 0.85;
      targetRotationX = mouseY * 0.85;
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = Math.max(1, containerRef.current.clientWidth || window.innerWidth || 360);
      const h = Math.max(1, containerRef.current.clientHeight || window.innerHeight || 360);
      const isMob = w < 640;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      camera.position.z = isLoader ? (isMob ? 6.2 : 5.2) : (isMob ? 6.8 : 5.8);
    };

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(handleResize) : null;
    resizeObserver?.observe(container);
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let endingStartTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      sphereMesh.rotation.y = elapsedTime * (isLoader ? 1.2 : 0.45);

      if (isLoader) {
        if (isEnding) {
          if (endingStartTime === 0) endingStartTime = elapsedTime;
          const t = elapsedTime - endingStartTime;

          if (t < 0.4) {
            const chargeFactor = t / 0.4;
            const currentScale = 1 + chargeFactor * 0.35;
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            sphereMat.emissiveIntensity = 0.7 + chargeFactor * 8.0;
          } else if (t < 0.75) {
            const burstFactor = (t - 0.4) / 0.35;
            const currentScale = 1.35 + burstFactor * 2.2;
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            sphereMat.emissiveIntensity = 8.7 * (1 - burstFactor);
            particleMat.opacity = Math.sin(burstFactor * Math.PI);

            const positions = particleGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
              positions[i * 3] += particleVelocities[i].x * 0.03;
              positions[i * 3 + 1] += particleVelocities[i].y * 0.03;
              positions[i * 3 + 2] += particleVelocities[i].z * 0.03;
            }
            particleGeo.attributes.position.needsUpdate = true;
          } else {
            const collapseFactor = (t - 0.75) / 0.25;
            const currentScale = Math.max(0, 3.55 * (1 - collapseFactor));
            mainGroup.scale.set(currentScale, currentScale, currentScale);
            particleMat.opacity = Math.max(0, 1 - collapseFactor);
          }
        } else {
          const shrinkFactor = Math.max(1, 10 - 9 * (progress / 100));
          mainGroup.scale.set(shrinkFactor, shrinkFactor, shrinkFactor);
        }
        sphereMesh.position.y = Math.sin(elapsedTime * 3) * 0.1;
      }

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      resizeObserver?.disconnect();
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
      initial={!isLoader ? { y: 40, opacity: 0 } : false}
      animate={isLoader ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full ${
        isLoader ? "h-[320px] sm:h-[400px]" : "h-[340px] sm:h-[420px] lg:h-[480px]"
      } flex items-center justify-center select-none overflow-hidden touch-none`}
    >
      {/* 2D Crisp Logo Image Placeholder */}
      {(!is3DBallReady || hasContextError) && (
        <img
          src={logo}
          alt="Yodha Sphere Logo Placeholder"
          className="absolute w-44 h-44 sm:w-60 sm:h-60 object-contain p-2 rounded-full bg-black/50 z-10"
        />
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing max-w-full max-h-full touch-none ${is3DBallReady ? "opacity-100" : "opacity-0"}`}
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

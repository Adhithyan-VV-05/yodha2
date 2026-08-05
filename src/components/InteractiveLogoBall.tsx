import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import logo from "../assets/logo.png";

interface InteractiveLogoBallProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function InteractiveLogoBall({ size = "sm", className = "" }: InteractiveLogoBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DBallReady, setIs3DBallReady] = useState(false);
  const [hasContextError, setHasContextError] = useState(false);

  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  }[size];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = Math.max(1, container.clientWidth || 36);
    let height = Math.max(1, container.clientHeight || 36);
    const aspect = (width > 0 && height > 0) ? width / height : 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = 3.6;

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
      // High Pixel Ratio up to 3 for ultra-crisp display on mobile & PC
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } catch {
    setHasContextError(true);
    return;
  }

  const sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  // 128x128 ultra-smooth sphere geometry
  const sphereGeo = new THREE.SphereGeometry(1.0, 128, 128);

  // ULTRA HIGH DEFINITION 4K TEXTURE CANVAS (4096 x 2048)
  const canvasTex = document.createElement("canvas");
  canvasTex.width = 4096;
  canvasTex.height = 2048;
  const ctx = canvasTex.getContext("2d");

  const sphereTexture = new THREE.CanvasTexture(canvasTex);
  sphereTexture.wrapS = THREE.RepeatWrapping;
  sphereTexture.wrapT = THREE.ClampToEdgeWrapping;
  sphereTexture.colorSpace = THREE.SRGBColorSpace;

  // MAX ANISOTROPIC FILTERING (Prevents blur when sphere rotates)
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  sphereTexture.anisotropy = Math.max(1, maxAnisotropy);
  sphereTexture.generateMipmaps = true;
  sphereTexture.minFilter = THREE.LinearMipmapLinearFilter;
  sphereTexture.magFilter = THREE.LinearFilter;

  const sphereMat = new THREE.MeshStandardMaterial({
    map: sphereTexture,
    emissiveMap: sphereTexture,
    emissive: 0xffffff,
    emissiveIntensity: 0.88,
    roughness: 0.08,
    metalness: 0.92,
    color: 0x000000,
  });

  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereGroup.add(sphereMesh);

  // Load High-Res Logo Image & Render Crisp 4K Texture
  const img = new Image();
  img.src = logo;

  const renderCrispTexture = () => {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 4096, 2048);

    // Draw sharp logos on opposite equator poles of the sphere in 4K resolution
    const logoSize = 1560;
    const topY = (2048 - logoSize) / 2;

    ctx.drawImage(img, 1024 - logoSize / 2, topY, logoSize, logoSize);
    ctx.drawImage(img, 3072 - logoSize / 2, topY, logoSize, logoSize);

    sphereTexture.needsUpdate = true;
    setIs3DBallReady(true);
  };

  if (img.complete && img.naturalWidth > 0) {
    renderCrispTexture();
  } else {
    img.onload = () => renderCrispTexture();
  }

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.8);
  dirLight1.position.set(4, 4, 4);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xc084fc, 2.8);
  dirLight2.position.set(-4, -4, -4);
  scene.add(dirLight2);

  let targetRotationX = 0;
  let targetRotationY = 0;
  let isInteracting = false;
  let disturbanceTimer: ReturnType<typeof setTimeout> | null = null;

  const handlePointerMove = (clientX: number, clientY: number) => {
    const rect = container.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const mouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const mouseY = ((clientY - rect.top) / rect.height - 0.5) * 2;

    targetRotationY = mouseX * 1.5;
    targetRotationX = mouseY * 1.5;
    isInteracting = true;

    if (disturbanceTimer) clearTimeout(disturbanceTimer);
    disturbanceTimer = setTimeout(() => {
      isInteracting = false;
    }, 1000);
  };

  const handlePointerEnd = () => {
    isInteracting = false;
    if (disturbanceTimer) clearTimeout(disturbanceTimer);
  };

  const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("touchmove", onTouchMove, { passive: true });
  container.addEventListener("mouseleave", handlePointerEnd);
  container.addEventListener("touchend", handlePointerEnd);
  container.addEventListener("touchcancel", handlePointerEnd);

  let animId: number;

  const animate = () => {
    animId = requestAnimationFrame(animate);

    // Default horizontal spin
    const spinSpeed = isHovered ? 1.4 : 0.6;
    sphereMesh.rotation.y += spinSpeed * 0.015;

    // Smooth return to normal upright default state if undisturbed or mouse/touch released
    if (!isInteracting && !isHovered) {
      targetRotationX += (0 - targetRotationX) * 0.04;
      targetRotationY += (0 - targetRotationY) * 0.04;
    }

    sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.06;
    sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.06;

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animId);
    if (disturbanceTimer) clearTimeout(disturbanceTimer);
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("touchmove", onTouchMove);
    container.removeEventListener("mouseleave", handlePointerEnd);
    container.removeEventListener("touchend", handlePointerEnd);
    container.removeEventListener("touchcancel", handlePointerEnd);
    renderer.dispose();
    sphereGeo.dispose();
    sphereMat.dispose();
  };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none rounded-full overflow-hidden ${sizeClasses} ${className}`}
    >
      {/* 2D Crisp Logo Image Placeholder until 3D ball renders */}
      {(!is3DBallReady || hasContextError) && (
        <img
          src={logo}
          alt="Yodha Logo Placeholder"
          className="absolute inset-0 w-full h-full object-contain p-1 rounded-full bg-black/60 z-10"
        />
      )}
      <canvas ref={canvasRef} className={`w-full h-full max-w-full max-h-full touch-none ${is3DBallReady ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

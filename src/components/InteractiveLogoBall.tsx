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
    const isMobile = width < 640 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const aspect = (width > 0 && height > 0) ? width / height : 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = 3.6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    } catch {
      setHasContextError(true);
      return;
    }

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const sphereGeo = new THREE.SphereGeometry(1.0, isMobile ? 24 : 32, isMobile ? 24 : 32);

    // PROGRESSIVE TEXTURE QUALITY UPGRADE CANVAS (256 -> 512 -> 1024)
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 256;
    canvasTex.height = 128;
    const ctx = canvasTex.getContext("2d");

    const sphereTexture = new THREE.CanvasTexture(canvasTex);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

    const sphereMat = new THREE.MeshStandardMaterial({
      map: sphereTexture,
      emissiveMap: sphereTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.75,
      roughness: 0.15,
      metalness: 0.85,
      color: 0x000000,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(sphereMesh);

    // Progressive Quality Upgrade Function
    const img = new Image();
    img.src = logo;

    const updateTextureQuality = (targetW: number, targetH: number) => {
      if (!ctx) return;
      canvasTex.width = targetW;
      canvasTex.height = targetH;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, targetW, targetH);

      const logoSize = Math.floor(targetH * 0.78);
      const topY = (targetH - logoSize) / 2;
      const halfW = targetW / 2;

      ctx.drawImage(img, halfW / 2 - logoSize / 2, topY, logoSize, logoSize);
      ctx.drawImage(img, halfW + halfW / 2 - logoSize / 2, topY, logoSize, logoSize);

      sphereTexture.needsUpdate = true;
      setIs3DBallReady(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      updateTextureQuality(256, 128);
      setTimeout(() => updateTextureQuality(isMobile ? 512 : 1024, isMobile ? 256 : 512), 150);
    } else {
      img.onload = () => {
        updateTextureQuality(256, 128);
        setTimeout(() => updateTextureQuality(isMobile ? 512 : 1024, isMobile ? 256 : 512), 150);
      };
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.0);
    dirLight1.position.set(4, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc084fc, 2.0);
    dirLight2.position.set(-4, -4, -4);
    scene.add(dirLight2);

    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const mouseX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const mouseY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      targetRotationY = mouseX * 1.5;
      targetRotationX = mouseY * 1.5;
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const spinSpeed = isHovered ? 1.4 : 0.6;
      sphereMesh.rotation.y += spinSpeed * 0.015;

      sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.1;
      sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
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
      {/* 2D Logo Image Placeholder displayed until 3D ball texture compiles */}
      {(!is3DBallReady || hasContextError) && (
        <img
          src={logo}
          alt="Yodha Logo Placeholder"
          className="absolute inset-0 w-full h-full object-contain p-1 rounded-full animate-pulse bg-black/60 z-10"
        />
      )}
      <canvas ref={canvasRef} className={`w-full h-full max-w-full max-h-full touch-none ${is3DBallReady ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

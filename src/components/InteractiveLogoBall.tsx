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

  // Size mapping
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  }[size];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 36;
    const height = containerRef.current.clientHeight || 36;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32);

    // Canvas texture for dual logos
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 1024;
    canvasTex.height = 512;
    const ctx = canvasTex.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 1024, 512);

      const img = new Image();
      img.src = logo;
      img.onload = () => {
        const logoSize = 400;
        const topY = (512 - logoSize) / 2;

        // Front Logo (u = 0.25)
        ctx.drawImage(img, 256 - logoSize / 2, topY, logoSize, logoSize);
        // Back Logo (u = 0.75)
        ctx.drawImage(img, 768 - logoSize / 2, topY, logoSize, logoSize);

        sphereTexture.needsUpdate = true;
      };
    }

    const sphereTexture = new THREE.CanvasTexture(canvasTex);
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

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
    sphereGroup.add(sphereMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.0);
    dirLight1.position.set(4, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc084fc, 2.0);
    dirLight2.position.set(-4, -4, -4);
    scene.add(dirLight2);

    // Mouse & Touch Interactive Momentum Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
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

    const containerEl = containerRef.current;
    containerEl.addEventListener("mousemove", onMouseMove);
    containerEl.addEventListener("touchmove", onTouchMove, { passive: true });

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous 360 degree spin, accelerating on hover
      const spinSpeed = isHovered ? 1.4 : 0.6;
      sphereMesh.rotation.y += spinSpeed * 0.015;

      // Smooth hover rotation tracking
      sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.1;
      sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      containerEl.removeEventListener("mousemove", onMouseMove);
      containerEl.removeEventListener("touchmove", onTouchMove);
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
      className={`relative inline-flex items-center justify-center cursor-pointer select-none rounded-full overflow-hidden filter drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] ${sizeClasses} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full max-w-full max-h-full touch-none" />
    </div>
  );
}

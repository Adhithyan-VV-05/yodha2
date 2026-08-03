import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeDTrophyProps {
  rank: 1 | 2 | 3;
  spawnDelay?: number;
  isInView?: boolean;
}

export function ThreeDTrophy({ rank, spawnDelay = 0, isInView = true }: ThreeDTrophyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasContextError, setHasContextError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = Math.max(1, container.clientWidth || 240);
    let height = Math.max(1, container.clientHeight || 220);
    const isMobile = width < 640 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const aspect = (width > 0 && height > 0) ? width / height : 1;

    const scene = new THREE.Scene();

    const cameraZ = rank === 1 ? (isMobile ? 6.0 : 5.2) : (isMobile ? 6.5 : 5.8);
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.z = cameraZ;

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

    const trophyGroup = new THREE.Group();
    trophyGroup.position.y = -0.25;
    trophyGroup.scale.set(0, 0, 0);

    let mainColor = 0xffd700;
    let emissiveColor = 0xb58900;
    let particleColor = 0xffe066;
    let badgeBgColor = "#92400e";

    if (rank === 2) {
      mainColor = 0xf8fafc;
      emissiveColor = 0x64748b;
      particleColor = 0x38bdf8;
      badgeBgColor = "#334155";
    } else if (rank === 3) {
      mainColor = 0xd97706;
      emissiveColor = 0x78350f;
      particleColor = 0xfbbf24;
      badgeBgColor = "#78350f";
    }

    const trophyMaterial = new THREE.MeshStandardMaterial({
      color: mainColor,
      metalness: rank === 1 ? 0.98 : rank === 2 ? 0.96 : 0.92,
      roughness: rank === 1 ? 0.06 : rank === 2 ? 0.08 : 0.14,
      emissive: emissiveColor,
      emissiveIntensity: 0.2,
    });

    const obsidianBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x070a12,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Pedestal Base
    const baseBottomGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.2, 8);
    const baseBottomMesh = new THREE.Mesh(baseBottomGeo, obsidianBaseMaterial);
    baseBottomMesh.position.y = -1.25;
    trophyGroup.add(baseBottomMesh);

    const baseTrimGeo = new THREE.CylinderGeometry(0.78, 0.82, 0.08, 16);
    const baseTrimMesh = new THREE.Mesh(baseTrimGeo, trophyMaterial);
    baseTrimMesh.position.y = -1.11;
    trophyGroup.add(baseTrimMesh);

    const baseTopGeo = new THREE.CylinderGeometry(0.72, 0.76, 0.2, 8);
    const baseTopMesh = new THREE.Mesh(baseTopGeo, obsidianBaseMaterial);
    baseTopMesh.position.y = -0.97;
    trophyGroup.add(baseTopMesh);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.26, 0.6, 16);
    const stemMesh = new THREE.Mesh(stemGeo, trophyMaterial);
    stemMesh.position.y = -0.57;
    trophyGroup.add(stemMesh);

    const stemRingGeo = new THREE.TorusGeometry(0.22, 0.03, 8, 16);
    const stemRingMesh = new THREE.Mesh(stemRingGeo, trophyMaterial);
    stemRingMesh.position.y = -0.45;
    stemRingMesh.rotation.x = Math.PI / 2;
    trophyGroup.add(stemRingMesh);

    // Cup Bowl & Body
    const cupBowlGeo = new THREE.SphereGeometry(0.42, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const cupBowlMesh = new THREE.Mesh(cupBowlGeo, trophyMaterial);
    cupBowlMesh.position.y = -0.25;
    cupBowlMesh.rotation.x = Math.PI;
    trophyGroup.add(cupBowlMesh);

    const cupBodyGeo = new THREE.CylinderGeometry(0.52, 0.42, 1.15, 16, 1, true);
    const cupBodyMesh = new THREE.Mesh(cupBodyGeo, trophyMaterial);
    cupBodyMesh.position.y = 0.32;
    trophyGroup.add(cupBodyMesh);

    const rimGeo = new THREE.TorusGeometry(0.52, 0.03, 8, 32);
    const rimMesh = new THREE.Mesh(rimGeo, trophyMaterial);
    rimMesh.position.y = 0.895;
    rimMesh.rotation.x = Math.PI / 2;
    trophyGroup.add(rimMesh);

    // Side Handles
    const handleGeo = new THREE.TorusGeometry(0.40, 0.035, 8, 16, Math.PI * 1.05);

    const leftHandle = new THREE.Mesh(handleGeo, trophyMaterial);
    leftHandle.position.set(-0.47, 0.32, 0);
    leftHandle.rotation.z = Math.PI / 1.58;
    trophyGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, trophyMaterial);
    rightHandle.position.set(0.47, 0.32, 0);
    rightHandle.rotation.z = -Math.PI / 1.58;
    trophyGroup.add(rightHandle);

    // Crown Star
    const starGeo = new THREE.OctahedronGeometry(0.32, 0);
    const starMesh = new THREE.Mesh(starGeo, trophyMaterial);
    starMesh.position.y = 1.25;
    trophyGroup.add(starMesh);

    // Number Badge
    const badgeCanvas = document.createElement("canvas");
    badgeCanvas.width = 128;
    badgeCanvas.height = 128;
    const ctx = badgeCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = badgeBgColor;
      ctx.beginPath();
      ctx.arc(64, 64, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 7;
      ctx.strokeStyle = rank === 1 ? "#ffe066" : rank === 2 ? "#ffffff" : "#fde68a";
      ctx.stroke();

      ctx.font = "900 70px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(rank), 64, 67);
    }

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
    const badgeGeo = new THREE.PlaneGeometry(0.44, 0.44);
    const badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTexture,
      transparent: true,
      roughness: 0.1,
      metalness: 0.5,
    });

    const floatingBadge = new THREE.Mesh(badgeGeo, badgeMat);
    floatingBadge.position.set(0, 1.72, 0);
    trophyGroup.add(floatingBadge);

    // Ambient Sparkles
    const sparkleCount = isMobile ? 15 : 30;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      const radius = 0.9 + Math.random() * 0.65;
      const angle = Math.random() * Math.PI * 2;
      sparklePos[i * 3] = Math.cos(angle) * radius;
      sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      sparklePos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePos, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.065,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    trophyGroup.add(sparkles);

    scene.add(trophyGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainLight.position.set(4, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(mainColor, 2.4);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = Math.max(1, containerRef.current.clientWidth || 240);
      const h = Math.max(1, containerRef.current.clientHeight || 220);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    let clock = new THREE.Clock();
    let currentScale = 0;
    let hasSpawnStarted = false;
    let spawnStartTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isInView && !hasSpawnStarted) {
        if (spawnStartTime === 0) spawnStartTime = elapsed;
        if (elapsed - spawnStartTime >= spawnDelay) {
          hasSpawnStarted = true;
        }
      }

      if (hasSpawnStarted && currentScale < 1) {
        currentScale += (1 - currentScale) * 0.06;
        if (currentScale > 0.999) currentScale = 1;
        trophyGroup.scale.set(currentScale, currentScale, currentScale);
      }

      trophyGroup.rotation.y = elapsed * 0.85;
      trophyGroup.position.y = -0.25 + Math.sin(elapsed * 2) * 0.06;

      floatingBadge.position.y = 1.72 + Math.sin(elapsed * 3) * 0.04;
      floatingBadge.rotation.y = -trophyGroup.rotation.y;

      starMesh.rotation.y = elapsed * 1.6;
      sparkles.rotation.y = -elapsed * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      trophyMaterial.dispose();
      obsidianBaseMaterial.dispose();
      badgeMat.dispose();
      sparkleMat.dispose();
    };
  }, [rank, spawnDelay, isInView]);

  if (hasContextError) {
    return (
      <div className="w-full h-48 sm:h-56 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
          <span className="font-black text-amber-300 text-lg">#{rank}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-48 sm:h-56 flex items-center justify-center relative select-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full max-w-full max-h-full" />
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDTrophyProps {
  rank: 1 | 2 | 3;
  spawnDelay?: number;
  isInView?: boolean;
}

export function ThreeDTrophy({ rank, spawnDelay = 0, isInView = true }: ThreeDTrophyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 240;
    const height = containerRef.current.clientHeight || 220;

    const scene = new THREE.Scene();

    // Adjusted Camera distance so whole trophy + floating number sits 100% inside container bounds
    const cameraZ = rank === 1 ? 5.2 : 5.8;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const trophyGroup = new THREE.Group();
    trophyGroup.position.y = -0.25; // Shift down slightly so floating number top fits with margin
    trophyGroup.scale.set(0, 0, 0); // Start at scale 0 for entrance

    // Colors
    let mainColor = 0xffd700; // 24K Gold
    let emissiveColor = 0xb58900;
    let particleColor = 0xffe066;
    let badgeBgColor = "#92400e";

    if (rank === 2) {
      // Sterling Silver
      mainColor = 0xf8fafc;
      emissiveColor = 0x64748b;
      particleColor = 0x38bdf8;
      badgeBgColor = "#334155";
    } else if (rank === 3) {
      // Antique Bronze
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

    // 1. Pedestal Base
    const baseBottomGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.2, 8);
    const baseBottomMesh = new THREE.Mesh(baseBottomGeo, obsidianBaseMaterial);
    baseBottomMesh.position.y = -1.25;
    trophyGroup.add(baseBottomMesh);

    const baseTrimGeo = new THREE.CylinderGeometry(0.78, 0.82, 0.08, 32);
    const baseTrimMesh = new THREE.Mesh(baseTrimGeo, trophyMaterial);
    baseTrimMesh.position.y = -1.11;
    trophyGroup.add(baseTrimMesh);

    const baseTopGeo = new THREE.CylinderGeometry(0.72, 0.76, 0.2, 8);
    const baseTopMesh = new THREE.Mesh(baseTopGeo, obsidianBaseMaterial);
    baseTopMesh.position.y = -0.97;
    trophyGroup.add(baseTopMesh);

    // 2. Stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.26, 0.6, 32);
    const stemMesh = new THREE.Mesh(stemGeo, trophyMaterial);
    stemMesh.position.y = -0.57;
    trophyGroup.add(stemMesh);

    const stemRingGeo = new THREE.TorusGeometry(0.22, 0.03, 16, 32);
    const stemRingMesh = new THREE.Mesh(stemRingGeo, trophyMaterial);
    stemRingMesh.position.y = -0.45;
    stemRingMesh.rotation.x = Math.PI / 2;
    trophyGroup.add(stemRingMesh);

    // 3. Cup Bowl & Body
    const cupBowlGeo = new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const cupBowlMesh = new THREE.Mesh(cupBowlGeo, trophyMaterial);
    cupBowlMesh.position.y = -0.25;
    cupBowlMesh.rotation.x = Math.PI;
    trophyGroup.add(cupBowlMesh);

    const cupBodyGeo = new THREE.CylinderGeometry(0.52, 0.42, 1.15, 32, 1, true);
    const cupBodyMesh = new THREE.Mesh(cupBodyGeo, trophyMaterial);
    cupBodyMesh.position.y = 0.32;
    trophyGroup.add(cupBodyMesh);

    // Cup Rim Ring
    const rimGeo = new THREE.TorusGeometry(0.52, 0.03, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, trophyMaterial);
    rimMesh.position.y = 0.895;
    rimMesh.rotation.x = Math.PI / 2;
    trophyGroup.add(rimMesh);

    // 4. Dual Curved Side Handles (100% Attached to Side Wall)
    const handleGeo = new THREE.TorusGeometry(0.40, 0.035, 16, 32, Math.PI * 1.05);

    const leftHandle = new THREE.Mesh(handleGeo, trophyMaterial);
    leftHandle.position.set(-0.47, 0.32, 0);
    leftHandle.rotation.z = Math.PI / 1.58;
    trophyGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, trophyMaterial);
    rightHandle.position.set(0.47, 0.32, 0);
    rightHandle.rotation.z = -Math.PI / 1.58;
    trophyGroup.add(rightHandle);

    // 5. Crown Star on Top
    const starGeo = new THREE.OctahedronGeometry(0.32, 0);
    const starMesh = new THREE.Mesh(starGeo, trophyMaterial);
    starMesh.position.y = 1.25;
    trophyGroup.add(starMesh);

    // 6. Number Badge ("1", "2", "3") FLOATING ABOVE TOP OF TROPHY (Sized to fit perfectly inside frame)
    const badgeCanvas = document.createElement("canvas");
    badgeCanvas.width = 256;
    badgeCanvas.height = 256;
    const ctx = badgeCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = badgeBgColor;
      ctx.beginPath();
      ctx.arc(128, 128, 110, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 14;
      ctx.strokeStyle = rank === 1 ? "#ffe066" : rank === 2 ? "#ffffff" : "#fde68a";
      ctx.stroke();

      ctx.font = "900 140px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(rank), 128, 134);
    }

    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
    const badgeGeo = new THREE.PlaneGeometry(0.44, 0.44);
    const badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTexture,
      transparent: true,
      roughness: 0.1,
      metalness: 0.5,
    });

    // Floating Badge Mesh ABOVE Top Star (y = 1.72)
    const floatingBadge = new THREE.Mesh(badgeGeo, badgeMat);
    floatingBadge.position.set(0, 1.72, 0);
    trophyGroup.add(floatingBadge);

    // 7. Ambient Sparkles
    const sparkleCount = 40;
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

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainLight.position.set(4, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(mainColor, 2.4);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    // Animation Loop with Scroll Triggered Spawn Delay
    let animId: number;
    let clock = new THREE.Clock();
    let currentScale = 0;
    let hasSpawnStarted = false;
    let spawnStartTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Scroll entrance trigger
      if (isInView && !hasSpawnStarted) {
        if (spawnStartTime === 0) spawnStartTime = elapsed;
        if (elapsed - spawnStartTime >= spawnDelay) {
          hasSpawnStarted = true;
        }
      }

      // Smooth spawn entrance scaling (0 -> 1)
      if (hasSpawnStarted && currentScale < 1) {
        currentScale += (1 - currentScale) * 0.06;
        if (currentScale > 0.999) currentScale = 1;
        trophyGroup.scale.set(currentScale, currentScale, currentScale);
      }

      trophyGroup.rotation.y = elapsed * 0.85;
      trophyGroup.position.y = -0.25 + Math.sin(elapsed * 2) * 0.06;

      // Floating badge subtle hover movement & billboard camera alignment
      floatingBadge.position.y = 1.72 + Math.sin(elapsed * 3) * 0.04;
      floatingBadge.rotation.y = -trophyGroup.rotation.y;

      starMesh.rotation.y = elapsed * 1.6;
      sparkles.rotation.y = -elapsed * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      trophyMaterial.dispose();
      obsidianBaseMaterial.dispose();
      badgeMat.dispose();
      sparkleMat.dispose();
    };
  }, [rank, spawnDelay, isInView]);

  return (
    <div ref={containerRef} className="w-full h-48 sm:h-56 flex items-center justify-center relative select-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full max-w-full max-h-full" />
    </div>
  );
}

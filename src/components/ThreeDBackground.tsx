import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 640 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // Fast, crisp rendering with low GPU overhead
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));

    // MINIMALISTIC FAST STARDUST NEBULA FIELD
    const starCount = isMobile ? 250 : 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cyan = new THREE.Color(0x38bdf8);
    const indigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 800;

      const col = Math.random() < 0.5 ? cyan : indigo;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // MINIMALISTIC AMBIENT ASTEROID FIELD (2 ROCKS FOR ULTRA-FAST LOADING)
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);

    interface Asteroid {
      mesh: THREE.Mesh;
      rotSpeed: number;
    }

    const asteroids: Asteroid[] = [];
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.3,
      flatShading: true,
    });

    const astCount = isMobile ? 1 : 2;
    for (let i = 0; i < astCount; i++) {
      const radius = 18 + i * 8;
      const geo = new THREE.IcosahedronGeometry(radius, 1);
      const astMesh = new THREE.Mesh(geo, asteroidMat);
      
      astMesh.position.set(
        (i === 0 ? -380 : 380),
        (i === 0 ? 180 : -180),
        -100
      );

      asteroidGroup.add(astMesh);
      asteroids.push({ mesh: astMesh, rotSpeed: 0.005 * (i % 2 === 0 ? 1 : -1) });
    }

    // Light
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(300, 300, 400);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow minimalistic starfield rotation
      starPoints.rotation.y = elapsed * 0.008;

      asteroids.forEach((ast) => {
        ast.mesh.rotation.y += ast.rotSpeed;
        ast.mesh.rotation.x += ast.rotSpeed * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      asteroidMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}

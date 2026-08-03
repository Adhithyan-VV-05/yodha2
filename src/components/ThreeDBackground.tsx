import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 640 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1200);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for GPU speed
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));

    // 1. Ambient Stardust Particle Field (Adaptive Count)
    const starCount = isMobile ? 350 : 1000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cyan = new THREE.Color(0x38bdf8);
    const indigo = new THREE.Color(0x818cf8);
    const violet = new THREE.Color(0xc084fc);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1600;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

      const rand = Math.random();
      const col = rand < 0.4 ? cyan : rand < 0.7 ? indigo : violet;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 2. Wave Landscape (Adaptive Count)
    const waveCount = isMobile ? 350 : 1200;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveCount * 3);
    const waveCols = new Float32Array(waveCount * 3);
    const waveBaseX = new Float32Array(waveCount);
    const waveBaseZ = new Float32Array(waveCount);

    for (let i = 0; i < waveCount; i++) {
      const radius = Math.random() * 800 + 50;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 200;

      waveBaseX[i] = x;
      waveBaseZ[i] = z;

      wavePos[i * 3] = x;
      wavePos[i * 3 + 1] = -280;
      wavePos[i * 3 + 2] = z;

      const c = cyan.clone().lerp(violet, radius / 850);
      waveCols[i * 3] = c.r;
      waveCols[i * 3 + 1] = c.g;
      waveCols[i * 3 + 2] = c.b;
    }

    waveGeo.setAttribute("position", new THREE.BufferAttribute(wavePos, 3));
    waveGeo.setAttribute("color", new THREE.BufferAttribute(waveCols, 3));

    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 2.0 : 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    scene.add(wavePoints);

    // 3. Asteroids (Adaptive Count)
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);

    interface Asteroid {
      mesh: THREE.Mesh;
      baseRotX: number;
      baseRotY: number;
      baseRotZ: number;
      currentRotX: number;
      currentRotY: number;
      currentRotZ: number;
      vx: number;
      vy: number;
      vz: number;
      origVx: number;
      origVy: number;
      origVz: number;
      radius: number;
      orbitAngle: number;
      orbitSpeed: number;
    }

    const asteroids: Asteroid[] = [];
    const asteroidCount = isMobile ? 2 : 6;

    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.85,
      metalness: 0.25,
      flatShading: true,
    });

    for (let i = 0; i < asteroidCount; i++) {
      const radius = 16 + Math.random() * 22;
      const geo = new THREE.IcosahedronGeometry(radius, isMobile ? 1 : 2);
      const astMesh = new THREE.Mesh(geo, asteroidMat);
      
      astMesh.position.set(
        (Math.random() - 0.5) * 1100,
        (Math.random() - 0.5) * 750,
        (Math.random() - 0.5) * 500 - 50
      );

      asteroidGroup.add(astMesh);

      const vx = (Math.random() - 0.5) * 0.6;
      const vy = (Math.random() - 0.5) * 0.35;
      const vz = (Math.random() - 0.5) * 0.35;

      asteroids.push({
        mesh: astMesh,
        baseRotX: (Math.random() - 0.5) * 0.01,
        baseRotY: (Math.random() - 0.5) * 0.012,
        baseRotZ: (Math.random() - 0.5) * 0.01,
        currentRotX: (Math.random() - 0.5) * 0.01,
        currentRotY: (Math.random() - 0.5) * 0.012,
        currentRotZ: (Math.random() - 0.5) * 0.01,
        vx,
        vy,
        vz,
        origVx: vx,
        origVy: vy,
        origVz: vz,
        radius,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.001 + Math.random() * 0.002,
      });
    }

    // Lights
    const astLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    astLight.position.set(450, 350, 500);
    scene.add(astLight);

    const astFillLight = new THREE.DirectionalLight(0xc084fc, 1.4);
    astFillLight.position.set(-400, -300, -300);
    scene.add(astFillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    let mouseWorldX = 0;
    let mouseWorldY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.03;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.03;

      mouseWorldX = (e.clientX / window.innerWidth - 0.5) * 1000;
      mouseWorldY = -(e.clientY / window.innerHeight - 0.5) * 700;
    };
    window.addEventListener("mousemove", handleMouseMove);

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

      starPoints.rotation.y = elapsed * 0.01;
      wavePoints.rotation.y = -elapsed * 0.02;

      // Smooth wave motion
      const wavePosArr = waveGeo.attributes.position;
      for (let i = 0; i < waveCount; i++) {
        const x = waveBaseX[i];
        const z = waveBaseZ[i];
        const dist = Math.sqrt(x * x + z * z);
        const wave = Math.sin(dist * 0.008 + elapsed * 1.5) * 16 + Math.cos(x * 0.005 + elapsed * 1.2) * 8;
        wavePosArr.setY(i, -280 + wave);
      }
      wavePosArr.needsUpdate = true;

      asteroids.forEach((ast) => {
        ast.orbitAngle += ast.orbitSpeed;
        const orbitOffset = Math.sin(ast.orbitAngle + elapsed) * 0.3;

        const dx = ast.mesh.position.x - mouseWorldX;
        const dy = ast.mesh.position.y - mouseWorldY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 260) {
          const force = (1 - distToMouse / 260) * 2.8;
          const angle = Math.atan2(dy, dx);

          ast.vx += Math.cos(angle) * force * 0.25;
          ast.vy += Math.sin(angle) * force * 0.25;

          ast.currentRotX = ast.baseRotX * (1 + force * 3);
          ast.currentRotY = ast.baseRotY * (1 + force * 3);
        } else {
          ast.vx += (ast.origVx - ast.vx) * 0.02;
          ast.vy += (ast.origVy - ast.vy) * 0.02;
          ast.currentRotX += (ast.baseRotX - ast.currentRotX) * 0.03;
          ast.currentRotY += (ast.baseRotY - ast.currentRotY) * 0.03;
        }

        ast.mesh.rotation.x += ast.currentRotX;
        ast.mesh.rotation.y += ast.currentRotY + orbitOffset * 0.002;
        ast.mesh.rotation.z += ast.currentRotZ;

        ast.mesh.position.x += ast.vx;
        ast.mesh.position.y += ast.vy + orbitOffset * 0.15;
        ast.mesh.position.z += ast.vz;

        if (ast.mesh.position.x > 650) ast.mesh.position.x = -650;
        if (ast.mesh.position.x < -650) ast.mesh.position.x = 650;
        if (ast.mesh.position.y > 450) ast.mesh.position.y = -450;
        if (ast.mesh.position.y < -450) ast.mesh.position.y = 450;
      });

      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      asteroidMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}

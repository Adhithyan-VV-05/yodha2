import { useEffect, useRef } from "react";
import * as THREE from "three";
import logo from "../assets/logo.png";

interface Intro3DCanvasProps {
  progress: number;
  isEnding: boolean;
  /** Optional: fires once, after the final vanish animation finishes. */
  onSequenceComplete?: () => void;
}

interface SegmentDef {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LetterSegment {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  isHit: boolean;
  settled: boolean;
}

interface SmallBaseBall {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  isHit: boolean;
  settled: boolean;
}

interface SmallAsteroid {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
}

// -----------------------------------------------------------------------
// Real 3D Extruded 7-Segment Digital Signage Font
// -----------------------------------------------------------------------
const THICK = 0.16;
const SEG = {
  top: { x: 0, y: 0.8, w: 0.84, h: THICK },
  bottom: { x: 0, y: -0.8, w: 0.84, h: THICK },
  middle: { x: 0, y: 0, w: 0.78, h: THICK },
  topLeft: { x: -0.42, y: 0.42, w: THICK, h: 0.72 },
  topRight: { x: 0.42, y: 0.42, w: THICK, h: 0.72 },
  bottomLeft: { x: -0.42, y: -0.42, w: THICK, h: 0.72 },
  bottomRight: { x: 0.42, y: -0.42, w: THICK, h: 0.72 },
  leftFull: { x: -0.42, y: 0, w: THICK, h: 1.6 },
  dot: { x: 0, y: -0.72, w: 0.22, h: 0.22 },
} satisfies Record<string, SegmentDef>;

const CHAR_SEGMENTS: Record<string, SegmentDef[]> = {
  Y: [SEG.topLeft, SEG.topRight, SEG.middle, SEG.bottom],
  O: [SEG.top, SEG.topLeft, SEG.topRight, SEG.bottomLeft, SEG.bottomRight, SEG.bottom],
  D: [SEG.leftFull, SEG.top, SEG.bottom, SEG.topRight, SEG.bottomRight],
  H: [SEG.topLeft, SEG.topRight, SEG.bottomLeft, SEG.bottomRight, SEG.middle],
  A: [SEG.top, SEG.topLeft, SEG.topRight, SEG.middle, SEG.bottomLeft, SEG.bottomRight],
  "2": [SEG.top, SEG.topRight, SEG.middle, SEG.bottomLeft, SEG.bottom],
  ".": [SEG.dot],
  "0": [SEG.top, SEG.topLeft, SEG.topRight, SEG.bottomLeft, SEG.bottomRight, SEG.bottom],
};

// Fullscreen post pass shader material for jittery screen effect & sudden vanish
const POST_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const POST_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uGlitch;
  uniform float uFade;
  uniform vec2 uResolution;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    // Intense screen jitter tearing lines
    float band = floor(uv.y * 80.0);
    float bandNoise = rand(vec2(band, floor(uTime * 30.0)));
    float tear = step(0.85, bandNoise) * (bandNoise - 0.5) * 0.25 * uGlitch;
    uv.x += tear;

    float caAmount = 0.015 * uGlitch;
    float r = texture2D(tDiffuse, uv + vec2(caAmount, 0.0)).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv - vec2(caAmount, 0.0)).b;
    float a = texture2D(tDiffuse, uv).a;
    vec3 color = vec3(r, g, b);

    // Dynamic scanline noise
    float scan = sin(uv.y * uResolution.y * 1.5 + uTime * 20.0) * 0.08 * uGlitch;
    color -= scan;

    vec2 blockUv = floor(uv * vec2(30.0, 18.0));
    float blockNoise = rand(blockUv + floor(uTime * 15.0));
    float blockGlitch = step(0.96, blockNoise) * uGlitch;
    color = mix(color, vec3(rand(blockUv), rand(blockUv + 1.0), 1.0), blockGlitch * 0.9);

    color = mix(color, color * vec3(0.75, 0.95, 1.3), uGlitch * 0.5);

    gl_FragColor = vec4(color * uFade, a * uFade);
  }
`;

export function Intro3DCanvas({ progress, isEnding, onSequenceComplete }: Intro3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const progressRef = useRef(progress);
  const isEndingRef = useRef(isEnding);
  progressRef.current = progress;
  isEndingRef.current = isEnding;

  useEffect(() => {
    const container = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!container || !canvasEl) return;

    let width = container.clientWidth || 1;
    let height = container.clientHeight || 1;
    const isMobile = width < 640;

    const disposables: Array<{ dispose: () => void }> = [];
    const own = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    let isLogoLoaded = false;

    // ---------------------------------------------------------------------
    // Scene / Camera / Renderer (Dark Night Sky at Space: Pitch #020308)
    // ---------------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.005);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);

    const baseCamDist = isMobile ? 13.5 : 9.5;
    const heroCamDist = isMobile ? 10.8 : 7.6;

    const basePosition = new THREE.Vector3(0, 0, baseCamDist);
    const heroPosition = new THREE.Vector3(0, 0, heroCamDist);
    const baseLookAt = new THREE.Vector3(0, 0, -5);
    const heroLookAt = new THREE.Vector3(0, 0, 6.2);
    camera.position.copy(basePosition);
    camera.lookAt(baseLookAt);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x020308, 1); // Dark pitch night sky at space
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // ---------------------------------------------------------------------
    // Space Backdrop: Night Sky Starfield + Soft Cosmic Aurora
    // ---------------------------------------------------------------------
    const STAR_COUNT = 2600;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = 40 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi) - 20;
    }
    const starGeo = own(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starSpriteCanvas = document.createElement("canvas");
    starSpriteCanvas.width = 32;
    starSpriteCanvas.height = 32;
    const spctx2 = starSpriteCanvas.getContext("2d");
    if (spctx2) {
      const g = spctx2.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.6, "rgba(56,189,248,0.8)");
      g.addColorStop(1, "rgba(56,189,248,0)");
      spctx2.fillStyle = g;
      spctx2.fillRect(0, 0, 32, 32);
    }
    const starTexture = own(new THREE.CanvasTexture(starSpriteCanvas));
    const starMat = own(
      new THREE.PointsMaterial({
        size: 0.95,
        map: starTexture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      })
    );
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    const nebulaCanvas = document.createElement("canvas");
    nebulaCanvas.width = 512;
    nebulaCanvas.height = 256;
    const nctx = nebulaCanvas.getContext("2d");
    if (nctx) {
      nctx.fillStyle = "#020308";
      nctx.fillRect(0, 0, 512, 256);
      const blobs: [number, number, number, string][] = [
        [140, 100, 150, "rgba(56,189,248,0.18)"],
        [370, 150, 170, "rgba(168,85,247,0.16)"],
        [260, 60, 120, "rgba(99,102,241,0.14)"],
      ];
      blobs.forEach(([x, y, r, color]) => {
        const g = nctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        nctx.fillStyle = g;
        nctx.fillRect(0, 0, 512, 256);
      });
    }
    const nebulaTexture = own(new THREE.CanvasTexture(nebulaCanvas));
    const nebulaGeo = own(new THREE.SphereGeometry(190, 24, 16));
    const nebulaMat = own(
      new THREE.MeshBasicMaterial({
        map: nebulaTexture,
        side: THREE.BackSide,
        fog: false,
        depthWrite: false,
      })
    );
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    scene.add(nebula);

    // ---------------------------------------------------------------------
    // SMALL ASTEROIDS SPAWNING OUTSIDE SCREEN & DRIFTING INTO VIEWPORT
    // (Size is SMALL: radius 0.12 to 0.32, much smaller than 1.35 ball)
    // ---------------------------------------------------------------------
    const smallAsteroids: SmallAsteroid[] = [];
    const ASTEROID_COUNT = 24;

    const asteroidMat = own(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.85,
        metalness: 0.3,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.15,
      })
    );

    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const rad = 0.12 + Math.random() * 0.2;
      const astGeo = own(new THREE.DodecahedronGeometry(rad, 1));

      const posAttr = astGeo.attributes.position;
      for (let j = 0; j < posAttr.count; j++) {
        const x = posAttr.getX(j);
        const y = posAttr.getY(j);
        const z = posAttr.getZ(j);
        const noise = 1 + (Math.random() - 0.5) * 0.3;
        posAttr.setXYZ(j, x * noise, y * noise, z * noise);
      }
      astGeo.computeVertexNormals();

      const astMesh = new THREE.Mesh(astGeo, asteroidMat);

      const side = Math.random() > 0.5 ? 1 : -1;
      const spawnX = side * (25 + Math.random() * 30);
      const spawnY = (Math.random() - 0.5) * 35;
      const spawnZ = -80 + Math.random() * 60;

      astMesh.position.set(spawnX, spawnY, spawnZ);
      scene.add(astMesh);

      const targetX = (Math.random() - 0.5) * 12;
      const targetY = (Math.random() - 0.5) * 12;
      const velX = (targetX - spawnX) * 0.008;
      const velY = (targetY - spawnY) * 0.008;
      const velZ = 0.04 + Math.random() * 0.06;

      smallAsteroids.push({
        mesh: astMesh,
        velocity: new THREE.Vector3(velX, velY, velZ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5
        ),
      });
    }

    // ---------------------------------------------------------------------
    // Main 3D Metallic Yodha Logo Sphere (1.35 radius)
    // ---------------------------------------------------------------------
    const ballRadius = 1.35;
    const sphereGeo = own(new THREE.SphereGeometry(ballRadius, 64, 64));

    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = 2048;
    logoCanvas.height = 1024;
    const lctx = logoCanvas.getContext("2d");
    const sphereTexture = own(new THREE.CanvasTexture(logoCanvas));
    sphereTexture.wrapS = THREE.RepeatWrapping;
    sphereTexture.wrapT = THREE.ClampToEdgeWrapping;

    if (lctx) {
      lctx.fillStyle = "#000000";
      lctx.fillRect(0, 0, 2048, 1024);
      const img = new Image();
      const paintLogo = () => {
        const logoSize = 850;
        const topY = (1024 - logoSize) / 2;
        lctx.drawImage(img, 512 - logoSize / 2, topY, logoSize, logoSize);
        lctx.drawImage(img, 1536 - logoSize / 2, topY, logoSize, logoSize);
        sphereTexture.needsUpdate = true;
        isLogoLoaded = true;
      };
      img.onload = paintLogo;
      img.src = logo;
      if (img.complete && img.naturalWidth > 0) paintLogo();
    }

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 128;
    envCanvas.height = 64;
    const ectx = envCanvas.getContext("2d");
    if (ectx) {
      const grad = ectx.createLinearGradient(0, 0, 0, 64);
      grad.addColorStop(0, "#38bdf8");
      grad.addColorStop(0.45, "#0b1a2e");
      grad.addColorStop(1, "#020308");
      ectx.fillStyle = grad;
      ectx.fillRect(0, 0, 128, 64);
    }
    const envTexture = own(new THREE.CanvasTexture(envCanvas));
    envTexture.mapping = THREE.EquirectangularReflectionMapping;

    const sphereMat = own(
      new THREE.MeshStandardMaterial({
        map: sphereTexture,
        emissiveMap: sphereTexture,
        emissive: 0xffffff,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.88,
        color: 0x020308,
        envMap: envTexture,
        envMapIntensity: 1.1,
      })
    );

    const ballMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(ballMesh);

    // Glowing Ambient Aura Sprite
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const glctx = glowCanvas.getContext("2d");
    if (glctx) {
      const g = glctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, "rgba(56, 189, 248, 0.9)");
      g.addColorStop(0.4, "rgba(129, 140, 248, 0.3)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      glctx.fillStyle = g;
      glctx.fillRect(0, 0, 256, 256);
    }
    const glowTexture = own(new THREE.CanvasTexture(glowCanvas));
    const glowMat = own(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      })
    );
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(4.4, 4.4, 1);
    scene.add(glowSprite);

    // ---------------------------------------------------------------------
    // 3D Extruded Digital Text ("YODHA" Silver/White, "2.0" Sky Blue)
    // ---------------------------------------------------------------------
    const LETTERS_Z = 0.8;
    const LETTER_SCALE = isMobile ? 0.44 : 0.62;
    const letterChars = ["Y", "O", "D", "H", "A", " ", "2", ".", "0"];
    const charSpacing = isMobile ? 0.95 : 1.2;
    const totalWidth = letterChars.length * charSpacing;
    const startX = -totalWidth / 2 + charSpacing / 2;

    const geoCache = new Map<string, THREE.BoxGeometry>();
    const boxGeo = (w: number, h: number) => {
      const key = `${w.toFixed(3)}x${h.toFixed(3)}`;
      let geo = geoCache.get(key);
      if (!geo) {
        geo = own(new THREE.BoxGeometry(w, h, 0.5));
        geoCache.set(key, geo);
      }
      return geo;
    };

    const whiteMat = own(
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.75,
      })
    );
    const blueMat = own(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.95,
        roughness: 0.15,
        metalness: 0.8,
      })
    );

    const letterSegments: LetterSegment[] = [];
    const buildGroup = new THREE.Group();
    buildGroup.position.set(0, 0, LETTERS_Z);
    buildGroup.scale.setScalar(LETTER_SCALE);
    scene.add(buildGroup);

    letterChars.forEach((char, idx) => {
      if (char === " ") return;
      const defs = CHAR_SEGMENTS[char];
      if (!defs) return;
      const isBlue = char === "2" || char === "." || char === "0";
      const charX = startX + idx * charSpacing;

      defs.forEach((def) => {
        const mesh = new THREE.Mesh(boxGeo(def.w, def.h), isBlue ? blueMat : whiteMat);
        mesh.position.set(charX + def.x, def.y, 0);
        buildGroup.add(mesh);
      });
    });

    buildGroup.updateMatrixWorld(true);
    const worldPos = new THREE.Vector3();
    const worldQuat = new THREE.Quaternion();
    const worldScale = new THREE.Vector3();
    [...buildGroup.children].forEach((child) => {
      const mesh = child as THREE.Mesh;
      mesh.matrixWorld.decompose(worldPos, worldQuat, worldScale);
      buildGroup.remove(mesh);
      mesh.position.copy(worldPos);
      mesh.quaternion.copy(worldQuat);
      mesh.scale.copy(worldScale);
      scene.add(mesh);
      letterSegments.push({
        mesh,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3(),
        isHit: false,
        settled: false,
      });
    });
    scene.remove(buildGroup);

    // ---------------------------------------------------------------------
    // SMALL YODHA BALLS PEDESTAL / BASE PLATFORM (Rotating Slowly)
    // ---------------------------------------------------------------------
    const smallBaseBalls: SmallBaseBall[] = [];
    const smallBallRadius = 0.28;
    const smallBallGeo = own(new THREE.SphereGeometry(smallBallRadius, 32, 32));
    const smallBallMat = own(
      new THREE.MeshStandardMaterial({
        map: sphereTexture,
        emissiveMap: sphereTexture,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        color: 0x070d1a,
        envMap: envTexture,
        envMapIntensity: 0.9,
      })
    );

    // Construct a continuous supporting base row directly beneath YODHA 2.0
    const BASE_BALL_COUNT = isMobile ? 12 : 16;
    const baseRowWidth = (totalWidth * LETTER_SCALE) + 0.8;
    const baseStartX = -baseRowWidth / 2;
    const baseStepX = baseRowWidth / (BASE_BALL_COUNT - 1);
    const basePedestalY = -0.75; // Directly supporting the bottom of 3D letters

    for (let i = 0; i < BASE_BALL_COUNT; i++) {
      const bMesh = new THREE.Mesh(smallBallGeo, smallBallMat);
      bMesh.position.set(baseStartX + i * baseStepX, basePedestalY, LETTERS_Z);
      scene.add(bMesh);

      smallBaseBalls.push({
        mesh: bMesh,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3(),
        isHit: false,
        settled: false,
      });
    }

    // Lighting setup
    const flashLight = new THREE.PointLight(0x38bdf8, 0, 26);
    flashLight.position.set(0, 1, LETTERS_Z + 0.5);
    scene.add(flashLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    keyLight.position.set(6, 8, 12);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0xa855f7, 2.8);
    backLight.position.set(-6, -5, -6);
    scene.add(backLight);

    // Fullscreen glitch / fade post pass
    let renderTarget = new THREE.WebGLRenderTarget(width, height);
    own(renderTarget);
    const postScene = new THREE.Scene();
    const postCamera = new THREE.Camera();
    const postGeo = own(new THREE.PlaneGeometry(2, 2));
    const postUniforms = {
      tDiffuse: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uGlitch: { value: 0 },
      uFade: { value: 1 },
      uResolution: { value: new THREE.Vector2(width, height) },
    };
    const postMat = own(
      new THREE.ShaderMaterial({
        uniforms: postUniforms,
        vertexShader: POST_VERTEX,
        fragmentShader: POST_FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })
    );
    const postMesh = new THREE.Mesh(postGeo, postMat);
    postScene.add(postMesh);

    // Resize handling with Mobile View Optimization
    const handleResize = () => {
      width = container.clientWidth || 1;
      height = container.clientHeight || 1;
      const isMob = width < 640;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const newBaseZ = isMob ? 13.5 : 9.5;
      const newHeroZ = isMob ? 10.8 : 7.6;
      basePosition.set(0, 0, newBaseZ);
      heroPosition.set(0, 0, newHeroZ);

      renderer.setSize(width, height, false);
      renderTarget.setSize(width, height);
      postUniforms.uResolution.value.set(width, height);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(handleResize) : null;
    resizeObserver?.observe(container);
    window.addEventListener("resize", handleResize);

    // Animation loop & Physics Timeline
    const START_Z = -70;
    const HERO_Z = isMobile ? 10.8 : 7.6;
    const T_COLLISION = 1.0;
    const T_SETTLE_HOLD = 2.0; // Settling completes within 3.0s total after hit
    const T_JITTER = 0.5; // Intense screen jitter pass
    const T_VANISH = 0.2; // Sudden disappearance cut

    const T_SETTLE_END = T_COLLISION + T_SETTLE_HOLD;
    const T_JITTER_END = T_SETTLE_END + T_JITTER;
    const T_VANISH_END = T_JITTER_END + T_VANISH;

    let animationFrameId: number;
    const clock = new THREE.Clock();

    let smoothedZ = START_Z;
    let lastSmoothedZ = START_Z;

    let prevEnding = false;
    let hasCollided = false;
    let endingStartTime: number | null = null;
    let cameraShake = 0;
    let completedFired = false;

    const GRAVITY_DOWN = 24.0;
    const FLOOR_Y = -6.5;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 1 / 30);
      const elapsedTime = clock.getElapsedTime();

      const ending = isEndingRef.current;
      const progress = progressRef.current;

      starField.rotation.y += dt * 0.008;
      nebula.rotation.y += dt * 0.003;

      // Animate Small Asteroids
      smallAsteroids.forEach((ast) => {
        ast.mesh.position.addScaledVector(ast.velocity, dt * 60);
        ast.mesh.rotation.x += ast.rotationSpeed.x * dt;
        ast.mesh.rotation.y += ast.rotationSpeed.y * dt;
        ast.mesh.rotation.z += ast.rotationSpeed.z * dt;

        if (ast.mesh.position.z > 20) {
          const side = Math.random() > 0.5 ? 1 : -1;
          ast.mesh.position.set(
            side * (25 + Math.random() * 30),
            (Math.random() - 0.5) * 35,
            -80 + Math.random() * 40
          );
        }
      });

      // Animate Small Base Balls: Slow continuous Y-axis rotation before hit
      smallBaseBalls.forEach((bBall) => {
        if (!bBall.isHit) {
          bBall.mesh.rotation.y += dt * 0.8;
        }
      });

      if (ending && !prevEnding) {
        endingStartTime = elapsedTime;
      }
      if (!ending && prevEnding) {
        endingStartTime = null;
        hasCollided = false;
        completedFired = false;
        smoothedZ = START_Z;
        lastSmoothedZ = START_Z;
        letterSegments.forEach((seg) => {
          seg.isHit = false;
          seg.settled = false;
          seg.velocity.set(0, 0, 0);
          seg.angularVelocity.set(0, 0, 0);
          seg.mesh.visible = true;
          seg.mesh.scale.setScalar(1);
        });
        smallBaseBalls.forEach((bBall) => {
          bBall.isHit = false;
          bBall.settled = false;
          bBall.velocity.set(0, 0, 0);
          bBall.angularVelocity.set(0, 0, 0);
          bBall.mesh.visible = true;
        });
        ballMesh.scale.setScalar(1);
        ballMesh.visible = true;
        glowSprite.visible = true;
      }
      prevEnding = ending;

      let glitchIntensity = 0;
      let fadeFactor = 1;

      if (!ending || endingStartTime === null) {
        // BALL STARTS MOVING FORWARD ONLY ONCE LOGO IS LOADED
        if (isLogoLoaded) {
          const progFactor = THREE.MathUtils.clamp(progress / 100, 0, 1);
          const targetZ = START_Z + progFactor * (LETTERS_Z - START_Z);
          
          const smoothing = 1 - Math.exp(-9.0 * dt);
          smoothedZ += (targetZ - smoothedZ) * smoothing;
        } else {
          smoothedZ = START_Z;
        }

        const distanceThisFrame = smoothedZ - lastSmoothedZ;
        lastSmoothedZ = smoothedZ;

        // Forward rolling physics towards camera
        ballMesh.position.set(0, 0, smoothedZ);
        ballMesh.scale.setScalar(1);
        ballMesh.rotation.x += (distanceThisFrame / ballRadius) * 2.2;
        ballMesh.rotation.y = elapsedTime * 1.5;

        glowSprite.position.copy(ballMesh.position);
        glowSprite.scale.set(4.0, 4.0, 1);
      } else {
        // ENDING TIMELINE: IMPACT DISPERSION & SIDE-SCREEN BOUNCING PHYSICS (SETTLES IN < 3.0s)
        const t = elapsedTime - endingStartTime;

        if (!hasCollided) {
          hasCollided = true;
          ballMesh.position.set(0, 0, LETTERS_Z);
          ballMesh.scale.setScalar(1);
          flashLight.intensity = 26;
          cameraShake = 1.2;

          // Disperse 3D Letter Segments
          letterSegments.forEach((seg) => {
            seg.isHit = true;
            const dx = seg.mesh.position.x;
            const dy = seg.mesh.position.y;
            seg.velocity.set(
              dx * (1.5 + Math.random()) + (Math.random() - 0.5) * 2,
              dy * 0.5 - (1.0 + Math.random() * 2.0),
              -Math.random() * 4.0
            );
            seg.angularVelocity.set(
              (Math.random() - 0.5) * 16,
              (Math.random() - 0.5) * 16,
              (Math.random() - 0.5) * 16
            );
          });

          // Disperse Small Base Pedestal Balls with Side-Screen Bouncing Physics
          smallBaseBalls.forEach((bBall) => {
            bBall.isHit = true;
            const dx = bBall.mesh.position.x;
            const sideDir = dx >= 0 ? 1 : -1;
            const blastSpeed = 8.0 + Math.random() * 7.0;

            bBall.velocity.set(
              sideDir * blastSpeed, // Bounce outward towards screen sides
              Math.random() * 4.0,  // Upward pop
              (Math.random() - 0.5) * 3.0
            );
            bBall.angularVelocity.set(
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            );
          });
        }

        flashLight.intensity = Math.max(0, flashLight.intensity * Math.pow(0.05, dt));

        // Physics letter segments falling
        letterSegments.forEach((seg) => {
          if (!seg.isHit || seg.settled) return;

          seg.velocity.y -= GRAVITY_DOWN * dt;
          seg.mesh.position.addScaledVector(seg.velocity, dt);

          seg.mesh.rotation.x += seg.angularVelocity.x * dt;
          seg.mesh.rotation.y += seg.angularVelocity.y * dt;
          seg.mesh.rotation.z += seg.angularVelocity.z * dt;

          if (seg.mesh.position.y <= FLOOR_Y) {
            seg.mesh.position.y = FLOOR_Y;
            if (Math.abs(seg.velocity.y) > 1.5) {
              seg.velocity.y = -seg.velocity.y * 0.35;
              seg.velocity.x *= 0.5;
              seg.velocity.z *= 0.5;
            } else {
              seg.velocity.set(0, 0, 0);
              seg.angularVelocity.set(0, 0, 0);
              seg.settled = true;
            }
          }
        });

        // Small Base Balls: Bouncing off Screen Sides (x = ±12) & Falling to Floor
        const SIDE_BOUNCE_X = isMobile ? 7.5 : 12.0;

        smallBaseBalls.forEach((bBall) => {
          if (!bBall.isHit || bBall.settled) return;

          bBall.velocity.y -= GRAVITY_DOWN * dt;
          bBall.mesh.position.addScaledVector(bBall.velocity, dt);

          bBall.mesh.rotation.x += bBall.angularVelocity.x * dt;
          bBall.mesh.rotation.y += bBall.angularVelocity.y * dt;

          // Bounce off Screen Side Boundaries!
          if (Math.abs(bBall.mesh.position.x) >= SIDE_BOUNCE_X) {
            const sideSign = bBall.mesh.position.x > 0 ? 1 : -1;
            bBall.mesh.position.x = sideSign * SIDE_BOUNCE_X;
            bBall.velocity.x = -bBall.velocity.x * 0.65; // Side bounce reflection
          }

          // Fall and settle on bottom floor Y = FLOOR_Y within 3.0s
          if (bBall.mesh.position.y <= FLOOR_Y) {
            bBall.mesh.position.y = FLOOR_Y;
            if (Math.abs(bBall.velocity.y) > 1.5) {
              bBall.velocity.y = -bBall.velocity.y * 0.4;
              bBall.velocity.x *= 0.6;
            } else {
              bBall.velocity.set(0, 0, 0);
              bBall.angularVelocity.set(0, 0, 0);
              bBall.settled = true;
            }
          }
        });

        if (t < T_COLLISION) {
          const localT = easeOutCubic(THREE.MathUtils.clamp(t / T_COLLISION, 0, 1));
          const z = THREE.MathUtils.lerp(LETTERS_Z, HERO_Z, localT);
          ballMesh.position.set(0, 0, z);
          ballMesh.rotation.x += 6 * dt;
          ballMesh.rotation.y = elapsedTime * 1.3;
          glowSprite.position.copy(ballMesh.position);
          glowSprite.scale.setScalar(3.4);
        } else if (t < T_SETTLE_END) {
          // Debris settling cleanly on floor within 3.0 seconds total
          ballMesh.position.set(0, 0, HERO_Z);
          ballMesh.rotation.y = elapsedTime * 0.6;
          glowSprite.position.copy(ballMesh.position);
        } else if (t < T_JITTER_END) {
          // INTENSE SCREEN JITTER PASS BEFORE SUDDEN VANISH
          glitchIntensity = 1.0; // Max digital tear & scanline glitch
          ballMesh.position.set(0, 0, HERO_Z);
          glowSprite.position.copy(ballMesh.position);
        } else if (t < T_VANISH_END) {
          // SUDDEN DISAPPEARANCE CUT
          fadeFactor = 0;
          ballMesh.visible = false;
          glowSprite.visible = false;
          letterSegments.forEach((seg) => (seg.mesh.visible = false));
          smallBaseBalls.forEach((bBall) => (bBall.mesh.visible = false));
        } else {
          fadeFactor = 0;
          ballMesh.visible = false;
          glowSprite.visible = false;
          if (!completedFired) {
            completedFired = true;
            onSequenceComplete?.();
          }
        }
      }

      // Camera shake
      if (cameraShake > 0.001) {
        cameraShake *= Math.pow(0.02, dt);
        camera.position.x += (Math.random() - 0.5) * cameraShake * 0.25;
        camera.position.y += (Math.random() - 0.5) * cameraShake * 0.2;
      } else {
        cameraShake = 0;
      }
      camera.lookAt(ending && endingStartTime !== null && elapsedTime - endingStartTime > T_COLLISION ? heroLookAt : baseLookAt);

      // Render with shader post pass
      const needsPost = glitchIntensity > 0.001 || fadeFactor < 0.999;
      if (needsPost) {
        renderer.setRenderTarget(renderTarget);
        renderer.clear(true, true, true);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        postUniforms.tDiffuse.value = renderTarget.texture;
        postUniforms.uTime.value = elapsedTime;
        postUniforms.uGlitch.value = glitchIntensity;
        postUniforms.uFade.value = fadeFactor;
        renderer.clear(true, true, true);
        renderer.render(postScene, postCamera);
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      disposables.forEach((item) => item.dispose());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

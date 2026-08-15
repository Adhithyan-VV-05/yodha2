import { Component, type ReactNode, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import logo from '../../assets/logo.png';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("Spline scene error captured:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-sky-400">
          <span className="text-xs font-mono font-bold uppercase tracking-widest mb-1">
            YODHA 3D INTERACTIVE ENGINE
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  showChestLogo?: boolean;
}

export function SplineScene({ scene, className, showChestLogo = true }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Smooth lively loading progress counter (0% -> 92%)
    let progressTimer: ReturnType<typeof setInterval>;

    if (isLoading) {
      progressTimer = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 92) {
            clearInterval(progressTimer);
            return 92;
          }
          const increment = Math.floor(Math.random() * 12) + 8;
          return Math.min(92, prev + increment);
        });
      }, 140);
    }

    // Safety fallback timer: finalize loading after 3.8s max
    const safetyTimer = setTimeout(() => {
      setLoadProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 3800);

    // Track mouse movement across the complete hero section & screen
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: mouseX, y: mouseY });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isLoading]);

  const handleSplineLoad = () => {
    setLoadProgress(100);
    setTimeout(() => setIsLoading(false), 150);
  };

  return (
    <SplineErrorBoundary>
      <div 
        className={`relative w-full h-full min-h-[280px] sm:min-h-[380px] ${className || ''}`}
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Small, Proper, Lively Mini Progress Bar Widget while Robot is Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-300">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.3)] backdrop-blur-xl flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-sky-400 border-t-transparent animate-spin shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                  <span>Loading 3D Robot</span>
                  <span className="text-sky-400 font-black">{loadProgress}%</span>
                </div>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mt-1 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3D Spline Scene */}
        <Spline
          scene={scene}
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full pointer-events-auto"
        />

        {/* Minimal Clean YODHA Logo Emblem on Robot's Chest */}
        {showChestLogo && !isLoading && (
          <div
            className="absolute pointer-events-none z-20 flex items-center justify-center transition-all duration-150 ease-out"
            style={{
              top: '49%',
              left: '50%',
              transform: `translate(calc(-50% + ${mousePos.x * 10}px), calc(-50% + ${mousePos.y * 10}px))`,
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Minimal Steady Chest Reactor Core Ring */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sky-400/40 bg-sky-500/10 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />
              
              {/* Clean YODHA 2D Logo Emblem */}
              <img
                src={logo}
                alt="YODHA Chest Emblem"
                className="absolute w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              />
            </div>
          </div>
        )}
      </div>
    </SplineErrorBoundary>
  );
}

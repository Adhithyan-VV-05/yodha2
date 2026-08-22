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

  useEffect(() => {
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

    const safetyTimer = setTimeout(() => {
      setLoadProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 3800);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(safetyTimer);
    };
  }, [isLoading]);

  const handleSplineLoad = () => {
    setLoadProgress(100);
    setTimeout(() => setIsLoading(false), 150);
  };

  return (
    <SplineErrorBoundary>
      <div className={`relative w-full h-full min-h-[280px] sm:min-h-[380px] ${className || ''}`}>
        {/* Loading Progress Bar */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity duration-300">
            <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700 backdrop-blur-xl flex items-center gap-3 shadow-lg">
              <div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin shrink-0" />
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                <span>Loading 3D Robot...</span>
                <span className="text-sky-400 font-bold">{loadProgress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* 3D Spline Scene */}
        <Spline
          scene={scene}
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full pointer-events-none"
        />

        {/* YODHA Chest Emblem */}
        {showChestLogo && !isLoading && (
          <div
            className="absolute pointer-events-none z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              top: '49%',
              left: '50%',
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sky-400/30 bg-sky-500/10 shadow-md" />
              <img
                src={logo}
                alt="YODHA Chest Emblem"
                className="absolute w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-110"
              />
            </div>
          </div>
        )}
      </div>
    </SplineErrorBoundary>
  );
}


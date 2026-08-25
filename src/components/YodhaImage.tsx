import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";
import logo from "../assets/logo.webp";

interface YodhaImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  logoClassName?: string;
  showLogoGlow?: boolean;
}

export function YodhaImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  logoClassName = "",
  showLogoGlow = true,
  onLoad,
  onError,
  ...props
}: YodhaImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset state on src change
    setIsLoaded(false);
    setIsError(false);

    // If image is already cached or instantly completed
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    if (onError) onError(e);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName || "w-full h-full"}`}>
      {/* YODHA Logo Placeholder displayed while loading */}
      {(!isLoaded || isError) && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#070b14]/90 backdrop-blur-md transition-opacity duration-300 pointer-events-none select-none">
          <div className="relative flex items-center justify-center">
            {showLogoGlow && (
              <>
                <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-indigo-500/20 border-b-purple-400 animate-spin-slow" />
              </>
            )}
            <img
              src={logo}
              alt="YODHA Logo Placeholder"
              className={`w-5 h-5 sm:w-7 sm:h-7 object-contain animate-pulse ${logoClassName}`}
            />
          </div>
        </div>
      )}

      {/* Target Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}

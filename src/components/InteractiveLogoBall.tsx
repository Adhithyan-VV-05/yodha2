"use client";
import logo from "../assets/logo.webp";

interface InteractiveLogoBallProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function InteractiveLogoBall({ size = "sm", className = "" }: InteractiveLogoBallProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none rounded-full overflow-hidden shrink-0 ${sizeClasses} ${className}`}>
      <img
        src={(logo as any)?.src || logo}
        alt="Yodha Logo"
        className="w-full h-full object-contain p-1 rounded-full bg-black/60"
      />
    </div>
  );
}

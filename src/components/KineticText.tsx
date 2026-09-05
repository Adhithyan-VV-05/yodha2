"use client";
interface KineticTextProps {
  words?: string[];
  className?: string;
}

export function KineticText({
  words = ["FORGING"],
  className = "",
}: KineticTextProps) {
  return (
    <span className={`inline-block font-bold text-sky-400 ${className}`}>
      {words[0]}
    </span>
  );
}

export default KineticText;


import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide custom cursor on mobile touchscreens
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.getAttribute("role") === "button" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    let animId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Inner Glowing Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-sky-400 rounded-full pointer-events-none z-[9999999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out shadow-[0_0_15px_rgba(56,189,248,1)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            isClicking ? 0.7 : isHovered ? 1.8 : 1
          })`,
          backgroundColor: isHovered ? "#38bdf8" : "#38bdf8",
        }}
      />

      {/* Smooth Trailing Outer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sky-400/60 pointer-events-none z-[9999998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out shadow-[0_0_20px_rgba(56,189,248,0.3)]"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${
            isClicking ? 0.8 : isHovered ? 1.6 : 1
          })`,
          borderColor: isHovered ? "rgba(56,189,248,0.9)" : "rgba(56,189,248,0.45)",
          backgroundColor: isHovered ? "rgba(56,189,248,0.08)" : "transparent",
        }}
      />
    </>
  );
}

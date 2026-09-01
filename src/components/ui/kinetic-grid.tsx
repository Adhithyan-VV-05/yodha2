import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function KineticGrid({
  children,
  className,
  globalColor = "default",
}: {
  children?: ReactNode;
  className?: string;
  globalColor?: "default" | "monochrome";
  planeBackground?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        globalColor === "monochrome" ? "bg-[#000000]" : "bg-[#020510]",
        className
      )}
    >
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#020510] via-[#081026] to-[#030712]" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}


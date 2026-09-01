import type { ReactNode } from "react";

interface AwwwardsCardProps {
  children: ReactNode;
  direction?: "top" | "bottom" | "fade";
  delay?: number;
  className?: string;
}

export function AwwwardsCard({
  children,
  className = "",
}: AwwwardsCardProps) {
  return <div className={className}>{children}</div>;
}

export default AwwwardsCard;


interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDuration?: number;
}

export function TextScramble({
  text,
  className = "",
}: TextScrambleProps) {
  return (
    <span className={`inline-block font-mono ${className}`}>
      {text}
    </span>
  );
}

export default TextScramble;


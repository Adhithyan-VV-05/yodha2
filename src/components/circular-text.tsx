
import { motion } from "framer-motion";

export function CircularText() {
  const textArray = ["YODHA 2", "HACKATHON", "LOADING"];
  const text = textArray.join(" • ") + " • ";
  const chars = text.split("");
  const angle = 360 / chars.length;

  return (
    <motion.div 
      className="relative flex justify-center items-center shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 z-20"
      exit={{ scale: 0, opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="absolute w-full h-full">
        <div className="w-full h-full" style={{ animation: "spin-container 12s linear infinite" }}>
          {chars.map((char, i) => (
            <span
              key={i}
              className="absolute top-0 origin-bottom text-sky-300 h-1/2 flex justify-center items-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{
                left: 'calc(50% - 40px)',
                width: '80px',
                fontWeight: 250,
                fontFamily: 'Dusseldot, sans-serif',
                textShadow: '0px 0px 8px rgba(56, 189, 248, 0.6)',
                transform: `rotate(${i * angle}deg)`,
                animation: 'font-pulse 10s linear infinite',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";

interface YodhaTitleBannerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  align?: "left" | "center";
}

export function YodhaTitleBanner({ size = "md", className = "", align = "center" }: YodhaTitleBannerProps) {
  const letterSizes = {
    sm: "h-10 sm:h-12",
    md: "h-14 sm:h-20 md:h-24 lg:h-28",
    lg: "h-16 sm:h-24 md:h-28 lg:h-32",
    xl: "h-20 sm:h-32 md:h-40 lg:h-48",
  }[size];

  const warriorSizes = {
    sm: "h-6 sm:h-8 w-full max-w-[260px] sm:max-w-[340px]",
    md: "h-8 sm:h-12 md:h-14 lg:h-16 w-full max-w-[320px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[660px]",
    lg: "h-10 sm:h-14 md:h-16 lg:h-20 w-full max-w-[400px] sm:max-w-[560px] md:max-w-[680px] lg:max-w-[780px]",
    xl: "h-14 sm:h-20 md:h-24 lg:h-28 w-full max-w-[500px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[950px]",
  }[size];

  const alignmentClass = align === "left" ? "items-center lg:items-start" : "items-center";

  return (
    <div className={`flex flex-col select-none ${alignmentClass} ${className}`}>
      {/* 3D Kinetic Staggered Letter Row: Y-O-D-H-A with unique entrance animations */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 py-1">

        {/* LETTER Y: Diagonal 3D Drop & Tilt Entrance */}
        <motion.div
          initial={{ opacity: 0, x: -70, y: -70, rotateZ: -45, scale: 0.3 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0], rotateZ: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.05 },
            scale: { duration: 0.6, delay: 0.05, type: "spring", stiffness: 260 },
            x: { duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.7 },
          }}
          whileHover={{ scale: 1.15, y: -10, rotate: -5 }}
          className="relative group cursor-pointer"
        >
          <img
            src="/Y.png"
            alt="Y"
            className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:brightness-125 transition-all duration-300`}
            loading="eager"
          />
        </motion.div>

        {/* LETTER O: 3D Y-AXIS 360° CONTINUOUS ROTATION LOOP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.15 },
            scale: { duration: 0.6, delay: 0.15, type: "spring", stiffness: 280 },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.8 },
          }}
          whileHover={{ scale: 1.15, y: -10 }}
          className="relative group cursor-pointer"
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear",
            }}
            className="inline-block transform-gpu origin-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/O.png"
              alt="O"
              className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:brightness-125 transition-all duration-300`}
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* LETTER D: Energetic Spring Pop & Bottom-Right Bounce */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateZ: 35, scale: 0.2 }}
          animate={{ opacity: 1, y: [0, -8, 0], rotateZ: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.25 },
            scale: { duration: 0.6, delay: 0.25, type: "spring", stiffness: 300 },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.9 },
          }}
          whileHover={{ scale: 1.15, y: -10, rotate: 5 }}
          className="relative group cursor-pointer"
        >
          <img
            src="/D.png"
            alt="D"
            className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:brightness-125 transition-all duration-300`}
            loading="eager"
          />
        </motion.div>

        {/* LETTER H: Cyber Zoom Slam & Blur Focal Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 2.2, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.35 },
            scale: { duration: 0.5, delay: 0.35, ease: "easeOut" },
            filter: { duration: 0.5, delay: 0.35 },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.0 },
          }}
          whileHover={{ scale: 1.15, y: -10 }}
          className="relative group cursor-pointer"
        >
          <img
            src="/H.png"
            alt="H"
            className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:brightness-125 transition-all duration-300`}
            loading="eager"
          />
        </motion.div>

        {/* LETTER A: Top-Right Diagonal Sweep & Flare */}
        <motion.div
          initial={{ opacity: 0, x: 70, y: -70, rotateZ: 45, scale: 0.2 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0], rotateZ: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.45 },
            scale: { duration: 0.6, delay: 0.45, type: "spring", stiffness: 260 },
            x: { duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.1 },
          }}
          whileHover={{ scale: 1.15, y: -10, rotate: 5 }}
          className="relative group cursor-pointer"
        >
          <img
            src="/A.png"
            alt="A"
            className={`${letterSizes} w-auto object-contain filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:brightness-125 transition-all duration-300`}
            loading="eager"
          />
        </motion.div>

      </div>

      {/* Background-Removed WARRIORS OF AI Graphic Banner (Sleek Metallic Underline Graphic matching YODHA width, no box background) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-0.5 sm:mt-1 flex items-center justify-center w-full px-2"
      >
        <img
          src="/warrior of ai.png"
          alt="WARRIORS OF AI"
          className={`${warriorSizes} object-contain filter brightness-125 drop-shadow-[0_4px_18px_rgba(56,189,248,0.35)]`}
          loading="eager"
        />
      </motion.div>
    </div>
  );
}



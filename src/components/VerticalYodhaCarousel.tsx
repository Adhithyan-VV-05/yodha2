import { motion } from "framer-motion";

// Import all 20 past hackathon images from src/assets/carousel/
import img1 from "../assets/carousel/1.webp";
import img2 from "../assets/carousel/2.webp";
import img3 from "../assets/carousel/3.webp";
import img4 from "../assets/carousel/4.webp";
import img5 from "../assets/carousel/5.webp";
import img6 from "../assets/carousel/6.webp";
import img7 from "../assets/carousel/7.webp";
import img8 from "../assets/carousel/8.webp";
import img9 from "../assets/carousel/9.webp";
import img10 from "../assets/carousel/10.webp";
import img11 from "../assets/carousel/11.webp";
import img12 from "../assets/carousel/12.webp";
import img13 from "../assets/carousel/13.webp";
import img14 from "../assets/carousel/14.webp";
import img15 from "../assets/carousel/15.webp";
import img16 from "../assets/carousel/16.webp";
import img17 from "../assets/carousel/17.webp";
import img18 from "../assets/carousel/18.webp";
import img19 from "../assets/carousel/19.webp";
import img20 from "../assets/carousel/20.webp";

const HIGHLIGHT_PHOTOS = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
];

export function VerticalYodhaCarousel() {
  const doubleSequence = [...HIGHLIGHT_PHOTOS, ...HIGHLIGHT_PHOTOS];

  return (
    <section
      id="carousel"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-0 z-20 select-none overflow-hidden"
    >
      <div className="w-full relative">
        {/* HEADER AREA */}
        <div className="text-center mb-10 sm:mb-14 space-y-2.5 max-w-4xl mx-auto px-4">
          {/* SUBTITLE TRACKING LABEL */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 sm:w-12 h-[1px] bg-slate-700/60" />
            <span className="text-xs font-mono font-medium tracking-[0.35em] text-slate-400 uppercase">
              HACKATHON ARCHIVES
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-slate-700/60" />
          </div>

          {/* MAIN CINEMATIC SERIF HIGHLIGHTS TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white py-1 drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
          >
            YODHA Hackathon <span className="text-purple-400">Highlights</span>
          </motion.h2>

          {/* SUBTITLE */}
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.3em] text-slate-400 uppercase max-w-xl mx-auto">
            Highlights & memories from past YODHA hackathon marathons
          </p>
        </div>

        {/* CONTINUOUS CINEMATIC FILM RIBBON FLOW (3D PERSPECTIVE & HORIZONTAL MASK) */}
        <div
          className="relative w-full overflow-hidden py-6 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {/* PERSPECTIVE STAGE */}
          <div className="w-full [perspective:1200px]">
            {/* INFINITE MOVING FILM STRIP TRACK */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-4 sm:gap-6 w-max py-4 px-4 [transform-style:preserve-3d]"
            >
              {doubleSequence.map((imgSrc, idx) => (
                <div
                  key={`film-card-${idx}`}
                  className="w-[260px] sm:w-[360px] md:w-[420px] aspect-[16/10] shrink-0 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-[#070e1c]/65 border border-purple-500/35 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden flex flex-col justify-between"
                >
                  {/* PHOTO CONTAINER */}
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-slate-950">
                    <img
                      src={imgSrc}
                      alt={`YODHA Hackathon Highlight ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerticalYodhaCarousel;

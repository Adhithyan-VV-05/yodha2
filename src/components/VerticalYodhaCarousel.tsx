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
  { src: img1, caption: "Ideas. People. Impact.", tag: "YODHA" },
  { src: img2, caption: "Inspiring Conversations", tag: "YODHA" },
  { src: img3, caption: "Builders of a Better Tomorrow", tag: "YODHA" },
  { src: img4, caption: "Code. Collaborate. Create.", tag: "YODHA" },
  { src: img5, caption: "A Community in Action", tag: "YODHA" },
  { src: img6, caption: "National AI Innovation", tag: "YODHA" },
  { src: img7, caption: "High-Octane Hackathon Marathon", tag: "YODHA" },
  { src: img8, caption: "48 Hours Non-Stop Sprint", tag: "YODHA" },
  { src: img9, caption: "Mentorship & Guidance", tag: "YODHA" },
  { src: img10, caption: "Prototyping & Pitching", tag: "YODHA" },
  { src: img11, caption: "Collaborative Energy", tag: "YODHA" },
  { src: img12, caption: "Future Tech Leaders", tag: "YODHA" },
  { src: img13, caption: "Department of AI & DS", tag: "YODHA" },
  { src: img14, caption: "Jyothi Engineering College", tag: "YODHA" },
  { src: img15, caption: "Healthcare AI Breakthroughs", tag: "YODHA" },
  { src: img16, caption: "Awarding Excellence", tag: "YODHA" },
  { src: img17, caption: "Memories & Milestones", tag: "YODHA" },
  { src: img18, caption: "National Participant Network", tag: "YODHA" },
  { src: img19, caption: "Passion & Purpose", tag: "YODHA" },
  { src: img20, caption: "Warriors of AI", tag: "YODHA" },
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
          className="relative w-full overflow-hidden py-6"
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
              {doubleSequence.map((item, idx) => (
                <div
                  key={`film-card-${idx}`}
                  className="w-[260px] sm:w-[360px] md:w-[420px] aspect-[16/10] shrink-0 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-[#070e1c]/65 border border-purple-500/35 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.03] hover:border-purple-400/80 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] group relative overflow-hidden flex flex-col justify-between cursor-default"
                >
                  {/* PHOTO CONTAINER */}
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-slate-950">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* SUBTLE CAPTION OVERLAY */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                      <span className="text-xs sm:text-sm font-serif font-normal tracking-wide text-slate-100 drop-shadow-md truncate max-w-[75%]">
                        {item.caption}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-purple-300/80 uppercase">
                        — {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SLOGAN & FOOTER BAR */}
        <div className="mt-10 sm:mt-14 text-center space-y-2 max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 sm:w-16 h-[1px] bg-slate-700/60" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.35em] text-slate-400 uppercase">
              MOMENTS THAT CONTINUE TO INSPIRE
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-slate-700/60" />
          </div>

          <div className="text-[9px] sm:text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase pt-1">
            IDEAS &nbsp;•&nbsp; PEOPLE &nbsp;•&nbsp; INNOVATION &nbsp;•&nbsp; COMMUNITY &nbsp;•&nbsp; IMPACT
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerticalYodhaCarousel;

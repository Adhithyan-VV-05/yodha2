import { motion } from "framer-motion";
import { Sparkles, Camera, Award, Users } from "lucide-react";

// Import all 20 past hackathon photographs
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

export function YodhaImageStreamSection() {
  const leftRail = [img1, img3, img5, img7, img9, img11, img13, img15, img17, img19];
  const rightRail = [img2, img4, img6, img8, img10, img12, img14, img16, img18, img20];

  // Double arrays for seamless infinite looping
  const leftImages = [...leftRail, ...leftRail];
  const rightImages = [...rightRail, ...rightRail];

  return (
    <section
      id="highlights"
      className="relative w-full py-20 sm:py-28 px-4 flex flex-col justify-center items-center overflow-hidden select-none bg-transparent text-white z-10"
    >
      {/* Background Radial Glow & Gradient */}
      <div className="absolute inset-0 bg-radial-at-c from-blue-950/30 via-slate-950/80 to-[#03060d] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none z-0" />

      {/* SECTION HEADER BLOCK */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>THE EXPERIENCE</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-sky-300 tracking-tight font-sans"
        >
          Moments that made YODHA.
        </motion.h2>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mt-4"
        >
          A glimpse into the people, ideas, teams, and energy that shaped the YODHA Hackathon.
        </motion.p>
      </div>

      {/* 3D PERSPECTIVE CORRIDOR CONTAINER */}
      <div className="relative w-full max-w-7xl h-[520px] sm:h-[640px] lg:h-[720px] overflow-hidden flex items-center justify-center rounded-3xl border border-blue-500/20 bg-slate-950/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Perspective Center Glow Beam */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-blue-950/40 pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#03060d] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#03060d] to-transparent z-20 pointer-events-none" />

        {/* 3D Perspective Stage */}
        <div className="relative w-full h-full flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
          
          {/* LEFT 3D PERSPECTIVE STREAM RAIL */}
          <div className="absolute left-[-5%] sm:left-[2%] md:left-[5%] top-[-20%] bottom-[-20%] w-[42%] md:w-[38%] [transform:rotateY(28deg)_rotateX(4deg)] origin-right z-10 flex flex-col justify-center overflow-hidden">
            <motion.div
              animate={{ y: [0, "-50%"] }}
              transition={{
                duration: 32,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-4 sm:gap-6 py-4"
            >
              {leftImages.map((imgSrc, idx) => (
                <div
                  key={`left-${idx}`}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={imgSrc}
                    alt={`YODHA Highlight ${idx + 1}`}
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* CENTER PERSPECTIVE VANISHING AMBIENCE */}
          <div className="absolute inset-y-0 w-[24%] md:w-[20%] z-20 flex flex-col items-center justify-center pointer-events-none text-center px-2">
            <div className="w-full h-[80%] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/40 to-transparent opacity-60" />
          </div>

          {/* RIGHT 3D PERSPECTIVE STREAM RAIL */}
          <div className="absolute right-[-5%] sm:right-[2%] md:right-[5%] top-[-20%] bottom-[-20%] w-[42%] md:w-[38%] [transform:rotateY(-28deg)_rotateX(4deg)] origin-left z-10 flex flex-col justify-center overflow-hidden">
            <motion.div
              animate={{ y: ["-50%", 0] }}
              transition={{
                duration: 32,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-4 sm:gap-6 py-4"
            >
              {rightImages.map((imgSrc, idx) => (
                <div
                  key={`right-${idx}`}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={imgSrc}
                    alt={`YODHA Highlight ${idx + 1}`}
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* BOTTOM BADGE BAR */}
        <div className="absolute bottom-6 z-30 flex items-center justify-center gap-6 px-6 py-2.5 rounded-full bg-slate-950/90 border border-blue-500/40 backdrop-blur-2xl text-xs font-mono text-slate-300 shadow-xl">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>100+ PARTICIPANTS</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-blue-500" />
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>₹70,000 PRIZE POOL</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-blue-500 hidden sm:inline-block" />
          <div className="hidden sm:flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span>20 HACKATHON MOMENTS</span>
          </div>
        </div>

      </div>

    </section>
  );
}

export default YodhaImageStreamSection;

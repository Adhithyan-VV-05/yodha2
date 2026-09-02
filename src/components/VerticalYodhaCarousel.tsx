import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { YodhaImage } from "./YodhaImage";

// Import all 20 past hackathon images from src/assets/carousel/
import img1 from "../assets/carousel/1.jpeg";
import img2 from "../assets/carousel/2.jpeg";
import img3 from "../assets/carousel/3.jpeg";
import img4 from "../assets/carousel/4.jpeg";
import img5 from "../assets/carousel/5.jpeg";
import img6 from "../assets/carousel/6.jpeg";
import img7 from "../assets/carousel/7.jpeg";
import img8 from "../assets/carousel/8.jpeg";
import img9 from "../assets/carousel/9.jpeg";
import img10 from "../assets/carousel/10.jpeg";
import img11 from "../assets/carousel/11.jpeg";
import img12 from "../assets/carousel/12.jpeg";
import img13 from "../assets/carousel/13.jpeg";
import img14 from "../assets/carousel/14.jpeg";
import img15 from "../assets/carousel/15.jpeg";
import img16 from "../assets/carousel/16.jpeg";
import img17 from "../assets/carousel/17.jpeg";
import img18 from "../assets/carousel/18.jpeg";
import img19 from "../assets/carousel/19.jpeg";
import img20 from "../assets/carousel/20.jpeg";

export function VerticalYodhaCarousel() {
  const col1Images = [img1, img2, img3, img4, img5, img6, img7];
  const col2Images = [img8, img9, img10, img11, img12, img13, img14];
  const col3Images = [img15, img16, img17, img18, img19, img20];

  return (
    <section id="carousel" className="relative w-full min-h-[85vh] py-16 sm:py-24 px-4 flex flex-col justify-center items-center overflow-hidden select-none bg-transparent text-white z-10">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050c1f]/70 to-transparent pointer-events-none z-0" />

      {/* TOP HEADER TITLE */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-indigo-400 tracking-tight font-sans"
        >
          YODHA Hackathon Highlights
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed mt-2"
        >
          Highlights & memories from past YODHA hackathon marathons organized by the Department of Artificial Intelligence & Data Science at Jyothi Engineering College.
        </motion.p>
      </div>

      {/* CONTINUOUS VERTICAL MOVING CAROUSEL GRID (FULL BRIGHTNESS 100%) */}
      <div className="relative w-full h-[65vh] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 px-2 md:px-12 opacity-95 pointer-events-none z-10 overflow-hidden">
        
        {/* COLUMN 1: SCROLLS UP INFINITELY */}
        <div className="h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col1Images, ...col1Images].map((img, idx) => (
              <div key={`col1-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-950/80 shadow-2xl shrink-0">
                <YodhaImage src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* COLUMN 2: SCROLLS DOWN INFINITELY */}
        <div className="h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col2Images, ...col2Images].map((img, idx) => (
              <div key={`col2-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-indigo-500/40 bg-slate-950/80 shadow-2xl shrink-0">
                <YodhaImage src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* COLUMN 3 (DESKTOP ONLY): SCROLLS UP INFINITELY */}
        <div className="hidden md:block h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
          >
            {[...col3Images, ...col3Images].map((img, idx) => (
              <div key={`col3-${idx}`} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-violet-500/40 bg-slate-950/80 shadow-2xl shrink-0">
                <YodhaImage src={img} alt="Past Yodha Movement" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default VerticalYodhaCarousel;

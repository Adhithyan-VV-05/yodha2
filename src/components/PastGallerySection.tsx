import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { YodhaImage } from "./YodhaImage";

// Import all 20 past hackathon images
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

const CAROUSEL_IMAGES = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
];

export function PastGallerySection() {
  // Triple the carousel array to guarantee 100% gapless continuous marquee loop
  const chainImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-transparent border-t border-b border-sky-500/20 z-20">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-sky-500/15 via-cyan-500/15 to-blue-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-sky-400" />
          <span>PAST HACKATHON MOMENTS</span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-cyan-400 tracking-tight"
        >
          YODHA Hackathon Highlights
        </motion.h2>
      </div>

      {/* CONTINUOUS INFINITE IMAGE CHAIN CAROUSEL (NO CURSOR INTERACTION, ZERO GAPS) */}
      <div className="relative w-full overflow-hidden select-none py-2 pointer-events-none">
        {/* Left & Right Fade Mask Borders */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#020510]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#020510]/90 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max gap-4 sm:gap-6 animate-marquee">
          {chainImages.map((src, idx) => (
            <div
              key={idx}
              className="relative w-64 sm:w-80 h-44 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-slate-950/80 group shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 hover:border-sky-400/60"
            >
              <YodhaImage
                src={src}
                alt={`Past Hackathon Photo ${idx + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { YodhaImage } from "./YodhaImage";

// Import all 20 past hackathon images
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

const CAROUSEL_IMAGES = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
];

export function PastGallerySection() {
  const chainImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <section id="gallery" className="py-10 sm:py-14 relative overflow-hidden bg-transparent border-t border-b border-blue-500/20 z-10 w-full text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-blue-400" />
          <span>PAST HACKATHON MOMENTS</span>
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-sky-400 tracking-tight font-sans">
            YODHA Hackathon Highlights
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          />
        </motion.div>
      </div>

      {/* CONTINUOUS INFINITE MOVING PHOTO CAROUSEL */}
      <div className="relative w-full overflow-hidden select-none py-4">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#020510]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#020510]/90 to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-4 sm:gap-6"
        >
          {chainImages.map((src, idx) => (
            <div
              key={idx}
              className="relative w-64 sm:w-80 h-44 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-500/30 bg-slate-950/90 shrink-0 shadow-xl"
            >
              <YodhaImage
                src={src}
                alt={`Past Hackathon Photo ${idx + 1}`}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PastGallerySection;

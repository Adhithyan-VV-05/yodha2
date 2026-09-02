import { motion } from "framer-motion";

export function SDGSection() {
  const sdgMobileSrc = encodeURI("/sdg.png");
  const sdgPcSrc = encodeURI("/sdg pc.png");

  return (
    <section id="sdg" className="py-16 sm:py-24 relative overflow-hidden bg-transparent text-white select-none w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans max-w-3xl"
        >
          Aligning Healthcare AI with Global Impact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full flex items-center justify-center pt-4"
        >
          <picture className="w-full flex items-center justify-center">
            <source media="(min-width: 640px)" srcSet={sdgPcSrc} />
            <img
              src={sdgMobileSrc}
              alt="UN Sustainable Development Goals"
              className="w-full h-auto max-h-[60vh] max-w-full sm:max-w-6xl md:max-w-7xl object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.5)] transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}

export default SDGSection;

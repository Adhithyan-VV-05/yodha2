import { motion } from "framer-motion";

export function SDGSection() {
  const sdgMobileSrc = encodeURI("/sdg.png");
  const sdgPcSrc = encodeURI("/sdg pc.png");

  return (
    <section id="sdg" className="py-16 sm:py-24 relative overflow-hidden bg-transparent text-white select-none w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        
        {/* Section Heading Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md"
        >
          <span>UN SUSTAINABLE DEVELOPMENT GOALS</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans max-w-3xl">
          Aligning Healthcare AI with Global Impact
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

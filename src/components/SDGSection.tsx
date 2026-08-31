import { motion } from "framer-motion";

export function SDGSection() {
  const sdgMobileSrc = encodeURI("/sdg.png");
  const sdgPcSrc = encodeURI("/sdg pc.png");

  return (
    <section id="sdgs" className="py-2 sm:py-4 relative overflow-hidden bg-transparent text-white select-none w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center space-y-2 sm:space-y-4 my-auto">
        
        {/* Section Heading Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest"
        >
          <span>SECTION 04 • UN SUSTAINABLE DEVELOPMENT GOALS</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex items-center justify-center"
        >
          <picture className="w-full flex items-center justify-center">
            <source media="(min-width: 640px)" srcSet={sdgPcSrc} />
            <img
              src={sdgMobileSrc}
              alt="UN Sustainable Development Goals"
              className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] max-w-full sm:max-w-6xl md:max-w-7xl object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.5)] transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}

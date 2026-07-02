import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { CircularText } from "@/components/circular-text";
import { StackNav } from "@/components/stack-nav";
import logo from "./assets/logo.png";

const LOADING_TIME = 13000; // 20 seconds

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    if (!isLogoLoaded) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIME);
    return () => clearTimeout(timer);
  }, [isLogoLoaded]);

  return (
    <main className="min-h-screen bg-black flex flex-col relative overflow-hidden text-white font-sans">
      <AnimatePresence>
        {!isLoading && <StackNav />}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && isLogoLoaded && (
          <motion.div
            key="loading-elements"
            className="absolute inset-0 flex flex-col items-center justify-between py-10 pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 1.2, delay: 0.5 } }} // Parent fades out
          >
            {/* Top Sparkles */}
            <motion.div
              className="w-full max-w-[40rem] h-40 relative rotate-180 shrink-0 md:hidden"
              exit={{ y: "-100%", opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </motion.div>

            {/* Center Circular Text Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {isLogoLoaded && <CircularText />}
            </div>

            {/* Bottom Sparkles */}
            <motion.div
              className="w-full max-w-[40rem] h-40 relative shrink-0 md:hidden"
              exit={{ y: "100%", opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Universal Hero Layout */}
      <div
        className={`flex-1 w-full flex flex-col transition-all duration-1000 z-10 ${
          isLoading ? "items-center justify-center pointer-events-none" : "items-center pt-32"
        }`}
      >
        <motion.img
          layout
          src={logo}
          alt="Yodha Logo"
          onLoad={() => setIsLogoLoaded(true)}
          style={{ opacity: isLogoLoaded ? 1 : 0 }}
          animate={{
            rotateY: isLoading ? 0 : 360,
          }}
          transition={{
            layout: { duration: 1.5, ease: "easeInOut" },
            rotateY: { duration: 1.5, ease: "easeInOut" },
          }}
          className={
            isLoading
              ? "z-30 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "z-30 w-24 h-24 md:w-32 md:h-32 object-contain mb-8"
          }
        />

        {/* Hero Content (Fades in when !isLoading) */}
        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-7xl font-bold tracking-wider text-center">
                WELCOME TO YODHA 2.0
              </h1>
              <p className="mt-6 text-xl text-sky-300 max-w-2xl text-center px-4">
                The ultimate frontend community hackathon is here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;

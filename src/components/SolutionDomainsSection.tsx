import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Heart,
  Brain,
  Stethoscope,
  Globe,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  Pointer,
} from "lucide-react";

interface DomainCard {
  id: string;
  badge: string;
  title: string;
  icon: ReactNode;
  summary: string;
  details: {
    overview: string;
    highlights: string[];
    techStack: string[];
  };
}

const DOMAINS: DomainCard[] = [
  {
    id: "patient-care",
    badge: "PATIENT CARE",
    title: "Healthcare Solutions",
    icon: <Heart className="w-10 h-10 text-cyan-400" />,
    summary: "AI-driven solutions to enhance patient care, optimize hospital workflows, and improve treatment outcomes.",
    details: {
      overview: "Build accessible voice-assisted medical tools, safe dosage verifiers, and multilingual patient routing assistants.",
      highlights: [
        "Multilingual voice-guided clinic scheduling",
        "Harmful drug-drug interaction risk verification",
        "Accessible, high-readability interface for elderly patients",
      ],
      techStack: ["Whisper AI", "React", "Firebase", "RxNorm API"],
    },
  },
  {
    id: "disease-prevention",
    badge: "HEALTHCARE HUB",
    title: "Disease Prevention",
    icon: <Activity className="w-10 h-10 text-cyan-400" />,
    summary: "Predictive analytics and early detection systems to prevent diseases and save lives across communities.",
    details: {
      overview: "Deploy continuous patient vital telemetry monitoring, predictive risk scoring algorithms, and early disease detection engines.",
      highlights: [
        "Predictive chronic condition risk alerts",
        "Biometric time-series anomaly detection",
        "Preventive outpatient care routing & triage",
      ],
      techStack: ["TensorFlow", "IoT Telemetry", "Python", "FastAPI"],
    },
  },
  {
    id: "medical-diagnosis",
    badge: "NEURAL AI",
    title: "Medical Diagnosis",
    icon: <Brain className="w-10 h-10 text-cyan-400" />,
    summary: "Deep neural diagnostic networks to assist clinicians with precision radiological imaging & genomic insights.",
    details: {
      overview: "Harness deep learning to assist radiologists and oncologists with precision diagnostic scanning and VCF variant analysis.",
      highlights: [
        "Automated MRI & X-ray lesion detection",
        "Genomic variant pathogenicity analysis",
        "Evidence-backed treatment recommendation pathways",
      ],
      techStack: ["PyTorch", "BioPython", "DICOM", "Qdrant DB"],
    },
  },
  {
    id: "decision-support",
    badge: "CLINICAL ENGINE",
    title: "AI Decision Support",
    icon: <Stethoscope className="w-10 h-10 text-cyan-400" />,
    summary: "Intelligent decision support systems for accurate clinical insights, ambulance telemetry, and ICU bed allocation.",
    details: {
      overview: "Connect emergency triage, ICU bed allocation, and inter-departmental hospital operational workflows.",
      highlights: [
        "Ambulance-to-ER real-time telemetry coordination",
        "ICU bed & ventilator surge forecasting",
        "Clinician diagnostic decision assistant",
      ],
      techStack: ["FHIR Protocol", "WebSockets", "Prophet", "React"],
    },
  },
  {
    id: "environmental-monitoring",
    badge: "SATELLITE RADAR",
    title: "Environmental Monitoring",
    icon: <Globe className="w-10 h-10 text-cyan-400" />,
    summary: "Real-time river contaminant sensing, hyper-local air smog forecasting, and satellite canopy monitoring.",
    details: {
      overview: "Monitor river contaminant plumes, track urban air smog hotspots, and detect Amazonian canopy deforestation.",
      highlights: [
        "Hydro-dynamic toxic chemical spill tracking",
        "24-hour street-level AQI forecasting & traffic rerouting",
        "Satellite multi-spectral Earth imagery analysis",
      ],
      techStack: ["Google Earth Engine", "YOLOv8", "PostGIS", "Python"],
    },
  },
  {
    id: "sustainable-living",
    badge: "GREEN TECH",
    title: "Sustainable Living",
    icon: <Leaf className="w-10 h-10 text-cyan-400" />,
    summary: "Computer vision waste recycling sorters, smart precision crop irrigation, and clean microgrid optimization.",
    details: {
      overview: "Develop computer vision waste sorters, smart precision irrigation tools, and urban clean microgrid optimizers.",
      highlights: [
        "Automated multi-material waste sorting computer vision",
        "Crop leaf blight organic diagnostic mobile app",
        "Renewable solar microgrid peak-shaving",
      ],
      techStack: ["TensorFlow Lite", "OpenWeather", "InfluxDB", "Flutter"],
    },
  },
];

export function SolutionDomainsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [detailModalDomain, setDetailModalDomain] = useState<DomainCard | null>(null);

  const total = DOMAINS.length;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 750);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 750);
  };

  // Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section id="solution-domains" className="py-20 sm:py-28 relative overflow-hidden bg-transparent text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Exact Text & Styling from Reference Image) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-3"
          >
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-sky-400" />
            <span>SOLUTION DOMAINS</span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-sky-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-none"
          >
            AI SOLUTIONS THAT MAKE A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              DIFFERENCE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-300 text-xs sm:text-sm font-mono tracking-wide flex items-center justify-center gap-2"
          >
            <span className="w-6 h-[1px] bg-sky-400/40" />
            <span>Tap / Click any side card to explore domain details</span>
            <span className="w-6 h-[1px] bg-sky-400/40" />
          </motion.p>
        </div>

        {/* 3D MECHANICAL CAROUSEL STACK CONTAINER */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative min-h-[480px] sm:min-h-[560px] flex items-center justify-center py-4"
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            aria-label="Previous Domain"
            className="absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-slate-900/90 border border-sky-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-950/80 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer hover:scale-110 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 sm:w-8 h-6 sm:h-8" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next Domain"
            className="absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-slate-900/90 border border-sky-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-950/80 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer hover:scale-110 disabled:opacity-50"
          >
            <ChevronRight className="w-6 sm:w-8 h-6 sm:h-8" />
          </button>

          {/* 3D PERSPECTIVE CAROUSEL TRACK */}
          <div className="relative w-full max-w-5xl h-[440px] sm:h-[500px] flex items-center justify-center [perspective:1200px]">
            {DOMAINS.map((domain, index) => {
              // Calculate relative offset from activeIndex (-2, -1, 0, 1, 2)
              let diff = index - activeIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const isRight = diff > 0;
              const isLeft = diff < 0;

              // Only render visible cards (-2 to +2 offset)
              if (Math.abs(diff) > 2) return null;

              // Compute 3D parameters matching exact design spec
              let translateX = 0;
              let scale = 1;
              let rotateY = 0;
              let zIndex = 30;
              let opacity = 1;
              let brightness = 1;

              if (isCenter) {
                translateX = 0;
                scale = 1.2;
                rotateY = 0;
                zIndex = 50;
                opacity = 1;
                brightness = 1;
              } else if (isRight) {
                // Right Stack (overlapping offset)
                translateX = diff === 1 ? 280 : 330;
                scale = diff === 1 ? 0.78 : 0.68;
                rotateY = -12;
                zIndex = 30 - diff * 5;
                opacity = diff === 1 ? 0.85 : 0.45;
                brightness = 0.65;
              } else if (isLeft) {
                // Left Stack (overlapping offset)
                translateX = diff === -1 ? -280 : -330;
                scale = diff === -1 ? 0.78 : 0.68;
                rotateY = 12;
                zIndex = 30 - Math.abs(diff) * 5;
                opacity = diff === -1 ? 0.85 : 0.45;
                brightness = 0.65;
              }

              // Responsive scaling for small mobile screens
              const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
              if (isMobile) {
                if (isLeft) translateX = -160;
                if (isRight) translateX = 160;
                if (!isCenter) scale *= 0.8;
              }

              return (
                <motion.div
                  key={domain.id}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    else if (isRight) handleNext();
                  }}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale,
                    rotateY,
                    zIndex,
                    opacity,
                    filter: `brightness(${brightness})`,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1], // Smooth spring-like mechanical deceleration
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute w-[270px] sm:w-[320px] lg:w-[350px] h-[380px] sm:h-[430px] rounded-3xl cursor-pointer ${
                    isCenter ? "pointer-events-auto" : "pointer-events-auto hover:brightness-90"
                  }`}
                >
                  {/* Glowing Floor Pedestal Shadow under Active Center Card */}
                  {isCenter && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-cyan-500/30 blur-xl rounded-full pointer-events-none" />
                  )}

                  {/* CARD ARMOR CONTAINER */}
                  <div
                    className={`w-full h-full rounded-3xl bg-[#040919]/95 border-2 p-6 flex flex-col justify-between items-center text-center relative overflow-hidden backdrop-blur-xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
                      isCenter
                        ? "border-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.5)]"
                        : "border-slate-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                    }`}
                  >
                    {/* Metallic Cyber Edge Armor Frame Texture */}
                    <img
                      src="/metallic_card_frame.png"
                      alt=""
                      className={`absolute inset-0 w-full h-full object-fill pointer-events-none mix-blend-screen transition-opacity ${
                        isCenter ? "opacity-60" : "opacity-30"
                      }`}
                    />

                    {/* Blue LED Indicators on Center Card */}
                    {isCenter && (
                      <>
                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                      </>
                    )}

                    {/* Top Icon Pod */}
                    <div
                      className={`mt-2 sm:mt-4 p-4 rounded-2xl bg-[#08132e] border transition-all duration-300 relative z-10 ${
                        isCenter
                          ? "border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.3)] scale-110"
                          : "border-slate-700"
                      }`}
                    >
                      {domain.icon}
                    </div>

                    {/* Middle Titles & Descriptions */}
                    <div className="my-auto relative z-10 px-2">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1.5">
                        {domain.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight font-sans tracking-tight mb-2">
                        {domain.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed font-normal ${
                          isCenter ? "text-slate-200 line-clamp-3" : "text-slate-400 line-clamp-2"
                        }`}
                      >
                        {domain.summary}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mb-2 w-full relative z-20 flex justify-center">
                      {isCenter ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailModalDomain(domain);
                          }}
                          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-blue-500/20 border border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-500/30 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer flex items-center gap-2 group/btn"
                        >
                          <span>Explore Domain</span>
                          <ChevronRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (isLeft) handlePrev();
                            else if (isRight) handleNext();
                          }}
                          className="px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>View</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM INTERACTION INSTRUCTIONS & PAGINATION DOTS */}
        <div className="mt-8 flex flex-col items-center gap-6 relative z-30">
          
          {/* Interaction Hints (Matching Exact Reference Image Icons & Text) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl w-full px-4">
            
            {/* Left Hint */}
            <div
              onClick={handlePrev}
              className="flex items-center justify-center gap-3 text-slate-400 text-xs font-mono cursor-pointer hover:text-cyan-300 transition-colors group"
            >
              <Pointer className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
              <span>Click or swipe to view <strong className="text-white">previous</strong></span>
            </div>

            {/* Center Hint */}
            <div
              onClick={() => setDetailModalDomain(DOMAINS[activeIndex])}
              className="flex items-center justify-center gap-3 text-slate-400 text-xs font-mono cursor-pointer hover:text-cyan-300 transition-colors group"
            >
              <Pointer className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Click center card to <strong className="text-white">explore details</strong></span>
            </div>

            {/* Right Hint */}
            <div
              onClick={handleNext}
              className="flex items-center justify-center gap-3 text-slate-400 text-xs font-mono cursor-pointer hover:text-cyan-300 transition-colors group"
            >
              <Pointer className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              <span>Click or swipe to view <strong className="text-white">next</strong></span>
            </div>

          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {DOMAINS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(idx);
                    setTimeout(() => setIsAnimating(false), 750);
                  }
                }}
                aria-label={`Go to domain ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_12px_#38bdf8]"
                    : "w-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* DOMAIN DETAILS MODAL POPUP */}
      <AnimatePresence>
        {detailModalDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#070e24] border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.5)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailModalDomain(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-[#0c1836] border border-cyan-400/40">
                  {detailModalDomain.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                    {detailModalDomain.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white">{detailModalDomain.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {detailModalDomain.details.overview}
              </p>

              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Key Capabilities & Impact</span>
              </h4>

              <div className="space-y-2.5 mb-6">
                {detailModalDomain.details.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-3">
                Suggested Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {detailModalDomain.details.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono font-bold text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

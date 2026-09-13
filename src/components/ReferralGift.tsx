"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Info } from "lucide-react";

export function ReferralGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const aboutSec = document.getElementById("about");
      const tracksSec = document.getElementById("tracks");
      
      if (aboutSec && tracksSec) {
        // threshold to show gift when scrolling into about section
        const aboutTop = aboutSec.offsetTop - (window.innerHeight * 0.7);
        // threshold to hide gift after tracks section
        const tracksBottom = tracksSec.offsetTop + tracksSec.offsetHeight - (window.innerHeight * 0.3);
        
        if (window.scrollY >= aboutTop && window.scrollY <= tracksBottom) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-hide body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRegister = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    window.history.pushState({ activePage: "register" }, "");
    window.dispatchEvent(new PopStateEvent("popstate", { state: { activePage: "register" } }));
    setIsOpen(false);
  };

  return (
    <>
      {/* FLOATING GIFT BOX */}
      <AnimatePresence>
        {!isOpen && isVisible && (
          <motion.div
            style={{ position: "fixed", bottom: "5%", right: "5%", zIndex: 99999 }}
            className="cursor-pointer group"
            onClick={handleOpen}
            initial={{ opacity: 0, scale: 0, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 40 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.12 }}
          >
            <motion.div
            animate={{
              rotate: [-5, 5, -5, 5, 0],
              y: [0, -6, 0],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 0.45, repeatDelay: 2.5 },
              y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
            }}
            style={{ position: "relative" }}
          >
            {/* Blue glow halo */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(59,130,246,0.35)",
              borderRadius: "50%",
              filter: "blur(18px)",
              transform: "scale(1.6)",
              animation: "pulse 2s infinite",
            }} />
            <img
              src="/gift.webp"
              alt="Referral Gift"
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
                filter: "drop-shadow(0 0 16px rgba(59,130,246,0.7))",
              }}
            />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN WHITE MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 95%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 95%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 95%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#03060d", overflowY: "auto" }}
            className="flex flex-col items-center py-12 px-4 sm:px-8 text-white selection:bg-blue-600 selection:text-white"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              style={{ position: "absolute", top: 24, right: 24, zIndex: 100000 }}
              className="w-12 h-12 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 transition-colors shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>

            {/* FLOATING BACKGROUND ELEMENTS */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`trophy-${i}`}
                  animate={{
                    y: ["-10vh", "110vh"],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 18 + i * 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.5,
                  }}
                  style={{
                    position: "absolute",
                    left: `${10 + i * 15}%`,
                    top: "-20%",
                    opacity: 0.04,
                  }}
                >
                  <Trophy className="w-28 h-28 text-blue-500" />
                </motion.div>
              ))}
              {["GIFTS", "REWARDS", "WIN", "REFER", "PRIZES", "GIFTS", "SHARE", "WIN"].map((word, i) => (
                <motion.div
                  key={`word-${i}`}
                  animate={{ y: ["110vh", "-10vh"] }}
                  transition={{
                    duration: 22 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 2,
                  }}
                  style={{
                    position: "absolute",
                    left: `${5 + i * 12}%`,
                    bottom: "-20%",
                    opacity: 0.02,
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "#3b82f6",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* MODAL CONTENT */}
            <div className="relative max-w-3xl w-full mt-4 flex flex-col items-center" style={{ zIndex: 10 }}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight text-center uppercase drop-shadow-md">
                  Referral Rewards
                </h2>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 text-blue-100 px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md mb-10 text-center font-bold font-sans w-full">
                <span className="text-lg sm:text-xl block text-white drop-shadow">You are going to get super cool rewards! 🎁</span>
                <span className="text-sm text-blue-300 mt-1 block">Keep referring and unlock massive surprises.</span>
              </div>

              <div className="w-full bg-[#060c1d] border border-blue-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-300 text-sm sm:text-base font-sans leading-relaxed space-y-5">
                <h3 className="text-2xl font-black text-white uppercase border-b-2 border-slate-800 pb-3 mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-400" /> Referral Gift Rules
                </h3>
                <ol className="list-decimal pl-5 space-y-4 font-medium text-slate-300">
                  <li>Each team receives a unique referral code.</li>
                  <li>Other participants can register for the hackathon using a team's referral code.</li>
                  <li>The team with the highest number of valid referrals is eligible to receive the referral gift.</li>
                  <li>Only shortlisted teams are eligible for the gift.</li>
                  <li>If a non-shortlisted team has the highest referral count, they will not be eligible for the gift. The gift will instead go to the highest-referring shortlisted team.</li>
                  <li>Fake, duplicate, spam, or otherwise invalid registrations will not be counted toward a team's referral total.</li>
                  <li>The organizers reserve the right to verify referral registrations before declaring the winner.</li>
                </ol>

                <div className="mt-8 bg-[#0a1226] border border-slate-800 p-6 rounded-2xl shadow-inner">
                  <h4 className="font-bold text-white uppercase mb-4 text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" /> Example
                  </h4>
                  <ul className="space-y-3 font-mono text-sm bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <li><span className="font-bold text-blue-400">Team A</span> — 50 valid referrals — shortlisted ✅</li>
                    <li><span className="font-bold text-slate-400">Team B</span> — 70 valid referrals — not shortlisted ❌</li>
                  </ul>
                  <p className="mt-4 font-black text-emerald-400 bg-emerald-950/40 px-4 py-3 rounded-lg border border-emerald-900/60 inline-block">
                    Winner: Team A, because Team B is not shortlisted.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center flex flex-col items-center">
                  <p className="font-bold text-slate-300 text-base mb-6">
                    In order to refer your friends and earn rewards, you must first register your team to receive your unique referral code.
                  </p>
                  <button
                    onClick={handleRegister}
                    className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-black tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    REGISTER NOW TO GET REFERRAL LINK
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReferralGift;

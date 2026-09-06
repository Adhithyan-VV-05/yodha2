"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Trophy, Share2, Copy, Check, Calendar, ExternalLink, RefreshCw, ShieldCheck } from "lucide-react";
import { validateReferralCode, getReferralsForRoom, ReferralEntryData } from "../lib/firebase";

interface ReferralRoomPageProps {
  onBack: () => void;
  referralCode: string;
}

export function ReferralRoomPage({ onBack, referralCode }: ReferralRoomPageProps) {
  const [loading, setLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState<{ teamName?: string; leaderName?: string; totalReferrals?: number } | null>(null);
  const [referrals, setReferrals] = useState<ReferralEntryData[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const cleanCode = (referralCode || "").trim().toUpperCase();
  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://yodha.aidajecc.in";
  const shareRegistrationLink = `${originUrl}/register?ref=${encodeURIComponent(cleanCode)}`;

  const fetchData = async () => {
    if (!cleanCode) return;
    setLoading(true);
    try {
      const roomRes = await validateReferralCode(cleanCode);
      if (roomRes.valid && roomRes.roomData) {
        setRoomInfo({
          teamName: roomRes.roomData.teamName,
          leaderName: roomRes.roomData.leaderName,
          totalReferrals: roomRes.roomData.totalReferrals || 0,
        });
      }
      const list = await getReferralsForRoom(cleanCode);
      setReferrals(list);
    } catch (err) {
      console.warn("Error fetching referral room data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchData();
  }, [cleanCode]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareRegistrationLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const formatTimestamp = (ts: any) => {
    if (!ts) return "Recently";
    try {
      let dateObj: Date;
      if (typeof ts === "string") {
        dateObj = new Date(ts);
      } else if (ts.seconds) {
        dateObj = new Date(ts.seconds * 1000);
      } else if (ts.toDate) {
        dateObj = ts.toDate();
      } else {
        dateObj = new Date(ts);
      }

      if (isNaN(dateObj.getTime())) return "Recently";

      return dateObj.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#03060d] text-white font-sans relative overflow-x-hidden flex flex-col justify-between select-none">
      {/* BACKGROUND SCENERY & GLOW */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
        <img
          src="/bg-hills-night-pc.webp"
          alt="Night Hills Background"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* TOP FLOATING BACK BUTTON & TITLE BAR */}
      <header className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back to Portal"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-slate-950/90 border border-blue-500/50 text-blue-300 hover:text-white hover:border-blue-400 backdrop-blur-2xl transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 text-xs font-mono font-bold gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" />
          <span>RETURN TO PORTAL</span>
        </button>

        <button
          onClick={fetchData}
          title="Refresh Referral List"
          className="p-2.5 rounded-full bg-slate-950/90 border border-blue-500/40 text-slate-300 hover:text-white hover:border-blue-400 backdrop-blur-2xl transition-all cursor-pointer shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
        </button>
      </header>

      {/* MAIN DEDICATED REFERRAL ROOM CONTENT */}
      <main className="relative z-10 w-full flex-1 max-w-5xl mx-auto px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* HEADER HERO BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#091236] via-[#050921] to-[#030616] border border-blue-500/40 text-left shadow-[0_0_50px_rgba(59,130,246,0.25)] relative overflow-hidden backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-500/20 pb-6 mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-3 py-1 rounded-md border border-blue-500/30 inline-block">
                  OFFICIAL WARRIOR REFERRAL ROOM
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase mt-2">
                  REFERRAL ROOM <span className="text-blue-400">{cleanCode}</span>
                </h1>
                {roomInfo && (
                  <p className="text-sm text-slate-300 font-sans mt-1">
                    Room Captain: <strong className="text-white">{roomInfo.leaderName}</strong> &nbsp;|&nbsp; Team: <strong className="text-blue-300">{roomInfo.teamName}</strong>
                  </p>
                )}
              </div>

              {/* TOTAL TEAMS REGISTERED BADGE */}
              <div className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500/50 text-center shrink-0 w-full sm:w-auto min-w-[140px]">
                <span className="text-[9px] font-mono text-blue-300 uppercase tracking-widest block font-bold">
                  REFERRED TEAMS
                </span>
                <span className="text-3xl sm:text-4xl font-black font-mono text-white block mt-0.5">
                  {referrals.length}
                </span>
              </div>
            </div>

            {/* QUICK LINK SHARE & COPY BAR */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3 truncate">
                <Share2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 truncate font-sans text-xs">{shareRegistrationLink}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`🚀 Join YODHA 2.0 – Warriors of AI Hackathon!\n\nUse my Warrior Referral Code: ${cleanCode}\n\nRegister your team here:\n${shareRegistrationLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* REFERRED TEAMS LIST TABLE / CARDS */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-blue-500/30 backdrop-blur-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="font-bold text-slate-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>REFERRED TEAMS ROSTER ({referrals.length})</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider hidden sm:inline">
                PRIVACY PROTECTED (CAPTAIN & REGISTRATION TIMESTAMP ONLY)
              </span>
            </div>

            {loading ? (
              <div className="py-16 text-center text-slate-400 font-mono text-xs animate-pulse">
                Fetching referred teams from Firestore database...
              </div>
            ) : referrals.length === 0 ? (
              <div className="py-14 px-4 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-white">No teams registered under code {cleanCode} yet</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Share your referral link on WhatsApp or email! Once another team registers using your code, their team name, captain, and registration time will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {referrals.map((item, idx) => (
                  <div
                    key={item.teamId || idx}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono hover:border-blue-400/50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 shrink-0 text-xs">
                        #{idx + 1}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-white text-base truncate">{item.teamName}</span>
                        <span className="text-slate-400 text-xs truncate">
                          Team Captain: <strong className="text-slate-200">{item.leaderName}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-xs shrink-0 self-end sm:self-center bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{formatTimestamp(item.registeredAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full px-4 py-6 text-center text-xs font-mono text-slate-500">
        YODHA 2.0 • WARRIORS OF AI • OFFICIAL REFERRAL PORTAL
      </footer>
    </div>
  );
}

export default ReferralRoomPage;

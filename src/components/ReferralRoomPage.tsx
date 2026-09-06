"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Share2, Copy, Check, Calendar, ExternalLink, RefreshCw, ShieldCheck, Trophy, Sparkles } from "lucide-react";
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
  // Always use yodha.aidajecc.in domain everywhere
  const shareRegistrationLink = `https://yodha.aidajecc.in/register?ref=${encodeURIComponent(cleanCode)}`;

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
      {/* BACKGROUND SCENERY & GLOW MATCHING MAIN SITE */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
        <img
          src="/bg-hills-night-pc.webp"
          alt="Night Hills Background"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[200px] pointer-events-none" />
      </div>

      {/* TOP FLOATING NAVIGATION BAR */}
      <header className="relative z-30 max-w-6xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Return to Main Portal"
          className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-full bg-slate-950/90 border border-blue-500/50 text-blue-300 hover:text-white hover:border-blue-400 backdrop-blur-2xl transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 text-xs font-mono font-bold gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" />
          <span>RETURN TO PORTAL</span>
        </button>

        <div className="flex items-center gap-3">
          <img src="/New YODHA 2.0 Title.webp" alt="YODHA 2.0" className="h-8 sm:h-10 w-auto object-contain hidden sm:block" />
          <button
            onClick={fetchData}
            title="Refresh Referral List"
            className="p-2.5 rounded-full bg-slate-950/90 border border-blue-500/40 text-slate-300 hover:text-white hover:border-blue-400 backdrop-blur-2xl transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
        </div>
      </header>

      {/* MAIN DEDICATED REFERRAL ROOM CONTENT */}
      <main className="relative z-10 w-full flex-1 max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* HEADER HERO BANNER — YODHA WARRIOR STYLE */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0a1233]/90 via-[#050a21]/95 to-[#020512]/95 border-2 border-blue-500/40 text-left shadow-[0_0_60px_rgba(59,130,246,0.3)] overflow-hidden backdrop-blur-3xl">
            {/* CORNER GLOW BADGES */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* TOP TITLE ROW */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-blue-500/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-extrabold text-blue-400 uppercase tracking-[0.2em] bg-blue-950/90 px-3 py-1 rounded-lg border border-blue-500/40">
                    OFFICIAL WARRIOR REFERRAL ROOM
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ACTIVE PORTAL</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight uppercase mt-2">
                  REFERRAL ROOM <span className="text-blue-400">{cleanCode}</span>
                </h1>

                {roomInfo && (
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Room Captain: <strong className="text-white font-bold">{roomInfo.leaderName}</strong> &nbsp;|&nbsp; Team: <strong className="text-blue-300 font-bold">{roomInfo.teamName}</strong>
                  </p>
                )}
              </div>

              {/* TOTAL TEAMS REGISTERED STAT BOX */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/90 to-slate-950/90 border border-blue-400/40 text-center shrink-0 w-full md:w-auto min-w-[180px] shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block font-bold">
                  TOTAL REFERRED TEAMS
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono text-white block mt-1">
                  {referrals.length}
                </span>
              </div>
            </div>

            {/* ACTION BAR: COPY & SHARE LINK */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex-1 bg-black/60 border border-blue-500/30 rounded-2xl px-4 py-3 font-mono text-xs text-slate-300 flex items-center gap-3 truncate">
                <Share2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate font-sans font-medium text-white">{shareRegistrationLink}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `🚀 Join YODHA 2.0 – Warriors of AI Hackathon!\n\nUse my Warrior Referral Code: ${cleanCode}\n\nRegister your team here:\n${shareRegistrationLink}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                  <span>Share via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* UNIFIED WARRIOR ROSTER TABLE */}
          <div className="w-full bg-[#050a1d]/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-blue-500/20 mb-6 gap-2">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-black font-heading text-white uppercase tracking-tight">
                  REFERRED TEAMS ROSTER ({referrals.length})
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                PRIVACY PROTECTED (CAPTAIN & REGISTRATION TIMESTAMP ONLY)
              </span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-blue-400 font-mono text-xs animate-pulse tracking-wider">
                FETCHING REFERRED TEAMS FROM FIREBASE...
              </div>
            ) : referrals.length === 0 ? (
              <div className="py-16 px-4 text-center rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <Users className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-lg font-bold text-white">No teams registered under code {cleanCode} yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Share your referral link on WhatsApp or email! Once another team registers using your code, their team name, captain, and registration time will automatically appear here.
                </p>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `🚀 Join YODHA 2.0 – Warriors of AI Hackathon!\n\nUse my Warrior Referral Code: ${cleanCode}\n\nRegister your team here:\n${shareRegistrationLink}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-md mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Share Link on WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-blue-500/30 text-[11px] text-blue-300 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">RANK #</th>
                      <th className="py-3 px-4">REGISTERED TEAM NAME</th>
                      <th className="py-3 px-4">TEAM CAPTAIN</th>
                      <th className="py-3 px-4 text-right">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs">
                    {referrals.map((item, idx) => (
                      <tr
                        key={item.teamId || idx}
                        className="hover:bg-blue-950/30 transition-colors group"
                      >
                        <td className="py-4 px-4 font-black text-blue-400">
                          <span className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/30 inline-flex items-center justify-center">
                            #{idx + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-black text-white text-sm group-hover:text-blue-300 transition-colors">
                          {item.teamName}
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-medium">
                          {item.leaderName}
                        </td>
                        <td className="py-4 px-4 text-right text-slate-400 text-[11px]">
                          <span className="inline-flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                            <Calendar className="w-3 h-3 text-blue-400" />
                            <span>{formatTimestamp(item.registeredAt)}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-4 py-8 text-center text-xs font-mono text-slate-500 border-t border-slate-900 mt-8">
        YODHA 2.0 • WARRIORS OF AI • OFFICIAL REFERRAL PORTAL
      </footer>
    </div>
  );
}

export default ReferralRoomPage;

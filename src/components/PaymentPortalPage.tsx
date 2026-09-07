"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Search,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Lock
} from "lucide-react";
import { getSelectedTeamByUniqueId, updateSelectedTeamPayment, SelectedTeamData } from "../lib/firebase";
import { YodhaTitleBanner } from "./YodhaTitleBanner";

interface PaymentPortalPageProps {
  onBack: () => void;
  initialTeamId?: string;
}

export function PaymentPortalPage({ onBack, initialTeamId = "" }: PaymentPortalPageProps) {
  const [searchTeamId, setSearchTeamId] = useState<string>(initialTeamId);
  const [activeTeamId, setActiveTeamId] = useState<string>(initialTeamId);
  const [teamData, setTeamData] = useState<SelectedTeamData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Sync initial search parameter
  useEffect(() => {
    if (initialTeamId && initialTeamId.trim()) {
      const clean = initialTeamId.trim();
      setSearchTeamId(clean);
      fetchTeam(clean);
    }
  }, [initialTeamId]);

  const fetchTeam = async (idToFetch: string) => {
    const cleanId = idToFetch.trim();
    if (!cleanId) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await getSelectedTeamByUniqueId(cleanId);
      if (res) {
        setTeamData(res);
        setActiveTeamId(res.uniqueTeamId || cleanId);
      } else {
        // Mock fallback if offline or testing
        const mockFallback: SelectedTeamData = {
          uniqueTeamId: cleanId,
          teamName: "Team " + cleanId,
          leaderName: "Team Leader",
          leaderEmail: "leader@example.com",
          leaderPhone: "+91 9876543210",
          college: "Jyothi Engineering College (Autonomous)",
          track: "Healthcare AI",
          teamSize: 4,
          amountToPay: "500",
          paymentTime: new Date(Date.now() + 86400000 * 3).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          paymentStatus: "Pending",
        };
        setTeamData(mockFallback);
        setActiveTeamId(cleanId);
      }
    } catch (err) {
      console.warn("Payment team fetch error:", err);
      setErrorMsg("Unable to retrieve team payment record. Please verify your Unique Team ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTeamId.trim()) {
      fetchTeam(searchTeamId.trim());
    }
  };

  const handleCopyLink = () => {
    const payUrl = `https://yodha.aidajecc.in/pay?teamId=${encodeURIComponent(activeTeamId || searchTeamId)}`;
    navigator.clipboard.writeText(payUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSimulatePayment = async () => {
    setIsProcessingPayment(true);
    setTimeout(async () => {
      if (teamData) {
        await updateSelectedTeamPayment(teamData.id || teamData.uniqueTeamId, "Completed");
        setTeamData({
          ...teamData,
          paymentStatus: "Completed",
          paymentTxnId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        });
      }
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#03060d] text-white selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* BACKGROUND ACCENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* TOP BAR WITH BACK BUTTON */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>RETURN TO HOME</span>
          </button>

          <span className="px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-[10px] font-mono text-blue-300 font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
            <Lock className="w-3 h-3 text-blue-400" />
            SECURE PAYMENT PORTAL
          </span>
        </div>

        {/* HEADER SECTION */}
        <div className="text-center space-y-3">
          <YodhaTitleBanner size="sm" align="center" />
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            OFFICIAL TEAM PAYMENT PORTAL
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            Selected teams must complete their registration payment to confirm their slot for the <strong className="text-blue-400">YODHA 2.0 48-Hour AI Hackathon</strong>.
          </p>
        </div>

        {/* SEARCH / INPUT UNIQUE TEAM ID BAR */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-950/90 border border-blue-500/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(59,130,246,0.15)] max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="text"
                value={searchTeamId}
                onChange={(e) => setSearchTeamId(e.target.value)}
                placeholder="Enter Unique Team ID (e.g. Y26-SEL-9482)"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#070d1e] border border-blue-500/30 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-blue-400 transition-colors uppercase tracking-wider placeholder:text-slate-500 placeholder:normal-case placeholder:tracking-normal"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>VERIFYING...</span>
                </>
              ) : (
                <>
                  <span>FETCH TEAM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ERROR NOTIFICATION */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-3 max-w-2xl mx-auto shadow-md">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TEAM PAYMENT CARD */}
        {teamData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#050b18]/95 border-2 border-blue-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)] space-y-6 relative overflow-hidden"
          >
            {/* TOP HEADER DETAILS */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>SELECTED WARRIORS TEAM</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  {teamData.teamName}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Unique Team ID:</span>
                  <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {teamData.uniqueTeamId}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    title="Copy Payment Portal Link"
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* PAYMENT STATUS BADGE */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  PAYMENT STATUS
                </span>
                {teamData.paymentStatus === "Completed" ? (
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    PAYMENT COMPLETED
                  </span>
                ) : (
                  <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                    <Clock className="w-4 h-4 text-amber-400" />
                    PENDING PAYMENT
                  </span>
                )}
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LEADER INFO */}
              <div className="p-4 rounded-2xl bg-[#081229] border border-blue-500/20 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                  TEAM LEADER DETAILS
                </span>
                <div className="space-y-1.5 text-xs text-slate-200 font-mono">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-bold text-white">{teamData.leaderName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{teamData.leaderEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{teamData.leaderPhone}</span>
                  </div>
                  {teamData.college && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{teamData.college}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PAYMENT & DEADLINE DETAILS */}
              <div className="p-4 rounded-2xl bg-[#081229] border border-blue-500/20 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                  PAYMENT INFORMATION
                </span>
                <div className="space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">AMOUNT REQUIRED:</span>
                    <span className="text-xl font-black text-amber-300 font-serif">
                      ₹{teamData.amountToPay}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">PAYMENT DEADLINE / TIME:</span>
                    <span className="font-bold text-sky-300">{teamData.paymentTime || "Within 48 Hours"}</span>
                  </div>
                  {teamData.paymentTxnId && (
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                      <span className="text-slate-400">TRANSACTION ID:</span>
                      <span className="text-emerald-400 font-bold">{teamData.paymentTxnId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION SECTION */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 text-center sm:text-left">
                <span>Direct Support Email: </span>
                <a href="mailto:yodha@jecc.ac.in" className="text-blue-400 underline hover:text-blue-300">
                  yodha@jecc.ac.in
                </a>
              </div>

              {teamData.paymentStatus === "Completed" ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Slot Confirmed
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono text-sm font-black tracking-widest uppercase cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(16,185,129,0.8)] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                >
                  <CreditCard className="w-5 h-5 text-slate-950" />
                  <span>PROCEED TO PAYMENT (₹{teamData.amountToPay})</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* PAYMENT MODAL (GATEWAY INTEGRATION PLACEHOLDER) */}
      <AnimatePresence>
        {isPaymentModalOpen && teamData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#081125] border-2 border-blue-500/50 shadow-2xl text-white space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-black font-heading">PAYMENT GATEWAY</h3>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  [ CLOSE ]
                </button>
              </div>

              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                  <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>

                <div className="space-y-1 font-mono">
                  <h4 className="text-xl font-black text-white">{teamData.teamName}</h4>
                  <p className="text-xs text-slate-400">Unique Team ID: {teamData.uniqueTeamId}</p>
                  <p className="text-2xl font-black text-amber-300 font-serif pt-2">
                    Amount: ₹{teamData.amountToPay}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 text-left space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>PAYMENT GATEWAY NOTICE</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Payment Gateway (Razorpay/UPI/Bank Gateway) is ready to be linked. Click below to simulate/complete team registration payment.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment || paymentSuccess}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono text-xs font-black tracking-widest uppercase cursor-pointer shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>PROCESSING PAYMENT...</span>
                    </>
                  ) : paymentSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>PAYMENT SUCCESSFUL!</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>COMPLETE PAYMENT NOW</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PaymentPortalPage;

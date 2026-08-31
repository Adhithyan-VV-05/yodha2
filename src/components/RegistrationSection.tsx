import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, X, Users, Shield, ShieldCheck, ArrowRight, Mail, Sparkles, ChevronRight, Search, Check, Copy, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { saveTeamToFirebase, isTeamNameTaken, validateReferralCode, checkParticipantDuplicate } from "../lib/firebase";
import type { TeamRegistrationData, TeamMember } from "../lib/firebase";
import { submitTeamToGoogleForms } from "../lib/googleForms";
import { sendTeamWelcomeEmails } from "../lib/emailService";
import { YodhaImage } from "./YodhaImage";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  ENVIRONMENTAL_PROBLEM_STATEMENTS,
  HEALTHCARE_STYLES,
  ENVIRONMENTAL_STYLES,
  getPSImage,
} from "../data/problemStatements";
import type { ProblemStatement, ProblemStatementStyle } from "../data/problemStatements";

interface RegistrationSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedTrack?: string;
}

export function RegistrationSection({ isOpen = true, onClose, selectedTrack = "Healthcare AI" }: RegistrationSectionProps) {
  if (onClose && !isOpen) return null;
  const [currentStep, setCurrentStep] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Form State
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [track, setTrack] = useState(selectedTrack);
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

  // PS Picker Modal State (No Animation, High Z-Index 999999)
  const [psModalOpen, setPsModalOpen] = useState(false);
  const [psSearchQuery, setPsSearchQuery] = useState("");
  const [psCategoryFilter, setPsCategoryFilter] = useState<"All" | "Healthcare" | "Environmental">("All");

  // Leader State
  const [leader, setLeader] = useState<TeamMember>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    gender: "Male",
    yearOfStudy: "3rd Year",
    githubUrl: "",
  });

  // Additional Members State
  const [members, setMembers] = useState<TeamMember[]>([
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
  ]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [checkingTeamName, setCheckingTeamName] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [_emailStatus, setEmailStatus] = useState<{ dispatched: boolean; count: number }>({ dispatched: false, count: 0 });
  const [teamPassId, setTeamPassId] = useState("");

  // Warrior Referral System State
  const [usedReferralCode, setUsedReferralCode] = useState("");
  const [referralCheckState, setReferralCheckState] = useState<{
    status: "idle" | "checking" | "valid" | "invalid";
    message?: string;
    ownerName?: string;
  }>({ status: "idle" });

  // Field Duplicate Errors & Loading State
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [checkingFields, setCheckingFields] = useState<Record<string, boolean>>({});

  // Generated Referral Code on Success
  const [generatedReferralCode, setGeneratedReferralCode] = useState("");
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);

  // Validate Entered Warrior Referral Code on Click of Verify Logo/Button
  const handleVerifyReferralCode = async (codeVal: string) => {
    const trimmed = codeVal.trim().toUpperCase();
    if (!trimmed) {
      setReferralCheckState({
        status: "invalid",
        message: "Please enter a Warrior Referral Code before clicking Verify.",
      });
      return;
    }

    setReferralCheckState({ status: "checking", message: "Scanning database..." });

    // Smooth scanning feedback delay (~650ms)
    const [res] = await Promise.all([
      validateReferralCode(trimmed),
      new Promise((r) => setTimeout(r, 650)),
    ]);

    if (res.valid && res.roomData) {
      setReferralCheckState({
        status: "valid",
        ownerName: res.roomData.teamName,
        message: `✓ Valid Warrior Code! (Referred by Team "${res.roomData.teamName}")`,
      });
    } else {
      // Clear input field if invalid as requested by user!
      setUsedReferralCode("");
      setReferralCheckState({
        status: "invalid",
        message: "❌ Invalid Warrior Code! Code not found in database. Field cleared.",
      });
    }
  };

  // Real-time Field Duplicate Validation (In-form + Database)
  const validateFieldInFormAndDB = async (
    fieldKey: string,
    value: string,
    fieldType: "email" | "phone",
    _targetRole?: string
  ) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[fieldKey];
        return copy;
      });
      return;
    }

    // 1. In-Form Duplicate Check across all active team members
    const activeMembers = members.slice(0, teamSize - 1);
    const allFormFields: { key: string; val: string; type: "email" | "phone"; label: string }[] = [
      { key: "leader_email", val: leader.email.trim().toLowerCase(), type: "email", label: "Leader Email" },
      { key: "leader_phone", val: leader.phone.trim(), type: "phone", label: "Leader Mobile" },
      ...activeMembers.map((m, i) => ({
        key: `member_${i}_email`,
        val: m.email.trim().toLowerCase(),
        type: "email" as const,
        label: `Member #${i + 2} Email`,
      })),
      ...activeMembers.map((m, i) => ({
        key: `member_${i}_phone`,
        val: m.phone.trim(),
        type: "phone" as const,
        label: `Member #${i + 2} Mobile`,
      })),
    ];

    const currentVal = fieldType === "email" ? trimmed.toLowerCase() : trimmed;
    const inFormMatch = allFormFields.find(
      (f) => f.key !== fieldKey && f.type === fieldType && f.val && f.val === currentVal
    );

    if (inFormMatch) {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldKey]: `This ${fieldType === "email" ? "email" : "mobile number"} is used by another member in your team (${inFormMatch.label}).`,
      }));
      return;
    }

    // Clear in-form error if no duplicate inside the current form
    setFieldErrors((prev) => {
      const copy = { ...prev };
      if (copy[fieldKey] && copy[fieldKey].includes("used by another member")) {
        delete copy[fieldKey];
      }
      return copy;
    });

    // 2. Database Duplicate Check in Firestore
    setCheckingFields((prev) => ({ ...prev, [fieldKey]: true }));

    try {
      const dupCheck = await checkParticipantDuplicate(
        fieldType === "email" ? trimmed : undefined,
        fieldType === "phone" ? trimmed : undefined
      );

      if (fieldType === "email" && dupCheck.isEmailTaken) {
        setFieldErrors((prev) => ({ ...prev, [fieldKey]: "This email address is already registered." }));
      } else if (fieldType === "phone" && dupCheck.isPhoneTaken) {
        setFieldErrors((prev) => ({ ...prev, [fieldKey]: "This mobile number is already registered." }));
      } else {
        setFieldErrors((prev) => {
          const copy = { ...prev };
          delete copy[fieldKey];
          return copy;
        });
      }
    } catch (err) {
      console.warn("Error running field duplicate check:", err);
    } finally {
      setCheckingFields((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };

  // All 20 Problem Statements & Styles Maps
  const allProblemStatements: ProblemStatement[] = [
    ...HEALTHCARE_PROBLEM_STATEMENTS,
    ...ENVIRONMENTAL_PROBLEM_STATEMENTS,
  ];

  const healthcareStylesMap: Record<number, ProblemStatementStyle> = HEALTHCARE_STYLES.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );
  const environmentalStylesMap: Record<number, ProblemStatementStyle> = ENVIRONMENTAL_STYLES.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

  const getStyleForPS = (st: ProblemStatement): ProblemStatementStyle => {
    const map = st.id <= 10 ? healthcareStylesMap : environmentalStylesMap;
    return (
      map[st.id] || {
        id: st.id,
        theme: "Default",
        primary: st.id <= 10 ? "#EF4444" : "#10B981",
        secondary: st.id <= 10 ? "#F87171" : "#34D399",
        accent: st.id <= 10 ? "#FCA5A5" : "#6EE7B7",
        background: st.id <= 10 ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
        border: st.id <= 10 ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)",
        heading: "#FFFFFF",
        content: "#E2E8F0",
        button: st.id <= 10 ? "#DC2626" : "#059669",
        buttonHover: st.id <= 10 ? "#B91C1C" : "#047857",
        glow: st.id <= 10 ? "rgba(239,68,68,0.45)" : "rgba(16,185,129,0.45)",
      }
    );
  };

  const filteredProblemStatements = allProblemStatements.filter((st) => {
    const matchesCategory =
      psCategoryFilter === "All" ||
      (psCategoryFilter === "Healthcare" && st.id <= 10) ||
      (psCategoryFilter === "Environmental" && st.id > 10);

    const q = psSearchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      st.title.toLowerCase().includes(q) ||
      `id #${st.id}`.includes(q) ||
      st.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLeader({ ...leader, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setMembers(updated);
  };

  // Step 1 Validation & Team Name Availability Check
  const handleNextFromStep1 = async () => {
    if (!teamName.trim()) {
      setErrorMessage("Please enter your Team Name.");
      return;
    }

    if (!selectedPS) {
      setErrorMessage("Please click 'Select the PS' to choose a problem statement before proceeding.");
      return;
    }

    if (usedReferralCode.trim()) {
      if (referralCheckState.status === "checking") {
        setErrorMessage("Validating Warrior Referral Code, please wait...");
        return;
      }
      if (referralCheckState.status === "invalid") {
        setErrorMessage("Invalid Referral Code. Please clear or correct the code to proceed.");
        return;
      }
    }

    setCheckingTeamName(true);
    setErrorMessage("");

    try {
      const taken = await isTeamNameTaken(teamName.trim());
      setCheckingTeamName(false);

      if (taken) {
        setErrorMessage("This team name is not available. Please choose another team name.");
        return;
      }

      setErrorMessage("");
      setCurrentStep(2);
    } catch (err: any) {
      setCheckingTeamName(false);
      setErrorMessage(err.message || "Failed to check team name availability.");
    }
  };

  // Final Form Submission
  const handleSubmitRegistration = async () => {
    // Check if any field errors exist
    if (Object.keys(fieldErrors).length > 0) {
      setErrorMessage("Please resolve all duplicate email and phone errors before submitting.");
      return;
    }

    // Check if referral code is invalid
    if (usedReferralCode.trim() && referralCheckState.status === "invalid") {
      setErrorMessage("Invalid Warrior Referral Code. Please verify the code before submitting.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const activeMembers = members.slice(0, teamSize - 1);
    const fullTrackName = selectedPS
      ? `${selectedPS.category} AI - [ID #${selectedPS.id}] ${selectedPS.title}`
      : track;

    const payload: TeamRegistrationData = {
      teamName,
      teamSize,
      track: fullTrackName,
      problemStatementId: selectedPS?.id,
      problemStatementTitle: selectedPS?.title,
      leader,
      members: activeMembers,
      usedReferralCode: usedReferralCode.trim().toUpperCase() || undefined,
    };

    try {
      const saveRes = await saveTeamToFirebase(payload);
      if (!saveRes.success) {
        setStatus("error");
        setErrorMessage(saveRes.error || "Failed to submit team registration.");
        return;
      }

      await submitTeamToGoogleForms(payload);

      const allParticipants = [
        { fullName: leader.fullName, email: leader.email, role: "Leader" as const, phone: leader.phone, organization: leader.organization },
        ...activeMembers.map((m) => ({ fullName: m.fullName, email: m.email, role: "Member" as const, phone: m.phone, organization: m.organization })),
      ];

      const emailResult = await sendTeamWelcomeEmails({
        teamName,
        track: fullTrackName,
        participants: allParticipants,
        warriorReferralCode: saveRes.warriorReferralCode,
      });

      setEmailStatus({ dispatched: emailResult.success, count: emailResult.dispatchedTo.length });
      setTeamPassId("YODHA-" + Math.floor(100000 + Math.random() * 900000));
      if (saveRes.warriorReferralCode) {
        setGeneratedReferralCode(saveRes.warriorReferralCode);
      }
      setStatus("success");

      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#c084fc", "#34d399", "#fbbf24"],
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit team registration.");
    }
  };

  if (isCollapsed && !onClose) {
    return (
      <section id="register" className="py-12 bg-[#04060b] text-center">
        <button
          onClick={() => setIsCollapsed(false)}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
        >
          Open Registration Form
        </button>
      </section>
    );
  }

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#090c16]/95 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] max-w-2xl w-full mx-auto overflow-hidden"
    >
      {/* Moving Ambient Aura Light inside Form */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header with YODHA Helmet Logo & Close Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-400/50 bg-[#020510] p-1.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            <img src="/logo.webp" alt="YODHA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-0.5 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>TEAM REGISTRATION PORTAL</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Register Team for <span className="text-cyan-400">YODHA 2.0</span>
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Submission Success Screen */}
      {status === "success" ? (
        <div className="py-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h4 className="text-2xl sm:text-3xl font-black text-white">REGISTRATION CONFIRMED!</h4>
          <p className="text-sm text-slate-300 mt-1 max-w-md">
            Welcome to Yodha 2.0! Your team record has been saved and welcome emails have been dispatched.
          </p>

          <div className="mt-4 flex items-start gap-3 px-4.5 py-3 bg-emerald-950/80 border border-emerald-400/60 rounded-xl text-xs font-mono text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-left max-w-lg">
            <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="font-bold text-white block text-xs uppercase tracking-wider">CONFIRMATION EMAIL SENT TO LEADER</span>
              <span className="text-emerald-300/90 text-[11px] font-sans leading-relaxed block mt-0.5">
                A detailed confirmation pass & full submission summary have been sent to Team Leader: <strong className="text-white">{leader.fullName}</strong> ({leader.email}).
              </span>
            </div>
          </div>

          {/* Digital Team Pass */}
          <div className="mt-8 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black border-2 border-sky-500/50 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  OFFICIAL HACKER PASS
                </span>
                <h5 className="text-xl font-bold text-white mt-0.5">{teamName}</h5>
              </div>
              <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/80 px-3 py-1 rounded border border-sky-500/40">
                {teamPassId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div>
                <span className="text-slate-500 block mb-0.5">TEAM LEADER</span>
                <span className="text-white font-bold">{leader.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">PROBLEM STATEMENT</span>
                <span className="text-sky-300 font-semibold">{selectedPS ? `[ID #${selectedPS.id}] ${selectedPS.title}` : track}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">TEAM SIZE</span>
                <span className="text-slate-200">{teamSize} Participants</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">ORGANIZATION</span>
                <span className="text-slate-200">{leader.organization}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400 font-semibold">✓ Official Yodha 2.0 Registration</span>
              <Mail className="w-4 h-4 text-sky-400" />
            </div>
          </div>

          {/* Warrior Referral Code Card on Success */}
          {generatedReferralCode && (
            <div className="mt-6 w-full p-4.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-purple-500/10 border border-amber-400/50 text-left relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>YOUR WARRIOR REFERRAL CODE</span>
                </span>
                <span className="text-[10px] font-mono bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 font-bold">
                  REFERRAL ROOM ACTIVE
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-black/70 p-3 rounded-xl border border-amber-400/30">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                  {generatedReferralCode}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedReferralCode);
                    setCopiedReferralCode(true);
                    setTimeout(() => setCopiedReferralCode(false), 2500);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-lg flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.4)] shrink-0"
                >
                  {copiedReferralCode ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                Share this code with other teams! Every team that registers using your referral code will enter your Warrior Referral Room and climb your referral rank.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setCurrentStep(1);
              setStatus("idle");
              setTeamName("");
              setSelectedPS(null);
              setUsedReferralCode("");
              setReferralCheckState({ status: "idle" });
              setGeneratedReferralCode("");
              setFieldErrors({});
            }}
            className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Register Another Team
          </button>
        </div>
      ) : (
        <>
          {/* Step Progress Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            {Array.from({ length: teamSize + 1 }).map((_, idx) => {
              const stepNum = idx + 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: currentStep === stepNum ? 1.15 : 1,
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      currentStep === stepNum
                        ? "bg-sky-400 text-black shadow-[0_0_20px_#38bdf8]"
                        : currentStep > stepNum
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-white/5 text-slate-500 border border-white/10"
                    }`}
                  >
                    {stepNum}
                  </motion.div>
                  {idx < teamSize && <div className="w-6 sm:w-12 h-[2px] bg-white/10 hidden sm:block" />}
                </div>
              );
            })}
          </div>

          {/* Warning Banner */}
          {errorMessage && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs font-medium text-rose-200 flex items-center gap-2.5 shadow-lg">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* STEP 1: Team Basics, Problem Statement Picker & Warrior Referral Code */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" /> Step 1: Team & Problem Statement
              </h4>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Team Name *</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="e.g. CyberKnights"
                  className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                    errorMessage.includes("not available")
                      ? "border-rose-500 focus:border-rose-400"
                      : "border-white/10 focus:border-sky-400"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Team Size *</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value={1}>1 Participant (Solo Entry)</option>
                    <option value={2}>2 Members</option>
                    <option value={3}>3 Members</option>
                    <option value={4}>4 Members (Full Team)</option>
                  </select>
                </div>

                {/* Problem Statement Selection Button */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Problem Statement (PS) *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setPsModalOpen(true);
                      if (errorMessage) setErrorMessage("");
                    }}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-sky-400/40 hover:border-sky-400 rounded-xl text-sm font-medium text-white flex items-center justify-between transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.15)] group"
                  >
                    {selectedPS ? (
                      <span className="flex items-center gap-2 truncate text-left">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-sky-500/20 text-sky-300 border border-sky-400/40 shrink-0">
                          ID #{selectedPS.id}
                        </span>
                        <span className="truncate text-xs font-bold text-white">{selectedPS.title}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300 font-bold flex items-center gap-2 text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <span>Select the PS</span>
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-sky-400 shrink-0 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Show Selected PS Details summary with Image Thumbnail Card if picked */}
              {selectedPS && (
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-sky-400/40 text-xs flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3 truncate">
                    {/* Image Thumbnail Card */}
                    <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border border-sky-400/40 shrink-0 relative shadow-md bg-black/60">
                      <YodhaImage src={getPSImage(selectedPS)} alt={selectedPS.title} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-black/80 text-sky-300 border border-sky-400/40">
                        #{selectedPS.id}
                      </div>
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">
                        SELECTED PROBLEM STATEMENT
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm truncate block">{selectedPS.title}</span>
                      <span className="text-[10px] font-mono text-slate-300 block">{selectedPS.category} AI Track</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPsModalOpen(true)}
                    className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 rounded-xl text-sky-300 text-[11px] font-mono font-bold shrink-0 ml-3 cursor-pointer transition-colors shadow"
                  >
                    Change PS
                  </button>
                </div>
              )}

              {/* Warrior Referral Code Input Field (Optional) with VERIFY Logo Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>Warrior Referral Code (Optional)</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={usedReferralCode}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setUsedReferralCode(val);
                      if (!val.trim()) {
                        setReferralCheckState({ status: "idle" });
                      }
                    }}
                    placeholder="e.g. WARR-X8K9"
                    className={`flex-1 px-4 py-3 bg-white/[0.04] border rounded-xl text-sm font-mono text-white uppercase focus:outline-none transition-all ${
                      referralCheckState.status === "valid"
                        ? "border-emerald-500/80 focus:border-emerald-400 bg-emerald-950/20"
                        : referralCheckState.status === "invalid"
                        ? "border-rose-500/80 focus:border-rose-400 bg-rose-950/20"
                        : "border-white/10 focus:border-amber-400"
                    }`}
                  />

                  {/* VERIFY Logo / Button */}
                  <button
                    type="button"
                    onClick={() => handleVerifyReferralCode(usedReferralCode)}
                    disabled={referralCheckState.status === "checking"}
                    className={`px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg ${
                      referralCheckState.status === "checking"
                        ? "bg-amber-500/20 border border-amber-400/40 text-amber-300 cursor-wait"
                        : referralCheckState.status === "valid"
                        ? "bg-emerald-500/20 border border-emerald-400/60 text-emerald-300"
                        : "bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                    }`}
                  >
                    {referralCheckState.status === "checking" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Scanning...</span>
                      </>
                    ) : referralCheckState.status === "valid" ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>VERIFIED</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>VERIFY</span>
                      </>
                    )}
                  </button>
                </div>

                {referralCheckState.status === "valid" && (
                  <p className="text-xs text-emerald-400 font-mono mt-2 flex items-center gap-1.5 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{referralCheckState.message}</span>
                  </p>
                )}

                {referralCheckState.status === "invalid" && (
                  <p className="text-xs text-rose-400 font-mono mt-2 flex items-center gap-1.5 bg-rose-950/50 p-2.5 rounded-lg border border-rose-500/40">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{referralCheckState.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  disabled={checkingTeamName || referralCheckState.status === "checking"}
                  className="btn-metallic-silver px-8 py-3.5 text-xs rounded-xl flex items-center gap-2 uppercase tracking-widest cursor-pointer disabled:opacity-50"
                >
                  {checkingTeamName ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <>
                      <span>Next: Leader Details</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Team Leader Details with Real-time Duplicate Check */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" /> Step 2: Team Leader Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={leader.fullName}
                    onChange={handleLeaderChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-slate-300">Email Address *</label>
                    {checkingFields["leader_email"] && (
                      <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin text-sky-400" /> Verifying...
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    required
                    name="email"
                    value={leader.email}
                    onChange={(e) => {
                      handleLeaderChange(e);
                      validateFieldInFormAndDB("leader_email", e.target.value, "email", "Leader");
                    }}
                    onBlur={(e) => validateFieldInFormAndDB("leader_email", e.target.value, "email", "Leader")}
                    placeholder="leader@example.com"
                    className={`w-full px-4 py-2.5 bg-white/[0.04] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                      fieldErrors["leader_email"]
                        ? "border-rose-500/80 focus:border-rose-400 bg-rose-950/20"
                        : "border-white/10 focus:border-sky-400"
                    }`}
                  />
                  {fieldErrors["leader_email"] && (
                    <p className="text-xs text-rose-400 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{fieldErrors["leader_email"]}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-slate-300">Phone / WhatsApp *</label>
                    {checkingFields["leader_phone"] && (
                      <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin text-sky-400" /> Verifying...
                      </span>
                    )}
                  </div>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={leader.phone}
                    onChange={(e) => {
                      handleLeaderChange(e);
                      validateFieldInFormAndDB("leader_phone", e.target.value, "phone", "Leader");
                    }}
                    onBlur={(e) => validateFieldInFormAndDB("leader_phone", e.target.value, "phone", "Leader")}
                    placeholder="+91 9876543210"
                    className={`w-full px-4 py-2.5 bg-white/[0.04] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                      fieldErrors["leader_phone"]
                        ? "border-rose-500/80 focus:border-rose-400 bg-rose-950/20"
                        : "border-white/10 focus:border-sky-400"
                    }`}
                  />
                  {fieldErrors["leader_phone"] && (
                    <p className="text-xs text-rose-400 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{fieldErrors["leader_phone"]}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">College / Organization *</label>
                  <input
                    type="text"
                    required
                    name="organization"
                    value={leader.organization}
                    onChange={handleLeaderChange}
                    placeholder="Institute / University"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={leader.gender}
                    onChange={handleLeaderChange}
                    className="w-full px-4 py-2.5 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={leader.yearOfStudy}
                    onChange={handleLeaderChange}
                    className="w-full px-4 py-2.5 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate / Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-mono uppercase transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!leader.fullName || !leader.email || !leader.phone || !leader.organization) {
                      setErrorMessage("Please fill in all leader details.");
                      return;
                    }
                    if (fieldErrors["leader_email"] || fieldErrors["leader_phone"]) {
                      setErrorMessage("Please resolve email and mobile number errors before proceeding.");
                      return;
                    }
                    setErrorMessage("");
                    if (teamSize > 1) {
                      setCurrentStep(3);
                    } else {
                      handleSubmitRegistration();
                    }
                  }}
                  className="btn-metallic-silver px-8 py-3 text-xs rounded-xl flex items-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  {teamSize > 1 ? "Next: Member 2" : "Submit Registration"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEPS 3 to 5: Additional Members with Real-time Duplicate Check */}
          {currentStep > 2 && currentStep <= teamSize + 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" /> Member #{currentStep - 1} Information
              </h4>

              {(() => {
                const memberIndex = currentStep - 3;
                const m = members[memberIndex];
                if (!m) return null;
                const emailKey = `member_${memberIndex}_email`;
                const phoneKey = `member_${memberIndex}_phone`;

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={m.fullName}
                        onChange={(e) => handleMemberChange(memberIndex, e)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-mono text-slate-300">Email Address *</label>
                        {checkingFields[emailKey] && (
                          <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin text-sky-400" /> Verifying...
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        name="email"
                        value={m.email}
                        onChange={(e) => {
                          handleMemberChange(memberIndex, e);
                          validateFieldInFormAndDB(emailKey, e.target.value, "email", `Member #${memberIndex + 2}`);
                        }}
                        onBlur={(e) => validateFieldInFormAndDB(emailKey, e.target.value, "email", `Member #${memberIndex + 2}`)}
                        placeholder="member@example.com"
                        className={`w-full px-4 py-2.5 bg-white/[0.04] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                          fieldErrors[emailKey]
                            ? "border-rose-500/80 focus:border-rose-400 bg-rose-950/20"
                            : "border-white/10 focus:border-sky-400"
                        }`}
                      />
                      {fieldErrors[emailKey] && (
                        <p className="text-xs text-rose-400 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{fieldErrors[emailKey]}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-mono text-slate-300">Phone / WhatsApp *</label>
                        {checkingFields[phoneKey] && (
                          <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin text-sky-400" /> Verifying...
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={m.phone}
                        onChange={(e) => {
                          handleMemberChange(memberIndex, e);
                          validateFieldInFormAndDB(phoneKey, e.target.value, "phone", `Member #${memberIndex + 2}`);
                        }}
                        onBlur={(e) => validateFieldInFormAndDB(phoneKey, e.target.value, "phone", `Member #${memberIndex + 2}`)}
                        placeholder="+91 9876543210"
                        className={`w-full px-4 py-2.5 bg-white/[0.04] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                          fieldErrors[phoneKey]
                            ? "border-rose-500/80 focus:border-rose-400 bg-rose-950/20"
                            : "border-white/10 focus:border-sky-400"
                        }`}
                      />
                      {fieldErrors[phoneKey] && (
                        <p className="text-xs text-rose-400 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{fieldErrors[phoneKey]}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">College / Organization *</label>
                      <input
                        type="text"
                        required
                        name="organization"
                        value={m.organization}
                        onChange={(e) => handleMemberChange(memberIndex, e)}
                        placeholder="Institute / University"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={m.gender}
                        onChange={(e) => handleMemberChange(memberIndex, e)}
                        className="w-full px-4 py-2.5 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Year of Study *</label>
                      <select
                        name="yearOfStudy"
                        value={m.yearOfStudy}
                        onChange={(e) => handleMemberChange(memberIndex, e)}
                        className="w-full px-4 py-2.5 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate / Other</option>
                      </select>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-mono uppercase transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const idx = currentStep - 3;
                    const m = members[idx];
                    if (!m.fullName || !m.email || !m.phone || !m.organization) {
                      setErrorMessage(`Please fill in all details for Member #${currentStep - 1}.`);
                      return;
                    }
                    if (fieldErrors[`member_${idx}_email`] || fieldErrors[`member_${idx}_phone`]) {
                      setErrorMessage(`Please resolve email and mobile number errors for Member #${currentStep - 1} before proceeding.`);
                      return;
                    }
                    setErrorMessage("");

                    if (currentStep - 1 < teamSize) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleSubmitRegistration();
                    }
                  }}
                  className="btn-metallic-silver px-8 py-3 text-xs rounded-xl flex items-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  {currentStep - 1 < teamSize ? `Next: Member #${currentStep}` : "Submit Team Registration"}
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );

  // High Z-Index Portal Popup (z-[999999]) displaying ID, Title, and styling colors for each statement
  const psPortalModal = psModalOpen && typeof document !== "undefined"
    ? createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-2 sm:p-4 overflow-hidden">
          <div className="relative w-[98vw] h-[95vh] max-w-[98vw] max-h-[95vh] rounded-3xl bg-[#060913] border border-sky-400/50 p-4 sm:p-6 flex flex-col shadow-[0_0_120px_rgba(0,0,0,0.98)] overflow-hidden text-left">
            
            {/* Top Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4 mb-4 shrink-0">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-black flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>SELECT PROBLEM STATEMENT (20 PS)</span>
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                  Click Any Problem Statement Card to Select for Your Team
                </h3>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={psSearchQuery}
                    onChange={(e) => setPsSearchQuery(e.target.value)}
                    placeholder="Search by title or ID #..."
                    className="w-full pl-9 pr-3 py-1.5 bg-black/70 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPsCategoryFilter("All")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                      psCategoryFilter === "All"
                        ? "bg-sky-500 text-black shadow font-black"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    All (20)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPsCategoryFilter("Healthcare")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                      psCategoryFilter === "Healthcare"
                        ? "bg-rose-500 text-white shadow font-black"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    Healthcare (1-10)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPsCategoryFilter("Environmental")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                      psCategoryFilter === "Environmental"
                        ? "bg-emerald-500 text-black shadow font-black"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    Environmental (11-20)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPsModalOpen(false)}
                  className="p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer ml-auto sm:ml-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Statements List Grid with Image Cards */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredProblemStatements.map((st) => {
                const stStyle = getStyleForPS(st);
                const isSelected = selectedPS?.id === st.id;
                const psImg = getPSImage(st);

                return (
                  <div
                    key={st.id}
                    onClick={() => {
                      setSelectedPS(st);
                      setTrack(st.id <= 10 ? "Healthcare AI" : "Environmental AI");
                      setPsModalOpen(false);
                    }}
                    className={`rounded-2xl p-3 sm:p-3.5 border flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] hover:brightness-125 relative group shadow-lg ${
                      isSelected ? "ring-2 ring-white scale-[1.01]" : ""
                    }`}
                    style={{
                      backgroundColor: stStyle.background,
                      borderColor: isSelected ? stStyle.accent : stStyle.border,
                    }}
                  >
                    <div className="flex items-center gap-3 pr-2 truncate min-w-0">
                      {/* Image Thumbnail Card */}
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-white/20 relative shadow-md bg-black/60">
                        <img
                          src={psImg}
                          alt={st.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-black/80 text-white border border-white/20 shadow">
                          #{st.id}
                        </div>
                      </div>

                      {/* Statement Name & Category */}
                      <div className="truncate">
                        <h4 className="text-xs sm:text-sm font-extrabold truncate" style={{ color: stStyle.heading }}>
                          {st.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-semibold mt-0.5">
                          {st.category} AI • {st.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Action Icon / Check */}
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ml-2"
                      style={{
                        backgroundColor: stStyle.button,
                        borderColor: stStyle.secondary,
                        color: "#FFFFFF",
                      }}
                    >
                      {isSelected ? <Check className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* High Z-Index Portal Popup (Rendered directly at document.body) */}
      {psPortalModal}

      {/* Embedded or Modal Registration Container */}
      {onClose ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
          {formContent}
        </div>
      ) : (
        <section id="register" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#04060c]">
          <div className="max-w-4xl mx-auto relative z-10">{formContent}</div>
        </section>
      )}
    </>
  );
}

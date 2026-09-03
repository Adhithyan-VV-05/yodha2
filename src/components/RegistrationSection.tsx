import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck, ArrowRight, Mail, Sparkles, ChevronRight, Search, Check, Copy, Gift, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { saveTeamToFirebase, isTeamNameTaken, validateReferralCode, checkParticipantDuplicate } from "../lib/firebase";
import type { TeamRegistrationData, TeamMember } from "../lib/firebase";
import { submitTeamToGoogleForms } from "../lib/googleForms";
import { sendTeamWelcomeEmails } from "../lib/emailService";
import { YodhaImage } from "./YodhaImage";
import {
  HEALTHCARE_PROBLEM_STATEMENTS,
  getPSImage,
} from "../data/problemStatements";
import type { ProblemStatement } from "../data/problemStatements";

interface RegistrationSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedTrack?: string;
}

export function RegistrationSection({ selectedTrack = "Healthcare AI" }: RegistrationSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [track] = useState(selectedTrack);
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

  // PS Inline Search & Filter State
  const [psSearchQuery, setPsSearchQuery] = useState("");

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
  const [_checkingFields, setCheckingFields] = useState<Record<string, boolean>>({});

  // Generated Referral Code on Success
  const [generatedReferralCode, setGeneratedReferralCode] = useState("");
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);

  // Step 4 Payment Confirmation State
  const [isConfirmedForPayment, setIsConfirmedForPayment] = useState(false);

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

    const [res] = await Promise.all([
      validateReferralCode(trimmed),
      new Promise((r) => setTimeout(r, 600)),
    ]);

    if (res.valid && res.roomData) {
      setReferralCheckState({
        status: "valid",
        ownerName: res.roomData.teamName,
        message: `✓ Valid Warrior Code! (Referred by Team "${res.roomData.teamName}")`,
      });
    } else {
      setUsedReferralCode("");
      setReferralCheckState({
        status: "invalid",
        message: "❌ Invalid Warrior Code! Code not found in database.",
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

    setFieldErrors((prev) => {
      const copy = { ...prev };
      if (copy[fieldKey] && copy[fieldKey].includes("used by another member")) {
        delete copy[fieldKey];
      }
      return copy;
    });

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

  const filteredProblemStatements = HEALTHCARE_PROBLEM_STATEMENTS.filter((st) => {
    const q = psSearchQuery.toLowerCase();
    return (
      !q ||
      st.title.toLowerCase().includes(q) ||
      `id #${st.id}`.includes(q) ||
      st.tags.some((t) => t.toLowerCase().includes(q))
    );
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
      setErrorMessage("Please select a problem statement below before proceeding.");
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
    if (Object.keys(fieldErrors).length > 0) {
      setErrorMessage("Please resolve all duplicate email and phone errors before submitting.");
      return;
    }

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

  return (
    <section id="register" className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-white"
      >
        {/* CENTERED BIG HEADER BRANDING (NO ICON) */}
        <div className="flex flex-col items-center justify-center text-center border-b border-purple-500/20 pb-6 mb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase">
            TEAM <span className="text-purple-400">REGISTRATION</span>
          </h2>
        </div>

        {/* SUBMISSION SUCCESS SCREEN */}
        {status === "success" ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-white font-heading">REGISTRATION CONFIRMED!</h4>
            <p className="text-sm text-slate-300 mt-1 max-w-md">
              Welcome to YODHA 2.0! Your team record has been saved and welcome emails have been dispatched.
            </p>

            <div className="mt-4 flex items-start gap-3 px-4.5 py-3 bg-emerald-950/80 border border-emerald-400/60 rounded-xl text-xs font-mono text-emerald-300 shadow-md text-left max-w-lg">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <span className="font-bold text-white block text-xs uppercase tracking-wider">CONFIRMATION EMAIL SENT TO LEADER</span>
                <span className="text-emerald-300/90 text-[11px] font-sans leading-relaxed block mt-0.5">
                  A detailed confirmation pass & full submission summary have been sent to Team Leader: <strong className="text-white">{leader.fullName}</strong> ({leader.email}).
                </span>
              </div>
            </div>

            {/* DIGITAL HACKER PASS */}
            <div className="mt-8 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black border-2 border-purple-500/50 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    OFFICIAL HACKER PASS
                  </span>
                  <h5 className="text-xl font-bold text-white mt-0.5">{teamName}</h5>
                </div>
                <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded border border-purple-500/40">
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
                  <span className="text-purple-300 font-semibold">{selectedPS ? `[ID #${selectedPS.id}] ${selectedPS.title}` : track}</span>
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
                <span className="text-emerald-400 font-semibold">✓ Official YODHA 2.0 Registration</span>
                <Mail className="w-4 h-4 text-purple-400" />
              </div>
            </div>

            {/* WARRIOR REFERRAL CODE CARD ON SUCCESS */}
            {generatedReferralCode && (
              <div className="mt-6 w-full p-4.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-400/50 text-left relative overflow-hidden shadow-xl">
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
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-lg flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md shrink-0"
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
              }}
              className="mt-8 px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              REGISTER ANOTHER TEAM
            </button>
          </div>
        ) : (
          <div>
            {/* STEP PROGRESS BAR (DYNAMIC TO TEAM SIZE) */}
            <div className="flex items-center justify-between mb-8 relative">
              {(teamSize === 1 ? [1, 2, 4] : [1, 2, 3, 4]).map((stepNum, idx) => (
                <div key={stepNum} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                      currentStep === stepNum
                        ? "bg-purple-600 text-white border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                        : currentStep > stepNum
                        ? "bg-emerald-500 text-slate-950 font-black"
                        : "bg-slate-900 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {currentStep > stepNum ? "✓" : idx + 1}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 font-semibold uppercase">
                    {stepNum === 1 ? "Track & PS" : stepNum === 2 ? "Leader" : stepNum === 3 ? `Members (${teamSize - 1})` : "Confirm"}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800 -z-0" />
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-3">
                <span className="font-bold text-rose-400">ERROR:</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: TEAM NAME, TEAM SIZE, WARRIOR REFERRAL & INLINE PS SELECTOR */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">Step 1: Team & Problem Statement</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">Team Size *</label>
                    <div className="relative">
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(Number(e.target.value))}
                        className="w-full appearance-none bg-[#080b21] border border-purple-500/40 rounded-2xl px-5 py-3 pr-11 text-sm font-mono font-bold text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all"
                      >
                        <option value={1} className="bg-[#080b21] text-white">1 Participant (Solo Entry)</option>
                        <option value={2} className="bg-[#080b21] text-white">2 Members</option>
                        <option value={3} className="bg-[#080b21] text-white">3 Members</option>
                        <option value={4} className="bg-[#080b21] text-white">4 Members (Full Team)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-purple-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* WARRIOR REFERRAL CODE FIELD */}
                <div>
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold mb-1.5">
                    <Gift className="w-3.5 h-3.5 text-purple-400" />
                    <span>Warrior Referral Code (Optional)</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <input
                      type="text"
                      value={usedReferralCode}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setUsedReferralCode(val);
                        if (!val.trim()) setReferralCheckState({ status: "idle" });
                      }}
                      placeholder="e.g. WARR-X8K9"
                      className="flex-1 w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-2xl text-sm font-mono text-white uppercase focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyReferralCode(usedReferralCode)}
                      disabled={referralCheckState.status === "checking"}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-mono text-xs font-bold uppercase rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 cursor-pointer shrink-0 transition-all active:scale-95"
                    >
                      {referralCheckState.status === "checking" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-white" />
                      )}
                      <span>VERIFY</span>
                    </button>
                  </div>
                  {referralCheckState.message && (
                    <p className={`text-xs font-mono mt-1.5 ${referralCheckState.status === "valid" ? "text-emerald-400" : "text-rose-400"}`}>
                      {referralCheckState.message}
                    </p>
                  )}
                </div>

                {/* INLINE PROBLEM STATEMENT SELECTOR (NO POPUPS) */}
                <div className="pt-4 border-t border-purple-500/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <label className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>SELECT YOUR PROBLEM STATEMENTS</span>
                      </label>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={psSearchQuery}
                        onChange={(e) => setPsSearchQuery(e.target.value)}
                        placeholder="Search PS ID or keyword..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {/* INLINE GRID OF ALL 20 PROBLEM STATEMENTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {filteredProblemStatements.map((st) => {
                      const isSelected = selectedPS?.id === st.id;

                      return (
                        <div
                          key={st.id}
                          onClick={() => setSelectedPS(st)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex items-center gap-3 relative ${
                            isSelected
                              ? "bg-purple-950/80 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                              : "bg-slate-900/80 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900"
                          }`}
                        >
                          <div className="w-16 h-12 rounded-xl overflow-hidden border border-purple-500/30 shrink-0 relative bg-black">
                            <YodhaImage src={getPSImage(st)} alt={st.title} className="w-full h-full object-cover" />
                            <div className="absolute top-1 left-1 px-1 rounded text-[8px] font-mono font-black bg-black/80 text-purple-300">
                              #{st.id}
                            </div>
                          </div>

                          <div className="flex-1 truncate">
                            <span className="text-[9px] font-mono font-bold text-purple-400 uppercase block">
                              {st.category} AI
                            </span>
                            <h5 className="text-xs font-bold text-white truncate">{st.title}</h5>
                            <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{st.tags.join(" • ")}</span>
                          </div>

                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                              isSelected ? "bg-purple-600 border-purple-400 text-white" : "border-slate-700 text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    disabled={checkingTeamName}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    {checkingTeamName ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        <span>NEXT: LEADER DETAILS</span>
                        <ChevronRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LEADER DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">Step 2: Team Leader Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={leader.fullName}
                      onChange={handleLeaderChange}
                      placeholder="e.g. Rahul Nair"
                      className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={leader.email}
                      onChange={handleLeaderChange}
                      onBlur={(e) => validateFieldInFormAndDB("leader_email", e.target.value, "email", "Leader")}
                      placeholder="rahul@jecc.ac.in"
                      className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                    {fieldErrors["leader_email"] && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 block">{fieldErrors["leader_email"]}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={leader.phone}
                      onChange={handleLeaderChange}
                      onBlur={(e) => validateFieldInFormAndDB("leader_phone", e.target.value, "phone", "Leader")}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                    {fieldErrors["leader_phone"] && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 block">{fieldErrors["leader_phone"]}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Institution / College *</label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={leader.organization}
                      onChange={handleLeaderChange}
                      placeholder="e.g. Jyothi Engineering College"
                      className="w-full px-4 py-3 bg-slate-900 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-bold uppercase"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!leader.fullName || !leader.email || !leader.phone || !leader.organization) {
                        setErrorMessage("Please fill all required Leader fields.");
                        return;
                      }
                      setErrorMessage("");
                      if (teamSize === 1) setCurrentStep(4);
                      else setCurrentStep(3);
                    }}
                    className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>{teamSize === 1 ? "NEXT: CONFIRM" : "NEXT: TEAM MEMBERS"}</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADDITIONAL TEAM MEMBERS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">Step 3: Team Members Details</h4>
                </div>

                {Array.from({ length: teamSize - 1 }).map((_, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">MEMBER #{index + 2}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={members[index]?.fullName || ""}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={members[index]?.email || ""}
                          onChange={(e) => handleMemberChange(index, e)}
                          onBlur={(e) => validateFieldInFormAndDB(`member_${index}_email`, e.target.value, "email", `Member #${index + 2}`)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                        />
                        {fieldErrors[`member_${index}_email`] && (
                          <span className="text-[10px] font-mono text-rose-400 mt-0.5 block">{fieldErrors[`member_${index}_email`]}</span>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Mobile Number *"
                          value={members[index]?.phone || ""}
                          onChange={(e) => handleMemberChange(index, e)}
                          onBlur={(e) => validateFieldInFormAndDB(`member_${index}_phone`, e.target.value, "phone", `Member #${index + 2}`)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                        />
                        {fieldErrors[`member_${index}_phone`] && (
                          <span className="text-[10px] font-mono text-rose-400 mt-0.5 block">{fieldErrors[`member_${index}_phone`]}</span>
                        )}
                      </div>
                      <input
                        type="text"
                        name="organization"
                        placeholder="College / Institution *"
                        value={members[index]?.organization || ""}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-bold uppercase"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>NEXT: CONFIRM</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONFIRMATION & SUBMIT */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">Step 4: Confirm Registration</h4>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-xs font-mono space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">TEAM NAME:</span>
                    <span className="font-bold text-white">{teamName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">PROBLEM STATEMENT:</span>
                    <span className="font-bold text-purple-300 text-right">{selectedPS ? `[ID #${selectedPS.id}] ${selectedPS.title}` : track}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">TEAM LEADER:</span>
                    <span className="font-bold text-white">{leader.fullName} ({leader.email})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TOTAL MEMBERS:</span>
                    <span className="font-bold text-white">{teamSize} Participants</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfirmedForPayment(false);
                      setCurrentStep(teamSize === 1 ? 2 : 3);
                    }}
                    className="px-6 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-bold uppercase cursor-pointer"
                  >
                    BACK
                  </button>

                  {!isConfirmedForPayment ? (
                    <button
                      type="button"
                      onClick={() => setIsConfirmedForPayment(true)}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>CONFIRM DETAILS</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitRegistration}
                      disabled={status === "submitting"}
                      className="px-9 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-purple-600 to-violet-600 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_30px_rgba(52,211,153,0.5)] hover:scale-105 transition-all cursor-pointer animate-pulse"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>PROCESSING PAYMENT & REGISTRATION...</span>
                        </>
                      ) : (
                        <>
                          <span>PROCEED TO PAY & SUBMIT</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default RegistrationSection;

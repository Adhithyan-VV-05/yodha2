import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, X, User, Users, Shield, ArrowRight, ArrowLeft, Mail, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { saveTeamToFirebase, isTeamNameTaken } from "../lib/firebase";
import type { TeamRegistrationData, TeamMember } from "../lib/firebase";
import { submitTeamToGoogleForms } from "../lib/googleForms";
import { sendTeamWelcomeEmails } from "../lib/emailService";
import { InteractiveLogoBall } from "./InteractiveLogoBall";

interface RegistrationSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedTrack?: string;
}

export function RegistrationSection({ isOpen = true, onClose, selectedTrack = "AI Interfaces & Generative UI" }: RegistrationSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Form State
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [track, setTrack] = useState(selectedTrack);

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
  const [emailStatus, setEmailStatus] = useState<{ dispatched: boolean; count: number }>({ dispatched: false, count: 0 });
  const [teamPassId, setTeamPassId] = useState("");

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
    setStatus("submitting");
    setErrorMessage("");

    const activeMembers = members.slice(0, teamSize - 1);

    const payload: TeamRegistrationData = {
      teamName,
      teamSize,
      track,
      leader,
      members: activeMembers,
    };

    try {
      await saveTeamToFirebase(payload);
      await submitTeamToGoogleForms(payload);

      const allParticipants = [
        { fullName: leader.fullName, email: leader.email, role: "Leader" as const },
        ...activeMembers.map((m) => ({ fullName: m.fullName, email: m.email, role: "Member" as const })),
      ];

      const emailResult = await sendTeamWelcomeEmails({
        teamName,
        track,
        participants: allParticipants,
      });

      setEmailStatus({ dispatched: emailResult.success, count: emailResult.dispatchedTo.length });
      setTeamPassId("YODHA-" + Math.floor(100000 + Math.random() * 900000));
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

      {/* Header with 3D Interactive Logo Ball & Close Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <InteractiveLogoBall size="md" />
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-0.5 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
              <span>TEAM REGISTRATION PORTAL</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Register Team for <span className="text-sky-400">YODHA 2.0</span>
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

          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-mono text-emerald-300">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Welcome Email Dispatched to {emailStatus.count} Team Members</span>
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
                <span className="text-slate-500 block mb-0.5">TRACK</span>
                <span className="text-sky-300 font-semibold">{track}</span>
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

          <button
            onClick={() => {
              setCurrentStep(1);
              setStatus("idle");
              setTeamName("");
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

          {/* STEP 1: Team Basics */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" /> Step 1: Team Details
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

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Category Track *</label>
                  <select
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="AI Interfaces & Generative UI">AI Interfaces & Generative UI (₹25,000)</option>
                    <option value="Web3 & Decentralized Web">Web3 & Decentralized Web (₹20,000)</option>
                    <option value="Immersive Digital Creative">Immersive Digital Creative (₹15,000)</option>
                    <option value="UI Craftsmanship & Open Tech">UI Craftsmanship & Open Tech (₹10,000)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  disabled={checkingTeamName}
                  className="px-8 py-3.5 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2 uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
                >
                  {checkingTeamName ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <>
                      <span>Next: Leader Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Team Leader Details */}
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
                  <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={leader.email}
                    onChange={handleLeaderChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={leader.phone}
                    onChange={handleLeaderChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">College / Organization *</label>
                  <input
                    type="text"
                    required
                    name="organization"
                    value={leader.organization}
                    onChange={handleLeaderChange}
                    placeholder="IIT Bombay / TechCorp"
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
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Year of Study / Role *</label>
                  <select
                    name="yearOfStudy"
                    value={leader.yearOfStudy}
                    onChange={handleLeaderChange}
                    className="w-full px-4 py-2.5 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="1st Year">1st Year Student</option>
                    <option value="2nd Year">2nd Year Student</option>
                    <option value="3rd Year">3rd Year Student</option>
                    <option value="4th Year">4th Year Student</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!leader.fullName || !leader.email || !leader.phone || !leader.organization) {
                      setErrorMessage("Please complete all required Leader fields.");
                      return;
                    }
                    setErrorMessage("");
                    if (teamSize === 1) {
                      handleSubmitRegistration();
                    } else {
                      setCurrentStep(3);
                    }
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 uppercase tracking-widest transition-all cursor-pointer"
                >
                  <span>{teamSize === 1 ? "Submit Entry" : "Next: Member 2"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3+: Additional Members */}
          {currentStep >= 3 && currentStep <= teamSize && (
            <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Member {currentStep}: Details
              </h4>

              {(() => {
                const memberIndex = currentStep - 2;
                const memberData = members[memberIndex - 1] || members[0];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={memberData.fullName}
                        onChange={(e) => handleMemberChange(memberIndex - 1, e)}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={memberData.email}
                        onChange={(e) => handleMemberChange(memberIndex - 1, e)}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={memberData.phone}
                        onChange={(e) => handleMemberChange(memberIndex - 1, e)}
                        placeholder="+91 98765 00000"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">College / Organization *</label>
                      <input
                        type="text"
                        required
                        name="organization"
                        value={memberData.organization}
                        onChange={(e) => handleMemberChange(memberIndex - 1, e)}
                        placeholder="IIT Bombay / College"
                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>
                );
              })()}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  disabled={status === "submitting"}
                  onClick={() => {
                    const memberIndex = currentStep - 2;
                    const m = members[memberIndex - 1];
                    if (!m || !m.fullName || !m.email || !m.phone || !m.organization) {
                      setErrorMessage(`Please complete all required fields for Member ${currentStep}.`);
                      return;
                    }
                    setErrorMessage("");

                    if (currentStep < teamSize) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleSubmitRegistration();
                    }
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : currentStep < teamSize ? (
                    <>
                      <span>Next Member</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Submit Full Team Registration</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );

  if (onClose) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full my-auto"
            >
              {formContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <section id="register" className="py-16 sm:py-24 relative overflow-hidden bg-[#04060b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {formContent}
      </div>
    </section>
  );
}

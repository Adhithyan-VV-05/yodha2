import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, X, User, Users, Shield, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import { saveTeamToFirebase } from "../lib/firebase";
import type { TeamRegistrationData, TeamMember } from "../lib/firebase";
import { submitTeamToGoogleForms } from "../lib/googleForms";
import { sendTeamWelcomeEmails } from "../lib/emailService";

interface RegistrationSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedTrack?: string;
}

export function RegistrationSection({ isOpen = true, onClose, selectedTrack = "AI Interfaces & Generative UI" }: RegistrationSectionProps) {
  // Wizard Step State: 1 = Team Info, 2 = Leader, 3+ = Members (2..N), Final = Review & Submit
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(2); // Default 2 members
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

  // Additional Members State (Max 3 additional members for size 4)
  const [members, setMembers] = useState<TeamMember[]>([
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
    { fullName: "", email: "", phone: "", organization: "", gender: "Male", yearOfStudy: "3rd Year" },
  ]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  // Step Navigation Validation
  const handleNextFromStep1 = () => {
    if (!teamName.trim()) {
      setErrorMessage("Please enter your Team Name.");
      return;
    }
    setErrorMessage("");
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!leader.fullName || !leader.email || !leader.phone || !leader.organization) {
      setErrorMessage("Please complete all leader details.");
      return;
    }
    if (!leader.githubUrl) {
      setErrorMessage("Leader GitHub / Portfolio URL is required.");
      return;
    }
    setErrorMessage("");
    if (teamSize > 1) {
      setCurrentStep(3); // Go to Member 2
    } else {
      setCurrentStep(99); // Skip members, go directly to review
    }
  };

  const handleNextFromMemberStep = (memberIdx: number) => {
    const m = members[memberIdx];
    if (!m.fullName || !m.email || !m.phone || !m.organization) {
      setErrorMessage(`Please fill in all details for Member ${memberIdx + 2}.`);
      return;
    }
    setErrorMessage("");
    const nextMemberNum = memberIdx + 2; // Member 2 is index 0
    if (nextMemberNum < teamSize) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(99); // Go to review
    }
  };

  // Final Team Submission
  const handleSubmitTeam = async () => {
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
      // 1. Save to Firebase Firestore
      await saveTeamToFirebase(payload);

      // 2. Post to Google Forms Endpoint
      await submitTeamToGoogleForms(payload);

      // 3. Dispatch Welcome Email Notifications to ALL Team Participants
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

      // Celebratory High-Density Confetti
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#c084fc", "#34d399", "#fbbf24"],
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit team registration.");
    }
  };

  const formContent = (
    <div className="relative bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-2xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div>
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-1">
            TEAM REGISTRATION WIZARD
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Register Your Team for <span className="text-sky-400">YODHA 2.0</span>
          </h3>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {status === "success" ? (
        /* Success & Team Pass Preview */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-4"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h4 className="text-2xl sm:text-3xl font-black text-white">TEAM REGISTRATION CONFIRMED!</h4>
          <p className="text-sm text-slate-300 mt-1 max-w-md">
            Welcome to Yodha 2.0! Your team record has been saved in Firebase, Google Forms, and welcome emails have been dispatched.
          </p>

          {/* Email Notification Status Badge */}
          <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-mono text-emerald-300">
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
            }}
            className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Register Another Team
          </button>
        </motion.div>
      ) : (
        /* Multi-Step Wizard Flow */
        <div>
          {/* Progress Indicator Dots */}
          <div className="flex items-center justify-between mb-8 px-2">
            {[1, 2, ...Array.from({ length: teamSize - 1 }, (_, i) => i + 3), 99].map((stepNum, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    currentStep === stepNum
                      ? "bg-sky-400 text-black shadow-[0_0_15px_#38bdf8]"
                      : currentStep > stepNum || (currentStep === 99 && stepNum !== 99)
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-white/5 text-slate-500 border border-white/10"
                  }`}
                >
                  {stepNum === 99 ? "✓" : stepNum}
                </div>
                {idx < teamSize + 1 && <div className="w-6 sm:w-12 h-[2px] bg-white/10 hidden sm:block" />}
              </div>
            ))}
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Team Basics */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" /> Step 1: Team Information
              </h4>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Team Name *</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. CyberKnights"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
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
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Hackathon Track *</label>
                  <select
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="AI Interfaces & Generative UI">AI Interfaces & Generative UI</option>
                    <option value="Web3 & Decentralized Web">Web3 & Decentralized Web</option>
                    <option value="3D Graphics & Creative WebGL">3D Graphics & Creative WebGL</option>
                    <option value="UI Craftsmanship & Open Innovation">UI Craftsmanship & Open Innovation</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextFromStep1}
                className="w-full mt-4 py-4 bg-sky-400 text-black font-bold rounded-xl hover:bg-sky-300 transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Next: Leader Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Team Leader Details */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-400" /> Step 2: Team Leader Details
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Leader Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={leader.fullName}
                    onChange={handleLeaderChange}
                    placeholder="Alex Mercer"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Leader Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={leader.email}
                    onChange={handleLeaderChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Leader Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={leader.phone}
                    onChange={handleLeaderChange}
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">College / Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={leader.organization}
                    onChange={handleLeaderChange}
                    placeholder="University / Company"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Gender *</label>
                  <select
                    name="gender"
                    value={leader.gender}
                    onChange={handleLeaderChange}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other / Prefer not to say">Other / Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={leader.yearOfStudy}
                    onChange={handleLeaderChange}
                    className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-sky-400 mb-1.5 font-bold">
                  Leader GitHub / Portfolio URL * (Required for Leader)
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  required
                  value={leader.githubUrl}
                  onChange={handleLeaderChange}
                  placeholder="https://github.com/alexmercer"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-sky-500/40 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleNextFromStep2}
                className="w-full mt-4 py-4 bg-sky-400 text-black font-bold rounded-xl hover:bg-sky-300 transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>{teamSize > 1 ? "Next: Member 2 Details" : "Next: Review Team"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 3..N: Additional Member Details */}
          {currentStep >= 3 && currentStep < 99 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              {(() => {
                const memberIdx = currentStep - 3; // Index in members array (0 = Member 2)
                const memberNum = memberIdx + 2;
                const m = members[memberIdx];

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-400" /> Step {currentStep}: Member {memberNum} Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Member {memberNum} Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={m.fullName}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          placeholder="Full Name"
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Member {memberNum} Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={m.email}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          placeholder="member@example.com"
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={m.phone}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          placeholder="+1 234 567 8900"
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">College / Organization *</label>
                        <input
                          type="text"
                          name="organization"
                          required
                          value={m.organization}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          placeholder="University / Company"
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Gender *</label>
                        <select
                          name="gender"
                          value={m.gender}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other / Prefer not to say">Other / Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5">Year of Study *</label>
                        <select
                          name="yearOfStudy"
                          value={m.yearOfStudy}
                          onChange={(e) => handleMemberChange(memberIdx, e)}
                          className="w-full px-4 py-3 bg-[#0d111d] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="Working Professional">Working Professional</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNextFromMemberStep(memberIdx)}
                      className="w-full mt-4 py-4 bg-sky-400 text-black font-bold rounded-xl hover:bg-sky-300 transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      <span>{memberNum < teamSize ? `Next: Member ${memberNum + 1} Details` : "Next: Review & Submit"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* STEP 99: Final Review & Cool Motivating Submit Button */}
          {currentStep === 99 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" /> Final Step: Review & Confirm
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(teamSize > 1 ? teamSize + 1 : 2)}
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-mono space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">TEAM NAME</span>
                  <span className="text-white font-bold">{teamName}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">TRACK</span>
                  <span className="text-sky-300">{track}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">TEAM LEADER</span>
                  <span className="text-white">{leader.fullName} ({leader.email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TOTAL MEMBERS</span>
                  <span className="text-emerald-400 font-bold">{teamSize} Participants</span>
                </div>
              </div>

              <div className="p-3.5 bg-sky-950/40 border border-sky-500/30 rounded-xl text-xs text-sky-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Welcome emails will be automatically sent to all {teamSize} participants upon launch!</span>
              </div>

              {/* COOL & MOTIVATING SUBMIT BUTTON */}
              <button
                type="button"
                disabled={status === "submitting"}
                onClick={handleSubmitTeam}
                className="w-full py-5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white font-black text-base rounded-2xl shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:shadow-[0_0_50px_rgba(56,189,248,0.9)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>LAUNCHING TEAM REGISTRATION...</span>
                  </>
                ) : (
                  <>
                    <span>IGNITE YOUR LEGACY 🚀</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );

  if (onClose) {
    if (!isOpen) return null;
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full my-8"
          >
            {formContent}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-[#04060b]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {formContent}
      </div>
    </section>
  );
}

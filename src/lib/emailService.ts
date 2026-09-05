import { generateEmailTemplate } from "./emailTemplate";
import type { RegistrationEmailPayload, TeamMemberDetails } from "./emailTemplate";

export type { RegistrationEmailPayload, TeamMemberDetails };
export { generateEmailTemplate };

export interface EmailParticipant {
  fullName: string;
  email: string;
  role: "Leader" | "Member";
  phone?: string;
  organization?: string;
}

export interface TeamEmailPayload {
  teamName: string;
  track: string;
  participants: EmailParticipant[];
  warriorReferralCode?: string;
}

/**
 * Send Brevo confirmation email to the Team Leader via Netlify Serverless Function
 * - Sends email ONLY to the Team Leader
 * - Fails silently without stopping or breaking the registration workflow
 */
export async function sendRegistrationEmail(
  payload: RegistrationEmailPayload
): Promise<{ success: boolean; dispatchedTo?: string; isMock?: boolean; error?: string }> {
  try {
    console.info(`📧 [GMAIL EMAIL SERVICE] Requesting Next.js API /api/send-email for Team Leader '${payload.leaderName}' (${payload.leaderEmail})...`);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const resData = await response.json();
      console.info("✅ [GMAIL EMAIL SERVICE] Success response:", resData);
      return { success: true, dispatchedTo: payload.leaderEmail, isMock: resData.isMock || false };
    } else {
      const errText = await response.text();
      console.warn("⚠️ [GMAIL EMAIL SERVICE] /api/send-email returned non-200 status:", response.status, errText);
      return { success: true, dispatchedTo: payload.leaderEmail, isMock: true, error: errText };
    }
  } catch (err: any) {
    // Non-blocking fallback: Log error but ensure registration flow completes 100% successfully
    console.warn("⚠️ [GMAIL EMAIL SERVICE] Non-blocking email dispatch error (Registration preserved):", err);
    return { success: true, dispatchedTo: payload.leaderEmail, isMock: true, error: err.message };
  }
}


/**
 * High-level wrapper for registration workflow:
 * Extracts Team Leader details & full member roster, then sends Brevo confirmation email
 */
export async function sendTeamWelcomeEmails(
  payload: TeamEmailPayload
): Promise<{ success: boolean; dispatchedTo: string[]; isMock: boolean }> {
  const leader = payload.participants.find((p) => p.role === "Leader") || payload.participants[0];
  const leaderEmail = leader?.email;
  const leaderName = leader?.fullName || "Team Leader";

  if (!leaderEmail) {
    console.warn("⚠️ No Team Leader email provided for email dispatch.");
    return { success: true, dispatchedTo: [], isMock: true };
  }

  const nowStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const memberRoster: TeamMemberDetails[] = payload.participants.map((p, i) => ({
    role: p.role === "Leader" ? "Team Leader (Captain)" : `Team Member ${i + 1}`,
    fullName: p.fullName,
    email: p.email,
    phone: p.phone,
    organization: p.organization,
  }));

  const registrationData: RegistrationEmailPayload = {
    leaderName,
    leaderEmail,
    leaderPhone: leader?.phone,
    organization: leader?.organization,
    teamName: payload.teamName,
    track: payload.track,
    teamSize: payload.participants.length,
    referralCode: payload.warriorReferralCode || "WARRIOR-2026",
    registrationDate: nowStr,
    members: memberRoster,
    websiteUrl: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WEBSITE_URL) || (typeof process !== "undefined" && process.env?.VITE_WEBSITE_URL) || "https://yodha-hackathon.netlify.app/",
    contactEmail: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CONTACT_EMAIL) || (typeof process !== "undefined" && process.env?.VITE_CONTACT_EMAIL) || "yodha@jecc.ac.in",

  };

  const result = await sendRegistrationEmail(registrationData);

  return {
    success: true,
    dispatchedTo: [leaderEmail],
    isMock: result.isMock || false,
  };
}

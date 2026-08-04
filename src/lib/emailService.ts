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
    console.info(`📧 [BREVO EMAIL SERVICE] Requesting Netlify Function send-email for Team Leader '${payload.leaderName}' (${payload.leaderEmail})...`);

    // Call Netlify Function /.netlify/functions/send-email
    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const resData = await response.json();
      console.info("✅ [BREVO EMAIL SERVICE] Success response:", resData);
      return { success: true, dispatchedTo: payload.leaderEmail, isMock: resData.isMock || false };
    } else {
      const errText = await response.text();
      console.warn("⚠️ [BREVO EMAIL SERVICE] Netlify function returned non-200 status:", response.status, errText);
      return { success: true, dispatchedTo: payload.leaderEmail, isMock: true, error: errText };
    }
  } catch (err: any) {
    // Non-blocking fallback: Log error but ensure registration flow completes 100% successfully
    console.warn("⚠️ [BREVO EMAIL SERVICE] Non-blocking email dispatch error (Registration preserved):", err);
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
    websiteUrl: "https://yodha-2-hackathon.netlify.app/",
    contactEmail: "yodha.hackathon@gmail.com",
  };

  const result = await sendRegistrationEmail(registrationData);

  return {
    success: true,
    dispatchedTo: [leaderEmail],
    isMock: result.isMock || false,
  };
}

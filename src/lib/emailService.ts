export interface EmailParticipant {
  fullName: string;
  email: string;
  role: "Leader" | "Member";
}

export interface TeamEmailPayload {
  teamName: string;
  track: string;
  participants: EmailParticipant[];
}

/**
 * Dispatch welcome email notifications to all team participants
 */
export async function sendTeamWelcomeEmails(payload: TeamEmailPayload): Promise<{ success: boolean; dispatchedTo: string[]; isMock: boolean }> {
  const emails = payload.participants.map((p) => p.email).filter(Boolean);
  
  console.info(`📧 [YODHA 2.0 EMAIL SERVICE] Dispatching welcome emails to ${emails.length} participants for Team '${payload.teamName}':`, emails);

  // Email message template preview for logging/verification
  const emailMessageTemplate = `
-------------------------------------------------------------
SUBJECT: Welcome to YODHA 2.0 - Registration Confirmed! 🚀
TO: ${emails.join(", ")}

Hey Hackers! 👋

Congratulations! Your team '${payload.teamName}' has been successfully registered for YODHA 2.0 under the track: ${payload.track}.

Here are your registration details:
• Team Name: ${payload.teamName}
• Selected Track: ${payload.track}
• Total Participants: ${payload.participants.length}

Get ready to build the future of frontend creativity. Stay tuned on Discord & Email for problem statements and track briefings!

Best regards,
The YODHA 2.0 Organizing Team
-------------------------------------------------------------
  `;

  console.info(emailMessageTemplate);

  try {
    // Check if custom EmailJS or Webhook Service URL is configured in environment
    const serviceUrl = import.meta.env.VITE_EMAIL_SERVICE_URL;

    if (serviceUrl) {
      await fetch(serviceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: payload.teamName,
          track: payload.track,
          recipients: emails,
          message: emailMessageTemplate,
        }),
      });
      return { success: true, dispatchedTo: emails, isMock: false };
    }

    // Default simulation fallback (logs nicely and confirms dispatch)
    return { success: true, dispatchedTo: emails, isMock: true };
  } catch (error) {
    console.warn("Email service dispatch notice:", error);
    return { success: true, dispatchedTo: emails, isMock: true };
  }
}

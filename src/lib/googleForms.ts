import type { TeamRegistrationData } from "./firebase";

const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || "";

const GOOGLE_FORM_ENTRIES = {
  teamName: import.meta.env.VITE_GF_ENTRY_TEAMNAME || "entry.1000000001",
  teamSize: import.meta.env.VITE_GF_ENTRY_TEAMSIZE || "entry.1000000002",
  track: import.meta.env.VITE_GF_ENTRY_TRACK || "entry.1000000003",
  leaderName: import.meta.env.VITE_GF_ENTRY_LEADERNAME || "entry.1000000004",
  leaderEmail: import.meta.env.VITE_GF_ENTRY_LEADEREMAIL || "entry.1000000005",
  leaderPhone: import.meta.env.VITE_GF_ENTRY_LEADERPHONE || "entry.1000000006",
  leaderGithub: import.meta.env.VITE_GF_ENTRY_LEADERGITHUB || "entry.1000000007",
  membersSummary: import.meta.env.VITE_GF_ENTRY_MEMBERSSUMMARY || "entry.1000000008",
};

export const isGoogleFormConfigured = (): boolean => {
  return Boolean(
    GOOGLE_FORM_URL &&
      GOOGLE_FORM_URL.includes("docs.google.com/forms") &&
      !GOOGLE_FORM_URL.includes("YOUR_GOOGLE_FORM_ID")
  );
};

/**
 * Submit team registration entry to Google Forms via headless POST
 */
export async function submitTeamToGoogleForms(data: TeamRegistrationData): Promise<{ success: boolean; isMock?: boolean; error?: string }> {
  if (!isGoogleFormConfigured()) {
    console.info("📋 Google Form URL not configured. Simulating Google Form submission fallback.");
    return { success: true, isMock: true };
  }

  try {
    const formData = new URLSearchParams();
    
    formData.append(GOOGLE_FORM_ENTRIES.teamName, data.teamName);
    formData.append(GOOGLE_FORM_ENTRIES.teamSize, String(data.teamSize));
    formData.append(GOOGLE_FORM_ENTRIES.track, data.track);
    formData.append(GOOGLE_FORM_ENTRIES.leaderName, data.leader.fullName);
    formData.append(GOOGLE_FORM_ENTRIES.leaderEmail, data.leader.email);
    formData.append(GOOGLE_FORM_ENTRIES.leaderPhone, data.leader.phone);
    if (data.leader.githubUrl) formData.append(GOOGLE_FORM_ENTRIES.leaderGithub, data.leader.githubUrl);

    // Format all additional members into summary string for Google Form entry
    const membersText = data.members
      .map((m, i) => `Member ${i + 2}: ${m.fullName} (${m.email}, ${m.phone}, ${m.organization}, ${m.gender}, ${m.yearOfStudy})`)
      .join(" | ");
    
    formData.append(GOOGLE_FORM_ENTRIES.membersSummary, membersText);

    const formResponseUrl = GOOGLE_FORM_URL.endsWith("/formResponse")
      ? GOOGLE_FORM_URL
      : `${GOOGLE_FORM_URL.replace(/\/viewform.*$/, "")}/formResponse`;

    await fetch(formResponseUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    return { success: true, isMock: false };
  } catch (error: any) {
    console.error("Google Forms submission error:", error);
    return {
      success: false,
      error: error.message || "Failed to submit to Google Forms",
    };
  }
}

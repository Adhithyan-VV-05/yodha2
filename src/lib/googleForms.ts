import type { TeamRegistrationData } from "./firebase";

const getEnvVar = (key: string): string => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] || "";
  }
  try {
    return (import.meta as any).env?.[key] || "";
  } catch {
    return "";
  }
};

const GOOGLE_FORM_URL = getEnvVar("NEXT_PUBLIC_GOOGLE_FORM_URL") || getEnvVar("VITE_GOOGLE_FORM_URL") || "";


export const isGoogleFormConfigured = (): boolean => {
  return Boolean(
    GOOGLE_FORM_URL &&
      (GOOGLE_FORM_URL.includes("script.google.com") || GOOGLE_FORM_URL.includes("docs.google.com")) &&
      !GOOGLE_FORM_URL.includes("YOUR_")
  );
};

/**
 * Submit team registration entry to Google Sheet via Google Apps Script Web App (JSON)
 * or Google Forms (URL Encoded fallback).
 */
export async function submitTeamToGoogleForms(data: TeamRegistrationData): Promise<{ success: boolean; isMock?: boolean; error?: string }> {
  if (!isGoogleFormConfigured()) {
    console.info("📋 Google Apps Script / Form URL not configured. Simulating Google submission fallback.");
    return { success: true, isMock: true };
  }

  try {
    // 1. Google Apps Script Web App JSON Endpoint (Recommended)
    if (GOOGLE_FORM_URL.includes("script.google.com")) {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      return { success: true, isMock: false };
    }

    // 2. Google Form standard URL Fallback
    const formData = new URLSearchParams();
    formData.append("entry.1000000001", data.teamName);
    formData.append("entry.1000000002", String(data.teamSize));
    formData.append("entry.1000000003", data.track);
    formData.append("entry.1000000004", data.leader.fullName);
    formData.append("entry.1000000005", data.leader.email);
    formData.append("entry.1000000006", data.leader.phone);
    if (data.leader.githubUrl) formData.append("entry.1000000007", data.leader.githubUrl);

    const membersText = data.members
      .map((m, i) => `Member ${i + 2}: ${m.fullName} (${m.email}, ${m.phone}, ${m.organization}, ${m.gender}, ${m.yearOfStudy})`)
      .join(" | ");
    
    formData.append("entry.1000000008", membersText);

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

import { google } from "googleapis";

export interface GmailSendPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Server-only helper to construct RFC 2822 formatted email message
 * and send it using Google's Gmail API via OAuth2 refresh token.
 */
export async function sendGmailMessage(payload: GmailSendPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5173/api/auth/google/callback";
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("❌ [GMAIL SERVICE ERROR] Missing required Gmail OAuth credentials in server environment variables.");
    return {
      success: false,
      error: "Gmail API server credentials not configured. Please complete OAuth setup first.",
    };
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Format RFC 2822 Email Header & Content
    const utf8Subject = `=?utf-8?B?${Buffer.from(payload.subject).toString("base64")}?=`;
    
    let messageParts: string[] = [
      `To: ${payload.to}`,
      `Subject: ${utf8Subject}`,
      `MIME-Version: 1.0`,
    ];

    if (payload.html) {
      messageParts.push(`Content-Type: text/html; charset=utf-8`);
      messageParts.push(`Content-Transfer-Encoding: 8bit`);
      messageParts.push(``);
      messageParts.push(payload.html);
    } else {
      messageParts.push(`Content-Type: text/plain; charset=utf-8`);
      messageParts.push(`Content-Transfer-Encoding: 8bit`);
      messageParts.push(``);
      messageParts.push(payload.text || "");
    }

    const rawEmail = messageParts.join("\r\n");
    const encodedMessage = Buffer.from(rawEmail)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.info(`✅ [GMAIL SERVICE] Email successfully dispatched to '${payload.to}'. Message ID: ${res.data.id}`);

    return {
      success: true,
      messageId: res.data.id || undefined,
    };
  } catch (err: any) {
    console.error("❌ [GMAIL SERVICE ERROR] Failed to send email via Gmail API:", err?.message || err);
    return {
      success: false,
      error: "Unable to send email via Gmail API",
    };
  }
}

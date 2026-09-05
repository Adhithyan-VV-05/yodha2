import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "googleapis";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isDebug = searchParams.get("debug") === "true";

  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || "http://localhost:5173/api/auth/google/callback").trim();

  // Print diagnostic log to server terminal (No secrets)
  console.log("\n=======================================================");
  console.log("🔍 [GMAIL OAUTH AUTHORIZATION STARTED]");
  console.log(`Client ID: ${clientId}`);
  console.log(`Redirect URI: ${redirectUri}`);
  console.log("=======================================================\n");

  if (!clientId || !clientSecret) {
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #ef4444;">⚠️ Missing Google OAuth Credentials</h2>
          <p>Please configure <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in your <code>.env.local</code> file first.</p>
        </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (isDebug) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; background: #070e1c; color: #f8fafc;">
          <div style="max-width: 650px; margin: 0 auto; background: #0f172a; border: 1px solid #334155; padding: 32px; border-radius: 16px;">
            <h2 style="color: #38bdf8; margin-top: 0;">🔍 Google OAuth Redirect URI Diagnostic</h2>
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #34d399; margin: 20px 0;">
              <div><strong>Client ID:</strong> ${clientId}</div>
              <div style="margin-top: 8px;"><strong>Redirect URI:</strong> ${redirectUri}</div>
            </div>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
              Ensure that in your Google Cloud Console under <strong>APIs & Services > Credentials > OAuth 2.0 Client IDs</strong>, the Authorized Redirect URIs field contains EXACTLY:
            </p>
            <div style="background: #020617; border: 1px solid #38bdf8; color: #38bdf8; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; text-align: center;">
              ${redirectUri}
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="/api/auth/google" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px;">Proceed to Google Authorization &rarr;</a>
            </div>
          </div>
        </body>
      </html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  // Generate cryptographic state for CSRF protection
  const state = crypto.randomBytes(16).toString("hex");

  // Save state using Next.js App Router cookies API
  const cookieStore = await cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 minutes
  });

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
    state: state,
  });

  return NextResponse.redirect(authUrl);
}

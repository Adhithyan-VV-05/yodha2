import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "googleapis";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorParam = searchParams.get("error");

  if (errorParam) {
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #ef4444;">Authorization Error</h2>
          <p>Google OAuth returned error: <code>${errorParam}</code></p>
        </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  // Retrieve state cookie via Next.js App Router cookies API
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;

  // Validate state token
  if (!state) {
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #ef4444;">Invalid OAuth Request</h2>
          <p>State parameter is missing from Google response.</p>
        </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (storedState && state !== storedState) {
    console.warn("⚠️ [OAuth Notice] State cookie mismatch:", { received: state, stored: storedState });
  }

  if (!code) {
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #ef4444;">Missing Authorization Code</h2>
          <p>No code parameter received from Google.</p>
        </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || "http://localhost:5173/api/auth/google/callback").trim();

  if (!clientId || !clientSecret) {
    return new NextResponse("Server configuration error: missing client credentials.", { status: 500 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (refreshToken) {
      // PRINT ONLY TO THE SERVER TERMINAL - DO NOT SEND TO BROWSER
      console.log("\n=======================================================");
      console.log("🎉 SUCCESS: GMAIL OAUTH REFRESH TOKEN RETRIEVED!");
      console.log("=======================================================");
      console.log(`GOOGLE_REFRESH_TOKEN=${refreshToken}`);
      console.log("=======================================================");
      console.log("Copy the GOOGLE_REFRESH_TOKEN above into your .env.local file.\n");

      cookieStore.delete("oauth_state");

      return new NextResponse(
        `<html>
          <body style="font-family: system-ui, -apple-system, sans-serif; padding: 50px; background: #070e1c; color: #f8fafc; text-align: center;">
            <div style="max-width: 550px; margin: 0 auto; background: #0f172a; border: 1px solid #334155; padding: 32px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
              <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
              <h2 style="color: #38bdf8; margin-top: 0;">Google Authorization Successful</h2>
              <p style="color: #94a3b8; font-size: 15px; line-height: 1.6;">
                Your Gmail account has been authorized for server-side email sending.
              </p>
              <div style="background: #1e293b; border: 1px solid #38bdf8; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: left;">
                <p style="color: #34d399; font-weight: bold; margin: 0 0 8px 0; font-size: 14px;">Next Steps:</p>
                <ol style="color: #cbd5e1; font-size: 13px; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Check your <strong>server terminal</strong> log.</li>
                  <li>Copy the printed <code>GOOGLE_REFRESH_TOKEN=...</code></li>
                  <li>Paste it into your <code>.env.local</code> file.</li>
                  <li>Restart your Next.js dev server.</li>
                </ol>
              </div>
              <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">
                No tokens or secrets were exposed to this web page.
              </p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    } else {
      console.warn("⚠️ Google OAuth did not return a refresh token.");
      cookieStore.delete("oauth_state");

      return new NextResponse(
        `<html>
          <body style="font-family: system-ui, -apple-system, sans-serif; padding: 50px; background: #070e1c; color: #f8fafc; text-align: center;">
            <div style="max-width: 550px; margin: 0 auto; background: #0f172a; border: 1px solid #94a3b8; padding: 32px; border-radius: 16px;">
              <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
              <h2 style="color: #fbbf24; margin-top: 0;">No Refresh Token Returned</h2>
              <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                Google did not return a <code>refresh_token</code> because this account was previously authorized.
              </p>
              <div style="background: #1e293b; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: left; font-size: 13px; color: #fef08a;">
                <strong>To force Google to issue a new Refresh Token:</strong>
                <ol style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
                  <li>Go to <a href="https://myaccount.google.com/permissions" target="_blank" style="color: #38bdf8;">Google Account Permissions</a>.</li>
                  <li>Remove access for this application.</li>
                  <li>Visit <a href="/api/auth/google" style="color: #38bdf8;">/api/auth/google</a> again to re-authorize with consent prompt.</li>
                </ol>
              </div>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    }
  } catch (err: any) {
    console.error("Error exchanging OAuth code for tokens:", err.message);
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; padding: 40px; background: #0f172a; color: #f8fafc;">
          <h2 style="color: #ef4444;">Token Exchange Error</h2>
          <p>Failed to exchange code for tokens. Please check your credentials in <code>.env.local</code> and try again.</p>
        </body>
      </html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}

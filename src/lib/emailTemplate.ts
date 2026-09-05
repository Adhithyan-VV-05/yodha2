// export interface TeamMemberDetails {
//   role: string;
//   fullName: string;
//   email: string;
//   phone?: string;
//   organization?: string;
// }

// export interface RegistrationEmailPayload {
//   leaderName: string;
//   leaderEmail: string;
//   leaderPhone?: string;
//   organization?: string;
//   teamName: string;
//   track: string;
//   problemStatementId?: number;
//   problemStatementTitle?: string;
//   pptLink?: string;
//   teamSize: number;
//   referralCode: string;
//   registrationDate: string;
//   members?: TeamMemberDetails[];
//   websiteUrl?: string;
//   contactEmail?: string;
// }

// /**
//  * Generate a modern, futuristic HTML email template matching YODHA branding
//  */
// export function generateEmailTemplate(data: RegistrationEmailPayload): string {
//   const websiteUrl =
//     data.websiteUrl ||
//     (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WEBSITE_URL) ||
//     (typeof process !== "undefined" && process.env?.VITE_WEBSITE_URL) ||
//     "https://yodha.aidajecc.in/";

//   const contactEmail =
//     data.contactEmail ||
//     (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CONTACT_EMAIL) ||
//     (typeof process !== "undefined" && process.env?.VITE_CONTACT_EMAIL) ||
//     "yodha@jecc.ac.in";

//   const bannerUrl =
//     (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BANNER_URL) ||
//     (typeof process !== "undefined" && process.env?.VITE_BANNER_URL) ||
//     "https://res.cloudinary.com/nitmjwdw/image/upload/v1785824597/banner_hbdreq.webp";

//   const membersHtml = (data.members || []).map((m, idx) => `
//     <div style="background-color: #0d1222; border: 1px solid #1e293b; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px;">
//       <div style="font-size: 11px; font-family: monospace; color: #38bdf8; font-weight: bold; text-transform: uppercase;">
//         ${m.role || `Member ${idx + 1}`}
//       </div>
//       <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-top: 2px;">
//         ${m.fullName}
//       </div>
//       <div style="font-size: 12px; color: #94a3b8; font-family: monospace; margin-top: 4px;">
//         ✉️ ${m.email} ${m.phone ? `• 📞 ${m.phone}` : ""} ${m.organization ? `• 🏛️ ${m.organization}` : ""}
//       </div>
//     </div>
//   `).join("");

//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Welcome to YODHA 2 – Registration Confirmed</title>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       background-color: #050816;
//       font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//       color: #e2e8f0;
//       -webkit-font-smoothing: antialiased;
//     }
//     table {
//       border-spacing: 0;
//     }
//     td {
//       padding: 0;
//     }
//     img {
//       border: 0;
//     }
//     .wrapper {
//       width: 100%;
//       table-layout: fixed;
//       background-color: #050816;
//       padding-bottom: 40px;
//     }
//     .main {
//       background-color: #090c16;
//       margin: 0 auto;
//       width: 100%;
//       max-width: 600px;
//       border-spacing: 0;
//       color: #e2e8f0;
//       border: 1px solid #1e293b;
//       border-radius: 16px;
//       overflow: hidden;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.8);
//     }
//     .banner-img {
//       width: 100%;
//       max-width: 600px;
//       height: auto;
//       display: block;
//     }
//     .content-padding {
//       padding: 32px 28px;
//     }
//     .header-tag {
//       font-size: 11px;
//       font-family: monospace;
//       color: #38bdf8;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       font-weight: bold;
//       margin-bottom: 6px;
//     }
//     .heading-title {
//       font-size: 24px;
//       font-weight: 800;
//       color: #ffffff;
//       margin: 0 0 16px 0;
//       line-height: 1.3;
//     }
//     .paragraph-text {
//       font-size: 14px;
//       line-height: 1.6;
//       color: #cbd5e1;
//       margin-bottom: 20px;
//     }
//     .card-box {
//       background-color: #0f172a;
//       border: 1px solid #1e293b;
//       border-radius: 12px;
//       padding: 20px;
//       margin-bottom: 24px;
//     }
//     .card-title {
//       font-size: 13px;
//       font-family: monospace;
//       font-weight: 800;
//       color: #38bdf8;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       border-bottom: 1px solid #1e293b;
//       padding-bottom: 10px;
//       margin-bottom: 14px;
//     }
//     .detail-row {
//       margin-bottom: 12px;
//     }
//     .detail-label {
//       font-size: 11px;
//       font-family: monospace;
//       color: #94a3b8;
//       text-transform: uppercase;
//       margin-bottom: 3px;
//     }
//     .detail-value {
//       font-size: 14px;
//       font-weight: 700;
//       color: #ffffff;
//     }
//     .badge-status {
//       display: inline-block;
//       background-color: rgba(16, 185, 129, 0.15);
//       border: 1px solid #10b981;
//       color: #34d399;
//       font-size: 12px;
//       font-weight: bold;
//       padding: 4px 12px;
//       border-radius: 20px;
//       margin-top: 4px;
//     }
//     .gold-box {
//       background-color: #171203;
//       border: 1.5px solid #fbbf24;
//       border-radius: 12px;
//       padding: 20px;
//       margin-bottom: 24px;
//     }
//     .gold-title {
//       font-size: 12px;
//       font-family: monospace;
//       font-weight: 800;
//       color: #fbbf24;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       margin-bottom: 10px;
//     }
//     .referral-code-display {
//       font-family: monospace;
//       font-size: 26px;
//       font-weight: 900;
//       color: #fbbf24;
//       letter-spacing: 2px;
//       background-color: #050816;
//       border: 1px dashed #fbbf24;
//       padding: 12px;
//       border-radius: 8px;
//       text-align: center;
//       margin: 12px 0;
//     }
//     .list-item {
//       font-size: 13.5px;
//       line-height: 1.6;
//       color: #cbd5e1;
//       margin-bottom: 8px;
//       padding-left: 4px;
//     }
//     .footer {
//       border-top: 1px solid #1e293b;
//       padding-top: 24px;
//       margin-top: 24px;
//       font-size: 12px;
//       color: #64748b;
//       text-align: center;
//       line-height: 1.6;
//     }
//     .footer a {
//       color: #38bdf8;
//       text-decoration: none;
//     }
//   </style>
// </head>
// <body>
//   <center class="wrapper">
//     <table class="main" width="100%">
//       <!-- Header Banner Image -->
//       <tr>
//         <td>
//           <a href="${websiteUrl}" target="_blank">
//             <img src="${bannerUrl}" alt="YODHA 2 Banner" class="banner-img">
//           </a>
//         </td>
//       </tr>

//       <!-- Content Body -->
//       <tr>
//         <td class="content-padding">
//           <div class="header-tag">YODHA 2.0 • WARRIORS OF AI</div>
//           <h1 class="heading-title">Registration Confirmed 🎉</h1>

//           <p class="paragraph-text">
//             Hello <strong>${data.leaderName}</strong>,<br><br>
//             Welcome to <strong>YODHA 2 – Warriors of AI</strong>!<br><br>
//             We are delighted to confirm that your team's registration has been successfully received. Thank you for being a part of one of India's exciting AI innovation challenges. We look forward to seeing your ideas transform into impactful solutions.
//           </p>

//           <!-- Registration Details Card -->
//           <div class="card-box">
//             <div class="card-title">📋 Registration Summary</div>
            
//             <div class="detail-row">
//               <div class="detail-label">👤 Team Leader</div>
//               <div class="detail-value">${data.leaderName}</div>
//               ${data.leaderEmail ? `<div style="font-size: 12px; color: #94a3b8; font-family: monospace;">✉️ ${data.leaderEmail} ${data.leaderPhone ? `• 📞 ${data.leaderPhone}` : ""} ${data.organization ? `• 🏛️ ${data.organization}` : ""}</div>` : ""}
//             </div>

//             <div class="detail-row">
//               <div class="detail-label">👥 Team Name</div>
//               <div class="detail-value">${data.teamName}</div>
//             </div>

//             <div class="detail-row">
//               <div class="detail-label">🏆 Track / Problem Statement</div>
//               <div class="detail-value" style="color: #38bdf8;">${data.track}</div>
//             </div>

//             ${data.pptLink ? `
//             <div class="detail-row">
//               <div class="detail-label">📁 Google Drive PPT Presentation Link</div>
//               <div class="detail-value">
//                 <a href="${data.pptLink}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-family: monospace;">${data.pptLink}</a>
//               </div>
//             </div>
//             ` : ""}

//             <div class="detail-row">
//               <div class="detail-label">👨‍💻 Total Team Size</div>
//               <div class="detail-value">${data.teamSize} Member(s)</div>
//             </div>

//             <div class="detail-row">
//               <div class="detail-label">🛡️ Warrior Referral Code</div>
//               <div class="detail-value" style="color: #fbbf24; font-family: monospace;">${data.referralCode}</div>
//             </div>

//             <div class="detail-row">
//               <div class="detail-label">📅 Registration Date</div>
//               <div class="detail-value">${data.registrationDate}</div>
//             </div>

//             <div class="detail-row" style="margin-bottom: 0;">
//               <div class="detail-label">✅ Status</div>
//               <div class="badge-status">Registration Confirmed</div>
//             </div>
//           </div>

//           <!-- Full Team Roster Section -->
//           ${data.members && data.members.length > 0 ? `
//           <div class="card-box">
//             <div class="card-title">👥 Team Roster & Submitted Details</div>
//             ${membersHtml}
//           </div>
//           ` : ""}

//           <!-- What Happens Next Section -->
//           <div class="card-box">
//             <div class="card-title">🚀 What Happens Next?</div>
//             <div class="list-item">• Our organizing committee will carefully review all registrations.</div>
//             <div class="list-item">• The shortlisting process will begin shortly.</div>
//             <div class="list-item">• Selected teams will receive further instructions through email.</div>
//             <div class="list-item">• Please keep checking your inbox regularly for important announcements.</div>
//             <div class="list-item">• We kindly request you to be patient while the evaluation process is completed.</div>
//           </div>

//           <!-- Warrior Referral Code Section -->
//           <div class="gold-box">
//             <div class="gold-title">🛡️ YOUR WARRIOR REFERRAL CODE</div>
//             <div class="referral-code-display">${data.referralCode}</div>
//             <p class="paragraph-text" style="font-size: 12.5px; margin-bottom: 0; color: #fef08a;">
//               Share this code with your friends and fellow innovators. Whenever another team registers using your Warrior Referral Code, they will automatically be linked to your referral room.
//             </p>
//           </div>

//           <p class="paragraph-text">
//             Thank you once again for choosing to participate in YODHA 2.<br>
//             We wish you and your team the very best and look forward to witnessing your innovation.<br><br>
//             See you at YODHA 2!
//           </p>

//           <!-- Footer -->
//           <div class="footer">
//             <strong style="color: #ffffff; font-size: 13px;">Best Regards,<br>YODHA Hackathon Team</strong><br>
//             <span style="color: #38bdf8;">Warriors of AI</span><br><br>
//             Official Website: <a href="${websiteUrl}" target="_blank">${websiteUrl}</a><br>
//             Contact Email: <a href="mailto:${contactEmail}">${contactEmail}</a><br><br>
//             <span style="font-size: 11px; color: #475569;">
//               This is an automated email generated by the YODHA Hackathon Registration System.<br>Please do not reply to this email.
//             </span>
//           </div>
//         </td>
//       </tr>
//     </table>
//   </center>
// </body>
// </html>
//   `;
// }




export interface TeamMemberDetails {
  role: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
}

export interface RegistrationEmailPayload {
  leaderName: string;
  leaderEmail: string;
  leaderPhone?: string;
  organization?: string;
  teamName: string;
  track: string;
  problemStatementId?: number;
  problemStatementTitle?: string;
  pptLink?: string;
  teamSize: number;
  referralCode: string;
  registrationDate: string;
  members?: TeamMemberDetails[];
  websiteUrl?: string;
  contactEmail?: string;
}

/**
 * Generate a premium, high-impact HTML email template matching YODHA 2.0 theme.
 * Dual PC and Mobile responsive design with zero line breakages or layout overflows.
 */
export function generateEmailTemplate(
  data: RegistrationEmailPayload
): string {
  const websiteUrl =
    data.websiteUrl ||
    (typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_WEBSITE_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_WEBSITE_URL) ||
    "https://yodha.aidajecc.in/";

  const contactEmail =
    data.contactEmail ||
    (typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_CONTACT_EMAIL) ||
    (typeof process !== "undefined" && process.env?.VITE_CONTACT_EMAIL) ||
    "yodha@jecc.ac.in";

  const bannerUrl =
    (typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_BANNER_URL) ||
    (typeof process !== "undefined" &&
      process.env?.VITE_BANNER_URL) ||
    "https://res.cloudinary.com/nitmjwdw/image/upload/v1785824597/banner_hbdreq.webp";

  /**
   * Escape dynamic values before placing them inside HTML.
   */
  const escapeHtml = (value: unknown): string =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const e = escapeHtml;

  const safeWebsiteUrl = e(websiteUrl);
  const safeContactEmail = e(contactEmail);
  const safeReferralCode = e(data.referralCode);

  /**
   * Referral URL.
   */
  const referralTarget = `${websiteUrl.replace(/\/+$/, "")}/register?ref=${encodeURIComponent(
    data.referralCode
  )}`;

  /**
   * WhatsApp share URL.
   */
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `🚀 Join YODHA 2.0 – Warriors of AI!\n\nUse my Warrior Referral Code: ${data.referralCode}\n\nRegister your team here: ${referralTarget}`
  )}`;

  /**
   * Email share URL.
   */
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    "Invitation: Join YODHA 2.0 – Warriors of AI"
  )}&body=${encodeURIComponent(
    `Hey Cyber Warrior,\n\nWe are building the future at YODHA 2.0 – Warriors of AI Hackathon.\n\nUse my official Warrior Referral Code: ${data.referralCode}\n\nRegister your team here:\n${referralTarget}\n\nSee you on the leaderboard!`
  )}`;

  /**
   * Team members roster HTML generator.
   */
  const membersHtml = (data.members || [])
    .map(
      (member, index) => `
        <tr>
          <td style="padding: 0 0 10px 0;">
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background: #091224;
                border: 1px solid #1e2e4a;
                border-radius: 12px;
                width: 100%;
              "
            >
              <tr>
                <td style="padding: 14px 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-family: Arial, Helvetica, sans-serif;">
                        <div style="font-size: 10px; line-height: 1.2; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 800; color: #38bdf8;">
                          ${e(member.role || `WARRIOR ${index + 1}`)}
                        </div>
                        <div style="padding-top: 4px; font-size: 15px; line-height: 1.35; font-weight: 800; color: #ffffff;">
                          ${e(member.fullName)}
                        </div>
                        <div style="padding-top: 6px; font-size: 12px; line-height: 1.5; color: #94a3b8; word-break: break-word;">
                          ${member.email ? `<span style="color: #cbd5e1;">✉️ ${e(member.email)}</span>` : ""}
                          ${member.phone ? `<span style="display: inline-block; margin-left: 8px; color: #cbd5e1;">📞 ${e(member.phone)}</span>` : ""}
                          ${member.organization ? `<div style="padding-top: 4px; color: #94a3b8;">🏛️ ${e(member.organization)}</div>` : ""}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>YODHA 2.0 — Registration Confirmed</title>

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![style]>
    td, th, div, p, a, h1, h2, h3 { font-family: Arial, sans-serif !important; }
  <![endif]-->

  <style>
    /* RESET STYLES */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background-color: #030712 !important;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    div[style*="margin: 16px 0"] { margin: 0 !important; }
    table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; }
    table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
    a { text-decoration: none; color: inherit; }

    /* MOBILE & PC DUAL RESPONSIVE MEDIA QUERIES */
    @media only screen and (max-width: 600px) {
      .outer-container {
        padding-left: 6px !important;
        padding-right: 6px !important;
        padding-top: 10px !important;
        padding-bottom: 20px !important;
      }
      .email-card {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 16px !important;
      }
      .content-padding {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
      .mobile-stack {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 10px !important;
      }
      .mobile-btn {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
        padding: 14px 10px !important;
        font-size: 13px !important;
      }
      .hero-heading {
        font-size: 24px !important;
        line-height: 1.25 !important;
      }
      .referral-code-text {
        font-size: 22px !important;
        letter-spacing: 2px !important;
        word-break: break-all !important;
      }
      .share-col {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 8px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; word-spacing: normal;">

  <!-- PREHEADER / HIDDEN EMAIL PREVIEW TEXT -->
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; color: transparent; font-size: 1px; line-height: 1px; max-width: 0px;">
    🚀 YODHA 2.0 Registration Confirmed for Team ${e(data.teamName)}! Your Warrior Code is ${safeReferralCode}.
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- OUTER WRAPPER -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #030712; width: 100%;">
    <tr>
      <td align="center" class="outer-container" style="padding: 24px 12px 40px 12px; background-color: #030712;">

        <!-- MAIN CONTAINER EMAIL CARD -->
        <table role="presentation" class="email-card" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #060b17; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);">
          
          <!-- GRADIENT CYBER TOP ACCENT BAR -->
          <tr>
            <td height="5" style="height: 5px; background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f59e0b 100%); font-size: 0; line-height: 0;">
              &nbsp;
            </td>
          </tr>

          <!-- BANNER IMAGE -->
          <tr>
            <td style="padding: 0; background-color: #030712;">
              <a href="${safeWebsiteUrl}" target="_blank" style="text-decoration: none; display: block;">
                <img src="${e(bannerUrl)}" alt="YODHA 2.0 Banner" width="620" style="width: 100%; max-width: 620px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- HERO SECTION -->
          <tr>
            <td class="content-padding" style="padding: 28px 28px 12px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- STATUS BADGE -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                      <tr>
                        <td style="background-color: #052e25; border: 1px solid #10b981; border-radius: 999px; padding: 4px 12px;">
                          <span style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 800; color: #34d399; letter-spacing: 1px; text-transform: uppercase;">
                            ● REGISTRATION CONFIRMED
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #38bdf8;">
                      YODHA 2.0 &nbsp;•&nbsp; WARRIORS OF AI
                    </div>
                    <div class="hero-heading" style="padding-top: 6px; font-family: Arial, sans-serif; font-size: 28px; line-height: 1.2; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
                      Welcome to the Arena, <span style="color: #38bdf8;">${e(data.leaderName)}</span>!
                    </div>
                    <div style="padding-top: 12px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.65; color: #94a3b8;">
                      Your squad <strong style="color: #ffffff;">${e(data.teamName)}</strong> has been successfully verified and registered for <strong style="color: #ffffff;">YODHA 2.0</strong>. Review your registration dossier below.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 01: DOSSIER -->
          <tr>
            <td class="content-padding" style="padding: 16px 28px 8px 28px;">
              <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #7dd3fc; padding-bottom: 12px;">
                01 // SQUAD DOSSIER
              </div>

              <!-- DUAL COLUMN CARDS TABLE -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <!-- ROW 1: LEADER & TEAM NAME -->
                <tr>
                  <td class="mobile-stack" width="50%" valign="top" style="padding-right: 6px; padding-bottom: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #091224; border: 1px solid #1e2e4a; border-radius: 14px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #64748b;">
                            TEAM CAPTAIN
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; word-break: break-word;">
                            ${e(data.leaderName)}
                          </div>
                          ${data.leaderEmail ? `<div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; word-break: break-word;">✉️ ${e(data.leaderEmail)}</div>` : ""}
                          ${data.leaderPhone ? `<div style="padding-top: 2px; font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8;">📞 ${e(data.leaderPhone)}</div>` : ""}
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td class="mobile-stack" width="50%" valign="top" style="padding-left: 6px; padding-bottom: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #091224; border: 1px solid #1e2e4a; border-radius: 14px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #64748b;">
                            TEAM NAME
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 15px; font-weight: 800; color: #38bdf8; word-break: break-word;">
                            ${e(data.teamName)}
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8;">
                            👥 Size: <strong style="color: #ffffff;">${e(data.teamSize)} Member(s)</strong>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ROW 2: TRACK & DATE -->
                <tr>
                  <td class="mobile-stack" width="50%" valign="top" style="padding-right: 6px; padding-bottom: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #091224; border: 1px solid #1e2e4a; border-radius: 14px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #64748b;">
                            CHOSEN TRACK
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 800; color: #ffffff; word-break: break-word;">
                            ⚡ ${e(data.track)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td class="mobile-stack" width="50%" valign="top" style="padding-left: 6px; padding-bottom: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #091224; border: 1px solid #1e2e4a; border-radius: 14px;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #64748b;">
                            REGISTRATION DATE
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #cbd5e1;">
                            📅 ${e(data.registrationDate)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ROW 3: PROBLEM STATEMENT & PPT LINK IF PRESENT -->
                ${
                  data.problemStatementTitle || data.pptLink
                    ? `
                <tr>
                  <td colspan="2" class="mobile-stack" style="padding-bottom: 12px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b172a; border: 1px solid #1e3a8a; border-radius: 14px;">
                      <tr>
                        <td style="padding: 16px;">
                          ${
                            data.problemStatementTitle
                              ? `
                          <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #38bdf8;">
                            PROBLEM STATEMENT ${data.problemStatementId ? `#${e(data.problemStatementId)}` : ""}
                          </div>
                          <div style="padding-top: 4px; font-family: Arial, sans-serif; font-size: 13px; line-weight: 1.5; font-weight: 700; color: #ffffff;">
                            ${e(data.problemStatementTitle)}
                          </div>
                          `
                              : ""
                          }
                          ${
                            data.pptLink
                              ? `
                          <div style="padding-top: 10px;">
                            <a href="${e(data.pptLink)}" target="_blank" style="display: inline-block; padding: 10px 16px; background-color: #0284c7; border-radius: 8px; color: #ffffff; font-family: Arial, sans-serif; font-size: 12px; font-weight: 800; text-decoration: none;">
                              📄 View Presentation Deck PPT ↗
                            </a>
                          </div>
                          `
                              : ""
                          }
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- SECTION 02: WARRIOR REFERRAL HQ -->
          <tr>
            <td class="content-padding" style="padding: 16px 28px 12px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #120e06; border: 1px dashed #f59e0b; border-radius: 18px;">
                <tr>
                  <td style="padding: 22px 20px;">
                    <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #f59e0b;">
                      02 // WARRIOR REFERRAL HQ
                    </div>
                    <div style="padding-top: 6px; font-family: Arial, sans-serif; font-size: 20px; font-weight: 900; color: #ffffff; line-height: 1.3;">
                      Rally Your Network. Claim Supreme Glory.
                    </div>
                    <div style="padding-top: 6px; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #d1d5db;">
                      Share your unique referral code with fellow teams. Every team registering with your code will be logged directly under your referral room.
                    </div>

                    <!-- REFERRAL CODE DISPLAY BOX -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 16px; background-color: #000000; border: 1px solid #78350f; border-radius: 12px;">
                      <tr>
                        <td align="center" style="padding: 16px 12px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #92400e; font-weight: 800;">
                            YOUR UNIQUE REFERRAL CODE
                          </div>
                          <div class="referral-code-text" style="padding-top: 6px; font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 900; letter-spacing: 3px; color: #fbbf24;">
                            ${safeReferralCode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- QUICK ACTION SHARE BUTTONS -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px;">
                      <tr>
                        <td class="share-col" width="50%" valign="top" style="padding-right: 4px;">
                          <a href="${e(whatsappShareUrl)}" target="_blank" class="mobile-btn" style="display: block; text-align: center; padding: 12px 10px; background-color: #064e3b; border: 1px solid #10b981; border-radius: 10px; color: #6ee7b7; font-family: Arial, sans-serif; font-size: 12px; font-weight: 800; text-decoration: none;">
                            💬 Share via WhatsApp ↗
                          </a>
                        </td>
                        <td class="share-col" width="50%" valign="top" style="padding-left: 4px;">
                          <a href="${e(emailShareUrl)}" target="_blank" class="mobile-btn" style="display: block; text-align: center; padding: 12px 10px; background-color: #1e293b; border: 1px solid #475569; border-radius: 10px; color: #e2e8f0; font-family: Arial, sans-serif; font-size: 12px; font-weight: 800; text-decoration: none;">
                            ✉️ Share via Email ↗
                          </a>
                        </td>
                      </tr>
                    </table>

                    <div style="padding-top: 12px; text-align: center; font-family: Arial, sans-serif; font-size: 11px; color: #9ca3af; word-break: break-all;">
                      Direct Link: <a href="${e(referralTarget)}" target="_blank" style="color: #f59e0b; text-decoration: underline;">${e(referralTarget)}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 03: SQUAD ROSTER -->
          ${
            data.members && data.members.length > 0
              ? `
          <tr>
            <td class="content-padding" style="padding: 16px 28px 12px 28px;">
              <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #7dd3fc; padding-bottom: 12px;">
                03 // REGISTERED SQUAD ROSTER (${data.members.length})
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${membersHtml}
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- SECTION 04: MISSION ROADMAP -->
          <tr>
            <td class="content-padding" style="padding: 16px 28px 16px 28px;">
              <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #7dd3fc; padding-bottom: 12px;">
                04 // NEXT STEPS & MISSION ROADMAP
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #080f1e; border: 1px solid #1e293b; border-radius: 16px;">
                <tr>
                  <td style="padding: 18px 18px 10px 18px;">
                    <!-- STEP 1 -->
                    <div style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                      <strong style="color: #38bdf8;">01. Verification:</strong> Registration details & submission material review by the organizing committee.
                    </div>
                    <!-- STEP 2 -->
                    <div style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                      <strong style="color: #38bdf8;">02. Shortlisting:</strong> Technical round evaluation & problem statement shortlisting.
                    </div>
                    <!-- STEP 3 -->
                    <div style="padding-bottom: 10px; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                      <strong style="color: #38bdf8;">03. Instructions:</strong> Final hackathon guidelines, schedule & portal access dispatched to Team Captain.
                    </div>
                    <!-- STEP 4 -->
                    <div style="font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                      <strong style="color: #38bdf8;">04. Arena Day:</strong> Showcase your AI innovations and compete for top prizes!
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PRIMARY WEBSITE CTA BUTTON -->
          <tr>
            <td align="center" class="content-padding" style="padding: 12px 28px 24px 28px;">
              <a href="${safeWebsiteUrl}" target="_blank" class="mobile-btn" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1px solid #38bdf8; border-radius: 12px; color: #ffffff; font-family: Arial, sans-serif; font-size: 13px; font-weight: 900; letter-spacing: 1px; text-decoration: none; text-transform: uppercase;">
                EXPLORE YODHA 2.0 PORTAL ↗
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="content-padding" style="padding: 20px 28px 30px 28px; background-color: #030712; border-top: 1px solid #1e293b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.75; color: #64748b;">
                    <strong style="color: #ffffff; font-size: 13px;">YODHA HACKATHON TEAM</strong><br>
                    <span style="color: #38bdf8; font-weight: 800;">WARRIORS OF AI</span><br><br>
                    Website: <a href="${safeWebsiteUrl}" target="_blank" style="color: #38bdf8; text-decoration: none;">${safeWebsiteUrl}</a><br>
                    Contact: <a href="mailto:${safeContactEmail}" style="color: #38bdf8; text-decoration: none;">${safeContactEmail}</a><br><br>
                    <span style="font-size: 11px; color: #475569;">
                      This is an automated operational email generated by the YODHA 2.0 Portal.<br>
                      Please do not reply directly to this email.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
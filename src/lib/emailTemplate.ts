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
//     "https://yodha-hackathon.netlify.app/";

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
 * Generate a premium, futuristic HTML email template matching YODHA branding.
 *
 * IMPORTANT:
 * Email clients generally block JavaScript, so the referral actions below use
 * normal share links rather than browser-only Clipboard/Web Share APIs.
 */
export function generateEmailTemplate(
  data: RegistrationEmailPayload
): string {
  const websiteUrl =
    data.websiteUrl ||
    (typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_WEBSITE_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_WEBSITE_URL) ||
    "https://yodha-hackathon.netlify.app/";

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
   *
   * Example:
   * https://yodha-hackathon.netlify.app/register?ref=YODHA123
   */
  const referralTarget =
    `${websiteUrl.replace(/\/+$/, "")}/register?ref=${encodeURIComponent(
      data.referralCode
    )}`;

  /**
   * WhatsApp share URL.
   */
  const whatsappShareUrl =
    `https://wa.me/?text=${encodeURIComponent(
      `Join YODHA 2 – Warriors of AI!\n\nUse my Warrior Referral Code: ${data.referralCode}\n\nRegister here: ${referralTarget}`
    )}`;

  /**
   * Email share URL.
   */
  const emailShareUrl =
    `mailto:?subject=${encodeURIComponent(
      "Join me at YODHA 2 – Warriors of AI"
    )}&body=${encodeURIComponent(
      `Hey!\n\nJoin YODHA 2 – Warriors of AI.\n\nUse my Warrior Referral Code: ${data.referralCode}\n\nRegister here:\n${referralTarget}\n\nSee you at YODHA 2!`
    )}`;

  /**
   * Team members.
   */
  const membersHtml = (data.members || [])
    .map(
      (member, index) => `
        <tr>
          <td style="padding:0 0 10px 0;">
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background:#0d1324;
                border:1px solid #202a42;
                border-radius:14px;
              "
            >
              <tr>
                <td style="padding:14px 16px;">

                  <div
                    style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:10px;
                      line-height:1.2;
                      letter-spacing:1.7px;
                      text-transform:uppercase;
                      font-weight:800;
                      color:#7dd3fc;
                    "
                  >
                    ${e(member.role || `Member ${index + 1}`)}
                  </div>

                  <div
                    style="
                      padding-top:4px;
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:15px;
                      line-height:1.35;
                      font-weight:800;
                      color:#ffffff;
                    "
                  >
                    ${e(member.fullName)}
                  </div>

                  <div
                    style="
                      padding-top:6px;
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:12px;
                      line-height:1.5;
                      color:#94a3b8;
                    "
                  >
                    ${member.email ? `✉️ ${e(member.email)}` : ""}
                    ${
                      member.phone
                        ? `&nbsp;&nbsp;•&nbsp;&nbsp;📞 ${e(member.phone)}`
                        : ""
                    }
                    ${
                      member.organization
                        ? `&nbsp;&nbsp;•&nbsp;&nbsp;🏛️ ${e(
                            member.organization
                          )}`
                        : ""
                    }
                  </div>

                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">

  <title>YODHA 2 — Registration Confirmed</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #030712;
      font-family: Arial, Helvetica, sans-serif;
      color: #e5e7eb;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a {
      text-decoration: none;
    }

    .wrapper {
      width: 100%;
      background: #030712;
    }

    .main {
      width: 100%;
      max-width: 620px;
      background: #080d19;
      border: 1px solid #1d2940;
      border-radius: 22px;
      overflow: hidden;
    }

    .content {
      padding-left: 32px;
      padding-right: 32px;
    }

    @media only screen and (max-width: 640px) {

      .outer-padding {
        padding-left: 8px !important;
        padding-right: 8px !important;
      }

      .content {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .hero-title {
        font-size: 26px !important;
      }

      .referral-code {
        font-size: 23px !important;
        letter-spacing: 2px !important;
      }

      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }

      .mobile-stack td {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .mobile-spacing {
        padding: 6px 0 !important;
      }
    }
  </style>
</head>

<body>

  <!-- PREHEADER -->
  <div
    style="
      display:none;
      max-height:0;
      overflow:hidden;
      opacity:0;
      color:transparent;
      font-size:1px;
      line-height:1px;
    "
  >
    Your YODHA 2 registration is confirmed.
    Your Warrior Referral Code is ${safeReferralCode}.
  </div>

  <center
    class="wrapper"
    style="
      width:100%;
      background:#030712;
    "
  >

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >

      <tr>

        <td
          align="center"
          class="outer-padding"
          style="
            padding:24px 12px 40px;
          "
        >

          <!-- ================================================= -->
          <!-- MAIN EMAIL CONTAINER -->
          <!-- ================================================= -->

          <table
            role="presentation"
            class="main"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >

            <!-- TOP ACCENT -->
            <tr>

              <td
                height="4"
                style="
                  height:4px;
                  background:#38bdf8;
                  font-size:0;
                  line-height:0;
                "
              >
                &nbsp;
              </td>

            </tr>

            <!-- ================================================= -->
            <!-- HERO BANNER -->
            <!-- ================================================= -->

            <tr>

              <td>

                <a
                  href="${safeWebsiteUrl}"
                  target="_blank"
                  style="text-decoration:none;"
                >

                  <img
                    src="${e(bannerUrl)}"
                    alt="YODHA 2 — Warriors of AI"
                    width="620"
                    style="
                      display:block;
                      width:100%;
                      height:auto;
                    "
                  >

                </a>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- INTRO -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:34px;
                  padding-bottom:8px;
                "
              >

                <div
                  style="
                    font-size:10px;
                    line-height:1.2;
                    letter-spacing:2.6px;
                    text-transform:uppercase;
                    font-weight:800;
                    color:#7dd3fc;
                  "
                >
                  YODHA 2.0
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  WARRIORS OF AI
                </div>

                <div
                  class="hero-title"
                  style="
                    padding-top:9px;
                    font-size:30px;
                    line-height:1.16;
                    font-weight:900;
                    letter-spacing:-0.7px;
                    color:#ffffff;
                  "
                >
                  Registration
                  <br>
                  Confirmed
                  <span style="color:#38bdf8;">✓</span>
                </div>

                <div
                  style="
                    padding-top:14px;
                    font-size:14px;
                    line-height:1.75;
                    color:#aeb9cb;
                  "
                >
                  Hello
                  <strong style="color:#ffffff;">
                    ${e(data.leaderName)}
                  </strong>,

                  <br>
                  <br>

                  Your team is officially registered for
                  <strong style="color:#ffffff;">
                    YODHA 2 – Warriors of AI
                  </strong>.

                  <br>

                  Your journey starts here.
                </div>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- CONFIRMED STATUS -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:18px;
                  padding-bottom:10px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background:#0b1721;
                    border:1px solid #164e63;
                    border-radius:14px;
                  "
                >

                  <tr>

                    <td
                      style="
                        padding:14px 16px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >

                        <tr>

                          <td
                            style="
                              font-size:11px;
                              letter-spacing:1.3px;
                              text-transform:uppercase;
                              font-weight:800;
                              color:#67e8f9;
                            "
                          >
                            REGISTRATION STATUS
                          </td>

                          <td
                            align="right"
                          >

                            <span
                              style="
                                display:inline-block;
                                padding:6px 11px;
                                border:1px solid #10b981;
                                border-radius:999px;
                                background:#052e25;
                                color:#6ee7b7;
                                font-size:11px;
                                font-weight:800;
                              "
                            >
                              ● CONFIRMED
                            </span>

                          </td>

                        </tr>

                      </table>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- SECTION 01 -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:20px;
                  padding-bottom:4px;
                "
              >

                <div
                  style="
                    font-size:11px;
                    line-height:1.2;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    font-weight:900;
                    color:#7dd3fc;
                  "
                >
                  01 / REGISTRATION SUMMARY
                </div>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- DETAILS -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:12px;
                  padding-bottom:8px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >

                  <!-- TEAM LEADER -->
                  <tr>

                    <td
                      class="mobile-stack"
                      width="48%"
                      style="
                        width:48%;
                        padding:0 4px 8px 0;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#0d1324;
                          border:1px solid #1b263d;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#7f8ea8;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              TEAM LEADER
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-size:14px;
                                line-height:1.4;
                                color:#ffffff;
                                font-weight:800;
                              "
                            >
                              ${e(data.leaderName)}
                            </div>

                            ${
                              data.leaderEmail
                                ? `
                                  <div
                                    style="
                                      padding-top:4px;
                                      font-size:11px;
                                      color:#8190a8;
                                      word-break:break-word;
                                    "
                                  >
                                    ${e(data.leaderEmail)}
                                  </div>
                                `
                                : ""
                            }

                          </td>

                        </tr>

                      </table>

                    </td>

                    <!-- TEAM NAME -->

                    <td
                      class="mobile-stack"
                      width="52%"
                      style="
                        width:52%;
                        padding:0 0 8px 4px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#0a1020;
                          border:1px solid #1b263d;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#7f8ea8;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              TEAM NAME
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-size:14px;
                                line-height:1.4;
                                color:#ffffff;
                                font-weight:800;
                              "
                            >
                              ${e(data.teamName)}
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                  </tr>

                  <!-- TRACK -->

                  <tr>

                    <td
                      class="mobile-stack"
                      width="48%"
                      style="
                        width:48%;
                        padding:0 4px 8px 0;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#0d1324;
                          border:1px solid #1b263d;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#7f8ea8;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              TRACK
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-size:13px;
                                line-height:1.45;
                                color:#67e8f9;
                                font-weight:800;
                              "
                            >
                              ${e(data.track)}
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                    <!-- TEAM SIZE -->

                    <td
                      class="mobile-stack"
                      width="52%"
                      style="
                        width:52%;
                        padding:0 0 8px 4px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#0a1020;
                          border:1px solid #1b263d;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#7f8ea8;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              TEAM SIZE
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-size:14px;
                                line-height:1.4;
                                color:#ffffff;
                                font-weight:800;
                              "
                            >
                              ${e(data.teamSize)} Member(s)
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                  </tr>

                  <!-- DATE -->

                  <tr>

                    <td
                      class="mobile-stack"
                      width="48%"
                      style="
                        width:48%;
                        padding:0 4px 8px 0;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#0d1324;
                          border:1px solid #1b263d;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#7f8ea8;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              REGISTRATION DATE
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-size:13px;
                                line-height:1.4;
                                color:#ffffff;
                                font-weight:800;
                              "
                            >
                              ${e(data.registrationDate)}
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                    <!-- REFERRAL CODE MINI -->

                    <td
                      class="mobile-stack"
                      width="52%"
                      style="
                        width:52%;
                        padding:0 0 8px 4px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background:#11100a;
                          border:1px solid #6b4f0a;
                          border-radius:13px;
                        "
                      >

                        <tr>

                          <td style="padding:14px 16px;">

                            <div
                              style="
                                font-size:10px;
                                color:#a38e4c;
                                text-transform:uppercase;
                                letter-spacing:1.2px;
                                font-weight:700;
                              "
                            >
                              WARRIOR CODE
                            </div>

                            <div
                              style="
                                padding-top:5px;
                                font-family:'Courier New',monospace;
                                font-size:14px;
                                line-height:1.4;
                                color:#fbbf24;
                                font-weight:900;
                                letter-spacing:1px;
                                word-break:break-word;
                              "
                            >
                              ${safeReferralCode}
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                  </tr>

                  ${
                    data.pptLink
                      ? `
                        <!-- PPT LINK -->

                        <tr>

                          <td colspan="2">

                            <table
                              role="presentation"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="
                                background:#0d1324;
                                border:1px solid #1b263d;
                                border-radius:13px;
                              "
                            >

                              <tr>

                                <td style="padding:14px 16px;">

                                  <div
                                    style="
                                      font-size:10px;
                                      color:#7f8ea8;
                                      text-transform:uppercase;
                                      letter-spacing:1.2px;
                                      font-weight:700;
                                    "
                                  >
                                    PRESENTATION
                                  </div>

                                  <div
                                    style="
                                      padding-top:6px;
                                      font-size:12px;
                                      line-height:1.5;
                                    "
                                  >

                                    <a
                                      href="${e(data.pptLink)}"
                                      target="_blank"
                                      style="
                                        color:#67e8f9;
                                        text-decoration:none;
                                        font-weight:800;
                                      "
                                    >
                                      Open submitted PPT ↗
                                    </a>

                                  </div>

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

            <!-- ================================================= -->
            <!-- SECTION 02 : REFERRAL -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:28px;
                  padding-bottom:10px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background:#11100a;
                    border:1px solid #6b4f0a;
                    border-radius:18px;
                  "
                >

                  <tr>

                    <td style="padding:22px 20px 20px;">

                      <div
                        style="
                          font-size:10px;
                          line-height:1.2;
                          letter-spacing:2px;
                          text-transform:uppercase;
                          font-weight:900;
                          color:#fbbf24;
                        "
                      >
                        02 / WARRIOR REFERRAL
                      </div>

                      <div
                        style="
                          padding-top:8px;
                          font-size:21px;
                          line-height:1.3;
                          color:#ffffff;
                          font-weight:900;
                        "
                      >
                        Bring your squad.
                        <br>
                        Earn your edge.
                      </div>

                      <div
                        style="
                          padding-top:7px;
                          font-size:12px;
                          line-height:1.65;
                          color:#c8c09e;
                        "
                      >
                        Share your unique referral code with fellow
                        innovators. When another team registers through
                        your referral, they are linked to your referral room.
                      </div>

                      <!-- CODE -->

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          margin-top:16px;
                          background:#06070b;
                          border:1px dashed #fbbf24;
                          border-radius:14px;
                        "
                      >

                        <tr>

                          <td
                            align="center"
                            style="padding:16px 12px;"
                          >

                            <div
                              style="
                                font-size:9px;
                                letter-spacing:2px;
                                text-transform:uppercase;
                                color:#9b8d57;
                                font-weight:800;
                              "
                            >
                              YOUR CODE
                            </div>

                            <div
                              class="referral-code"
                              style="
                                padding-top:6px;
                                font-family:'Courier New',monospace;
                                font-size:27px;
                                line-height:1.2;
                                letter-spacing:3px;
                                color:#fbbf24;
                                font-weight:900;
                                word-break:break-word;
                              "
                            >
                              ${safeReferralCode}
                            </div>

                            <div
                              style="
                                padding-top:8px;
                                font-size:10px;
                                color:#8d8258;
                              "
                            >
                              Your personal Warrior Referral Code
                            </div>

                          </td>

                        </tr>

                      </table>

                      <!-- SHARE BUTTONS -->

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="margin-top:12px;"
                      >

                        <tr>

                          <!-- WHATSAPP -->

                          <td
                            width="50%"
                            style="padding-right:4px;"
                          >

                            <a
                              href="${e(whatsappShareUrl)}"
                              target="_blank"
                              style="
                                display:block;
                                text-align:center;
                                padding:13px 7px;
                                border:1px solid #15803d;
                                border-radius:11px;
                                background:#052e16;
                                color:#86efac;
                                text-decoration:none;
                                font-size:11px;
                                font-weight:900;
                                letter-spacing:.3px;
                              "
                            >
                              SHARE ON WHATSAPP ↗
                            </a>

                          </td>

                          <!-- EMAIL -->

                          <td
                            width="50%"
                            style="padding-left:4px;"
                          >

                            <a
                              href="${e(emailShareUrl)}"
                              style="
                                display:block;
                                text-align:center;
                                padding:13px 7px;
                                border:1px solid #334155;
                                border-radius:11px;
                                background:#111827;
                                color:#e2e8f0;
                                text-decoration:none;
                                font-size:11px;
                                font-weight:900;
                                letter-spacing:.3px;
                              "
                            >
                              SHARE VIA EMAIL ↗
                            </a>

                          </td>

                        </tr>

                      </table>

                      <!-- DIRECT REFERRAL LINK -->

                      <div
                        style="
                          padding-top:15px;
                          text-align:center;
                        "
                      >

                        <a
                          href="${e(referralTarget)}"
                          target="_blank"
                          style="
                            color:#fbbf24;
                            font-size:11px;
                            line-height:1.5;
                            text-decoration:underline;
                          "
                        >
                          Open your referral registration link ↗
                        </a>

                      </div>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- TEAM ROSTER -->
            <!-- ================================================= -->

            ${
              data.members && data.members.length > 0
                ? `
                  <tr>

                    <td
                      class="content"
                      style="
                        padding-top:26px;
                        padding-bottom:6px;
                      "
                    >

                      <div
                        style="
                          font-size:11px;
                          line-height:1.2;
                          letter-spacing:2px;
                          text-transform:uppercase;
                          font-weight:900;
                          color:#7dd3fc;
                        "
                      >
                        03 / TEAM ROSTER
                      </div>

                    </td>

                  </tr>

                  <tr>

                    <td
                      class="content"
                      style="
                        padding-top:10px;
                        padding-bottom:4px;
                      "
                    >

                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >

                        ${membersHtml}

                      </table>

                    </td>

                  </tr>
                `
                : ""
            }

            <!-- ================================================= -->
            <!-- WHAT HAPPENS NEXT -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:26px;
                  padding-bottom:6px;
                "
              >

                <div
                  style="
                    font-size:11px;
                    line-height:1.2;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    font-weight:900;
                    color:#7dd3fc;
                  "
                >
                  04 / WHAT HAPPENS NEXT
                </div>

              </td>

            </tr>

            <tr>

              <td
                class="content"
                style="
                  padding-top:10px;
                  padding-bottom:6px;
                "
              >

                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background:#0b1020;
                    border:1px solid #1d2940;
                    border-radius:16px;
                  "
                >

                  <tr>

                    <td style="padding:18px 18px 10px;">

                      <!-- STEP 1 -->

                      <div
                        style="
                          padding-bottom:11px;
                          font-size:13px;
                          line-height:1.55;
                          color:#cbd5e1;
                        "
                      >
                        <span
                          style="
                            color:#38bdf8;
                            font-weight:900;
                          "
                        >
                          01
                        </span>

                        &nbsp;&nbsp;

                        Registration review by the organizing committee.
                      </div>

                      <!-- STEP 2 -->

                      <div
                        style="
                          padding-bottom:11px;
                          font-size:13px;
                          line-height:1.55;
                          color:#cbd5e1;
                        "
                      >
                        <span
                          style="
                            color:#38bdf8;
                            font-weight:900;
                          "
                        >
                          02
                        </span>

                        &nbsp;&nbsp;

                        Shortlisting and evaluation will begin shortly.
                      </div>

                      <!-- STEP 3 -->

                      <div
                        style="
                          padding-bottom:11px;
                          font-size:13px;
                          line-height:1.55;
                          color:#cbd5e1;
                        "
                      >
                        <span
                          style="
                            color:#38bdf8;
                            font-weight:900;
                          "
                        >
                          03
                        </span>

                        &nbsp;&nbsp;

                        Selected teams will receive further instructions by email.
                      </div>

                      <!-- STEP 4 -->

                      <div
                        style="
                          padding-bottom:11px;
                          font-size:13px;
                          line-height:1.55;
                          color:#cbd5e1;
                        "
                      >
                        <span
                          style="
                            color:#38bdf8;
                            font-weight:900;
                          "
                        >
                          04
                        </span>

                        &nbsp;&nbsp;

                        Keep checking your inbox for important announcements.
                      </div>

                      <!-- STEP 5 -->

                      <div
                        style="
                          font-size:13px;
                          line-height:1.55;
                          color:#cbd5e1;
                        "
                      >
                        <span
                          style="
                            color:#38bdf8;
                            font-weight:900;
                          "
                        >
                          05
                        </span>

                        &nbsp;&nbsp;

                        Stay patient while the evaluation process is completed.
                      </div>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- CTA -->
            <!-- ================================================= -->

            <tr>

              <td
                align="center"
                class="content"
                style="
                  padding-top:28px;
                  padding-bottom:18px;
                "
              >

                <a
                  href="${safeWebsiteUrl}"
                  target="_blank"
                  style="
                    display:inline-block;
                    padding:13px 23px;
                    border-radius:12px;
                    background:#38bdf8;
                    color:#03111a;
                    text-decoration:none;
                    font-size:12px;
                    letter-spacing:.8px;
                    font-weight:900;
                  "
                >
                  VISIT YODHA 2 ↗
                </a>

              </td>

            </tr>

            <!-- ================================================= -->
            <!-- FOOTER -->
            <!-- ================================================= -->

            <tr>

              <td
                class="content"
                style="
                  padding-top:16px;
                  padding-bottom:30px;
                "
              >

                <div
                  style="
                    height:1px;
                    background:#1d2940;
                    font-size:0;
                    line-height:0;
                  "
                >
                  &nbsp;
                </div>

                <div
                  style="
                    padding-top:22px;
                    text-align:center;
                    font-size:11px;
                    line-height:1.75;
                    color:#65738a;
                  "
                >

                  <strong
                    style="
                      display:block;
                      color:#ffffff;
                      font-size:12px;
                    "
                  >
                    YODHA HACKATHON TEAM
                  </strong>

                  <span
                    style="
                      color:#67e8f9;
                      font-weight:800;
                    "
                  >
                    WARRIORS OF AI
                  </span>

                  <br>
                  <br>

                  <a
                    href="${safeWebsiteUrl}"
                    target="_blank"
                    style="
                      color:#67e8f9;
                      text-decoration:none;
                    "
                  >
                    ${safeWebsiteUrl}
                  </a>

                  <br>

                  <a
                    href="mailto:${safeContactEmail}"
                    style="
                      color:#67e8f9;
                      text-decoration:none;
                    "
                  >
                    ${safeContactEmail}
                  </a>

                  <br>
                  <br>

                  <span
                    style="
                      font-size:10px;
                      color:#46536a;
                    "
                  >
                    This is an automated email generated by
                    the YODHA Hackathon Registration System.

                    <br>

                    Please do not reply to this email.
                  </span>

                </div>

              </td>

            </tr>

          </table>

        </td>

      </tr>

    </table>

  </center>

</body>
</html>
  `;
}
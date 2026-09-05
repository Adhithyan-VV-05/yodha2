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
 * Generates the YODHA 2.0 registration confirmation email.
 * The returned string is intended to be passed to your mail provider as the HTML body.
 */
export function generateEmailTemplate(data: RegistrationEmailPayload): string {
  const websiteUrl =
    data.websiteUrl ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WEBSITE_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_WEBSITE_URL) ||
    "https://yodha.aidajecc.in/";

  const contactEmail =
    data.contactEmail ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CONTACT_EMAIL) ||
    (typeof process !== "undefined" && process.env?.VITE_CONTACT_EMAIL) ||
    "yodha@jecc.ac.in";

  const bannerUrl =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BANNER_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_BANNER_URL) ||
    "https://res.cloudinary.com/nitmjwdw/image/upload/v1785824597/banner_hbdreq.webp";

  const escapeHtml = (value: unknown): string =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const e = escapeHtml;

  const safeWebsiteUrl = e(websiteUrl);
  const safeContactEmail = e(contactEmail);
  const safeReferralCode = e(data.referralCode);

  const referralTarget =
    `${websiteUrl.replace(/\\+$/, "")}/register?ref=${encodeURIComponent(data.referralCode)}`;

  const whatsappShareUrl =
    `https://wa.me/?text=${encodeURIComponent(
      `🚀 Join YODHA 2.0 – Warriors of AI!\n\nUse my Warrior Referral Code: ${data.referralCode}\n\nRegister your team here: ${referralTarget}`
    )}`;

  const emailShareUrl =
    `mailto:?subject=${encodeURIComponent(
      "Invitation: Join YODHA 2.0 – Warriors of AI"
    )}&body=${encodeURIComponent(
      `Hey Cyber Warrior,\n\nWe are building the future at YODHA 2.0 – Warriors of AI Hackathon.\n\nUse my official Warrior Referral Code: ${data.referralCode}\n\nRegister your team here:\n${referralTarget}\n\nSee you on the leaderboard!`
    )}`;

  const membersHtml = (data.members || []).map((m, index) => `
    <div class="member">
      <div class="member-number">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <div class="member-role">${e(m.role || `Warrior ${index + 1}`)}</div>
        <div class="member-name">${e(m.fullName)}</div>
        <div class="member-meta">
          ${m.email ? `✉️ ${e(m.email)}` : ""}
          ${m.phone ? `&nbsp;&nbsp;•&nbsp;&nbsp;📞 ${e(m.phone)}` : ""}
          ${m.organization ? `&nbsp;&nbsp;•&nbsp;&nbsp;🏛️ ${e(m.organization)}` : ""}
        </div>
      </div>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">

<title>YODHA 2.0 — Registration Confirmed</title>

<style>

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

body {
  background:
    radial-gradient(
      circle at 20% 0%,
      rgba(14, 165, 233, 0.10),
      transparent 28%
    ),
    radial-gradient(
      circle at 80% 100%,
      rgba(168, 85, 247, 0.07),
      transparent 30%
    ),
    #020617;

  font-family:
    Inter,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;

  color: #e2e8f0;

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* =========================================================
   PAGE
========================================================= */

.page {
  width: 100%;
  padding: 42px 18px 60px;
}

.email {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  background:
    linear-gradient(
      180deg,
      #07101e 0%,
      #050b16 40%,
      #030712 100%
    );

  border: 1px solid rgba(71, 85, 105, 0.35);

  border-radius: 28px;

  overflow: hidden;

  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.65),
    0 0 100px rgba(14, 165, 233, 0.045);
}

/* =========================================================
   TOP ENERGY LINE
========================================================= */

.energy-line {
  height: 4px;

  background:
    linear-gradient(
      90deg,
      #22d3ee 0%,
      #3b82f6 38%,
      #8b5cf6 68%,
      #f59e0b 100%
    );
}

/* =========================================================
   HERO
========================================================= */

.hero {
  position: relative;

  padding: 48px 46px 44px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 88% 12%,
      rgba(56, 189, 248, 0.14),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 96%,
      rgba(99, 102, 241, 0.10),
      transparent 28%
    );
}

.hero::before {
  content: "";

  position: absolute;

  inset: 0;

  opacity: 0.17;

  background-image:
    linear-gradient(
      rgba(56, 189, 248, 0.14) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(56, 189, 248, 0.14) 1px,
      transparent 1px
    );

  background-size: 38px 38px;

  mask-image:
    linear-gradient(
      to bottom,
      black,
      transparent 90%
    );
}

.hero::after {
  content: "";

  position: absolute;

  width: 220px;
  height: 220px;

  right: -100px;
  top: -100px;

  border: 1px solid rgba(56, 189, 248, 0.12);

  border-radius: 50%;

  box-shadow:
    0 0 0 25px rgba(56, 189, 248, 0.025),
    0 0 0 55px rgba(56, 189, 248, 0.015);
}

.hero-content {
  position: relative;
  z-index: 2;
}

/* badge */

.confirmed {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 7px 12px;

  border-radius: 999px;

  background: rgba(5, 46, 37, 0.72);

  border: 1px solid rgba(16, 185, 129, 0.6);

  color: #6ee7b7;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.4px;

  text-transform: uppercase;
}

.confirmed-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #34d399;

  box-shadow:
    0 0 10px rgba(52, 211, 153, 0.8);
}

/* logo text */

.brand {
  margin-top: 26px;

  font-size: 10px;

  letter-spacing: 3.4px;

  text-transform: uppercase;

  font-weight: 900;

  color: #67e8f9;
}

/* heading */

.hero-title {
  margin-top: 13px;

  max-width: 580px;

  font-size: 42px;

  line-height: 1.08;

  letter-spacing: -1.6px;

  font-weight: 900;

  color: #ffffff;
}

.hero-title span {
  color: #38bdf8;
}

.hero-subtitle {
  margin-top: 19px;

  max-width: 555px;

  font-size: 14px;

  line-height: 1.8;

  color: #94a3b8;
}

.hero-subtitle strong {
  color: #f8fafc;
}

/* =========================================================
   CONTENT
========================================================= */

.content {
  padding: 0 46px 46px;
}

/* =========================================================
   SECTION HEADER
========================================================= */

.section {
  margin-top: 38px;
}

.section-header {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 17px;
}

.section-index {
  width: 28px;
  height: 28px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: rgba(56, 189, 248, 0.07);

  border: 1px solid rgba(56, 189, 248, 0.16);

  color: #38bdf8;

  font-family:
    "Courier New",
    monospace;

  font-size: 9px;

  font-weight: 900;
}

.section-title {
  font-size: 10px;

  letter-spacing: 2.2px;

  font-weight: 900;

  text-transform: uppercase;

  color: #7dd3fc;
}

/* =========================================================
   DOSSIER
========================================================= */

.dossier {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 11px;
}

.dossier-item {
  position: relative;

  min-height: 108px;

  padding: 18px 18px 17px;

  border-radius: 16px;

  background:
    linear-gradient(
      145deg,
      rgba(15, 28, 49, 0.96),
      rgba(7, 15, 28, 0.96)
    );

  border: 1px solid rgba(51, 65, 85, 0.58);

  overflow: hidden;
}

.dossier-item::after {
  content: "";

  position: absolute;

  right: -26px;
  bottom: -26px;

  width: 80px;
  height: 80px;

  border-radius: 50%;

  border: 1px solid rgba(56, 189, 248, 0.07);
}

.dossier-label {
  font-size: 9px;

  font-weight: 800;

  letter-spacing: 1.6px;

  text-transform: uppercase;

  color: #64748b;
}

.dossier-value {
  margin-top: 8px;

  font-size: 15px;

  line-height: 1.4;

  font-weight: 800;

  color: #ffffff;

  word-break: break-word;
}

.dossier-value.blue {
  color: #67e8f9;
}

.dossier-meta {
  margin-top: 6px;

  font-size: 11px;

  line-height: 1.5;

  color: #94a3b8;

  word-break: break-word;
}

/* =========================================================
   PROBLEM STATEMENT
========================================================= */

.problem {
  margin-top: 11px;

  padding: 20px;

  border-radius: 16px;

  border: 1px solid rgba(37, 99, 235, 0.42);

  background:
    linear-gradient(
      135deg,
      rgba(11, 31, 61, 0.72),
      rgba(5, 16, 32, 0.98)
    );
}

.problem-top {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;
}

.problem-label {
  font-size: 9px;

  letter-spacing: 1.6px;

  text-transform: uppercase;

  color: #38bdf8;

  font-weight: 900;
}

.problem-number {
  font-family:
    "Courier New",
    monospace;

  font-size: 10px;

  color: #64748b;
}

.problem-title {
  margin-top: 8px;

  font-size: 14px;

  line-height: 1.65;

  font-weight: 700;

  color: #ffffff;
}

.problem-link {
  display: inline-block;

  margin-top: 15px;

  padding: 9px 13px;

  border-radius: 9px;

  background: rgba(2, 132, 199, 0.14);

  border: 1px solid rgba(56, 189, 248, 0.28);

  color: #67e8f9;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.7px;
}

/* =========================================================
   REFERRAL — MAIN FEATURE
========================================================= */

.referral {
  position: relative;

  border-radius: 22px;

  padding: 28px;

  overflow: hidden;

  border: 1px solid rgba(245, 158, 11, 0.48);

  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(245, 158, 11, 0.14),
      transparent 34%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(180, 83, 9, 0.07),
      transparent 38%
    ),
    #100c05;
}

.referral::before {
  content: "";

  position: absolute;

  width: 280px;
  height: 280px;

  right: -155px;
  top: -155px;

  border-radius: 50%;

  border: 1px solid rgba(245, 158, 11, 0.12);

  box-shadow:
    0 0 0 30px rgba(245, 158, 11, 0.025),
    0 0 0 70px rgba(245, 158, 11, 0.015);
}

.referral-content {
  position: relative;
  z-index: 2;
}

.referral-label {
  font-size: 9px;

  letter-spacing: 2px;

  color: #f59e0b;

  font-weight: 900;

  text-transform: uppercase;
}

.referral-title {
  margin-top: 8px;

  font-size: 23px;

  line-height: 1.25;

  font-weight: 900;

  color: #ffffff;

  letter-spacing: -0.4px;
}

.referral-copy {
  margin-top: 9px;

  max-width: 520px;

  font-size: 12px;

  line-height: 1.7;

  color: #c8c09e;
}

/* code */

.code-box {
  margin-top: 21px;

  padding: 20px;

  text-align: center;

  border-radius: 16px;

  background:
    linear-gradient(
      180deg,
      #050505,
      #020202
    );

  border: 1px dashed rgba(245, 158, 11, 0.75);

  box-shadow:
    inset 0 0 35px rgba(245, 158, 11, 0.025);
}

.code-label {
  font-size: 8px;

  letter-spacing: 2.4px;

  color: #8f7740;

  text-transform: uppercase;

  font-weight: 900;
}

.code {
  margin-top: 7px;

  font-family:
    "Courier New",
    monospace;

  font-size: 32px;

  line-height: 1.2;

  font-weight: 900;

  letter-spacing: 5px;

  color: #fbbf24;

  word-break: break-all;

  text-shadow:
    0 0 22px rgba(251, 191, 36, 0.12);
}

.code-hint {
  margin-top: 8px;

  font-size: 9px;

  color: #776944;
}

/* share actions */

.share-actions {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 8px;

  margin-top: 11px;
}

.share {
  display: flex;

  align-items: center;
  justify-content: center;

  min-height: 44px;

  border-radius: 11px;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.7px;

  text-align: center;
}

.whatsapp {
  background: rgba(5, 46, 22, 0.8);

  border: 1px solid rgba(34, 197, 94, 0.48);

  color: #86efac;
}

.email-share {
  background: rgba(15, 23, 42, 0.9);

  border: 1px solid rgba(100, 116, 139, 0.55);

  color: #e2e8f0;
}


/* =========================================================
   TEAM ROSTER
========================================================= */

.team-list {
  display: flex;

  flex-direction: column;

  gap: 9px;
}

.member {
  display: flex;

  align-items: center;

  padding: 14px 15px;

  border-radius: 14px;

  border: 1px solid rgba(51, 65, 85, 0.52);

  background:
    linear-gradient(
      135deg,
      rgba(11, 22, 39, 0.92),
      rgba(6, 14, 27, 0.92)
    );
}

.member-number {
  flex-shrink: 0;

  width: 34px;
  height: 34px;

  margin-right: 13px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  border: 1px solid rgba(56, 189, 248, 0.16);

  background: rgba(56, 189, 248, 0.06);

  color: #38bdf8;

  font-family:
    "Courier New",
    monospace;

  font-size: 9px;

  font-weight: 900;
}

.member-role {
  font-size: 8px;

  letter-spacing: 1.5px;

  text-transform: uppercase;

  color: #38bdf8;

  font-weight: 900;
}

.member-name {
  margin-top: 3px;

  color: #ffffff;

  font-size: 14px;

  font-weight: 800;
}

.member-meta {
  margin-top: 4px;

  font-size: 10px;

  line-height: 1.45;

  color: #94a3b8;

  word-break: break-word;
}

/* =========================================================
   ROADMAP
========================================================= */

.roadmap {
  padding: 8px 19px;

  border-radius: 17px;

  border: 1px solid rgba(51, 65, 85, 0.5);

  background: #070e1b;
}

.step {
  display: flex;

  gap: 13px;

  padding: 14px 0;

  border-bottom: 1px solid rgba(51, 65, 85, 0.35);
}

.step:last-child {
  border-bottom: 0;
}

.step-number {
  flex-shrink: 0;

  width: 29px;
  height: 29px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: rgba(56, 189, 248, 0.07);

  border: 1px solid rgba(56, 189, 248, 0.15);

  color: #38bdf8;

  font-family:
    "Courier New",
    monospace;

  font-size: 8px;

  font-weight: 900;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 11px;

  font-weight: 900;

  color: #ffffff;
}

.step-description {
  margin-top: 3px;

  font-size: 11px;

  line-height: 1.55;

  color: #94a3b8;
}

/* =========================================================
   CTA
========================================================= */

.cta-section {
  margin-top: 34px;

  padding-top: 28px;

  border-top: 1px solid rgba(51, 65, 85, 0.4);

  text-align: center;
}

.cta-text {
  margin-bottom: 13px;

  font-size: 10px;

  letter-spacing: 1.3px;

  text-transform: uppercase;

  color: #64748b;

  font-weight: 800;
}

.cta {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 46px;

  padding: 0 23px;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #0ea5e9,
      #2563eb
    );

  border: 1px solid rgba(125, 211, 252, 0.65);

  color: #ffffff;

  font-size: 10px;

  letter-spacing: 1px;

  font-weight: 900;

  box-shadow:
    0 12px 30px rgba(14, 165, 233, 0.14);
}

/* =========================================================
   FOOTER
========================================================= */

.footer {
  padding: 27px 42px 34px;

  border-top: 1px solid rgba(51, 65, 85, 0.35);

  background: #020617;

  text-align: center;
}

.footer-title {
  font-size: 12px;

  color: #ffffff;

  font-weight: 900;
}

.footer-brand {
  margin-top: 4px;

  font-size: 9px;

  letter-spacing: 2px;

  color: #38bdf8;

  font-weight: 900;
}

.footer-links {
  margin-top: 14px;

  font-size: 10px;

  line-height: 1.8;

  color: #64748b;
}

.footer-links a {
  color: #67e8f9;
}

.footer-note {
  margin-top: 12px;

  font-size: 9px;

  line-height: 1.65;

  color: #475569;
}

/* =========================================================
   MOBILE
========================================================= */

@media only screen and (max-width: 620px) {

  .page {
    padding: 10px 6px 25px;
  }

  .email {
    border-radius: 18px;
  }

  .hero {
    padding: 32px 21px 31px;
  }

  .hero-title {
    font-size: 29px;
    letter-spacing: -0.9px;
  }

  .hero-subtitle {
    font-size: 13px;
  }

  .content {
    padding: 0 16px 30px;
  }

  .section {
    margin-top: 31px;
  }

  .dossier {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .dossier-item {
    min-height: auto;
  }

  .problem {
    padding: 17px;
  }

  .problem-top {
    align-items: flex-start;
  }

  .referral {
    padding: 21px 16px;
    border-radius: 18px;
  }

  .referral-title {
    font-size: 20px;
  }

  .referral-copy {
    font-size: 11px;
  }

  .code-box {
    padding: 17px 10px;
  }

  .code {
    font-size: 23px;
    letter-spacing: 3px;
  }

  .share-actions {
    grid-template-columns: 1fr;
  }

  .share {
    min-height: 44px;
  }

  .member {
    align-items: flex-start;
  }

  .member-number {
    margin-right: 11px;
  }

  .roadmap {
    padding: 5px 15px;
  }

  .footer {
    padding: 24px 17px 28px;
  }

  .cta {
    width: 100%;
  }
}

</style>
</head>


<body>

<div class="page">

  <div class="email">

    <!-- ==============================================
         ENERGY BAR
    =============================================== -->

    <div class="energy-line"></div>


    <!-- ==============================================
         HERO
    =============================================== -->

    <section class="hero">

      <div class="hero-content">

        <div class="confirmed">
          <span class="confirmed-dot"></span>
          Registration Confirmed
        </div>


        <div class="brand">
          YODHA 2.0 · WARRIORS OF AI
        </div>


        <div class="hero-title">

          Welcome to the
          <br>

          <span>YODHA Arena.</span>

        </div>


        <div class="hero-subtitle">

          Hello <strong>${e(data.leaderName)}</strong>,

          <br><br>

          Your squad
          <strong>${e(data.teamName)}</strong>
          has officially secured its place in

          <strong>YODHA 2.0 – Warriors of AI.</strong>

          <br><br>

          Your registration dossier is ready below.
          Keep this email safe — your Warrior Referral
          Code is also included.

        </div>

      </div>

    </section>



    <!-- ==============================================
         MAIN CONTENT
    =============================================== -->

    <div class="content">


      <!-- ============================================
           01 — DOSSIER
      ============================================= -->

      <section class="section">

        <div class="section-header">

          <div class="section-index">
            01
          </div>

          <div class="section-title">
            Squad Dossier
          </div>

        </div>


        <div class="dossier">


          <!-- Captain -->

          <div class="dossier-item">

            <div class="dossier-label">
              ${e(data.members?.[0]?.role || "Team Captain")}
            </div>

            <div class="dossier-value">
              ${e(data.leaderName)}
            </div>

            <div class="dossier-meta">
              ✉️ ${e(data.leaderEmail)}
              <br>
              📞 ${e(data.leaderPhone || "")}
            </div>

          </div>


          <!-- Team -->

          <div class="dossier-item">

            <div class="dossier-label">
              Team Name
            </div>

            <div class="dossier-value blue">
              ${e(data.teamName)}
            </div>

            <div class="dossier-meta">
              👥 ${e(data.teamSize)} Warriors
            </div>

          </div>


          <!-- Track -->

          <div class="dossier-item">

            <div class="dossier-label">
              Chosen Track
            </div>

            <div class="dossier-value">
              ${e(data.track)}
            </div>

            <div class="dossier-meta">
              ⚡ Innovation Track
            </div>

          </div>


          <!-- Date -->

          <div class="dossier-item">

            <div class="dossier-label">
              Registered On
            </div>

            <div class="dossier-value">
              ${e(data.registrationDate)}
            </div>

            <div class="dossier-meta">
              ✓ Registration secured
            </div>

          </div>

        </div>


        <!-- Problem -->

        <div class="problem">

          <div class="problem-top">

            <div class="problem-label">
              Problem Statement
            </div>

            <div class="problem-number">
              ID · 07
            </div>

          </div>

          <div class="problem-title">

            ${e(data.problemStatementTitle || "Your submitted problem statement")}

          </div>

          <a
            class="problem-link"
            href="${e(data.pptLink || "#")}"
            target="_blank"
          >
            VIEW SUBMITTED PRESENTATION ↗
          </a>

        </div>

      </section>



      <!-- ============================================
           02 — REFERRAL
      ============================================= -->

      <section class="section">

        <div class="section-header">

          <div class="section-index">
            02
          </div>

          <div class="section-title">
            Warrior Referral
          </div>

        </div>


        <div class="referral">

          <div class="referral-content">

            <div class="referral-label">
              Your Referral Advantage
            </div>

            <div class="referral-title">

              Assemble your squad.
              <br>
              Expand the arena.

            </div>

            <div class="referral-copy">

              Invite fellow innovators to YODHA 2.0 using
              your unique Warrior Referral Code. Registrations
              made through your referral will be linked to your
              referral room automatically.

            </div>


            <!-- CODE -->

            <div class="code-box">

              <div class="code-label">
                Your Unique Warrior Code
              </div>

              <div class="code">
                ${safeReferralCode}
              </div>

              <div class="code-hint">
                Keep this code with you when sharing YODHA.
              </div>

            </div>


            <!-- SHARING -->

            <div class="share-actions">

              <a
                class="share whatsapp"
                target="_blank"
                href="https://wa.me/?text=🚀%20Join%20YODHA%202.0%20%E2%80%93%20Warriors%20of%20AI!%0A%0AUse%20my%20Warrior%20Referral%20Code:%20${safeReferralCode}%0A%0ARegister%20here:%20https%3A%2F%2Fyodha.aidajecc.in%2Fregister%3Fref%3D${safeReferralCode}"
              >
                💬 SHARE ON WHATSAPP ↗
              </a>


              <a
                class="share email-share"
                href="mailto:?subject=Join%20YODHA%202.0%20%E2%80%93%20Warriors%20of%20AI&body=Hey%20Warrior%2C%0A%0AJoin%20YODHA%202.0%20%E2%80%93%20Warriors%20of%20AI.%0A%0AUse%20my%20Warrior%20Referral%20Code%3A%20${safeReferralCode}%0A%0ARegister%20here%3A%0Ahttps%3A%2F%2Fyodha.aidajecc.in%2Fregister%3Fref%3D${safeReferralCode}"
              >
                ✉️ SHARE VIA EMAIL ↗
              </a>

            </div>
</div>

        </div>

      </section>



      <!-- ============================================
           03 — ROSTER
      ============================================= -->

      <section class="section">

        <div class="section-header">

          <div class="section-index">
            03
          </div>

          <div class="section-title">
            Registered Squad
          </div>

        </div>


        <div class="team-list">

          ${membersHtml}

        </div>

      </section>



      <!-- ============================================
           04 — ROADMAP
      ============================================= -->

      <section class="section">

        <div class="section-header">

          <div class="section-index">
            04
          </div>

          <div class="section-title">
            Mission Roadmap
          </div>

        </div>


        <div class="roadmap">


          <div class="step">

            <div class="step-number">
              01
            </div>

            <div class="step-content">

              <div class="step-title">
                Verification
              </div>

              <div class="step-description">
                Your registration and submission materials
                are reviewed by the organizing committee.
              </div>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              02
            </div>

            <div class="step-content">

              <div class="step-title">
                Shortlisting
              </div>

              <div class="step-description">
                Eligible teams move into technical evaluation
                and shortlisting.
              </div>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              03
            </div>

            <div class="step-content">

              <div class="step-title">
                Final Instructions
              </div>

              <div class="step-description">
                Selected teams receive the official schedule,
                guidelines and further instructions.
              </div>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              04
            </div>

            <div class="step-content">

              <div class="step-title">
                Arena Day
              </div>

              <div class="step-description">
                Bring your AI innovation to the arena and
                compete for the top position.
              </div>

            </div>

          </div>


        </div>

      </section>



      <!-- ============================================
           CTA
      ============================================= -->

      <div class="cta-section">

        <div class="cta-text">
          Ready for the next mission?
        </div>

        <a
          class="cta"
          href="https://yodha.aidajecc.in/"
          target="_blank"
        >
          ENTER YODHA 2.0 PORTAL ↗
        </a>

      </div>


    </div>


    <!-- ==============================================
         FOOTER
    =============================================== -->

    <footer class="footer">

      <div class="footer-title">
        YODHA HACKATHON TEAM
      </div>

      <div class="footer-brand">
        WARRIORS OF AI
      </div>


      <div class="footer-links">

        <a
          href="https://yodha.aidajecc.in/"
          target="_blank"
        >
          yodha.aidajecc.in
        </a>

        &nbsp;&nbsp;•&nbsp;&nbsp;

        <a href="mailto:yodha@jecc.ac.in">
          yodha@jecc.ac.in
        </a>

      </div>


      <div class="footer-note">

        This is an automated operational email generated
        by the YODHA 2.0 Portal.

        <br>

        Please do not reply directly to this email.

      </div>

    </footer>


  </div>

</div>

</body>
</html>`;
}

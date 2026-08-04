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
  teamSize: number;
  referralCode: string;
  registrationDate: string;
  members?: TeamMemberDetails[];
  websiteUrl?: string;
  contactEmail?: string;
}

/**
 * Generate a modern, futuristic HTML email template matching YODHA branding
 */
export function generateEmailTemplate(data: RegistrationEmailPayload): string {
  const websiteUrl = data.websiteUrl || "https://yodha-2-hackathon.netlify.app/";
  const contactEmail = data.contactEmail || "yodha.hackathon@gmail.com";
  const bannerUrl = "https://res.cloudinary.com/nitmjwdw/image/upload/v1785824597/banner_hbdreq.png";

  const membersHtml = (data.members || []).map((m, idx) => `
    <div style="background-color: #0d1222; border: 1px solid #1e293b; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px;">
      <div style="font-size: 11px; font-family: monospace; color: #38bdf8; font-weight: bold; text-transform: uppercase;">
        ${m.role || `Member ${idx + 1}`}
      </div>
      <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-top: 2px;">
        ${m.fullName}
      </div>
      <div style="font-size: 12px; color: #94a3b8; font-family: monospace; margin-top: 4px;">
        ✉️ ${m.email} ${m.phone ? `• 📞 ${m.phone}` : ""} ${m.organization ? `• 🏛️ ${m.organization}` : ""}
      </div>
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to YODHA 2 – Registration Confirmed</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050816;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #050816;
      padding-bottom: 40px;
    }
    .main {
      background-color: #090c16;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      color: #e2e8f0;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    }
    .banner-img {
      width: 100%;
      max-width: 600px;
      height: auto;
      display: block;
    }
    .content-padding {
      padding: 32px 28px;
    }
    .header-tag {
      font-size: 11px;
      font-family: monospace;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .heading-title {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }
    .paragraph-text {
      font-size: 14px;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 20px;
    }
    .card-box {
      background-color: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .card-title {
      font-size: 13px;
      font-family: monospace;
      font-weight: 800;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .detail-row {
      margin-bottom: 12px;
    }
    .detail-label {
      font-size: 11px;
      font-family: monospace;
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .detail-value {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
    }
    .badge-status {
      display: inline-block;
      background-color: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
      font-size: 12px;
      font-weight: bold;
      padding: 4px 12px;
      border-radius: 20px;
      margin-top: 4px;
    }
    .gold-box {
      background-color: #171203;
      border: 1.5px solid #fbbf24;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .gold-title {
      font-size: 12px;
      font-family: monospace;
      font-weight: 800;
      color: #fbbf24;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
    }
    .referral-code-display {
      font-family: monospace;
      font-size: 26px;
      font-weight: 900;
      color: #fbbf24;
      letter-spacing: 2px;
      background-color: #050816;
      border: 1px dashed #fbbf24;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      margin: 12px 0;
    }
    .list-item {
      font-size: 13.5px;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 8px;
      padding-left: 4px;
    }
    .footer {
      border-top: 1px solid #1e293b;
      padding-top: 24px;
      margin-top: 24px;
      font-size: 12px;
      color: #64748b;
      text-align: center;
      line-height: 1.6;
    }
    .footer a {
      color: #38bdf8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <!-- Header Banner Image -->
      <tr>
        <td>
          <a href="${websiteUrl}" target="_blank">
            <img src="${bannerUrl}" alt="YODHA 2 Banner" class="banner-img">
          </a>
        </td>
      </tr>

      <!-- Content Body -->
      <tr>
        <td class="content-padding">
          <div class="header-tag">YODHA 2.0 • WARRIORS OF AI</div>
          <h1 class="heading-title">Registration Confirmed 🎉</h1>

          <p class="paragraph-text">
            Hello <strong>${data.leaderName}</strong>,<br><br>
            Welcome to <strong>YODHA 2 – Warriors of AI</strong>!<br><br>
            We are delighted to confirm that your team's registration has been successfully received. Thank you for being a part of one of India's exciting AI innovation challenges. We look forward to seeing your ideas transform into impactful solutions.
          </p>

          <!-- Registration Details Card -->
          <div class="card-box">
            <div class="card-title">📋 Registration Summary</div>
            
            <div class="detail-row">
              <div class="detail-label">👤 Team Leader</div>
              <div class="detail-value">${data.leaderName}</div>
              ${data.leaderEmail ? `<div style="font-size: 12px; color: #94a3b8; font-family: monospace;">✉️ ${data.leaderEmail} ${data.leaderPhone ? `• 📞 ${data.leaderPhone}` : ""}</div>` : ""}
            </div>

            <div class="detail-row">
              <div class="detail-label">👥 Team Name</div>
              <div class="detail-value">${data.teamName}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">🏆 Track / Problem Statement</div>
              <div class="detail-value" style="color: #38bdf8;">${data.track}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">👨‍💻 Total Team Size</div>
              <div class="detail-value">${data.teamSize} Member(s)</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">🛡️ Warrior Referral Code</div>
              <div class="detail-value" style="color: #fbbf24; font-family: monospace;">${data.referralCode}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">📅 Registration Date</div>
              <div class="detail-value">${data.registrationDate}</div>
            </div>

            <div class="detail-row" style="margin-bottom: 0;">
              <div class="detail-label">✅ Status</div>
              <div class="badge-status">Registration Confirmed</div>
            </div>
          </div>

          <!-- Full Team Roster Section -->
          ${data.members && data.members.length > 0 ? `
          <div class="card-box">
            <div class="card-title">👥 Team Roster & Submitted Details</div>
            ${membersHtml}
          </div>
          ` : ""}

          <!-- What Happens Next Section -->
          <div class="card-box">
            <div class="card-title">🚀 What Happens Next?</div>
            <div class="list-item">• Our organizing committee will carefully review all registrations.</div>
            <div class="list-item">• The shortlisting process will begin shortly.</div>
            <div class="list-item">• Selected teams will receive further instructions through email.</div>
            <div class="list-item">• Please keep checking your inbox regularly for important announcements.</div>
            <div class="list-item">• We kindly request you to be patient while the evaluation process is completed.</div>
          </div>

          <!-- Warrior Referral Code Section -->
          <div class="gold-box">
            <div class="gold-title">🛡️ YOUR WARRIOR REFERRAL CODE</div>
            <div class="referral-code-display">${data.referralCode}</div>
            <p class="paragraph-text" style="font-size: 12.5px; margin-bottom: 0; color: #fef08a;">
              Share this code with your friends and fellow innovators. Whenever another team registers using your Warrior Referral Code, they will automatically be linked to your referral room.
            </p>
          </div>

          <p class="paragraph-text">
            Thank you once again for choosing to participate in YODHA 2.<br>
            We wish you and your team the very best and look forward to witnessing your innovation.<br><br>
            See you at YODHA 2!
          </p>

          <!-- Footer -->
          <div class="footer">
            <strong style="color: #ffffff; font-size: 13px;">Best Regards,<br>YODHA Hackathon Team</strong><br>
            <span style="color: #38bdf8;">Warriors of AI</span><br><br>
            Official Website: <a href="${websiteUrl}" target="_blank">${websiteUrl}</a><br>
            Contact Email: <a href="mailto:${contactEmail}">${contactEmail}</a><br><br>
            <span style="font-size: 11px; color: #475569;">
              This is an automated email generated by the YODHA Hackathon Registration System.<br>Please do not reply to this email.
            </span>
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
  `;
}

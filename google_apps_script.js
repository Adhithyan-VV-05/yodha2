/**
 * ==============================================================================
 * 🚀 YODHA 2.0 - GOOGLE APPS SCRIPT FOR AUTOMATED TEAM REGISTRATIONS
 * ==============================================================================
 * 
 * 📋 HOW TO SETUP & DEPLOY THIS SCRIPT:
 * 1. Open your Google Sheet (or Google Form linked spreadsheet).
 * 2. Click "Extensions" -> "Apps Script" in the top menu bar.
 * 3. Delete any default code in Code.gs and PASTE THIS ENTIRE FILE.
 * 4. Click the "Save" icon (Ctrl + S).
 * 5. Click "Deploy" (top right blue button) -> "New deployment".
 * 6. Click the gear icon (Select type) -> Choose "Web app".
 * 7. Configure settings:
 *    - Description: "Yodha 2.0 Registration API"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone"  <-- CRITICAL! MUST BE "Anyone"
 * 8. Click "Deploy", grant permissions, and COPY the Web App URL.
 * 9. Paste the Web App URL into your `.env` file as:
 *    VITE_GOOGLE_FORM_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 * 
 * ==============================================================================
 */

// 1. Handle HTTP POST Requests from Web Application
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds to prevent concurrent row write collisions
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data = {};

    // Parse JSON Payload or Form URL Encoded Payload
    try {
      data = JSON.parse(rawData);
    } catch (parseErr) {
      data = e.parameter;
    }

    // Initialize Headers if Sheet is Empty
    setupHeadersIfEmpty(sheet);

    // Extract Registration Details
    var timestamp = new Date();
    var teamName = data.teamName || "N/A";
    var teamSize = Number(data.teamSize) || 1;
    var track = data.track || "N/A";
    var problemStatement = data.problemStatementTitle || (data.problemStatementId ? "ID: " + data.problemStatementId) : "N/A";

    // Leader Details
    var leader = data.leader || {};
    var leaderName = leader.fullName || data.leaderName || "N/A";
    var leaderEmail = leader.email || data.leaderEmail || "N/A";
    var leaderPhone = leader.phone || data.leaderPhone || "N/A";
    var leaderOrg = leader.organization || "N/A";
    var leaderGender = leader.gender || "N/A";
    var leaderYear = leader.yearOfStudy || "N/A";
    var leaderGithub = leader.githubUrl || "N/A";

    // Build Row Array starting with Leader
    var row = [
      timestamp,
      teamName,
      teamSize,
      track,
      problemStatement,
      leaderName,
      leaderEmail,
      leaderPhone,
      leaderOrg,
      leaderGender,
      leaderYear,
      leaderGithub
    ];

    // Dynamically Append Members 2, 3, 4 based on teamSize
    var members = data.members || [];
    for (var i = 0; i < 3; i++) {
      if (i < teamSize - 1 && members[i]) {
        var m = members[i];
        row.push(m.fullName || "N/A");
        row.push(m.email || "N/A");
        row.push(m.phone || "N/A");
        row.push(m.organization || "N/A");
        row.push(m.gender || "N/A");
        row.push(m.yearOfStudy || "N/A");
        row.push(m.githubUrl || "N/A");
      } else {
        // Empty placeholder cells for non-existent members
        row.push("-", "-", "-", "-", "-", "-", "-");
      }
    }

    // Append Row to Google Sheet
    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Team registered successfully!", teamName: teamName })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 2. Handle HTTP GET Requests (Health Check)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "online", service: "YODHA 2.0 Google Apps Script Backend" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// 3. Setup Google Sheet Column Headers automatically on first run
function setupHeadersIfEmpty(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp",
      "Team Name",
      "Team Size",
      "Category Track",
      "Problem Statement",
      "Leader Full Name",
      "Leader Email",
      "Leader Phone",
      "Leader College / Org",
      "Leader Gender",
      "Leader Year of Study",
      "Leader GitHub URL",
      "Member 2 Full Name",
      "Member 2 Email",
      "Member 2 Phone",
      "Member 2 College / Org",
      "Member 2 Gender",
      "Member 2 Year of Study",
      "Member 2 GitHub URL",
      "Member 3 Full Name",
      "Member 3 Email",
      "Member 3 Phone",
      "Member 3 College / Org",
      "Member 3 Gender",
      "Member 3 Year of Study",
      "Member 3 GitHub URL",
      "Member 4 Full Name",
      "Member 4 Email",
      "Member 4 Phone",
      "Member 4 College / Org",
      "Member 4 Gender",
      "Member 4 Year of Study",
      "Member 4 GitHub URL"
    ];

    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#0284c7")
      .setFontColor("#ffffff");
  }
}

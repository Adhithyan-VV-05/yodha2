# 🚀 FIREBASE & GOOGLE FORMS DUAL SYNC SETUP GUIDE

This guide provides step-by-step instructions on how to collect your **Firebase Firestore API keys** and **Google Forms Entry IDs**, and configure them for **YODHA 2.0** or any future project.

---

## ⚡ PART 1: FIREBASE FIRESTORE SETUP & API KEYS

### Step 1: Create a Firebase Project
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** (or **Create a project**).
3. Enter your project name (e.g., `Yodha-2-Hackathon`) and click **Continue**.
4. Disable or Enable Google Analytics (optional) and click **Create Project**.

### Step 2: Register a Web App
1. On your project overview page, click the **Web icon (`</>`)** to add Firebase to your web app.
2. Enter an App Nickname (e.g., `Yodha Web Client`).
3. Click **Register App**.
4. You will see a `firebaseConfig` code block containing your keys:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD...",
     authDomain: "yodha-2.firebaseapp.com",
     projectId: "yodha-2",
     storageBucket: "yodha-2.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef123456"
   };
   ```

### Step 3: Enable Firestore Database
1. In the left navigation bar, go to **Build** → **Firestore Database**.
2. Click **Create Database**.
3. Choose your database location (e.g., `us-central` or `asia-south1`).
4. Select **Start in Test Mode** (allows read/write during development) and click **Create**.
5. *Rule configuration (for production)*: Under the **Rules** tab, set rules to allow creation of registration documents:
   ```rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /registrations/{document} {
         allow create: if true;
         allow read: if false; // protect user details from public read
       }
     }
   }
   ```

---

## 📋 PART 2: GOOGLE FORMS AUTOMATIC POST ENDPOINT & ENTRY IDs

To automatically post form responses directly to a Google Form without redirecting the user or opening a separate tab:

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com/) and click **Blank Form**.
2. Title your form (e.g., `Yodha 2.0 Registration Records`).
3. Add Short Answer questions for each field:
   - Question 1: `Full Name`
   - Question 2: `Email Address`
   - Question 3: `Phone Number`
   - Question 4: `Organization`
   - Question 5: `Hackathon Track`
   - Question 6: `GitHub URL`
   - Question 7: `Team Name`

### Step 2: Extract Form Response URL
1. Click the **Send** button at top right.
2. Select the **Link tab (`🔗`)**.
3. Copy the URL. It will look like this:
   `https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXXXXX/viewform`
4. Replace `/viewform` at the end with `/formResponse`:
   👉 `https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXXXXX/formResponse`

### Step 3: Extract `entry.XXXXXX` Field IDs
There are **two easy methods** to get the `entry.XXXXXX` IDs for each question:

#### Method A: Get Pre-filled Link (Easiest)
1. In Google Forms editor, click the **3 vertical dots (⋮)** in the top-right corner.
2. Click **Get pre-filled link**.
3. Fill in dummy answers for each question (e.g. `NAME_TEST`, `EMAIL_TEST`, `PHONE_TEST`).
4. Click **Get Link** at the bottom and click **Copy Link**.
5. Paste the link into a text editor. It will look like this:
   ```text
   https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?entry.123456789=NAME_TEST&entry.987654321=EMAIL_TEST&entry.456789123=PHONE_TEST...
   ```
6. Note down the `entry.XXXXXX` number attached to each question!

#### Method B: Chrome DevTools (Inspect Element)
1. Open your Google Form view link in Google Chrome.
2. Right-click on an input field and click **Inspect**.
3. Search for `<input name="entry.XXXXXX">`. The `name` attribute value is your entry ID.

---

## 🛠️ PART 3: CONFIGURING ENVIRONMENT VARIABLES (`.env`)

Create a `.env` file in your project root directory (`d:\YODHA 2\.env`) and fill in your collected values:

```env
# -------------------------------------------------------------
# FIREBASE FIRESTORE API KEYS
# -------------------------------------------------------------
VITE_FIREBASE_API_KEY=AIzaSyYourActualApiKeyHere
VITE_FIREBASE_AUTH_DOMAIN=yodha-2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=yodha-2
VITE_FIREBASE_STORAGE_BUCKET=yodha-2.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# -------------------------------------------------------------
# GOOGLE FORMS ENDPOINT & ENTRY MAPPING
# -------------------------------------------------------------
VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXXXXX/formResponse

# Replace these entry numbers with your extracted Google Form entry IDs:
VITE_GF_ENTRY_FULLNAME=entry.123456789
VITE_GF_ENTRY_EMAIL=entry.987654321
VITE_GF_ENTRY_PHONE=entry.456789123
VITE_GF_ENTRY_ORGANIZATION=entry.321654987
VITE_GF_ENTRY_TRACK=entry.789123456
VITE_GF_ENTRY_GITHUB=entry.654987321
VITE_GF_ENTRY_TEAMNAME=entry.147258369
```

---

## 🔄 PART 4: HOW TO USE THIS FOR FUTURE PROJECTS OR UPDATES

Whenever you build a new web application or update an existing project using this architecture:

1. **Copy the Utility Modules**:
   - `src/lib/firebase.ts`
   - `src/lib/googleForms.ts`
2. **Update the Form Fields**:
   - Match your input names in `src/components/RegistrationSection.tsx` with the entry IDs mapped in `src/lib/googleForms.ts`.
3. **Plug in New `.env` Keys**:
   - Create a new Firebase project or Google Form, collect the keys as shown above, and paste them into `.env`.
4. **Zero Code Changes Needed**:
   - The fallback mechanism built into `src/lib/firebase.ts` and `src/lib/googleForms.ts` ensures that even if keys are not yet configured, the user experience and UI will function smoothly without crashing!

---
*Created for YODHA 2.0 Awwwards Edition*

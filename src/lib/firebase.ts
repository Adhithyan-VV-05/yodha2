import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
} from "firebase/firestore";

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

const firebaseConfig = {
  apiKey: getEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY") || getEnvVar("VITE_FIREBASE_API_KEY") || "AIzaSyCb1foYyZbBV_SC7f4U_NTNFjPqBLQ9stA",
  authDomain: getEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN") || getEnvVar("VITE_FIREBASE_AUTH_DOMAIN") || "yodha-2.firebaseapp.com",
  projectId: getEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID") || getEnvVar("VITE_FIREBASE_PROJECT_ID") || "yodha-2",
  storageBucket: getEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET") || getEnvVar("VITE_FIREBASE_STORAGE_BUCKET") || "yodha-2.firebasestorage.app",
  messagingSenderId: getEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID") || getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID") || "56808818692",
  appId: getEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID") || getEnvVar("VITE_FIREBASE_APP_ID") || "1:56808818692:web:203e9ad64f08a5106e0d51",
  measurementId: getEnvVar("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID") || getEnvVar("VITE_FIREBASE_MEASUREMENT_ID") || "G-D0Q9RB7WVE",
};


// Initialize Firebase App & Analytics
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== "undefined") {
  if (firebaseConfig.projectId && firebaseConfig.appId) {
    isSupported().then((supported) => {
      if (supported) {
        try {
          getAnalytics(app);
        } catch (err) {
          console.warn("Firebase Analytics could not be initialized:", err);
        }
      }
    }).catch((err) => {
      console.warn("Firebase Analytics support check failed:", err);
    });
  }
}

export const db = getFirestore(app);

export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};

export interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  gender: string;
  yearOfStudy: string;
  githubUrl?: string;
}

export interface TeamRegistrationData {
  teamName: string;
  teamSize: number;
  track: string;
  problemStatementId?: number;
  problemStatementTitle?: string;
  pptLink?: string;
  leader: TeamMember;
  members: TeamMember[];
  submittedAt?: string;
  warriorReferralCode?: string;
  usedReferralCode?: string;
  allEmails?: string[];
  allPhones?: string[];
}

export interface ReferralRoomData {
  referralCode: string;
  teamId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  totalReferrals: number;
  createdAt: any;
  lastReferralAt?: any;
}

export interface ReferralEntryData {
  teamId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  registeredAt: any;
}

export interface UserSessionData {
  sessionId: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  startTimeReadable: string;
  endTime: string;
  endTimeReadable: string;
  activeDurationSeconds: number;
  totalDurationSeconds: number;
  inactiveDurationSeconds: number;
  isOnline: boolean;
  isTabActive: boolean;
  deviceType: "Mobile" | "Tablet" | "Desktop";
  screenResolution: string;
  viewportResolution: string;
  pixelRatio: number;
  orientation: string;
  userAgent: string;
  createdAt: any;
  lastActive: any;
}

/**
 * Enhanced Screen & Display Device Type Detector
 * Evaluates screen width, orientation, device pixel ratio, and user-agent string
 */
export function getDeviceTypeFromScreen(): {
  deviceType: "Mobile" | "Tablet" | "Desktop";
  screenResolution: string;
  viewportResolution: string;
  pixelRatio: number;
  orientation: string;
} {
  if (typeof window === "undefined") {
    return {
      deviceType: "Desktop",
      screenResolution: "0x0",
      viewportResolution: "0x0",
      pixelRatio: 1,
      orientation: "unknown",
    };
  }

  const width = window.innerWidth || (typeof screen !== "undefined" ? screen.width : 1024);
  const userAgent = navigator.userAgent;
  const isMobileUA = /Android|iPhone|iPod/i.test(userAgent);
  const isTabletUA = /iPad|Android(?!.*Mobile)/i.test(userAgent);

  let deviceType: "Mobile" | "Tablet" | "Desktop" = "Desktop";
  if (isMobileUA || width < 640) {
    deviceType = "Mobile";
  } else if (isTabletUA || (width >= 640 && width <= 1024)) {
    deviceType = "Tablet";
  } else {
    deviceType = "Desktop";
  }

  const screenRes = typeof screen !== "undefined" ? `${screen.width}x${screen.height}` : `${window.innerWidth}x${window.innerHeight}`;
  const viewportRes = `${window.innerWidth}x${window.innerHeight}`;
  const pixelRatio = window.devicePixelRatio || 1;
  const orientation = window.innerHeight > window.innerWidth ? "Portrait" : "Landscape";

  return {
    deviceType,
    screenResolution: screenRes,
    viewportResolution: viewportRes,
    pixelRatio,
    orientation,
  };
}

/**
 * AUTOMATIC REALTIME SITE VISIT & ACTIVE TIME TRACKER
 * - Tracks exact ACTIVE focus time spent on website.
 * - Increments `activeLiveUsers` (+1) when user is actively viewing/focused on tab.
 * - Decrements `activeLiveUsers` (-1) when user switches tabs, minimizes window, or exits.
 * - Syncs starting time, ending time, active duration, and screen metrics to Firestore `user_sessions`.
 */
/**
 * PAGE & DEVICE TRACKING DISABLED AS REQUESTED
 */
export function trackUserSession(): () => void {
  // Visitor, device, and page visit tracking disabled
  return () => {};
}

/**
 * Generate a unique Warrior Referral Code for a newly registering team
 * Format: WARRIOR-<4 random chars> or <TEAM4CHARS>-<4 random chars>
 */
export async function generateUniqueWarriorReferralCode(teamName: string): Promise<string> {
  const cleanName = teamName.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 4) || "WARR";
  let isUnique = false;
  let code = "";
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    attempts++;
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    code = `${cleanName}-${randomPart}`;
    try {
      const roomRef = doc(db, "referral_rooms", code);
      const roomSnap = await getDoc(roomRef);
      if (!roomSnap.exists()) {
        isUnique = true;
      }
    } catch {
      break;
    }
  }

  if (!isUnique) {
    code = `WARRIOR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  }

  return code;
}

/**
 * Validate that an entered Warrior Referral Code exists in referral_rooms
 */
export async function validateReferralCode(referralCode: string): Promise<{
  valid: boolean;
  roomData?: ReferralRoomData;
  error?: string;
}> {
  const code = referralCode.trim().toUpperCase();
  if (!code) return { valid: false, error: "Referral code cannot be empty." };

  try {
    const roomRef = doc(db, "referral_rooms", code);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      return { valid: false, error: "Invalid Referral Code. Please verify the code and try again." };
    }

    const roomData = roomSnap.data() as ReferralRoomData;
    return { valid: true, roomData };
  } catch (err: any) {
    console.warn("Error validating referral code in Firestore:", err);
    return { valid: false, error: "Failed to validate referral code." };
  }
}

/**
 * Realtime Duplicate Check across Firestore database for any participant's email or mobile number
 */
export async function checkParticipantDuplicate(
  email?: string,
  phone?: string
): Promise<{
  isEmailTaken: boolean;
  isPhoneTaken: boolean;
  emailError?: string;
  phoneError?: string;
}> {
  const normalizedEmail = email?.trim().toLowerCase();

  // EXPLICIT TEST EXEMPTION: Allow test email (adhithyanvv2005@gmail.com) to register multiple times without any duplicate errors
  const isTestBypassEmail = Boolean(
    normalizedEmail && (
      normalizedEmail.includes("adhithyanvv2005") ||
      normalizedEmail.includes("adhithyan")
    )
  );

  if (isTestBypassEmail) {
    return { isEmailTaken: false, isPhoneTaken: false };
  }

  let isEmailTaken = false;
  let isPhoneTaken = false;
  let emailError: string | undefined;
  let phoneError: string | undefined;

  const normalizedPhone = phone?.trim();

  if (normalizedEmail) {
    try {
      const qEmailArray = query(collection(db, "registrations"), where("allEmails", "array-contains", normalizedEmail));
      const snapEmailArray = await getDocs(qEmailArray);

      if (!snapEmailArray.empty) {
        isEmailTaken = true;
        emailError = "This email address is already registered.";
      } else {
        const qEmailLeader = query(collection(db, "registrations"), where("leader.email", "==", normalizedEmail));
        const snapEmailLeader = await getDocs(qEmailLeader);
        if (!snapEmailLeader.empty) {
          isEmailTaken = true;
          emailError = "This email address is already registered.";
        }
      }
    } catch (err) {
      console.warn("Error checking duplicate email:", err);
    }
  }

  if (normalizedPhone) {
    try {
      const qPhoneArray = query(collection(db, "registrations"), where("allPhones", "array-contains", normalizedPhone));
      const snapPhoneArray = await getDocs(qPhoneArray);

      if (!snapPhoneArray.empty) {
        isPhoneTaken = true;
        phoneError = "This mobile number is already registered.";
      } else {
        const qPhoneLeader = query(collection(db, "registrations"), where("leader.phone", "==", normalizedPhone));
        const snapPhoneLeader = await getDocs(qPhoneLeader);
        if (!snapPhoneLeader.empty) {
          isPhoneTaken = true;
          phoneError = "This mobile number is already registered.";
        }
      }
    } catch (err) {
      console.warn("Error checking duplicate phone:", err);
    }
  }

  return { isEmailTaken, isPhoneTaken, emailError, phoneError };
}

/**
 * Save complete team registration entry to Firebase Firestore
 * - ONLY called upon final form submission
 * - Bypasses duplicate checks for adhithyanvv2005@gmail.com test email
 */
export async function saveTeamToFirebase(
  data: TeamRegistrationData
): Promise<{
  success: boolean;
  id?: string;
  warriorReferralCode?: string;
  error?: string;
  isMock?: boolean;
}> {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  const allParticipants = [data.leader, ...(data.members || [])];
  const allEmails = allParticipants
    .map((p) => p.email?.trim().toLowerCase())
    .filter((e): e is string => Boolean(e));
  const allPhones = allParticipants
    .map((p) => p.phone?.trim())
    .filter((p): p is string => Boolean(p));

  // Check if testing with adhithyanvv2005@gmail.com
  const isTestingUser = allEmails.some((e) => e.includes("adhithyanvv2005") || e.includes("adhithyan"));

  // Perform pre-submission duplicate check ONLY for non-test emails
  if (!isTestingUser) {
    for (const p of allParticipants) {
      if (p.email || p.phone) {
        const dupCheck = await checkParticipantDuplicate(p.email, p.phone);
        if (dupCheck.isEmailTaken) {
          return { success: false, error: `Email "${p.email}" is already registered.` };
        }
        if (dupCheck.isPhoneTaken) {
          return { success: false, error: `Mobile number "${p.phone}" is already registered.` };
        }
      }
    }
  }

  // 3. Generate unique Warrior Referral Code for this registering team
  const warriorReferralCode = data.warriorReferralCode || (await generateUniqueWarriorReferralCode(data.teamName));
  const usedCode = data.usedReferralCode?.trim().toUpperCase() || "";

  try {
    // A. Add full team document to `registrations` collection
    const docRef = await addDoc(collection(db, "registrations"), {
      ...data,
      warriorReferralCode,
      usedReferralCode: usedCode || null,
      allEmails,
      allPhones,
      date: dateStr,
      dayOfWeek: dayName,
      createdAt: serverTimestamp(),
      submittedAt: now.toISOString(),
    });

    const teamId = docRef.id;

    // B. Create Referral Room for this team in `referral_rooms/{warriorReferralCode}`
    const roomRef = doc(db, "referral_rooms", warriorReferralCode);
    await setDoc(roomRef, {
      referralCode: warriorReferralCode,
      teamId,
      teamName: data.teamName,
      leaderName: data.leader.fullName,
      leaderEmail: data.leader.email,
      leaderPhone: data.leader.phone,
      totalReferrals: 0,
      createdAt: serverTimestamp(),
      lastReferralAt: null,
    });

    // C. If this team registered using a valid `usedReferralCode`, record entry in parent room's `referrals` subcollection
    if (usedCode) {
      const parentRoomRef = doc(db, "referral_rooms", usedCode);
      const parentRoomSnap = await getDoc(parentRoomRef);

      if (parentRoomSnap.exists()) {
        // Add referred team entry into `referral_rooms/{usedCode}/referrals/{teamId}`
        const referralSubRef = doc(db, "referral_rooms", usedCode, "referrals", teamId);
        await setDoc(referralSubRef, {
          teamId,
          teamName: data.teamName,
          leaderName: data.leader.fullName,
          leaderEmail: data.leader.email,
          leaderPhone: data.leader.phone,
          registeredAt: serverTimestamp(),
        });

        // Increment totalReferrals in parent room
        await updateDoc(parentRoomRef, {
          totalReferrals: increment(1),
          lastReferralAt: serverTimestamp(),
        });

        // Increment totalSuccessfulReferrals in stats
        const statsRef = doc(db, "stats", "site_analytics");
        await setDoc(
          statsRef,
          { totalSuccessfulReferrals: increment(1) },
          { merge: true }
        );
      }
    }

    // D. Save entry in `daily_registrations` collection
    const dailyRegRef = doc(db, "daily_registrations", `reg_${dateStr}_${data.teamName.replace(/\s+/g, "_")}`);
    await setDoc(
      dailyRegRef,
      {
        teamName: data.teamName,
        teamSize: data.teamSize,
        track: data.track,
        date: dateStr,
        dayOfWeek: dayName,
        leaderName: data.leader.fullName,
        leaderEmail: data.leader.email,
        pptLink: data.pptLink || null,
        warriorReferralCode,
        usedReferralCode: usedCode || null,
        submittedAt: now.toISOString(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    // E. Increment total candidate count, team count, & totalReferralCodes in `stats/site_analytics`
    const statsRef = doc(db, "stats", "site_analytics");
    await setDoc(
      statsRef,
      {
        totalTeamsRegistered: increment(1),
        totalCandidatesRegistered: increment(data.teamSize),
        totalReferralCodes: increment(1),
        lastRegistrationTime: serverTimestamp(),
        lastRegistrationTeam: data.teamName,
      },
      { merge: true }
    );

    return {
      success: true,
      id: teamId,
      warriorReferralCode,
      isMock: false,
    };
  } catch (err: any) {
    console.warn("Firestore writing fallback to LocalStorage:", err);
    const existing = JSON.parse(localStorage.getItem("yodha_team_registrations") || "[]");
    const mockEntry = {
      ...data,
      warriorReferralCode,
      usedReferralCode: usedCode || null,
      id: "team_" + Date.now(),
      submittedAt: new Date().toISOString(),
    };
    existing.push(mockEntry);
    localStorage.setItem("yodha_team_registrations", JSON.stringify(existing));

    return {
      success: true,
      id: mockEntry.id,
      warriorReferralCode,
      isMock: true,
    };
  }
}

/**
 * Check if a Team Name has already been registered
 */
export async function isTeamNameTaken(teamName: string): Promise<boolean> {
  const normalized = teamName.trim().toLowerCase();
  if (!normalized) return false;

  try {
    const q = query(collection(db, "registrations"), where("teamName", "==", teamName.trim()));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (err) {
    console.warn("Error checking team name in Firestore, checking fallback:", err);
    const existing: TeamRegistrationData[] = JSON.parse(localStorage.getItem("yodha_team_registrations") || "[]");
    return existing.some((t) => t.teamName.trim().toLowerCase() === normalized);
  }
}

/**
 * Fetch all Referral Rooms for Admin Dashboard
 */
export async function getAllReferralRooms(): Promise<ReferralRoomData[]> {
  try {
    const q = query(collection(db, "referral_rooms"), orderBy("totalReferrals", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as ReferralRoomData));
  } catch (err) {
    console.warn("Error fetching referral rooms:", err);
    return [];
  }
}

/**
 * Fetch referred teams in a specific Referral Room's `referrals` subcollection
 */
export async function getReferralsForRoom(referralCode: string): Promise<ReferralEntryData[]> {
  try {
    const q = query(collection(db, "referral_rooms", referralCode, "referrals"), orderBy("registeredAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as ReferralEntryData));
  } catch (err) {
    console.warn("Error fetching referrals for room:", err);
    return [];
  }
}

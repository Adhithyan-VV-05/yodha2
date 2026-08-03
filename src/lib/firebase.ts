import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  increment,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCb1foYyZbBV_SC7f4U_NTNFjPqBLQ9stA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "yodha-2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "yodha-2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "yodha-2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "56808818692",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:56808818692:web:203e9ad64f08a5106e0d51",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-D0Q9RB7WVE",
};

// Initialize Firebase App & Analytics
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export const db = getFirestore(app);

export const isFirebaseConfigured = (): boolean => true;

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
  leader: TeamMember;
  members: TeamMember[];
  submittedAt?: string;
}

/**
 * 1. AUTOMATIC SITE VISIT TRACKER (+1 visit count on load & session duration telemetry)
 */
export function trackUserSession(): () => void {
  if (typeof window === "undefined") return () => {};

  const sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const now = new Date();
  const startTimeISO = now.toISOString();
  const dateStr = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const startTimeReadable = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const deviceType = isMobile ? "Mobile" : "Desktop";
  const screenResolution = `${window.innerWidth}x${window.innerHeight}`;

  // 1. Atomically increment total site visits in `stats/site_analytics`
  const statsRef = doc(db, "stats", "site_analytics");
  setDoc(
    statsRef,
    {
      totalVisits: increment(1),
      lastVisitTime: serverTimestamp(),
      lastVisitDate: dateStr,
    },
    { merge: true }
  ).catch((err) => console.warn("Firestore visit increment notice:", err));

  // 2. Create session document in `user_sessions`
  const sessionRef = doc(db, "user_sessions", sessionId);
  const initialData = {
    sessionId,
    date: dateStr,
    dayOfWeek: dayName,
    startTime: startTimeISO,
    startTimeReadable,
    endTime: startTimeISO,
    endTimeReadable: startTimeReadable,
    durationSeconds: 0,
    deviceType,
    screenResolution,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp(),
  };

  setDoc(sessionRef, initialData).catch((err) => console.warn("Firestore session init notice:", err));

  // 3. Heartbeat timer to update session end time & total time spent
  const heartbeatInterval = setInterval(() => {
    const currentTime = new Date();
    const duration = Math.floor((currentTime.getTime() - now.getTime()) / 1000);
    const endTimeReadable = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    updateDoc(sessionRef, {
      endTime: currentTime.toISOString(),
      endTimeReadable,
      durationSeconds: duration,
      lastActive: serverTimestamp(),
    }).catch(() => {});
  }, 10000); // Heartbeat every 10s

  const handleUnload = () => {
    const currentTime = new Date();
    const duration = Math.floor((currentTime.getTime() - now.getTime()) / 1000);
    const endTimeReadable = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    updateDoc(sessionRef, {
      endTime: currentTime.toISOString(),
      endTimeReadable,
      durationSeconds: duration,
      lastActive: serverTimestamp(),
    }).catch(() => {});
  };

  window.addEventListener("beforeunload", handleUnload);

  return () => {
    clearInterval(heartbeatInterval);
    window.removeEventListener("beforeunload", handleUnload);
  };
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
 * 2. Save complete team registration entry to Firebase Firestore
 * & update daily registration analytics and team candidate counters!
 */
export async function saveTeamToFirebase(data: TeamRegistrationData): Promise<{ success: boolean; id?: string; error?: string; isMock?: boolean }> {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  try {
    // A. Add full team document to `registrations` collection
    const docRef = await addDoc(collection(db, "registrations"), {
      ...data,
      date: dateStr,
      dayOfWeek: dayName,
      createdAt: serverTimestamp(),
      submittedAt: now.toISOString(),
    });

    // B. Save entry in `daily_registrations` collection
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
        submittedAt: now.toISOString(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    // C. Increment total candidate count & team count in `stats/site_analytics`
    const statsRef = doc(db, "stats", "site_analytics");
    await setDoc(
      statsRef,
      {
        totalTeamsRegistered: increment(1),
        totalCandidatesRegistered: increment(data.teamSize),
        lastRegistrationTime: serverTimestamp(),
        lastRegistrationTeam: data.teamName,
      },
      { merge: true }
    );

    return {
      success: true,
      id: docRef.id,
      isMock: false,
    };
  } catch (err: any) {
    console.warn("Firestore writing fallback to LocalStorage:", err);
    const existing = JSON.parse(localStorage.getItem("yodha_team_registrations") || "[]");
    const mockEntry = {
      ...data,
      id: "team_" + Date.now(),
      submittedAt: new Date().toISOString(),
    };
    existing.push(mockEntry);
    localStorage.setItem("yodha_team_registrations", JSON.stringify(existing));
    
    return {
      success: true,
      id: mockEntry.id,
      isMock: true,
    };
  }
}

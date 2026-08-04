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
  deviceType: string;
  screenResolution: string;
  userAgent: string;
  createdAt: any;
  lastActive: any;
}

/**
 * 1. AUTOMATIC REALTIME SITE VISIT & ACTIVE TIME TRACKER
 * - Tracks exact ACTIVE focus time spent on website.
 * - Tab switches, window blur, or hidden tabs PAUSE active time accumulation automatically.
 * - Syncs realtime state to Firestore for live external dashboard monitoring.
 */
export function trackUserSession(): () => void {
  if (typeof window === "undefined") return () => {};

  const sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const sessionStartTime = Date.now();
  const now = new Date(sessionStartTime);
  const startTimeISO = now.toISOString();
  const dateStr = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const startTimeReadable = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const deviceType = isMobile ? "Mobile" : "Desktop";
  const screenResolution = `${window.innerWidth}x${window.innerHeight}`;

  let accumulatedActiveMs = 0;
  let activePeriodStart: number | null = document.visibilityState === "visible" && document.hasFocus() ? Date.now() : null;

  const getActiveSeconds = (): number => {
    let totalMs = accumulatedActiveMs;
    if (activePeriodStart !== null) {
      totalMs += Date.now() - activePeriodStart;
    }
    return Math.max(0, Math.floor(totalMs / 1000));
  };

  const getTotalSeconds = (): number => {
    return Math.max(0, Math.floor((Date.now() - sessionStartTime) / 1000));
  };

  // 1. Atomically increment total site visits & live online user count in `stats/site_analytics`
  const statsRef = doc(db, "stats", "site_analytics");
  setDoc(
    statsRef,
    {
      totalVisits: increment(1),
      activeLiveUsers: increment(1),
      lastVisitTime: serverTimestamp(),
      lastVisitDate: dateStr,
    },
    { merge: true }
  ).catch((err) => console.warn("Firestore visit increment notice:", err));

  // 2. Initialize session document in `user_sessions`
  const sessionRef = doc(db, "user_sessions", sessionId);
  const isCurrentlyActive = document.visibilityState === "visible" && document.hasFocus();

  const initialData: Record<string, any> = {
    sessionId,
    date: dateStr,
    dayOfWeek: dayName,
    startTime: startTimeISO,
    startTimeReadable,
    endTime: startTimeISO,
    endTimeReadable: startTimeReadable,
    activeDurationSeconds: 0,
    totalDurationSeconds: 0,
    inactiveDurationSeconds: 0,
    isOnline: true,
    isTabActive: isCurrentlyActive,
    deviceType,
    screenResolution,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  };

  setDoc(sessionRef, initialData).catch((err) => console.warn("Firestore session init notice:", err));

  let lastActiveSecsSaved = 0;

  // Sync session state to Firestore
  const syncSessionToFirestore = (isEnding = false, isTabActiveState?: boolean) => {
    const activeSecs = getActiveSeconds();
    const totalSecs = getTotalSeconds();
    const inactiveSecs = Math.max(0, totalSecs - activeSecs);
    const currentTime = new Date();
    const endTimeReadable = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const activeDelta = activeSecs - lastActiveSecsSaved;
    if (activeDelta > 0) {
      lastActiveSecsSaved = activeSecs;
      // Increment cumulative active seconds counter across all users
      setDoc(
        statsRef,
        { totalActiveSecondsAllUsers: increment(activeDelta) },
        { merge: true }
      ).catch(() => {});
    }

    const currentTabActive = isTabActiveState !== undefined
      ? isTabActiveState
      : (document.visibilityState === "visible" && document.hasFocus());

    updateDoc(sessionRef, {
      endTime: currentTime.toISOString(),
      endTimeReadable,
      activeDurationSeconds: activeSecs,
      totalDurationSeconds: totalSecs,
      inactiveDurationSeconds: inactiveSecs,
      isOnline: !isEnding,
      isTabActive: isEnding ? false : currentTabActive,
      lastActive: serverTimestamp(),
    }).catch(() => {});
  };

  // Event handlers for visibility change and focus/blur
  const handleVisibilityOrFocusChange = () => {
    const isVisibleAndFocused = document.visibilityState === "visible" && document.hasFocus();

    if (isVisibleAndFocused) {
      // User switched BACK to tab - resume active clock
      if (activePeriodStart === null) {
        activePeriodStart = Date.now();
      }
    } else {
      // User switched AWAY from tab - pause active clock & record accumulated time
      if (activePeriodStart !== null) {
        accumulatedActiveMs += Date.now() - activePeriodStart;
        activePeriodStart = null;
      }
    }

    syncSessionToFirestore(false, isVisibleAndFocused);
  };

  window.addEventListener("visibilitychange", handleVisibilityOrFocusChange);
  window.addEventListener("focus", handleVisibilityOrFocusChange);
  window.addEventListener("blur", handleVisibilityOrFocusChange);

  // Heartbeat interval every 5s to push live updates
  const heartbeatInterval = setInterval(() => {
    syncSessionToFirestore(false);
  }, 5000);

  // Handle tab unload / close
  let hasUnloaded = false;
  const handleUnload = () => {
    if (hasUnloaded) return;
    hasUnloaded = true;

    if (activePeriodStart !== null) {
      accumulatedActiveMs += Date.now() - activePeriodStart;
      activePeriodStart = null;
    }

    syncSessionToFirestore(true, false);

    // Decrement active live users counter
    setDoc(
      statsRef,
      { activeLiveUsers: increment(-1) },
      { merge: true }
    ).catch(() => {});
  };

  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("pagehide", handleUnload);

  return () => {
    clearInterval(heartbeatInterval);
    window.removeEventListener("visibilitychange", handleVisibilityOrFocusChange);
    window.removeEventListener("focus", handleVisibilityOrFocusChange);
    window.removeEventListener("blur", handleVisibilityOrFocusChange);
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("pagehide", handleUnload);
    handleUnload();
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

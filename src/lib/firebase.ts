import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
      firebaseConfig.projectId &&
      firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
};

const getDb = () => {
  if (!isFirebaseConfigured()) return null;
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    return getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization error:", error);
    return null;
  }
};

export interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  gender: string;
  yearOfStudy: string;
  githubUrl?: string; // Leader has required githubUrl
}

export interface TeamRegistrationData {
  teamName: string;
  teamSize: number;
  track: string;
  leader: TeamMember;
  members: TeamMember[];
  submittedAt?: string;
}

/**
 * Save complete team registration entry to Firebase Firestore
 */
export async function saveTeamToFirebase(data: TeamRegistrationData): Promise<{ success: boolean; id?: string; error?: string; isMock?: boolean }> {
  const db = getDb();
  
  if (!db) {
    console.info("⚡ Firebase keys not configured. Storing team registration in LocalStorage fallback.");
    const existing = JSON.parse(localStorage.getItem("yodha_team_registrations") || "[]");
    const mockEntry = {
      ...data,
      id: "team_mock_" + Date.now(),
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

  try {
    const docRef = await addDoc(collection(db, "registrations"), {
      ...data,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
    });
    return {
      success: true,
      id: docRef.id,
      isMock: false,
    };
  } catch (err: any) {
    console.error("Firestore submission error:", err);
    return {
      success: false,
      error: err.message || "Failed to write to Firestore",
    };
  }
}

# 📊 YODHA 2 - Realtime Firebase Database & Active Telemetry Documentation

This document explains how data is structured and stored in **Firebase Firestore** for **YODHA 2**, including real-time active user tracking (which excludes tab-switch and background time), and provides full code examples so you can build a **standalone Monitoring Dashboard Website**.

---

## 🚀 Key Database Features

1. **Real-time Synchronization (`onSnapshot`)**: Firestore updates all connected admin monitoring clients in real-time (< 100ms latency).
2. **Accurate Active Focus Time Tracking**:
   - Time spent while tab is active and focused is tracked in `activeDurationSeconds`.
   - **Tab Switching & Minimizing is Paused**: When a user switches tabs or minimizes the window (`visibilitychange` / `blur`), active time accumulation **stops**.
   - Background/inactive time is stored separately in `inactiveDurationSeconds`.
3. **Atomic Counters**: Uses Firebase `increment(1)` and `increment(-1)` to safely track total visits, live online users (`activeLiveUsers`), registered teams, and overall active platform seconds.

---

## 🗄️ Firestore Database Structure & Collections

The database consists of **4 main collections**:

```
yodha-2 (Firestore Root)
 ├── 📊 stats / site_analytics            (Global aggregate real-time counter document)
 ├── 👥 user_sessions / {sessionId}       (Individual active & historical user telemetry)
 ├── 📝 registrations / {registrationId}   (Complete hackathon team entries)
 └── 📅 daily_registrations / {regId}      (Daily team registration breakdown)
```

---

## 📋 1. Collection: `stats` (Document: `site_analytics`)

**Path**: `stats/site_analytics`  
Stores global real-time counters aggregated across all users and registrations.

### JSON Schema & Field Reference:

```json
{
  "totalVisits": 1420,
  "activeLiveUsers": 12,
  "totalActiveSecondsAllUsers": 89450,
  "totalTeamsRegistered": 45,
  "totalCandidatesRegistered": 180,
  "lastVisitTime": "2026-08-04T09:00:00.000Z",
  "lastVisitDate": "2026-08-04",
  "lastRegistrationTime": "2026-08-04T08:30:00.000Z",
  "lastRegistrationTeam": "Cyber Knights"
}
```

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `totalVisits` | `number` | Total number of session page visits overall. |
| `activeLiveUsers` | `number` | **Real-time count of users currently on the website right now**. |
| `totalActiveSecondsAllUsers` | `number` | Cumulative active focus seconds across all users combined. |
| `totalTeamsRegistered` | `number` | Total registered teams count. |
| `totalCandidatesRegistered` | `number` | Total registered participants (team members + leaders). |
| `lastVisitTime` | `Timestamp` | Server timestamp of the latest site visit. |
| `lastRegistrationTime` | `Timestamp` | Server timestamp of the latest team registration. |

---

## 👥 2. Collection: `user_sessions`

**Path**: `user_sessions/{sessionId}`  
Document key format: `sess_<timestamp>_<random5chars>` (e.g. `sess_1772614800000_a3x9q`)

Stores real-time telemetry for each user session, continuously synced every 5 seconds or whenever tab visibility changes.

### JSON Schema & Field Reference:

```json
{
  "sessionId": "sess_1772614800000_a3x9q",
  "date": "2026-08-04",
  "dayOfWeek": "Tuesday",
  "startTime": "2026-08-04T09:00:00.000Z",
  "startTimeReadable": "09:00:00 AM",
  "endTime": "2026-08-04T09:15:30.000Z",
  "endTimeReadable": "09:15:30 AM",
  "activeDurationSeconds": 450,
  "totalDurationSeconds": 930,
  "inactiveDurationSeconds": 480,
  "isOnline": true,
  "isTabActive": true,
  "deviceType": "Desktop",
  "screenResolution": "1920x1080",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "createdAt": "2026-08-04T09:00:00.000Z",
  "lastActive": "2026-08-04T09:15:30.000Z"
}
```

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `sessionId` | `string` | Unique session identifier. |
| `activeDurationSeconds` | `number` | **REAL ACTIVE TIME**: Seconds user actually spent focused on the website (tab switches/background time EXCLUDED). |
| `totalDurationSeconds` | `number` | Total wall-clock time elapsed since user arrived. |
| `inactiveDurationSeconds` | `number` | Time user spent while tab was hidden, minimized, or unfocused. |
| `isOnline` | `boolean` | `true` while user tab is open, `false` when window/tab is closed. |
| `isTabActive` | `boolean` | `true` if user is currently looking at this tab, `false` if switched to another tab. |
| `deviceType` | `string` `"Desktop"` \| `"Mobile"` | Client device category. |
| `screenResolution` | `string` | Browser viewport dimensions (e.g., `"1920x1080"`). |
| `date` / `dayOfWeek` | `string` | ISO Date (`"YYYY-MM-DD"`) and weekday (`"Tuesday"`). |
| `startTime` / `endTime` | `string` | ISO 8601 timestamps of session start and latest active heartbeat. |
| `lastActive` | `Timestamp` | Firebase Server Timestamp for last heartbeat sync. |

---

## 📝 3. Collection: `registrations`

**Path**: `registrations/{docId}`  
Stores full hackathon team registration entries submitted by users.

### JSON Schema:

```json
{
  "teamName": "Aura AI",
  "teamSize": 4,
  "track": "Healthcare AI",
  "problemStatementId": 2,
  "problemStatementTitle": "AI-Driven Diagnostics for Rural Clinics",
  "leader": {
    "fullName": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+91 9876543210",
    "organization": "MIT Tech",
    "gender": "Female",
    "yearOfStudy": "3rd Year",
    "githubUrl": "https://github.com/alicejohnson"
  },
  "members": [
    {
      "fullName": "Bob Smith",
      "email": "bob@example.com",
      "phone": "+91 9876543211",
      "organization": "MIT Tech",
      "gender": "Male",
      "yearOfStudy": "3rd Year"
    }
  ],
  "date": "2026-08-04",
  "dayOfWeek": "Tuesday",
  "submittedAt": "2026-08-04T09:12:00.000Z",
  "createdAt": "2026-08-04T09:12:00.000Z"
}
```

---

## 💻 How to Build Another Website to Monitor These Details

You can build a separate website (React, Next.js, Vue, or plain JS) using the **Firebase Web SDK** to listen to all these updates **in real-time**.

### Step 1: Initialize Firebase in Monitoring App

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "yodha-2.firebaseapp.com",
  projectId: "yodha-2",
  storageBucket: "yodha-2.firebasestorage.app",
  messagingSenderId: "56808818692",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### Step 2: Real-time Live Stats Listener (React Component Example)

Here is a ready-to-use React component for your separate monitoring dashboard:

```jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export function RealtimeDashboard() {
  const [stats, setStats] = useState(null);
  const [liveSessions, setLiveSessions] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  // 1. Subscribe to Live Global Site Analytics
  useEffect(() => {
    const unsubStats = onSnapshot(doc(db, "stats", "site_analytics"), (snapshot) => {
      if (snapshot.exists()) {
        setStats(snapshot.data());
      }
    });

    // 2. Subscribe to Recent Active User Sessions
    const qSessions = query(collection(db, "user_sessions"), orderBy("lastActive", "desc"), limit(20));
    const unsubSessions = onSnapshot(qSessions, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setLiveSessions(docs);
    });

    // 3. Subscribe to Recent Team Registrations
    const qRegs = query(collection(db, "registrations"), orderBy("createdAt", "desc"), limit(10));
    const unsubRegs = onSnapshot(qRegs, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setRecentRegistrations(docs);
    });

    return () => {
      unsubStats();
      unsubSessions();
      unsubRegs();
    };
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0b0f19", color: "#fff", fontFamily: "sans-serif" }}>
      <h1>⚡ Live Hackathon Monitoring Dashboard</h1>

      {/* Realtime Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#161e2e", padding: "1rem", borderRadius: "8px" }}>
          <h3>👥 Live Users Right Now</h3>
          <p style={{ fontSize: "2rem", color: "#38bdf8", fontWeight: "bold" }}>{stats?.activeLiveUsers || 0}</p>
        </div>

        <div style={{ background: "#161e2e", padding: "1rem", borderRadius: "8px" }}>
          <h3>👁️ Total Site Visits</h3>
          <p style={{ fontSize: "2rem", color: "#a855f7", fontWeight: "bold" }}>{stats?.totalVisits || 0}</p>
        </div>

        <div style={{ background: "#161e2e", padding: "1rem", borderRadius: "8px" }}>
          <h3>⏱️ Total Active User Time</h3>
          <p style={{ fontSize: "2rem", color: "#22c55e", fontWeight: "bold" }}>
            {Math.floor((stats?.totalActiveSecondsAllUsers || 0) / 60)} mins
          </p>
        </div>

        <div style={{ background: "#161e2e", padding: "1rem", borderRadius: "8px" }}>
          <h3>🚀 Registered Teams</h3>
          <p style={{ fontSize: "2rem", color: "#eab308", fontWeight: "bold" }}>{stats?.totalTeamsRegistered || 0}</p>
        </div>
      </div>

      {/* Active User Sessions Table */}
      <h2>👥 Live Sessions & Active Stay Duration</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}>
        <thead>
          <tr style={{ background: "#1e293b", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Session ID</th>
            <th>Status</th>
            <th>Tab State</th>
            <th>Active Stay Time</th>
            <th>Total Elapsed Time</th>
            <th>Inactive / Background Time</th>
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {liveSessions.map((sess) => (
            <tr key={sess.id} style={{ borderBottom: "1px solid #334155" }}>
              <td style={{ padding: "8px", fontFamily: "monospace" }}>{sess.sessionId}</td>
              <td>
                <span style={{ color: sess.isOnline ? "#22c55e" : "#64748b" }}>
                  {sess.isOnline ? "🟢 Online" : "⚪ Offline"}
                </span>
              </td>
              <td>
                <span style={{ color: sess.isTabActive ? "#38bdf8" : "#f59e0b" }}>
                  {sess.isTabActive ? "👁️ Focused" : "⏸️ Switched Tab"}
                </span>
              </td>
              <td style={{ fontWeight: "bold", color: "#4ade80" }}>{sess.activeDurationSeconds}s</td>
              <td>{sess.totalDurationSeconds}s</td>
              <td style={{ color: "#94a3b8" }}>{sess.inactiveDurationSeconds}s</td>
              <td>{sess.deviceType} ({sess.screenResolution})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🎯 Summary of Storage Methods

1. **Firestore Collections**: All session data, real-time counters, and team registrations persist permanently in Firebase Firestore.
2. **Local Fallback**: If network or Firebase credentials are lost, team registration safely records to `localStorage` key `yodha_team_registrations`.

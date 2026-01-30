# Phase 4: Reliability, Sync & Background Tasks

**Focus:** Making the app robust, offline-capable, and handling long-running AI tasks without blocking the user.

## 1. Offline Synchronization (FR-4.1)

The app must work seamlessly without internet.

### A. Architecture: "Offline First"
- **Local Database (WatermelonDB or SQLite):** The "Source of Truth" for the UI.
- **Sync Engine:** A background process that pushes local changes to Supabase and pulls remote updates.

### B. Sync Protocol
1. **Push:** When online, send all locally "dirty" records to Supabase.
2. **Pull:** Fetch all records where `updated_at > last_sync_time`.
3. **Conflict Resolution:** "Last Write Wins" strategy (simplest for single-user data).

## 2. Background Task Management (Inngest) (FR-5.1)

AI processing (Gemini) can take 5-10 seconds and might fail due to network issues. We cannot block the UI.

### Inngest Workflow
1. **Trigger:** User captures image -> Upload to Storage -> Fire Inngest Event (`image.uploaded`).
2. **Step 1 (AI Processing):** Inngest function calls Gemini API. Retries automatically on 5xx errors.
3. **Step 2 (Database Save):** Result is saved to a "Pending Review" queue in Supabase.
4. **Step 3 (Notification):** Send Push Notification to user (FR-5.2).

## 3. User Notifications (FR-5.2)

Keep the user informed when async tasks complete.

- **Tools:** Expo Notifications + Supabase Edge Functions.
- **Scenario:**
  - User snaps 5 photos in a row.
  - User closes app.
  - 2 mins later -> Notification: "5 New Vocabulary Lists Ready for Review!"

## 4. Error Handling Strategy
- **AI Failures:** If Gemini fails after max retries, tag entry as "Manual Review Needed".
- **Upload Failures:** Queue globally and retry when network is restored (using `NetInfo`).

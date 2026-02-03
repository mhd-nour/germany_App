# Phase 2: Mobile UI Implementation Roadmap

Following the successful completion of **Phase 1 (Supabase Backend)**, Phase 2 focuses on building the **React Native/Expo** mobile application. This phase will bring the AI-powered vocabulary extraction to the user's hands.

## 1. Core Screens & Navigation

### A. Capture Flow
1. **Dashboard:** Primary entry point with "New Capture" and "Recent Vocabulary".
2. **Camera/Gallery Interface:** 
   - [ ] Integration with `expo-camera` or `expo-image-picker`.
   - [ ] Image preview before upload.
3. **Processing State:** Visual feedback (skeleton loaders/animations) during Gemini OCR & extraction.

### B. Review & Edit (FR-3.1)
- [ ] **Data Form:** Dynamically generated fields based on the word category (Article/Plural for Nouns, Helper/Past Participle for Verbs).
- [ ] **Validation:** Ensure required fields are filled before saving.
- [ ] **Persistence:** Save to local state and sync with Supabase.

### C. Vocabulary Library (FR-3.3)
- [ ] **List View:** Grouped by date or category.
- [ ] **Search:** Real-time search by word or translation.
- [ ] **Filters:** Filter by Mastery Status (New, Learning, Reviewing, Mastered).

## 2. Authentication UI (FR-6)
- [ ] **Login Screen:** Email/Password authentication.
- [ ] **Sign Up Screen:** Profile creation.
- [ ] **Session Management:** Local persistence of session to prevent repetitive logins.

## 3. State Management & Sync (FR-4)
- [ ] **Sync Logic:** Implement offline-first storage (e.g., WatermelonDB or simple local cache) with Supabase background sync.
- [ ] **RLS Integration:** Ensure frontend queries respect RLS using the user's JWT.

## 4. Technical Priorities
- **AI Integration:** Prompt engineering for stable, valid JSON (Gemini 1.5 Flash).
- **UI Aesthetics:** Premium look with HSL-based colors, rounded corners (16-24px), and smooth transitions.
- **Error Handling:** Robust handling of failed uploads or AI extraction timeouts.

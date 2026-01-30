# **Project Documentation: LernDeutsch AI**

**An AI-powered mobile ecosystem for automated German vocabulary extraction and management**

---

## **1. Executive Summary**

**LernDeutsch AI** is designed to automate and simplify German language learning. The app enables learners to extract, organize, and review German vocabulary directly from text images. Using **Multimodal LLMs (Gemini 1.5 Flash)**, the system performs OCR and linguistic analysis in a single step, producing structured, study-ready vocabulary data. This eliminates manual entry, reduces errors, and improves learning efficiency.

Key Goals:

- Automate vocabulary extraction from images.
- Maintain clean, deduplicated, and structured vocabulary data.
- Offer a mobile-first interface for easy review and editing.
- Provide optional sync with tools like Notion for cross-platform learning.

---

## **2. Technical Stack (Architecture)**

| Component | Technology | Rationale |
| --- | --- | --- |
| **Mobile Frontend** | React Native + Expo | Cross-platform (iOS/Android) development, native camera access, fast UI performance. |
| **Backend API** | FastAPI (Python) | High-performance, asynchronous handling of AI requests, image uploads, and data processing. |
| **AI Engine** | Gemini 1.5 Flash | Multimodal capability: OCR + linguistic analysis in one step. Cost-effective and fast. |
| **Database & Auth** | Supabase (PostgreSQL) | Real-time sync, powerful querying, deduplication, secure authentication. |
| **File Storage** | Supabase Storage | Optimized storage for uploaded images with direct URL access. |
| **Workflow Engine** | Inngest | Manages retries, multi-step background tasks, and replaces n8n for a production-ready workflow. |

---

## **3. System Workflow (Step-by-Step)**

### **Phase 1: Image Ingestion**

1. **Capture:** User takes a photo of German text via the mobile app.
2. **Upload:** Image is uploaded to **Supabase Storage**.
3. **Trigger:** FastAPI receives the URL of the uploaded image for processing.

### **Phase 2: AI Intelligence & Analysis**

1. **AI Request:** Backend sends image to Gemini 1.5 Flash.
2. **Multimodal Processing:**
    - OCR extracts text.
    - German grammar rules are applied (A1-C1 level).
3. **Structured Output:** Gemini returns a JSON object containing:
    - Nouns (with articles and plurals)
    - Verbs (with forms)
    - Phrases & example sentences

### **Phase 3: Data Integrity & Deduplication**

1. **Query:** Backend checks if the extracted items exist in the user’s vocabulary table.
2. **Filter:** Only new or updated words are kept.
3. **Normalization:**
    - Hyphenated words joined
    - Articles standardized
    - Capitalization corrected

### **Phase 4: User Review & Persistence**

1. **Approval UI:** Users see a list of "Found Words" and can edit or approve them.
2. **Final Save:** Approved words are stored in **Supabase** and optionally synced to **Notion**.

---

## **4. Data Schema (Core Models)**

### **Vocabulary Table**

| Column | Type | Description |
| --- | --- | --- |
| id | UUID (PK) | Unique identifier for each vocabulary entry |
| user_id | UUID (FK) | References the user who owns the entry |
| word | String | e.g., "Apfel" |
| article | Enum | der/die/das or null |
| plural | String | e.g., "Äpfel" or "[-]" if no plural |
| word_type | Enum | Noun, Verb, Adjective, Phrase |
| translation | String | English/Arabic translation |
| example_sentence | Text | Contextual sentence |
| image_url | String | Reference to source image |
| status | Enum | New, Reviewing, Mastered |
| created_at | Timestamp | Date of creation |

---

## **5. User Table**

| Column | Type | Description |
| --- | --- | --- |
| id | UUID (PK) | Unique user identifier |
| email | String | User login email |
| name | String | Full name |
| created_at | Timestamp | Registration date |
| preferences | JSON | Optional: user settings like sync options, learning level |

---

## **6. Implementation Roadmap**

### **Milestone 1: Cloud Core (Week 1)**

- Set up Supabase (Database, Auth, Storage).
- Deploy FastAPI backend on a cloud provider (Railway, Vercel).
- Test basic API endpoints for image upload and retrieval.

### **Milestone 2: AI Brain (Week 2)**

- Integrate Gemini 1.5 Flash.
- Fine-tune system prompts to enforce German grammar rules.
- Validate JSON structure for nouns, verbs, and phrases.

### **Milestone 3: Mobile Experience (Week 3)**

- Implement Camera & Image Preview screens in React Native.
- Build “Review List” for user approval of extracted words.
- Add status tracking (New, Reviewing, Mastered).

### **Milestone 4: Polish & Sync (Week 4)**

- Finalize deduplication & normalization logic.
- Add optional Notion integration for syncing user data.
- Implement error handling, retries, and workflow monitoring with Inngest.

---

## **7. Key Advantages Over Previous Workflow**

1. **Speed:** Direct API uploads eliminate Google Drive lag.
2. **UI/UX:** Users can edit extracted data before it’s saved.
3. **Cost:** Gemini 1.5 Flash is cheaper than separate OCR + GPT-4 calls.
4. **Scalability:** Architecture supports thousands of users.
5. **Automation:** Reduces repetitive tasks and human error.

---

## **8. Optional Features / Future Enhancements**

- **Smart Learning Suggestions:** AI recommends words to review based on user performance.
- **Gamification:** Points, streaks, and achievements to motivate learning.
- **Multi-language support:** Extract words and translations in multiple languages.
- **Offline Mode:** Allow offline OCR and queue tasks for sync later.
- **Analytics Dashboard:** Track user progress, most reviewed words, mastery rate.

---

## **9. Security & Privacy Considerations**

- Secure image uploads using Supabase signed URLs.
- Encrypt sensitive user data (emails, user IDs).
- GDPR and local compliance for user data storage.
- Optional anonymous mode without storing images permanently.

---

## **10. Documentation & Developer Notes**

- **API Docs:** FastAPI includes OpenAPI auto-generated docs.
- **Code Guidelines:** Use type hints, PEP8 standards, and clear comments.
- **Testing:** Unit tests for backend processing, integration tests for AI outputs.
- **Workflow Monitoring:** Inngest logs all failures and retries automatically.

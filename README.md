# Project Documentation: LernDeutsch AI

An AI-powered mobile ecosystem for automated German vocabulary extraction and mastery management

## 1. Executive Summary

LernDeutsch AI is a mobile-first language learning system that automates German vocabulary acquisition by transforming images of text into structured, study-ready data.

Using Gemini 1.5 Flash, the system performs multimodal OCR, translation, and grammatical analysis in a single AI pass, extracting nouns, verbs, adjectives, adverbs, and phrases with full linguistic metadata.  
The app combines AI automation, strict normalization rules, and a human-in-the-loop review workflow to ensure both accuracy and learner control.

**Key Objectives**

- **Automated Vocabulary Extraction**  
  Convert images into structured vocabulary entries (Nouns, Verbs, Adjectives, Adverbs, Phrases).

- **Linguistic Accuracy**  
  Ensure correct articles, plurals, verb helpers, conjugations, and example sentences.

- **Data Integrity**  
  Deduplicate entries, normalize German characters (ä, ö, ü, ß), and enforce consistency.

- **Learning Lifecycle Management**  
  Track each word from New → Learning → Reviewing → Mastered.

## 2. Technical Stack (Architecture)

| Component        | Technology          | Rationale                                                   |
|-----------------|------------------|------------------------------------------------------------|
| Mobile Frontend  | React Native + Expo | Cross-platform support; camera & gallery access (FR-1.1). |
| Backend API      | FastAPI (Python)    | High-performance async processing and AI orchestration.   |
| AI Engine        | Gemini 1.5 Flash    | Single-pass OCR + translation + grammar extraction (FR-1.2). |
| Database & Auth  | Supabase (PostgreSQL) | Relational storage, auth, RLS, and offline sync (FR-4.1, FR-6). |
| Background Jobs  | Inngest             | Reliable retries for AI calls and uploads (FR-5.1).       |

## 3. System Workflow & Logic

### Phase 1: Image Ingestion & OCR (FR-1)

**Image Capture / Upload**  
Users capture text via camera or upload from the gallery (FR-1.1).

**AI Processing**  
Gemini 1.5 Flash extracts:  
- German text  
- Translation  
- Grammatical metadata  
- Word category  
in one single pass (FR-1.2).

**German Character Support**  
Full support for umlauts (ä, ö, ü) and Eszett (ß) (FR-1.3).

**Contextual Generation**  
If no example sentence exists, the AI generates at least one contextual example per noun or verb (FR-1.4).

### Phase 2: Categorization & Normalization (FR-2)

Extracted words are automatically categorized into:  
- Nouns  
- Verbs  
- Adjectives  
- Adverbs  
- Phrases (multi-word expressions)

The system enforces strict normalization rules:  
- Nouns must include definite article and plural  
- Verbs must include helper verb and past participle  
- Special characters are preserved

### Phase 3: Data Integrity & Deduplication (FR-2.2)

Before presenting results to the user:  
- The backend checks if the same word + category already exists.  
- Duplicate entries are flagged, merged, or skipped to prevent clutter.  

This ensures a clean and meaningful vocabulary database.

### Phase 4: User Review & Persistence (FR-3)

**Review & Edit Screen (Mandatory)**  
Users verify and edit AI-generated data before saving (FR-3.1).

**Manual Control**  
Users can manually create, edit, or delete vocabulary entries at any time (FR-2.4).

**Persistence & Sync**  
Approved data is saved locally and synced to Supabase when online (FR-4.1).

## 4. Vocabulary Management & Mastery Tracking

Each vocabulary entry is tracked using a learning lifecycle:  
- New  
- Learning  
- Reviewing  
- Mastered (FR-3.2)

The app provides:  
- Search by word  
- Filter by status, date, or category (FR-3.3)

## 5. Data Schema (Core Models)

**Vocabulary Table**

| Column          | Type                 | Description                        |
|-----------------|--------------------|-----------------------------------|
| id              | UUID (PK)           | Unique identifier                 |
| user_id         | UUID (FK)           | Owner reference (RLS protected)  |
| word            | String              | Base word or phrase               |
| article         | Enum                | der / die / das / null            |
| plural          | String              | Plural form (if applicable)       |
| helper_verb     | Enum                | haben / sein (verbs only)         |
| past_participle | String              | Verb past participle              |
| translation     | String              | English meaning                   |
| example         | Text                | Contextual example sentence       |
| category        | Enum                | Noun, Verb, Adjective, Adverb, Phrase |
| status          | Enum                | New, Learning, Reviewing, Mastered |
| image_url       | String              | Source image (Supabase Storage)   |
| created_at      | Timestamp           | Creation date                     |

**Profiles Table (Optional / Recommended)**

Stores application-specific user data.

| Column        | Type                         | Description                       |
|---------------|------------------------------|-----------------------------------|
| id            | UUID (PK, FK → auth.users.id)| User identifier                   |
| email         | Text                         | Cached email (optional)           |
| display_name  | Text                         | Optional username                 |
| created_at    | Timestamp                    | Profile creation time             |

## 6. Authentication & Security (FR-6)

Supabase Auth handles:  
- User registration via Email & Password (FR-6.1)  
- Secure login and logout (FR-6.2)  
- Persistent sessions across app restarts (FR-6.4)

**Row Level Security (RLS) ensures:**  
- Users can only access their own vocabulary data (FR-6.3)  
- Policies are enforced at the database level (no frontend bypass)

**User Profile Management**  
Optional profiles table stores display names, preferences, or other app-specific info.

## 7. Background Tasks & Reliability (FR-5)

To ensure a smooth user experience:  
- **Inngest Background Jobs**  
  - Retry failed AI calls  
  - Retry failed image uploads (FR-5.1)  
- **User Notifications**  
  - Push notification or in-app toast when processing finishes (FR-5.2)

## 8. Technical Logic: Word Extraction Rules

**AI Output Structure Rules**

| Category          | Requirement                           | JSON Example |
|------------------|---------------------------------------|--------------|
| Nouns             | Article, plural, translation, example | {"word":"Tisch","article":"der","plural":"Tische","translation":"table","example":"Der Tisch ist aus Holz."} |
| Verbs             | Infinitive, helper, past participle, example | {"word":"gehen","helper":"sein","past_participle":"gegangen","translation":"to go","example":"Ich bin nach Hause gegangen."} |
| Adjectives / Adverbs | Translation, comparative (if applicable), example | {"word":"schnell","translation":"fast","comparative":"schneller","example":"Das Auto fährt sehr schnell."} |
| Phrases           | Single unit, translation, example     | {"phrase":"Guten Appetit","translation":"Enjoy your meal","example":"Das Essen ist fertig. Guten Appetit!"} |

## 9. Implementation Roadmap

- **Phase 1 – AI & OCR**  
  - Prompt engineering for stable, valid JSON  
  - Enforce extraction rules per category

- **Phase 2 – Mobile UI**  
  - Review & Edit screen  
  - Search & filters

- **Phase 3 – Backend Logic**  
  - Deduplication  
  - Normalization  
  - Validation rules

- **Phase 4 – Sync & Reliability**  
  - Supabase sync  
  - Inngest background workers  
  - Notifications

## 10. Key Advantages

- **Single-Pass Intelligence**  
  One AI replaces OCR, translator, and dictionary tools.

- **High Linguistic Precision**  
  Articles, plurals, helpers, and examples are enforced automatically.

- **Human-in-the-Loop Control**  
  Users always approve before data is saved.

- **Scalable & Secure Architecture**  
  Auth, RLS, background jobs, and sync built-in from day one.

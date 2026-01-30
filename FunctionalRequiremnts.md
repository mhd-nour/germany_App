## 1. Image Processing & OCR (AI Engine)

- **FR-1.1:** The system shall allow users to capture an image via the mobile camera or upload an image from the gallery.  
- **FR-1.2:** The system shall utilize Gemini 1.5 Flash to extract German text, translations, and grammatical metadata (articles, plurals, verb conjugations) in a single pass.  
- **FR-1.3:** The system must support the recognition of standard German characters, including umlauts (ä, ö, ü) and the Eszett (ß).  
- **FR-1.4:** The system shall generate at least one contextual example sentence for every extracted noun or verb if one is not present in the source text.  

---

## 2. Vocabulary Management

- **FR-2.1:** The system shall automatically categorize extracted words into "Nouns," "Verbs,", "Adverbs", "Adjectives," or "Phrases."  
- **FR-2.2:** The system must perform a deduplication check against the user's existing database to prevent duplicate entries of the same word.  
- **FR-2.3:** The system shall provide a "Normalization" step to ensure all nouns are saved with their correct definite article (der, die, das) and plural forms.  
- **FR-2.4:** Users shall be able to manually create, edit, or delete vocabulary entries.  

---

## 3. User Workflow & Interface

- **FR-3.1:** The system shall present a "Review & Edit" screen after AI processing, allowing the user to verify the extracted data before it is persisted to the database.  
- **FR-3.2:** The system shall track the mastery status of each word using three states: New, learning, Reviewing, and Mastered.  
- **FR-3.3:** The system shall provide a search and filter functionality to allow users to find specific words by status, date, or word type.  

---

## 4. Synchronization & Integration

- **FR-4.1:** The system shall automatically sync the local mobile state with the Supabase PostgreSQL database when a connection is available.  

---

## 5. Background Tasks & Reliability

- **FR-5.1:** The system shall use Inngest to handle retries for failed AI API calls or image uploads without interrupting the user experience.  
- **FR-5.2:** The system shall notify the user via a push notification or in-app toast once background image processing is complete.  

---

FR-6: User Authentication & Security (New)
FR-6.1: The system shall allow users to create an account via Email/Password.

FR-6.2: The system shall provide a secure Login and Logout mechanism using Supabase Auth.

FR-6.3: The system must implement Row Level Security (RLS) so that users can only access their own vocabulary data.

FR-6.4: The system shall persist the user session locally so that the user does not need to log in every time the app is opened.

---

## Technical Logic Table: Word Extraction Rules

This table defines how the AI should structure the JSON output for each category to ensure consistency.

| Category | Requirement | Output Expectation (JSON Example) |
|--------|-------------|----------------------------------|
| Nouns | Must include gender, plural, translation, and example. | `{"word": "Tisch", "article": "der", "plural": "Tische", "translation": "table", "example": "Der Tisch ist aus Holz."}` |
| Verbs | Must include infinitive, helper verb, translation, and example. | `{"word": "gehen", "helper": "sein", "past_participle": "gegangen", "translation": "to go", "example": "Ich bin nach Hause gegangen."}` |
| Adjectives / Adverbs | Must include translation, comparative forms (if applicable), and example. | `{"word": "schnell", "translation": "fast", "comparative": "schneller", "example": "Das Auto fährt sehr schnell."}` |
| Phrases | Must be extracted as a single unit with translation and example. | `{"phrase": "Guten Appetit", "translation": "Enjoy your meal", "example": "Das Essen ist fertig. Guten Appetit!"}` |


# Phase 3: Advanced Data Management & Logic (Post-MVP)

**Focus:** Enforcing strict data integrity, preventing duplication, and managing the "Learning Lifecycle" of vocabulary.

## 1. Deduplication Logic (FR-2.2)

To keep the user's vocabulary clean, the system must prevent duplicates.

### A. The "Unique Constraints"
The `unique(user_id, word, category)` constraint in the database (Phase 1) is the final guardrail, but the application layer must handle this gracefully.

### B. Logic Flow
1. **Pre-Insert Check:** Before saving a review, query Supabase:
   ```sql
   SELECT id, status FROM vocabulary 
   WHERE user_id = auth.uid() 
   AND lower(word) = lower(input_word) 
   AND category = input_category;
   ```
2. **Conflict Resolution:**
   - **If Match Found:** Prompt the user: "This word already exists in your [Status] list. Update it or Cancel?"
   - **If Update:** Perform an `UPDATE` operation instead of `INSERT`.

## 2. Normalization Rules (FR-2.3)

Standardize inputs to ensure high-quality data.

| Category | Normalization Rule |
| :--- | :--- |
| **Nouns** | - Ensure Article is present (der/die/das).<br>- Capitalize first letter (German rules). |
| **Verbs** | - Transform to Infinitive.<br>- Ensure Helper Verb is selected. |
| **General** | - Trim whitespace.<br>- Convert standard quotes to German quotes if needed. |

## 3. Mastery Status State Machine (FR-3.2)

Managing the transition of words from "New" to "Mastered".

### States
- **New:** Just captured, never reviewed.
- **Learning:** Actively being quizzed/studied.
- **Reviewing:** User knows it mostly, but needs spaced repetition.
- **Mastered:** Consistently answered correctly.

### Transitions
- **Manual Promotion:** User manually changes status in the "Edit" screen.
- **Auto-Promotion (Future):** After X correct quiz answers (Logic to be built in future Quiz Module).

## 4. Technical Implementation
- **Supabase Database Functions (RPC):** Move complex validation logic to PostgreSQL functions for performance.
- **Triggers:** Automatically update `updated_at` timestamps on any change.

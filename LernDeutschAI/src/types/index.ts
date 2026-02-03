/**
 * LernDeutsch AI - TypeScript Type Definitions
 * Matches Supabase Schema from Phase 1
 */

// ============ Enums (matching Supabase ENUM types) ============

export type WordCategory = "Noun" | "Verb" | "Adjective" | "Adverb" | "Phrase";

export type MasteryStatus = "New" | "Learning" | "Reviewing" | "Mastered";

export type GenderArticle = "der" | "die" | "das";

export type HelperVerb = "haben" | "sein";

// ============ Database Models ============

export interface Vocabulary {
  id: string;
  user_id: string;
  word: string;
  article: GenderArticle | null;
  plural: string | null;
  helper_verb: HelperVerb | null;
  past_participle: string | null;
  translation: string;
  example: string | null;
  category: WordCategory;
  status: MasteryStatus;
  image_url: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

// ============ Form Types (for Create/Edit) ============

export interface VocabularyFormData {
  word: string;
  article?: GenderArticle | null;
  plural?: string;
  helper_verb?: HelperVerb | null;
  past_participle?: string;
  translation: string;
  example?: string;
  category: WordCategory;
  status: MasteryStatus;
}

// ============ AI Extraction Types ============

export interface ExtractedWord {
  word: string;
  article?: GenderArticle;
  plural?: string;
  helper_verb?: HelperVerb;
  past_participle?: string;
  translation: string;
  example?: string;
  category: WordCategory;
  confidence?: number;
}

export interface ExtractionResult {
  success: boolean;
  words: ExtractedWord[];
  rawText?: string;
  error?: string;
}

// ============ Navigation Types ============

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Capture: undefined;
  Library: undefined;
  Profile: undefined;
};

export type CaptureStackParamList = {
  CaptureHome: undefined;
  Camera: undefined;
  Processing: { imageUri: string };
  Review: { extractedWords: ExtractedWord[]; imageUri: string };
};

export type LibraryStackParamList = {
  LibraryHome: undefined;
  VocabularyDetail: { vocabularyId: string };
  EditVocabulary: { vocabulary: Vocabulary };
};

// ============ UI State Types ============

export interface FilterState {
  category: WordCategory | "All";
  status: MasteryStatus | "All";
  searchQuery: string;
}

export interface SyncState {
  isSyncing: boolean;
  lastSyncTime: string | null;
  pendingChanges: number;
  isOnline: boolean;
}

// ============ User Types ============

export interface User {
  id: string;
  email: string;
  profile?: Profile;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * LernDeutsch AI - Color Palette
 * Design System: "Midnight Germany" (Dark Mode)
 */

export const COLORS = {
  // Background Gradient
  background: {
    primary: "#0F172A",
    secondary: "#1E293B",
    gradient: ["#0F172A", "#1E293B"] as string[],
  },

  // Surface Colors
  surface: {
    primary: "#1E293B",
    secondary: "#334155",
    tertiary: "#475569",
    elevated: "#273548",
  },

  // Primary Accent (Amber - for CTAs)
  primary: {
    default: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    gradient: ["#F59E0B", "#D97706"] as string[],
  },

  // Secondary Accent (Teal - for success/mastered)
  secondary: {
    default: "#14B8A6",
    light: "#2DD4BF",
    dark: "#0D9488",
    gradient: ["#14B8A6", "#0D9488"] as string[],
  },

  // Status Colors
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  // Text Colors
  text: {
    primary: "#F8FAFC",
    secondary: "#E2E8F0",
    muted: "#94A3B8",
    disabled: "#64748B",
    inverse: "#0F172A",
  },

  // German Grammar Article Colors (Very Important for UX!)
  grammar: {
    masculine: "#3B82F6", // der - Blue
    feminine: "#EC4899", // die - Pink
    neuter: "#10B981", // das - Green
    haben: "#8B5CF6", // haben - Purple
    sein: "#06B6D4", // sein - Cyan
  },

  // Mastery Status Colors
  mastery: {
    new: "#94A3B8",
    learning: "#F59E0B",
    reviewing: "#3B82F6",
    mastered: "#10B981",
  },

  // Word Category Colors
  category: {
    noun: "#3B82F6",
    verb: "#8B5CF6",
    adjective: "#EC4899",
    adverb: "#F97316",
    phrase: "#06B6D4",
  },

  // Border Colors
  border: {
    default: "#334155",
    light: "#475569",
    focus: "#F59E0B",
  },

  // Overlay
  overlay: "rgba(0, 0, 0, 0.6)",

  // Transparent
  transparent: "transparent",

  // White & Black
  white: "#FFFFFF",
  black: "#000000",
};

// Helper function to get article color
export const getArticleColor = (
  article: "der" | "die" | "das" | null,
): string => {
  switch (article) {
    case "der":
      return COLORS.grammar.masculine;
    case "die":
      return COLORS.grammar.feminine;
    case "das":
      return COLORS.grammar.neuter;
    default:
      return COLORS.text.muted;
  }
};

// Helper function to get mastery status color
export const getMasteryColor = (
  status: "New" | "Learning" | "Reviewing" | "Mastered",
): string => {
  switch (status) {
    case "New":
      return COLORS.mastery.new;
    case "Learning":
      return COLORS.mastery.learning;
    case "Reviewing":
      return COLORS.mastery.reviewing;
    case "Mastered":
      return COLORS.mastery.mastered;
    default:
      return COLORS.mastery.new;
  }
};

// Helper function to get category color
export const getCategoryColor = (
  category: "Noun" | "Verb" | "Adjective" | "Adverb" | "Phrase",
): string => {
  switch (category) {
    case "Noun":
      return COLORS.category.noun;
    case "Verb":
      return COLORS.category.verb;
    case "Adjective":
      return COLORS.category.adjective;
    case "Adverb":
      return COLORS.category.adverb;
    case "Phrase":
      return COLORS.category.phrase;
    default:
      return COLORS.text.muted;
  }
};

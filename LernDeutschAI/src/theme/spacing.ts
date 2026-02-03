/**
 * LernDeutsch AI - Spacing & Layout System
 */

// Base spacing unit (4px)
const BASE = 4;

// Spacing Scale
export const SPACING = {
  none: 0,
  xs: BASE, // 4px
  sm: BASE * 2, // 8px
  md: BASE * 3, // 12px
  base: BASE * 4, // 16px
  lg: BASE * 5, // 20px
  xl: BASE * 6, // 24px
  "2xl": BASE * 8, // 32px
  "3xl": BASE * 10, // 40px
  "4xl": BASE * 12, // 48px
  "5xl": BASE * 16, // 64px
};

// Border Radius
export const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  base: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
};

// Shadow Presets
export const SHADOWS = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Icon Sizes
export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
};

// Hit Slop (for touch targets)
export const HIT_SLOP = {
  small: { top: 8, bottom: 8, left: 8, right: 8 },
  medium: { top: 12, bottom: 12, left: 12, right: 12 },
  large: { top: 16, bottom: 16, left: 16, right: 16 },
};

// Layout Constants
export const LAYOUT = {
  screenPadding: SPACING.base,
  cardPadding: SPACING.base,
  listItemPadding: SPACING.md,
  headerHeight: 56,
  tabBarHeight: 80,
  buttonHeight: {
    sm: 36,
    md: 44,
    lg: 52,
  },
  inputHeight: 52,
};

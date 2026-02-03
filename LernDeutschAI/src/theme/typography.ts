/**
 * LernDeutsch AI - Typography System
 * Font: Inter (with fallbacks)
 */

import { TextStyle } from "react-native";

// Font Family
export const FONTS = {
  regular: "System",
  medium: "System",
  semiBold: "System",
  bold: "System",
};

// Font Sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 40,
};

// Line Heights
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// Font Weights
export const FONT_WEIGHTS = {
  regular: "400" as TextStyle["fontWeight"],
  medium: "500" as TextStyle["fontWeight"],
  semiBold: "600" as TextStyle["fontWeight"],
  bold: "700" as TextStyle["fontWeight"],
};

// Typography Presets
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES["3xl"] * LINE_HEIGHTS.tight,
  } as TextStyle,

  h2: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES["2xl"] * LINE_HEIGHTS.tight,
  } as TextStyle,

  h3: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.tight,
  } as TextStyle,

  h4: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.tight,
  } as TextStyle,

  // Body Text
  bodyLarge: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,
  } as TextStyle,

  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
  } as TextStyle,

  bodySmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
  } as TextStyle,

  // Labels
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.tight,
    textTransform: "uppercase" as TextStyle["textTransform"],
    letterSpacing: 0.5,
  } as TextStyle,

  // Caption
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
  } as TextStyle,

  // Button Text
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.tight,
  } as TextStyle,

  buttonSmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.tight,
  } as TextStyle,

  // German Word Display (Special)
  germanWord: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES["2xl"] * LINE_HEIGHTS.tight,
  } as TextStyle,

  germanArticle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.tight,
  } as TextStyle,

  translation: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    fontStyle: "italic" as TextStyle["fontStyle"],
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,
  } as TextStyle,
};

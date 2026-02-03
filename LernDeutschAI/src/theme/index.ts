/**
 * LernDeutsch AI - Theme Export
 */

export * from "./colors";
export * from "./typography";
export * from "./spacing";

// Combined Theme Object
import {
  COLORS,
  getArticleColor,
  getMasteryColor,
  getCategoryColor,
} from "./colors";
import {
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  TYPOGRAPHY,
} from "./typography";
import {
  SPACING,
  RADIUS,
  SHADOWS,
  ICON_SIZES,
  HIT_SLOP,
  LAYOUT,
} from "./spacing";

export const theme = {
  colors: COLORS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  iconSizes: ICON_SIZES,
  hitSlop: HIT_SLOP,
  layout: LAYOUT,
  helpers: {
    getArticleColor,
    getMasteryColor,
    getCategoryColor,
  },
};

export type Theme = typeof theme;

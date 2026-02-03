/**
 * LernDeutsch AI - Card Component
 */

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = "default",
  padding = "md",
  style,
}) => {
  const getPadding = () => {
    switch (padding) {
      case "none":
        return 0;
      case "sm":
        return SPACING.sm;
      case "lg":
        return SPACING.xl;
      default:
        return SPACING.base;
    }
  };

  const cardStyles: StyleProp<ViewStyle>[] = [
    styles.base,
    { padding: getPadding() },
    ...(variant === "elevated" ? [styles.elevated] : []),
    ...(variant === "outline" ? [styles.outline] : []),
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={cardStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: RADIUS.xl,
    ...SHADOWS.sm,
  },
  elevated: {
    backgroundColor: COLORS.surface.elevated,
    ...SHADOWS.lg,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border.default,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;

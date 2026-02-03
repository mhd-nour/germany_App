/**
 * LernDeutsch AI - Chip/Badge Component
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";

interface ChipProps {
  label: string;
  onPress?: () => void;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  selected?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  variant = "default",
  size = "md",
  selected = false,
  icon,
  style,
}) => {
  const getBackgroundColor = () => {
    if (selected) {
      switch (variant) {
        case "primary":
          return COLORS.primary.default;
        case "success":
          return COLORS.status.success;
        case "warning":
          return COLORS.status.warning;
        case "error":
          return COLORS.status.error;
        case "info":
          return COLORS.status.info;
        default:
          return COLORS.surface.tertiary;
      }
    }
    return COLORS.surface.secondary;
  };

  const getTextColor = () => {
    if (selected) {
      return COLORS.white;
    }
    switch (variant) {
      case "primary":
        return COLORS.primary.default;
      case "success":
        return COLORS.status.success;
      case "warning":
        return COLORS.status.warning;
      case "error":
        return COLORS.status.error;
      case "info":
        return COLORS.status.info;
      default:
        return COLORS.text.secondary;
    }
  };

  const chipStyles: ViewStyle[] = [
    styles.base,
    ...(size === "sm" ? [styles.sm] : []),
    { backgroundColor: getBackgroundColor() },
    ...(selected ? [styles.selected] : []),
    ...(style ? [style] : []),
  ];

  const textColor = getTextColor();

  const content = (
    <>
      {icon && (
        <Ionicons
          name={icon}
          size={size === "sm" ? 12 : 14}
          color={textColor}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          size === "sm" ? styles.labelSm : styles.label,
          { color: textColor },
        ]}
      >
        {label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={chipStyles}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={chipStyles}>{content}</View>;
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  sm: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  selected: {
    borderWidth: 0,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "500",
  },
  labelSm: {
    ...TYPOGRAPHY.caption,
    fontWeight: "500",
  },
});

export default Chip;

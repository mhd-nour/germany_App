/**
 * LernDeutsch AI - Button Component
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  LAYOUT,
  SHADOWS,
} from "../../theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const getButtonHeight = () => {
    switch (size) {
      case "sm":
        return LAYOUT.buttonHeight.sm;
      case "lg":
        return LAYOUT.buttonHeight.lg;
      default:
        return LAYOUT.buttonHeight.md;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle =
      size === "sm" ? TYPOGRAPHY.buttonSmall : TYPOGRAPHY.button;

    switch (variant) {
      case "primary":
        return { ...baseStyle, color: COLORS.text.inverse };
      case "secondary":
        return { ...baseStyle, color: COLORS.text.inverse };
      case "outline":
        return { ...baseStyle, color: COLORS.primary.default };
      case "ghost":
        return { ...baseStyle, color: COLORS.text.primary };
      case "danger":
        return { ...baseStyle, color: COLORS.white };
      default:
        return { ...baseStyle, color: COLORS.text.inverse };
    }
  };

  const buttonStyles: ViewStyle[] = [
    styles.base,
    {
      height: getButtonHeight(),
      opacity: isDisabled ? 0.5 : 1,
    },
    ...(fullWidth ? [styles.fullWidth] : []),
    ...(variant === "outline" ? [styles.outline] : []),
    ...(variant === "ghost" ? [styles.ghost] : []),
    ...(variant === "danger" ? [styles.danger] : []),
    ...(style ? [style] : []),
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? COLORS.primary.default
              : COLORS.white
          }
          size="small"
        />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              getTextStyle(),
              leftIcon ? styles.textWithLeftIcon : undefined,
              rightIcon ? styles.textWithRightIcon : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </>
  );

  // Gradient buttons (primary & secondary)
  if (variant === "primary" || variant === "secondary") {
    const gradientColors =
      variant === "primary"
        ? COLORS.primary.gradient
        : COLORS.secondary.gradient;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={isDisabled}
        style={[fullWidth ? styles.fullWidth : undefined, style]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.base,
            styles.gradient,
            { height: getButtonHeight() },
            isDisabled ? { opacity: 0.5 } : undefined,
          ]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyles}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    ...SHADOWS.md,
  },
  gradient: {
    paddingHorizontal: SPACING.xl,
  },
  fullWidth: {
    width: "100%",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary.default,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  danger: {
    backgroundColor: COLORS.status.error,
  },
  textWithLeftIcon: {
    marginLeft: SPACING.sm,
  },
  textWithRightIcon: {
    marginRight: SPACING.sm,
  },
});

export default Button;

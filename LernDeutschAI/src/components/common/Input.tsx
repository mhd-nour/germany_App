/**
 * LernDeutsch AI - Input Component
 */

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, LAYOUT } from "../../theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  showPasswordToggle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasError = !!error;
  const actualSecureTextEntry = showPasswordToggle
    ? secureTextEntry && !isPasswordVisible
    : secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={hasError ? COLORS.status.error : COLORS.text.muted}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={COLORS.text.disabled}
          selectionColor={COLORS.primary.default}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={actualSecureTextEntry}
          {...props}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIconButton}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.text.muted}
            />
          </TouchableOpacity>
        )}

        {rightIcon && !showPasswordToggle && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconButton}
            disabled={!onRightIconPress}
          >
            <Ionicons name={rightIcon} size={20} color={COLORS.text.muted} />
          </TouchableOpacity>
        )}
      </View>

      {(error || hint) && (
        <Text style={[styles.hint, hasError && styles.errorText]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.base,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textTransform: "none",
    letterSpacing: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.secondary,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    height: LAYOUT.inputHeight,
  },
  inputFocused: {
    borderColor: COLORS.primary.default,
    backgroundColor: COLORS.surface.primary,
  },
  inputError: {
    borderColor: COLORS.status.error,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: SPACING.base,
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
  },
  inputWithLeftIcon: {
    paddingLeft: SPACING.sm,
  },
  inputWithRightIcon: {
    paddingRight: SPACING.sm,
  },
  leftIcon: {
    marginLeft: SPACING.base,
  },
  rightIconButton: {
    padding: SPACING.md,
  },
  hint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  errorText: {
    color: COLORS.status.error,
  },
});

export default Input;

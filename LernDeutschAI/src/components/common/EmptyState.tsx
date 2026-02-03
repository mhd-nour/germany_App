/**
 * LernDeutsch AI - Empty State Component
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";
import Button from "./Button";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "document-text-outline",
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={64} color={COLORS.text.disabled} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING["2xl"],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
    maxWidth: 280,
  },
  button: {
    marginTop: SPACING.xl,
  },
});

export default EmptyState;

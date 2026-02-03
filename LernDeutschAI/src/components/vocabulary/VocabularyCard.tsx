/**
 * LernDeutsch AI - Vocabulary Card Component
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  getArticleColor,
  getMasteryColor,
  getCategoryColor,
} from "../../theme";
import type { Vocabulary } from "../../types";

interface VocabularyCardProps {
  vocabulary: Vocabulary;
  onPress: () => void;
  onLongPress?: () => void;
  compact?: boolean;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  vocabulary,
  onPress,
  onLongPress,
  compact = false,
}) => {
  const { word, article, translation, category, status, example } = vocabulary;

  const articleColor = getArticleColor(article);
  const statusColor = getMasteryColor(status);
  const categoryColor = getCategoryColor(category);

  const getCategoryIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (category) {
      case "Noun":
        return "cube-outline";
      case "Verb":
        return "flash-outline";
      case "Adjective":
        return "color-palette-outline";
      case "Adverb":
        return "speedometer-outline";
      case "Phrase":
        return "chatbubble-outline";
      default:
        return "document-text-outline";
    }
  };

  if (compact) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.compactContainer}
      >
        <View style={styles.compactLeft}>
          <View style={styles.wordRow}>
            {article && (
              <Text style={[styles.article, { color: articleColor }]}>
                {article}
              </Text>
            )}
            <Text style={styles.word}>{word}</Text>
          </View>
          <Text style={styles.translation} numberOfLines={1}>
            {translation}
          </Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor + "20" },
          ]}
        >
          <Ionicons name={getCategoryIcon()} size={14} color={categoryColor} />
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {category}
          </Text>
        </View>
        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <View
            style={[styles.statusIndicator, { backgroundColor: statusColor }]}
          />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.wordContainer}>
          {article && (
            <Text style={[styles.articleLarge, { color: articleColor }]}>
              {article}
            </Text>
          )}
          <Text style={styles.wordLarge}>{word}</Text>
        </View>
        <Text style={styles.translationLarge}>{translation}</Text>

        {example && (
          <View style={styles.exampleContainer}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={14}
              color={COLORS.text.muted}
            />
            <Text style={styles.example} numberOfLines={2}>
              {example}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.text.muted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Full Card Styles
  container: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: SPACING.xs,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "600",
  },
  content: {
    marginBottom: SPACING.sm,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: SPACING.xs,
  },
  articleLarge: {
    ...TYPOGRAPHY.germanArticle,
    marginRight: SPACING.sm,
  },
  wordLarge: {
    ...TYPOGRAPHY.germanWord,
    color: COLORS.text.primary,
  },
  translationLarge: {
    ...TYPOGRAPHY.translation,
    color: COLORS.text.secondary,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: RADIUS.md,
  },
  example: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  footer: {
    alignItems: "flex-end",
  },

  // Compact Card Styles
  compactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  compactLeft: {
    flex: 1,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  article: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "600",
    marginRight: SPACING.xs,
  },
  word: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  translation: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: SPACING.md,
  },
});

export default VocabularyCard;

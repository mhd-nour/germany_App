/**
 * LernDeutsch AI - Vocabulary Form Component
 * Dynamic form based on word category
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Select, Chip } from "../common";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";
import type {
  VocabularyFormData,
  WordCategory,
  MasteryStatus,
  GenderArticle,
  HelperVerb,
} from "../../types";

interface VocabularyFormProps {
  formData: VocabularyFormData;
  onChange: (field: keyof VocabularyFormData, value: any) => void;
  errors?: Partial<Record<keyof VocabularyFormData, string>>;
  mode?: "create" | "edit";
}

const CATEGORY_OPTIONS = [
  { label: "🔵 Noun", value: "Noun", color: COLORS.category.noun },
  { label: "🟣 Verb", value: "Verb", color: COLORS.category.verb },
  {
    label: "🩷 Adjective",
    value: "Adjective",
    color: COLORS.category.adjective,
  },
  { label: "🟠 Adverb", value: "Adverb", color: COLORS.category.adverb },
  { label: "🔷 Phrase", value: "Phrase", color: COLORS.category.phrase },
];

const ARTICLE_OPTIONS = [
  { label: "der (masculine)", value: "der", color: COLORS.grammar.masculine },
  { label: "die (feminine)", value: "die", color: COLORS.grammar.feminine },
  { label: "das (neuter)", value: "das", color: COLORS.grammar.neuter },
];

const HELPER_VERB_OPTIONS = [
  { label: "haben", value: "haben", color: COLORS.grammar.haben },
  { label: "sein", value: "sein", color: COLORS.grammar.sein },
];

const STATUS_OPTIONS: { label: string; value: MasteryStatus }[] = [
  { label: "New", value: "New" },
  { label: "Learning", value: "Learning" },
  { label: "Reviewing", value: "Reviewing" },
  { label: "Mastered", value: "Mastered" },
];

const VocabularyForm: React.FC<VocabularyFormProps> = ({
  formData,
  onChange,
  errors = {},
  mode = "create",
}) => {
  const isNoun = formData.category === "Noun";
  const isVerb = formData.category === "Verb";

  return (
    <View style={styles.container}>
      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Word Category</Text>
        <View style={styles.chipGroup}>
          {CATEGORY_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={formData.category === option.value}
              onPress={() => onChange("category", option.value as WordCategory)}
              variant="primary"
              style={styles.chip}
            />
          ))}
        </View>
      </View>

      {/* Word Input */}
      <Input
        label={formData.category === "Phrase" ? "Phrase" : "Word"}
        placeholder={
          formData.category === "Phrase"
            ? "Enter German phrase..."
            : "Enter German word..."
        }
        value={formData.word}
        onChangeText={(value) => onChange("word", value)}
        error={errors.word}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Noun-specific fields */}
      {isNoun && (
        <>
          <Select
            label="Article (Gender)"
            placeholder="Select article"
            options={ARTICLE_OPTIONS}
            value={formData.article || null}
            onChange={(value) => onChange("article", value as GenderArticle)}
            error={errors.article}
          />

          <Input
            label="Plural Form"
            placeholder="e.g., Tische"
            value={formData.plural || ""}
            onChangeText={(value) => onChange("plural", value)}
            error={errors.plural}
            autoCapitalize="none"
          />
        </>
      )}

      {/* Verb-specific fields */}
      {isVerb && (
        <>
          <Select
            label="Helper Verb (Perfekt)"
            placeholder="Select helper verb"
            options={HELPER_VERB_OPTIONS}
            value={formData.helper_verb || null}
            onChange={(value) => onChange("helper_verb", value as HelperVerb)}
            error={errors.helper_verb}
          />

          <Input
            label="Past Participle"
            placeholder="e.g., gegangen"
            value={formData.past_participle || ""}
            onChangeText={(value) => onChange("past_participle", value)}
            error={errors.past_participle}
            autoCapitalize="none"
          />
        </>
      )}

      {/* Translation - always required */}
      <Input
        label="English Translation"
        placeholder="Enter English meaning..."
        value={formData.translation}
        onChangeText={(value) => onChange("translation", value)}
        error={errors.translation}
      />

      {/* Example Sentence */}
      <Input
        label="Example Sentence (Optional)"
        placeholder="Enter a German sentence using this word..."
        value={formData.example || ""}
        onChangeText={(value) => onChange("example", value)}
        multiline
        numberOfLines={3}
        style={styles.multilineInput}
      />

      {/* Status (for edit mode) */}
      {mode === "edit" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Status</Text>
          <View style={styles.chipGroup}>
            {STATUS_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={formData.status === option.value}
                onPress={() => onChange("status", option.value)}
                variant={
                  option.value === "Mastered"
                    ? "success"
                    : option.value === "Learning"
                      ? "warning"
                      : option.value === "Reviewing"
                        ? "info"
                        : "default"
                }
                style={styles.chip}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textTransform: "none",
    letterSpacing: 0,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  chip: {
    marginBottom: SPACING.xs,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: SPACING.md,
  },
});

export default VocabularyForm;

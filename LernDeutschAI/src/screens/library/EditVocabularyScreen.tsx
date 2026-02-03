/**
 * LernDeutsch AI - Edit Vocabulary Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  ScreenContainer,
  Header,
  Card,
  Button,
  VocabularyForm,
} from "../../components";
import { updateVocabulary, deleteVocabulary } from "../../services/vocabulary";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";
import type {
  LibraryStackParamList,
  Vocabulary,
  VocabularyFormData,
  WordCategory,
  GenderArticle,
  HelperVerb,
  MasteryStatus,
} from "../../types";

type EditNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "EditVocabulary"
>;
type EditRouteProp = RouteProp<LibraryStackParamList, "EditVocabulary">;

interface EditFormData {
  word: string;
  translation: string;
  category: WordCategory;
  article?: GenderArticle | null;
  plural?: string;
  example?: string;
  helper_verb?: HelperVerb | null;
  past_participle?: string;
  status: MasteryStatus;
}

const EditVocabularyScreen: React.FC = () => {
  const navigation = useNavigation<EditNavigationProp>();
  const route = useRoute<EditRouteProp>();
  const { vocabulary } = route.params;

  const [formData, setFormData] = useState<EditFormData>({
    word: vocabulary.word,
    translation: vocabulary.translation,
    category: vocabulary.category,
    article: vocabulary.article,
    plural: vocabulary.plural || "",
    example: vocabulary.example || "",
    helper_verb: vocabulary.helper_verb,
    past_participle: vocabulary.past_participle || "",
    status: vocabulary.status,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.word.trim()) {
      newErrors.word = "German word is required";
    }
    if (!formData.translation.trim()) {
      newErrors.translation = "Translation is required";
    }
    if (formData.category === "Noun" && !formData.article) {
      newErrors.article = "Article is required for nouns";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const updateData: Partial<VocabularyFormData> = {
      word: formData.word.trim(),
      translation: formData.translation.trim(),
      category: formData.category,
      status: formData.status,
    };

    // Add category-specific fields
    if (formData.category === "Noun") {
      updateData.article = formData.article;
      updateData.plural = formData.plural?.trim() || undefined;
      // Clear verb fields
      updateData.helper_verb = undefined;
      updateData.past_participle = undefined;
    } else if (formData.category === "Verb") {
      updateData.helper_verb = formData.helper_verb;
      updateData.past_participle =
        formData.past_participle?.trim() || undefined;
      // Clear noun fields
      updateData.article = undefined;
      updateData.plural = undefined;
    } else {
      // Clear both noun and verb fields
      updateData.article = undefined;
      updateData.plural = undefined;
      updateData.helper_verb = undefined;
      updateData.past_participle = undefined;
    }

    // Add example if provided
    if (formData.example?.trim()) {
      updateData.example = formData.example.trim();
    }

    const result = await updateVocabulary(vocabulary.id, updateData);
    setIsLoading(false);

    if (result.success) {
      // Navigate back to library
      navigation.popToTop();
    } else {
      Alert.alert("Error", result.error || "Failed to update vocabulary.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Word",
      `Are you sure you want to delete "${vocabulary.word}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const result = await deleteVocabulary(vocabulary.id);
            setIsDeleting(false);

            if (result.success) {
              navigation.popToTop();
            } else {
              Alert.alert("Error", "Failed to delete vocabulary.");
            }
          },
        },
      ],
    );
  };

  const handleFormChange = (field: keyof EditFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const hasChanges = (): boolean => {
    return (
      formData.word !== vocabulary.word ||
      formData.translation !== vocabulary.translation ||
      formData.category !== vocabulary.category ||
      formData.article !== vocabulary.article ||
      formData.plural !== (vocabulary.plural || "") ||
      formData.example !== (vocabulary.example || "") ||
      formData.helper_verb !== vocabulary.helper_verb ||
      formData.past_participle !== (vocabulary.past_participle || "") ||
      formData.status !== vocabulary.status
    );
  };

  const handleCancel = () => {
    if (hasChanges()) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to go back?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenContainer safeArea padding={false}>
      <Header
        showBack
        onBackPress={handleCancel}
        title="Edit Word"
        rightAction={{
          icon: "checkmark",
          onPress: handleSave,
        }}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <VocabularyForm
            formData={{
              word: formData.word,
              translation: formData.translation,
              category: formData.category,
              article: formData.article,
              plural: formData.plural,
              example: formData.example,
              helper_verb: formData.helper_verb,
              past_participle: formData.past_participle,
              status: formData.status,
            }}
            onChange={handleFormChange}
            errors={errors}
            mode="edit"
          />

          {/* Status Selection */}
          <Card style={styles.statusCard}>
            <Text style={styles.sectionTitle}>Learning Status</Text>
            <View style={styles.statusGrid}>
              {(
                ["New", "Learning", "Reviewing", "Mastered"] as MasteryStatus[]
              ).map((status) => (
                <StatusOption
                  key={status}
                  status={status}
                  selected={formData.status === status}
                  onSelect={() => handleFormChange("status", status)}
                />
              ))}
            </View>
          </Card>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
              loading={isLoading}
              disabled={isLoading || !hasChanges()}
              fullWidth
            />

            <Button
              title="Delete Word"
              onPress={handleDelete}
              variant="outline"
              loading={isDeleting}
              disabled={isDeleting || isLoading}
              leftIcon={
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={COLORS.status.error}
                />
              }
              textStyle={{ color: COLORS.status.error }}
              style={styles.deleteButton}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

interface StatusOptionProps {
  status: MasteryStatus;
  selected: boolean;
  onSelect: () => void;
}

const StatusOption: React.FC<StatusOptionProps> = ({
  status,
  selected,
  onSelect,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "New":
        return { icon: "sparkles", color: COLORS.status.info };
      case "Learning":
        return { icon: "school", color: COLORS.status.warning };
      case "Reviewing":
        return { icon: "refresh", color: COLORS.secondary.default };
      case "Mastered":
        return { icon: "star", color: COLORS.status.success };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={[
        styles.statusOption,
        selected
          ? {
              borderColor: config.color,
              backgroundColor: config.color + "10",
            }
          : undefined,
      ]}
      onTouchEnd={onSelect}
    >
      <Ionicons
        name={config.icon as any}
        size={24}
        color={selected ? config.color : COLORS.text.muted}
      />
      <Text
        style={[
          styles.statusLabel,
          selected ? { color: config.color } : undefined,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING["4xl"],
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.muted,
    marginBottom: SPACING.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusCard: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  statusOption: {
    flex: 1,
    minWidth: "40%",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border.default,
    backgroundColor: COLORS.surface.secondary,
  },
  statusLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
  },
  actions: {
    gap: SPACING.md,
  },
  deleteButton: {
    borderColor: COLORS.status.error,
  },
});

export default EditVocabularyScreen;

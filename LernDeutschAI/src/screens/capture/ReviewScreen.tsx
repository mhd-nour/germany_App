/**
 * LernDeutsch AI - Review Screen
 * Review and edit AI-extracted vocabulary before saving
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScreenContainer,
  Header,
  Card,
  Button,
  Chip,
  VocabularyForm,
} from "../../components";
import { useVocabulary } from "../../hooks";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  getArticleColor,
  getCategoryColor,
} from "../../theme";
import type {
  CaptureStackParamList,
  ExtractedWord,
  VocabularyFormData,
} from "../../types";

type ReviewNavigationProp = NativeStackNavigationProp<
  CaptureStackParamList,
  "Review"
>;
type ReviewRouteProp = RouteProp<CaptureStackParamList, "Review">;

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation<ReviewNavigationProp>();
  const route = useRoute<ReviewRouteProp>();
  const { extractedWords, imageUri } = route.params;
  const { addVocabulary } = useVocabulary();

  const [selectedWords, setSelectedWords] = useState<Set<number>>(
    new Set(extractedWords.map((_, i) => i)),
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedWords, setEditedWords] =
    useState<ExtractedWord[]>(extractedWords);
  const [isSaving, setIsSaving] = useState(false);

  const toggleWordSelection = (index: number) => {
    const newSelected = new Set(selectedWords);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedWords(newSelected);
  };

  const handleEditWord = (index: number) => {
    setEditingIndex(index);
  };

  const handleUpdateWord = (field: keyof VocabularyFormData, value: any) => {
    if (editingIndex === null) return;

    const updated = [...editedWords];
    updated[editingIndex] = { ...updated[editingIndex], [field]: value };
    setEditedWords(updated);
  };

  const handleDeleteWord = (index: number) => {
    Alert.alert("Remove Word", "Are you sure you want to remove this word?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const updated = editedWords.filter((_, i) => i !== index);
          setEditedWords(updated);
          selectedWords.delete(index);
          // Re-index selected words
          const newSelected = new Set<number>();
          selectedWords.forEach((i) => {
            if (i < index) newSelected.add(i);
            else if (i > index) newSelected.add(i - 1);
          });
          setSelectedWords(newSelected);
        },
      },
    ]);
  };

  const handleSave = async () => {
    const wordsToSave = editedWords.filter((_, i) => selectedWords.has(i));

    if (wordsToSave.length === 0) {
      Alert.alert(
        "No Words Selected",
        "Please select at least one word to save.",
      );
      return;
    }

    setIsSaving(true);

    try {
      // Save each word
      for (const word of wordsToSave) {
        const formData: VocabularyFormData = {
          word: word.word,
          article: word.article,
          plural: word.plural,
          helper_verb: word.helper_verb,
          past_participle: word.past_participle,
          translation: word.translation,
          example: word.example,
          category: word.category,
          status: "New",
        };

        await addVocabulary(formData, imageUri);
      }

      Alert.alert(
        "Success!",
        `${wordsToSave.length} word${wordsToSave.length > 1 ? "s" : ""} saved to your vocabulary.`,
        [
          {
            text: "View Library",
            onPress: () => navigation.getParent()?.navigate("Library"),
          },
          {
            text: "Capture More",
            onPress: () => navigation.popToTop(),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save vocabulary. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Render editing modal content
  if (editingIndex !== null) {
    const word = editedWords[editingIndex];
    return (
      <ScreenContainer scrollable keyboardAvoiding>
        <Header
          title="Edit Word"
          showBack
          onBackPress={() => setEditingIndex(null)}
        />
        <View style={styles.editContainer}>
          <VocabularyForm
            formData={{
              word: word.word,
              article: word.article,
              plural: word.plural,
              helper_verb: word.helper_verb,
              past_participle: word.past_participle,
              translation: word.translation,
              example: word.example,
              category: word.category,
              status: "New",
            }}
            onChange={handleUpdateWord}
            mode="create"
          />
          <Button
            title="Done"
            onPress={() => setEditingIndex(null)}
            variant="primary"
            fullWidth
            style={styles.doneButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safeArea padding={false}>
      <Header
        title="Review Extracted Words"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.extractedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={COLORS.status.success}
            />
            <Text style={styles.extractedText}>
              {editedWords.length} words extracted
            </Text>
          </View>
        </View>

        {/* Selection Info */}
        <View style={styles.selectionInfo}>
          <Text style={styles.selectionText}>
            {selectedWords.size} of {editedWords.length} selected
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (selectedWords.size === editedWords.length) {
                setSelectedWords(new Set());
              } else {
                setSelectedWords(new Set(editedWords.map((_, i) => i)));
              }
            }}
          >
            <Text style={styles.selectAllText}>
              {selectedWords.size === editedWords.length
                ? "Deselect All"
                : "Select All"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Word Cards */}
        {editedWords.map((word, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => toggleWordSelection(index)}
            style={[
              styles.wordCard,
              selectedWords.has(index) && styles.wordCardSelected,
            ]}
          >
            <View style={styles.wordHeader}>
              <View style={styles.wordHeaderLeft}>
                <View
                  style={[
                    styles.checkbox,
                    selectedWords.has(index) && styles.checkboxSelected,
                  ]}
                >
                  {selectedWords.has(index) && (
                    <Ionicons name="checkmark" size={14} color={COLORS.white} />
                  )}
                </View>
                <Chip
                  label={word.category}
                  variant="primary"
                  size="sm"
                  style={{
                    backgroundColor: getCategoryColor(word.category) + "20",
                  }}
                />
              </View>
              <View style={styles.wordActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditWord(index)}
                >
                  <Ionicons name="pencil" size={18} color={COLORS.text.muted} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteWord(index)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={COLORS.status.error}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.wordContent}>
              <View style={styles.wordMain}>
                {word.article && (
                  <Text
                    style={[
                      styles.article,
                      { color: getArticleColor(word.article) },
                    ]}
                  >
                    {word.article}
                  </Text>
                )}
                <Text style={styles.word}>{word.word}</Text>
                {word.plural && (
                  <Text style={styles.plural}>(pl. {word.plural})</Text>
                )}
              </View>
              <Text style={styles.translation}>{word.translation}</Text>
              {word.example && (
                <View style={styles.exampleContainer}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={12}
                    color={COLORS.text.muted}
                  />
                  <Text style={styles.example}>{word.example}</Text>
                </View>
              )}
              {word.helper_verb && (
                <View style={styles.grammarInfo}>
                  <Text style={styles.grammarLabel}>Perfekt:</Text>
                  <Text style={styles.grammarValue}>
                    {word.helper_verb} {word.past_participle}
                  </Text>
                </View>
              )}
            </View>

            {word.confidence && (
              <View style={styles.confidenceBar}>
                <View
                  style={[
                    styles.confidenceFill,
                    { width: `${word.confidence * 100}%` },
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <Button
          title={`Save ${selectedWords.size} Word${selectedWords.size !== 1 ? "s" : ""}`}
          onPress={handleSave}
          loading={isSaving}
          disabled={isSaving || selectedWords.size === 0}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING["5xl"],
  },
  // Image
  imageContainer: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  extractedBadge: {
    position: "absolute",
    bottom: SPACING.sm,
    right: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  extractedText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  // Selection
  selectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  selectionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
  },
  selectAllText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary.default,
    fontWeight: "600",
  },
  // Word Cards
  wordCard: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOWS.sm,
  },
  wordCardSelected: {
    borderColor: COLORS.primary.default,
    backgroundColor: COLORS.primary.default + "08",
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  wordHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border.default,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary.default,
    borderColor: COLORS.primary.default,
  },
  wordActions: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  actionButton: {
    padding: SPACING.sm,
  },
  wordContent: {},
  wordMain: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginBottom: SPACING.xs,
  },
  article: {
    ...TYPOGRAPHY.germanArticle,
    marginRight: SPACING.sm,
  },
  word: {
    ...TYPOGRAPHY.germanWord,
    color: COLORS.text.primary,
  },
  plural: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    marginLeft: SPACING.sm,
  },
  translation: {
    ...TYPOGRAPHY.translation,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.surface.secondary,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xs,
  },
  example: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    flex: 1,
    marginLeft: SPACING.xs,
  },
  grammarInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  grammarLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    marginRight: SPACING.xs,
  },
  grammarValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    fontWeight: "500",
  },
  confidenceBar: {
    height: 3,
    backgroundColor: COLORS.surface.tertiary,
    borderRadius: 2,
    marginTop: SPACING.md,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: COLORS.status.success,
    borderRadius: 2,
  },
  // Bottom Action
  bottomAction: {
    padding: SPACING.base,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.default,
  },
  // Edit Mode
  editContainer: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  doneButton: {
    marginTop: SPACING.xl,
  },
});

export default ReviewScreen;

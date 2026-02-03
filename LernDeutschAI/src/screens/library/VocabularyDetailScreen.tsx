/**
 * LernDeutsch AI - Vocabulary Detail Screen
 */

import React, { useState, useEffect } from "react";
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
  Chip,
  Button,
  LoadingSpinner,
} from "../../components";
import {
  fetchVocabularyById,
  deleteVocabulary,
  updateMasteryStatus,
} from "../../services/vocabulary";
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
import type {
  LibraryStackParamList,
  Vocabulary,
  MasteryStatus,
} from "../../types";

type DetailNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "VocabularyDetail"
>;
type DetailRouteProp = RouteProp<LibraryStackParamList, "VocabularyDetail">;

const MASTERY_STATUSES: MasteryStatus[] = [
  "New",
  "Learning",
  "Reviewing",
  "Mastered",
];

const VocabularyDetailScreen: React.FC = () => {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const { vocabularyId } = route.params;

  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadVocabulary();
  }, [vocabularyId]);

  const loadVocabulary = async () => {
    setIsLoading(true);
    const result = await fetchVocabularyById(vocabularyId);
    if (result.success && result.data) {
      setVocabulary(result.data as Vocabulary);
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (newStatus: MasteryStatus) => {
    if (!vocabulary) return;

    const result = await updateMasteryStatus(vocabularyId, newStatus);
    if (result.success) {
      setVocabulary({ ...vocabulary, status: newStatus });
    }
  };

  const handleEdit = () => {
    if (vocabulary) {
      navigation.navigate("EditVocabulary", { vocabulary });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Word",
      "Are you sure you want to delete this vocabulary entry? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const result = await deleteVocabulary(vocabularyId);
            setIsDeleting(false);

            if (result.success) {
              navigation.goBack();
            } else {
              Alert.alert("Error", "Failed to delete vocabulary.");
            }
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <ScreenContainer safeArea>
        <Header showBack title="Loading..." />
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      </ScreenContainer>
    );
  }

  if (!vocabulary) {
    return (
      <ScreenContainer safeArea>
        <Header showBack title="Not Found" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={COLORS.status.error} />
          <Text style={styles.errorText}>Vocabulary not found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="primary"
          />
        </View>
      </ScreenContainer>
    );
  }

  const articleColor = getArticleColor(vocabulary.article);
  const categoryColor = getCategoryColor(vocabulary.category);
  const statusColor = getMasteryColor(vocabulary.status);

  return (
    <ScreenContainer safeArea padding={false}>
      <Header
        showBack
        title=""
        rightAction={{
          icon: "create-outline",
          onPress: handleEdit,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryColor + "20" },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {vocabulary.category}
            </Text>
          </View>

          <View style={styles.wordContainer}>
            {vocabulary.article && (
              <Text style={[styles.article, { color: articleColor }]}>
                {vocabulary.article}
              </Text>
            )}
            <Text style={styles.word}>{vocabulary.word}</Text>
          </View>

          {vocabulary.plural && (
            <Text style={styles.plural}>Plural: {vocabulary.plural}</Text>
          )}

          <Text style={styles.translation}>{vocabulary.translation}</Text>
        </View>

        {/* Status Section */}
        <Card style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Learning Status</Text>
          <View style={styles.statusChips}>
            {MASTERY_STATUSES.map((status) => (
              <Chip
                key={status}
                label={status}
                selected={vocabulary.status === status}
                onPress={() => handleStatusChange(status)}
                variant={
                  status === "Mastered"
                    ? "success"
                    : status === "Learning"
                      ? "warning"
                      : status === "Reviewing"
                        ? "info"
                        : "default"
                }
              />
            ))}
          </View>
        </Card>

        {/* Grammar Section (for Verbs) */}
        {vocabulary.category === "Verb" &&
          (vocabulary.helper_verb || vocabulary.past_participle) && (
            <Card style={styles.grammarCard}>
              <Text style={styles.sectionTitle}>Grammar Details</Text>
              <View style={styles.grammarRow}>
                {vocabulary.helper_verb && (
                  <View style={styles.grammarItem}>
                    <Text style={styles.grammarLabel}>Helper Verb</Text>
                    <View
                      style={[
                        styles.grammarValue,
                        {
                          backgroundColor:
                            vocabulary.helper_verb === "sein"
                              ? COLORS.grammar.sein + "20"
                              : COLORS.grammar.haben + "20",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.grammarValueText,
                          {
                            color:
                              vocabulary.helper_verb === "sein"
                                ? COLORS.grammar.sein
                                : COLORS.grammar.haben,
                          },
                        ]}
                      >
                        {vocabulary.helper_verb}
                      </Text>
                    </View>
                  </View>
                )}
                {vocabulary.past_participle && (
                  <View style={styles.grammarItem}>
                    <Text style={styles.grammarLabel}>Past Participle</Text>
                    <Text style={styles.grammarText}>
                      {vocabulary.past_participle}
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          )}

        {/* Example Section */}
        {vocabulary.example && (
          <Card style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <Ionicons
                name="chatbubble-ellipses"
                size={18}
                color={COLORS.text.muted}
              />
              <Text style={styles.sectionTitle}>Example Sentence</Text>
            </View>
            <Text style={styles.exampleText}>{vocabulary.example}</Text>
          </Card>
        )}

        {/* Source Image */}
        {vocabulary.image_url && (
          <Card style={styles.imageCard}>
            <Text style={styles.sectionTitle}>Source Image</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: vocabulary.image_url }}
                style={styles.sourceImage}
                resizeMode="cover"
              />
            </View>
          </Card>
        )}

        {/* Metadata */}
        <Card style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={COLORS.text.muted}
            />
            <Text style={styles.metaText}>
              Added{" "}
              {new Date(vocabulary.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </Card>

        {/* Delete Button */}
        <Button
          title="Delete Word"
          onPress={handleDelete}
          variant="outline"
          loading={isDeleting}
          disabled={isDeleting}
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
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING["4xl"],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    gap: SPACING.lg,
  },
  errorText: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text.muted,
  },
  // Hero
  heroSection: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.lg,
  },
  categoryText: {
    ...TYPOGRAPHY.label,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: SPACING.xs,
  },
  article: {
    fontSize: 24,
    fontWeight: "600",
    marginRight: SPACING.sm,
  },
  word: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  plural: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginBottom: SPACING.md,
  },
  translation: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.secondary,
    fontStyle: "italic",
  },
  // Cards
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.muted,
    marginBottom: SPACING.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusCard: {
    marginBottom: SPACING.lg,
  },
  statusChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  grammarCard: {
    marginBottom: SPACING.lg,
  },
  grammarRow: {
    flexDirection: "row",
    gap: SPACING.xl,
  },
  grammarItem: {
    flex: 1,
  },
  grammarLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    marginBottom: SPACING.xs,
  },
  grammarValue: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignSelf: "flex-start",
  },
  grammarValueText: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
  },
  grammarText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
  },
  exampleCard: {
    marginBottom: SPACING.lg,
  },
  exampleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  exampleText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    fontStyle: "italic",
    lineHeight: 24,
  },
  imageCard: {
    marginBottom: SPACING.lg,
  },
  imageContainer: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  sourceImage: {
    width: "100%",
    height: 200,
  },
  metaCard: {
    marginBottom: SPACING.xl,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  metaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
  },
  deleteButton: {
    borderColor: COLORS.status.error,
    marginBottom: SPACING.xl,
  },
});

export default VocabularyDetailScreen;

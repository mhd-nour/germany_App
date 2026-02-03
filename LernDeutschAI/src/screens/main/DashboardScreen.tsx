/**
 * LernDeutsch AI - Dashboard Screen
 */

import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  ScreenContainer,
  Card,
  VocabularyCard,
  LoadingSpinner,
} from "../../components";
import { useVocabulary, useAuth } from "../../hooks";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../theme";

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { vocabulary, stats, isLoading, refresh } = useVocabulary();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  const recentVocabulary = vocabulary.slice(0, 5);
  const displayName =
    user?.profile?.display_name || user?.email?.split("@")[0] || "Learner";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <ScreenContainer safeArea padding={false}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary.default}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{displayName} 👋</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="person-circle"
              size={44}
              color={COLORS.text.muted}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.captureButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Capture")}
          >
            <LinearGradient
              colors={COLORS.primary.gradient}
              style={styles.captureGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.captureContent}>
                <View style={styles.captureIconContainer}>
                  <Ionicons name="camera" size={28} color={COLORS.white} />
                </View>
                <View style={styles.captureTextContainer}>
                  <Text style={styles.captureTitle}>New Capture</Text>
                  <Text style={styles.captureSubtitle}>
                    Extract vocabulary from images
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.white}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>{stats?.total || 0}</Text>
              <Text style={styles.statLabel}>Total Words</Text>
            </Card>

            <Card style={[styles.statCard, styles.statCardMastered]}>
              <Text
                style={[styles.statNumber, { color: COLORS.mastery.mastered }]}
              >
                {stats?.byStatus?.Mastered || 0}
              </Text>
              <Text style={styles.statLabel}>Mastered</Text>
            </Card>

            <Card style={styles.statCard}>
              <Text
                style={[styles.statNumber, { color: COLORS.mastery.learning }]}
              >
                {stats?.byStatus?.Learning || 0}
              </Text>
              <Text style={styles.statLabel}>Learning</Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={[styles.statNumber, { color: COLORS.status.info }]}>
                {stats?.recentCount || 0}
              </Text>
              <Text style={styles.statLabel}>This Week</Text>
            </Card>
          </View>
        </View>

        {/* Category Distribution */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>By Category</Text>
          <View style={styles.categoryList}>
            {[
              {
                name: "Noun",
                icon: "cube-outline",
                color: COLORS.category.noun,
              },
              {
                name: "Verb",
                icon: "flash-outline",
                color: COLORS.category.verb,
              },
              {
                name: "Adjective",
                icon: "color-palette-outline",
                color: COLORS.category.adjective,
              },
              {
                name: "Adverb",
                icon: "speedometer-outline",
                color: COLORS.category.adverb,
              },
              {
                name: "Phrase",
                icon: "chatbubble-outline",
                color: COLORS.category.phrase,
              },
            ].map((cat) => (
              <View key={cat.name} style={styles.categoryItem}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: cat.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={cat.color}
                  />
                </View>
                <Text style={styles.categoryCount}>
                  {stats?.byCategory?.[cat.name] || 0}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Vocabulary */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Vocabulary</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Library")}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <LoadingSpinner message="Loading vocabulary..." />
            </View>
          ) : recentVocabulary.length > 0 ? (
            recentVocabulary.map((item) => (
              <VocabularyCard
                key={item.id}
                vocabulary={item}
                compact
                onPress={() =>
                  navigation.navigate("Library", {
                    screen: "VocabularyDetail",
                    params: { vocabularyId: item.id },
                  })
                }
              />
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Ionicons
                name="book-outline"
                size={40}
                color={COLORS.text.disabled}
              />
              <Text style={styles.emptyText}>No vocabulary yet</Text>
              <Text style={styles.emptySubtext}>
                Start by capturing your first image!
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING["4xl"],
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.base,
    marginBottom: SPACING.xl,
  },
  greeting: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
  },
  userName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  // Quick Actions
  quickActions: {
    marginBottom: SPACING.xl,
  },
  captureButton: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  captureGradient: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
  },
  captureContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  captureIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.base,
  },
  captureTextContainer: {
    flex: 1,
  },
  captureTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
  },
  captureSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: "rgba(255,255,255,0.8)",
  },
  // Stats
  statsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  statCardMastered: {
    borderWidth: 1,
    borderColor: COLORS.mastery.mastered,
  },
  statNumber: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Categories
  categorySection: {
    marginBottom: SPACING.xl,
  },
  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  categoryCount: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  // Recent
  recentSection: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  viewAllLink: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary.default,
    fontWeight: "600",
  },
  loadingContainer: {
    paddingVertical: SPACING["3xl"],
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: SPACING["2xl"],
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    marginTop: SPACING.xs,
  },
});

export default DashboardScreen;

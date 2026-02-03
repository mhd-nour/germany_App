/**
 * LernDeutsch AI - Profile Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenContainer, Card, Button } from "../../components";
import { useAuth, useVocabulary } from "../../hooks";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../theme";

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { stats } = useVocabulary();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const displayName = user?.profile?.display_name || "German Learner";
  const email = user?.email || "";

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  const MenuItem: React.FC<{
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    color?: string;
  }> = ({ icon, title, subtitle, onPress, rightElement, color }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.menuIconContainer,
          color ? { backgroundColor: color + "20" } : undefined,
        ]}
      >
        <Ionicons name={icon} size={22} color={color || COLORS.text.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement ||
        (onPress && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.text.muted}
          />
        ))}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer scrollable safeArea>
      {/* Profile Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={COLORS.primary.gradient}
          style={styles.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarText}>
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </LinearGradient>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.email}>{email}</Text>

        {/* Mini Stats */}
        <View style={styles.miniStats}>
          <View style={styles.miniStatItem}>
            <Text style={styles.miniStatNumber}>{stats?.total || 0}</Text>
            <Text style={styles.miniStatLabel}>Words</Text>
          </View>
          <View style={styles.miniStatDivider} />
          <View style={styles.miniStatItem}>
            <Text
              style={[
                styles.miniStatNumber,
                { color: COLORS.mastery.mastered },
              ]}
            >
              {stats?.byStatus?.Mastered || 0}
            </Text>
            <Text style={styles.miniStatLabel}>Mastered</Text>
          </View>
          <View style={styles.miniStatDivider} />
          <View style={styles.miniStatItem}>
            <Text
              style={[
                styles.miniStatNumber,
                { color: COLORS.mastery.learning },
              ]}
            >
              {stats?.byStatus?.Learning || 0}
            </Text>
            <Text style={styles.miniStatLabel}>Learning</Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Card padding="none">
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your display name"
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "Profile editing will be available soon.",
              )
            }
            color={COLORS.status.info}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Change Password"
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "Password change will be available soon.",
              )
            }
            color={COLORS.secondary.default}
          />
        </Card>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card padding="none">
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Receive learning reminders"
            color={COLORS.primary.default}
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: COLORS.surface.tertiary,
                  true: COLORS.primary.default + "50",
                }}
                thumbColor={
                  notifications ? COLORS.primary.default : COLORS.text.muted
                }
              />
            }
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Always enabled"
            color={COLORS.status.info}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: COLORS.surface.tertiary,
                  true: COLORS.primary.default + "50",
                }}
                thumbColor={
                  darkMode ? COLORS.primary.default : COLORS.text.muted
                }
                disabled
              />
            }
          />
        </Card>
      </View>

      {/* Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Sync</Text>
        <Card padding="none">
          <MenuItem
            icon="cloud-done-outline"
            title="Sync Status"
            subtitle="All data synced"
            color={COLORS.status.success}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="download-outline"
            title="Export Data"
            onPress={() =>
              Alert.alert("Coming Soon", "Data export will be available soon.")
            }
            color={COLORS.secondary.default}
          />
        </Card>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Card padding="none">
          <MenuItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0"
            color={COLORS.text.muted}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => {}}
            color={COLORS.text.muted}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="lock-closed-outline"
            title="Privacy Policy"
            onPress={() => {}}
            color={COLORS.text.muted}
          />
        </Card>
      </View>

      {/* Sign Out */}
      <View style={styles.signOutSection}>
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          variant="outline"
          fullWidth
          leftIcon={
            <Ionicons
              name="log-out-outline"
              size={20}
              color={COLORS.primary.default}
            />
          }
        />
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Made with 💛 for German learners</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  // Header
  header: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  avatarGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.base,
    ...SHADOWS.lg,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.white,
  },
  displayName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  email: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginBottom: SPACING.xl,
  },
  miniStats: {
    flexDirection: "row",
    backgroundColor: COLORS.surface.primary,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.xl,
    ...SHADOWS.sm,
  },
  miniStatItem: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  miniStatDivider: {
    width: 1,
    backgroundColor: COLORS.border.default,
  },
  miniStatNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  miniStatLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
  },
  // Sections
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.muted,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Menu Items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.base,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  menuSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border.default,
    marginLeft: 68,
  },
  // Sign Out
  signOutSection: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  // Footer
  footer: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.disabled,
    textAlign: "center",
    marginBottom: SPACING["2xl"],
  },
});

export default ProfileScreen;

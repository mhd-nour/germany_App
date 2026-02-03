/**
 * LernDeutsch AI - Capture Home Screen
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ScreenContainer, Card, Header } from "../../components";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../theme";
import type { CaptureStackParamList } from "../../types";

type CaptureNavigationProp = NativeStackNavigationProp<
  CaptureStackParamList,
  "CaptureHome"
>;

const CaptureHomeScreen: React.FC = () => {
  const navigation = useNavigation<CaptureNavigationProp>();

  const handleCameraPress = () => {
    navigation.navigate("Camera");
  };

  const handleGalleryPress = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Permission to access gallery is required!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate("Processing", { imageUri: result.assets[0].uri });
    }
  };

  return (
    <ScreenContainer safeArea>
      <Header title="Capture" />

      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={COLORS.primary.gradient}
            style={styles.heroIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="sparkles" size={40} color={COLORS.white} />
          </LinearGradient>
          <Text style={styles.heroTitle}>AI-Powered Extraction</Text>
          <Text style={styles.heroSubtitle}>
            Take a photo or select an image containing German text.{"\n"}
            Our AI will extract and organize vocabulary for you.
          </Text>
        </View>

        {/* Capture Options */}
        <View style={styles.optionsContainer}>
          {/* Camera Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCameraPress}
            style={styles.optionCard}
          >
            <LinearGradient
              colors={COLORS.primary.gradient}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="camera" size={36} color={COLORS.white} />
              </View>
              <Text style={styles.optionTitle}>Take Photo</Text>
              <Text style={styles.optionDescription}>
                Use your camera to capture text from books, signs, or documents
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Gallery Option */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGalleryPress}
            style={styles.optionCard}
          >
            <View style={styles.optionOutline}>
              <View style={styles.optionIconContainerOutline}>
                <Ionicons
                  name="images"
                  size={36}
                  color={COLORS.primary.default}
                />
              </View>
              <Text style={styles.optionTitleOutline}>Choose from Gallery</Text>
              <Text style={styles.optionDescriptionOutline}>
                Select an existing image from your photo library
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb" size={20} color={COLORS.primary.default} />
            <Text style={styles.tipsTitle}>Tips for best results</Text>
          </View>
          <View style={styles.tipsList}>
            {[
              "Ensure text is clearly visible and in focus",
              "Good lighting helps with accuracy",
              "Works best with printed German text",
              "Can extract from books, menus, signs & more",
            ].map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  // Hero
  heroSection: {
    alignItems: "center",
    marginBottom: SPACING["2xl"],
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOWS.lg,
  },
  heroTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
    paddingHorizontal: SPACING.xl,
  },
  // Options
  optionsContainer: {
    gap: SPACING.base,
    marginBottom: SPACING.xl,
  },
  optionCard: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  optionGradient: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  optionOutline: {
    padding: SPACING.xl,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border.default,
    borderRadius: RADIUS.xl,
    borderStyle: "dashed",
    backgroundColor: COLORS.surface.primary,
  },
  optionIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  optionIconContainerOutline: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: COLORS.primary.default + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  optionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  optionTitleOutline: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  optionDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
  optionDescriptionOutline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    textAlign: "center",
  },
  // Tips
  tipsCard: {
    marginTop: "auto",
    marginBottom: SPACING.xl,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  tipsTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  tipsList: {
    gap: SPACING.sm,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary.default,
    marginTop: 6,
    marginRight: SPACING.sm,
  },
  tipText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    flex: 1,
  },
});

export default CaptureHomeScreen;

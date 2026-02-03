/**
 * LernDeutsch AI - Processing Screen
 * Shows while AI is extracting vocabulary from image
 */

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer } from "../../components";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from "../../theme";
import type { CaptureStackParamList, ExtractedWord } from "../../types";

type ProcessingNavigationProp = NativeStackNavigationProp<
  CaptureStackParamList,
  "Processing"
>;
type ProcessingRouteProp = RouteProp<CaptureStackParamList, "Processing">;

const PROCESSING_STEPS = [
  { icon: "cloud-upload", text: "Uploading image..." },
  { icon: "scan", text: "Analyzing with AI..." },
  { icon: "text", text: "Extracting German text..." },
  { icon: "language", text: "Translating & categorizing..." },
  { icon: "checkmark-done", text: "Preparing results..." },
];

const ProcessingScreen: React.FC = () => {
  const navigation = useNavigation<ProcessingNavigationProp>();
  const route = useRoute<ProcessingRouteProp>();
  const { imageUri } = route.params;

  const [currentStep, setCurrentStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    // Simulate processing steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PROCESSING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: PROCESSING_STEPS.length * 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Simulate API call and navigate to review
    const timeout = setTimeout(
      () => {
        // Mock extracted data - in real app, this would come from Gemini API
        const mockExtractedWords: ExtractedWord[] = [
          {
            word: "Tisch",
            article: "der",
            plural: "Tische",
            translation: "table",
            example: "Der Tisch ist aus Holz.",
            category: "Noun",
            confidence: 0.95,
          },
          {
            word: "gehen",
            helper_verb: "sein",
            past_participle: "gegangen",
            translation: "to go",
            example: "Ich bin nach Hause gegangen.",
            category: "Verb",
            confidence: 0.92,
          },
          {
            word: "schnell",
            translation: "fast, quick",
            example: "Das Auto fährt sehr schnell.",
            category: "Adjective",
            confidence: 0.89,
          },
        ];

        navigation.replace("Review", {
          extractedWords: mockExtractedWords,
          imageUri,
        });
      },
      PROCESSING_STEPS.length * 1500 + 500,
    );

    return () => {
      pulse.stop();
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [navigation, imageUri, progressAnim, pulseAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <ScreenContainer safeArea>
      <View style={styles.container}>
        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <LinearGradient
            colors={["transparent", COLORS.background.primary]}
            style={styles.imageOverlay}
          />
        </View>

        {/* Processing Status */}
        <View style={styles.statusContainer}>
          <Animated.View
            style={[
              styles.iconContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={COLORS.primary.gradient}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={PROCESSING_STEPS[currentStep].icon as any}
                size={36}
                color={COLORS.white}
              />
            </LinearGradient>
          </Animated.View>

          <Text style={styles.statusTitle}>Processing Image</Text>
          <Text style={styles.statusText}>
            {PROCESSING_STEPS[currentStep].text}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((currentStep / (PROCESSING_STEPS.length - 1)) * 100)}%
            </Text>
          </View>

          {/* Steps */}
          <View style={styles.stepsContainer}>
            {PROCESSING_STEPS.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    index <= currentStep && styles.stepDotActive,
                    index === currentStep && styles.stepDotCurrent,
                  ]}
                >
                  {index < currentStep && (
                    <Ionicons name="checkmark" size={10} color={COLORS.white} />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    index <= currentStep && styles.stepTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {step.text.replace("...", "")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle"
            size={18}
            color={COLORS.text.muted}
          />
          <Text style={styles.infoText}>
            Our AI is analyzing your image using Gemini to extract German
            vocabulary with translations and grammar details.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Image
  imageContainer: {
    height: 200,
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  // Status
  statusContainer: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.lg,
  },
  statusTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  statusText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary.default,
    marginBottom: SPACING.xl,
  },
  // Progress
  progressContainer: {
    width: "100%",
    marginBottom: SPACING.xl,
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary.default,
    borderRadius: 4,
  },
  progressText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    textAlign: "center",
  },
  // Steps
  stepsContainer: {
    width: "100%",
    gap: SPACING.md,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  stepDotActive: {
    backgroundColor: COLORS.primary.default,
  },
  stepDotCurrent: {
    borderWidth: 3,
    borderColor: COLORS.primary.light,
  },
  stepText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.disabled,
    flex: 1,
  },
  stepTextActive: {
    color: COLORS.text.secondary,
  },
  // Info
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "auto",
    padding: SPACING.base,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  infoText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    flex: 1,
    marginLeft: SPACING.sm,
  },
});

export default ProcessingScreen;

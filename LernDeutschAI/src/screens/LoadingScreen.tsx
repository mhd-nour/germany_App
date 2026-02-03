/**
 * LernDeutsch AI - Loading Screen
 */

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING } from "../theme";

const LoadingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={COLORS.background.gradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={COLORS.primary.gradient}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="language" size={48} color={COLORS.white} />
          </LinearGradient>
        </View>

        <Text style={styles.title}>LernDeutsch</Text>
        <Text style={styles.subtitle}>AI-Powered Vocabulary</Text>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingDots}>
            {[0, 1, 2].map((i) => (
              <AnimatedDot key={i} delay={i * 200} />
            ))}
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const AnimatedDot: React.FC<{ delay: number }> = ({ delay }) => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return <Animated.View style={[styles.dot, { opacity: opacityAnim }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: SPACING.xl,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginBottom: SPACING["3xl"],
  },
  loadingContainer: {
    height: 40,
    justifyContent: "center",
  },
  loadingDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary.default,
  },
});

export default LoadingScreen;

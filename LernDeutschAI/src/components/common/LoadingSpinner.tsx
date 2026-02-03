/**
 * LernDeutsch AI - Loading Spinner Component
 */

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = COLORS.primary.default,
  message,
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spin.start();
    return () => spin.stop();
  }, [spinAnim]);

  const getSize = () => {
    switch (size) {
      case "sm":
        return 24;
      case "lg":
        return 48;
      default:
        return 36;
    }
  };

  const spinnerSize = getSize();
  const borderWidth = size === "sm" ? 2 : size === "lg" ? 4 : 3;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderWidth,
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    borderRadius: 100,
    borderColor: COLORS.surface.secondary,
  },
  message: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text.muted,
    marginTop: SPACING.md,
    textAlign: "center",
  },
});

export default LoadingSpinner;

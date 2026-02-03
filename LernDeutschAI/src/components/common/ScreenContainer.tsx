/**
 * LernDeutsch AI - Screen Container Component
 */

import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING } from "../../theme";

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  safeArea?: boolean;
  padding?: boolean;
  gradient?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  safeArea = true,
  padding = true,
  gradient = true,
  keyboardAvoiding = false,
  style,
  contentContainerStyle,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    ...(padding && { paddingHorizontal: SPACING.base }),
    ...style,
  };

  const content = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        padding && styles.scrollPadding,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={containerStyle}>{children}</View>
  );

  const wrappedContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  const Container = safeArea ? SafeAreaView : View;

  if (gradient) {
    return (
      <LinearGradient
        colors={COLORS.background.gradient}
        style={styles.flex}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar barStyle="light-content" />
        <Container style={styles.flex}>{wrappedContent}</Container>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.flex, styles.background]}>
      <StatusBar barStyle="light-content" />
      <Container style={styles.flex}>{wrappedContent}</Container>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: COLORS.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollPadding: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING["2xl"],
  },
});

export default ScreenContainer;

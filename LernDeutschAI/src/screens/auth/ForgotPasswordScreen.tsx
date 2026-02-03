/**
 * LernDeutsch AI - Forgot Password Screen
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer, Input, Button, Header } from "../../components";
import { useAuth } from "../../hooks";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      Alert.alert(
        "Error",
        result.error || "Failed to send reset email. Please try again.",
      );
    }
  };

  if (isSubmitted) {
    return (
      <ScreenContainer>
        <Header showBack transparent />
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="mail" size={48} color={COLORS.secondary.default} />
          </View>
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successMessage}>
            We've sent a password reset link to{"\n"}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            variant="primary"
            style={styles.backButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable keyboardAvoiding>
      <Header showBack transparent />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="key-outline"
              size={48}
              color={COLORS.primary.default}
            />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            No worries! Enter your email and we'll send you a reset link.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={error}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            style={styles.submitButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING["2xl"],
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING["3xl"],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
    maxWidth: 280,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  submitButton: {
    marginTop: SPACING.lg,
  },
  // Success State
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary.default + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  successTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  successMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
    marginBottom: SPACING["2xl"],
  },
  emailHighlight: {
    color: COLORS.text.primary,
    fontWeight: "600",
  },
  backButton: {
    minWidth: 200,
  },
});

export default ForgotPasswordScreen;

/**
 * LernDeutsch AI - Sign Up Screen
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer, Input, Button, Header } from "../../components";
import { useAuth } from "../../hooks";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";
import type { AuthStackParamList } from "../../types";

type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await signUp(email, password, displayName);
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        "Account Created!",
        "Please check your email to verify your account.",
        [{ text: "OK" }],
      );
    } else {
      Alert.alert("Sign Up Failed", result.error || "Please try again.");
    }
  };

  return (
    <ScreenContainer scrollable keyboardAvoiding>
      <Header showBack transparent />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={COLORS.secondary.gradient}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="person-add" size={32} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start your German learning journey
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Display Name"
            placeholder="How should we call you?"
            value={displayName}
            onChangeText={setDisplayName}
            error={errors.displayName}
            leftIcon="person-outline"
            autoCapitalize="words"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            leftIcon="lock-closed-outline"
            secureTextEntry
            showPasswordToggle
            hint="At least 6 characters"
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            leftIcon="lock-closed-outline"
            secureTextEntry
            showPasswordToggle
          />

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            variant="secondary"
            style={styles.signUpButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING["2xl"],
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  iconGradient: {
    width: 70,
    height: 70,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.secondary.default,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
  },
  form: {
    marginBottom: SPACING.xl,
  },
  signUpButton: {
    marginTop: SPACING.lg,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: SPACING.xl,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginRight: SPACING.xs,
  },
  loginLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary.default,
    fontWeight: "600",
  },
});

export default SignUpScreen;

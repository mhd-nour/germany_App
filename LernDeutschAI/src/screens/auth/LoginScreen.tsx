/**
 * LernDeutsch AI - Login Screen
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer, Input, Button } from "../../components";
import { useAuth } from "../../hooks";
import { COLORS, TYPOGRAPHY, SPACING } from "../../theme";
import type { AuthStackParamList } from "../../types";

type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: typeof errors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert(
        "Login Failed",
        result.error || "Please check your credentials.",
      );
    }
  };

  return (
    <ScreenContainer scrollable keyboardAvoiding>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={COLORS.primary.gradient}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="language" size={36} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue learning German
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            leftIcon="lock-closed-outline"
            secureTextEntry
            showPasswordToggle
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING["3xl"],
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING["3xl"],
  },
  logoContainer: {
    marginBottom: SPACING.xl,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: "center",
  },
  form: {
    marginBottom: SPACING["2xl"],
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -SPACING.sm,
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary.default,
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: SPACING.xl,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginRight: SPACING.xs,
  },
  signUpLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary.default,
    fontWeight: "600",
  },
});

export default LoginScreen;

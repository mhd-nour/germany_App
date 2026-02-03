/**
 * LernDeutsch AI - Authentication Navigator
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../theme";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

import type { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.primary },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

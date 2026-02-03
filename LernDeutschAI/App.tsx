/**
 * LernDeutsch AI - Main Application Entry
 *
 * A German vocabulary learning app powered by AI image text extraction.
 *
 * Features:
 * - Capture German text from images (camera/gallery)
 * - AI-powered text extraction and vocabulary parsing
 * - Vocabulary library with search and filters
 * - Grammar support (articles, plurals, verb conjugation)
 * - Progress tracking with mastery levels
 */

import React, { useEffect } from "react";
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Providers
import { AuthProvider } from "./src/hooks/useAuth";

// Navigation
import RootNavigator from "./src/navigation/RootNavigator";

// Theme
import { COLORS } from "./src/theme";

// Ignore specific warnings (if needed)
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

// Navigation theme (dark mode)
const navigationTheme = {
  dark: true,
  colors: {
    primary: COLORS.primary.default,
    background: COLORS.background.primary,
    card: COLORS.surface.primary,
    text: COLORS.text.primary,
    border: COLORS.border.default,
    notification: COLORS.primary.default,
  },
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer theme={navigationTheme}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={COLORS.background.primary}
              translucent
            />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

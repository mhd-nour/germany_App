/**
 * LernDeutsch AI - Main Tab Navigator
 */

import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, RADIUS } from "../theme";

import DashboardScreen from "../screens/main/DashboardScreen";
import CaptureNavigator from "./CaptureNavigator";
import LibraryNavigator from "./LibraryNavigator";
import ProfileScreen from "../screens/main/ProfileScreen";

import type { MainTabParamList } from "../types";

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  name: keyof typeof Ionicons.glyphMap;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  size,
  name,
}) => {
  return <Ionicons name={name} size={size} color={color} />;
};

// Custom Capture Button (Central)
const CaptureButton: React.FC<{ focused: boolean }> = ({ focused }) => {
  return (
    <View style={styles.captureButtonContainer}>
      <LinearGradient
        colors={
          focused
            ? COLORS.primary.gradient
            : [COLORS.surface.secondary, COLORS.surface.tertiary]
        }
        style={styles.captureButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons
          name="camera"
          size={28}
          color={focused ? COLORS.text.inverse : COLORS.text.primary}
        />
      </LinearGradient>
    </View>
  );
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary.default,
        tabBarInactiveTintColor: COLORS.text.muted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name={focused ? "home" : "home-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name={focused ? "book" : "book-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Capture"
        component={CaptureNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <CaptureButton focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name={focused ? "person" : "person-outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface.primary,
    borderTopColor: COLORS.border.default,
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? 88 : 70,
    paddingTop: SPACING.sm,
    paddingBottom: Platform.OS === "ios" ? SPACING.xl : SPACING.sm,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  captureButtonContainer: {
    position: "absolute",
    top: -20,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MainTabNavigator;

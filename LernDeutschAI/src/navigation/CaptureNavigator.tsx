/**
 * LernDeutsch AI - Capture Flow Navigator
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../theme";

import CaptureHomeScreen from "../screens/capture/CaptureHomeScreen";
import CameraScreen from "../screens/capture/CameraScreen";
import ProcessingScreen from "../screens/capture/ProcessingScreen";
import ReviewScreen from "../screens/capture/ReviewScreen";

import type { CaptureStackParamList } from "../types";

const Stack = createNativeStackNavigator<CaptureStackParamList>();

const CaptureNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.primary },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="CaptureHome" component={CaptureHomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default CaptureNavigator;

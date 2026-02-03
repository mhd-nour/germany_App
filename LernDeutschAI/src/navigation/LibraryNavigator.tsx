/**
 * LernDeutsch AI - Library Navigator
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../theme";

import LibraryHomeScreen from "../screens/library/LibraryHomeScreen";
import VocabularyDetailScreen from "../screens/library/VocabularyDetailScreen";
import EditVocabularyScreen from "../screens/library/EditVocabularyScreen";

import type { LibraryStackParamList } from "../types";

const Stack = createNativeStackNavigator<LibraryStackParamList>();

const LibraryNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.primary },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="LibraryHome" component={LibraryHomeScreen} />
      <Stack.Screen
        name="VocabularyDetail"
        component={VocabularyDetailScreen}
      />
      <Stack.Screen name="EditVocabulary" component={EditVocabularyScreen} />
    </Stack.Navigator>
  );
};

export default LibraryNavigator;

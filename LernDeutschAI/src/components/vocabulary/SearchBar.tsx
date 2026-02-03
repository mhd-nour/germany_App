/**
 * LernDeutsch AI - Search Bar Component
 */

import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../../theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search vocabulary...",
  onSubmit,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText("");
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? COLORS.primary.default : COLORS.text.muted}
        style={styles.searchIcon}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.disabled}
        selectionColor={COLORS.primary.default}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={COLORS.text.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.secondary,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  containerFocused: {
    borderColor: COLORS.primary.default,
    backgroundColor: COLORS.surface.primary,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    padding: 0,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});

export default SearchBar;

/**
 * LernDeutsch AI - Select/Dropdown Component
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  LAYOUT,
  SHADOWS,
} from "../../theme";

interface SelectOption {
  label: string;
  value: string;
  color?: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  error,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const hasError = !!error;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen(true)}
        style={[styles.selectButton, hasError && styles.selectButtonError]}
      >
        <Text
          style={[
            styles.selectText,
            !selectedOption && styles.placeholderText,
            selectedOption?.color ? { color: selectedOption.color } : undefined,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.text.muted} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || "Select"}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Ionicons name="close" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.optionItemSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.color ? { color: item.color } : undefined,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={COLORS.primary.default}
                    />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.base,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textTransform: "none",
    letterSpacing: 0,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface.secondary,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    height: LAYOUT.inputHeight,
    paddingHorizontal: SPACING.base,
  },
  selectButtonError: {
    borderColor: COLORS.status.error,
  },
  selectText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
  },
  placeholderText: {
    color: COLORS.text.disabled,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.status.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.surface.primary,
    borderTopLeftRadius: RADIUS["2xl"],
    borderTopRightRadius: RADIUS["2xl"],
    maxHeight: "60%",
    ...SHADOWS.xl,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.default,
  },
  modalTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text.primary,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.default,
  },
  optionItemSelected: {
    backgroundColor: COLORS.surface.secondary,
  },
  optionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
  },
  optionTextSelected: {
    color: COLORS.primary.default,
    fontWeight: "600",
  },
});

export default Select;

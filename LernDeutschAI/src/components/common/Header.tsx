/**
 * LernDeutsch AI - Header Component
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from "../../theme";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  style?: ViewStyle;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  style,
  transparent = false,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, transparent && styles.transparent, style]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.text.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {rightAction && (
          <TouchableOpacity
            onPress={rightAction.onPress}
            style={styles.rightButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name={rightAction.icon}
              size={24}
              color={COLORS.text.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: LAYOUT.headerHeight,
    paddingHorizontal: SPACING.base,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  leftSection: {
    width: 44,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
  },
  rightSection: {
    width: 44,
    alignItems: "flex-end",
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text.primary,
    textAlign: "center",
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    textAlign: "center",
    marginTop: 2,
  },
  backButton: {
    padding: SPACING.xs,
  },
  rightButton: {
    padding: SPACING.xs,
  },
});

export default Header;

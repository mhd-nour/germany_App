/**
 * LernDeutsch AI - Filter Bar Component
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Chip } from "../common";
import { COLORS, SPACING } from "../../theme";
import type { WordCategory, MasteryStatus, FilterState } from "../../types";

interface FilterBarProps {
  filters: Partial<FilterState>;
  onFilterChange: (filters: Partial<FilterState>) => void;
  showCategoryFilter?: boolean;
  showStatusFilter?: boolean;
}

const CATEGORIES: Array<WordCategory | "All"> = [
  "All",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "Phrase",
];
const STATUSES: Array<MasteryStatus | "All"> = [
  "All",
  "New",
  "Learning",
  "Reviewing",
  "Mastered",
];

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  showCategoryFilter = true,
  showStatusFilter = true,
}) => {
  const handleCategoryChange = (category: WordCategory | "All") => {
    onFilterChange({ ...filters, category });
  };

  const handleStatusChange = (status: MasteryStatus | "All") => {
    onFilterChange({ ...filters, status });
  };

  const getStatusVariant = (status: MasteryStatus | "All") => {
    switch (status) {
      case "Mastered":
        return "success" as const;
      case "Learning":
        return "warning" as const;
      case "Reviewing":
        return "info" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <View style={styles.container}>
      {showCategoryFilter && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}
        >
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              selected={
                filters.category === category ||
                (!filters.category && category === "All")
              }
              onPress={() => handleCategoryChange(category)}
              variant="primary"
              size="sm"
              style={styles.chip}
            />
          ))}
        </ScrollView>
      )}

      {showStatusFilter && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}
        >
          {STATUSES.map((status) => (
            <Chip
              key={status}
              label={status}
              selected={
                filters.status === status ||
                (!filters.status && status === "All")
              }
              onPress={() => handleStatusChange(status)}
              variant={getStatusVariant(status)}
              size="sm"
              style={styles.chip}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  filterRow: {
    marginBottom: SPACING.sm,
  },
  filterContent: {
    paddingHorizontal: SPACING.base,
    gap: SPACING.sm,
    flexDirection: "row",
  },
  chip: {
    marginRight: SPACING.sm,
  },
});

export default FilterBar;

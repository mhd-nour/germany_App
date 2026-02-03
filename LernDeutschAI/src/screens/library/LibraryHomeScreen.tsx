/**
 * LernDeutsch AI - Library Home Screen
 */

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScreenContainer,
  Header,
  VocabularyCard,
  SearchBar,
  FilterBar,
  EmptyState,
  LoadingSpinner,
} from "../../components";
import { useVocabulary } from "../../hooks";
import { COLORS, SPACING } from "../../theme";
import type {
  LibraryStackParamList,
  Vocabulary,
  FilterState,
} from "../../types";

type LibraryNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "LibraryHome"
>;

const LibraryHomeScreen: React.FC = () => {
  const navigation = useNavigation<LibraryNavigationProp>();
  const { vocabulary, isLoading, filters, setFilters, refresh } =
    useVocabulary();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters({ ...filters, searchQuery: query });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(newFilters);
  };

  const handleVocabularyPress = (item: Vocabulary) => {
    navigation.navigate("VocabularyDetail", { vocabularyId: item.id });
  };

  const renderVocabularyItem = ({ item }: { item: Vocabulary }) => (
    <VocabularyCard
      vocabulary={item}
      onPress={() => handleVocabularyPress(item)}
    />
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingSpinner message="Loading vocabulary..." />
        </View>
      );
    }

    if (searchQuery || filters.category !== "All" || filters.status !== "All") {
      return (
        <EmptyState
          icon="search-outline"
          title="No Results Found"
          message="Try adjusting your search or filters"
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery("");
            setFilters({ category: "All", status: "All", searchQuery: "" });
          }}
        />
      );
    }

    return (
      <EmptyState
        icon="book-outline"
        title="No Vocabulary Yet"
        message="Start capturing images to build your German vocabulary library"
        actionLabel="Capture Now"
        onAction={() => navigation.getParent()?.navigate("Capture")}
      />
    );
  };

  return (
    <ScreenContainer safeArea padding={false}>
      <Header
        title="Vocabulary Library"
        rightAction={{
          icon: "add",
          onPress: () => navigation.getParent()?.navigate("Capture"),
        }}
      />

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search words or translations..."
        />
      </View>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <FlatList
        data={vocabulary}
        keyExtractor={(item) => item.id}
        renderItem={renderVocabularyItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary.default}
          />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING["4xl"],
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING["5xl"],
  },
});

export default LibraryHomeScreen;

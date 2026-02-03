/**
 * LernDeutsch AI - Vocabulary Hook
 */

import { useState, useEffect, useCallback } from "react";
import type { Vocabulary, VocabularyFormData, FilterState } from "../types";
import {
  fetchVocabulary,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  getVocabularyStats,
} from "../services/vocabulary";

interface VocabularyState {
  vocabulary: Vocabulary[];
  isLoading: boolean;
  error: string | null;
  stats: {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    recentCount: number;
  } | null;
}

export const useVocabulary = (initialFilters?: Partial<FilterState>) => {
  const [state, setState] = useState<VocabularyState>({
    vocabulary: [],
    isLoading: true,
    error: null,
    stats: null,
  });

  const [filters, setFilters] = useState<Partial<FilterState>>(
    initialFilters || {},
  );

  const loadVocabulary = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await fetchVocabulary(filters);

    if (result.success && result.data) {
      setState((prev) => ({
        ...prev,
        vocabulary: result.data as Vocabulary[],
        isLoading: false,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        error: result.error || "Failed to load vocabulary",
        isLoading: false,
      }));
    }
  }, [filters]);

  const loadStats = useCallback(async () => {
    const stats = await getVocabularyStats();
    setState((prev) => ({ ...prev, stats }));
  }, []);

  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const addVocabulary = useCallback(
    async (formData: VocabularyFormData, imageUrl?: string) => {
      const result = await createVocabulary(formData, imageUrl);

      if (result.success) {
        await loadVocabulary();
        await loadStats();
      }

      return result;
    },
    [loadVocabulary, loadStats],
  );

  const editVocabulary = useCallback(
    async (id: string, formData: Partial<VocabularyFormData>) => {
      const result = await updateVocabulary(id, formData);

      if (result.success) {
        await loadVocabulary();
        await loadStats();
      }

      return result;
    },
    [loadVocabulary, loadStats],
  );

  const removeVocabulary = useCallback(
    async (id: string) => {
      const result = await deleteVocabulary(id);

      if (result.success) {
        await loadVocabulary();
        await loadStats();
      }

      return result;
    },
    [loadVocabulary, loadStats],
  );

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([loadVocabulary(), loadStats()]);
  }, [loadVocabulary, loadStats]);

  return {
    ...state,
    filters,
    setFilters: updateFilters,
    addVocabulary,
    editVocabulary,
    removeVocabulary,
    refresh,
  };
};

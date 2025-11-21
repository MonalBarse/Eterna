// src/lib/tokensSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from './tokens';

export type SortKey = 'mc' | 'vol' | 'change1m';

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  // Pre-sorted arrays for performance
  sortedNewPairs: Token[];
  sortedFinalStretch: Token[];
  sortedMigrated: Token[];
  // Map for O(1) lookups
  tokenMap: Record<string, { list: 'new' | 'final' | 'migrated'; index: number }>;
  sortKey: SortKey;
  isLoading: boolean;
}

// Helper to sort tokens
const sortTokens = (tokens: Token[], sortKey: SortKey): Token[] => {
  return [...tokens].sort((a, b) => b[sortKey] - a[sortKey]);
};

// Helper to build token map
const buildTokenMap = (
  newPairs: Token[],
  finalStretch: Token[],
  migrated: Token[]
): Record<string, { list: 'new' | 'final' | 'migrated'; index: number }> => {
  const map: Record<string, { list: 'new' | 'final' | 'migrated'; index: number }> = {};
  newPairs.forEach((token, index) => {
    map[token.id] = { list: 'new', index };
  });
  finalStretch.forEach((token, index) => {
    map[token.id] = { list: 'final', index };
  });
  migrated.forEach((token, index) => {
    map[token.id] = { list: 'migrated', index };
  });
  return map;
};

// Start with an empty store; React Query will hydrate via hydrateTokens.
const initialState: TokensState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  sortedNewPairs: [],
  sortedFinalStretch: [],
  sortedMigrated: [],
  tokenMap: {},
  sortKey: 'mc',
  // Initial page load shows skeleton until React Query resolves
  isLoading: true,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // Hydrate state from an external source (e.g. React Query)
    hydrateTokens(
      state,
      action: PayloadAction<{
        new: Token[];
        final: Token[];
        migrated: Token[];
      }>
    ) {
      const { new: newPairs, final: finalStretch, migrated } = action.payload;

      state.newPairs = newPairs;
      state.finalStretch = finalStretch;
      state.migrated = migrated;

      state.sortedNewPairs = sortTokens(newPairs, state.sortKey);
      state.sortedFinalStretch = sortTokens(finalStretch, state.sortKey);
      state.sortedMigrated = sortTokens(migrated, state.sortKey);

      state.tokenMap = buildTokenMap(newPairs, finalStretch, migrated);
    },

    // Standard Setters
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    // Set sort key and re-sort all arrays
    setSortKey(state, action: PayloadAction<SortKey>) {
      state.sortKey = action.payload;
      state.sortedNewPairs = sortTokens(state.newPairs, action.payload);
      state.sortedFinalStretch = sortTokens(state.finalStretch, action.payload);
      state.sortedMigrated = sortTokens(state.migrated, action.payload);
    },

    // The "Clock" Reducer
    incrementTime(state) {
      // Only strictly necessary for "New Pairs" usually
      state.newPairs.forEach(t => t.createdAgo += 1);
      state.sortedNewPairs.forEach(t => t.createdAgo += 1);
    },

    // The "Heartbeat" Reducer (Optimized with Map lookup)
    updateTokenData(state, action: PayloadAction<Array<{id: string; priceChange: number; txIncrement: number; volIncrement: number}>>) {
      const updates = action.payload;
      let needsResort = false;

      updates.forEach(update => {
        const location = state.tokenMap[update.id];
        if (!location) return;

        // Get the correct list
        const list = location.list === 'new' 
          ? state.newPairs 
          : location.list === 'final' 
          ? state.finalStretch 
          : state.migrated;

        const sortedList = location.list === 'new'
          ? state.sortedNewPairs
          : location.list === 'final'
          ? state.sortedFinalStretch
          : state.sortedMigrated;

        const token = list[location.index];
        if (token && token.id === update.id) {
          token.price += update.priceChange;
          token.txCount += update.txIncrement;
          token.vol += update.volIncrement;
          // Recalculate MC roughly based on price change
          token.mc = token.mc * (1 + (update.priceChange / token.price));
          needsResort = true;

          // Also update in sorted list
          const sortedToken = sortedList.find(t => t.id === update.id);
          if (sortedToken) {
            sortedToken.price = token.price;
            sortedToken.txCount = token.txCount;
            sortedToken.vol = token.vol;
            sortedToken.mc = token.mc;
          }
        }
      });

      // Re-sort if needed
      if (needsResort) {
        state.sortedNewPairs = sortTokens(state.newPairs, state.sortKey);
        state.sortedFinalStretch = sortTokens(state.finalStretch, state.sortKey);
        state.sortedMigrated = sortTokens(state.migrated, state.sortKey);
      }
    }
  },
});

export const {
  hydrateTokens,
  setLoading,
  setSortKey,
  incrementTime,
  updateTokenData,
} = tokensSlice.actions;
export const tokensReducer = tokensSlice.reducer;

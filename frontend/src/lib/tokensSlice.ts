// src/lib/tokensSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, generateMockTokens } from './tokens';

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  isLoading: boolean;
}

// Generate initial 300+ tokens
const initialData = generateMockTokens(300);

const initialState: TokensState = {
  newPairs: initialData.new,
  finalStretch: initialData.final,
  migrated: initialData.migrated,
  isLoading: false,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // Standard Setters
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    // The "Clock" Reducer
    incrementTime(state) {
      // Only strictly necessary for "New Pairs" usually
      state.newPairs.forEach(t => t.createdAgo += 1);
    },

    // The "Heartbeat" Reducer (Complex)
    updateTokenData(state, action: PayloadAction<Array<{id: string; priceChange: number; txIncrement: number; volIncrement: number}>>) {
      const updates = action.payload;

      // Helper to find and update in any array
      const updateInList = (list: Token[]) => {
        updates.forEach(update => {
          const token = list.find(t => t.id === update.id);
          if (token) {
            token.price += update.priceChange;
            token.txCount += update.txIncrement;
            token.vol += update.volIncrement;
            // Recalculate MC roughly based on price change
            token.mc = token.mc * (1 + (update.priceChange / token.price));
          }
        });
      };

      updateInList(state.newPairs);
      updateInList(state.finalStretch);
      updateInList(state.migrated);
    }
  },
});

export const { setLoading, incrementTime, updateTokenData } = tokensSlice.actions;
export const tokensReducer = tokensSlice.reducer;
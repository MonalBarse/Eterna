'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, getMockTokensByColumn } from './tokens';

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  isLoading: boolean; // Added loading state
}

const initialData = getMockTokensByColumn();

const initialState: TokensState = {
  newPairs: initialData.new,
  finalStretch: initialData.final,
  migrated: initialData.migrated,
  isLoading: false, // Default to false, set to true when you start fetching
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setNewPairs(state, action: PayloadAction<Token[]>) {
      state.newPairs = action.payload;
    },
    setFinalStretch(state, action: PayloadAction<Token[]>) {
      state.finalStretch = action.payload;
    },
    setMigrated(state, action: PayloadAction<Token[]>) {
      state.migrated = action.payload;
    },
  },
});

export const { setLoading, setNewPairs, setFinalStretch, setMigrated } =
  tokensSlice.actions;
export const tokensReducer = tokensSlice.reducer;
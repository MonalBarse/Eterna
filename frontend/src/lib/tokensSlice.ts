'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, MOCK_TOKENS } from './tokens';

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
}

const initialState: TokensState = {
  newPairs: MOCK_TOKENS,      // we can later replace with real data / per-column data
  finalStretch: MOCK_TOKENS,
  migrated: MOCK_TOKENS,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // placeholder; we’ll add more later
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

export const { setNewPairs, setFinalStretch, setMigrated } = tokensSlice.actions;
export const tokensReducer = tokensSlice.reducer;

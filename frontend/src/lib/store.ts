'use client';

import { configureStore } from '@reduxjs/toolkit';
import { tokensReducer } from '@/lib/tokensSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
});

// TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

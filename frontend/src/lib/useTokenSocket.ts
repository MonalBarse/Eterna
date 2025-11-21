// src/lib/useTokenSocket.ts
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { updateTokenData, incrementTime } from './tokensSlice';

const IS_PROD = process.env.NODE_ENV === 'production';
const UPDATE_INTERVAL_MS = IS_PROD ? 350 : 120;
const UPDATES_PER_TICK = IS_PROD ? 1 : 3;

export function useTokenSocket() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const updates = Array.from({ length: UPDATES_PER_TICK }).map(() => ({
        id: `token-${Math.floor(Math.random() * 300)}`,
        // Keep price changes visible but not too noisy
        priceChange: (Math.random() - 0.5) * 0.00003,
        txIncrement: Math.random() > 0.8 ? 1 : 0,
        volIncrement: Math.random() * 300,
      }));

      dispatch(updateTokenData(updates));
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Effect 2: The "Clock" (Age increments)
  // Fires every 1 second (cheap compared to price updates)
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
}

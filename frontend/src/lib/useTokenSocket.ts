// src/lib/useTokenSocket.ts
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { updateTokenData, incrementTime } from './tokensSlice';

export function useTokenSocket() {
 const dispatch = useAppDispatch();

  useEffect(() => {
    // Make it fast: 100ms for "High Frequency" feel
    const interval = setInterval(() => {
      const updates = Array.from({ length: 8 }).map(() => ({
        id: `token-${Math.floor(Math.random() * 300)}`,
        // Make price changes significant enough to trigger flash
        priceChange: (Math.random() - 0.5) * 0.00005,
        txIncrement: Math.random() > 0.7 ? 1 : 0,
        volIncrement: Math.random() * 500,
      }));

      dispatch(updateTokenData(updates));
    }, 150); // <--- 150ms interval

    return () => clearInterval(interval);
  }, [dispatch]);

  // Effect 2: The "Clock" (Age increments)
  // Fires every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
}
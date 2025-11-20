// src/lib/useTokenSocket.ts
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { updateTokenData, incrementTime } from './tokensSlice';

export function useTokenSocket() {
  const dispatch = useAppDispatch();

  // Effect 1: The "Heartbeat" (Transactions & Price updates)
  // Fires rapidly (every 100ms) to simulate high-frequency trading
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick random tokens to update
      // In a real app, this data comes from the WS payload
      const updates = Array.from({ length: 5 }).map(() => ({
        id: `token-${Math.floor(Math.random() * 300)}`, // approximate ID matching
        priceChange: (Math.random() - 0.5) * 0.001, // Small fluctuation
        txIncrement: Math.random() > 0.5 ? 1 : 0,
        volIncrement: Math.random() * 100,
      }));

      dispatch(updateTokenData(updates));
    }, 200); // 200ms updates

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
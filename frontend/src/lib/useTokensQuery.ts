'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@/lib/hooks';
import { hydrateTokens, setLoading } from '@/lib/tokensSlice';
import { Token } from './tokens';

export type TokensResponse = {
  new: Token[];
  final: Token[];
  migrated: Token[];
};

async function fetchTokens(): Promise<TokensResponse> {
  const res = await fetch('/api/tokens');
  if (!res.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return res.json();
}

// React Query hook that fetches tokens from the mock API
// and hydrates the Redux store when data arrives.
export function useTokensQuery() {
  const dispatch = useAppDispatch();

  const queryResult = useQuery<TokensResponse>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // When fresh data arrives, hydrate Redux and switch off the skeleton.
  // We also switch off the skeleton if the query errors so the error UI is visible.
  useEffect(() => {
    if (queryResult.data) {
      dispatch(hydrateTokens(queryResult.data));
    }
    if (queryResult.data || queryResult.error) {
      dispatch(setLoading(false));
    }
  }, [dispatch, queryResult.data, queryResult.error]);

  return queryResult;
}

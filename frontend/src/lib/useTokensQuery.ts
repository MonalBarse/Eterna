'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@/lib/hooks';
import { hydrateTokens } from '@/lib/tokensSlice';
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

  return useQuery<TokensResponse>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(hydrateTokens(data));
    },
  });
}

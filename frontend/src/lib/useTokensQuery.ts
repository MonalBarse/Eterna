'use client';

import { useQuery } from '@tanstack/react-query';
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

export function useTokensQuery() {
  return useQuery<TokensResponse>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 10_000, // refresh every 10s for now
  });
}

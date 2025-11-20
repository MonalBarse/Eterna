'use client';

import { useState } from 'react';
import { TokenColumn } from '@/components/pulse/TokenColumn';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { PulseSkeleton } from '@/components/pulse/PulseSkeleton';
import { useAppSelector } from '@/lib/hooks';
import { useTokenSocket } from '@/lib/useTokenSocket'; // Import this

export default function Page() {
  // 1. ACTIVATE THE SOCKET
  useTokenSocket();

  const { newPairs, finalStretch, migrated, isLoading } = useAppSelector(
    (state) => state.tokens
  );

  // 2. Add Sorting State (Requirement: Sorting)
  const [sortKey, setSortKey] = useState<'mc' | 'vol' | 'change1m'>('mc');

  // Helper to sort on the fly
  const sortTokens = (tokens: any[]) => {
    return [...tokens].sort((a, b) => b[sortKey] - a[sortKey]);
  };

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4 h-screen overflow-hidden">
        {/* Pass sort handler to header */}
        <PulseHeader currentSort={sortKey} onSortChange={setSortKey} />

        {isLoading ? (
          <PulseSkeleton />
        ) : (
          <section className="grid lg:grid-cols-3 border border-slate-800 h-full">
            <TokenColumn title="New Pairs" tokens={sortTokens(newPairs)} />
            <TokenColumn title="Final Stretch" tokens={sortTokens(finalStretch)} />
            <TokenColumn title="Migrated" tokens={sortTokens(migrated)} />
          </section>
        )}
      </div>
    </main>
  );
}
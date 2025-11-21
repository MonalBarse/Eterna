'use client';

import { useCallback, useMemo, useState } from 'react';
import { TokenColumn } from '@/components/pulse/TokenColumn';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { PulseSkeleton } from '@/components/pulse/PulseSkeleton';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useTokenSocket } from '@/lib/useTokenSocket';
import { useTokensQuery } from '@/lib/useTokensQuery';
import { setSortKey, type SortKey } from '@/lib/tokensSlice';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function PulseClient() {
  const [chain, setChain] = useState<'SOL' | 'BNB'>('SOL');

  // Start WebSocket-style mock updates
  useTokenSocket();

  // Fetch token data via React Query and hydrate Redux on success.
  const { isFetching, isError, refetch } = useTokensQuery();

  const dispatch = useAppDispatch();

  // Memoized selector for better performance
  const { sortedNewPairs, sortedFinalStretch, sortedMigrated, sortKey, isLoading } = useAppSelector(
    (state) => ({
      sortedNewPairs: state.tokens.sortedNewPairs,
      sortedFinalStretch: state.tokens.sortedFinalStretch,
      sortedMigrated: state.tokens.sortedMigrated,
      sortKey: state.tokens.sortKey,
      isLoading: state.tokens.isLoading,
    })
  );

  // Memoize sorted data to prevent unnecessary re-sorts
  const memoizedNewPairs = useMemo(() => sortedNewPairs, [sortedNewPairs]);
  const memoizedFinalStretch = useMemo(() => sortedFinalStretch, [sortedFinalStretch]);
  const memoizedMigrated = useMemo(() => sortedMigrated, [sortedMigrated]);

  // Handler for sort key changes (stable reference for header)
  const handleSortChange = useCallback(
    (key: SortKey) => {
      dispatch(setSortKey(key));
    },
    [dispatch]
  );

  return (
    <>
      <PulseHeader
        currentSort={sortKey}
        onSortChange={handleSortChange}
        chain={chain}
        onChainChange={setChain}
      />

      {/* React Query data error state (local to the table) */}
      {isError && (
        <div className="mb-2 flex items-center justify-between rounded-md border border-red-500/40 bg-red-950/40 px-3 py-2 text-[11px] text-red-100">
          <span>Failed to load tokens. Please try again.</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded border border-red-400/60 bg-red-900/40 px-2 py-1 text-[10px] font-medium hover:bg-red-800/60"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <PulseSkeleton />
      ) : (
        <>
          {/* Background fetch shimmer/progressive indicator */}
          {isFetching && (
            <div className="mb-2 h-1 w-full animate-pulse bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-indigo-500/0" />
          )}

          {/* --- DESKTOP VIEW (Grid) --- */}
          <section className="hidden lg:grid lg:grid-cols-3 border border-slate-800 h-full">
            <TokenColumn title="New Pairs" tokens={memoizedNewPairs} chain={chain} />
            <TokenColumn
              title="Final Stretch"
              tokens={memoizedFinalStretch}
              chain={chain}
            />
            <TokenColumn title="Migrated" tokens={memoizedMigrated} chain={chain} />
          </section>

          {/* --- MOBILE VIEW (Tabs) --- */}
          <section className="lg:hidden h-full flex flex-col border border-slate-800 rounded-md overflow-hidden">
            <Tabs defaultValue="new" className="flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#090a12] border-b border-slate-800 h-11 p-0 rounded-none">
                <TabsTrigger
                  value="new"
                  className="text-gray-500 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-gray-300 data-[state=active]:bg-slate-900/50 text-xs h-full"
                >
                  New Pairs
                </TabsTrigger>
                <TabsTrigger
                  value="final"
                  className="text-gray-500 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-gray-300 data-[state=active]:bg-slate-900/50 text-xs h-full"
                >
                  Final Stretch
                </TabsTrigger>
                <TabsTrigger
                  value="migrated"
                  className="text-gray-500 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-gray-300 data-[state=active]:bg-slate-900/50 text-xs h-full"
                >
                  Migrated
                </TabsTrigger>
              </TabsList>

              {/* Mobile Height Calc:
                   100vh - header(~60px) - padding(~24px) - tabs(~44px) approx = ~13-14rem overhead
                */}
              <TabsContent
                value="new"
                className="flex-1 mt-0 overflow-hidden"
              >
                <TokenColumn
                  title="New Pairs"
                  tokens={memoizedNewPairs}
                  chain={chain}
                  scrollClass="h-[calc(100vh-11rem)]"
                />
              </TabsContent>
              <TabsContent
                value="final"
                className="flex-1 mt-0 overflow-hidden"
              >
                <TokenColumn
                  title="Final Stretch"
                  tokens={memoizedFinalStretch}
                  chain={chain}
                  scrollClass="h-[calc(100vh-11rem)]"
                />
              </TabsContent>
              <TabsContent
                value="migrated"
                className="flex-1 mt-0 overflow-hidden"
              >
                <TokenColumn
                  title="Migrated"
                  tokens={memoizedMigrated}
                  chain={chain}
                  scrollClass="h-[calc(100vh-11rem)]"
                />
              </TabsContent>
            </Tabs>
          </section>
        </>
      )}
    </>
  );
}
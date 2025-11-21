'use client';

import { useState } from 'react';
import { TokenColumn } from '@/components/pulse/TokenColumn';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { PulseSkeleton } from '@/components/pulse/PulseSkeleton';
import { useAppSelector } from '@/lib/hooks';
import { useTokenSocket } from '@/lib/useTokenSocket';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { Token } from '@/lib/tokens';

export default function Page() {
  useTokenSocket();

  const { newPairs, finalStretch, migrated, isLoading } = useAppSelector(
    (state) => state.tokens
  );

  const [sortKey, setSortKey] = useState<'mc' | 'vol' | 'change1m'>('mc');

  // Helper to sort on the fly
  const sortTokens = (tokens: Token[]) => {
    return [...tokens].sort((a, b) => b[sortKey] - a[sortKey]);
  };

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4 h-screen overflow-hidden">
        <PulseHeader currentSort={sortKey} onSortChange={setSortKey} />

        {isLoading ? (
          <PulseSkeleton />
        ) : (
          <>
            {/* --- DESKTOP VIEW (Grid) --- */}
            <section className="hidden lg:grid lg:grid-cols-3 border border-slate-800 h-full">
              <TokenColumn title="New Pairs" tokens={sortTokens(newPairs)} />
              <TokenColumn
                title="Final Stretch"
                tokens={sortTokens(finalStretch)}
              />
              <TokenColumn title="Migrated" tokens={sortTokens(migrated)} />
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
                    tokens={sortTokens(newPairs)}
                    scrollClass="h-[calc(100vh-11rem)]"
                  />
                </TabsContent>
                <TabsContent
                  value="final"
                  className="flex-1 mt-0 overflow-hidden"
                >
                  <TokenColumn
                    title="Final Stretch"
                    tokens={sortTokens(finalStretch)}
                    scrollClass="h-[calc(100vh-11rem)]"
                  />
                </TabsContent>
                <TabsContent
                  value="migrated"
                  className="flex-1 mt-0 overflow-hidden"
                >
                  <TokenColumn
                    title="Migrated"
                    tokens={sortTokens(migrated)}
                    scrollClass="h-[calc(100vh-11rem)]"
                  />
                </TabsContent>
              </Tabs>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

// src/app/page.tsx
'use client';

import { TokenColumn } from '@/components/pulse/TokenColumn';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { PulseSkeleton } from '@/components/pulse/PulseSkeleton';
import { useAppSelector } from '@/lib/hooks';
import { useTokenSocket } from '@/lib/useTokenSocket'; // Import the engine

export default function Page() {
  // 1. Start the simulation engine
  useTokenSocket();

  // 2. Read the live data from Redux
  const { newPairs, finalStretch, migrated, isLoading } = useAppSelector(
    (state) => state.tokens
  );

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50 font-sans selection:bg-blue-500/30">
      <div className="mx-auto flex flex-col gap-4 px-2 py-2 md:px-4 md:py-3 h-screen overflow-hidden">
        <PulseHeader />

        {isLoading ? (
          <PulseSkeleton />
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-px border border-slate-800 bg-slate-800 overflow-hidden rounded-md h-full">
            {/* The gap-px + bg-slate-800 creates the thin borders between columns */}
            <TokenColumn title="New Pairs" tokens={newPairs} />
            <TokenColumn title="Final Stretch" tokens={finalStretch} />
            <TokenColumn title="Migrated" tokens={migrated} />
          </section>
        )}
      </div>
    </main>
  );
}
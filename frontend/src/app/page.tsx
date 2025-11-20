'use client';

import { TokenColumn } from '@/components/pulse/TokenColumn';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { PulseSkeleton } from '@/components/pulse/PulseSkeleton'; // New import
import { useAppSelector } from '@/lib/hooks';

export default function Page() {
  const { newPairs, finalStretch, migrated, isLoading } = useAppSelector(
    (state) => state.tokens
  );

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4 ">
        <PulseHeader />

        {isLoading ? (
          <PulseSkeleton />
        ) : (
          <section className="grid lg:grid-cols-3 border border-slate-800">
            <TokenColumn title="New Pairs" tokens={newPairs} />
            <TokenColumn title="Final Stretch" tokens={finalStretch} />
            <TokenColumn title="Migrated" tokens={migrated} />
          </section>
        )}
      </div>
    </main>
  );
}
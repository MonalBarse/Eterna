'use client';

import { TokenColumn } from '@/components/pulse/TokenColumn';
import { useTokensQuery } from '@/lib/useTokensQuery';
import { PulseHeader } from '@/components/pulse/PulseHeader';

function ColumnSkeleton() {
  return (
    <div className="flex flex-col bg-[#05060f]/95">
      <div className="h-11 border-b border-slate-800" />
      <div className="space-y-2 p-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-md border border-slate-800 bg-slate-900/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const { data, isLoading, isError } = useTokensQuery();

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4">
        <PulseHeader />

        <section className="grid gap-3 lg:grid-cols-3">
          {isLoading && (
            <>
              <ColumnSkeleton />
              <ColumnSkeleton />
              <ColumnSkeleton />
            </>
          )}

          {isError && (
            <div className="col-span-3 rounded-md border border-red-500/40 bg-red-950/20 p-4 text-sm text-red-200">
              Failed to load tokens. Please try again later.
            </div>
          )}

          {data && !isLoading && !isError && (
            <>
              <TokenColumn title="New Pairs" tokens={data.new} />
              <TokenColumn title="Final Stretch" tokens={data.final} />
              <TokenColumn title="Migrated" tokens={data.migrated} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

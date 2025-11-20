'use client';

import React from 'react';
import { MOCK_TOKENS } from '@/lib/tokens';
import { PulseHeader } from '@/components/pulse/PulseHeader';
import { TokenColumn } from '@/components/pulse/TokenColumn';

export default function Page() {
  const newPairs = MOCK_TOKENS.slice(0, 1);
  const finalStretch = MOCK_TOKENS.slice(1, 2);
  const migrated = MOCK_TOKENS.slice(2, 3);

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4">
        <PulseHeader />

        <section className="grid lg:grid-cols-3 border-1 border-slate-800">
          <TokenColumn title="New Pairs" tokens={newPairs} />
          <TokenColumn title="Final Stretch" tokens={finalStretch} />
          <TokenColumn title="Migrated" tokens={migrated} />
        </section>
      </div>
    </main>
  );
}

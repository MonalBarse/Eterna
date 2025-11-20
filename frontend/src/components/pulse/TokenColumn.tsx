'use client';
import React from 'react';
import { Token, MOCK_TOKENS } from '@/lib/tokens';
import { TokenCard } from '@/components/pulse/TokenCard';

const CUSTOM_SCROLLBAR_CLASSES = `
  [&::-webkit-scrollbar]:w-[4px]
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-700/60
  [&::-webkit-scrollbar-track]:bg-transparent
`;

const COLUMN_HEIGHT_CLASS =
  'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)]';

interface TokenColumnProps {
  title: string;
  tokens: Token[];
}

export function TokenColumn({ title, tokens }: TokenColumnProps) {
  return (
    <div className="flex flex-col bg-[#05060f]/95">
      {/* Column header */}
      <div className="flex items-center justify-between gap-2 border border-slate-800 px-4 py-2">
        <h2 className="text-sm font-semibold tracking-tight md:text-base">
          {title}
        </h2>

        <div className="flex items-center gap-4 text-[8px] px-2 py-1 border border-slate-800 rounded-4xl text-slate-400">
          <button className="text-[10px]">P1</button>
          <button className="text-[10px]">P2</button>
          <button className="text-[10px]">P3</button>
        </div>
      </div>

      {/* Scrollable body */}
      <div
        // className={`overflow-y-auto ${COLUMN_HEIGHT_CLASS} ${CUSTOM_SCROLLBAR_CLASSES}`}
        className={`overflow-y-auto ${COLUMN_HEIGHT_CLASS}`}
      >
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}

        {/* Fill with placeholders to mimic long list */}
        {Array.from({ length: 15 }).map((_, idx) => (
          <TokenCard
            key={`placeholder-${idx}`}
            token={MOCK_TOKENS[idx % MOCK_TOKENS.length]}
          />
        ))}
      </div>
    </div>
  );
}

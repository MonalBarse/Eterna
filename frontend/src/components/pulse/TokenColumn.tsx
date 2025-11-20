'use client';
import React from 'react';
import { Token, MOCK_TOKENS } from '@/lib/tokens';
import { TokenCard } from '@/components/pulse/TokenCard';
import { Zap, Menu, SlidersHorizontal } from 'lucide-react';

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
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-100 md:text-base">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          {/* Group 1: Zap & Menu */}
          <div className="flex items-center rounded-md border border-slate-800 bg-slate-900/50 p-[2px]">
            <button className="flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
              <Zap className="h-3 w-3" />
              <span className="font-medium">0</span>
            </button>
            <div className="mx-[1px] h-3 w-[1px] bg-slate-800"></div>
            <button className="flex items-center rounded-sm px-2 py-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
              <Menu className="h-3 w-3" />
            </button>
          </div>

          {/* Group 2: P1 P2 P3 */}
          <div className="flex items-center rounded-md border border-slate-800 bg-slate-900/50 p-[2px]">
            <button className="rounded-sm px-2 py-1 text-[10px] font-medium text-blue-400 transition-colors hover:bg-slate-800">
              P1
            </button>
            <button className="rounded-sm px-2 py-1 text-[10px] font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
              P2
            </button>
            <button className="rounded-sm px-2 py-1 text-[10px] font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
              P3
            </button>
          </div>

          {/* Sliders Icon */}
          <button className="ml-1 text-slate-400 transition-colors hover:text-white">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div
        className={`overflow-y-auto ${COLUMN_HEIGHT_CLASS} scroll-fade`}
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
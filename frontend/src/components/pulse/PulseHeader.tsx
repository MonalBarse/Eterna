'use client';

import React from 'react';
import { TrendingUp, Search, Trophy } from 'lucide-react';

export function PulseHeader() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-black tracking-tight text-white">Pulse</h1>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[11px] font-semibold">
          SOL
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[11px] font-semibold">
          Display ▾
        </span>
        <TrendingUp className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Search className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Trophy className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
      </div>
    </header>
  );
}

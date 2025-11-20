'use client';

import React from 'react';
import { TrendingUp, Search, Trophy, ArrowUpDown } from 'lucide-react';

interface PulseHeaderProps {
  currentSort: 'mc' | 'vol' | 'change1m';
  onSortChange: (sort: 'mc' | 'vol' | 'change1m') => void;
}

export function PulseHeader({ currentSort, onSortChange }: PulseHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[#05060a] pb-2">
      <div className="flex items-center gap-2">
         <h1 className="text-2xl font-black tracking-tight text-white">Pulse</h1>
         <div className="ml-4 flex gap-1">
            {/* Sorting Buttons */}
            <button
              onClick={() => onSortChange('mc')}
              className={`px-2 py-1 text-[10px] rounded border ${currentSort === 'mc' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-slate-800 text-slate-400'}`}
            >
               MC
            </button>
            <button
               onClick={() => onSortChange('vol')}
               className={`px-2 py-1 text-[10px] rounded border ${currentSort === 'vol' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-slate-800 text-slate-400'}`}
            >
               VOL
            </button>
         </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="hidden md:inline-flex rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[11px] font-semibold">
          SOL
        </span>

        {/* Requirement: Popover/Variety - Implementing a simple HTML select for speed if Popover component is missing, or use custom dropdown */}
        <div className="relative group">
            <button className="rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[11px] font-semibold hover:bg-slate-800">
            Display ▾
            </button>
            {/* Simple CSS Dropdown (Popover equivalent) */}
            <div className="absolute right-0 top-full mt-2 w-32 hidden group-hover:block bg-slate-900 border border-slate-800 rounded shadow-xl z-50 p-1">
                <div className="px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-800 cursor-pointer rounded">Compact</div>
                <div className="px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-800 cursor-pointer rounded">Detailed</div>
            </div>
        </div>

        <TrendingUp className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Search className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Trophy className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
      </div>
    </header>
  );
}
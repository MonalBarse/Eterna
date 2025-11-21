'use client';

import React from 'react';
import { TrendingUp, Search, Trophy } from 'lucide-react';

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
            title="Sort by 1M Change"
            type='button'
            onClick={() => onSortChange('mc')}
            className={`px-2 py-1 text-[10px] rounded border ${
              currentSort === 'mc'
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 25"
            >
              <path
                fill="#ffffff"
                d="M16.886 9.468a.47.47 0 0 1-.313.124H5.584c-.39 0-.587-.446-.317-.707l1.805-1.74a.46.46 0 0 1 .312-.129h11.032c.394 0 .587.45.313.712zm0 8.576a.47.47 0 0 1-.313.12H5.584c-.39 0-.587-.442-.317-.703l1.805-1.745a.45.45 0 0 1 .312-.124h11.032c.394 0 .587.446.313.707zm0-6.618a.47.47 0 0 0-.313-.12H5.584c-.39 0-.587.442-.317.703l1.805 1.745a.47.47 0 0 0 .312.124h11.032c.394 0 .587-.446.313-.707z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => onSortChange('vol')}
            className={`px-2 py-1 text-[10px] rounded border ${
              currentSort === 'vol'
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              viewBox="0 0 32 32"
            >
              <g fill="none">
                <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
                <path
                  fill="#FFF"
                  d="M12.116 14.404L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144l2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886l2.26 2.259L16 26l-6.144-6.144l-.003-.003l2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29l-.004-.004l.004-.003l.401-.402l.195-.195L16 13.706l2.293 2.293z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="hidden md:inline-flex rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-[11px] font-semibold">
          SOL
        </span>

        {/* Requirement: Popover/Variety - Implementing a simple HTML select for speed if Popover component is missing, or use custom dropdown */}
        <div className="relative group">
          <button
            type="button"
            title="display"
            className="rounded-full border border-slate-700 bg-slate-900/50 px-2 py-1 text-[11px] font-semibold hover:bg-slate-800"
          >
            Display ▾
          </button>
          {/* Simple CSS Dropdown (Popover equivalent) */}
          <div className="absolute right-0 top-full mt-2 w-32 hidden group-hover:block bg-slate-900 border border-slate-800 rounded shadow-xl z-50 p-1">
            <div className="px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-800 cursor-pointer rounded">
              Compact
            </div>
            <div className="px-2 py-1 text-[10px] text-slate-400 hover:bg-slate-800 cursor-pointer rounded">
              Detailed
            </div>
          </div>
        </div>

        <TrendingUp className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Search className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
        <Trophy className="h-4 w-4 cursor-pointer text-slate-400 transition-colors hover:text-white" />
      </div>
    </header>
  );
}

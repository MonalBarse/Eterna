'use client';

import React from 'react';
import { TrendingUp, Search, Trophy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PulseHeaderProps {
  currentSort: 'mc' | 'vol' | 'change1m';
  onSortChange: (sort: 'mc' | 'vol' | 'change1m') => void;
  chain: 'SOL' | 'BNB';
  onChainChange: (chain: 'SOL' | 'BNB') => void;
}

export function PulseHeader({
  currentSort,
  onSortChange,
  chain,
  onChainChange,
}: PulseHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[#05060a] pb-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black tracking-tight text-white">Pulse</h1>
        {/* Chain selector using Solana/BNB icons */}
        <div
          className="ml-4 flex gap-1"
          aria-label="Select chain"
        >
          <button
            aria-label="View Solana pairs"
            type="button"
            aria-pressed={chain === 'SOL'}
            onClick={() => onChainChange('SOL')}
            className={`px-2 py-1 text-[10px] rounded border transition-colors ${
              chain === 'SOL'
                ? 'bg-slate-800 text-slate-900 border-slate-500'
                : 'border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* solana svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 25"
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M16.886 9.468a.47.47 0 0 1-.313.124H5.584c-.39 0-.587-.446-.317-.707l1.805-1.74a.46.46 0 0 1 .312-.129h11.032c.394 0 .587.45.313.712zm0 8.576a.47.47 0 0 1-.313.12H5.584c-.39 0-.587-.442-.317-.703l1.805-1.745a.45.45 0 0 1 .312-.124h11.032c.394 0 .587.446.313.707zm0-6.618a.47.47 0 0 0-.313-.12H5.584c-.39 0-.587.442-.317.703l1.805 1.745a.47.47 0 0 0 .312.124h11.032c.394 0 .587-.446.313-.707z"
              ></path>
            </svg>
          </button>
          <button
            aria-label="View BNB pairs"
            type="button"
            aria-pressed={chain === 'BNB'}
            onClick={() => onChainChange('BNB')}
            className={`px-2 py-1 text-[10px] rounded border transition-colors ${
              chain === 'BNB'
                ? 'bg-slate-800 text-slate-900 border-slate-500'
                : 'border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* bnb svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              viewBox="0 0 32 32"
              aria-hidden="true"
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
        {/* Sort toggle */}
        <div
          className="hidden md:inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 text-[11px] font-semibold overflow-hidden"
          aria-label="Sort tokens"
        >
          <button
            type="button"
            aria-pressed={currentSort === 'mc'}
            onClick={() => onSortChange('mc')}
            className={`px-3 py-1 transition-colors ${
              currentSort === 'mc'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MC
          </button>
          <button
            type="button"
            aria-pressed={currentSort === 'vol'}
            onClick={() => onSortChange('vol')}
            className={`px-3 py-1 transition-colors ${
              currentSort === 'vol'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vol
          </button>
        </div>

        {/* Display popover (shadcn/Radix) */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Change display density"
              className="rounded-full border border-slate-700 bg-slate-900/50 px-2 py-1 text-[11px] font-semibold hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Display ▾
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-slate-900 border-slate-800 text-slate-300 w-36 p-1">
            <button
              type="button"
              className="w-full rounded px-2 py-1 text-left text-[10px] text-slate-300 hover:bg-slate-800"
            >
              Compact
            </button>
            <button
              type="button"
              className="mt-0.5 w-full rounded px-2 py-1 text-left text-[10px] text-slate-300 hover:bg-slate-800"
            >
              Detailed
            </button>
          </PopoverContent>
        </Popover>

        {/* Header icon tooltips */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="View trending tokens"
              className="text-slate-400 hover:text-white"
            >
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Trending tokens</p>
            <p className="text-[10px] text-slate-300/80">
              Highlight high-momentum pairs.
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Search tokens"
              className="text-slate-400 hover:text-white"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Search</p>
            <p className="text-[10px] text-slate-300/80">
              Quickly look up any token.
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Open leaderboard"
              className="text-slate-400 hover:text-white"
            >
              <Trophy className="h-4 w-4" aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Leaderboard</p>
            <p className="text-[10px] text-slate-300/80">
              View top-performing tokens.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

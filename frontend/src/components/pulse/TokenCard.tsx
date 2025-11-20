'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clipboard,
  Search,
  Users,
  Trophy,
  Crown,
  Target,
  Minus,
  Atom,
  Zap,
  Pencil,
} from 'lucide-react';
import type { Token } from '@/lib/tokens';

// Top small icon + value
function IconTextBadge({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-slate-400">
      <Icon className="h-3 w-3" />
      {value && <span className="text-slate-50 font-medium">{value}</span>}
    </div>
  );
}

// Percentage pill
function PercentagePill({
  value,
  isPositive,
  icon: Icon,
}: {
  value: string;
  isPositive: boolean;
  icon: React.ElementType;
}) {
  const colorClass = isPositive
    ? 'border-emerald-500/40 bg-emerald-900/20 text-emerald-300'
    : 'border-red-500/40 bg-red-900/20 text-red-300';

  return (
    <div
      className={`flex items-center rounded-full px-2 py-[1px] text-[10px] leading-none border ${colorClass}`}
    >
      <Icon className="mr-1 h-3 w-3" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function TokenCard({ token }: { token: Token }) {
  const mcColor = token.color === 'green' ? 'text-emerald-400' : 'text-red-400';
  const priceColor =
    token.color === 'green' ? 'text-emerald-300' : 'text-red-300';
  const txColor = token.color === 'green' ? 'bg-emerald-500' : 'bg-red-500';

  const mockMetrics = [
    { value: '5%', isPositive: true, icon: TrendingUp },
    { value: '2%', isPositive: true, icon: Target },
    { value: '5%', isPositive: false, icon: Target },
    { value: '0%', isPositive: true, icon: Minus },
    { value: '0%', isPositive: true, icon: Atom },
  ];

  const iconBarData = [
    { icon: DollarSign, value: '$' },
    { icon: Clipboard, value: '$' },
    { icon: Search, value: '' },
    { icon: Users, value: '7' },
    { icon: Trophy, value: '0' },
    { icon: Crown, value: '0' },
    { icon: Minus, value: token.progress },
  ];

  return (
    <div className="flex items-start justify-between border border-slate-800 bg-[#090a12] px-3 py-2.5 text-xs transition-colors hover:bg-slate-900/40">
      {/* Left logo + address */}
      <div className="flex w-20 flex-col items-center gap-1 pr-3">
        <div
          className={`relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-sm border border-slate-700 ${token.imgColor}`}
        >
          <DollarSign className="h-8 w-8 text-white" />
          <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
            <Pencil className="h-2.5 w-2.5 text-slate-400" />
          </div>
        </div>
        <span className="w-full truncate text-[9px] text-slate-500 text-center">
          {token.address}
        </span>
      </div>

      {/* Middle: title + metrics */}
      <div className="flex flex-1 flex-col pt-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="max-w-[150px] truncate text-[13px] font-semibold leading-none text-white">
                {token.name}
              </span>
              <span className="max-w-[120px] truncate text-[11px] leading-none text-slate-400">
                {token.ticker}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          <span className="shrink-0 text-[10px] font-semibold text-emerald-400">
            5s
          </span>
          {iconBarData.map((data, idx) => (
            <IconTextBadge key={idx} icon={data.icon} value={data.value} />
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {mockMetrics.map((metric, idx) => (
            <PercentagePill key={idx} {...metric} />
          ))}
        </div>
      </div>

      {/* Right: MC/Volume/Price + button */}
      <div className="flex h-full min-w-[120px] flex-col items-end justify-between text-right">
        <div className="flex flex-col">
          <div className={`text-md font-extrabold leading-none ${mcColor}`}>
            <span className="text-gray-500 font-light">MC</span> ${token.mc}
          </div>

          <div className={`text-md font-extrabold leading-none ${priceColor}`}>
            <span className="text-gray-500 font-light">V</span> ${token.vol}
          </div>

          <div className="mt-2 flex items-center text-[9px] text-slate-400">
            <span className="mr-1 font-semibold text-white">F</span>
            <span className={`text-[9px] ${priceColor}`}>
              {token.price.toFixed(3)}
            </span>
            <span className="ml-2 text-slate-500">TX</span>
            <span className="ml-1 font-semibold text-white">{token.tx}</span>
            <div className={`ml-1 h-1 w-4 rounded-full ${txColor}`} />
          </div>
        </div>

        <button className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-[#6366f1] px-2 py-1 text-[11px] font-extrabold text-black shadow-lg transition-colors hover:bg-[#7c3aed]">
          <Zap className="h-3.5 w-3.5" />0 SOL
        </button>
      </div>
    </div>
  );
}

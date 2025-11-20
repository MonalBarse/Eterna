'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  TrendingUp, Target, Minus, Atom, Zap, DollarSign, Clipboard, Search, Users, Trophy, Crown
} from 'lucide-react';
import type { Token } from '@/lib/tokens';
// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// ... keep IconTextBadge and PercentagePill helper functions as they are ...
// (Re-paste them here if you are copy-pasting the whole file, otherwise just keep them)
function IconTextBadge({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-slate-400">
      <Icon className="h-3 w-3" />
      {value && <span className="text-slate-50 font-medium">{value}</span>}
    </div>
  );
}

function PercentagePill({ value, isPositive, icon: Icon }: { value: string; isPositive: boolean; icon: React.ElementType }) {
  const colorClass = isPositive
    ? 'border-emerald-500/40 bg-emerald-900/20 text-emerald-300'
    : 'border-red-500/40 bg-red-900/20 text-red-300';
  return (
    <div className={`flex items-center rounded-full px-2 py-[1px] text-[10px] leading-none border ${colorClass}`}>
      <Icon className="mr-1 h-3 w-3" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function TokenCard({ token }: { token: Token }) {
  // --- FLASH EFFECT LOGIC ---
  const [flashClass, setFlashClass] = useState('');
  const prevPrice = useRef(token.price);

  useEffect(() => {
    if (token.price > prevPrice.current) {
      setFlashClass('bg-emerald-500/10 duration-75');
      setTimeout(() => setFlashClass('duration-1000'), 200);
    } else if (token.price < prevPrice.current) {
      setFlashClass('bg-red-500/10 duration-75');
      setTimeout(() => setFlashClass('duration-1000'), 200);
    }
    prevPrice.current = token.price;
  }, [token.price]);

  // Existing styling logic
  const mcColor = token.change1m >= 0 ? 'text-emerald-400' : 'text-red-400';
  const priceColor = token.change1m >= 0 ? 'text-emerald-300' : 'text-red-300';
  const txColor = token.change1m >= 0 ? 'bg-emerald-500' : 'bg-red-500';

  // Mock Icon data
  const iconBarData = [
    { icon: DollarSign, value: '$' },
    { icon: Clipboard, value: '$' },
    { icon: Search, value: '' },
    { icon: Users, value: String(token.holders) },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex cursor-pointer items-start justify-between border-b border-slate-800 bg-[#090a12] px-3 py-2.5 text-xs transition-colors hover:bg-slate-800 ${flashClass}`}
        >
          {/* Left logo + address */}
          <div className="flex w-20 flex-col items-center gap-1 pr-3">
             {/* Use imgUrl if available, or fallback */}
            <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 overflow-hidden">
               <span className="text-xs font-bold text-slate-600">IMG</span>
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
              {iconBarData.map((data, idx) => (
                <IconTextBadge key={idx} icon={data.icon} value={data.value} />
              ))}
            </div>

             {/* Micro-metrics Pills */}
            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
               <PercentagePill value={`${token.change1m.toFixed(1)}%`} isPositive={token.change1m > 0} icon={TrendingUp} />
               <PercentagePill value={`${token.buyPressure.toFixed(0)}%`} isPositive={token.buyPressure > 50} icon={Target} />
            </div>
          </div>

          {/* Right: MC/Volume/Price + button */}
          <div className="flex h-full min-w-[120px] flex-col items-end justify-between text-right">
            <div className="flex flex-col">
              <div className={`text-md font-extrabold leading-none ${mcColor}`}>
                <span className="text-gray-500 font-light mr-1">MC</span>
                ${token.mc.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>

              <div className={`text-md mt-1 font-extrabold leading-none text-slate-300`}>
                <span className="text-gray-500 font-light mr-1">V</span>
                ${token.vol.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>

              <div className="mt-2 flex items-center justify-end text-[9px] text-slate-400">
                <span className={`text-[10px] font-mono ${priceColor} mr-2`}>
                  ${token.price.toFixed(6)}
                </span>
                <span className="text-slate-500 mr-1">TX</span>
                <span className="font-semibold text-white">{token.txCount}</span>
                <div className={`ml-1 h-1.5 w-1.5 rounded-full ${txColor}`} />
              </div>
            </div>

            <button className="mt-2 flex items-center justify-center gap-1 rounded-md bg-[#6366f1] px-3 py-1.5 text-[10px] font-bold text-white shadow-lg transition-colors hover:bg-[#4f46e5]">
              <Zap className="h-3 w-3 fill-white" /> QUICK BUY
            </button>
          </div>
        </div>
      </DialogTrigger>

      {/* MODAL CONTENT (Requirement: Modal) */}
      <DialogContent className="bg-[#090a12] border-slate-800 text-slate-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {token.name} <span className="text-slate-500 text-sm">({token.ticker})</span>
          </DialogTitle>
          <DialogDescription>
             Contract Address: <span className="font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">{token.address}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
           <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <div className="text-xs text-slate-400">Market Cap</div>
              <div className="text-xl font-bold text-emerald-400">${token.mc.toLocaleString()}</div>
           </div>
           <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <div className="text-xs text-slate-400">Transactions</div>
              <div className="text-xl font-bold text-white">{token.txCount}</div>
           </div>
        </div>
        <div className="w-full h-32 bg-slate-900/50 rounded flex items-center justify-center text-slate-500 text-sm border border-slate-800 border-dashed">
            Chart Visualization Placeholder
        </div>
      </DialogContent>
    </Dialog>
  );
}
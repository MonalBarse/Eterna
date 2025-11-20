'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  Clipboard,
  Search,
  Users,
} from 'lucide-react';
import type { Token } from '@/lib/tokens';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// --- HELPERS ---

// 1. Zero-load deterministic color generator
const generateGradient = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c1 = `hsl(${hash % 360}, 70%, 50%)`;
  const c2 = `hsl(${(hash + 40) % 360}, 70%, 40%)`;
  return `linear-gradient(135deg, ${c1}, ${c2})`;
};

// 2. Time formatter (Matches screenshot: 1s, 58m, 9h)
function formatTimeAgo(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function IconTextBadge({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-slate-400/80">
      <Icon className="h-3 w-3" />
      {value && <span className="text-slate-400 font-medium">{value}</span>}
    </div>
  );
}

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
    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    : 'border-red-500/30 bg-red-500/10 text-red-400';
  return (
    <div
      className={`flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium leading-none border ${colorClass}`}
    >
      <Icon className="mr-1 h-2.5 w-2.5" />
      <span>{value}</span>
    </div>
  );
}

// --- COMPONENT ---

function TokenCardComponent({ token }: { token: Token }) {
  // Flash Effect State
  const [flashClass, setFlashClass] = useState('');
  const prevPrice = useRef(token.price);

  // Trigger flash on price change
  useEffect(() => {
    if (token.price > prevPrice.current) {
      setFlashClass('bg-emerald-500/5 transition-none');
      setTimeout(() => setFlashClass('transition-all duration-700'), 50);
    } else if (token.price < prevPrice.current) {
      setFlashClass('bg-red-500/5 transition-none');
      setTimeout(() => setFlashClass('transition-all duration-700'), 50);
    }
    prevPrice.current = token.price;
  }, [token.price]);

  // Dynamic Styling
  const mcColor = token.change1m >= 0 ? 'text-emerald-400' : 'text-red-400';
  const priceColor = token.change1m >= 0 ? 'text-emerald-400' : 'text-red-400';
  const txColor = token.change1m >= 0 ? 'bg-emerald-500' : 'bg-red-500';

  const iconBarData = [
    { icon: DollarSign, value: '' }, // Placeholder for "Bonding curve" icon
    { icon: Search, value: '' },
    { icon: Users, value: String(token.holders) },
    { icon: Clipboard, value: '0' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`group flex cursor-pointer items-start justify-between border-b border-slate-800/60 bg-[#090a12] px-3 py-3 text-xs hover:bg-slate-800/50 ${flashClass}`}
        >
          {/* Left: Avatar + Address */}
          <div className="flex w-[72px] flex-col items-center gap-2 pr-3">
            <div
              className="relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-md shadow-inner overflow-hidden border border-slate-700/50"
              style={{ background: generateGradient(token.id) }}
            >
              {/* Placeholder text inside avatar if no image */}
              <span className="text-lg font-bold text-white/40 mix-blend-overlay">
                {token.ticker[0]}
              </span>
            </div>

            {/* Tooltip for Address */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full truncate text-[9px] font-mono text-slate-500 text-center group-hover:text-slate-300 transition-colors">
                  {token.address}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300 text-[10px]">
                <p>{token.address}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Middle: Info & Metrics */}
          <div className="flex flex-1 flex-col pt-0.5 min-w-0">
            {/* Row 1: Name & Ticker */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="truncate text-[13px] font-bold text-slate-200 hover:text-blue-400 transition-colors">
                {token.name}
              </span>
              <span className="truncate text-[11px] font-medium text-slate-500">
                {token.ticker}
              </span>
              <Clipboard className="h-3 w-3 text-slate-600 cursor-pointer hover:text-slate-400" />
            </div>

            {/* Row 2: Time (Green) + Icons */}
            <div className="flex items-center gap-3 mb-2">
              {/* THE TIME INDICATOR (Requirement: Green) */}
              <span className="text-[11px] font-bold text-emerald-400 min-w-[20px]">
                {formatTimeAgo(token.createdAgo)}
              </span>

              <div className="flex items-center gap-2.5 border-l border-slate-800 pl-3">
                {iconBarData.map((data, idx) => (
                  <IconTextBadge
                    key={idx}
                    icon={data.icon}
                    value={data.value}
                  />
                ))}
              </div>
            </div>

            {/* Row 3: Pills (Percentages) */}
            <div className="flex flex-wrap gap-1.5">
              <PercentagePill
                value={`${token.change1m.toFixed(0)}%`}
                isPositive={token.change1m > 0}
                icon={TrendingUp}
              />
              <PercentagePill
                value={`${token.buyPressure.toFixed(0)}%`}
                isPositive={token.buyPressure > 50}
                icon={Target}
              />
              <PercentagePill
                value="0%"
                isPositive={false}
                icon={Target} // Placeholder for other metrics
              />
            </div>
          </div>

          {/* Right: Financials + Action */}
          <div className="flex h-full min-w-[100px] flex-col items-end justify-between pl-2">
            <div className="flex flex-col items-end gap-0.5">
              <div className={`text-[16px] font-light tabular-nums ${mcColor}`}>
                <span className="text-[12px] text-slate-500 font-medium mr-1">
                  MC
                </span>
                $
                {token.mc.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>

              <div className="text-[12px] font-semibold text-slate-400 tabular-nums">
                <span className="text-[9px] text-slate-600 font-medium mr-1">
                  V
                </span>
                $
                {token.vol.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                <span className={`font-mono ${priceColor}`}>
                  ${token.price.toFixed(5)}
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-[9px]">TX</span>
                  <span className="text-slate-300 font-medium">
                    {token.txCount}
                  </span>
                </div>
                <div
                  className={`h-1.5 w-1.5 rounded-full ${txColor} animate-pulse`}
                />
              </div>
            </div>

            <button className=" flex mt-1 items-center justify-center gap-1.5 rounded bg-[#5c5e9e] hover:bg-[#4f5191] text-white px-2 py-1.5 text-[10px] font-bold transition-all shadow-lg hover:shadow-xl">
              <Zap className="h-3 w-3 fill-white" />0 SOL
            </button>
          </div>
        </div>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="bg-[#0a0b14] border-slate-800 text-slate-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {token.name}{' '}
            <span className="text-slate-500 text-base font-normal">
              ({token.ticker})
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded select-all">
              {token.address}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 my-2">
          <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50">
            <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
              Market Cap
            </div>
            <div className="text-lg font-mono font-light text-emerald-400">
              ${token.mc.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50">
            <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
              Volume
            </div>
            <div className="text-lg font-mono font-bold text-slate-200">
              ${token.vol.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center h-32 bg-gradient-to-b from-slate-900/20 to-slate-900/50 border border-slate-800 border-dashed rounded-lg text-slate-600 text-sm">
          <span>Chart Data Unavailable</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- OPTIMIZATION ---
// This is critical for "Performance: <100ms interactions"
// We MUST include createdAgo in the comparison so the timer updates.
export const TokenCard = React.memo(TokenCardComponent, (prev, next) => {
  return (
    prev.token.price === next.token.price &&
    prev.token.vol === next.token.vol &&
    prev.token.change1m === next.token.change1m &&
    prev.token.txCount === next.token.txCount &&
    prev.token.createdAgo === next.token.createdAgo // <--- FIX: Ensure time updates trigger re-render
  );
});

// // src/components/pulse/TokenCard.tsx
// 'use client';

// import React from 'react';
// import {
//   Globe,
//   Twitter,
//   MessageCircle,
//   ShieldCheck,
//   Zap,
//   Rocket,
//   Flame,
// } from 'lucide-react';
// import type { Token } from '@/lib/tokens';
// import { cn } from '@/lib/utils';

// // Helper to format large numbers (e.g. 1500 -> 1.5k)
// const formatMetric = (num: number) => {
//   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
//   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
//   return num.toFixed(0);
// };

// // Helper to format time age (e.g. 45s, 2m)
// const formatAge = (seconds: number) => {
//   if (seconds < 60) return `${seconds}s`;
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
//   return `${Math.floor(seconds / 3600)}h`;
// };

// // Helper for Age Color Logic
// const getAgeColor = (seconds: number) => {
//   if (seconds < 30) return 'text-emerald-400 animate-pulse'; // Super fresh
//   if (seconds < 300) return 'text-emerald-500';
//   return 'text-slate-500';
// };

// export function TokenCard({ token }: { token: Token }) {
//   // Safe check in case data isn't fully initialized yet
//   if (!token) return null;

//   return (
//     <div className="group relative flex items-stretch justify-between border-b border-slate-800/50 bg-[#090a12] px-3 py-3 transition-all hover:bg-[#13141f]">

//       {/* Hot Streak Glow Effect */}
//       {token.isHot && (
//         <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
//       )}

//       {/* --- LEFT: Image & Address --- */}
//       <div className="flex w-[4.5rem] flex-col items-center gap-2 mr-3 shrink-0">
//         <div className="relative h-14 w-14 overflow-hidden rounded-md border border-slate-800 bg-slate-900 shadow-sm group-hover:border-slate-600 transition-colors">
//            {/* Placeholder for actual Image */}
//            <img
//              src={token.imgUrl}
//              alt={token.ticker}
//              className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
//              onError={(e) => {
//                // Fallback if image fails
//                (e.target as HTMLImageElement).src = 'https://placehold.co/60x60/1e293b/cbd5e1?text=$';
//              }}
//            />
//            {token.isHot && (
//              <div className="absolute bottom-0 right-0 bg-orange-600 p-[1px] rounded-tl-md">
//                <Flame className="h-3 w-3 text-white fill-white" />
//              </div>
//            )}
//         </div>
//         <span className="w-full truncate text-center text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
//           {token.address}
//         </span>
//       </div>

//       {/* --- MIDDLE: Info & Badges --- */}
//       <div className="flex flex-1 flex-col justify-between py-0.5 min-w-0 pr-2">
//         {/* Header: Ticker + Name */}
//         <div>
//           <div className="flex items-baseline gap-2">
//             <span className="truncate text-sm font-bold text-slate-100 group-hover:text-white">
//               {token.ticker}
//             </span>
//             <span className="truncate text-xs text-slate-500">
//               {token.name}
//             </span>
//           </div>

//           {/* Row 2: Age + Icons + Holders */}
//           <div className="mt-1 flex items-center gap-3 text-[10px]">
//             <span className={cn("font-bold min-w-[20px]", getAgeColor(token.createdAgo))}>
//               {formatAge(token.createdAgo)}
//             </span>

//             <div className="flex gap-1.5 text-slate-500">
//               <Globe className="h-3 w-3 hover:text-blue-400 cursor-pointer" />
//               <Twitter className="h-3 w-3 hover:text-sky-400 cursor-pointer" />
//               <MessageCircle className="h-3 w-3 hover:text-indigo-400 cursor-pointer" />
//             </div>

//             <div className="flex items-center gap-1 text-slate-400">
//               <ShieldCheck className="h-3 w-3 text-slate-600" />
//               <span>{formatMetric(token.holders)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Row 3: Badges & Progress Pills */}
//         <div className="flex flex-wrap gap-1.5 mt-2">
//           {token.badges.includes('DS') && (
//             <span className="px-1.5 py-0.5 rounded-[3px] bg-slate-800 border border-slate-700 text-[9px] font-medium text-blue-400 shadow-sm">
//               DS
//             </span>
//           )}
//           {/* Buy Pressure Pill */}
//           <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[3px] bg-emerald-950/30 border border-emerald-900/50">
//              <div className="h-1 w-6 bg-slate-800 rounded-full overflow-hidden">
//                <div
//                  className="h-full bg-emerald-500 transition-all duration-500"
//                  style={{ width: `${token.buyPressure}%` }}
//                />
//              </div>
//              <span className="text-[9px] font-semibold text-emerald-400">
//                {token.buyPressure.toFixed(0)}%
//              </span>
//           </div>
//         </div>
//       </div>

//       {/* --- RIGHT: Market Stats --- */}
//       <div className="flex flex-col items-end justify-between py-0.5 min-w-[90px]">

//         {/* Market Cap */}
//         <div className="text-right">
//           <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">MC</div>
//           <div className={cn(
//             "text-sm font-bold tracking-tight",
//             token.mc > 100000 ? "text-blue-400" : "text-emerald-400"
//           )}>
//             ${formatMetric(token.mc)}
//           </div>
//         </div>

//         {/* Volume & Price */}
//         <div className="text-right mt-1">
//           <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400">
//              <span className="text-slate-600">V</span>
//              <span className="text-slate-200">${formatMetric(token.vol)}</span>
//           </div>
//           <div className="flex items-center justify-end gap-2 text-[10px] mt-0.5">
//              <span className={cn(
//                "font-mono transition-colors duration-300",
//                token.change1m > 0 ? "text-emerald-500" : "text-red-500"
//              )}>
//                {token.txCount} TX
//              </span>
//           </div>
//         </div>

//         {/* Quick Buy Button */}
//         <button className="mt-auto flex w-full items-center justify-center gap-1 rounded bg-indigo-600 hover:bg-indigo-500 py-1 text-[10px] font-bold text-white transition-colors shadow-lg shadow-indigo-900/20">
//           <Zap className="h-3 w-3 fill-white" />
//           <span>0 SOL</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/pulse/TokenCard.tsx
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
  Clock,
  Flame,
} from 'lucide-react';
import type { Token } from '@/lib/tokens';
import { cn } from '@/lib/utils';

// --- Helpers ---
const formatAge = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
};

const formatMetric = (num: number) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toFixed(0);
};

// Top small icon + value
function IconTextBadge({
  icon: Icon,
  value,
  className,
}: {
  icon: React.ElementType;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 text-[10px] text-slate-400',
        className
      )}
    >
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
  filled = false, // New prop for progress bar effect
}: {
  value: string;
  isPositive: boolean;
  icon: React.ElementType;
  filled?: boolean;
}) {
  const colorClass = isPositive
    ? 'border-emerald-500/40 bg-emerald-900/20 text-emerald-300'
    : 'border-red-500/40 bg-red-900/20 text-red-300';

  // Specialized style for "filled" pills (Buy Pressure / Bonding)
  const filledClass = filled
    ? 'border-emerald-500/50 bg-emerald-900/60 text-emerald-100'
    : colorClass;

  return (
    <div
      className={cn(
        'flex items-center rounded-full px-2 py-[1px] text-[10px] leading-none border transition-all duration-500',
        filledClass
      )}
    >
      <Icon className="mr-1 h-3 w-3" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function TokenCard({ token }: { token: Token }) {
  // Determine main color theme based on 1m performance
  const isPositive = token.change1m >= 0;
  const mcColor = isPositive ? 'text-emerald-400' : 'text-red-400';
  const priceColor = isPositive ? 'text-emerald-300' : 'text-red-300';
  const txColor = isPositive ? 'bg-emerald-500' : 'bg-red-500';
  const ageColor =
    token.createdAgo < 60 ? 'text-emerald-400 animate-pulse' : 'text-slate-500';

  return (
    <div className="group flex items-start justify-between border border-slate-800 bg-[#090a12] px-3 py-2.5 text-xs transition-colors hover:bg-slate-900/40">
      {/* Left logo + address */}
      <div className="flex w-25 flex-col items-center gap-1">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-slate-700 bg-slate-800 overflow-hidden">
          {/* Image with fallback to DollarSign */}
          {token.imgUrl ? (
            <img
              src={token.imgUrl}
              alt={token.ticker}
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ) : (
            <DollarSign className="h-5 w-5 text-slate-500" />
          )}

          {/* Fallback icon if img fails or generic */}
          <DollarSign className="absolute h-5 w-5 text-slate-500 hidden peer-placeholder-shown:block" />

          {token.isHot && (
            <div className="absolute bottom-0 right-0 bg-orange-500 p-[1px]">
              <Flame className="h-2 w-2 text-white" />
            </div>
          )}
        </div>
        <span className="w-full truncate text-[9px] text-slate-500 text-center font-mono">
          {token.address}
        </span>
      </div>

      {/* Middle: title + metrics */}
      <div className="flex flex-1 flex-col pt-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="max-w-[120px] truncate text-[13px] font-semibold leading-none text-white">
                {token.name}
              </span>
              <span className="truncate text-[11px] leading-none text-slate-400">
                {token.ticker}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Age + Icons */}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <span
            className={cn(
              'shrink-0 text-[10px] font-semibold transition-colors',
              ageColor
            )}
          >
            {formatAge(token.createdAgo)}
          </span>

          <IconTextBadge icon={Users} value={formatMetric(token.holders)} />
          {/* Only show trophy if it has badges */}
          {token.badges.length > 0 && (
            <IconTextBadge
              icon={Trophy}
              value={token.badges[0].replace('Bonding: ', '')}
              className="text-blue-400"
            />
          )}
        </div>

        {/* Row 3: Metrics Pills */}
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {/* 1m Change */}
          <PercentagePill
            value={`${token.change1m.toFixed(0)}%`}
            isPositive={token.change1m >= 0}
            icon={token.change1m >= 0 ? TrendingUp : TrendingDown}
          />

          {/* Buy Pressure (The "Progress Bar" equivalent) */}
          <PercentagePill
            value={`BP: ${token.buyPressure.toFixed(0)}%`}
            isPositive={true}
            icon={Atom}
            filled={true}
          />
        </div>
      </div>

      {/* Right: MC/Volume/Price + button */}
      <div className="flex h-full min-w-[110px] flex-col items-end justify-between text-right pl-2">
        <div className="flex flex-col">
          <div
            className={cn(
              'text-sm font-extrabold leading-none transition-colors duration-300',
              mcColor
            )}
          >
            <span className="text-slate-600 font-light text-[10px] mr-1">
              MC
            </span>
            ${formatMetric(token.mc)}
          </div>

          <div className="text-[11px] font-bold leading-none text-slate-300 mt-1">
            <span className="text-slate-600 font-light text-[10px] mr-1">
              VOL
            </span>
            ${formatMetric(token.vol)}
          </div>

          <div className="mt-2 flex items-center justify-end text-[9px] text-slate-400">
            <span
              className={cn('font-mono mr-2 transition-colors', priceColor)}
            >
              {token.price.toFixed(4)}
            </span>
            <span className="text-slate-500 mr-1">TX</span>
            <span className="font-semibold text-slate-300">
              {token.txCount}
            </span>
            {/* Pulse Dot */}
            <div
              className={cn(
                'ml-1 h-1.5 w-1.5 rounded-full animate-pulse',
                txColor
              )}
            />
          </div>
        </div>

        <button className="mt-2 flex items-center justify-center gap-1 rounded bg-[#6366f1] hover:bg-[#4f46e5] w-full py-1 text-[10px] font-bold text-white shadow-sm transition-all active:scale-95">
          <Zap className="h-3 w-3 fill-white" />
          <span>0 SOL</span>
        </button>
      </div>
    </div>
  );
}

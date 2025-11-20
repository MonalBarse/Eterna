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

// Define the shape of our token data
interface Token {
  id: number;
  name: string;
  ticker: string;
  address: string;
  mc: number; // Market Cap in K
  vol: number; // Volume in K
  price: number;
  tx: number; // Transactions
  color: 'green' | 'red';
  progress: string; // e.g., "0/1"
  imgColor: string; // For placeholder background color
}

// Mock Data structure closely mimicking the screenshot
const MOCK_TOKENS: Token[] = [
  {
    id: 1,
    name: 'PUMP',
    ticker: 'PUMP Token',
    address: 'H2ha...pump',
    mc: 4.38,
    vol: 0.521,
    price: 0.023,
    tx: 5,
    color: 'green',
    progress: '0/1',
    imgColor: 'bg-emerald-500',
  },
  {
    id: 2,
    name: 'ZINO',
    ticker: 'ZinoSolCoin',
    address: 'A9B1...L9W',
    mc: 65.64,
    vol: 1.8,
    price: 0.00329,
    tx: 12,
    color: 'red',
    progress: '1/1',
    imgColor: 'bg-blue-600',
  },
  {
    id: 3,
    name: 'DOGGCOIN',
    ticker: 'DOGGCOIN',
    address: 'QenP...q4ms',
    mc: 41.7,
    vol: 1.4,
    price: 0.00004,
    tx: 8,
    color: 'green',
    progress: '0/10',
    imgColor: 'bg-yellow-400',
  },
];

// Custom Scrollbar styling (using arbitrary values for Tailwind)
const CUSTOM_SCROLLBAR_CLASSES = `
  [&::-webkit-scrollbar]:w-[4px]
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-slate-700/60
  [&::-webkit-scrollbar-track]:bg-transparent
`;

// Helper component for the top row of icon metrics
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

// Helper component for the percentage pills with icons
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

// The token row component (smaller + name/title added)
function TokenRow({ token }: { token: Token }) {
  const mcColor = token.color === 'green' ? 'text-emerald-400' : 'text-red-400';
  const priceColor =
    token.color === 'green' ? 'text-emerald-300' : 'text-red-300';
  const txColor = token.color === 'green' ? 'bg-emerald-500' : 'bg-red-500';

  // Mock metrics based on the new image
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
      {/* 1. Left Logo + short address */}
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

      {/* 2. Middle: name + subtitle + metrics */}
      <div className="flex flex-1 flex-col pt-1">
        {/* name / subtitle row */}
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
          <span className="shrink-0 text-[10px] font-semibold text-emerald-400">
            5s
          </span>
        </div>

        {/* Top icon metrics bar */}
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {iconBarData.map((data, idx) => (
            <IconTextBadge key={idx} icon={data.icon} value={data.value} />
          ))}
        </div>

        {/* Row of percentage pills */}
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {mockMetrics.map((metric, idx) => (
            <PercentagePill key={idx} {...metric} />
          ))}
        </div>
      </div>

      {/* 3. Right: compact MC/Volume/Price + button */}
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

// Column Shell (Updated with custom scrollbar classes)
function TokenColumnShell({
  title,
  tokens,
}: {
  title: string;
  tokens: Token[];
}) {
  const COLUMN_HEIGHT_CLASS =
    'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)]';

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
        className={`overflow-y-auto ${COLUMN_HEIGHT_CLASS} ${CUSTOM_SCROLLBAR_CLASSES}`}
      >
        {tokens.map((token) => (
          <TokenRow key={token.id} token={token} />
        ))}
        {Array.from({ length: 15 }).map((_, idx) => (
          <TokenRow
            key={`placeholder-${idx}`}
            token={MOCK_TOKENS[idx % MOCK_TOKENS.length]}
          />
        ))}
      </div>
    </div>
  );
}

// Main Page Component
export default function Page() {
  const newPairs = MOCK_TOKENS.slice(0, 1);
  const finalStretch = MOCK_TOKENS.slice(1, 2);
  const migrated = MOCK_TOKENS.slice(2, 3);

  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-white">
            Pulse
          </h1>

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

        {/* Columns */}
        <section className="grid lg:grid-cols-3 border-1 border-slate-800">
          <TokenColumnShell title="New Pairs" tokens={newPairs} />
          <TokenColumnShell title="Final Stretch" tokens={finalStretch} />
          <TokenColumnShell title="Migrated" tokens={migrated} />
        </section>
      </div>
    </main>
  );
}

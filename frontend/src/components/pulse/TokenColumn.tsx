'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Token } from '@/lib/tokens';
import { TokenCard } from '@/components/pulse/TokenCard';
import { Zap, Menu, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_HEIGHT_CLASS =
  'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)]';

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  scrollClass?: string;
  // New prop to override height
}

export function TokenColumn({ title, tokens, scrollClass }: TokenColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const ITEM_HEIGHT = 120; // Approximate height of each TokenCard
  const BUFFER = 5; // Extra items to render above/below viewport
  const totalHeight = tokens.length * ITEM_HEIGHT;

  // Optimized virtualization: only render visible items + buffer
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop;
      const containerHeight = scrollElement.clientHeight;
      
      const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
      const end = Math.min(
        tokens.length,
        Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER
      );

      setVisibleRange({ start, end });
    };

    // Initial calculation
    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [tokens.length]);

  // Memoize visible tokens to prevent unnecessary recalculations
  const visibleTokens = useMemo(
    () => tokens.slice(visibleRange.start, visibleRange.end),
    [tokens, visibleRange.start, visibleRange.end]
  );

  return (
    <div className="flex flex-col bg-[#05060f]/95 border-r border-slate-800 last:border-r-0 h-full w-full">
      {/* Column header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-3 py-2 bg-[#05060f] shrink-0">
        <h2 className="text-sm font-semibold tracking-tight text-slate-100">
          {title}
        </h2>

        <div className="flex items-center gap-1.5">
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
            <button className="rounded-sm px-1.5 py-1 text-[9px] font-medium text-blue-400 bg-slate-800">
              P1
            </button>
            <button className="rounded-sm px-1.5 py-1 text-[9px] font-medium text-slate-500 hover:text-slate-300">
              P2
            </button>
            <button className="rounded-sm px-1.5 py-1 text-[9px] font-medium text-slate-500 hover:text-slate-300">
              P3
            </button>
          </div>

          {/* Sliders Icon */}
          <button className="text-slate-500 hover:text-white">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Virtualized scrollable body */}
      <div 
        ref={scrollRef}
        className={cn("overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent scroll-fade", scrollClass || DEFAULT_HEIGHT_CLASS)}
      >
        {tokens.length > 0 ? (
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div
              style={{ transform: `translateY(${visibleRange.start * ITEM_HEIGHT}px)` }}
            >
              {visibleTokens.map((token) => (
                <TokenCard key={token.id} token={token} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center text-xs text-slate-600">
            Loading tokens...
          </div>
        )}
      </div>
    </div>
  );
}

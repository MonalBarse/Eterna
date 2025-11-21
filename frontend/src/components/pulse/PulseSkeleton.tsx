'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Match the height class from TokenColumn to prevent layout shift
const COLUMN_HEIGHT_CLASS =
  'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)]';

function TokenCardSkeleton() {
  return (
    <div className="flex items-start justify-between border border-slate-800 bg-[#090a12] px-3 py-2.5">
      {/* Left: Icon + Address */}
      <div className="flex w-20 flex-col items-center gap-2 pr-3">
        <Skeleton className="h-14 w-14 rounded-sm bg-slate-800/50" />
        <Skeleton className="h-2 w-12 bg-slate-800/50" />
      </div>

      {/* Middle: Title + Metrics */}
      <div className="flex flex-1 flex-col pt-1">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-3 w-24 bg-slate-800/50" />
          <Skeleton className="h-3 w-12 bg-slate-800/50" />
        </div>
        <div className="flex flex-wrap gap-2 mb-1">
          <Skeleton className="h-3 w-8 rounded-sm bg-slate-800/50" />
          <Skeleton className="h-3 w-8 rounded-sm bg-slate-800/50" />
          <Skeleton className="h-3 w-8 rounded-sm bg-slate-800/50" />
          <Skeleton className="h-3 w-8 rounded-sm bg-slate-800/50" />
        </div>
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-4 w-10 rounded-full bg-slate-800/50" />
          <Skeleton className="h-4 w-10 rounded-full bg-slate-800/50" />
        </div>
      </div>

      {/* Right: Prices + Button */}
      <div className="flex h-full min-w-[100px] flex-col items-end justify-between">
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-4 w-16 bg-slate-800/50" />
          <Skeleton className="h-4 w-14 bg-slate-800/50" />
        </div>
        <Skeleton className="mt-2 h-6 w-16 rounded-xl bg-slate-800/50" />
      </div>
    </div>
  );
}

function ColumnSkeleton() {
  return (
    <div className="flex flex-col bg-[#05060f]/95">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 h-[38px]">
        <Skeleton className="h-4 w-24 bg-slate-800/50" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-14 rounded-md bg-slate-800/50" />
          <Skeleton className="h-4 w-20 rounded-md bg-slate-800/50" />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className={`overflow-hidden ${COLUMN_HEIGHT_CLASS}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <TokenCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function PulseSkeleton() {
  return (
    <>
      {/* Desktop skeleton layout mirrors the 3-column grid */}
      <section className="hidden lg:grid lg:grid-cols-3 border border-slate-800 h-full">
        <ColumnSkeleton />
        <ColumnSkeleton />
        <ColumnSkeleton />
      </section>

      {/* Mobile skeleton layout mirrors the single-column/tabs container height */}
      <section className="lg:hidden h-full flex flex-col border border-slate-800 rounded-md overflow-hidden">
        <ColumnSkeleton />
      </section>
    </>
  );
}

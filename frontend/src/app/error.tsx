'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#05060a] text-slate-200">
      <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
// Server component wrapper to keep the main entry light; PulseClient holds all client logic.
import PulseClient from './pulse-client';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#05060a] text-slate-50">
      <div className="mx-auto flex flex-col gap-4 px-3 py-3 md:px-5 md:py-4 h-screen overflow-hidden">
        <PulseClient />
      </div>
    </main>
  );
}

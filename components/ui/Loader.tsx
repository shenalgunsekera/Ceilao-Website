/** Clean Ceilao-themed loading animation — orange ring spinner + pulsing wordmark. */
export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-6 bg-brand-radial">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-[3px] border-brand-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand border-r-brand animate-spin" />
        <div className="absolute inset-[6px] rounded-full bg-brand-gradient opacity-90 animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display tracking-[0.4em] text-brand text-lg pl-[0.4em]">CEILAO</span>
        <span className="font-body text-[10px] tracking-widest2 uppercase text-gray-500">{label}…</span>
      </div>
    </div>
  );
}

/** Small inline spinner for buttons / inline states. */
export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block h-4 w-4 rounded-full border-2 border-brand-200 border-t-brand animate-spin ${className}`} />
  );
}

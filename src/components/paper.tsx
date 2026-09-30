type Tone = 'cotton' | 'blush' | 'sand';

const tones: Record<Tone, string> = {
  cotton: 'bg-cotton',
  blush: 'bg-blushpaper',
  sand: 'bg-paper-deep',
};

/** A sheet of cotton paper with a torn deckle edge and a soft shadow beneath it. */
export function PaperCard({
  tone = 'cotton',
  rotate = 0,
  className = '',
  children,
}: {
  tone?: Tone;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      <div className="absolute inset-x-2 bottom-[-6px] top-3 bg-black/35 blur-md" aria-hidden="true" />
      <div className={`paper-grain absolute inset-0 ${tones[tone]}`} style={{ filter: 'url(#deckle)' }} aria-hidden="true" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Thin hand-ruled double frame, inset from the paper edge. */
export function RuledFrame({ className = 'text-ink' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      style={{ filter: 'url(#ink-fine)' }}
    >
      <rect x="0.5" y="0.5" width="99" height="99" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="2.2" y="1.8" width="95.6" height="96.4" strokeWidth="0.6" vectorEffect="non-scaling-stroke" strokeOpacity="0.6" />
    </svg>
  );
}

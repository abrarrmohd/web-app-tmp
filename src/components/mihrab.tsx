import { ColumnBase, ColumnCapital, MihrabHead } from '@/components/ink';

// The column strips are 34 of the head's 400 viewBox units wide.
const STRIP = `${(34 / 400) * 100}cqw`;

function Column() {
  return (
    <div className="flex flex-col items-center">
      <ColumnCapital className="block w-full" />
      <div
        className="w-[30%] flex-1 border-x border-ink/80 bg-[#e3d2b2]/40"
        style={{ filter: 'url(#ink-fine)' }}
      />
      <ColumnBase className="block w-full" />
    </div>
  );
}

/**
 * A Shah Jahani mihrab: cusped arch in a rectangular frame, resting on two baluster
 * columns. The columns stretch, so the niche can hold any amount of content.
 */
export function Mihrab({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={className} style={{ containerType: 'inline-size' }}>
      <MihrabHead className="block w-full" />
      <div className="grid" style={{ gridTemplateColumns: `${STRIP} minmax(0, 1fr) ${STRIP}` }}>
        <Column />
        <div className="relative">{children}</div>
        <Column />
      </div>
    </div>
  );
}

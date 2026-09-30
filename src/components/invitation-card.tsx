import type { ScheduleItem } from '@/data/event';
import { FloweringPlant, OXBLOOD, INK, ROSE, SAGE, SmallArch } from '@/components/ink';
import { PaperCard, RuledFrame } from '@/components/paper';
import { FloralSpray } from '@/components/decor';

export type CardVariant = 'cotton' | 'blush';

// Nikkah is printed in green-black ink on white cotton; Walima in oxblood on blush.
const themes = {
  cotton: { tone: 'cotton' as const, ink: 'text-ink', soft: 'text-ink-soft', accent: 'text-oxblood', stroke: INK, tint: SAGE, frame: 'text-ink/70' },
  blush: { tone: 'blush' as const, ink: 'text-oxblood', soft: 'text-oxblood/70', accent: 'text-ink', stroke: OXBLOOD, tint: ROSE, frame: 'text-oxblood/60' },
};

function ArchedName({ item, variant, size }: { item: ScheduleItem; variant: CardVariant; size: 'sm' | 'lg' }) {
  const t = themes[variant];
  return (
    <div className={`relative mx-auto ${size === 'lg' ? 'w-40' : 'w-[62%]'}`}>
      <SmallArch className="block w-full" stroke={t.stroke} tint={t.tint} />
      <p
        className={`absolute inset-x-0 bottom-[6%] font-ruqaa leading-none ${t.ink} ${size === 'lg' ? 'text-4xl' : 'text-lg sm:text-3xl'}`}
      >
        {item.arabicName}
      </p>
    </div>
  );
}

/** Top of the card, visible while it is still half inside the envelope. */
export function PeekCard({ item, variant }: { item: ScheduleItem; variant: CardVariant }) {
  const t = themes[variant];
  return (
    <PaperCard tone={t.tone} className="h-full w-full">
      <RuledFrame className={t.frame} />
      <div className="px-3 pt-[12%] text-center">
        <ArchedName item={item} variant={variant} size="sm" />
        <p className={`mt-1 font-heading text-xl font-light italic sm:text-4xl ${t.ink}`}>{item.ceremony}</p>
      </div>
    </PaperCard>
  );
}

/** Full invitation card for a single ceremony, worded like a printed card. */
export function InvitationCard({ item, variant, rotate = 0 }: { item: ScheduleItem; variant: CardVariant; rotate?: number }) {
  const t = themes[variant];
  return (
    <PaperCard tone={t.tone} rotate={rotate} className="mx-auto h-full w-full max-w-[24rem]">
      <RuledFrame className={t.frame} />
      <FloralSpray className="absolute left-1 top-1 w-20" />
      <FloralSpray className="absolute right-1 top-1 w-20 -scale-x-100" />
      <FloralSpray className="absolute bottom-1 right-1 w-16 -scale-100" />
      <div className={`relative flex h-full flex-col items-center px-9 pb-10 pt-10 text-center font-display ${t.ink}`}>
        <ArchedName item={item} variant={variant} size="lg" />
        <h3 className="mt-3 font-heading text-5xl font-light italic">{item.ceremony}</h3>

        <p className={`mt-5 text-lg italic leading-snug ${t.soft}`}>
          {item.ceremony === 'Nikkah'
            ? 'You are warmly invited to witness our Nikkah on'
            : 'Please join us for the Walima reception on'}
        </p>
        <p className="mt-3 text-xl">{item.day},</p>
        <p className="text-xl">{item.dateWords}</p>
        <p className={`text-sm tracking-[0.3em] ${t.soft}`}>two thousand twenty-six</p>
        <p className="mt-3 text-lg italic">{item.timeWords}</p>

        <FloweringPlant className="my-5 w-28" />

        <p className="text-sm uppercase tracking-[0.25em]">{item.venue}</p>
        <p className={`mt-1 text-base ${t.soft}`}>{item.address}</p>
        <p className={`mt-4 flex-1 text-base italic ${t.soft}`}>{item.note}</p>

        <a
          href={item.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 text-sm uppercase tracking-[0.2em] underline decoration-1 underline-offset-[6px] transition hover:opacity-70 ${t.accent}`}
        >
          Directions &rarr;
        </a>
      </div>
    </PaperCard>
  );
}

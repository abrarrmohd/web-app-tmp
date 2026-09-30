'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { couple, dressCode, schedule } from '@/data/event';
import { DriedSprig, PostageStamp, Postmark, WaxSeal } from '@/components/ink';
import { InvitationCard, PeekCard, type CardVariant } from '@/components/invitation-card';
import { PaperCard } from '@/components/paper';
import { FloralSpray, HangingDecor, Petals, StarLattice } from '@/components/decor';

type Phase = 'closed' | 'opening' | 'open' | 'revealed';

const variants: CardVariant[] = ['cotton', 'blush'];
// Cards laid on the table by hand never sit perfectly straight.
const tableTilt = [-1.6, 1.2];

const ease = [0.22, 1, 0.36, 1] as const;

export function InvitationSection() {
  const [phase, setPhase] = useState<Phase>('closed');
  const [flapBehind, setFlapBehind] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const openEnvelope = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    timers.current = [
      // Once the flap passes vertical, tuck it behind the cards.
      setTimeout(() => setFlapBehind(true), 450),
      setTimeout(() => setPhase('open'), 850),
      setTimeout(() => setPhase('revealed'), 3200),
    ];
  };

  const reseal = () => {
    timers.current.forEach(clearTimeout);
    setFlapBehind(false);
    setPhase('closed');
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const flapOpen = phase !== 'closed';
  const cardsOut = phase === 'open';

  return (
    <section id="invitation" className="linen relative w-full scroll-mt-4 bg-table px-5 py-20 text-cotton sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,240,210,0.07),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <StarLattice cols={10} rows={10} className="absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 text-cotton/[0.13]" />
      </div>
      <HangingDecor ink="#efe5d2" lanternsOnly />
      <Petals count={10} />
      {/* flowers lying loose on the table */}
      <FloralSpray ink="#efe5d2" className="absolute -left-6 bottom-0 w-44 -scale-y-100 opacity-90 sm:w-72" />
      <FloralSpray ink="#efe5d2" className="absolute -right-6 bottom-24 hidden w-64 -scale-100 opacity-90 md:block" />

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="font-heading text-5xl font-light italic sm:text-6xl">You&rsquo;re invited</h2>
        <p className="mt-3 font-display text-lg italic text-cotton/70">
          {phase === 'revealed' ? 'two celebrations, one blessed union' : 'a letter for you, sealed with love'}
        </p>

        <AnimatePresence mode="wait">
          {phase !== 'revealed' ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, y: 40, transition: { duration: 0.6, ease } }}
              className={`flex flex-col items-center transition-[padding] duration-1000 ease-out ${
                phase === 'closed' ? 'pt-12 sm:pt-16' : 'pt-[42vw] sm:pt-56'
              }`}
            >
              <div className="relative aspect-[3/2] w-full max-w-[540px] rotate-[-1deg]">
                <div className="absolute inset-x-3 -bottom-3 top-6 bg-black/50 blur-xl" aria-hidden="true" />

                {/* Inside of the envelope: block-printed lining */}
                <div className="absolute inset-0 bg-blushpaper">
                  <div className="pattern-buti absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />
                </div>

                {schedule.map((item, i) => {
                  const dir = i === 0 ? -1 : 1;
                  return (
                    <motion.div
                      key={item.ceremony}
                      className={`absolute top-[5%] h-[90%] w-[44%] ${i === 0 ? 'left-[5%]' : 'right-[5%]'}`}
                      style={{ zIndex: 10 + i, originY: 1 }}
                      initial={false}
                      animate={
                        cardsOut
                          ? { y: '-60%', x: `${dir * 5}%`, rotate: dir * (i === 0 ? 6 : 4.5) }
                          : { y: '0%', x: '0%', rotate: 0 }
                      }
                      transition={{ duration: 1.1, delay: cardsOut ? i * 0.22 : 0, ease }}
                    >
                      <PeekCard item={item} variant={variants[i]} />
                    </motion.div>
                  );
                })}

                {/* Front pocket */}
                <div
                  className="paper-grain absolute inset-0 z-20 bg-[#efe4cf]"
                  style={{ clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)' }}
                >
                  <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <path d="M0 0 L150 112 L0 200 Z" fill="#000" opacity="0.035" />
                    <path d="M300 0 L150 112 L300 200 Z" fill="#000" opacity="0.07" />
                    <path d="M0 200 L150 98 L300 200 Z" fill="#fff" opacity="0.18" />
                    <path d="M0 200 L150 98 L300 200" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <p className="absolute bottom-[11%] left-[8%] -rotate-3 text-left font-hand text-lg leading-tight text-ink/80 sm:text-2xl">
                    for you &amp; your family
                  </p>
                  <PostageStamp className="absolute bottom-[8%] right-[7%] w-[11%] rotate-[4deg] drop-shadow-sm" />
                  <Postmark text="CHENNAI · TAMIL NADU · " className="absolute bottom-[10%] right-[4%] w-[25%] -rotate-6" />
                </div>

                {/* Top flap: paper outside, printed lining inside */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-[60%]"
                  style={{
                    zIndex: flapBehind ? 5 : 30,
                    originY: 0,
                    transformPerspective: 1200,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={false}
                  animate={{ rotateX: flapOpen ? 180 : 0 }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                >
                  <div
                    className="paper-grain absolute inset-0 bg-[#f3e9d6] [backface-visibility:hidden]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.06]" />
                  </div>
                  <div
                    className="absolute inset-0 bg-blushpaper [backface-visibility:hidden] [transform:rotateX(180deg)]"
                    style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
                  >
                    <div className="pattern-buti absolute inset-0" />
                  </div>
                </motion.div>
                {/* shadow the closed flap casts on the pocket */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 z-[25] h-[62%] bg-black/10 blur-[3px] transition-opacity duration-300 ${flapOpen ? 'opacity-0' : 'opacity-100'}`}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                  aria-hidden="true"
                />

                <AnimatePresence>
                  {phase === 'closed' ? (
                    <motion.button
                      key="seal"
                      type="button"
                      onClick={openEnvelope}
                      aria-label="Break the seal to open your invitation"
                      exit={{ opacity: 0, scale: 0.8, rotate: -25, transition: { duration: 0.5 } }}
                      whileHover={{ rotate: -4 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ x: '-50%', y: '-50%' }}
                      className="absolute left-1/2 top-[60%] z-40 h-20 w-20 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cotton sm:h-24 sm:w-24"
                    >
                      <DriedSprig className="pointer-events-none absolute -left-10 -top-6 w-20 -rotate-[20deg] sm:-left-12 sm:w-24" />
                      <WaxSeal
                        initials={[couple.bride[0], couple.groom[0]]}
                        className="relative h-full w-full drop-shadow-[1px_3px_2px_rgba(0,0,0,0.35)]"
                      />
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>

              <motion.p
                animate={{ opacity: phase === 'closed' ? 1 : 0 }}
                className="mt-10 font-display text-base italic text-cotton/60"
              >
                tap the seal to open
              </motion.p>
            </motion.div>
          ) : (
            <motion.div key="cards" className="mt-14">
              <div className="grid gap-12 md:grid-cols-2 md:gap-8">
                {schedule.map((item, i) => (
                  <motion.div
                    key={item.ceremony}
                    initial={{ opacity: 0, y: 100, rotate: i === 0 ? -8 : 7 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.25, ease }}
                    className="h-full"
                  >
                    <InvitationCard item={item} variant={variants[i]} rotate={tableTilt[i]} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="mx-auto mt-16 max-w-md"
              >
                <PaperCard tone="sand" rotate={0.8}>
                  <div className="px-8 py-7 text-ink">
                    <p className="-rotate-2 font-hand text-2xl text-oxblood">a note on attire</p>
                    <p className="mt-2 font-display text-lg italic leading-relaxed">{dressCode.description}</p>
                  </div>
                </PaperCard>
              </motion.div>

              <button
                type="button"
                onClick={reseal}
                className="mt-12 font-display text-sm italic text-cotton/50 underline decoration-cotton/30 underline-offset-4 transition hover:text-cotton"
              >
                put the cards back in the envelope
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

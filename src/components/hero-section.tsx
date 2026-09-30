'use client';

import { motion } from 'framer-motion';
import { bismillah, city, couple, schedule } from '@/data/event';
import { FloweringPlant, Minaret, SprigDivider } from '@/components/ink';
import { Mihrab } from '@/components/mihrab';
import { FloralSpray, FlowerBush, HangingDecor, Petals, StarLattice } from '@/components/decor';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.4, delay, ease: 'easeOut' },
});

export function HeroSection() {
  return (
    <section className="paper-grain relative w-full overflow-hidden bg-paper px-3 pb-16 pt-14 sm:px-6 sm:pt-20">
      {/* aged paper: warmer at the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(160,120,70,0.14)_100%)]" />
      <StarLattice cols={6} rows={6} className="absolute -left-24 bottom-16 h-80 w-80 text-ink/[0.16] sm:h-[28rem] sm:w-[28rem]" />
      <StarLattice cols={6} rows={6} className="absolute -right-24 top-56 hidden h-96 w-96 text-oxblood/[0.14] sm:block" />
      <HangingDecor />
      <Petals />
      <FloralSpray className="absolute -bottom-6 -left-6 hidden w-64 -scale-y-100 md:block lg:w-80" />
      <FloralSpray className="absolute -bottom-6 -right-6 hidden w-64 -scale-100 md:block lg:w-80" />

      <motion.div {...fadeIn(0)} className="relative z-10 mx-auto flex max-w-[50rem] items-end justify-center gap-1 sm:gap-5">
        <Minaret tilt={-0.6} className="mb-[2px] w-[9vw] max-w-[5rem] shrink-0 self-end sm:w-16 lg:w-20" />

        <Mihrab className="w-full max-w-[34rem]">
          <div className="px-2 pb-2 pt-1 text-center text-ink sm:px-6">
            <motion.p {...fadeIn(0.4)} className="font-arabic text-[1.35rem] leading-loose sm:text-[2rem]" dir="rtl">
              {bismillah}
            </motion.p>
            <motion.p {...fadeIn(0.6)} className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft sm:text-xs">
              In the name of Allah, the Most Gracious, the Most Merciful
            </motion.p>

            <motion.p {...fadeIn(0.9)} className="mt-8 font-display text-base italic text-ink-soft sm:text-lg">
              together with their families
            </motion.p>

            <motion.h1 {...fadeIn(1.1)} className="mt-2 font-heading font-light italic leading-[0.95] text-oxblood">
              <span className="block text-[2.9rem] sm:text-7xl">{couple.bride}</span>
              <span className="my-1 block -rotate-3 font-hand text-2xl not-italic text-ink-soft sm:text-3xl">and</span>
              <span className="block text-[2.9rem] sm:text-7xl">{couple.groom}</span>
            </motion.h1>

            <motion.p {...fadeIn(1.3)} className="text-balance mx-auto mt-6 max-w-xs font-display text-base leading-snug sm:max-w-sm sm:text-lg">
              request the pleasure of your company at their
            </motion.p>
            <motion.p {...fadeIn(1.4)} className="mt-1 font-display text-sm uppercase tracking-[0.3em] sm:text-base">
              Nikkah &amp; Walima
            </motion.p>

            <SprigDivider className="my-5" />

            <motion.div {...fadeIn(1.6)} className="mx-auto grid max-w-xs grid-cols-2 divide-x divide-ink/25 font-display">
              {schedule.map((item) => {
                const [d, m] = item.date.split(' ');
                return (
                  <div key={item.ceremony} className="px-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{item.ceremony}</p>
                    <p className="font-heading text-3xl font-light">{d}</p>
                    <p className="text-sm">
                      {m} &middot; {item.day.slice(0, 3)}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            <motion.p {...fadeIn(1.8)} className="mt-4 font-display text-sm tracking-[0.15em] text-ink-soft">
              {city}
            </motion.p>
            <motion.p {...fadeIn(2)} className="mt-1 -rotate-2 font-hand text-xl text-oxblood/80">
              insha&apos;Allah
            </motion.p>

            <FloweringPlant className="mx-auto mt-3 w-32 sm:w-44" />
          </div>
        </Mihrab>

        <Minaret tilt={0.5} className="mb-[2px] w-[9vw] max-w-[5rem] shrink-0 self-end sm:w-16 lg:w-20" />

        {/* flower beds at the foot of each minaret */}
        <FlowerBush className="absolute -bottom-1 -left-[6%] w-[22%] max-w-[11rem] sm:-left-[4%] sm:w-[20%]" />
        <FlowerBush className="absolute -bottom-1 -right-[6%] w-[22%] max-w-[11rem] -scale-x-100 sm:-right-[4%] sm:w-[20%]" />
      </motion.div>

      {/* ground line, drawn by hand */}
      <svg viewBox="0 0 800 12" preserveAspectRatio="none" className="relative mx-auto block h-3 w-full max-w-[52rem]" aria-hidden="true">
        <path d="M0 5 C120 3 260 7 400 4.5 C540 2.5 680 6.5 800 4" fill="none" stroke="#2b3a2f" strokeWidth="1.2" filter="url(#ink)" />
        <path d="M40 9 C200 8 320 10 480 8.5 C600 7.5 700 9.5 770 9" fill="none" stroke="#2b3a2f" strokeWidth="0.5" strokeOpacity="0.6" />
      </svg>

      <a
        href="#invitation"
        className="mt-8 block text-center font-display text-sm italic text-ink-soft underline decoration-ink/30 underline-offset-4 transition hover:text-oxblood"
      >
        scroll down for your invitation
      </a>
    </section>
  );
}

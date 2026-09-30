'use client';

import { motion } from 'framer-motion';
import { ayah, couple } from '@/data/event';
import { SprigDivider } from '@/components/ink';
import { FloralSpray, Petals, StarLattice } from '@/components/decor';

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, ease: 'easeOut' },
};

export function FamiliesSection() {
  return (
    <section className="paper-grain relative w-full overflow-hidden bg-paper-deep px-6 py-20 text-center text-ink sm:py-24">
      <FloralSpray className="absolute -left-4 -top-4 w-44 sm:w-80" />
      <FloralSpray className="absolute -bottom-4 -right-4 w-44 -scale-100 sm:w-80" />
      <FloralSpray className="absolute -right-4 -top-4 hidden w-56 -scale-x-100 md:block" />
      <FloralSpray className="absolute -bottom-4 -left-4 hidden w-56 -scale-y-100 md:block" />
      <StarLattice cols={6} rows={6} className="absolute -right-28 top-1/3 hidden h-96 w-96 text-ink/[0.1] md:block" />
      <Petals count={10} />
      <div className="relative mx-auto max-w-3xl">
        <motion.div {...reveal}>
          <p className="mx-auto max-w-2xl font-arabic text-[1.6rem] leading-[2.2] sm:text-[2rem]" dir="rtl">
            {ayah.arabic}
          </p>
          <p className="mx-auto mt-5 max-w-xl font-display text-lg italic leading-relaxed text-ink-soft sm:text-xl">
            &ldquo;{ayah.translation}&rdquo;
          </p>
          <p className="mt-3 font-display text-sm tracking-[0.2em] text-ink-soft">— {ayah.reference}</p>
        </motion.div>

        <SprigDivider className="my-14" />

        <motion.div {...reveal}>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-ink-soft">With the blessings of our families</p>

          <div className="mt-8 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
            <div>
              <p className="font-heading text-5xl font-light italic text-oxblood sm:text-6xl">{couple.bride}</p>
              <p className="mt-2 font-display text-lg italic text-ink-soft">{couple.brideLineage}</p>
            </div>
            <span className="-rotate-6 font-hand text-3xl text-ink-soft/80">and</span>
            <div>
              <p className="font-heading text-5xl font-light italic text-oxblood sm:text-6xl">{couple.groom}</p>
              <p className="mt-2 font-display text-lg italic text-ink-soft">{couple.groomLineage}</p>
            </div>
          </div>

          <p className="text-balance mx-auto mt-10 max-w-xl font-display text-lg leading-relaxed sm:text-xl">
            Together with our parents, and with hearts full of gratitude, we joyfully invite you to
            witness the union of two souls and share in our Nikkah &amp; Walima celebrations.
          </p>
          <p className="mt-6 rotate-[-2deg] font-hand text-2xl text-oxblood/85">with love &amp; duas</p>
        </motion.div>
      </div>
    </section>
  );
}

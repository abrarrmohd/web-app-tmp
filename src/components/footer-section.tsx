'use client';

import { motion } from 'framer-motion';
import { couple, dua } from '@/data/event';
import { SprigDivider, TajSketch } from '@/components/ink';
import { FloralSpray, FlowerBush, Petals, StarLattice } from '@/components/decor';

export function FooterSection() {
  return (
    <footer className="paper-grain relative w-full overflow-hidden bg-paper px-6 pb-10 pt-20 text-center text-ink">
      <StarLattice cols={6} rows={6} className="absolute -left-24 top-6 h-80 w-80 text-ink/[0.1]" />
      <FloralSpray className="absolute -right-4 -top-4 w-36 -scale-x-100 sm:w-56" />
      <Petals count={10} />
      <FloralSpray className="absolute -left-4 top-1/3 hidden w-48 md:block" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative mx-auto max-w-3xl"
      >
        <p className="mx-auto max-w-2xl font-arabic text-[1.6rem] leading-[2.1] sm:text-[2rem]" dir="rtl">
          {dua.arabic}
        </p>
        <p className="mx-auto mt-4 max-w-lg font-display text-lg italic text-ink-soft">&ldquo;{dua.translation}&rdquo;</p>

        <SprigDivider className="my-12" />

        <p className="text-balance mx-auto max-w-md font-display text-lg leading-relaxed sm:text-xl">
          Your presence and prayers mean the world to us. We can&apos;t wait to celebrate this
          new chapter surrounded by the people we love.
        </p>

        {/* <Link
          href="/rsvp"
          className="mt-8 inline-block border border-ink px-8 py-3 font-display text-sm uppercase tracking-[0.25em] transition hover:bg-ink hover:text-cotton"
        >
          RSVP
        </Link> */}

        <p className="mt-12 font-heading text-5xl font-light italic text-oxblood">
          {couple.bride} <span className="font-hand text-3xl not-italic text-ink-soft">and</span> {couple.groom}
        </p>
        <p className="mt-3 font-display text-base tracking-[0.15em] text-ink-soft">{couple.hashtag}</p>

        <div className="relative mx-auto mt-12 w-full max-w-xl">
          <TajSketch className="w-full" />
          <FlowerBush className="absolute bottom-[8%] left-[-6%] w-[34%]" />
          <FlowerBush className="absolute bottom-[8%] right-[-6%] w-[34%] -scale-x-100" />
        </div>
        <p className="mt-2 font-display text-xs uppercase tracking-[0.3em] text-ink-soft/70">Chennai &middot; December 2026</p>
      </motion.div>
    </footer>
  );
}

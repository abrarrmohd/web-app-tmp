'use client';

import { motion } from 'framer-motion';
import { ayah, bismillah, couple } from '@/data/event';
import { OrnamentDivider } from '@/components/motifs';

export function FamiliesSection() {
  return (
    <section className="relative w-full max-w-3xl px-6 pb-16 pt-20 text-center sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-arabic text-2xl leading-loose text-maroon sm:text-3xl">{bismillah}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-plum/60">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <p className="mt-8 text-xs uppercase tracking-[0.5em] text-gold">Nikkah &amp; Walima</p>
        <h1 className="mt-4 font-display text-5xl text-maroon sm:text-6xl">
          {couple.groom} &amp; {couple.bride}
        </h1>

        <OrnamentDivider className="my-10" />

        <p className="font-arabic text-xl leading-[2.3] text-maroon sm:text-2xl" dir="rtl">
          {ayah.arabic}
        </p>
        <p className="mx-auto mt-4 max-w-xl font-display text-base italic text-plum/80 sm:text-lg">
          &ldquo;{ayah.translation}&rdquo;
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold">{ayah.reference}</p>

        <OrnamentDivider className="my-10" />

        <p className="text-xs uppercase tracking-[0.4em] text-plum/60">
          With the blessings of our families
        </p>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-3xl text-maroon sm:text-4xl">{couple.groom}</p>
            <p className="mt-2 text-sm text-plum/70">{couple.groomLineage}</p>
          </div>
          <div>
            <p className="font-display text-3xl text-maroon sm:text-4xl">{couple.bride}</p>
            <p className="mt-2 text-sm text-plum/70">{couple.brideLineage}</p>
          </div>
        </div>

        <p className="mt-8 mx-auto max-w-lg text-sm leading-relaxed text-plum/75 sm:text-base">
          Together with our parents, and with hearts full of gratitude, we joyfully invite you to
          witness the union of two souls and share in our Nikkah &amp; Walima celebrations.
        </p>
      </motion.div>
    </section>
  );
}

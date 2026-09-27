'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { couple, rsvpNote } from '@/data/event';
import { OrnamentDivider } from '@/components/motifs';

export function FooterSection() {
  return (
    <footer className="relative w-full max-w-3xl px-6 pb-16 pt-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <OrnamentDivider className="mb-8" />

        <p className="mx-auto max-w-md text-sm leading-relaxed text-plum/75 sm:text-base">
          Your presence and prayers mean the world to us. We can&apos;t wait to celebrate this
          new chapter surrounded by the people we love.
        </p>

        {/* <p className="mt-6 font-display text-2xl text-maroon">{rsvpNote}</p>

        <Link
          href="/rsvp"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-maroon to-maroon-dark px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] text-ivory shadow-gold transition hover:-translate-y-0.5"
        >
          RSVP Now
        </Link> */}

        <p className="mt-10 font-display text-xl text-gold">{couple.hashtag}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-plum/40">
          {couple.groom} &amp; {couple.bride} &middot; With love, always
        </p>
      </motion.div>
    </footer>
  );
}

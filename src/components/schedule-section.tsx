'use client';

import { motion } from 'framer-motion';
import { schedule, dressCode } from '@/data/event';
import { OrnamentDivider, FloralMotif } from '@/components/motifs';

export function ScheduleSection() {
  return (
    <section className="relative w-full max-w-4xl px-6 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Celebrations</p>
        <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">
          Nikkah &amp; Walima
        </h2>
        <OrnamentDivider className="mt-6" />
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {schedule.map((item, index) => (
          <motion.a
            key={item.ceremony}
            href={item.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="group relative block overflow-hidden rounded-3xl border-nikkahnama bg-ivory/80 p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-gold"
          >
            <FloralMotif className="mx-auto h-8 w-8 text-gold/70" />
            <p className="mt-3 font-arabic text-xl text-maroon/80">{item.arabicName}</p>
            <h3 className="mt-2 font-display text-3xl text-maroon">{item.ceremony}</h3>

            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-emerald">
              {item.day}, {item.date}
            </p>
            <p className="mt-1 text-sm text-plum/70">{item.time}</p>

            <div className="my-5 h-px w-16 mx-auto bg-gold/40" />

            <p className="font-display text-xl text-plum">{item.venue}</p>
            <p className="mt-1 text-sm text-plum/60">{item.address}</p>

            <p className="mt-4 text-xs italic text-plum/50">{item.note}</p>

            <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.3em] text-gold underline decoration-gold/40 underline-offset-4 group-hover:text-maroon">
              View on map
            </span>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-12 max-w-lg rounded-2xl border border-dashed border-gold/50 bg-cream/60 p-6 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-emerald">{dressCode.title}</p>
        <p className="mt-2 text-sm text-plum/75 sm:text-base">{dressCode.description}</p>
      </motion.div>
    </section>
  );
}

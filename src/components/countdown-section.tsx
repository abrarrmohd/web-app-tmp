'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nikkahDate } from '@/data/event';

function getTimeLeft() {
  const diff = new Date(nikkahDate).getTime() - Date.now();
  const clamped = Math.max(diff, 0);

  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ];

  return (
    <section className="relative w-full max-w-3xl px-6 py-12 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">Counting down to</p>
      <h2 className="mt-2 font-display text-3xl text-maroon sm:text-4xl">Our Nikkah Day</h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 grid grid-cols-4 gap-3 sm:gap-6"
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-2xl border-nikkahnama bg-ivory/80 py-4 shadow-soft sm:py-6"
          >
            <span className="font-display text-2xl text-maroon sm:text-4xl">
              {unit.value !== undefined ? String(unit.value).padStart(2, '0') : '--'}
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-plum/60 sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

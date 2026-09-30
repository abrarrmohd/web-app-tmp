'use client';

import { Marigold, SketchRose } from '@/components/decor';

import { useEffect, useState } from 'react';
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
    { label: 'days', value: timeLeft?.days },
    { label: 'hours', value: timeLeft?.hours },
    { label: 'minutes', value: timeLeft?.minutes },
    { label: 'seconds', value: timeLeft?.seconds },
  ];

  return (
    <section className="linen relative w-full border-t border-cotton/10 bg-table px-5 pb-20 pt-4 text-center text-cotton">
      <div className="flex items-center justify-center gap-3">
        <svg viewBox="-14 -14 28 28" className="h-7 w-7" aria-hidden="true">
          <g fill="none" stroke="#efe5d2" strokeWidth="0.7" filter="url(#ink)"><Marigold x={0} y={0} s={1} /></g>
        </svg>
        <p className="-rotate-2 font-hand text-2xl text-cotton/80">counting the days until our Nikkah</p>
        <svg viewBox="-14 -14 28 28" className="h-7 w-7" aria-hidden="true">
          <g fill="none" stroke="#efe5d2" strokeWidth="0.7" filter="url(#ink)"><SketchRose x={0} y={0} s={0.9} /></g>
        </svg>
      </div>

      <div className="mx-auto mt-8 grid max-w-xl grid-cols-4 divide-x divide-cotton/15">
        {units.map((unit) => (
          <div key={unit.label} className="px-1">
            <span className="block font-heading text-4xl font-light tabular-nums sm:text-6xl">
              {unit.value !== undefined ? String(unit.value).padStart(2, '0') : '--'}
            </span>
            <span className="mt-1 block font-display text-sm italic text-cotton/55">{unit.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

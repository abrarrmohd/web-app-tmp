'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { validatePhone } from '@/lib/phone';
import { couple, rsvpNote, schedule } from '@/data/event';
import type { Ceremony, RsvpFormState } from '@/types/rsvp';
import { OrnamentDivider } from '@/components/motifs';

const countryCodes = ['+91', '+1'];

const initialState: RsvpFormState = {
  fullName: '',
  phone: '',
  countryCode: '+91',
  attendance: '',
  ceremonies: [],
  guestCount: '1',
  notes: '',
};

export function RsvpForm() {
  const [form, setForm] = useState<RsvpFormState>(initialState);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof RsvpFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleCeremony = (ceremony: Ceremony) => {
    setForm((prev) => ({
      ...prev,
      ceremonies: prev.ceremonies.includes(ceremony)
        ? prev.ceremonies.filter((item) => item !== ceremony)
        : [...prev.ceremonies, ceremony],
    }));
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim()) {
      setError('Please share your name so we know who to expect.');
      return;
    }

    if (!form.attendance) {
      setError('Please let us know if you can join us.');
      return;
    }

    if (form.attendance === 'attending' && form.ceremonies.length === 0) {
      setError('Please select at least one ceremony you will be attending.');
      return;
    }

    if (!validatePhone(form.phone, form.countryCode)) {
      setError('Please enter a valid phone number for the selected country code.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pattern-floral mx-auto max-w-3xl rounded-[2rem] border-nikkahnama bg-ivory/90 p-8 shadow-soft backdrop-blur-sm md:p-12"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-gold">RSVP</p>
      <h1 className="mt-4 font-display text-4xl text-maroon md:text-5xl">
        {couple.groom} &amp; {couple.bride} would love for you to be there.
      </h1>
      <p className="mt-4 text-sm text-plum/70 md:text-base">{rsvpNote}</p>

      <OrnamentDivider className="my-8" />

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald/30 bg-emerald/10 p-6 text-emerald-dark">
          <h2 className="font-display text-2xl">Jazakallah Khair!</h2>
          <p className="mt-2">
            Your RSVP has been recorded. We can&apos;t wait to celebrate with you, insha&apos;Allah.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Full name</span>
              <input
                value={form.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
                className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
                placeholder="Your good name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Will you attend?</span>
              <select
                value={form.attendance}
                onChange={(event) => handleChange('attendance', event.target.value)}
                className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
              >
                <option value="">Select</option>
                <option value="attending">Joyfully attending</option>
                <option value="declining">Regretfully declining</option>
              </select>
            </label>
          </div>

          {form.attendance === 'attending' ? (
            <div>
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">
                Which ceremonies will you join?
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {schedule.map((item) => {
                  const value = item.ceremony.toLowerCase() as Ceremony;
                  const checked = form.ceremonies.includes(value);
                  return (
                    <label
                      key={item.ceremony}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                        checked ? 'border-gold bg-gold/10' : 'border-plum/15 bg-[#fffaf7]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCeremony(value)}
                        className="h-4 w-4 accent-maroon"
                      />
                      <span>
                        <span className="block font-display text-lg text-maroon">{item.ceremony}</span>
                        <span className="block text-xs text-plum/60">
                          {item.day}, {item.date}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 md:grid-cols-[150px_1fr]">
            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Country</span>
              <select
                value={form.countryCode}
                onChange={(event) => handleChange('countryCode', event.target.value)}
                className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Phone number</span>
              <input
                value={form.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
                placeholder={form.countryCode === '+91' ? '9876543210' : '4155552671'}
                inputMode="numeric"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Guests</span>
              <select
                value={form.guestCount}
                onChange={(event) => handleChange('guestCount', event.target.value)}
                className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
              </select>
            </label>

            <div className="rounded-xl border border-dashed border-gold/40 bg-cream/50 p-4 text-sm text-plum/70">
              <p className="font-medium text-plum">Tip</p>
              <p className="mt-2">Use E.164 format: +91 or +1 followed by 10 digits.</p>
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-plum/70">Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => handleChange('notes', event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-plum/15 bg-[#fffaf7] px-4 py-3 outline-none transition focus:border-gold"
              placeholder="Dietary preferences or special requests"
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-gradient-to-r from-maroon to-maroon-dark px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ivory shadow-gold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Submitting…' : 'Submit RSVP'}
          </button>
        </form>
      )}
    </motion.div>
  );
}


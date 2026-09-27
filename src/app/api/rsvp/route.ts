import { NextResponse } from 'next/server';
import { z } from 'zod';

import { validatePhone } from '@/lib/phone';
import { appendRsvpRow } from '@/lib/sheets';

const rsvpSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(1).max(20),
  countryCode: z.string().trim().min(1).max(5),
  attendance: z.enum(['attending', 'declining']),
  ceremonies: z.array(z.enum(['nikkah', 'walima'])).max(2),
  guestCount: z.string().trim().min(1).max(2),
  notes: z.string().trim().max(500).optional().default(''),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const data = parsed.data;

  if (!validatePhone(data.phone, data.countryCode)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
  }

  if (data.attendance === 'attending' && data.ceremonies.length === 0) {
    return NextResponse.json(
      { error: 'Please select at least one ceremony you will be attending.' },
      { status: 400 },
    );
  }

  try {
    await appendRsvpRow([
      new Date().toISOString(),
      data.fullName,
      data.attendance,
      data.ceremonies.join(', '),
      `${data.countryCode} ${data.phone}`,
      data.guestCount,
      data.notes ?? '',
    ]);
  } catch (error) {
    console.error('Failed to save RSVP to Google Sheets', error);
    return NextResponse.json(
      { error: 'We could not save your RSVP right now. Please try again shortly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

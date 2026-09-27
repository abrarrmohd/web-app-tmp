import { RsvpForm } from '@/components/rsvp-form';

export default function RsvpPage() {
  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(200,153,47,0.14),_transparent_45%),linear-gradient(180deg,#fffaf3_0%,#fbf1de_60%)] px-6 py-16 text-plum md:px-10">
      <RsvpForm />
    </main>
  );
}

import { FamiliesSection } from '@/components/families-section';
import { ScheduleSection } from '@/components/schedule-section';
import { CountdownSection } from '@/components/countdown-section';
import { FooterSection } from '@/components/footer-section';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-plum bg-[#faeedf] overflow-x-hidden">

      {/* Background gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,153,47,0.16),_transparent_42%)] z-0 pointer-events-none" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f6d9d1]/60 blur-3xl z-0 pointer-events-none" />

      {/* Content sections */}
      <div className="pattern-floral relative z-10 flex w-full flex-col items-center bg-ivory/40">
        <FamiliesSection />
        <div className="divider-gold w-full max-w-2xl" />
        <ScheduleSection />
        <CountdownSection />
        <div className="divider-gold w-full max-w-2xl" />
        <FooterSection />
      </div>
    </main>
  );
}
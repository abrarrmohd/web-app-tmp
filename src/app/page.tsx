import { HeroSection } from '@/components/hero-section';
import { FamiliesSection } from '@/components/families-section';
import { InvitationSection } from '@/components/invitation-section';
import { CountdownSection } from '@/components/countdown-section';
import { FooterSection } from '@/components/footer-section';

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      <HeroSection />
      <FamiliesSection />
      <InvitationSection />
      <CountdownSection />
      <FooterSection />
    </main>
  );
}

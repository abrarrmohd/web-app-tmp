import './globals.css';
import type { Metadata, Viewport } from 'next';
import { InkFilters } from '@/components/ink';

export const metadata: Metadata = {
  title: 'Naafia & Abrar | Nikkah & Walima',
  description:
    'Join us as we celebrate the Nikkah and Walima of Naafia & Abrar in Chennai. RSVP online to be part of our special day.',
};

export const viewport: Viewport = {
  themeColor: '#f3ebdd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InkFilters />
        {children}
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abrar & Naafia | Nikkah & Walima',
  description:
    'Join us as we celebrate the Nikkah and Walima of Abrar & Naafia in Chennai. RSVP online to be part of our special day.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

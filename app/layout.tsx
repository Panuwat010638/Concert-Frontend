import type { Metadata } from 'next';
import { Roboto, Inter } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Concert Booking System',
  description: 'Book your favorite concert tickets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${inter.variable}`}>{children}</body>
    </html>
  );
}

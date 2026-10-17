import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { pages } from '../components/types';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans bg-white text-[#0c1713]">
        {children}
      </body>
    </html>
  );
}

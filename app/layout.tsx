import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SupaTyper - Improve Your Typing Skills',
  description: 'Practice typing with topic-based paragraphs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-primary`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}

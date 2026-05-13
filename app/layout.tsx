import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'APEX Analytics | Elite Performance tracking',
  description: 'AI-driven high-performance sports analytics platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} antialiased selection:bg-primary/30 selection:text-primary flex min-h-screen bg-background overflow-x-hidden`} suppressHydrationWarning>
        <Sidebar className="hidden md:flex" />
        <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <BottomNav className="md:hidden" />
        </div>
      </body>
    </html>
  );
}

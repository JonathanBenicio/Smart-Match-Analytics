import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
       <body className="bg-[#0A0A0A] text-[#FAFAFA] min-h-screen font-sans selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}

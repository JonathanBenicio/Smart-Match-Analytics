'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, BarChart2, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("fixed bottom-0 left-0 right-0 bg-surface-container/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex justify-around items-center z-50", className)}>
      <NavBtn href="/" icon={<Home className="w-5 h-5" />} label="Home" active={pathname === '/'} />
      <NavBtn href="/library" icon={<PlaySquare className="w-5 h-5" />} label="Library" active={pathname === '/library'} />
      
      <button className="bg-primary hover:bg-primary-fixed-dim text-on-primary-fixed p-3 rounded-full -translate-y-5 shadow-[0_0_15px_rgba(75,226,119,0.3)] active:scale-95 transition-transform">
        <Plus className="w-6 h-6" />
      </button>

      <NavBtn href="/analysis" icon={<BarChart2 className="w-5 h-5" />} label="Analysis" active={pathname === '/analysis'} />
      <NavBtn href="#" icon={<User className="w-5 h-5" />} label="Profile" />
    </nav>
  );
}

function NavBtn({ icon, label, active, href }: { icon: React.ReactNode; label: string; active?: boolean; href: string }) {
  return (
    <Link href={href} className={cn("flex flex-col items-center gap-1", active ? "text-primary" : "text-on-surface-variant")}>
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </Link>
  );
}

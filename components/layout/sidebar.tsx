'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, BarChart2, Settings, Upload, HelpCircle, LogOut, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("fixed left-0 top-0 bottom-0 w-64 bg-surface-container border-r border-white/10 flex flex-col py-6 z-50", className)}>
      <div className="px-4 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-on-primary font-bold" />
          </div>
          <h1 className="font-display text-xl text-primary font-bold tracking-tight uppercase">Apex Analytics</h1>
        </div>
        <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold ml-10">Elite Analysis</p>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem href="/" icon={<Home className="w-5 h-5" />} label="Home" />
        <NavItem href="/library" icon={<PlaySquare className="w-5 h-5" />} label="Video Library" active={pathname === '/library'} />
        <NavItem href="/analysis" icon={<BarChart2 className="w-5 h-5" />} label="Match Analysis" active={pathname === '/analysis'} />
        <NavItem href="#" icon={<Settings className="w-5 h-5" />} label="Settings" />
      </nav>

      <div className="px-4 mt-auto">
        <button className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-6 shadow-lg shadow-primary/10">
          <Upload className="w-4 h-4" />
          Upload Match
        </button>

        <div className="space-y-1">
          <NavItem href="#" icon={<HelpCircle className="w-5 h-5" />} label="Help" />
          <NavItem href="#" icon={<LogOut className="w-5 h-5" />} label="Logout" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 transition-all duration-200",
        active 
          ? "bg-primary/10 text-primary border-r-4 border-primary font-bold" 
          : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface font-semibold"
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

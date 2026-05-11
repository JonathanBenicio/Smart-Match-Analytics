import { Search, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-4 md:px-8 py-3 w-full">
      <div className="flex flex-col md:hidden">
        <span className="font-display text-lg tracking-tighter text-primary font-bold">APEX</span>
      </div>
      
      <div className="hidden md:flex flex-col">
        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">System Status</span>
        <span className="text-xs text-primary font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse blur-[1px]"></span>
          All clusters operational
        </span>
      </div>

      <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <NavLink href="#" label="Comparative Reports" />
        <NavLink href="#" label="Live Feeds" />
        <NavLink href="/" label="Match Analysis" active />
        <NavLink href="#" label="Archive" />
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-white/5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <Search className="w-4 h-4 text-on-surface-variant mr-2" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-48 text-on-surface placeholder:text-on-surface-variant"
          />
        </div>
        
        <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors active:scale-95">
          <Bell className="w-5 h-5" />
        </button>
        <button className="hidden md:block p-1.5 text-on-surface-variant hover:text-primary transition-colors active:scale-95">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/40 relative">
          <Image 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
            alt="Profile Avatar"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`text-sm font-bold transition-colors ${
        active 
          ? "text-primary border-b-2 border-primary pb-1 font-display" 
          : "text-on-surface-variant hover:text-on-surface font-body"
      }`}
    >
      {label}
    </Link>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { TacticalRadar } from '@/components/charts/tactical-radar';
import { Download, Users, Target, Zap, Info, Play, Crosshair, Layers, ChevronRight, Loader2, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('lastAnalysis');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse data", e);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const hasData = !!data;
  const displayData = {
    title: data?.title || 'Tactical Dashboard',
    date: data?.date || 'No analysis data',
    matchType: data?.matchType || 'NONE',
    possession: data?.possession || '--%',
    xg: data?.xg || '0.00',
    summary: data?.summary || 'Upload a video on the home page to begin extraction.',
    visualReasoning: data?.raciocinio_visual || '',
    playerStats: Array.isArray(data?.playerStats) && data.playerStats.length > 0 ? data.playerStats : (hasData ? [] : []),
    playerPositions: Array.isArray(data?.playerPositions) ? data.playerPositions : []
  };

  const defaultPlayerStats = [
    { num: "09", name: "Player Alpha", role: "Forward", rating: "8.2", passes: "12/15", int: "1", speed: "Sprint 22km/h", efficiency: 80 },
    { num: "05", name: "Player Beta", role: "Defender", rating: "7.5", passes: "22/24", int: "4", speed: "Jog 12km/h", efficiency: 90 },
  ];

  const statsToShow = displayData.playerStats.length > 0 ? displayData.playerStats : (hasData ? [] : defaultPlayerStats);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.25em] mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Tactical Analysis Live
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-on-surface uppercase tracking-tighter leading-none">
            {displayData.title}
          </h1>
          <p className="text-on-surface-variant font-bold text-[10px] mt-2 uppercase tracking-widest">{displayData.date}</p>
        </div>
        
        <div className="flex gap-3">
          <Link href="/" className="glass-panel px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">New Analysis</Link>
          <button className="bg-primary text-black px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] transition-all">
             <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Viewport */}
        <div className="md:col-span-12 xl:col-span-9 space-y-8">
          <div className="glass-panel aspect-[16/9] rounded-3xl relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-0"></div>
            
            {/* Pitch Overlay Integration */}
            <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none">
               <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full"></div>
               <div className="absolute left-0 top-1/4 bottom-1/4 w-12 border-r border-y border-white/10"></div>
               <div className="absolute right-0 top-1/4 bottom-1/4 w-12 border-l border-y border-white/10"></div>
            </div>

            {/* AI Extracted Data Points */}
            <div className="absolute inset-0 z-10 w-full h-full">
              {displayData.playerPositions.length > 0 ? (
                displayData.playerPositions.map((pos: any, idx: number) => (
                  <PlayerDot 
                    key={idx} 
                    top={`${pos.y}%`} 
                    left={`${pos.x}%`} 
                    color={pos.team === 'A' ? 'primary' : 'secondary'} 
                    label={pos.id}
                  />
                ))
              ) : !hasData && (
                <>
                  <PlayerDot top="40%" left="30%" color="primary" label="10" />
                  <PlayerDot top="60%" left="70%" color="secondary" label="05" />
                  <PlayerDot top="35%" left="65%" color="secondary" label="04" />
                  <PlayerDot top="75%" left="25%" color="primary" label="09" />
                </>
              )}
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
               <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Play className="fill-primary text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase mb-0.5">Footage Source</div>
                    <div className="text-sm font-bold uppercase tracking-tight">{displayData.matchType} FEED</div>
                  </div>
               </div>
               
               <div className="flex gap-2">
                 <ControlButton icon={<Crosshair />} />
                 <ControlButton icon={<Layers />} />
                 <ControlButton icon={<Users />} />
               </div>
            </div>
            
            <Image 
               src="https://picsum.photos/seed/sports/1920/1080" 
               alt="Match Feed"
               fill
               className="object-cover grayscale-[0.3] brightness-[0.7]"
               referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden">
               <div className="flex items-center gap-2 mb-6">
                 <div className="p-2 bg-primary/10 rounded-lg"><BrainCircuit className="w-4 h-4 text-primary" /></div>
                 <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface">Tactical Extract</h2>
               </div>
               <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                  {displayData.summary}
               </p>
               {displayData.visualReasoning && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">AI Context</span>
                    <p className="text-xs text-on-surface-variant italic mt-1">{displayData.visualReasoning.substring(0, 150)}...</p>
                  </div>
               )}
            </div>
            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center">
               <div className="text-center space-y-2">
                  <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Pressing Intensity</div>
                  <div className="text-6xl font-display font-black text-secondary">{data?.pressingIntensity || '0'}</div>
                  <div className="text-[10px] font-bold text-secondary uppercase">Scale 1-10</div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-12 xl:col-span-3 space-y-6">
          <StatCard title="Possession" value={displayData.possession} icon={<Zap />} color="primary" trend="AI DERIVED" />
          <StatCard title="xG" value={displayData.xg} icon={<Target />} color="secondary" desc="EFFICIENCY MODEL" />
          
          <Link href="/analysis/report" className="glass-panel p-6 rounded-2xl border-t-2 border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-3">
             <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Detailed Analysis</div>
             <div className="text-xl font-display font-black text-on-surface uppercase tracking-tight">Full Match Report</div>
             <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
          </Link>

          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Individual Metrics</h3>
              <Info className="w-3 h-3 text-on-surface-variant" />
            </div>
            
            <div className="space-y-4">
              {statsToShow.map((p: any, i: number) => (
                <PlayerRow key={i} {...p} active={i === 0} />
              ))}
              {statsToShow.length === 0 && (
                <div className="text-center py-8 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">No detailed player data found</div>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl h-[250px] relative overflow-hidden">
             <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest text-center mb-4">Symmetry Radar</h3>
             <TacticalRadar />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerDot({ top, left, color = 'primary', label }: { top: string, left: string, color?: 'primary' | 'secondary', label?: string }) {
  return (
    <div 
      className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-20 group"
      style={{ top, left }}
    >
      <div className={`w-full h-full rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] ${color === 'primary' ? 'bg-primary' : 'bg-secondary'}`}></div>
      {label && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 bg-black/80 rounded text-[8px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ID: {label}
        </div>
      )}
    </div>
  );
}

function ControlButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="glass-panel p-3 rounded-xl text-on-surface hover:text-primary transition-colors hover:scale-110 transition-transform">
      {icon}
    </button>
  );
}

function StatCard({ title, value, icon, color, trend, desc }: { title: string, value: string, icon: React.ReactNode, color: 'primary' | 'secondary', trend?: string, desc?: string }) {
  const colors = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20'
  }
  return (
    <div className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:bg-white/[0.05] transition-all">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${colors[color]} border`}>{icon}</div>
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{title}</div>
        </div>
        <div>
          <div className="text-4xl font-display font-black text-on-surface leading-none">{value}</div>
          {trend && <div className="text-[8px] font-bold text-primary mt-1 uppercase tracking-widest">{trend}</div>}
          {desc && <div className="text-[8px] font-bold text-on-surface-variant mt-1 uppercase tracking-widest">{desc}</div>}
        </div>
      </div>
    </div>
  );
}

function PlayerRow({ num, name, role, rating, passes, int, speed, efficiency, active }: any) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${active ? 'bg-primary/10 border-primary/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${active ? 'bg-primary text-black' : 'bg-surface text-on-surface-variant border border-white/10'}`}>
          {num}
        </div>
        <div>
          <div className="text-xs font-bold text-on-surface uppercase truncate max-w-[80px]">{name}</div>
          <div className="text-[8px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">{role}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-display font-black tracking-tighter ${active ? 'text-primary' : 'text-on-surface'}`}>{rating}</div>
        <div className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">{speed}</div>
      </div>
    </div>
  );
}

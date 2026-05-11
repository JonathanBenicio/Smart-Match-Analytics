'use client';

import { useState, useEffect } from 'react';
import { TacticalRadar } from '@/components/charts/tactical-radar';
import { Download, Users, Target, Zap, Info, Play, Crosshair, Layers, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('lastAnalysis');
    if (saved) {
      setData(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const displayData = data || {
    title: 'London titans vs. madrid eagles',
    date: 'Premier League Week 24 • Emirates Stadium • 2024-03-15',
    matchType: 'PROFESSIONAL',
    possession: '64%',
    xg: '2.84',
    summary: '"Marcus Vane is operating at 92% pass accuracy. His positioning in the final third has created 4 high-probability scoring chances in the last 15 minutes."',
    playerStats: [
      { num: "10", name: "Marcus Vane", role: "Midfielder", rating: "9.4", passes: "88/94", int: "12", speed: "32.4", efficiency: 92, color: "text-primary" },
      { num: "04", name: "Erik Larsen", role: "Defender", rating: "8.1", passes: "42/48", int: "18", speed: "29.1", efficiency: 84, color: "text-secondary" },
      { num: "07", name: "Luca Modric", role: "Forward", rating: "7.8", passes: "65/78", int: "04", speed: "31.8", efficiency: 75, color: "text-on-surface-variant" },
      { num: "21", name: "S. Grealish", role: "Winger", rating: "7.2", passes: "30/41", int: "02", speed: "34.1", efficiency: 55, color: "text-error" },
    ]
  };

  return (
    <div className="max-w-container-max mx-auto p-4 md:p-6 lg:p-8 space-y-8 w-full select-none pb-24 md:pb-8">
      
      {/* Team Toggle & Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight capitalize">
              {displayData.title}
            </h1>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest border border-white/10 ${
              displayData.matchType === 'PROFESSIONAL' ? 'bg-primary/20 text-primary border-primary/20' : 
              displayData.matchType === 'AMATEUR' ? 'bg-secondary/20 text-secondary border-secondary/20' : 
              'bg-surface-container-highest text-on-surface-variant'
            }`}>
              {displayData.matchType}
            </span>
          </div>
          <p className="text-on-surface-variant font-body mt-1 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mb-0.5"></span>
            {displayData.date}
          </p>
        </div>
        
        <div className="flex bg-surface-container p-1 rounded-xl border border-white/10 shadow-inner">
          <button className="px-6 py-2 text-xs font-bold rounded-lg text-on-primary bg-primary-container shadow-sm transition-all duration-200">
            LONDON TITANS
          </button>
          <button className="px-6 py-2 text-xs font-bold rounded-lg text-on-surface-variant hover:text-on-surface transition-all duration-200">
            MADRID EAGLES
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        
        {/* Left Column: Players List */}
        <div className="md:col-span-4 xl:col-span-3 space-y-6 flex flex-col">
          <div className="glass-panel p-4 rounded-xl flex-1 flex flex-col border-t-2 border-t-surface-container-highest">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
              <h3 className="font-display text-lg tracking-tight text-primary font-bold">Starters</h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {displayData.playerStats.map((p: any, i: number) => (
                <PlayerRow key={i} {...p} active={i === 0} />
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-white/5 rounded-lg text-xs font-bold text-on-surface-variant hover:bg-white/5 transition-colors flex justify-center items-center gap-1 group">
              VIEW FULL SQUAD <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mini Insight */}
          <div className="glass-panel p-5 rounded-xl neon-glow-secondary border-l-4 border-l-secondary relative overflow-hidden group hover:border-l-primary transition-colors">
            <div className="absolute top-0 right-0 -m-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
            <h4 className="font-bold text-xs text-secondary mb-2 uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
              <Info className="w-3 h-3" /> In-Game Insight
            </h4>
            <p className="text-xs text-on-surface-variant italic leading-relaxed">
              &quot;{displayData.summary}&quot;
            </p>
          </div>
        </div>

        {/* Center Column: Heatmap & Table */}
        <div className="md:col-span-8 xl:col-span-6 space-y-6 flex flex-col">
          
          {/* Heatmap Area */}
          <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden relative aspect-[16/9] md:aspect-auto md:h-[350px] shadow-2xl group">
            <div className="absolute inset-0 heatmap-gradient opacity-90 mix-blend-screen"></div>
            
            {/* Fake Pitch Markings */}
            <div className="absolute inset-4 border border-white/10 pointer-events-none rounded outline outline-1 outline-offset-4 outline-white/5">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full"></div>
              <div className="absolute left-0 top-1/4 bottom-1/4 w-12 border-r border-y border-white/10"></div>
              <div className="absolute right-0 top-1/4 bottom-1/4 w-12 border-l border-y border-white/10"></div>
            </div>

            {/* Simulated Data Points */}
            <PlayerDot top="40%" left="30%" />
            <PlayerDot top="60%" left="70%" />
            <PlayerDot top="35%" left="65%" color="secondary" />
            <PlayerDot top="75%" left="25%" color="secondary" />

            <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
              <ControlButton icon={<Crosshair />} />
              <ControlButton icon={<Layers />} />
              <ControlButton icon={<Play />} />
            </div>
          </div>

          {/* Stats Table */}
          <div className="glass-panel border-t-2 border-t-outline-variant rounded-xl overflow-hidden flex-1 flex flex-col">
            <div className="bg-white/5 px-5 py-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-display text-lg text-on-surface font-bold tracking-tight">Statistical Breakdown</h3>
              <button className="text-primary hover:text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-primary/20 px-2.5 py-1 rounded-sm hover:border-primary">
                Export <Download className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-white/5 bg-surface-container/50">
                    <th className="px-5 py-4">Player</th>
                    <th className="px-5 py-4">Passes</th>
                    <th className="px-5 py-4">Int.</th>
                    <th className="px-5 py-4">Max Speed</th>
                    <th className="px-5 py-4 min-w-[200px]">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {displayData.playerStats.map((p: any, i: number) => (
                    <TableRow key={i} {...p} color={i % 2 === 0 ? "bg-primary" : "bg-secondary"} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Key Metrics */}
        <div className="md:col-span-12 xl:col-span-3 space-y-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 items-start content-start">
          <StatCard title="Possession" value={displayData.possession} icon={<Zap />} color="primary" trend="+4.2% VS AVG" />
          <StatCard title="XG" value={displayData.xg} icon={<Target />} color="secondary" desc="HIGH EFFICIENCY" />
          <div className="glass-panel p-5 rounded-xl md:col-span-3 xl:col-span-1 border-t-2 border-t-white/10 relative overflow-hidden group">
            <h3 className="font-bold text-xs text-on-surface mb-6 uppercase tracking-widest text-center">Tactical Symmetry</h3>
            <div className="aspect-square relative -m-4">
              <TacticalRadar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerDot({ top, left, color = 'primary' }: { top: string; left: string; color?: 'primary' | 'secondary' }) {
  const bgClass = color === 'primary' ? 'bg-primary shadow-[0_0_15px_#4be277]' : 'bg-secondary shadow-[0_0_15px_#adc6ff]';
  return (
    <div className={`absolute w-2.5 h-2.5 rounded-full z-10 ${bgClass}`} style={{ top, left }}></div>
  );
}

function ControlButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="bg-surface/50 backdrop-blur-md p-2 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-on-surface-variant hover:text-white [&>svg]:w-4 [&>svg]:h-4">
      {icon}
    </button>
  );
}

function PlayerRow({ num, name, role, rating, color, active }: { num: string; name: string; role: string; rating: string; color: string; active?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-2.5 hover:bg-white/5 transition-colors group rounded-lg ${active ? 'bg-white/5' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg ${active ? 'bg-primary/20 border-primary/50' : 'bg-surface-container border-white/5'} border flex items-center justify-center font-bold text-xs ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{num}</div>
        <div>
          <div className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{name}</div>
          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">{role}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-stats text-xl ${color}`}>{rating}</div>
      </div>
    </div>
  );
}

function TableRow({ name, passes, int, speed, eff, color }: { name: string; passes: string; int: string; speed: string; eff: number; color: string }) {
  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-5 py-4 font-bold text-on-surface group-hover:text-primary transition-colors">{name}</td>
      <td className="px-5 py-4 text-on-surface-variant font-mono text-xs">{passes}</td>
      <td className="px-5 py-4 text-on-surface-variant">{int}</td>
      <td className="px-5 py-4 text-on-surface-variant">{speed} km/h</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex">
            <div className={`h-full ${color}`} style={{ width: `${eff}%` }}></div>
          </div>
          <span className="text-[10px] font-bold opacity-50">{eff}%</span>
        </div>
      </td>
    </tr>
  );
}

function StatCard({ title, value, icon, color, trend, desc }: { title: string; value: string; icon: React.ReactNode; color: 'primary' | 'secondary' | 'tertiary'; trend?: string; desc?: string }) {
  const textColors = { primary: 'text-primary', secondary: 'text-secondary', tertiary: 'text-tertiary' };
  const borderColors = { primary: 'border-t-primary', secondary: 'border-t-secondary', tertiary: 'border-t-tertiary' };

  return (
    <div className={`glass-panel border-t-2 ${borderColors[color]} p-5 rounded-xl hover:-translate-y-1 transition-transform`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">{title}</span>
        <div className={`${textColors[color]} [&>svg]:w-5 [&>svg]:h-5 opacity-80`}>{icon}</div>
      </div>
      <div className={`font-display text-4xl font-extrabold ${textColors[color]} mb-3 tracking-tighter text-glow truncate`}>{value}</div>
      {trend && <div className={`text-[9px] font-bold uppercase tracking-widest ${textColors[color]}`}>{trend}</div>}
      {desc && <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">{desc}</div>}
    </div>
  );
}

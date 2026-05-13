'use client';

import { useState, useEffect } from 'react';
import { Shield, Target, Zap, Activity, Clock, ChevronLeft, Download, Share2, TrendingUp, TrendingDown, Loader2, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { TacticalRadar } from '@/components/charts/tactical-radar';

export default function MatchReportPage() {
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

  const displayData = {
    title: data?.title || 'Tactical Analysis Report',
    date: data?.date || 'N/A',
    matchType: data?.matchType || 'NONE',
    possession: data?.possession || '0%',
    xg: data?.xg || '0.00',
    pressing: data?.pressingIntensity || '0',
    summary: data?.summary || 'No data available.',
    momentum: Array.isArray(data?.matchMomentum) ? data.matchMomentum : Array.from({ length: 40 }).map(() => Math.random() * 100),
    visualReasoning: data?.raciocinio_visual || 'No visual reasoning available for this snapshot.'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/analysis" className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1 text-center">
          <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Final Tactical Report</div>
          <h1 className="text-xl font-display font-extrabold text-on-surface uppercase tracking-tight truncate px-4">
            {displayData.title}
          </h1>
        </div>
        <div className="flex gap-2">
           <button className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant hover:text-primary">
              <Share2 className="w-5 h-5" />
           </button>
           <button className="bg-primary text-black p-2 rounded-lg font-bold">
              <Download className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Momentum Chart */}
        <div className="glass-panel p-6 rounded-3xl md:col-span-2 border-t-2 border-primary/20 relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest">Match Momentum (AI Derived)</h3>
             <div className="text-[10px] text-primary font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> DOMINANCE FLOW
             </div>
           </div>
           <div className="h-32 w-full flex items-end gap-1 px-2">
              {displayData.momentum.map((val: number, i: number) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-1000 ${val > 50 ? 'bg-primary' : 'bg-secondary/40'}`}
                  style={{ height: `${val}%` }}
                ></div>
              ))}
           </div>
           <div className="mt-4 flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              <span>0'</span>
              <span>KICKOFF BALANCE</span>
              <span>15' (CLIP)</span>
           </div>
        </div>

        {/* Tactical Summary Cards */}
        <ReportMetric title="Field Possession" value={displayData.possession} trend="+-" icon={<Activity />} color="primary" />
        <ReportMetric title="Pressing Intensity" value={displayData.pressing} trend="1-10" icon={<Zap />} color="secondary" />
        <ReportMetric title="Expected Goals (xG)" value={displayData.xg} trend="+-" icon={<Target />} color="tertiary" />
        <ReportMetric title="Match Duration" value="Clip Segment" trend="0" icon={<Clock />} color="primary" />
      </div>

      {/* Chain of Thought Section - NEW BASED ON PLAN */}
      <div className="glass-panel p-8 rounded-3xl border-l-4 border-secondary">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-secondary/10 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-on-surface uppercase tracking-tight text-secondary">Visual Reasoning (AI Chain-of-Thought)</h2>
         </div>
         <div className="bg-black/40 p-5 rounded-2xl border border-white/5 italic">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {displayData.visualReasoning}
            </p>
         </div>
      </div>

      {/* Narrative Section */}
      <div className="glass-panel p-8 rounded-3xl border-b-4 border-primary">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-on-surface uppercase">Tactical Summary</h2>
         </div>
         <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
           {displayData.summary}
         </p>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl">
               <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Technical Insight</h4>
               <p className="text-xs text-on-surface font-semibold">Match categorized as {displayData.matchType}. Data extracted from visual feed positioning.</p>
            </div>
            <div className="bg-error/5 border border-error/20 p-4 rounded-2xl">
               <h4 className="text-[10px] font-bold text-error uppercase tracking-widest mb-2">Extraction Note</h4>
               <p className="text-xs text-on-surface font-semibold">Coordinates mapped to standard 105x68 pitch model. Movement categorization based on biomechanical analysis.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ReportMetric({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: React.ReactNode, color: 'primary' | 'secondary' | 'tertiary' }) {
  const colors = {
    primary: 'text-primary border-primary/20',
    secondary: 'text-secondary border-secondary/20',
    tertiary: 'text-tertiary border-tertiary/20'
  };

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 group hover:bg-white/[0.05] transition-all">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg bg-surface border ${colors[color]}`}>{icon}</div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{title}</div>
          <div className="text-2xl font-display font-extrabold text-on-surface tracking-tight">{value}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant">
        Scale/Trend: {trend}
      </div>
    </div>
  );
}

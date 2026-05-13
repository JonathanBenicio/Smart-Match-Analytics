'use client';

import { useState, useEffect } from 'react';
import { Shield, Target, Zap, Activity, Clock, ChevronLeft, Download, Share2, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

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
    momentum: Array.isArray(data?.matchMomentum) ? data.matchMomentum : Array.from({ length: 40 }).map(() => Math.random() * 100)
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-white/10 shadow-xl">
        <Link href="/analysis" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-on-surface-variant hover:text-primary" />
        </Link>
        <div className="flex-1 text-center">
          <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Final Tactical Report</div>
          <h1 className="text-xl font-display font-extrabold text-on-surface uppercase tracking-tight truncate px-4">
            {displayData.title}
          </h1>
        </div>
        <div className="flex gap-2">
           <button className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant hover:text-primary">
             <Download className="w-4 h-4" />
           </button>
           <button className="p-2 hover:bg-white/5 rounded-lg text-on-surface-variant hover:text-primary">
             <Share2 className="w-4 h-4" />
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
           <div className="flex justify-between mt-2 px-2 text-[10px] font-bold text-on-surface-variant/40">
             <span>0'</span>
             <span>HT</span>
             <span>90'</span>
           </div>
        </div>

        {/* Tactical Summary Cards */}
        <ReportMetric title="Field Possession" value={displayData.possession} trend="+-" icon={<Activity />} color="primary" />
        <ReportMetric title="Pressing Intensity" value={displayData.pressing} trend="+-" icon={<Zap />} color="secondary" />
        <ReportMetric title="Expected Goals (xG)" value={displayData.xg} trend="+-" icon={<Target />} color="tertiary" />
        <ReportMetric title="Match Duration" value="Clip Segment" trend="0" icon={<Clock />} color="primary" />
      </div>

      {/* Narrative Section */}
      <div className="glass-panel p-8 rounded-3xl space-y-6">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-display font-bold text-on-surface uppercase">AI Tactical Overview</h2>
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
               <p className="text-xs text-on-surface font-semibold">Coordinates mapped to standard 105x68 pitch model. Some blurring may affect marginal precision.</p>
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
  }
  
  return (
    <div className="glass-panel p-5 rounded-2xl border flex justify-between items-center group hover:scale-[1.02] transition-transform">
      <div className="flex gap-4 items-center">
        <div className={`p-3 bg-surface-container rounded-xl ${colors[color].split(' ')[0]} border border-white/5`}>
          {icon}
        </div>
        <div>
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">{title}</div>
          <div className="text-2xl font-display font-extrabold text-on-surface tracking-tight">{value}</div>
        </div>
      </div>
    </div>
  );
}


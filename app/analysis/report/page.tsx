'use client';

import { Shield, Target, Zap, Activity, Clock, ChevronLeft, Download, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function MatchReportPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl border border-white/10 shadow-xl">
        <Link href="/analysis" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-on-surface-variant hover:text-primary" />
        </Link>
        <div className="flex-1 text-center">
          <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Final Tactical Report</div>
          <h1 className="text-xl font-display font-extrabold text-on-surface uppercase tracking-tight">Titans 2 - 1 Eagles</h1>
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
        
        {/* Momentum Chart Simulation */}
        <div className="glass-panel p-6 rounded-3xl md:col-span-2 border-t-2 border-primary/20 relative overflow-hidden">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest">Match Momentum</h3>
             <div className="text-[10px] text-primary font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> DOMINANCE ACCELERATION
             </div>
           </div>
           <div className="h-32 w-full flex items-end gap-1 px-2">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-1000 ${i > 25 ? 'bg-primary' : 'bg-secondary/40'}`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
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
        <ReportMetric title="Field Dominance" value="58%" trend="+12" icon={<Activity />} color="primary" />
        <ReportMetric title="Defensive Stability" value="82.4" trend="-5" icon={<Shield />} color="secondary" />
        <ReportMetric title="Offensive Threat" value="1.92" trend="+0.4" icon={<Target />} color="tertiary" />
        <ReportMetric title="Pressing Success" value="64%" trend="+8" icon={<Zap />} color="primary" />
      </div>

      {/* Narrative Section */}
      <div className="glass-panel p-8 rounded-3xl space-y-6">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-display font-bold text-on-surface uppercase">AI Tactical Overview</h2>
         </div>
         <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
           London Titans maintained a high block throughout the first half, exploiting Madrid's wing-backs. 
           The inclusion of <span className="text-primary font-bold">Marcus Vane</span> shifted the momentum drastically at the 35th minute. 
           Defensively, the team showed resilience but remains vulnerable to quick transitions in the central corridor.
         </p>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl">
               <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Key Strength</h4>
               <p className="text-xs text-on-surface font-semibold">High-intensity gegenpressing in the middle third forced 14 turnovers in crucial areas.</p>
            </div>
            <div className="bg-error/5 border border-error/20 p-4 rounded-2xl">
               <h4 className="text-[10px] font-bold text-error uppercase tracking-widest mb-2">Tactical Weakness</h4>
               <p className="text-xs text-on-surface font-semibold">Over-extension of full-backs during set pieces created 3 high-probability counters for the opposition.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ReportMetric({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: React.ReactNode, color: 'primary' | 'secondary' | 'tertiary' }) {
  const isPositive = trend.startsWith('+');
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
      <div className={`flex items-center gap-1 text-[10px] font-bold ${isPositive ? 'text-primary' : 'text-error'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trend}%
      </div>
    </div>
  );
}

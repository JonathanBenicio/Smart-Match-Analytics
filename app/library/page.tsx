'use client';

import { useState, useEffect } from 'react';
import { Play, Search, Filter, Calendar, Users, ChevronRight, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';

const staticMatches = [
  { id: '1', title: 'LONDON TITANS VS MADRID EAGLES', date: '2024-03-15', type: 'PROFESSIONAL', possession: '64%', xg: '2.84', rating: '9.4' },
  { id: '2', title: 'TRAINING SESSION: HIGH PRESS', date: '2024-03-10', type: 'PRACTICE', possession: '52%', xg: '1.12', rating: '7.8' },
];

export default function LibraryPage() {
  const [dynamicMatches, setDynamicMatches] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lastAnalysis');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDynamicMatches([{ ...parsed, id: 'recent', date: parsed.date || 'Recent' }]);
    }
  }, []);

  const allMatches = [...dynamicMatches, ...staticMatches];

  return (
    <div className="min-h-screen p-6 md:p-12 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-3">Tactical Archive</div>
          <h1 className="text-4xl font-display font-black text-on-surface uppercase tracking-tighter">Match Library</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button className="p-2 bg-primary text-black rounded-lg shadow-lg"><LayoutGrid className="w-4 h-4" /></button>
            <button className="p-2 text-on-surface-variant hover:text-primary"><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allMatches.map((match) => (
          <Link href="/analysis" key={match.id} className="group relative glass-panel rounded-[32px] p-2 hover:border-primary/40 transition-all">
            <div className="aspect-video rounded-[24px] overflow-hidden relative">
               <img src={`https://picsum.photos/seed/${match.id}/600/400`} alt="" className="w-full h-full object-cover grayscale-[0.4] group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-[8px] font-black tracking-widest text-primary border-primary/20">
                 {match.type}
               </div>
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary transition-colors">
                    <Play className="w-4 h-4 text-white group-hover:text-black fill-current" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase">Player Rating</div>
                    <div className="text-xl font-display font-black text-primary">{match.rating}</div>
                  </div>
               </div>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <h3 className="font-display font-black text-lg text-on-surface uppercase leading-tight group-hover:text-primary transition-colors">
                    {match.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 text-on-surface-variant" />
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{match.date}</span>
                  </div>
               </div>
               <div className="flex gap-4 pt-2">
                  <div className="flex-1 text-center py-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-[8px] font-bold text-on-surface-variant uppercase mb-1">Possession</div>
                    <div className="text-sm font-bold text-on-surface">{match.possession}</div>
                  </div>
                  <div className="flex-1 text-center py-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-[8px] font-bold text-on-surface-variant uppercase mb-1">Total xG</div>
                    <div className="text-sm font-bold text-on-surface">{match.xg}</div>
                  </div>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

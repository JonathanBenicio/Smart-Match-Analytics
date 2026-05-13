'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Filter, Play, Clock, CheckCircle2, AlertCircle, Calendar, Users, ExternalLink, MoreVertical, X, Upload, Youtube, Loader2, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analyzeVideoFootage } from '@/lib/analysis-service';

const matches = [
  {
    id: '1',
    title: 'London Titans vs Madrid Eagles',
    date: '15 Mar 2024',
    status: 'COMPLETED',
    matchType: 'PROFESSIONAL',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    duration: '94:00',
    accuracy: '98.2%',
    players: 22,
  },
];

export default function LibraryPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dynamicMatches, setDynamicMatches] = useState(matches);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for saved analysis on load
    const saved = localStorage.getItem('lastAnalysis');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDynamicMatches(prev => {
          // Prevent duplicates if already added
          if (prev.some(m => m.id === 'new-1')) return prev;
          
          return [{
            id: 'new-1',
            title: parsed.title,
            date: parsed.date,
            status: 'COMPLETED',
            thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
            matchType: parsed.matchType || 'AMATEUR',
            ...parsed
          }, ...prev];
        });
      } catch (e) {}
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      setError(null);
      const stats = await analyzeVideoFootage(file);
      
      // Save result to localStorage for the analysis page to pick up
      localStorage.setItem('lastAnalysis', JSON.stringify({
        ...stats,
        title: file.name,
        date: new Date().toLocaleDateString(),
        thumbnail: URL.createObjectURL(file) // Note: this will only work in current session
      }));

      // Small delay for effect
      await new Promise(r => setTimeout(r, 1000));
      router.push('/analysis');
    } catch (err) {
      console.error(err);
      setError("AI Analysis failed. Make sure you are using a supported video file.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      {/* Upload Modal */}
      {showUpload && !isAnalyzing && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setShowUpload(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-6 uppercase tracking-tighter">New Analysis</h2>
            
            <div className="space-y-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*"
                onChange={handleFileUpload}
              />

              <div className="p-4 bg-surface-container rounded-2xl border border-white/5">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Import from YouTube</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-surface/50 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-error" />
                    <input type="text" placeholder="https://youtube.com/watch?v=..." className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium" />
                  </div>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-primary/20">Fetch</button>
                </div>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-high border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Upload className="w-6 h-6 text-on-surface-variant group-hover:text-primary" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-on-surface">Upload Match Video</div>
                  <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mt-1">Drag and drop files here</div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <button className="w-full bg-primary/20 text-on-surface-variant py-4 rounded-2xl font-bold cursor-not-allowed opacity-50">
                Start Neural Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[70] bg-background flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
             <div className="absolute inset-4 rounded-full border-4 border-secondary/20 border-b-secondary animate-[spin_3s_linear_infinite]"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary animate-pulse" />
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-display font-extrabold text-on-surface uppercase tracking-tight mb-2">Neural Extraction in progress</h2>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">Gemini 3.1 Pro is processing tactical coordinates and identifying player hotspots. please dont close this window.</p>
          </div>
          <div className="w-full max-w-sm h-1 bg-surface-container rounded-full overflow-hidden">
             <div className="h-full bg-primary animate-[shimmer_2s_infinite] w-full origin-left"></div>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-on-surface tracking-tight uppercase">Video Library</h1>
          <p className="text-on-surface-variant text-sm mt-1">Access and manage all tactical extractions</p>
        </div>
        
        <div className="flex gap-2">
          <button className="glass-panel px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button 
            onClick={() => setShowUpload(true)}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Analyze New Match
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dynamicMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: any }) {
  return (
    <div className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={match.thumbnail} 
          alt={match.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {match.matchType && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold tracking-widest border border-white/10 ${
              match.matchType === 'PROFESSIONAL' ? 'bg-primary/20 text-primary border-primary/20' : 
              match.matchType === 'AMATEUR' ? 'bg-secondary/20 text-secondary border-secondary/20' : 
              'bg-surface-container-highest text-on-surface-variant'
            }`}>
              {match.matchType}
            </span>
          </div>
        )}
        {match.status === 'PROCESSING' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/60 backdrop-blur-[2px]">
             <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-3"></div>
             <div className="text-primary font-bold text-[10px] uppercase tracking-widest">Analyzing {match.progress}%</div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-4">
        <h3 className="font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{match.title}</h3>
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{match.date}</div>
          {match.status === 'COMPLETED' ? (
            <Link href="/analysis" className="text-primary hover:text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors">
              Tactical View <Play className="w-3 h-3" />
            </Link>
          ) : (
             <div className="text-on-surface-variant font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
               Queued <Clock className="w-3 h-3" />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Youtube, Upload, Play, ArrowRight, Shield, Zap, Target, Cpu, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ProcessingHud } from '@/components/analysis/processing-hud';
import { useRouter } from 'next/navigation';
import { analyzeVideoFootage } from '@/lib/analysis-service';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAnalyze = () => {
    if (!url) return;
    // For now, URL analysis is disabled as we prioritize real file uploads
    alert("Analysis for URLs is coming soon. Please use the 'Upload Video' option for real-time AI extraction.");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzingFile(true);
      const stats = await analyzeVideoFootage(file);
      
      localStorage.setItem('lastAnalysis', JSON.stringify({
        ...stats,
        title: file.name,
        date: new Date().toLocaleDateString(),
      }));

      router.push('/analysis');
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try a different video.");
    } finally {
      setIsAnalyzingFile(false);
    }
  };

  useEffect(() => {
    if (isProcessing) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => router.push('/library'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isProcessing, router]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] w-full overflow-hidden relative">
      
      {isProcessing && <ProcessingHud progress={progress} />}
      
      {isAnalyzingFile && (
        <div className="fixed inset-0 z-[70] bg-background flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
             <div className="absolute inset-4 rounded-full border-4 border-secondary/20 border-b-secondary animate-[spin_3s_linear_infinite]"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary animate-pulse" />
             </div>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-on-surface uppercase tracking-tight">AI Neural Extraction...</h2>
        </div>
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-secondary rounded-full blur-[150px]"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24 relative z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-white/10 rounded-full mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">V2.0 Core Active</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="text-center space-y-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter text-on-surface leading-[0.9]">
            ANALYZE ANY MATCH.<br/>
            <span className="text-primary italic">ZERO EFFORT.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            Upload footage or paste a YouTube link. Our neural engine extracts 
            <span className="text-secondary font-bold"> positional data, tactical graphs, and player metrics</span> in minutes.
          </p>
        </motion.div>

        {/* Action Center */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 w-full max-w-2xl space-y-6"
        >
          <div className="glass-panel p-2 rounded-3xl border border-white/10 shadow-2xl focus-within:ring-2 focus-within:ring-primary/40 transition-all flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-white/5">
              <Youtube className="w-5 h-5 text-error mr-3" />
              <input 
                type="text" 
                placeholder="Paste YouTube Match URL..."
                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-on-surface placeholder:text-on-surface-variant text-sm md:text-base font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAnalyze}
              className={`px-8 py-4 bg-primary text-on-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 ${!url && 'opacity-50 cursor-not-allowed'}`}
            >
              Analyze Link <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-on-surface-variant/60">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Deep Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant/60">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Heatmap Gen</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant/60">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Tactical Replay</span>
            </div>
          </div>
        </motion.div>

        {/* "Or Upload" section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="video/*"
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center gap-4 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center p-4 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300">
               <Upload className="w-6 h-6 text-on-surface-variant group-hover:text-primary group-hover:scale-110 transition-all" />
            </div>
            <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase group-hover:text-on-surface">Or upload direct footage</span>
          </button>
        </motion.div>
      </main>

      {/* Feature Grids (Visual only for now) */}
      <section className="mt-auto py-12 border-t border-white/5 bg-surface-container/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
           <MinimalFeature icon={<Cpu />} title="Neural Tracking" desc="Sub-pixel precision" />
           <MinimalFeature icon={<Target />} title="XG Analysis" desc="Probability modeling" />
           <MinimalFeature icon={<Shield />} title="Defensive Mesh" desc="Cover shadow detection" />
           <MinimalFeature icon={<Zap />} title="Real-time Feed" desc="Low-latency engine" />
        </div>
      </section>
    </div>
  );
}

function MinimalFeature({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="text-primary/60 mb-3 [&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <div className="text-[11px] font-bold text-on-surface uppercase tracking-widest mb-1">{title}</div>
      <div className="text-[10px] text-on-surface-variant leading-tight">{desc}</div>
    </div>
  );
}

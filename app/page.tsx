'use client';

import { useState } from 'react';
import { Play, Upload, Shield, Zap, Target, ArrowRight, BrainCircuit, Youtube, Activity } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analyzeVideoFootage } from '@/lib/analysis-service';

export default function LandingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const result = await analyzeVideoFootage(file);
      localStorage.setItem('lastAnalysis', JSON.stringify(result));
      router.push('/analysis');
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try a shorter clip or different format.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full"></div>

      <nav className="relative z-10 flex border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center p-1.5 rotate-3 group-hover:rotate-0 transition-transform">
                <Play className="fill-black stroke-black w-full h-full" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter">ELITE ANALYTICS</span>
           </div>
           <div className="hidden md:flex items-center gap-8 text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
              <Link href="#" className="hover:text-primary transition-colors">Tactical Engine</Link>
              <Link href="/library" className="hover:text-primary transition-colors">Match Library</Link>
              <Link href="#" className="hover:text-primary transition-colors">API Docs</Link>
           </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                   <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                   <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Live Extraction Engine active</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-black text-on-surface leading-[0.9] uppercase tracking-tighter">
                   Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tactical DNA</span> From Any Match.
                </h1>
                <p className="text-on-surface-variant text-lg font-medium leading-relaxed max-w-lg">
                   The most advanced soccer visualization suite powered by Gemini Vision. Upload match footage or practice clips to extract coordinates, patterns, and performance metrics in seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex-1 bg-primary text-black h-16 flex items-center justify-center gap-2 rounded-2xl font-display font-black text-lg hover:scale-[1.02] transition-all cursor-pointer shadow-[0_0_40px_rgba(30,215,96,0.2)]">
                      <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} disabled={isProcessing} />
                      {isProcessing ? (
                        <>
                          <BrainCircuit className="animate-pulse" /> EXTRACTING DATA...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" /> UPLOAD VIDEO FILE
                        </>
                      )}
                  </label>
                  <Link href="/library" className="flex-1 glass-panel text-on-surface h-16 flex items-center justify-center gap-2 rounded-2xl font-display font-black text-lg hover:bg-white/10 transition-all border border-white/10">
                      EXPLORE LIBRARY
                  </Link>
                </div>

                <div className="space-y-4 pt-8">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg"><Zap className="w-4 h-4 text-primary" /></div>
                      <div>
                         <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">Precision Tracking</h3>
                         <p className="text-[10px] text-on-surface-variant font-bold">X,Y COORDINATES MAPPED IN REAL-TIME</p>
                      </div>
                   </div>
                </div>
            </div>

            <div className="relative">
               <div className="glass-panel aspect-[4/3] rounded-[40px] p-2 overflow-hidden relative shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src="https://picsum.photos/seed/soccer-tactic/1000/800" 
                    alt="Tactical Visualization" 
                    className="w-full h-full object-cover rounded-[32px] grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-20 space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="glass-panel px-4 py-2 rounded-full text-[10px] font-bold text-primary flex items-center gap-2">
                           <Shield className="w-3 h-3" /> MATCH ID: 7741-B
                        </div>
                        <div className="glass-panel px-4 py-2 rounded-full text-[10px] font-bold text-secondary flex items-center gap-2">
                           <Activity className="w-3 h-3" /> ACTIVE TRACKING
                        </div>
                     </div>
                     <div className="h-px w-full bg-white/20"></div>
                     <div className="flex justify-between items-end">
                        <div>
                           <div className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Current Play</div>
                           <div className="text-2xl font-display font-black uppercase tracking-tight">High-Press Invariant</div>
                        </div>
                        <div className="text-primary font-display font-black text-3xl">78%</div>
                     </div>
                  </div>
               </div>
               
               {/* Floating Badges */}
               <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-3xl animate-bounce duration-[3s]">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center"><Target className="text-black" /></div>
                     <div>
                        <div className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">Expected Goals</div>
                        <div className="text-xl font-display font-black">2.84</div>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {/* FAQ - YouTube Question */}
        <div className="mt-40 max-w-2xl mx-auto space-y-12">
           <h2 className="text-3xl font-display font-black text-center uppercase tracking-tight">Technical Architecture</h2>
           <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-primary">
                 <h3 className="font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" /> YouTube Analysis?
                 </h3>
                 <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    Due to browser security protocols, direct YouTube link analysis is currenty indirect. We recommend downloading the clip or using screen recording and uploading the file. The Gemini Vision engine works with real file streams for maximum detail extraction.
                 </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-secondary">
                 <h3 className="font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-secondary" /> AI Accuracy?
                 </h3>
                 <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    We use a multi-step "Chain of Thought" extraction. The AI (Gemini 1.5 Pro) first describes the visual scene, categorizes the match level, and then maps spatial data to a calibrated 100x100 grid. This avoids hallucinations and provides data grounded in visual evidence.
                 </p>
              </div>
           </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">© 2024 Elite Football Analytics • Built with Gemini Vision Pro</p>
        </div>
      </footer>
    </div>
  );
}
